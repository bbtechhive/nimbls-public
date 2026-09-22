/* Shared by hosted and downloaded copies; no credentials or posting API. */
(() => {
  const pages = {
  "current-capabilities.html": "Ask nimbls Today — Current Development Capabilities",
  "agent-improvement.html": "Agent Improvement Review — nimbls",
  "ask-nimbls.html": "Ask nimbls — nimbls",
  "automation.html": "Scheduling &amp; Automation — nimbls",
  "custom-agents.html": "Custom Agents — nimbls",
  "execution-management.html": "Execution Management — nimbls",
  "external-assistance.html": "Controlled External Assistance — nimbls",
  "features.html": "Feature Library — nimbls — Ask nimbls. Put NIMBL to work.",
  "future-capabilities.html": "Future Agent Capabilities — nimbls",
  "guide.html": "Quick-start Guide — nimbls",
  "index.html": "nimbls — Less busywork. More room to think.",
  "local-ai.html": "Local AI — nimbls",
  "p2-m1.html": "syslog-reviewer — Know what matters in your network.",
  "p2-m2.html": "device-snapshot — Know what changed.",
  "p2-m3.html": "incident-investigator — Find answers in your site’s history.",
  "p2-m4.html": "Ask nimbls — Your site knowledge. One place to ask.",
  "results-center.html": "Results Center — nimbls",
  "roadmap.html": "Product Roadmap — nimbls",
  "site-history.html": "Site History &amp; Knowledge — nimbls",
  "visuals.html": "nimbls — Visual Library"
};
  const kinds = ['Suggestion', 'Question', 'Content correction'];
  function buildFeedbackUrl(page, kind, summary, message) {
    if (!Object.hasOwn(pages, page) || !kinds.includes(kind)) throw new Error('Choose a page and feedback type.');
    summary = summary.trim(); message = message.trim();
    if (!summary || !message) throw new Error('Please enter a summary and a message.');
    if (summary.length > 80 || message.length > 600) throw new Error('Keep the summary within 80 characters and the message within 600. You can add more on GitHub.');
    const body = ['## Website feedback', '', 'Page: ' + pages[page], 'Website file: `' + page + '`', 'Type: ' + kind, '', '## Message', '', message].join('\n');
    const url = new URL('https://github.com/bbtechhive/nimbls-public/issues/new');
    url.searchParams.set('template', 'website_feedback.md');
    url.searchParams.set('title', '[Website feedback] ' + summary);
    url.searchParams.set('body', body);
    if (url.href.length > 7500) throw new Error('Please shorten your message slightly, then add the remaining detail on GitHub.');
    return url.href;
  }
  if (typeof module !== 'undefined' && module.exports) { module.exports = { buildFeedbackUrl, pages }; return; }
  const pageField = document.getElementById('page');
  for (const [file, title] of Object.entries(pages)) {
    const option = document.createElement('option'); option.value = file; option.textContent = title; pageField.append(option);
  }
  const requested = new URLSearchParams(location.search).get('page');
  pageField.value = Object.hasOwn(pages, requested) ? requested : 'index.html';
  document.getElementById('feedback-form').addEventListener('submit', event => {
    event.preventDefault();
    const error = document.getElementById('feedback-error'); error.hidden = true;
    try {
      const url = buildFeedbackUrl(pageField.value, document.getElementById('kind').value, document.getElementById('summary').value, document.getElementById('message').value);
      location.assign(url);
    } catch (problem) { error.textContent = problem.message; error.hidden = false; }
  });
})();
