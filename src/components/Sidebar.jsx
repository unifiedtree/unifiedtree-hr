import { navigationGroups } from '../data/navigation';

export function Sidebar({ activeRoute, persona, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-co-profile" id="co-switcher-side">
        <div className="co-icon"><i className="ti ti-building" /></div>
        <div className="co-info">
          <div className="co-name" id="active-co-side">Company A</div>
          <div className="co-branch" id="active-co-branch">HQ branch</div>
        </div>
        <i className="ti ti-selector co-sel" />
      </div>

      {navigationGroups.map((group) => {
        if (group.adminOnly && persona !== 'admin') return null;
        const visibleItems = group.items.filter((item) => !item.adminOnly || persona === 'admin');
        if (!visibleItems.length) return null;
        const isSingle = visibleItems.length === 1 && !group.icon;

        return (
          <div key={group.label}>
            <div className="nav-cat">{group.label.toUpperCase()}</div>
            {isSingle ? (
              <SidebarItem item={visibleItems[0]} activeRoute={activeRoute} onNavigate={onNavigate} />
            ) : (
              <details open={visibleItems.some((item) => item.route === activeRoute)}>
                <summary>
                  <i className={`ti ${group.icon} lead`} />
                  {group.label}
                  <i className="ti ti-chevron-right chev" />
                </summary>
                {visibleItems.map((item) => (
                  <SidebarItem key={item.route} item={item} activeRoute={activeRoute} onNavigate={onNavigate} />
                ))}
              </details>
            )}
          </div>
        );
      })}
    </aside>
  );
}

function SidebarItem({ item, activeRoute, onNavigate }) {
  return (
    <button
      type="button"
      className={`sub-item ${activeRoute === item.route ? 'active' : ''}`}
      onClick={() => onNavigate(item.route)}
    >
      {item.icon ? <i className={`ti ${item.icon}`} style={{ marginRight: 8, fontSize: 16 }} /> : null}
      {item.label}
    </button>
  );
}
