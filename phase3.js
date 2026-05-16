const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// --- Task 3.1: Global Search / Command Palette ---
const searchOverlayHTML = `
<div class="cmd-palette-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(15,23,42,0.6); z-index:9999; align-items:flex-start; justify-content:center; padding-top:100px; backdrop-filter: blur(4px);">
  <div class="cmd-palette" style="background:var(--card); width:90%; max-width:600px; border-radius:12px; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04); overflow:hidden; border:1px solid var(--border); animation: fadeIn 0.15s ease-out;">
    <div style="display:flex; align-items:center; padding:16px; border-bottom:1px solid var(--border);">
      <i class="ti ti-search" style="font-size:20px; color:var(--text-tertiary); margin-right:12px;"></i>
      <input type="text" id="cmd-input" placeholder="Search employees, payroll, settings..." style="flex:1; border:none; outline:none; font-size:16px; background:transparent; color:var(--text);">
      <div style="font-size:12px; color:var(--text-tertiary); border:1px solid var(--border); padding:2px 6px; border-radius:4px; font-weight:600;">ESC</div>
    </div>
    <div style="padding:16px; max-height:400px; overflow-y:auto;">
      <div style="font-size:11px; font-weight:600; color:var(--text-tertiary); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:10px;">Recent Searches</div>
      <div class="cmd-item" style="display:flex; align-items:center; padding:10px 12px; cursor:pointer; border-radius:6px; margin-bottom:4px; transition:background 0.15s;"><i class="ti ti-user" style="margin-right:12px; color:var(--text-secondary); font-size:18px;"></i><span style="font-weight:500;">John Smith</span> <span style="margin-left:auto; font-size:12px; color:var(--text-tertiary);">Payroll Profile</span></div>
      <div class="cmd-item" style="display:flex; align-items:center; padding:10px 12px; cursor:pointer; border-radius:6px; margin-bottom:4px; transition:background 0.15s;"><i class="ti ti-file-invoice" style="margin-right:12px; color:var(--text-secondary); font-size:18px;"></i><span style="font-weight:500;">Q3 Performance Reviews</span> <span style="margin-left:auto; font-size:12px; color:var(--text-tertiary);">Report</span></div>
      
      <div style="font-size:11px; font-weight:600; color:var(--text-tertiary); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:10px; margin-top:20px;">Quick Actions</div>
      <div class="cmd-item" style="display:flex; align-items:center; padding:10px 12px; cursor:pointer; border-radius:6px; margin-bottom:4px; transition:background 0.15s;"><i class="ti ti-user-plus" style="margin-right:12px; color:var(--primary); font-size:18px;"></i><span style="font-weight:500;">Add New Employee</span></div>
      <div class="cmd-item" style="display:flex; align-items:center; padding:10px 12px; cursor:pointer; border-radius:6px; margin-bottom:4px; transition:background 0.15s;"><i class="ti ti-calendar-plus" style="margin-right:12px; color:var(--blue); font-size:18px;"></i><span style="font-weight:500;">Apply for Leave</span></div>
      <div class="cmd-item" style="display:flex; align-items:center; padding:10px 12px; cursor:pointer; border-radius:6px; margin-bottom:4px; transition:background 0.15s;"><i class="ti ti-file-download" style="margin-right:12px; color:var(--green); font-size:18px;"></i><span style="font-weight:500;">Download Monthly PF Report</span></div>
    </div>
  </div>
</div>
`;
$('body').append(searchOverlayHTML);

// --- Task 3.2: Persona Switcher Setup ---
// We need to mark specific sidebar items/details as .admin-only
$('details').each(function() {
  const summaryText = $(this).find('summary').text();
  if (summaryText.includes('Recruitment') || 
      summaryText.includes('Payroll & Compensation') || 
      summaryText.includes('Compliance & Statutory') || 
      summaryText.includes('Reports & Analytics')) {
    $(this).addClass('admin-only');
  }
});

// Settings & Audits item
$('.sub-item[data-go="settings"]').addClass('admin-only');
// Companies & Branches
$('.sub-item[data-go="companies"]').addClass('admin-only');
$('.sub-item[data-go="branches"]').addClass('admin-only');

