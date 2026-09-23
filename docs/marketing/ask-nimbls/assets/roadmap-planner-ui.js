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
  const totalDownload = document.getElementById('total-svg');
  const totalView = document.getElementById('total-view');
  const calendarView = document.getElementById('calendar-view');
  const totalButton = document.getElementById('show-total');
  const calendarButton = document.getElementById('show-calendar');
  function setView(total) {
    totalView.hidden = !total; calendarView.hidden = total;
    totalButton.setAttribute('aria-pressed', String(total));
    calendarButton.setAttribute('aria-pressed', String(!total));
  }
  totalButton.addEventListener('click', () => setView(true));
  calendarButton.addEventListener('click', () => setView(false));
  const monthSelect = document.getElementById('calendar-month');
  const previousMonth = document.getElementById('previous-month');
  const nextMonth = document.getElementById('next-month');
  const monthDownload = document.getElementById('month-svg');
  let currentPlan, monthList = [], monthUrl;
  function renderMonth() {
    const selected = monthSelect.value;
    const drawing = scheduler.svg(currentPlan, config.shortNames, calendar, selected);
    document.getElementById('dated-timeline').innerHTML = drawing;
    const index = monthList.indexOf(selected);
    previousMonth.disabled = index <= 0;
    nextMonth.disabled = index >= monthList.length - 1;
    if (monthUrl) URL.revokeObjectURL(monthUrl);
    monthUrl = URL.createObjectURL(new Blob([drawing], {type:'image/svg+xml;charset=utf-8'}));
    monthDownload.href = monthUrl;
    monthDownload.download = `nimbls-roadmap-${selected}.svg`;
    monthDownload.removeAttribute('aria-disabled');
  }
  monthSelect.addEventListener('change', renderMonth);
  previousMonth.addEventListener('click', () => {monthSelect.selectedIndex--;renderMonth();});
  nextMonth.addEventListener('click', () => {monthSelect.selectedIndex++;renderMonth();});
  let urls = [];
  function clearDownloads() {
    urls.forEach(url => URL.revokeObjectURL(url)); urls = [];
    if (monthUrl) URL.revokeObjectURL(monthUrl); monthUrl = undefined;
    monthDownload.removeAttribute('href'); monthDownload.setAttribute('aria-disabled','true');
    for (const a of [downloadSvg, downloadMd, totalDownload]) { a.removeAttribute('href'); a.setAttribute('aria-disabled', 'true'); }
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
      message.className = 'note'; message.textContent = `Requested kickoff: ${plan.requestedStart}. Actual first working day: ${plan.actualStart}. Planned finish: ${plan.finish}. ${plan.workingDays} working days in total.`;
      const svg = scheduler.svg(plan, config.shortNames, calendar);
      const totalDrawing = scheduler.totalSvg(plan, config.shortNames, calendar);
      document.getElementById('total-timeline').innerHTML = totalDrawing;
      exportLink(totalDownload,totalDrawing,'image/svg+xml;charset=utf-8');
      currentPlan = plan;
      const previousSelection = monthSelect.value;
      monthList = scheduler.months(plan);
      monthSelect.replaceChildren();
      monthList.forEach(month => {
        const option = document.createElement('option'); option.value = month;
        option.textContent = new Date(month+'-01T00:00:00Z').toLocaleDateString('en-US',{month:'long',year:'numeric',timeZone:'UTC'});
        monthSelect.append(option);
      });
      if (monthList.includes(previousSelection)) monthSelect.value = previousSelection;
      renderMonth();
      const tbody = document.getElementById('dated-rows'); tbody.replaceChildren();
      plan.stages.forEach((s,i) => {
        const row = document.createElement('tr'); cell(row, `Milestone ${s.poc}`);cell(row, `${s.workingDays} working days`);cell(row,s.start);cell(row,s.finish);
        const detail = cell(row,'');
        config.links[i].forEach(([label,url], j) => {if(j) detail.append(' · '); const a = document.createElement('a'); a.href=url;a.textContent=label;detail.append(a);});
        tbody.append(row);
        document.querySelector(`[data-stage-dates="${s.poc}"]`).textContent=`Calculated dates: ${s.start} → ${s.finish} (${s.workingDays} working days).`;
      });
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
