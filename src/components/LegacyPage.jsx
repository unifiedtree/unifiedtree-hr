import { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const legacyChartOptions = {
  spark1: sparkOptions([12, 14, 18, 15, 20, 22, 25], 'var(--blue)'),
  spark2: sparkOptions([90, 88, 92, 95, 91, 93, 92], 'var(--green)'),
  spark3: sparkOptions([5, 8, 12, 6, 15, 10, 12], 'var(--orange)'),
  spark4: sparkOptions([2, 4, 3, 8, 6, 4, 8], 'var(--red)'),
  'weekly-attendance-chart': {
    series: [{ name: 'Present', data: [220, 228, 224, 230, 228, 226] }, { name: 'Absent', data: [18, 12, 15, 10, 12, 14] }],
    chart: { type: 'area', height: 300, toolbar: { show: false } },
    colors: ['var(--green)', 'var(--red)'],
    stroke: { curve: 'smooth', width: 2 },
    dataLabels: { enabled: false },
    xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
  },
  'ontime-gauge-chart': radialOptions(88, 'On-Time Arrival'),
  'payroll-cost-chart': {
    series: [{ name: 'Payroll Cost', data: [1.05, 1.08, 1.1, 1.15, 1.21, 1.24] }],
    chart: { type: 'bar', height: 300, toolbar: { show: false } },
    colors: ['var(--purple)'],
    plotOptions: { bar: { borderRadius: 6, columnWidth: '35%' } },
    dataLabels: { enabled: false },
    xaxis: { categories: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'] },
    yaxis: { labels: { formatter: (value) => `₹${value} Cr` } },
  },
  'skill-radar-chart': {
    series: [{ name: 'Current Team Skills', data: [80, 50, 30, 40, 100, 20] }, { name: 'Required Target', data: [90, 80, 60, 80, 100, 90] }],
    chart: { type: 'radar', height: 250, toolbar: { show: false } },
    labels: ['React', 'Vue', 'Angular', 'Python', 'NodeJS', 'Go'],
    colors: ['var(--blue)', 'var(--orange)'],
    stroke: { width: 2 },
    fill: { opacity: 0.2 },
  },
  'analytics-growth-chart': {
    series: [{ name: 'Employees', data: [1200, 1350, 1420, 1600, 1750, 1848] }],
    chart: { type: 'area', height: 250, toolbar: { show: false } },
    colors: ['var(--blue)'],
    stroke: { curve: 'smooth', width: 2 },
    dataLabels: { enabled: false },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
  },
  'analytics-dept-chart': {
    series: [45, 25, 20, 10],
    labels: ['Manufacturing', 'Engineering', 'Sales', 'HR & Admin'],
    chart: { type: 'donut', height: 250 },
    colors: ['var(--orange)', 'var(--blue)', 'var(--green)', 'var(--purple)'],
    dataLabels: { enabled: false },
    legend: { position: 'bottom' },
  },
};

export function LegacyPage({ route, page, subroute, onNavigate }) {
  const pageRef = useRef(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return undefined;

    const onClick = (event) => {
      const legacyRouteButton = event.target.closest('[data-legacy-route]');
      if (legacyRouteButton) {
        event.preventDefault();
        onNavigate(legacyRouteButton.getAttribute('data-legacy-route'));
        return;
      }

      const tabButton = event.target.closest('.tab-btn[data-tab]');
      if (tabButton && root.contains(tabButton)) {
        event.preventDefault();
        activateLegacyTab(root, tabButton);
      }
    };

    root.addEventListener('click', onClick);
    const charts = renderLegacyCharts(root);
    const initialTab = subroute && root.querySelector(`.tab-btn[data-tab="${subroute}"]`);
    if (initialTab) activateLegacyTab(root, initialTab);

    return () => {
      root.removeEventListener('click', onClick);
      charts.forEach((chart) => chart.destroy());
    };
  }, [onNavigate, page.html, subroute]);

  return (
    <section
      ref={pageRef}
      className="page show"
      data-page={route}
      dangerouslySetInnerHTML={{ __html: page.html }}
    />
  );
}

function activateLegacyTab(root, tabButton) {
  const target = tabButton.getAttribute('data-tab');
  const tabBar = tabButton.closest('.tab-bar, .tabs');
  const container = tabBar?.parentElement || root;
  tabBar?.querySelectorAll('.tab-btn').forEach((button) => button.classList.remove('active'));
  tabButton.classList.add('active');

  const targetPane = container.querySelector(`.tab-pane[data-tab-pane="${target}"]`);
  const paneParent = targetPane?.parentElement;
  if (paneParent) {
    paneParent.querySelectorAll(':scope > .tab-pane').forEach((pane) => pane.classList.remove('active'));
    targetPane.classList.add('active');
    setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
  }
}

function renderLegacyCharts(root) {
  return Object.entries(legacyChartOptions)
    .map(([id, options]) => {
      const element = root.querySelector(`#${id}`);
      if (!element || element.querySelector('.apexcharts-canvas')) return null;
      const chart = new ApexCharts(element, options);
      chart.render();
      return chart;
    })
    .filter(Boolean);
}

function sparkOptions(data, color) {
  return {
    series: [{ data }],
    chart: { type: 'area', height: 40, sparkline: { enabled: true }, animations: { enabled: true } },
    colors: [color],
    stroke: { curve: 'smooth', width: 2 },
    fill: { opacity: 0.2 },
    tooltip: { enabled: false },
  };
}

function radialOptions(value, label) {
  return {
    series: [value],
    chart: { type: 'radialBar', height: 300 },
    labels: [label],
    colors: ['var(--green)'],
    plotOptions: {
      radialBar: {
        hollow: { size: '65%' },
        dataLabels: {
          value: { formatter: (val) => `${val}%` },
        },
      },
    },
  };
}
