export const formatINR = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

export function formatLakhCrore(amount) {
  if (amount >= 10000000) return `\u20b9 ${(amount / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`;
  if (amount >= 100000) return `\u20b9 ${(amount / 100000).toFixed(1).replace(/\.0$/, '')} L`;
  return formatINR(amount);
}

export const formatPercent = (value) => `${value.toFixed(1)}%`;

export const departments = [
  { name: 'Engineering', head: 'Ananya Rao', employees: 72, branch: 'Bangalore HQ' },
  { name: 'Operations', head: 'Rajiv Menon', employees: 58, branch: 'Pune Plant' },
  { name: 'Sales', head: 'Neha Kapoor', employees: 46, branch: 'Mumbai Hub' },
  { name: 'Finance', head: 'Vikram Iyer', employees: 24, branch: 'Bangalore HQ' },
  { name: 'HR & Admin', head: 'Meera Nair', employees: 18, branch: 'Bangalore HQ' },
  { name: 'Manufacturing', head: 'Suresh Patil', employees: 30, branch: 'Pune Plant' },
];

export const employees = [
  ['E001', 'Aarav Mehta', 'Engineering', 'Senior Frontend Developer', 'Bangalore HQ', 'Present', 'Processed', 2450000, '12 Jan 2024'],
  ['E002', 'Diya Sharma', 'Engineering', 'QA Lead', 'Bangalore HQ', 'WFH', 'Processed', 1820000, '03 Mar 2023'],
  ['E003', 'Vivaan Gupta', 'Operations', 'Shift Supervisor', 'Pune Plant', 'Present', 'Processed', 920000, '18 Jul 2022'],
  ['E004', 'Anika Rao', 'Finance', 'Payroll Specialist', 'Bangalore HQ', 'Present', 'Review', 1180000, '22 Aug 2021'],
  ['E005', 'Ishaan Nair', 'Sales', 'Regional Sales Manager', 'Mumbai Hub', 'Late', 'Processed', 1680000, '04 Feb 2020'],
  ['E006', 'Meera Krishnan', 'HR & Admin', 'HR Business Partner', 'Bangalore HQ', 'Present', 'Processed', 1520000, '15 Sep 2021'],
  ['E007', 'Kabir Singh', 'Manufacturing', 'Line Lead', 'Pune Plant', 'Absent', 'Hold', 780000, '19 Nov 2023'],
  ['E008', 'Sara Thomas', 'Engineering', 'Product Designer', 'Bangalore HQ', 'Present', 'Processed', 1760000, '07 Jun 2024'],
  ['E009', 'Arjun Sharma', 'Sales', 'Account Executive', 'Mumbai Hub', 'Present', 'Processed', 1120000, '01 Apr 2022'],
  ['E010', 'Nisha Kulkarni', 'Operations', 'Facilities Manager', 'Bangalore HQ', 'WFH', 'Processed', 980000, '11 Oct 2020'],
  ['E011', 'Rohan Das', 'Engineering', 'Backend Engineer', 'Bangalore HQ', 'Present', 'Processed', 2180000, '09 Dec 2022'],
  ['E012', 'Priya Menon', 'Finance', 'Accounts Executive', 'Bangalore HQ', 'Present', 'Processed', 920000, '28 May 2023'],
  ['E013', 'Karan Malhotra', 'Operations', 'Transport Coordinator', 'Pune Plant', 'Late', 'Review', 720000, '05 Jan 2024'],
  ['E014', 'Tanvi Joshi', 'HR & Admin', 'Recruiter', 'Bangalore HQ', 'Present', 'Processed', 860000, '21 Mar 2024'],
  ['E015', 'Aditya Bose', 'Manufacturing', 'Safety Officer', 'Pune Plant', 'Present', 'Processed', 840000, '17 Aug 2022'],
  ['E016', 'Pooja Reddy', 'Sales', 'Customer Success Lead', 'Mumbai Hub', 'Leave', 'Processed', 1320000, '29 Sep 2021'],
  ['E017', 'Sahil Khan', 'Engineering', 'DevOps Engineer', 'Bangalore HQ', 'Present', 'Processed', 2050000, '12 Feb 2023'],
  ['E018', 'Riya Kapoor', 'Marketing', 'Content Strategist', 'Mumbai Hub', 'WFH', 'Processed', 980000, '16 Jun 2023'],
  ['E019', 'Manav Jain', 'Operations', 'Plant HR Executive', 'Pune Plant', 'Present', 'Processed', 790000, '02 Nov 2024'],
  ['E020', 'Aisha Ahmed', 'Finance', 'Compliance Analyst', 'Bangalore HQ', 'Present', 'Processed', 1040000, '30 Jan 2022'],
  ['E021', 'Dev Patel', 'Engineering', 'Data Engineer', 'Bangalore HQ', 'Present', 'Processed', 1960000, '24 Apr 2024'],
  ['E022', 'Sneha Pillai', 'HR & Admin', 'Admin Executive', 'Bangalore HQ', 'Not Marked', 'Hold', 620000, '06 May 2025'],
  ['E023', 'Nikhil Verma', 'Sales', 'Inside Sales Specialist', 'Mumbai Hub', 'Present', 'Processed', 760000, '14 Feb 2025'],
  ['E024', 'Gayatri Mishra', 'Manufacturing', 'Quality Inspector', 'Pune Plant', 'Present', 'Processed', 690000, '20 Dec 2023'],
].map(([id, name, department, role, branch, attendance, payroll, ctc, joined]) => ({
  id, name, department, role, branch, attendance, payroll, ctc, joined,
}));

