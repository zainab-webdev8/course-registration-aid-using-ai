import React, { useState } from "react";

export default function AdminStudentProfiles() {
  const [students, setStudents] = useState([
    {
      name: "John Doe",
      id: "2021001",
      program: "BS Computer Science",
      semester: 5,
      gpa: 3.6,
      cgpa: 3.4,
      coursesTaken: ["CS101", "CS102", "CS201", "CS202"],
      pastRequests: [
        { course: "CS302 - Database Systems", status: "Approved", semester: "Fall 2024" },
        { course: "CS304 - Computer Networks", status: "Rejected", semester: "Fall 2024" }
      ],
      recommendations: [
        { course: "CS410 - Machine Learning", reason: "Strong in Data Science" },
        { course: "CS305 - Advanced Web Dev", reason: "Excellent in Front-End" }
      ],
      pendingRequests: 1,
      approvedRequests: 3,
    },
    {
      name: "Jane Smith",
      id: "2021002",
      program: "BS Software Engineering",
      semester: 4,
      gpa: 3.8,
      cgpa: 3.5,
      coursesTaken: ["SE101", "CS102", "CS201", "CS301"],
      pastRequests: [
        { course: "SE310 - Software Testing", status: "Approved", semester: "Spring 2024" },
        { course: "CS350 - AI Fundamentals", status: "Approved", semester: "Spring 2024" }
      ],
      recommendations: [
        { course: "CS330 - Cloud Computing", reason: "Good in Distributed Systems" },
        { course: "SE420 - DevOps", reason: "Strong in Software Engineering Practices" }
      ],
      pendingRequests: 2,
      approvedRequests: 2,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editData, setEditData] = useState(null);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.includes(searchTerm) ||
      s.program.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    if (!editData.semester || !editData.cgpa || !editData.gpa) {
      alert("⚠️ Please fill all required fields before saving.");
      return;
    }

    const original = students.find((s) => s.id === editData.id);
    if (
      original.semester === Number(editData.semester) &&
      original.cgpa === Number(editData.cgpa) &&
      original.gpa === Number(editData.gpa)
    ) {
      alert("ℹ️ No changes made.");
      return;
    }

    setStudents((prev) =>
      prev.map((s) => (s.id === editData.id ? { ...s, ...editData } : s))
    );
    alert("✅ Record updated successfully.");
    setEditData(null);
    setSelectedStudent(null);
  };

  return (
    <div className="p-6">
      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, ID, or program..."
          className="border p-2 rounded w-80"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Student Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full table-auto">
          <thead className="bg-[#E6F0FF] text-[#1E2A78]">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Student ID</th>
              <th className="py-3 px-4 text-left">Program</th>
              <th className="py-3 px-4 text-left">Semester</th>
              <th className="py-3 px-4 text-left">GPA</th>
              <th className="py-3 px-4 text-left">CGPA</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{student.name}</td>
                <td className="py-3 px-4">{student.id}</td>
                <td className="py-3 px-4">{student.program}</td>
                <td className="py-3 px-4">{student.semester}</td>
                <td className="py-3 px-4">{student.gpa}</td>
                <td className="py-3 px-4">{student.cgpa}</td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="bg-[#0c1135] hover:bg-[#1c1f45] text-white px-3 py-1 rounded text-sm"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => setEditData(student)}
                    className="bg-[#114936] hover:bg-[#239f72] text-white px-3 py-1 rounded text-sm"
                  >
                    Edit Info
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredStudents.length === 0 && (
        <p className="mt-4 text-gray-500">No students found.</p>
      )}

      {/* Edit Academic Info Modal */}
      {editData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-[400px] p-6 relative">
            <h2 className="text-xl font-bold mb-4 text-[#0c1135]">
              Edit Academic Info ({editData.name})
            </h2>
            <label>Semester</label>
            <input
              type="number"
              value={editData.semester}
              onChange={(e) => setEditData({ ...editData, semester: e.target.value })}
              className="w-full border p-2 rounded mb-3"
            />
            <label>GPA</label>
            <input
              type="number"
              step="0.01"
              value={editData.gpa}
              onChange={(e) => setEditData({ ...editData, gpa: e.target.value })}
              className="w-full border p-2 rounded mb-3"
            />
            <label>CGPA</label>
            <input
              type="number"
              step="0.01"
              value={editData.cgpa}
              onChange={(e) => setEditData({ ...editData, cgpa: e.target.value })}
              className="w-full border p-2 rounded mb-3"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditData(null)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-[#28B485] text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-[500px] p-6 relative">
            <h2 className="text-xl font-bold mb-4 text-[#0c1135]">
              {selectedStudent.name} ({selectedStudent.id})
            </h2>
            <p className="mb-2"><strong>Program:</strong> {selectedStudent.program}</p>
            <p className="mb-2"><strong>Semester:</strong> {selectedStudent.semester}</p>
            <p className="mb-2"><strong>GPA:</strong> {selectedStudent.gpa} | <strong>CGPA:</strong> {selectedStudent.cgpa}</p>
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
