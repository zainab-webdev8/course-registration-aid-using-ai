import React from "react";

export default function Dashboard({ studentRequests, setActivePage }) {
  const pending = studentRequests.filter((r) => r.status === "Pending").length;
  const approved = studentRequests.filter((r) => r.status === "Approved").length;
  const rejected = studentRequests.filter((r) => r.status === "Rejected").length;

  return (
    <div className="p-6 space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#F5F7FA] p-4 rounded-xl shadow text-center">
          <div className="text-sm text-gray-600">Pending Requests</div>
          <div className="text-2xl font-bold">{pending}</div>
        </div>
        <div className="bg-green-100 p-4 rounded-xl shadow text-center">
          <div className="text-sm text-gray-600">Approved Requests</div>
          <div className="text-2xl font-bold">{approved}</div>
        </div>
        <div className="bg-red-100 p-4 rounded-xl shadow text-center">
          <div className="text-sm text-gray-600">Rejected Requests</div>
          <div className="text-2xl font-bold">{rejected}</div>
        </div>
        <div className="bg-blue-100 p-4 rounded-xl shadow text-center">
          <div className="text-sm text-gray-600">Total Students</div>
          <div className="text-2xl font-bold">50</div>
        </div>
      </div>

      {/* Semester Planner */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-2">📅 Semester Planner</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Course add/drop deadline: Feb 15</li>
          <li>Midterm exams: April 10–15</li>
          <li>Final exams: June 1–10</li>
          <li>Advising week: March 5–10</li>
        </ul>
      </div>

      {/* Advisor Reports */}
      <div className="bg-white p-6 rounded shadow flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">📊 Advisor Reports</h2>
          <p className="text-gray-600">Generate and download performance reports.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-[#0c1135] text-white px-4 py-2 rounded hover:bg-[#1c1f45]">
            Download PDF
          </button>
          <button className="bg-[#114936] hover:bg-[#239f72] text-white px-4 py-2 rounded">
            Download Excel
          </button>
        </div>
      </div>

      {/* Student History */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-2">📚 Student History</h2>
        <p className="text-gray-600">
          View summaries of student course requests, approvals, and grades for better advising.
        </p>
        <button
          onClick={() => setActivePage("students")}
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View History
        </button>
      </div>

      {/* AI Insights */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-2">🤖 AI Insights</h2>
        <p className="text-gray-600">
          Predict future course demand and improve course allocation strategies.
        </p>
        <button
          onClick={() => setActivePage("recommendations")}
          className="mt-3 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          View AI Insights
        </button>
      </div>

      {/* Archives */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-2">📂 Archives</h2>
        <p className="text-gray-600">
          Past approved/rejected requests filtered by semester/year.
        </p>
        <button
          onClick={() => setActivePage("archives")}
          className="mt-3 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          View Archives
        </button>
      </div>

      {/* System Logs */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-2">⚙️ System Logs</h2>
        <p className="text-gray-600">
          History of admin/advisor actions (approvals, rejections, etc.).
        </p>
        <button
          onClick={() => setActivePage("logs")}
          className="mt-3 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          View Logs
        </button>
      </div>

      {/* Announcements */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-2">📨 Announcements</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Registration for Fall 2025 opens on July 1.</li>
          <li>New AI course added to catalog.</li>
          <li>Policy change: Min 2 advising sessions per semester.</li>
        </ul>
      </div>

      {/* Course Catalog */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-2">📝 Course Catalog</h2>
        <p className="text-gray-600">
          Browse all available courses with details like credits, prerequisites, and descriptions.
        </p>
        <button
          onClick={() => setActivePage("catalog")}
          className="mt-3 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          View Catalog
        </button>
      </div>
    </div>
  );
}