// We also have duplicate leave center already wrapped with .admin-only and .admin-hide in phase 2.
// Let's add basic CSS for these states
const phase3CSS = `
<style>
  .cmd-item:hover { background: var(--bg); }
  
  /* Dropdown Menus */
  .dropdown-wrapper {
    position: relative;
    display: inline-block;
  }
  .dropdown-menu {
    position: absolute;
    right: 0;
    top: calc(100% + 5px);
    background: var(--card);
    border: 1px solid var(--border);
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    border-radius: 8px;
    width: 180px;
    z-index: 100;
    display: none;
    flex-direction: column;
    padding: 6px;
    animation: fadeIn 0.1s ease-out;
  }
  .dropdown-menu.show {
    display: flex;
  }
  .dropdown-item {
    padding: 8px 12px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.1s;
  }
  .dropdown-item:hover {
    background: var(--bg);
    color: var(--text);
  }
  .dropdown-item.danger {
    color: var(--red);
  }
  .dropdown-item.danger:hover {
    background: #FEF2F2;
  }
  
  /* Persona States */
  body.persona-employee .admin-only {
    display: none !important;
  }
  body.persona-admin .admin-hide {
    display: none !important;
  }
</style>
`;
$('head').append(phase3CSS);

// --- Task 3.3: Action Menus (Three-dot dropdowns) ---
// Find buttons with ti-dots-vertical and wrap them in a dropdown-wrapper
$('button.icon-btn').each(function() {
  if ($(this).find('.ti-dots-vertical').length > 0) {
    const parent = $(this).parent();
    // We only want to wrap if it isn't already wrapped. It shouldn't be.
    $(this).wrap('<div class="dropdown-wrapper"></div>');
    const dropdownHtml = `
      <div class="dropdown-menu">
        <div class="dropdown-item"><i class="ti ti-eye"></i> View Details</div>
        <div class="dropdown-item"><i class="ti ti-edit"></i> Edit Record</div>
        <div style="height:1px; background:var(--border); margin:4px 0;"></div>
        <div class="dropdown-item danger"><i class="ti ti-trash"></i> Delete</div>
      </div>
    `;
    $(this).after(dropdownHtml);
    $(this).addClass('dropdown-trigger');
  }
});


// Inject Phase 3 JS
const phase3JS = `
<script>
  // --- Phase 3 JS: Interactive Elements ---
  
  // 1. Command Palette / Global Search
  const cmdOverlay = document.querySelector('.cmd-palette-overlay');
  const searchInput = document.querySelector('.search-input');
  const cmdInput = document.getElementById('cmd-input');

  if (searchInput && cmdOverlay && cmdInput) {
    searchInput.addEventListener('focus', (e) => {
      e.target.blur();
      cmdOverlay.style.display = 'flex';
      setTimeout(() => cmdInput.focus(), 50);
    });

    cmdOverlay.addEventListener('click', (e) => {
      if (e.target === cmdOverlay) {
        cmdOverlay.style.display = 'none';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        cmdOverlay.style.display = 'none';
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        cmdOverlay.style.display = 'flex';
        setTimeout(() => cmdInput.focus(), 50);
      }
    });
  }

  // 2. Persona Switcher
  const roleSwitcher = document.getElementById('role-switcher');
  const activeRoleText = document.getElementById('active-role');
  let currentRole = 'admin'; // default is admin, but CSS default assumes no class means admin if we want, or we set body class.
  
  // Initialize
  document.body.classList.add('persona-admin');
  
  if (roleSwitcher && activeRoleText) {
    roleSwitcher.addEventListener('click', () => {
      if (currentRole === 'admin') {
        currentRole = 'employee';
        document.body.classList.replace('persona-admin', 'persona-employee');
        activeRoleText.textContent = 'View As: Employee';
        roleSwitcher.style.background = '#F0FDF4'; // light green
        roleSwitcher.style.color = '#166534';
        
        // Auto-redirect if they are on an admin-only page
        const hash = window.location.hash;
        if(hash.includes('payroll') || hash.includes('settings') || hash.includes('recruiting')) {
          window.location.hash = '#/dashboard/overview';
        }
      } else {
        currentRole = 'admin';
        document.body.classList.replace('persona-employee', 'persona-admin');
        activeRoleText.textContent = 'View As: Admin';
        roleSwitcher.style.background = 'var(--primary-soft)';
        roleSwitcher.style.color = 'var(--primary-dark)';
      }
    });
  }
  
  // 3. Dropdown Menus
  document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const menu = trigger.nextElementSibling;
      // close others
      document.querySelectorAll('.dropdown-menu.show').forEach(m => {
        if(m !== menu) m.classList.remove('show');
      });
      menu.classList.toggle('show');
    });
  });
  
  // Close dropdowns on outside click
  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu.show').forEach(m => {
      m.classList.remove('show');
    });
  });
  
</script>
`;
$('body').append(phase3JS);

fs.writeFileSync('index.html', $.html());
console.log('Phase 3 Interactive Elements successfully injected!');
