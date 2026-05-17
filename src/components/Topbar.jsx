export function Topbar({ persona, onTogglePersona, onOpenSearch }) {
  return (
    <header className="topbar">
      <button className="mobile-nav-toggle" id="mobile-nav-btn" type="button" aria-label="Open navigation">
        <i className="ti ti-menu-2" />
      </button>
      <div className="logo">
        <i className="ti ti-tree" />
        Unified Tree
      </div>
      <button
        type="button"
        className="co-pill"
        id="role-switcher"
        onClick={onTogglePersona}
        style={{ background: 'var(--primary-soft)', color: 'var(--primary-dark)', borderColor: 'var(--primary-soft)' }}
      >
        <i className="ti ti-shield-lock" style={{ fontSize: 13 }} />
        <span id="active-role">View As: {persona === 'admin' ? 'Admin' : 'Employee'}</span>
        <i className="ti ti-arrows-exchange" style={{ fontSize: 13, marginLeft: 4 }} />
      </button>
      <div className="search-wrap">
        <i className="ti ti-search" />
        <input
          className="search-input"
          placeholder="Search employees, leaves, payroll, settings..."
          onFocus={(event) => {
            event.target.blur();
            onOpenSearch();
          }}
        />
      </div>
      <div style={{ flex: 1 }} />
      <button className="icon-btn" type="button" aria-label="Messages">
        <i className="ti ti-message" />
        <span className="dot" />
      </button>
      <button className="icon-btn" type="button" aria-label="Notifications">
        <i className="ti ti-bell" />
        <span className="dot" />
      </button>
      <button className="icon-btn" type="button" aria-label="Settings">
        <i className="ti ti-settings" />
      </button>
      <div className="profile-avatar" title="Adrian Herman">AH</div>
    </header>
  );
}
