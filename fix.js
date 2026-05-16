const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// 1. Dashboard Live Overview
content = content.replace(
  '<div class="sec-title"><i class="ti ti-layout-dashboard" style="color:var(--primary)"></i> Live Overview</div>',
  '<div class="sec-title" style="display:flex; justify-content:space-between; align-items:center;"><div><i class="ti ti-layout-dashboard" style="color:var(--primary)"></i> Live Overview</div><select class="select" style="width:180px; height:28px; font-size:12px; padding:0 8px;"><option>HQ — Bangalore</option><option>Pune Plant</option><option>Mumbai Hub</option></select></div>'
);
content = content.replace('<div class="dash-stat-val">1,848</div>', '<div class="dash-stat-val">248</div>');
content = content.replace('<div class="dash-stat-val">142</div>', '<div class="dash-stat-val">228</div>');

// 2. Payroll Report Net
content = content.replace('<td><span style="font-weight:600; color:var(--green)">₹98,500</span></td>', '<td><span style="font-weight:600; color:var(--green)">₹ 1,02,500</span></td>');

// 3. Michael Chang Salary
content = content.replace('<td>$120,000</td>', '<td>₹ 28,00,000 / annum</td>');

// 4. Sales Q2 Revenue
content = content.replace('<td>$1.5M</td>', '<td>₹ 12.5 Cr</td>');
content = content.replace('<td>$1.2M</td>', '<td>₹ 10 Cr</td>');

// 5. Currency spacing globally
content = content.replace(/₹(\d)/g, '₹ $1');

// 6. Fix Date in Audit Log
content = content.replace('May 14, 2026 18:45 PM', 'May 14, 2026 06:45 PM');

// 7. Fix Priya Mehta Persona
content = content.replace(/VP Sales/g, 'VP of Sales, Mumbai Hub');
content = content.replace(/Sales Hub - Mumbai|Sales Hub Mumbai/gi, 'Mumbai Hub');
content = content.replace(/HQ Bangalore|Bangalore Headquarters|Global HQ - Bangalore Headquarters/gi, 'HQ — Bangalore');
content = content.replace(/Manufacturing Plant - Pune|Manufacturing - Pune/gi, 'Pune Plant');

// 8. Add + Add <Noun> logic
content = content.replace(/Add Company/g, '+ Add Company');
content = content.replace(/Add Branch/g, '+ Add Branch');
content = content.replace(/Add Entry/g, '+ Add Employee');
content = content.replace(/Add Component/g, '+ Add Component');
content = content.replace(/Add KPI/g, '+ Add KPI');
content = content.replace(/Add Holiday/g, '+ Add Holiday');
content = content.replace(/Apply Leave \(Admin\)/g, 'Apply for Leave');
content = content.replace(/Export Data|Export Report|Export PDF|Export Excel/gi, 'Export ▾');

fs.writeFileSync('index.html', content);
console.log('Replacements done!');
