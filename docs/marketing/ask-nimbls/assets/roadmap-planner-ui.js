(function () {
  'use strict';
  const calendar = window.TaiwanWorkCalendar;
  const scheduler = window.RoadmapScheduler;
  const config = JSON.parse(document.getElementById('planner-config').textContent);
  const form = document.getElementById('roadmap-planner');
  const start = document.getElementById('kickoff-date');
  const inputs = [...form.querySelectorAll('[data-duration]')];
  const result = document.getElementById('dated-results');
  const message = document.getElementById('planner-message');
  const downloadSvg = document.getElementById('dated-svg');
  const downloadMd = document.getElementById('dated-md');
  let urls = [];
  function clearDownloads() {
    urls.forEach(url => URL.revokeObjectURL(url)); urls = [];
    for (const a of [downloadSvg, downloadMd]) { a.removeAttribute('href'); a.setAttribute('aria-disabled', 'true'); }
  }
  function exportLink(a, contents, type) {
    const url = URL.createObjectURL(new Blob([contents], {type})); urls.push(url);
    a.href = url; a.removeAttribute('aria-disabled');
  }
  function cell(row, text) { const td = document.createElement('td'); td.textContent = text; row.append(td); return td; }
  function update() {
    clearDownloads(); result.hidden = true;
    document.querySelectorAll('[data-stage-dates]').forEach(p => {p.textContent = '';});
    try {
      const plan = scheduler.calculate(start.value, inputs.map(s => Number(s.value)), calendar);
      message.className = 'note'; message.textContent = `Requested kickoff: ${plan.requestedStart}. Actual first working day: ${plan.actualStart}. Planned finish: ${plan.finish}. ${plan.workingDays} working days across ${plan.calendarDays} calendar days; ${plan.skipped.length} days excluded.`;
      const svg = scheduler.svg(plan, config.shortNames, calendar);
      document.getElementById('dated-timeline').innerHTML = svg;
      const tbody = document.getElementById('dated-rows'); tbody.replaceChildren();
      plan.stages.forEach((s,i) => {
        const row = document.createElement('tr'); cell(row, `POC ${s.poc}`);cell(row, `${s.workingDays} working days`);cell(row,s.start);cell(row,s.finish);
        const detail = cell(row,'');
        config.links[i].forEach(([label,url], j) => {if(j) detail.append(' · '); const a = document.createElement('a'); a.href=url;a.textContent=label;detail.append(a);});
        tbody.append(row);
        document.querySelector(`[data-stage-dates="${s.poc}"]`).textContent=`Calculated dates: ${s.start} → ${s.finish} (${s.workingDays} working days).`;
      });
      const all = document.getElementById('excluded-dates'); all.replaceChildren();
      const named = document.getElementById('holiday-rows'); named.replaceChildren();
      let namedCount = 0;
      plan.skipped.forEach(d => {
        const tr = document.createElement('tr');cell(tr,d.date);cell(tr,d.note);all.append(tr);
        if(calendar.notes[d.date]) {const row=document.createElement('tr');cell(row,d.date);cell(row,d.note);named.append(row);namedCount++;}
      });
      if (!namedCount) {const row=document.createElement('tr');const td=cell(row,'No named official holidays in this schedule.');td.colSpan=2;named.append(row);}
      document.getElementById('excluded-summary').textContent=`${plan.skipped.length} non-working days excluded. Named holidays and substitute days appear below in the source calendar’s original Chinese; every excluded date, including ordinary weekends, is available in the expanded list.`;
      exportLink(downloadSvg,svg,'image/svg+xml;charset=utf-8');exportLink(downloadMd,scheduler.markdown(plan,config.titles),'text/markdown;charset=utf-8');
      result.hidden=false;
    } catch(error) {message.className='note planner-error';message.textContent=error.message;}
  }
  form.addEventListener('submit', e => {e.preventDefault();update();});
  form.addEventListener('change', update);
  document.getElementById('duration-preset').addEventListener('change', e => {
    if(e.target.value) {inputs.forEach(input=>{input.value=e.target.value;});update();}
  });
  const today = new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  start.value = today;
  update();
})();
