import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { Icon } from '@iconify/react';

// Register necessary components of Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

function ChartCard({ title, subtitle, chartData, chartLabel, chartColor, percentage, chartType = 'line' }) {
  return (
    <div className="col-md-6">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-start justify-content-between">
            <div>
              <h5 className="card-title fw-semibold">{title}</h5>
              <p className="card-subtitle mb-0">{subtitle}</p>
            </div>
            <span className="fs-11 text-success fw-semibold lh-lg">{percentage}</span>
          </div>
          <div className="py-4 my-1">
            {/* Conditionally render Line or Bar chart */}
            {chartType === 'line' ? (
              <Line data={chartData} />
            ) : (
              <Bar data={chartData} options={{ responsive: true }} />
            )}
          </div>
          <div className="d-flex flex-column align-items-center gap-2 w-100 mt-3">
            <div className="d-flex align-items-center gap-2 w-100">
              <span className={`d-block flex-shrink-0 round-8 ${chartColor} rounded-circle`}></span>
              <h6 className="fs-3 fw-normal text-muted mb-0">{chartLabel}</h6>
              <h6 className="fs-3 fw-normal mb-0 ms-auto text-muted">6,380</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RevenueForecast() {
  // Bar chart data for Revenue Forecast
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],  // Example labels
    datasets: [
      {
        label: 'Revenue',
        data: [4000, 5000, 3000, 7000, 6000],  // Example data
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full">
      <div className="card">
        <div className="card-body">
          <div className="d-md-flex align-items-center justify-content-between mb-3">
            <div>
              <h5 className="card-title">Revenue Forecast</h5>
              <p className="card-subtitle mb-0">Overview of Profit</p>
            </div>
            <div className="hstack gap-9 mt-4 mt-md-0">
              <div className="d-flex align-items-center gap-2">
                <span className="d-block flex-shrink-0 round-10 bg-primary rounded-circle"></span>
                <span className="text-nowrap text-muted">2024</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="d-block flex-shrink-0 round-10 bg-danger rounded-circle"></span>
                <span className="text-nowrap text-muted">2023</span>
              </div>
            </div>
          </div>

          <div style={{ height: '305px' }} className="me-n2 rounded-bars">
            {/* Render Bar chart inside the container */}
            <Bar data={revenueData} options={{ responsive: true }} />
          </div>

          <div className="row mt-4 mb-2">
            <div className="col-md-4">
              <div className="hstack gap-6 mb-3 mb-md-0">
                <span className="d-flex align-items-center justify-content-center round-48 bg-light rounded">
                  <Icon icon="solar:pie-chart-2-linear" className="fs-7 text-dark" />
                </span>
                <div>
                  <span>Total</span>
                  <h5 className="mt-1 fw-medium mb-0">$96,640</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="hstack gap-6 mb-3 mb-md-0">
                <span className="d-flex align-items-center justify-content-center round-48 bg-primary-subtle rounded">
                  <Icon icon="solar:dollar-minimalistic-linear" className="fs-7 text-primary" />
                </span>
                <div>
                  <span>Profit</span>
                  <h5 className="mt-1 fw-medium mb-0">$48,820</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="hstack gap-6">
                <span className="d-flex align-items-center justify-content-center round-48 bg-danger-subtle rounded">
                  <Icon icon="solar:database-linear" className="fs-7 text-danger" />
                </span>
                <div>
                  <span>Earnings</span>
                  <h5 className="mt-1 fw-medium mb-0">$48,820</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShartBar() {
  const [customerData, setCustomerData] = useState({
    labels: ['April 07', 'April 08', 'April 09', 'April 10', 'April 11'],
    datasets: [
      {
        label: 'Customers',
        data: [0, 10, 5, 15, 10],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });

  const [salesData, setSalesData] = useState({
    labels: ['April 07', 'April 08', 'April 09', 'April 10', 'April 11'],
    datasets: [
      {
        label: 'Sales',
        data: [0, 20, 15, 30, 25],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  });

  const [barChartData, setBarChartData] = useState({
    labels: ['April 07', 'April 08', 'April 09', 'April 10', 'April 11'],
    datasets: [
      {
        label: 'Bar Chart Data',
        data: [5, 15, 10, 20, 25],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://bootstrapdemos.adminmart.com/matdash/dist/assets/css/styles.css";
    link.id = "page-specific-style";
    document.head.appendChild(link);

    return () => {
      const existingLink = document.getElementById("page-specific-style");
      if (existingLink) existingLink.remove();
    };
  }, []);

  return (
    <div>
      <div className="row">
        <ChartCard
          title="Customers"
          subtitle="Last 7 days"
          chartData={customerData}
          chartLabel="April 07 - April 14"
          chartColor="bg-primary"
          percentage="+26.5%"
        />
        <ChartCard
          title="Sales Overview"
          subtitle="Last 7 days"
          chartData={salesData}
          chartLabel="Last Week"
          chartColor="bg-light"
          percentage="+18.5%"
        />
                <ChartCard
          title="Sales Overview"
          subtitle="Last 7 days"
          chartData={salesData}
          chartLabel="Last Week"
          chartColor="bg-light"
          percentage="+18.5%"
        />
        {/* Add a Bar Chart */}
        <ChartCard
          title="Bar Chart Example"
          subtitle="Last 7 days"
          chartData={barChartData}
          chartLabel="April 07 - April 14"
          chartColor="bg-success"
          percentage="+10.5%"
          chartType="bar"
        />
      </div>

      <RevenueForecast />
    </div>
  );
}