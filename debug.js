const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const overviewPane = $('.tab-pane[data-tab-pane="overview"]');
const children = overviewPane.children();
console.log('Overview Pane children count:', children.length);

children.each((i, el) => {
  const node = $(el);
  const title = node.find('.sec-title').text() || node.text().substring(0, 50).replace(/\n/g, '');
  console.log('Child', i, 'Class:', node.attr('class'), 'Has sec-title?', node.find('.sec-title').length > 0, 'Text:', title);
});