export const attendanceRecords = [
  { day: 'Mon', present: 228, late: 6, wfh: 42, absent: 10 },
  { day: 'Tue', present: 232, late: 8, wfh: 40, absent: 8 },
  { day: 'Wed', present: 225, late: 11, wfh: 45, absent: 12 },
  { day: 'Thu', present: 230, late: 7, wfh: 43, absent: 9 },
  { day: 'Fri', present: 228, late: 8, wfh: 45, absent: 12 },
  { day: 'Sat', present: 142, late: 4, wfh: 18, absent: 6 },
];

export const leaveRequests = [
  { employee: 'Pooja Reddy', type: 'Earned Leave', dates: '20-22 May', status: 'Approved', approver: 'Neha Kapoor' },
  { employee: 'Kabir Singh', type: 'Sick Leave', dates: '16 May', status: 'Pending', approver: 'Rajiv Menon' },
  { employee: 'Rohan Das', type: 'Comp Off', dates: '24 May', status: 'Pending', approver: 'Ananya Rao' },
  { employee: 'Sneha Pillai', type: 'Casual Leave', dates: '19 May', status: 'Rejected', approver: 'Meera Nair' },
];

export const recruitmentPipeline = [
  { role: 'Senior Frontend Developer', department: 'Engineering', candidates: 42, stage: 'Technical Round 2', offeredCtc: 2800000, status: 'In Progress' },
  { role: 'Payroll Specialist', department: 'Finance', candidates: 18, stage: 'Offer Review', offeredCtc: 1200000, status: 'Awaiting Finance' },
  { role: 'Plant HR Executive', department: 'Operations', candidates: 25, stage: 'Screening', offeredCtc: 850000, status: 'Active' },
  { role: 'Compliance Analyst', department: 'HR & Admin', candidates: 16, stage: 'Manager Round', offeredCtc: 1050000, status: 'In Progress' },
];

export const payrollRuns = [
  { month: 'Jan', actual: 12000000, budget: 12500000, pf: 1380000, esi: 280000, tds: 1920000 },
  { month: 'Feb', actual: 12200000, budget: 12500000, pf: 1410000, esi: 285000, tds: 1980000 },
  { month: 'Mar', actual: 12400000, budget: 12500000, pf: 1430000, esi: 290000, tds: 2010000 },
  { month: 'Apr', actual: 12500000, budget: 13500000, pf: 1460000, esi: 296000, tds: 2060000 },
  { month: 'May', actual: 13000000, budget: 13500000, pf: 1510000, esi: 304000, tds: 2140000 },
  { month: 'Jun', actual: 13200000, budget: 13500000, pf: 1540000, esi: 310000, tds: 2190000 },
];

export const expenseClaims = [
  { employee: 'Ishaan Nair', category: 'Travel', amount: 124500, status: 'Pending' },
  { employee: 'Priya Menon', category: 'Medical', amount: 86000, status: 'Approved' },
  { employee: 'Sahil Khan', category: 'Relocation', amount: 142000, status: 'Policy Exception' },
  { employee: 'Aarav Mehta', category: 'Food', amount: 12800, status: 'Paid' },
];

export const complianceItems = [
  { item: 'PF Challan', due: '15 Jun 2026', owner: 'Finance', status: 'On Track', risk: 'Low' },
  { item: 'ESI Return', due: '21 Jun 2026', owner: 'Payroll', status: 'Pending', risk: 'Medium' },
  { item: 'Muster Roll Audit', due: '25 Jun 2026', owner: 'Operations', status: 'Review', risk: 'Medium' },
  { item: 'POSH Committee Minutes', due: '30 Jun 2026', owner: 'HR & Admin', status: 'On Track', risk: 'Low' },
  { item: 'Labour Dept Audit', due: '08 Jul 2026', owner: 'Compliance', status: 'Critical', risk: 'High' },
];

export const activities = [
  { time: '09:10', module: 'Attendance', text: '8 late arrivals flagged for manager review' },
  { time: '10:25', module: 'Payroll', text: 'May payroll variance is within approved range' },
  { time: '11:40', module: 'Recruiting', text: '2 offers moved to Finance approval' },
  { time: '14:05', module: 'Compliance', text: 'ESI return checklist assigned to Payroll team' },
  { time: '16:20', module: 'Leave', text: '3 leave requests pending approval' },
];

export const overviewStats = [
  { label: 'Total Employees', value: '248', trend: '+12 this month', icon: 'ti-users', tone: 'bg-blue-light' },
  { label: 'Present', value: '228', trend: '92% Attendance', icon: 'ti-user-check', tone: 'bg-green-light' },
  { label: 'On Leave', value: '12', trend: '-3 from yesterday', icon: 'ti-user-pause', tone: 'bg-orange-light' },
  { label: 'Late Arrivals', value: '8', trend: 'Needs attention', icon: 'ti-clock-exclamation', tone: 'bg-red-light' },
];

export const dashboardTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'people', label: 'People' },
  { id: 'operations', label: 'Operations' },
  { id: 'finance', label: 'Finance' },
  { id: 'recruiting', label: 'Recruiting' },
];

export const milestones = {
  birthdays: [
    { name: 'Arjun Sharma', team: 'Product Team', date: 'May 18', initials: 'AS' },
    { name: 'Neha Kapoor', team: 'Sales', date: 'May 20', initials: 'NK' },
  ],
  anniversaries: [
    { name: 'David Lee', team: 'Engineering', tenure: '1 Year', initials: 'DL' },
    { name: 'Sarah Nair', team: 'Marketing', tenure: '3 Years', initials: 'SN' },
  ],
  retirements: [{ name: 'Rajiv Menon', team: 'Operations', date: 'Oct 2026', initials: 'RM' }],
};
