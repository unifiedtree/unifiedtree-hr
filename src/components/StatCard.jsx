export function StatCard({ label, value, trend, icon, tone }) {
  return (
    <div className="dash-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="dash-stat-lbl">{label}</div>
          <div className="dash-stat-val">{value}</div>
          <div className="trend up"><i className="ti ti-trending-up" /> {trend}</div>
        </div>
        <div className={`dash-icon-wrap ${tone}`}><i className={`ti ${icon}`} /></div>
      </div>
    </div>
  );
}
