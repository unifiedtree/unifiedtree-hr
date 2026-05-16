const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

function showContext(id) {
  const idx = html.indexOf('id="' + id + '"');
  if (idx !== -1) {
    console.log('--- ' + id + ' ---');
    console.log(html.substring(Math.max(0, idx - 150), idx + 150));
  }
}

showContext('payroll-area');
showContext('hiring-funnel');
showContext('emp-dept-bar');
