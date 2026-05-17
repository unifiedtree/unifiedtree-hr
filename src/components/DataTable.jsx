import { StatusBadge, statusTone } from './StatusBadge';

export function DataTable({ columns, rows, getKey = (_, index) => index }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="tbl" style={{ margin: 0, border: 'none', width: '100%', minWidth: 760 }}>
        <thead>
          <tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={getKey(row, index)}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.status ? <StatusBadge tone={statusTone(row[column.key])}>{row[column.key]}</StatusBadge> : column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
