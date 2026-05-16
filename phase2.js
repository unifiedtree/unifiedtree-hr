const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// --- Task 2.1 & 2.3: Sidebar Routing and Settings Sub-navigation ---

// Change data-go attributes to hrefs on .sub-item (Actually, we'll keep data-go for compatibility, but use hash routing in script)
// 2.3 Remove settings items from sidebar
const settingsIds = ['hr-config', 'holiday-calendar', 'roles', 'notifications', 'integrations', 'audit-logs'];
const settingsMap = {
  'hr-config': 'General',
  'holiday-calendar': 'Holidays',
  'roles': 'Roles & Permissions',
  'notifications': 'Notifications',
  'integrations': 'Integrations',
  'audit-logs': 'Audit Logs'
};

// Create the new settings page
let settingsPageHTML = `
<section class="page" data-page="settings">
  <div class="page-hd">
    <div>
      <h2 class="page-title">Settings</h2>
      <div class="crumb"><i class="ti ti-settings"></i> Configuration</div>
    </div>
  </div>
  <div class="card" style="padding:0; overflow:hidden;">
    <div class="tab-bar" style="padding: 0 16px; border-bottom: 1px solid var(--border);">
`;

// Add tabs to settings page
let firstTab = true;
for (const id of settingsIds) {
  settingsPageHTML += `<div class="tab-btn ${firstTab ? 'active' : ''}" data-tab="${id}">${settingsMap[id]}</div>`;
  firstTab = false;
}
settingsPageHTML += `</div><div class="settings-content" style="padding: 20px;">`;

// Remove from sidebar
settingsIds.forEach(id => {
  $(`.sub-item[data-go="${id}"]`).remove();
});

// Rename Settings details category in sidebar to go to the new route
$('summary:contains("Settings & Audits")').parent().replaceWith(`
  <div class="sub-item" data-go="settings" style="margin-top:10px;"><i class="ti ti-settings"></i> Settings & Audits</div>
`);

// Move settings pages content into tab-panes
firstTab = true;
settingsIds.forEach(id => {
  const page = $(`.page[data-page="${id}"]`);
  // Remove the page-hd from individual settings
  page.find('.page-hd').remove();
  settingsPageHTML += `<div class="tab-pane ${firstTab ? 'active' : ''}" data-tab-pane="${id}">${page.html()}</div>`;
  page.remove();
  firstTab = false;
});

settingsPageHTML += `</div></div></section>`;
$('main.main-content').append(settingsPageHTML);

// --- Task 2.2: Dashboard split into themed views ---
const dashboard = $('.page[data-page="dashboard-admin"]');
// Rename to just 'dashboard'
dashboard.attr('data-page', 'dashboard');
$('.sub-item[data-go="dashboard-admin"]').attr('data-go', 'dashboard');

// Insert tab bar after page-hd
const dashTabs = `
  <div class="tab-bar" style="margin-bottom: 20px;">
    <div class="tab-btn active" data-tab="overview">Overview</div>
    <div class="tab-btn" data-tab="people">People</div>
    <div class="tab-btn" data-tab="operations">Operations</div>
    <div class="tab-btn" data-tab="finance">Finance</div>
    <div class="tab-btn" data-tab="recruiting">Recruiting</div>
  </div>
  <div class="dashboard-tabs-content">
    <div class="tab-pane active" data-tab-pane="overview"></div>
    <div class="tab-pane" data-tab-pane="people"></div>
    <div class="tab-pane" data-tab-pane="operations"></div>
    <div class="tab-pane" data-tab-pane="finance"></div>
    <div class="tab-pane" data-tab-pane="recruiting"></div>
  </div>
`;

dashboard.find('.page-hd').after(dashTabs);

// We need to move children of dashboard into the correct panes.
// First, find all children after dashboard-tabs-content.
const dashNodes = dashboard.children().filter(function() {
  return $(this).prevAll('.dashboard-tabs-content').length > 0;
});

// Let's identify sections based on sec-title
let currentPane = 'overview';
const mapping = {
  'Live Overview': 'overview',
  'Attendance Analytics': 'operations',
  'Employee Analytics': 'people',
  'Recruitment & Pipeline': 'recruiting',
  'Projects & Productivity': 'operations',
  'Payroll & Finance': 'finance',
  'Live Activity Feed': 'overview',
  'Upcoming Milestones': 'overview',
  'AI Insights': 'overview', // from comments
};

