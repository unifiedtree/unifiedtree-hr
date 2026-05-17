import Chart from 'react-apexcharts';
import { ActivityFeed } from '../components/ActivityFeed';
import { AttentionList } from '../components/AttentionList';
import { DataTable } from '../components/DataTable';
import { ModuleStatGrid } from '../components/ModuleStatGrid';
import { PageHeader } from '../components/PageHeader';
import { StatusBadge, statusTone } from '../components/StatusBadge';
import {
  activities,
  attendanceRecords,
  complianceItems,
  departments,
  employees,
  expenseClaims,
  formatINR,
  formatLakhCrore,
  leaveRequests,
  payrollRuns,
  recruitmentPipeline,
} from '../data/mockData';

export const nativePageRoutes = {
  'workforce-dir': WorkforceDirectory,
  'att-analytics': AttendanceAnalytics,
  'leave-mgmt': LeaveOperations,
  'hiring-pipeline': HiringPipeline,
  'dashboard-payroll': PayrollDashboard,
  'expense-center': ExpenseCenter,
  'emp-performance': PerformanceDashboard,
  'compliance-calendar': ComplianceCalendar,
  settings: SettingsPage,
};

function WorkforceDirectory() {
  return (
    <section className="page show" data-page="workforce-dir">
      <PageHeader title="Workforce Directory" eyebrow={<><i className="ti ti-users" /> Master <i className="ti ti-chevron-right" /> Workforce Directory</>} />
      <ModuleStatGrid stats={[
        { label: 'Total Employees', value: employees.length, note: '6 departments covered', icon: 'ti-users' },
        { label: 'Present Today', value: employees.filter((e) => e.attendance === 'Present').length, note: 'Live mock muster', icon: 'ti-user-check' },
        { label: 'Payroll Holds', value: employees.filter((e) => e.payroll === 'Hold').length, note: 'Needs HR action', icon: 'ti-alert-circle', tone: 'down' },
        { label: 'Branches', value: '3', note: 'Bangalore, Pune, Mumbai', icon: 'ti-building' },
      ]} />
      <div className="row-2" style={{ gridTemplateColumns: '1fr 2fr' }}>
        <DepartmentCard />
        <div className="dash-card">
          <div className="card-hd"><div className="card-title">Employee Master</div><StatusBadge tone="success">{employees.length} mock records</StatusBadge></div>
          <DataTable
            rows={employees}
            getKey={(row) => row.id}
            columns={[
              { key: 'name', label: 'Employee', render: (row) => <strong>{row.name}</strong> },
              { key: 'department', label: 'Department' },
              { key: 'role', label: 'Role' },
              { key: 'branch', label: 'Branch' },
              { key: 'attendance', label: 'Attendance', status: true },
              { key: 'payroll', label: 'Payroll', status: true },
              { key: 'ctc', label: 'CTC', render: (row) => formatINR(row.ctc) },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function AttendanceAnalytics() {
  const present = attendanceRecords.at(-1).present;
  const absent = attendanceRecords.at(-1).absent;
  return (
    <section className="page show" data-page="att-analytics">
      <PageHeader title="Attendance Analytics" eyebrow={<><i className="ti ti-clock" /> Attendance & Time <i className="ti ti-chevron-right" /> Analytics</>} />
      <ModuleStatGrid stats={[
        { label: 'Present Today', value: present, note: 'Latest day in mock data', icon: 'ti-user-check' },
        { label: 'Absent', value: absent, note: 'Manager review needed', icon: 'ti-user-x', tone: 'down' },
        { label: 'WFH', value: attendanceRecords.at(-1).wfh, note: 'Approved requests', icon: 'ti-home' },
        { label: 'Late Arrivals', value: attendanceRecords.at(-1).late, note: 'Policy threshold watch', icon: 'ti-clock-exclamation', tone: 'down' },
      ]} />
      <div className="row-2">
        <div className="dash-card">
          <div className="card-title">Weekly Attendance Trend</div>
          <Chart type="area" height={280} series={[
            { name: 'Present', data: attendanceRecords.map((r) => r.present) },
            { name: 'Absent', data: attendanceRecords.map((r) => r.absent) },
            { name: 'WFH', data: attendanceRecords.map((r) => r.wfh) },
          ]} options={{ chart: { toolbar: { show: false } }, colors: ['var(--green)', 'var(--red)', 'var(--blue)'], stroke: { curve: 'smooth', width: 2 }, dataLabels: { enabled: false }, xaxis: { categories: attendanceRecords.map((r) => r.day) } }} />
        </div>
        <AttentionList title="Needs Attention" items={[
          { label: 'Not marked punches', status: 'Pending' },
          { label: 'Late arrival exception', status: 'Review' },
          { label: 'Face punch mismatch', status: 'Critical' },
        ]} />
      </div>
    </section>
  );
}

function LeaveOperations() {
  return (
    <section className="page show" data-page="leave-mgmt">
      <PageHeader title="Leave Operations Center" eyebrow={<><i className="ti ti-beach" /> Leave Management <i className="ti ti-chevron-right" /> Operations</>} />
      <ModuleStatGrid stats={[
        { label: 'Pending Requests', value: leaveRequests.filter((r) => r.status === 'Pending').length, note: 'Awaiting approval', icon: 'ti-hourglass' },
        { label: 'Approved This Week', value: leaveRequests.filter((r) => r.status === 'Approved').length, note: 'Synced to roster', icon: 'ti-circle-check' },
        { label: 'Rejected', value: leaveRequests.filter((r) => r.status === 'Rejected').length, note: 'Policy mismatch', icon: 'ti-circle-x', tone: 'down' },
        { label: 'Comp Off Queue', value: '1', note: 'From overtime ledger', icon: 'ti-calendar-plus' },
      ]} />
      <div className="dash-card">
        <div className="card-hd"><div className="card-title">Recent Leave Requests</div><StatusBadge tone="warning">Mock approvals</StatusBadge></div>
        <DataTable rows={leaveRequests} columns={[
          { key: 'employee', label: 'Employee', render: (row) => <strong>{row.employee}</strong> },
          { key: 'type', label: 'Leave Type' },
          { key: 'dates', label: 'Dates' },
          { key: 'approver', label: 'Approver' },
          { key: 'status', label: 'Status', status: true },
        ]} />
      </div>
    </section>
  );
}

function HiringPipeline() {
  return (
    <section className="page show" data-page="hiring-pipeline">
      <PageHeader title="Hiring Pipeline" eyebrow={<><i className="ti ti-users-plus" /> Recruitment & Onboarding <i className="ti ti-chevron-right" /> Hiring</>} />
      <ModuleStatGrid stats={[
        { label: 'Open Roles', value: recruitmentPipeline.length, note: 'Across 4 teams', icon: 'ti-briefcase' },
        { label: 'Candidates', value: recruitmentPipeline.reduce((sum, role) => sum + role.candidates, 0), note: 'Active pipeline', icon: 'ti-user-search' },
        { label: 'Offer Value', value: formatLakhCrore(recruitmentPipeline.reduce((sum, role) => sum + role.offeredCtc, 0)), note: 'Indicative CTC', icon: 'ti-receipt-rupee' },
        { label: 'Finance Holds', value: '1', note: 'Offer budget review', icon: 'ti-alert-circle', tone: 'down' },
      ]} />
      <div className="row-2" style={{ gridTemplateColumns: '1fr 2fr' }}>
        <div className="dash-card">
          <div className="card-title">Hiring Funnel</div>
          <Chart type="bar" height={240} series={[{ name: 'Candidates', data: [186, 120, 45, 12] }]} options={{ chart: { toolbar: { show: false } }, plotOptions: { bar: { horizontal: true, borderRadius: 4 } }, colors: ['var(--primary)'], dataLabels: { enabled: false }, xaxis: { categories: ['Applied', 'Screened', 'Interview', 'Offered'] } }} />
        </div>
        <div className="dash-card">
          <div className="card-title">Priority Requisitions</div>
          <DataTable rows={recruitmentPipeline} columns={[
            { key: 'role', label: 'Role', render: (row) => <strong>{row.role}</strong> },
            { key: 'department', label: 'Department' },
            { key: 'candidates', label: 'Candidates' },
            { key: 'stage', label: 'Stage' },
            { key: 'offeredCtc', label: 'Offered CTC', render: (row) => formatINR(row.offeredCtc) },
            { key: 'status', label: 'Status', status: true },
          ]} />
        </div>
      </div>
    </section>
  );
}

function PayrollDashboard() {
  const latest = payrollRuns.at(-1);
  return (
    <section className="page show" data-page="dashboard-payroll">
      <PageHeader title="Payroll Dashboard" eyebrow={<><i className="ti ti-cash" /> Payroll <i className="ti ti-chevron-right" /> Run Health</>} />
      <ModuleStatGrid stats={[
        { label: 'Monthly Payroll', value: formatLakhCrore(latest.actual), note: 'June 2026 run', icon: 'ti-receipt-rupee' },
        { label: 'Budget Balance', value: formatLakhCrore(latest.budget - latest.actual), note: 'Remaining this month', icon: 'ti-chart-line' },
        { label: 'PF Liability', value: formatLakhCrore(latest.pf), note: 'Statutory payable', icon: 'ti-shield-check' },
        { label: 'TDS', value: formatLakhCrore(latest.tds), note: 'Deduction summary', icon: 'ti-file-percent' },
      ]} />
      <div className="row-2">
        <div className="dash-card">
          <div className="card-title">Payroll Cost Trend</div>
          <Chart type="area" height={280} series={[
            { name: 'Actual', data: payrollRuns.map((r) => r.actual / 100000) },
            { name: 'Budget', data: payrollRuns.map((r) => r.budget / 100000) },
          ]} options={{ chart: { toolbar: { show: false } }, colors: ['var(--primary)', 'var(--text-tertiary)'], stroke: { curve: 'smooth', width: 2 }, dataLabels: { enabled: false }, xaxis: { categories: payrollRuns.map((r) => r.month) }, yaxis: { labels: { formatter: (value) => `₹${value}L` } } }} />
        </div>
        <AttentionList title="Payroll Approval Queue" items={[
          { label: '2 payroll holds in Workforce Directory', status: 'Review' },
          { label: 'ESI reconciliation pending', status: 'Pending' },
          { label: 'Bank disbursement file ready', status: 'Approved' },
        ]} />
      </div>
    </section>
  );
}

function ExpenseCenter() {
  return (
    <section className="page show" data-page="expense-center">
      <PageHeader title="Expense Center" eyebrow={<><i className="ti ti-receipt" /> Expense Management <i className="ti ti-chevron-right" /> Claims</>} />
      <ModuleStatGrid stats={[
        { label: 'Open Claims', value: expenseClaims.length, note: 'Across categories', icon: 'ti-receipt' },
        { label: 'Pending Amount', value: formatLakhCrore(expenseClaims.filter((e) => e.status !== 'Paid').reduce((sum, item) => sum + item.amount, 0)), note: 'Approval exposure', icon: 'ti-hourglass' },
        { label: 'Policy Exceptions', value: expenseClaims.filter((e) => e.status === 'Policy Exception').length, note: 'Needs finance review', icon: 'ti-alert-triangle', tone: 'down' },
        { label: 'Paid Claims', value: expenseClaims.filter((e) => e.status === 'Paid').length, note: 'Closed this cycle', icon: 'ti-circle-check' },
      ]} />
      <div className="dash-card">
        <DataTable rows={expenseClaims} columns={[
          { key: 'employee', label: 'Employee', render: (row) => <strong>{row.employee}</strong> },
          { key: 'category', label: 'Category' },
          { key: 'amount', label: 'Amount', render: (row) => formatINR(row.amount) },
          { key: 'status', label: 'Status', status: true },
        ]} />
      </div>
    </section>
  );
}

function PerformanceDashboard() {
  return (
    <section className="page show" data-page="emp-performance">
      <PageHeader title="Employee Performance" eyebrow={<><i className="ti ti-target" /> Performance & Learning <i className="ti ti-chevron-right" /> Review Cycle</>} />
      <ModuleStatGrid stats={[
        { label: 'Reviews Due', value: '36', note: 'FY26 mid-year', icon: 'ti-clipboard-check' },
        { label: 'Completed', value: '112', note: 'Manager submitted', icon: 'ti-circle-check' },
        { label: 'Top Talent', value: '18', note: 'Promotion watchlist', icon: 'ti-star' },
        { label: 'Training Gaps', value: '24', note: 'Skill matrix gaps', icon: 'ti-school', tone: 'down' },
      ]} />
      <div className="row-2">
        <ActivityFeed activities={activities.filter((item) => ['Recruiting', 'Attendance', 'Payroll'].includes(item.module))} />
        <AttentionList title="Review Attention" items={[
          { label: 'Sales calibration pending', status: 'Pending' },
          { label: 'Engineering promotion panel', status: 'On Track' },
          { label: 'Operations skill audit', status: 'Review' },
        ]} />
      </div>
    </section>
  );
}

function ComplianceCalendar() {
  return (
    <section className="page show" data-page="compliance-calendar">
      <PageHeader title="Compliance Calendar" eyebrow={<><i className="ti ti-shield-check" /> Compliance <i className="ti ti-chevron-right" /> Statutory Calendar</>} />
      <ModuleStatGrid stats={[
        { label: 'Open Items', value: complianceItems.length, note: 'Upcoming statutory work', icon: 'ti-calendar-check' },
        { label: 'High Risk', value: complianceItems.filter((item) => item.risk === 'High').length, note: 'Immediate review', icon: 'ti-alert-triangle', tone: 'down' },
        { label: 'On Track', value: complianceItems.filter((item) => item.status === 'On Track').length, note: 'No action needed', icon: 'ti-circle-check' },
        { label: 'Pending', value: complianceItems.filter((item) => item.status === 'Pending').length, note: 'Owner follow-up', icon: 'ti-hourglass' },
      ]} />
      <div className="dash-card">
        <DataTable rows={complianceItems} columns={[
          { key: 'item', label: 'Compliance Item', render: (row) => <strong>{row.item}</strong> },
          { key: 'due', label: 'Due Date' },
          { key: 'owner', label: 'Owner' },
          { key: 'status', label: 'Status', status: true },
          { key: 'risk', label: 'Risk', render: (row) => <StatusBadge tone={statusTone(row.risk)}>{row.risk}</StatusBadge> },
        ]} />
      </div>
    </section>
  );
}

function SettingsPage({ subroute = 'hr-config' }) {
  const active = ['hr-config', 'holiday-calendar', 'roles', 'notifications', 'integrations', 'audit-logs'].includes(subroute) ? subroute : 'hr-config';
  return (
    <section className="page show" data-page="settings">
      <PageHeader title="Settings" eyebrow={<><i className="ti ti-settings" /> Configuration <i className="ti ti-chevron-right" /> Admin Controls</>} />
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="tab-bar" style={{ padding: '0 16px', borderBottom: '1px solid var(--border)' }}>
          {['hr-config', 'holiday-calendar', 'roles', 'notifications', 'integrations', 'audit-logs'].map((tab) => (
            <button key={tab} type="button" className={`tab-btn ${active === tab ? 'active' : ''}`} onClick={() => { window.location.hash = `#/settings/${tab}`; }}>
              {settingsLabel(tab)}
            </button>
          ))}
        </div>
        <div style={{ padding: 20 }}>
          <ModuleStatGrid stats={[
            { label: 'Active Roles', value: '8', note: 'Admin, HR, Manager, Employee', icon: 'ti-shield-lock' },
            { label: 'Holidays', value: '18', note: 'FY26 calendar', icon: 'ti-calendar-event' },
            { label: 'Integrations', value: '4', note: 'Payroll, bank, email, SSO mock', icon: 'ti-plug' },
            { label: 'Audit Events', value: '126', note: 'Last 30 days', icon: 'ti-history' },
          ]} />
          <AttentionList title={`${settingsLabel(active)} Checklist`} items={[
            { label: 'Role access review', status: active === 'roles' ? 'Pending' : 'On Track' },
            { label: 'Notification templates', status: active === 'notifications' ? 'Review' : 'On Track' },
            { label: 'Audit log export', status: 'Approved' },
          ]} />
        </div>
      </div>
    </section>
  );
}

function DepartmentCard() {
  return (
    <div className="dash-card">
      <div className="card-title">Department Mix</div>
      <Chart type="donut" height={260} series={departments.map((dept) => dept.employees)} options={{ labels: departments.map((dept) => dept.name), colors: ['var(--primary)', 'var(--blue)', 'var(--green)', 'var(--orange)', 'var(--purple)', 'var(--red)'], legend: { position: 'bottom' }, dataLabels: { enabled: false } }} />
    </div>
  );
}

function settingsLabel(tab) {
  return {
    'hr-config': 'General',
    'holiday-calendar': 'Holidays',
    roles: 'Roles & Permissions',
    notifications: 'Notifications',
    integrations: 'Integrations',
    'audit-logs': 'Audit Logs',
  }[tab];
}
