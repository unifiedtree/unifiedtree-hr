import { dashboardTabs, milestones, overviewStats } from '../../data/mockData';
import Chart from 'react-apexcharts';
import { StatCard } from '../../components/StatCard';
import { Tabs } from '../../components/Tabs';

export function DashboardPage({ activeTab, onTabChange }) {
  return (
    <section className="page show" data-page="dashboard">
      <div className="page-hd" style={{ marginBottom: 10 }}>
        <div>
          <h2 className="page-title" style={{ fontSize: 24, letterSpacing: -0.5 }}>Dashboard Overview</h2>
          <div className="crumb" style={{ fontSize: 14 }}>Welcome back, Admin</div>
        </div>
        <div className="hd-actions">
          <button className="btn ghost" type="button"><i className="ti ti-calendar" /> Today: May 15, 2026</button>
          <button className="btn" type="button"><i className="ti ti-download" /> Generate Report</button>
        </div>
      </div>

      <Tabs tabs={dashboardTabs} activeTab={activeTab} onChange={onTabChange} />

      {activeTab === 'overview' ? <OverviewPanel /> : null}
      {activeTab === 'people' ? <PeoplePanel /> : null}
      {activeTab === 'operations' ? <OperationsPanel /> : null}
      {activeTab === 'finance' ? <FinancePanel /> : null}
      {activeTab === 'recruiting' ? <RecruitingPanel /> : null}
    </section>
  );
}

function PeoplePanel() {
  return (
    <div className="tab-pane active" data-tab-pane="people">
      <div className="sec-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><i className="ti ti-users" style={{ color: 'var(--purple)' }} /> People Analytics</div>
        <span className="badge" style={{ background: 'var(--primary-soft)', color: 'var(--primary-dark)' }}>React</span>
      </div>
      <div className="row-4" style={{ marginBottom: 20 }}>
        <SimpleStat label="Total Headcount" value="248" note="+12 joiners this month" />
        <SimpleStat label="New Joiners" value="18" note="7 in onboarding" />
        <SimpleStat label="Exits" value="4" note="2 regrettable exits" />
        <SimpleStat label="Attrition" value="4.8%" note="Within FY26 target" />
      </div>
      <div className="row-2" style={{ gridTemplateColumns: '2fr 1fr', marginBottom: 20 }}>
        <div className="dash-card">
          <div className="card-hd">
            <div className="card-title">Department Distribution</div>
            <span className="badge blue">248 employees</span>
          </div>
          <Chart
            type="bar"
            height={220}
            series={[{ name: 'Employees', data: [72, 58, 46, 24, 18, 30] }]}
            options={{
              chart: { toolbar: { show: false } },
              colors: ['var(--purple)'],
              plotOptions: { bar: { horizontal: true, borderRadius: 4, barHeight: '50%' } },
              dataLabels: { enabled: false },
              xaxis: { categories: ['Engineering', 'Operations', 'Sales', 'Finance', 'HR & Admin', 'Marketing'] },
            }}
          />
        </div>
        <SummaryList title="Department Summary" rows={[
          ['Engineering', '72'],
          ['Operations', '58'],
          ['Sales', '46'],
          ['Finance', '24'],
          ['HR & Admin', '18'],
        ]} />
      </div>
    </div>
  );
}

