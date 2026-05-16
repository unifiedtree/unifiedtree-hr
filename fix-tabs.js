const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// 1. Move the cards from overview to the right tabs.
// To do this, let's find the cards by their title or chart ID.
const dashPage = $('.page[data-page="dashboard"]');
const overviewPane = dashPage.find('.tab-pane[data-tab-pane="overview"]');
const peoplePane = dashPage.find('.tab-pane[data-tab-pane="people"]');
const opsPane = dashPage.find('.tab-pane[data-tab-pane="operations"]');
const financePane = dashPage.find('.tab-pane[data-tab-pane="finance"]');
const recPane = dashPage.find('.tab-pane[data-tab-pane="recruiting"]');

// Dept Distribution
const deptCard = $('#emp-dept-bar').closest('.card');
if (deptCard.length) peoplePane.append(deptCard);

// Top Performers
const topPerfCard = overviewPane.find('.card:contains("Top Performers")').first();
if (topPerfCard.length) peoplePane.append(topPerfCard);

// Attendance Weekly
const attWeeklyCard = $('#att-weekly-chart').closest('.card');
if (attWeeklyCard.length) opsPane.append(attWeeklyCard);

// Attendance Donut
const attDonutCard = $('#att-donut-chart').closest('.card');
if (attDonutCard.length) opsPane.append(attDonutCard);

// Productivity
const prodCard = $('#productivity-gauge').closest('.card');
if (prodCard.length) opsPane.append(prodCard);

// Payroll Area
const payrollCard = $('#payroll-area').closest('.card');
if (payrollCard.length) financePane.append(payrollCard);

// Advances
const advancesCard = overviewPane.find('.card:contains("Current Advances")').first();
if (advancesCard.length) financePane.append(advancesCard);

// Hiring Funnel
const hiringCard = $('#hiring-funnel').closest('.card');
if (hiringCard.length) recPane.append(hiringCard);

// Wrap items in .row-2 to make them grid layout in their respective panes if there's more than 1
function wrapInGrid(pane) {
  const cards = pane.children('.card');
  if (cards.length > 0) {
     const wrapper = $('<div class="row-2"></div>');
     pane.append(wrapper);
     wrapper.append(cards);
  }
}

wrapInGrid(peoplePane);
// operations has 3 charts, maybe row-3 or row-2
const opsCards = opsPane.children('.card');
if (opsCards.length > 0) {
   const wrapper = $('<div class="row-2"></div>');
   opsPane.append(wrapper);
   wrapper.append(opsCards);
}
wrapInGrid(financePane);
wrapInGrid(recPane);

// 2. Fix the chart rendering issue. 
// When a tab is clicked and shown, we need to trigger window resize so ApexCharts repaints to fit the new width instead of 0 width.
// We will inject a script tag at the end of body.
const fixChartsScript = `
<script>
  // Fix ApexCharts not rendering in hidden tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Small delay to allow CSS display:block to apply
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 50);
    });
  });
</script>
`;
$('body').append(fixChartsScript);

fs.writeFileSync('index.html', $.html());
console.log('Successfully moved cards to tabs and added resize trigger.');
