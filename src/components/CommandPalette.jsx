import { useMemo, useState } from 'react';
import { navigationGroups, routeRegistry } from '../data/navigation';

const quickActions = [
  { label: 'Add New Employee', icon: 'ti-user-plus', route: 'workforce-dir' },
  { label: 'Apply for Leave', icon: 'ti-calendar-plus', route: 'leave-mgmt' },
  { label: 'Download Monthly PF Report', icon: 'ti-file-download', route: 'report-payroll' },
];

export function CommandPalette({ open, onClose, onNavigate }) {
  const recentRoutes = ['dashboard-payroll', 'report-payroll', 'settings'];
  const [query, setQuery] = useState('');
  const moduleResults = useMemo(() => {
    const searchableRoutes = navigationGroups.flatMap((group) =>
      group.items.map((item) => ({
        ...item,
        group: group.label,
        icon: item.icon || group.icon || 'ti-layout-grid',
      })),
    );
    const normalisedQuery = query.trim().toLowerCase();
    const results = normalisedQuery
      ? searchableRoutes.filter((route) => `${route.label} ${route.group} ${route.route}`.toLowerCase().includes(normalisedQuery))
      : searchableRoutes;
    return results.slice(0, 8);
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="cmd-palette-overlay"
      style={{
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(15,23,42,0.6)',
        zIndex: 9999,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 100,
        backdropFilter: 'blur(4px)',
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="cmd-palette"
        role="dialog"
        aria-modal="true"
        aria-label="Search and quick actions"
        style={{
          background: 'var(--card)',
          width: '90%',
          maxWidth: 600,
          borderRadius: 12,
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
          overflow: 'hidden',
          border: '1px solid var(--border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', padding: 16, borderBottom: '1px solid var(--border)' }}>
          <i className="ti ti-search" style={{ fontSize: 20, color: 'var(--text-tertiary)', marginRight: 12 }} />
          <input
            autoFocus
            type="text"
            id="cmd-input"
            placeholder="Search employees, payroll, settings..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && moduleResults[0]) onNavigate(moduleResults[0].route);
            }}
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 16, background: 'transparent', color: 'var(--text)' }}
          />
          <button type="button" className="icon-btn" aria-label="Close search" onClick={onClose}>
            <i className="ti ti-x" />
          </button>
        </div>
        <div style={{ padding: 16, maxHeight: 400, overflowY: 'auto' }}>
          <PaletteSection title="Recent Searches">
            {recentRoutes.map((route) => (
              <PaletteItem
                key={route}
                icon="ti-history"
                label={routeRegistry[route].label}
                meta={routeRegistry[route].group}
                onClick={() => onNavigate(route)}
              />
            ))}
          </PaletteSection>
          <PaletteSection title="Modules" style={{ marginTop: 20 }}>
            {moduleResults.length ? moduleResults.map((route) => (
              <PaletteItem
                key={route.route}
                icon={route.icon}
                label={route.label}
                meta={route.group}
                onClick={() => onNavigate(route.route)}
              />
            )) : (
              <div style={{ color: 'var(--text-secondary)', fontSize: 13, padding: '10px 12px' }}>No matching modules found</div>
            )}
          </PaletteSection>
          <PaletteSection title="Quick Actions" style={{ marginTop: 20 }}>
            {quickActions.map((action) => (
              <PaletteItem
                key={action.label}
                icon={action.icon}
                label={action.label}
                onClick={() => onNavigate(action.route)}
              />
            ))}
          </PaletteSection>
        </div>
      </div>
    </div>
  );
}

function PaletteSection({ title, children, style }) {
  return (
    <div style={style}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function PaletteItem({ icon, label, meta, onClick }) {
  return (
    <button
      type="button"
      className="cmd-item"
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '10px 12px',
        cursor: 'pointer',
        borderRadius: 6,
        marginBottom: 4,
        transition: 'background 0.15s',
        border: 0,
        background: 'transparent',
        color: 'var(--text)',
        textAlign: 'left',
        font: 'inherit',
      }}
      onClick={onClick}
    >
      <i className={`ti ${icon}`} style={{ marginRight: 12, color: 'var(--text-secondary)', fontSize: 18 }} />
      <span style={{ fontWeight: 500 }}>{label}</span>
      {meta ? <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-tertiary)' }}>{meta}</span> : null}
    </button>
  );
}
