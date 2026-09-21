(function (root) {
  'use strict';
  const DAY = 86400000;
  function parseDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('Choose a valid start date.');
    const date = new Date(value + 'T00:00:00Z');
    if (!Number.isFinite(+date) || date.toISOString().slice(0, 10) !== value) throw new Error('Choose a valid start date.');
    return date;
  }
  const iso = date => date.toISOString().slice(0, 10);
  const next = date => new Date(+date + DAY);
  function workday(date, calendar) {
    const key = iso(date);
    if (!Object.prototype.hasOwnProperty.call(calendar.days, key)) {
      throw new Error('This schedule extends beyond the verified Taiwan calendar (2026–2027). Choose an earlier start or shorter durations. No dates have been estimated outside that range.');
    }
    return calendar.days[key];
  }
  function calculate(start, durations, calendar) {
    let cursor = parseDate(start);
    if (durations.length !== 7 || durations.some(n => ![10, 15].includes(n))) throw new Error('Each POC must use 10 or 15 working days.');
    const stages = [];
    for (let i = 0; i < durations.length; i++) {
      while (!workday(cursor, calendar)) cursor = next(cursor);
      const first = iso(cursor);
      let used = 0;
      while (used < durations[i]) {
        if (workday(cursor, calendar)) used++;
        if (used < durations[i]) cursor = next(cursor);
      }
      stages.push({ poc: i + 1, start: first, finish: iso(cursor), workingDays: used });
      if (i < durations.length - 1) cursor = next(cursor);
    }
    const finish = stages[6].finish;
    const skipped = [];
    for (let day = parseDate(start); iso(day) <= finish; day = next(day)) {
      const key = iso(day);
      if (!workday(day, calendar)) skipped.push({ date: key, note: calendar.notes[key] || 'Weekend / official day off' });
    }
    return { requestedStart: start, actualStart: stages[0].start, finish, stages, skipped,
      workingDays: durations.reduce((a, b) => a + b, 0), calendarDays: (+parseDate(finish) - +parseDate(start)) / DAY + 1 };
  }
  const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
  function svg(plan, names, calendar) {
    const start = +parseDate(plan.requestedStart), end = +parseDate(plan.finish);
    const span = (end - start) / DAY + 1, left = 355, width = 980, scale = width / span;
    let s = '<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="750" viewBox="0 0 1400 750" role="img" aria-labelledby="schedule-title"><title id="schedule-title">Taiwan working-day POC schedule</title><rect width="1400" height="750" fill="white"/><g font-family="Arial,sans-serif" fill="#191919">';
    s += '<text x="32" y="45" font-size="28" font-weight="700">Product delivery schedule</text>';
    s += `<text x="32" y="79" font-size="17">${escape(plan.actualStart)} → ${escape(plan.finish)} · ${plan.workingDays} working days · ${plan.calendarDays} calendar days from requested kickoff</text>`;
    s += '<text x="32" y="108" font-size="14">Taiwan government office calendar · Gray bands are official non-working days · Planning estimate</text>';
    for (let day = 0; day < span; day++) {
      const key = iso(new Date(start + day * DAY));
      if (!calendar.days[key]) s += `<rect x="${left + day * scale}" y="157" width="${scale}" height="410" fill="#f1f1f1"/>`;
      if (day % 14 === 0) s += `<path d="M${left + day * scale} 153v414" stroke="#ddd"/><text x="${left + day * scale}" y="144" font-size="12">${key.slice(5)}</text>`;
    }
    plan.stages.forEach((stage, i) => {
      const y = 173 + i * 57, x = left + ((+parseDate(stage.start) - start) / DAY) * scale;
      const w = ((+parseDate(stage.finish) - +parseDate(stage.start)) / DAY + 1) * scale;
      s += `<text x="32" y="${y+16}" font-size="17" font-weight="700">POC ${stage.poc} · ${escape(names[i])}</text><text x="32" y="${y+37}" font-size="13" fill="#666">${stage.start} → ${stage.finish} · ${stage.workingDays} workdays</text>`;
      s += `<rect x="${x}" y="${y}" width="${w}" height="35" rx="5" fill="#e8c236"/><text x="${x+w/2}" y="${y+23}" text-anchor="middle" font-size="14">POC ${stage.poc}</text>`;
    });
    for (const day of plan.skipped) {
      const x = left + ((+parseDate(day.date) - start) / DAY) * scale;
      s += `<rect x="${x}" y="157" width="${scale}" height="410" fill="#64748b" opacity="0.20"><title>${escape(day.date + ': ' + day.note)}</title></rect>`;
    }
    s += '<text x="32" y="618" font-size="15">A working kickoff date counts as day 1. A holiday kickoff rolls forward. Each POC starts after the previous one finishes.</text>';
    s += '<text x="32" y="647" font-size="15">2 weeks = 10 working days; 3 weeks = 15 working days. Holidays can extend elapsed calendar time beyond 14–21 weeks.</text>';
    s += '<text x="32" y="676" font-size="14">Baseline: DGPA 2026–2027 office calendars, retrieved 2026-09-21. Company-specific leave and emergency closures excluded.</text>';
    s += '<text x="32" y="707" font-size="13">Source: https://data.gov.tw/dataset/14718 · Government Data Open License v1.0 · Provisional product name: nimbls</text></g></svg>';
    return s;
  }
  function markdown(plan, titles) {
    return '# nimbls — Calculated delivery schedule\n\nRequested kickoff: '+plan.requestedStart+'\n\nActual start: '+plan.actualStart+'\n\nFinish: '+plan.finish+'\n\nWorkload: '+plan.workingDays+' working days; elapsed: '+plan.calendarDays+' calendar days from requested kickoff.\n\n| POC | Capability | Start | Finish | Working days |\n| --- | --- | --- | --- | --- |\n'+plan.stages.map((s,i)=>`| ${s.poc} | ${titles[i]} | ${s.start} | ${s.finish} | ${s.workingDays} |`).join('\n')+'\n\n## Calculation rules\n\n- Official Taiwan DGPA office-calendar working-day flags for 2026–2027, retrieved 2026-09-21.\n- Working kickoff counts as day 1; a non-working kickoff rolls forward. Stages are sequential.\n- 2 weeks means 10 working days; 3 weeks means 15 working days.\n- Company-specific leave, individual leave and emergency closures are not included. This is an estimate, not a release commitment.\n- Source: https://data.gov.tw/dataset/14718 (Government Data Open License v1.0).\n\n## Excluded dates\n\n'+plan.skipped.map(d=>'- '+d.date+': '+d.note).join('\n')+'\n';
  }
  const api = {parseDate, calculate, svg, markdown};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.RoadmapScheduler = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
