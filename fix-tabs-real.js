const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const dashPage = $('.page[data-page="dashboard"]');
const overviewPane = dashPage.find('.tab-pane[data-tab-pane="overview"]');
const peoplePane = dashPage.find('.tab-pane[data-tab-pane="people"]');
const opsPane = dashPage.find('.tab-pane[data-tab-pane="operations"]');
const financePane = dashPage.find('.tab-pane[data-tab-pane="finance"]');
const recPane = dashPage.find('.tab-pane[data-tab-pane="recruiting"]');

function moveChart(chartId, targetPane) {
  const chartEl = $('#' + chartId);
  if (!chartEl.length) return;
  // Find the top-most container that is a direct child of overviewPane
  let curr = chartEl;
  let topChild = null;
  while(curr.length && curr[0].name !== 'body') {
    const parent = curr.parent();
    if (parent.attr('data-tab-pane') === 'overview') {
      topChild = curr;
      break;
    }
    curr = parent;
  }
  
  if (topChild) {
    // We found the block inside overview. 
    // Move it to targetPane.
    targetPane.append(topChild);
  }
}

// People
moveChart('emp-dept-bar', peoplePane);
// Let's also find Top Performers
const topPerf = overviewPane.find(':contains("Top Performers")').last();
if (topPerf.length) {
  let curr = topPerf;
  while(curr.length && curr.parent().attr('data-tab-pane') !== 'overview') curr = curr.parent();
  if (curr.length) peoplePane.append(curr);
}

// Operations
moveChart('att-weekly-chart', opsPane);
moveChart('att-donut-chart', opsPane);
moveChart('productivity-gauge', opsPane);

// Finance
moveChart('payroll-area', financePane);
// Current Advances
const advances = overviewPane.find(':contains("Current Advances")').last();
if (advances.length) {
  let curr = advances;
  while(curr.length && curr.parent().attr('data-tab-pane') !== 'overview') curr = curr.parent();
  if (curr.length) financePane.append(curr);
}

// Recruiting
moveChart('hiring-funnel', recPane);
// Job Openings
const jobs = overviewPane.find(':contains("Job Openings")').last();
if (jobs.length) {
  let curr = jobs;
  while(curr.length && curr.parent().attr('data-tab-pane') !== 'overview') curr = curr.parent();
  if (curr.length) recPane.append(curr);
}

fs.writeFileSync('index.html', $.html());
console.log('Fixed tabs real.');
