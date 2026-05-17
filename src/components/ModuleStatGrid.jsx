export function ModuleStatGrid({ stats }) {
  return (
    <div className="row-4" style={{ marginBottom: 20 }}>
      {stats.map((stat) => (
        <div className="dash-card" key={stat.label}>
          <div className="dash-stat-lbl">{stat.label}</div>
          <div className="dash-stat-val">{stat.value}</div>
          <div className={`trend ${stat.tone === 'down' ? 'down' : 'up'}`}>
            <i className={`ti ${stat.icon || 'ti-trending-up'}`} /> {stat.note}
          </div>
        </div>
      ))}
    </div>
  );
}
