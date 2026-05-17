export const navigationGroups = [
  {
    label: 'Company Profile',
    icon: 'ti-building-community',
    items: [{ label: 'Companies & Branches', route: 'companies', adminOnly: true }],
  },
  {
    label: 'Dashboard',
    items: [{ label: 'Dashboard', route: 'dashboard', icon: 'ti-layout-dashboard' }],
  },
  {
    label: 'Master',
    icon: 'ti-database',
    items: [
      { label: 'Workforce Directory', route: 'workforce-dir' },
      { label: 'Organization Setup', route: 'org-setup' },
      { label: 'Rules & Policies', route: 'rules-policies' },
      { label: 'Payroll Configuration', route: 'salary-comp' },
    ],
  },
  {
    label: 'Attendance & Time',
    icon: 'ti-clock',
    items: [
      { label: 'Attendance Analytics', route: 'att-analytics' },
      { label: 'Daily Tracking', route: 'daily-track' },
      { label: 'Shifts & Overtime', route: 'shifts-ot' },
    ],
  },
  {
    label: 'Leave Management',
    icon: 'ti-beach',
    items: [{ label: 'Leave Operations Center', route: 'leave-mgmt' }],
  },
  {
    label: 'Recruitment & Onboarding',
    icon: 'ti-users-plus',
    adminOnly: true,
    items: [
      { label: 'Hiring Pipeline', route: 'hiring-pipeline' },
      { label: 'Onboarding & Assets', route: 'onboarding-assets' },
      { label: 'Employee Vault', route: 'emp-vault' },
    ],
  },
  {
    label: 'Payroll',
    icon: 'ti-cash',
    items: [
      { label: 'Payroll Dashboard', route: 'dashboard-payroll' },
      { label: 'Salary Structure', route: 'salary-structure' },
      { label: 'Processing & Payslips', route: 'payroll-processing' },
      { label: 'Production-Linked Incentive', route: 'pli' },
      { label: 'Advances & Loans', route: 'advances' },
      { label: 'Bank Disbursement', route: 'bank-disbursement' },
    ],
  },
  {
    label: 'Expense Management',
    icon: 'ti-receipt',
    items: [{ label: 'Expense Center', route: 'expense-center' }],
  },
  {
    label: 'Employee Self Service',
    icon: 'ti-user-circle',
    items: [
      { label: 'My Attendance & Leaves', route: 'ess-attendance' },
      { label: 'My Payslip', route: 'ess-payslips' },
      { label: 'My Profile', route: 'ess-profile' },
      { label: 'Team Attendance', route: 'team-attendance' },
    ],
  },
  {
    label: 'Performance & Learning',
    icon: 'ti-target',
    items: [
      { label: 'Employee Performance', route: 'emp-performance' },
      { label: 'Appraisals & 360 Feedback', route: 'appraisals' },
      { label: 'KPI Tracking', route: 'kpi-tracking' },
      { label: 'Skill Matrix', route: 'skill-matrix' },
      { label: 'Training Programs', route: 'training' },
      { label: 'Certifications & Compliance Training', route: 'certifications' },
    ],
  },
  {
    label: 'Compliance',
    icon: 'ti-shield-check',
    items: [
      { label: 'Statutory Compliance', route: 'statutory' },
      { label: 'Muster Roll', route: 'muster-roll' },
      { label: 'POSH Case Management', route: 'posh' },
      { label: 'Inspector View', route: 'inspector-view' },
      { label: 'Compliance Calendar', route: 'compliance-calendar' },
    ],
  },
  {
    label: 'Reports & Analytics',
    icon: 'ti-chart-bar',
    adminOnly: true,
    items: [
      { label: 'Attendance & Overtime Reports', route: 'report-attendance' },
      { label: 'Payroll Reports', route: 'report-payroll' },
      { label: 'Workforce Analytics', route: 'workforce-analytics' },
    ],
  },
  {
    label: 'Employee Exit',
    icon: 'ti-door-exit',
    items: [
      { label: 'Resignation & Exit Workflow', route: 'resignation' },
      { label: 'Full & Final Settlement', route: 'fnf' },
      { label: 'Experience Letter', route: 'exp-letter' },
    ],
  },
  {
    label: 'Settings',
    items: [{ label: 'Settings & Audits', route: 'settings', icon: 'ti-settings', adminOnly: true }],
  },
];

export const settingsTabs = [
  { id: 'hr-config', label: 'General' },
  { id: 'holiday-calendar', label: 'Holidays' },
  { id: 'roles', label: 'Roles & Permissions' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'audit-logs', label: 'Audit Logs' },
];

const extraRoutes = [
  { label: 'Create Department', route: 'add-department', group: 'Organization Setup' },
  { label: 'Create Designation', route: 'add-designation', group: 'Organization Setup' },
];

export const routeRegistry = [...navigationGroups
  .flatMap((group) => group.items.map((item) => ({ ...item, group: group.label, groupAdminOnly: group.adminOnly })))
  , ...extraRoutes]
  .reduce((registry, item) => {
    registry[item.route] = item;
    return registry;
  }, {});
