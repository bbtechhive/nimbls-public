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
  function months(plan) {
    const result = [];
    let cursor = new Date(plan.requestedStart.slice(0, 7) + '-01T00:00:00Z');
    while (iso(cursor).slice(0, 7) <= plan.finish.slice(0, 7)) {
      result.push(iso(cursor).slice(0, 7));
      cursor.setUTCMonth(cursor.getUTCMonth() + 1);
    }
    return result;
  }
  function monthPanel(plan, names, calendar, month, top) {
    const first = parseDate(month + '-01');
    const total = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate();
    const offset = (first.getUTCDay() + 6) % 7;
    const title = first.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
    let s = `<g transform="translate(0 ${top})"><text x="30" y="35" font-size="28" font-weight="700">${title}</text>`;
    const active = plan.stages.filter(stage => stage.start.slice(0, 7) <= month && stage.finish.slice(0, 7) >= month);
    active.forEach((stage, i) => {
      s += `<text x="30" y="${66 + i * 24}" font-size="17">POC ${stage.poc} · ${escape(names[stage.poc - 1])} · ${stage.start} → ${stage.finish}</text>`;
    });
    ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].forEach((day,i) => {
      s += `<text x="${30+i*154+73}" y="168" text-anchor="middle" font-size="17" fill="#666">${day}</text>`;
    });
    for (let day = 1; day <= total; day++) {
      const key = month + '-' + String(day).padStart(2, '0');
      const slot = offset + day - 1, x = 30 + (slot % 7) * 154, y = 185 + Math.floor(slot / 7) * 102;
      const inside = key >= plan.requestedStart && key <= plan.finish;
      const working = calendar.days[key] === true;
      const stage = inside && plan.stages.find(s => key >= s.start && key <= s.finish);
      const color = !inside ? '#fafafa' : !working ? '#eef0f3' : '#fff8d7';
      s += `<g><title>${escape(key + ': ' + (!inside ? 'Outside selected schedule' : !working ? (calendar.notes[key] || 'Weekend / official day off') : 'POC ' + stage.poc))}</title><rect x="${x}" y="${y}" width="146" height="94" rx="8" fill="${color}" stroke="#e2e2e2"/><text x="${x+12}" y="${y+25}" font-size="19" fill="${inside ? '#191919' : '#999'}">${day}</text>`;
      if (inside && working && stage) {
        s += `<text x="${x+12}" y="${y+55}" font-size="19" font-weight="700">POC ${stage.poc}</text>`;
        const label = key === stage.start ? 'Starts' : key === stage.finish ? 'Completes' : 'Working day';
        s += `<text x="${x+12}" y="${y+79}" font-size="14" fill="#666">${label}</text>`;
      } else if (inside && !working) {
        const note = calendar.notes[key] || 'Weekend';
        const chunks = Array.from(note).reduce((acc,c,i) => {if(i%9===0)acc.push('');acc[acc.length-1]+=c;return acc;},[]);
        chunks.slice(0,3).forEach((line,i) => {s += `<text x="${x+12}" y="${y+47+i*18}" font-size="14" fill="#666">${escape(line)}</text>`;});
      }
      s += '</g>';
    }
    return s + '</g>';
  }
  function svg(plan, names, calendar, selectedMonth) {
    const list = selectedMonth ? months(plan).filter(m => m === selectedMonth) : months(plan);
    if (!list.length) throw new Error('This month is outside the selected schedule.');
    const height = 145 + list.length * 825 + 100;
    let s = `<svg xmlns="http://www.w3.org/2000/svg" width="1140" height="${height}" viewBox="0 0 1140 ${height}" role="img" aria-labelledby="schedule-title"><title id="schedule-title">Monthly Taiwan working-day POC schedule</title><rect width="1140" height="${height}" fill="white"/><g font-family="Arial,sans-serif" fill="#191919">`;
    s += '<text x="30" y="40" font-size="28" font-weight="700">Product delivery calendar</text>';
    s += `<text x="30" y="76" font-size="18">${plan.actualStart} → ${plan.finish} · ${plan.workingDays} working days · Planning estimate</text>`;
    s += '<text x="30" y="108" font-size="16">Yellow: scheduled work · Gray: excluded weekends / official holidays · Pale: outside selected schedule</text>';
    list.forEach((month,i) => {s += monthPanel(plan,names,calendar,month,145+i*825);});
    s += `<text x="30" y="${height-67}" font-size="15">DGPA 2026–2027 office calendar · 2 / 3 weeks = 10 / 15 working days per POC.</text><text x="30" y="${height-42}" font-size="15">Company-specific leave and emergency closures excluded. Source: https://data.gov.tw/dataset/14718</text><text x="30" y="${height-17}" font-size="14">Government Data Open License v1.0 · Calendar retrieved 2026-09-21 · nimbls is a provisional name.</text></g></svg>`;
    return s;
  }
  function markdown(plan, titles) {
    return '# nimbls — Calculated delivery schedule\n\nRequested kickoff: '+plan.requestedStart+'\n\nActual start: '+plan.actualStart+'\n\nFinish: '+plan.finish+'\n\nWorkload: '+plan.workingDays+' working days; elapsed: '+plan.calendarDays+' calendar days from requested kickoff.\n\n| POC | Capability | Start | Finish | Working days |\n| --- | --- | --- | --- | --- |\n'+plan.stages.map((s,i)=>`| ${s.poc} | ${titles[i]} | ${s.start} | ${s.finish} | ${s.workingDays} |`).join('\n')+'\n\n## Calculation rules\n\n- Official Taiwan DGPA office-calendar working-day flags for 2026–2027, retrieved 2026-09-21.\n- Working kickoff counts as day 1; a non-working kickoff rolls forward. Stages are sequential.\n- 2 weeks means 10 working days; 3 weeks means 15 working days.\n- Company-specific leave, individual leave and emergency closures are not included. This is an estimate, not a release commitment.\n- Source: https://data.gov.tw/dataset/14718 (Government Data Open License v1.0).\n\n## Excluded dates\n\n'+plan.skipped.map(d=>'- '+d.date+': '+d.note).join('\n')+'\n';
  }
  const api = {parseDate, calculate, months, svg, markdown};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.RoadmapScheduler = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
