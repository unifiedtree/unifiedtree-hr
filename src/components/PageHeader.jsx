export function PageHeader({ title, eyebrow, actions }) {
  return (
    <div className="page-hd">
      <div>
        <h2 className="page-title">{title}</h2>
        <div className="crumb">{eyebrow}</div>
      </div>
      {actions ? <div className="hd-actions">{actions}</div> : null}
    </div>
  );
}