function OperationsPanel() {
  return (
    <div className="tab-pane active" data-tab-pane="operations">
      <div className="sec-title"><i className="ti ti-clock-check" style={{ color: 'var(--green)' }} /> Operations Control</div>
      <div className="row-4" style={{ marginBottom: 20 }}>
        <SimpleStat label="Present Today" value="228" note="92% attendance" />
        <SimpleStat label="Late Arrivals" value="8" note="Needs follow-up" />
        <SimpleStat label="Work From Home" value="45" note="Approved requests" />
        <SimpleStat label="Regularisation" value="6" note="Pending manager action" />
      </div>
      <div className="row-2" style={{ gridTemplateColumns: '2fr 1fr', marginBottom: 20 }}>
        <div className="dash-card">
          <div className="card-title">Attendance Trend</div>
          <Chart
            type="area"
            height={250}
            series={[{ name: 'Present', data: [130, 135, 142, 140, 142, 138] }, { name: 'Absent', data: [10, 8, 5, 7, 5, 9] }]}
            options={{
              chart: { toolbar: { show: false } },
              colors: ['var(--green)', 'var(--red)'],
              stroke: { curve: 'smooth', width: 2 },
              dataLabels: { enabled: false },
              xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
            }}
          />
        </div>
        <div className="dash-card">
          <div className="card-title">Attendance Split</div>
          <Chart
            type="donut"
            height={250}
            series={[142, 45, 24, 5]}
            options={{
              labels: ['Present', 'WFH', 'Absent', 'Half Day'],
              colors: ['var(--green)', 'var(--blue)', 'var(--red)', 'var(--purple)'],
              dataLabels: { enabled: false },
              legend: { position: 'bottom' },
            }}
          />
        </div>
      </div>
      <div className="row-2" style={{ gridTemplateColumns: '1fr 2fr' }}>
        <div className="dash-card">
          <div className="card-title">Productivity Gauge</div>
          <Chart
            type="radialBar"
            height={200}
            series={[86]}
            options={{
              labels: ['Productivity'],
              colors: ['var(--blue)'],
              plotOptions: { radialBar: { hollow: { size: '65%' }, dataLabels: { value: { formatter: (value) => `${value}%` } } } },
            }}
          />
        </div>
        <SummaryList title="Operations Watchlist" rows={[
          ['Engineering absenteeism spike', 'Review'],
          ['Pune Plant night shift OT', 'Monitoring'],
          ['Mumbai Hub geofence disabled', 'Action'],
        ]} />
      </div>
    </div>
  );
}

function FinancePanel() {
  return (
    <div className="tab-pane active" data-tab-pane="finance">
      <div className="sec-title"><i className="ti ti-cash-banknote" style={{ color: 'var(--red)' }} /> Finance Snapshot</div>
      <div className="row-4" style={{ marginBottom: 20 }}>
        <SimpleStat label="Monthly Payroll" value="₹ 1.32 Cr" note="May 2026 run" />
        <SimpleStat label="Budget Variance" value="-2.4%" note="Within approved range" />
        <SimpleStat label="Reimbursements" value="₹ 8.6L" note="14 pending approvals" />
        <SimpleStat label="Advances Open" value="₹ 4.2L" note="3 overdue settlements" />
      </div>
      <div className="row-2" style={{ gridTemplateColumns: '2fr 1fr', marginBottom: 20 }}>
        <div className="dash-card">
          <div className="card-hd">
            <div className="card-title">Payroll vs Budget</div>
            <span className="badge orange">FY26 YTD</span>
          </div>
          <Chart
            type="area"
            height={280}
            series={[{ name: 'Actual Expense', data: [120, 122, 124, 125, 130, 132] }, { name: 'Allocated Budget', data: [125, 125, 125, 135, 135, 135] }]}
            options={{
              chart: { toolbar: { show: false } },
              colors: ['var(--red)', 'var(--text-tertiary)'],
              stroke: { curve: 'straight', width: [2, 2], dashArray: [0, 4] },
              dataLabels: { enabled: false },
              xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
              yaxis: { labels: { formatter: (value) => `₹${value}L` } },
              legend: { position: 'top', horizontalAlign: 'right' },
            }}
          />
        </div>
        <SummaryList title="Pending Finance Items" rows={[
          ['Travel advances', '₹ 1,24,500'],
          ['Medical reimbursements', '₹ 86,000'],
          ['PF challan review', '₹ 3,40,000'],
          ['ESI reconciliation', '₹ 52,800'],
        ]} />
      </div>
    </div>
  );
}

