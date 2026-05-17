const toneClass = {
  success: 'green',
  warning: 'orange',
  danger: 'red',
  info: 'blue',
};

export function StatusBadge({ children, tone = 'info' }) {
  return <span className={`badge ${toneClass[tone] || toneClass.info}`}>{children}</span>;
}

export function statusTone(status) {
  const value = String(status).toLowerCase();
  if (['present', 'approved', 'active', 'processed', 'paid', 'on track', 'low'].some((key) => value.includes(key))) return 'success';
  if (['pending', 'review', 'late', 'awaiting', 'medium', 'policy'].some((key) => value.includes(key))) return 'warning';
  if (['absent', 'rejected', 'hold', 'critical', 'high', 'not marked'].some((key) => value.includes(key))) return 'danger';
  return 'info';
}
