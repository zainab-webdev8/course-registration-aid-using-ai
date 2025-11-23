import React, { useState } from "react";

export default function ViewRequests({ studentRequests, setStudentRequests }) {
  const [comment, setComment] = useState("");
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchCourse, setSearchCourse] = useState("");

  const handleReject = (index) => {
    const updatedRequests = [...studentRequests];
    updatedRequests[index].status = "Rejected";
    updatedRequests[index].comment = comment;
    setStudentRequests(updatedRequests);
    setComment("");
    setSelectedStudentIndex(null);
  };

  const handleApprove = (index) => {
    const updatedRequests = [...studentRequests];
    updatedRequests[index].status = "Approved";
    updatedRequests[index].comment = "";
    setStudentRequests(updatedRequests);
  };

  // Filter requests by BOTH student name and course
  const filteredRequests = studentRequests.filter((student) =>
    student.name.toLowerCase().includes(searchName.toLowerCase()) &&
    student.course.toLowerCase().includes(searchCourse.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Search bar */}
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by student name..."
          className="border p-2 rounded w-full md:w-64"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by course..."
          className="border p-2 rounded w-full md:w-64"
          value={searchCourse}
          onChange={(e) => setSearchCourse(e.target.value)}
        />
      </div>

      {/* Requests Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full table-auto">
          <thead className="bg-[#E6F0FF] text-[#1E2A78]">
            <tr>
              <th className="py-3 px-4 text-left">Student Name</th>
              <th className="py-3 px-4 text-left">Student ID</th>
              <th className="py-3 px-4 text-left">Course</th>
              <th className="py-3 px-4 text-left">AI Recommended</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((student, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{student.name}</td>
                <td className="py-3 px-4">{student.id}</td>
                <td className="py-3 px-4">{student.course}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 text-sm rounded ${
                      student.aiRecommended
                        ? "bg-[#E6F0FF] text-[#1E2A78]"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {student.aiRecommended ? "Yes" : "No"}
                  </span>
                </td>
                <td className="py-3 px-4">{student.status}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      className="bg-[#114936] hover:bg-[#249d74] text-white px-3 py-1 rounded"
                      onClick={() => handleApprove(index)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      onClick={() => setSelectedStudentIndex(index)}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Optional Comment Box */}
      {selectedStudentIndex !== null && (
        <div className="mt-6">
          <label className="block mb-2 font-medium text-[#1E2A78]">
            Optional Comment (when rejecting):
          </label>
          <textarea
            className="w-full max-w-xl p-2 border rounded"
            placeholder="Enter comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={() => handleReject(selectedStudentIndex)}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Submit Rejection
          </button>
        </div>
      )}
    </div>
  );
}
