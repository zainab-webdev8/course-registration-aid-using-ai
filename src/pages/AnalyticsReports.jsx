import React from "react";
import {
  BarChart,
  PieChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const barData = [
  { course: "CS410 - Machine Learning", recommendations: 120 },
  { course: "CS305 - Advanced Web Dev", recommendations: 95 },
  { course: "CS302 - Database Systems II", recommendations: 80 },
  { course: "CS220 - Computer Architecture", recommendations: 60 },
];

const pieData = [
  { name: "Approved", value: 60 },
  { name: "Pending", value: 25 },
  { name: "Rejected", value: 15 },
];

const COLORS = ["#28B485", "#E6F0FF", "#FF6B6B"];

export default function AnalyticsReports() {
  return (
    <div className="p-6">
      {/* Page Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#1E2A78]">
          Analytics & Reports
        </h1>

        {/* Date Range Dropdown */}
        <select className="border border-gray-300 p-2 rounded text-sm">
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>Custom Range</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#F5F7FA] rounded shadow p-4">
          <h2 className="text-sm text-[#333]">Students Using AI Aid</h2>
          <p className="text-2xl font-bold text-[#1E2A78]">350</p>
        </div>
        <div className="bg-[#F5F7FA] rounded shadow p-4">
          <h2 className="text-sm text-[#333]">Registration Success Rate</h2>
          <p className="text-2xl font-bold text-[#28B485]">85%</p>
        </div>
        <div className="bg-[#F5F7FA] rounded shadow p-4">
          <h2 className="text-sm text-[#333]">Most Recommended Course</h2>
          <p className="text-lg font-semibold text-[#1E2A78]">
            CS410 - Machine Learning
          </p>
        </div>
        <div className="bg-[#F5F7FA] rounded shadow p-4">
          <h2 className="text-sm text-[#333]">Least Recommended Course</h2>
          <p className="text-lg font-semibold text-[#1E2A78]">
            CS220 - Computer Architecture
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold text-[#1E2A78] mb-4">
            Course Recommendations by Popularity
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="course" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="recommendations" fill="#28B485" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold text-[#1E2A78] mb-4">
            Registration Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
