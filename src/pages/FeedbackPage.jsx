import React, { useState } from "react";

export default function FeedbackPage() {
  const [feedbackData, setFeedbackData] = useState({
    name: "John Doe", // will come from logged-in student profile
    email: "john@example.com",
    type: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFeedbackData({ ...feedbackData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedbackData.type || !feedbackData.message.trim()) {
      alert("⚠️ Please select feedback type and write your message.");
      return;
    }

    // Save to localStorage for demo; replace with backend API later
    const stored = JSON.parse(localStorage.getItem("feedbacks")) || [];
    localStorage.setItem("feedbacks", JSON.stringify([...stored, feedbackData]));

    setSubmitted(true);
    setFeedbackData({ ...feedbackData, type: "", message: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] font-sans p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#1E2A78] mb-2">
          Feedback & Suggestions
        </h2>
        <p className="text-center text-sm text-[#555] mb-6">
          We value your input! Share your thoughts to help improve the system.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-[#333] mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={feedbackData.name}
              readOnly
              className="w-full border p-3 rounded bg-gray-100 text-[#555]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#333] mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={feedbackData.email}
              readOnly
              className="w-full border p-3 rounded bg-gray-100 text-[#555]"
            />
          </div>

          {/* Feedback Type */}
          <div>
            <label className="block text-sm font-semibold text-[#333] mb-1">
              Feedback Type
            </label>
            <select
              name="type"
              value={feedbackData.type}
              onChange={handleChange}
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 ring-[#1E2A78]"
            >
              <option value="">Select Type</option>
              <option value="Bug Report">🐞 Bug Report</option>
              <option value="Suggestion">💡 Suggestion</option>
              <option value="Experience">⭐ Experience</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-[#333] mb-1">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              value={feedbackData.message}
              onChange={handleChange}
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 ring-[#28B485]"
              placeholder="Write your feedback here..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#23976F] hover:bg-[#28B485] text-white py-3 rounded-lg font-semibold text-lg transition"
          >
            Submit Feedback
          </button>
        </form>

        {/* Success Message */}
        {submitted && (
          <div className="mt-6 text-center">
            <p className="text-green-600 font-semibold text-lg">
              ✅ Feedback submitted successfully!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
