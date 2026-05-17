export function ActivityFeed({ activities }) {
  return (
    <div className="dash-card">
      <div className="card-hd"><div className="card-title">Recent Activity</div></div>
      <div style={{ display: 'grid', gap: 12 }}>
        {activities.map((item) => (
          <div key={`${item.time}-${item.text}`} style={{ display: 'grid', gridTemplateColumns: '56px 96px 1fr', gap: 12, alignItems: 'center' }}>
            <strong>{item.time}</strong>
            <span className="badge blue">{item.module}</span>
            <span style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
