import { useEffect, useState } from 'react';
import { CommandPalette } from './components/CommandPalette';
import { LegacyPage } from './components/LegacyPage';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { routeRegistry } from './data/navigation';
import { legacyPages } from './data/legacyPages';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { nativePageRoutes } from './pages/NativeModules';

function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [route = 'dashboard', subroute = 'overview'] = raw.split('/');
  return { route: route || 'dashboard', subroute: subroute || 'overview' };
}

export default function App() {
  const [location, setLocation] = useState(parseHash);
  const [persona, setPersona] = useState('admin');
  const [searchOpen, setSearchOpen] = useState(false);
  const NativePage = nativePageRoutes[location.route];

  useEffect(() => {
    const onHashChange = () => setLocation(parseHash());
    window.addEventListener('hashchange', onHashChange);
    if (!window.location.hash) window.location.hash = '#/dashboard/overview';
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('persona-admin', persona === 'admin');
    document.body.classList.toggle('persona-employee', persona === 'employee');
  }, [persona]);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') setSearchOpen(false);
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  function navigate(route) {
    window.location.hash = route === 'dashboard' ? '#/dashboard/overview' : `#/${route}`;
    setSearchOpen(false);
  }

  function changeDashboardTab(tab) {
    window.location.hash = `#/dashboard/${tab}`;
  }

  return (
    <div className={`app persona-${persona}`}>
      <Topbar
        persona={persona}
        onOpenSearch={() => setSearchOpen(true)}
        onTogglePersona={() => setPersona((current) => (current === 'admin' ? 'employee' : 'admin'))}
      />
      <div className="body-layout">
        <Sidebar activeRoute={location.route} persona={persona} onNavigate={navigate} />
        <div className="sidebar-overlay" id="sidebar-overlay" />
        <main className="main-content">
          {location.route === 'dashboard' ? (
            <DashboardPage activeTab={location.subroute} onTabChange={changeDashboardTab} />
          ) : NativePage ? (
            <NativePage subroute={location.subroute} />
          ) : legacyPages[location.route] ? (
            <LegacyPage
              route={location.route}
              page={legacyPages[location.route]}
              subroute={location.subroute}
              onNavigate={navigate}
            />
          ) : (
            <RoutePlaceholder route={location.route} />
          )}
        </main>
      </div>
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={navigate} />
    </div>
  );
}

function RoutePlaceholder({ route }) {
  const routeMeta = routeRegistry[route];
  const title = routeMeta?.label || 'React migration in progress';
  const group = routeMeta?.group || 'Registered route';

  return (
    <section className="page show" data-page={route}>
      <div className="page-hd">
        <div>
          <h2 className="page-title">{title}</h2>
          <div className="crumb"><i className="ti ti-code" /> {group} <i className="ti ti-chevron-right" /> Phase 2 route parity</div>
        </div>
      </div>
      <div className="card">
        <div className="card-title">Static page preserved for conversion</div>
        <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
          Route <strong>{route}</strong> is registered in the React shell. Its full module content remains in
          <code> legacy-static.html</code> and will be converted in the approved migration phases.
        </p>
      </div>
    </section>
  );
}