function RecruitingPanel() {
  return (
    <div className="tab-pane active" data-tab-pane="recruiting">
      <div className="sec-title"><i className="ti ti-users-plus" style={{ color: 'var(--blue)' }} /> Recruiting Pipeline</div>
      <div className="row-4" style={{ marginBottom: 20 }}>
        <SimpleStat label="Open Roles" value="12" note="4 priority roles" />
        <SimpleStat label="Candidates" value="186" note="+32 this week" />
        <SimpleStat label="Interviews" value="45" note="9 today" />
        <SimpleStat label="Offers" value="12" note="7 accepted" />
      </div>
      <div className="row-2" style={{ gridTemplateColumns: '1fr 2fr', marginBottom: 20 }}>
        <div className="dash-card">
          <div className="card-title">Hiring Funnel</div>
          <Chart
            type="bar"
            height={180}
            series={[{ name: 'Candidates', data: [186, 120, 45, 12] }]}
            options={{
              chart: { toolbar: { show: false } },
              plotOptions: { bar: { borderRadius: 4, horizontal: true, distributed: true } },
              colors: ['var(--blue)', 'var(--primary)', 'var(--green)', 'var(--purple)'],
              dataLabels: { enabled: true },
              xaxis: { categories: ['Applied', 'Screened', 'Interview', 'Offered'] },
              legend: { show: false },
            }}
          />
        </div>
        <div className="dash-card">
          <div className="card-title">Priority Requisitions</div>
          <div style={{ overflowX: 'auto' }}>
            <table className="tbl" style={{ margin: 0, border: 'none', width: '100%', minWidth: 560 }}>
              <thead><tr><th>Role</th><th>Department</th><th>Stage</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td><strong>Senior Frontend Developer</strong></td><td>Engineering</td><td>Technical Round 2</td><td><span className="badge blue">In Progress</span></td></tr>
                <tr><td><strong>Payroll Specialist</strong></td><td>Finance</td><td>Offer Review</td><td><span className="badge orange">Awaiting Finance</span></td></tr>
                <tr><td><strong>Plant HR Executive</strong></td><td>Operations</td><td>Screening</td><td><span className="badge green">Active</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewPanel() {
  return (
    <div className="tab-pane active" data-tab-pane="overview">
      <div className="sec-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><i className="ti ti-layout-dashboard" style={{ color: 'var(--primary)' }} /> Live Overview</div>
        <select className="select" style={{ width: 180, height: 28, fontSize: 12, padding: '0 8px' }}>
          <option>HQ - Bangalore</option>
          <option>Pune Plant</option>
          <option>Mumbai Hub</option>
        </select>
      </div>

      <div className="row-4" style={{ marginBottom: 20 }}>
        {overviewStats.map((stat) => <StatCard key={stat.label} {...stat} />)}
      </div>

      <div className="sec-title"><i className="ti ti-confetti" style={{ color: 'var(--orange)' }} /> Upcoming Milestones</div>
      <div className="dash-card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          <MilestoneList title="Birthdays" icon="ti-cake" items={milestones.birthdays} valueKey="date" />
          <MilestoneList title="Anniversaries" icon="ti-medal" items={milestones.anniversaries} valueKey="tenure" />
          <MilestoneList title="Retirements" icon="ti-sunset" items={milestones.retirements} valueKey="date" />
        </div>
      </div>
    </div>
  );
}

function MilestoneList({ title, icon, items, valueKey }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}><i className={`ti ${icon}`} /> {title}</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((item) => (
          <div key={`${title}-${item.name}`} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div className="av"><div className="av-circle sm">{item.initials}</div></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{item.team}</div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{item[valueKey]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimpleStat({ label, value, note }) {
  return (
    <div className="dash-card">
      <div className="dash-stat-lbl">{label}</div>
      <div className="dash-stat-val">{value}</div>
      <div className="trend up"><i className="ti ti-trending-up" /> {note}</div>
    </div>
  );
}

function SummaryList({ title, rows }) {
  return (
    <div className="dash-card">
      <div className="card-hd"><div className="card-title">{title}</div></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {rows.map(([label, value], index) => (
          <div
            key={`${title}-${label}`}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 12,
              paddingBottom: index === rows.length - 1 ? 0 : 10,
              borderBottom: index === rows.length - 1 ? 0 : '1px solid var(--border)',
            }}
          >
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
