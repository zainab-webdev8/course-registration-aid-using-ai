// src/pages/AdminFeedback.jsx
import React, { useEffect, useState } from "react";

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [adminMessage, setAdminMessage] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("feedbacks")) || [];
    setFeedbacks(stored);
  }, []);

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    if (!adminMessage) {
      alert("Please write a message.");
      return;
    }

    const newFeedback = {
      name: "Admin",
      email: "admin@advisor.com",
      type: "Admin Feedback",
      message: adminMessage,
    };

    const updated = [...feedbacks, newFeedback];
    setFeedbacks(updated);
    localStorage.setItem("feedbacks", JSON.stringify(updated));
    setAdminMessage("");
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-[#1E2A78] mb-4">📩 Submitted Feedback</h2>

      {/* Admin can submit feedback */}
      <form
        onSubmit={handleAdminSubmit}
        className="bg-white rounded shadow p-4 space-y-3 max-w-lg"
      >
        <textarea
          value={adminMessage}
          onChange={(e) => setAdminMessage(e.target.value)}
          rows="3"
          placeholder="Write admin feedback..."
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-[#114936] hover:bg-[#249d74] text-white px-4 py-2 rounded"
        >
          Submit Admin Feedback
        </button>
      </form>

      {/* List of feedbacks */}
      {feedbacks.length === 0 ? (
        <p className="text-gray-500">No feedback submitted yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full table-auto">
            <thead className="bg-[#E6F0FF] text-[#1E2A78]">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Message</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((f, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{f.name}</td>
                  <td className="py-3 px-4">{f.email}</td>
                  <td className="py-3 px-4">{f.type}</td>
                  <td className="py-3 px-4">{f.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
