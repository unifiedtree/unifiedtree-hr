import { StatusBadge, statusTone } from './StatusBadge';

export function AttentionList({ title, items }) {
  return (
    <div className="dash-card">
      <div className="card-hd"><div className="card-title">{title}</div></div>
      <div style={{ display: 'grid', gap: 12 }}>
        {items.map((item) => (
          <div key={`${item.label}-${item.status}`} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}>
            <span>{item.label}</span>
            <StatusBadge tone={statusTone(item.status)}>{item.status}</StatusBadge>
          </div>
        ))}
      </div>
    </div>
  );
}