dashNodes.each(function() {
  const el = $(this);
  if (el.hasClass('sec-title') || el.text().includes('SECTION 8: AI INSIGHTS PANEL')) {
    const text = el.text();
    for (const key in mapping) {
      if (text.includes(key)) {
        currentPane = mapping[key];
        break;
      }
    }
    // Handle AI Insights edge case (it's a comment in html but maybe not text, let's just see)
    if(el.prop('tagName') === 'DIV' && el.find('.dash-card-ai').length > 0) {
       currentPane = 'overview'; // AI insights are overview
    }
  } else if (el.find('.ti-brain').length > 0) {
    currentPane = 'overview';
  }
  
  dashboard.find(`.tab-pane[data-tab-pane="${currentPane}"]`).append(el);
});

// Fix empty panes (fallback)
if(dashboard.find('.tab-pane[data-tab-pane="people"]').is(':empty')) {
  // Try to find employee analytics
}

// --- Task 2.4: Master menu cleanup ---
// Update breadcrumbs matching 'Master > '
$('.crumb').each(function() {
  let text = $(this).html();
  if (text.includes('Master')) {
    text = text.replace(/Master\s*<i[^>]+><\/i>\s*(Salary Components|Departments)/, 'Organization Setup <i class="ti ti-chevron-right"></i> $1');
    $(this).html(text);
  }
});

// --- Task 2.5: Merge duplicate Leave Operations Center ---
const leavePages = $('.page[data-page="leave-mgmt"]');
if (leavePages.length > 1) {
  // the first one is usually employee, second is admin, or vice versa.
  // We'll wrap the contents of both in a toggleable container.
  const content1 = leavePages.eq(0).find('.card, .row-3, .row-2').parent().html();
  const content2 = leavePages.eq(1).find('.card, .row-3, .row-2').parent().html();
  
  const mergedHTML = `
    <div class="leave-view-employee admin-hide" style="display:none;">${content1}</div>
    <div class="leave-view-admin admin-only">${content2}</div>
  `;
  
  leavePages.eq(0).find('.page-hd').after(mergedHTML);
  // remove the original content from page 0
  leavePages.eq(0).children().not('.page-hd, .leave-view-employee, .leave-view-admin').remove();
  
  // Remove the second page entirely
  leavePages.eq(1).remove();
}

// --- Routing JS Script Injection ---
const routingJS = `
  // Routing script (Phase 2)
  const pages = document.querySelectorAll('.page');
  const subItems = document.querySelectorAll('.sub-item');
  
  function handleRoute() {
    let hash = window.location.hash.replace('#/', '') || 'dashboard';
    const routeParts = hash.split('/');
    const mainRoute = routeParts[0];
    
    pages.forEach(p => p.classList.remove('show'));
    
    let targetPage = document.querySelector('.page[data-page="' + mainRoute + '"]');
    if (targetPage) {
      targetPage.classList.add('show');
    } else {
      document.querySelector('.page[data-page="dashboard"]')?.classList.add('show');
    }
    
    subItems.forEach(si => si.classList.remove('active'));
    const activeItem = document.querySelector('.sub-item[data-go="' + mainRoute + '"]');
    if(activeItem) {
      activeItem.classList.add('active');
      const details = activeItem.closest('details');
      if(details) details.open = true;
    }
    
    if(routeParts.length > 1) {
       const subRoute = routeParts[1];
       const tabBtn = targetPage?.querySelector('.tab-btn[data-tab="' + subRoute + '"]');
       if(tabBtn) tabBtn.click();
    }
  }

  window.addEventListener('hashchange', handleRoute);
  
  document.addEventListener('DOMContentLoaded', () => {
     if(!window.location.hash) window.location.hash = '#/dashboard';
     else handleRoute();
  });
  
  // Hook up tabs to URL hash for deep linking (for dashboard and settings)
  document.querySelectorAll('.page[data-page="dashboard"] .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.hash = '#/dashboard/' + btn.getAttribute('data-tab');
    });
  });

  document.querySelectorAll('.page[data-page="settings"] .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.hash = '#/settings/' + btn.getAttribute('data-tab');
    });
  });

  // Make sub-items set the hash instead of clicking
  subItems.forEach(item => {
    // remove old click listeners by cloning (if needed, but simple attribute change works)
    item.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent default behavior
      const go = item.getAttribute('data-go');
      if(go) window.location.hash = '#/' + go;
    });
  });
`;

$('script').last().append(routingJS);

// Remove the old navigation logic inside the first script tag 
const firstScript = $('script').eq(0);
let scriptContent = firstScript.html();
// We'll just leave it or overwrite it if it interferes.
// Actually, it relies on adding/removing '.show'. Since we also do it, it might run twice, but setting hash is better.
// Let's replace the old sub-item click logic in scriptContent
scriptContent = scriptContent.replace(/subItems\.forEach\(item => {[\s\S]*?\/\/ Show target page[\s\S]*?\}\);[\s\S]*?\}\);/g, '// Legacy nav removed');
firstScript.html(scriptContent);

fs.writeFileSync('index.html', $.html());
console.log('Phase 2 DOM restructuring complete!');
