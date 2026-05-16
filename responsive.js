const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// 1. Add hamburger button to topbar
content = content.replace(
  '<header class="topbar">',
  '<header class="topbar">\n      <button class="mobile-nav-toggle" id="mobile-nav-btn"><i class="ti ti-menu-2"></i></button>'
);

// 2. Add responsive CSS
const responsiveCSS = `
    /* Responsive Styles (Phase 8) */
    .mobile-nav-toggle {
      display: none;
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      color: var(--text);
      border: none;
      background: transparent;
      margin-right: 8px;
    }

    /* Modal Overlay for mobile sidebar */
    .sidebar-overlay {
      display: none;
      position: fixed;
      top: 57px;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      z-index: 999;
      animation: fadeIn 0.2s ease;
    }

    .sidebar-overlay.show {
      display: block;
    }

    @media (max-width: 1024px) {
      .body-layout {
        grid-template-columns: 1fr;
      }
      
      .mobile-nav-toggle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      
      .sidebar {
        position: fixed;
        top: 57px;
        left: -260px;
        width: 260px;
        height: calc(100vh - 57px);
        z-index: 1000;
        transition: left 0.3s ease;
        box-shadow: 4px 0 10px rgba(0,0,0,0.1);
      }
      
      .sidebar.open {
        left: 0;
      }
    }

    @media (max-width: 768px) {
      /* Grid Stacking */
      .row-4, .row-3, .row-2, .row-2-1, .row-1-2 {
        grid-template-columns: 1fr !important;
      }
      
      .topbar {
        padding: 10px;
        flex-wrap: wrap;
      }
      
      .search-wrap {
        order: 3;
        max-width: 100%;
        width: 100%;
        margin-top: 10px;
      }
      
      /* Tap targets */
      .btn, .icon-btn, .sub-item, .tab-btn {
        min-height: 44px;
        display: inline-flex;
        align-items: center;
      }

      /* Stacked Tables - simple overflow for now to avoid breaking */
      .card {
        overflow-x: auto;
      }
      
      /* Charts stacking is handled by grid-template-columns */
    }
  </style>
`;

content = content.replace('  </style>', responsiveCSS);

// 3. Add overlay div before main-content
content = content.replace(
  '<main class="main-content">',
  '<div class="sidebar-overlay" id="sidebar-overlay"></div>\n      <main class="main-content">'
);

// 4. Add JS for hamburger menu
const responsiveJS = `
    // Mobile Sidebar Toggle
    const mobileBtn = document.getElementById('mobile-nav-btn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if(mobileBtn && sidebar && overlay) {
      function toggleSidebar() {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('show');
      }

      mobileBtn.addEventListener('click', toggleSidebar);
      overlay.addEventListener('click', toggleSidebar);

      // Close sidebar when a sub-item is clicked on mobile
      const sidebarItems = document.querySelectorAll('.sidebar .sub-item');
      sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
          if(window.innerWidth <= 1024 && sidebar.classList.contains('open')) {
            toggleSidebar();
          }
        });
      });
    }
  </script>
`;

content = content.replace('  </script>', responsiveJS);

fs.writeFileSync('index.html', content);
console.log('Responsive CSS and JS added!');
