import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import SidBar from "./SidBar";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/admin/stats") // Update the endpoint to fetch admin stats
      .then((response) => setStats(response.data))
      .catch((error) => console.error("Error fetching stats:", error));
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading stats...</p>
      </div>
    );
  }

  console.log("Admin Stats:", stats);
console.log(stats.trueFalseStats);
  // Pie Chart for True/False Stats
  const trueFalseCharts = Object.keys(stats.trueFalseStats).map((key) => ({
    labels: ["True", "False"],
    datasets: [
      {
        data: [stats.trueFalseStats[key].trueCount, stats.trueFalseStats[key].falseCount],
        backgroundColor: ["#3C50E0", "#80CAEE"], // Updated colors
        borderColor: "#fff", // White border for a clean look
        borderWidth: 2,
        hoverBackgroundColor: ["#3C50E0", "#80CAEE"], // Updated hover colors
      },
    ],
    title: key,
  }));

  // Bar Chart for Numeric Stats
  const numericStatsChart = {
    labels: ["VPN Visits", "New Members", "TV/Radio Appearances", "Social Media Posts"],
    datasets: [
      {
        label: "Totals",
        data: [
          stats.visits.totalVpnVisits,
          stats.newMembers.totalNewMembers,
          stats.mediaPresence.totalTvRadioAppearances,
          stats.mediaPresence.totalSocialMediaPosts,
        ],
        backgroundColor: ["#3C50E0", "#80CAEE"], // Matching colors
        borderRadius: 0, // No border radius
        borderWidth: 0, // No border
      },
    ],
  };

  // Bar Chart Options
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top", // Legend at the top
        labels: {
          font: {
            family: "Satoshi, sans-serif", // Matching font family
            size: 14,
            weight: 500,
          },
          color: "#333",
        },
      },
      tooltip: {
        backgroundColor: "#333",
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 14,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis grid lines
        },
      },
      y: {
        grid: {
          color: "#e5e7eb", // Light gray grid lines
        },
      },
    },
    animation: {
      duration: 1000, // Smooth animation
    },
  };

  // Pie Chart Options
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend to match the ApexCharts design
      },
      tooltip: {
        backgroundColor: "#333",
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 14,
        },
        footerFont: {
          size: 12,
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    cutout: "65%", // Add a cutout to make it a donut chart
  };

  return (
<div
  className="flex h-screen  "
  style={{
    // backgroundImage: 'url("https://i.ibb.co/KjrPCyW/map.png")',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, // Ensure the background stays behind content
  }}
>
  {/* Sidebar */}
  <aside className="w-72 bg-white  border-gray-300 ">
    <SidBar />
  </aside>

  {/* Main Content */}
  <main className="flex-1 p-8 overflow-auto">
    {/* Header */}
    <header className="flex justify-center items-center mb-8">
  <div className="w-full max-w-7xl bg-white p-8 rounded-lg shadow-lg text-center">
    <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
  </div>
</header>


    {/* General Stats */}
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[
      { label: "Total des rapports", value: stats.totalReports },  
      { label: "Total des visites VPN", value: stats.visits.totalVpnVisits },  
      { label: "Total des nouveaux membres", value: stats.newMembers.totalNewMembers },  
      { label: "Total des apparitions TV/Radio", value: stats.mediaPresence.totalTvRadioAppearances },
      
      ].map((stat, index) => (
        <div
          key={index}
          className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105 flex flex-col items-center"
        >
          <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
          <p className="text-3xl font-semibold text-gray-900 mt-2">{stat.value}</p>
        </div>
      ))}
    </section>

    {/* Pie Charts for True/False Stats */}
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {trueFalseCharts.map((chart, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{chart.title}</h3>
          <div className="h-56 flex items-center justify-center bg-gray-100 rounded-lg">
            <Pie data={chart} options={pieOptions} />
          </div>
          {/* Legend */}
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {chart.labels.map((label, i) => (
              <div key={i} className="flex items-center">
                <span
                  className="mr-2 block h-3 w-3 rounded-full"
                  style={{ backgroundColor: chart.datasets[0].backgroundColor[i] }}
                ></span>
                <p className="text-sm font-medium text-gray-800">
                  {label} ({chart.datasets[0].data[i]})
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
    {/* Additional Stats */}
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
     { label: "Total des partenariats signés", value: stats.visits.totalPartnershipsSigned },  
     { label: "Total des réunions organisées", value: stats.activities.totalMeetingsOrganized },  
     { label: "Total des actions organisées", value: stats.activities.totalActionsOrganized },  
     { label: "Total des assemblées générales", value: stats.activities.totalGeneralAssemblies },  
     { label: "Total des publications sur les réseaux sociaux", value: stats.mediaPresence.totalSocialMediaPosts },  
     { label: "Total des objectifs atteints", value: stats.performance.totalObjectivesMet },
     
      ].map((stat, index) => (
        <div
          key={index}
          className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105 text-center"
        >
          <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
          <p className="text-3xl font-semibold text-gray-900 mt-2">{stat.value}</p>
        </div>
      ))}
    </section>
    {/* Bar Chart for Numeric Stats */}
    <section className="mt-8">
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Aperçu des statistiques numériques</h3>
      <div className="h-72 flex items-center justify-center bg-gray-100 rounded-lg">
          <Bar data={numericStatsChart} options={barOptions} />
        </div>
      </div>
    </section>


  </main>
</div>


  
  );
}
