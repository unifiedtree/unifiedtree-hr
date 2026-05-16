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

const children = overviewPane.children().toArray();
let currentTarget = overviewPane;

// Clear the destination panes just in case they have old junk or empty grids
peoplePane.empty();
opsPane.empty();
financePane.empty();
recPane.empty();

for (let i = 0; i < children.length; i++) {
  const node = $(children[i]);
  
  if (node.hasClass('sec-title')) {
    const text = node.text();
    if (text.includes('People Analytics')) {
      currentTarget = peoplePane;
      continue; // Skip the sec-title itself
    } else if (text.includes('Operations') || text.includes('Attendance')) {
      currentTarget = opsPane;
      continue;
    } else if (text.includes('Finance') || text.includes('Payroll')) {
      currentTarget = financePane;
      continue;
    } else if (text.includes('Recruiting') || text.includes('Resourcing')) {
      currentTarget = recPane;
      continue;
    }
  }
  
  // If current target is NOT overviewPane, we move the node
  if (currentTarget !== overviewPane) {
    currentTarget.append(node);
  }
}

// Add CSS to ensure charts resize properly when their tab becomes visible
// Since ApexCharts listens to resize, we dispatch resize on tab switch
const resizeFix = `
<script>
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 50);
    });
  });
</script>
`;
if (!$('body').html().includes('window.dispatchEvent(new Event(\'resize\'));')) {
  $('body').append(resizeFix);
}

fs.writeFileSync('index.html', $.html());
console.log('Fixed tabs using boundary markers.');
