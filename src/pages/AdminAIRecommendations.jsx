import React from "react";

const courseStats = [
  { title: "Machine Learning", code: "CS410", recommendedCount: 15 },
  { title: "Database Systems II", code: "CS340", recommendedCount: 12 },
  { title: "Advanced Web Development", code: "CS305", recommendedCount: 10 },
  { title: "Computer Architecture", code: "CS220", recommendedCount: 8 },
];

const studentRecommendations = [
  {
    name: "John Doe",
    id: "2021001",
    recommendations: [
      { title: "Machine Learning", code: "CS410" },
      { title: "Database Systems II", code: "CS340" },
    ],
  },
  {
    name: "Jane Smith",
    id: "2021002",
    recommendations: [
      { title: "Advanced Web Development", code: "CS305" },
      { title: "Computer Networks", code: "CS304" },
    ],
  },
];

export default function AdminAIRecommendations() {
  return (
    <div className="p-6">
      {/* Section: Top Recommended Courses */}
      <h2 className="text-2xl font-bold text-[#0c1135] mb-4">
        📊 Top Recommended Courses This Semester
      </h2>
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <table className="w-full table-auto">
          <thead className="bg-[#E6F0FF] text-[#1E2A78]">
            <tr>
              <th className="py-2 px-4 text-left">Course Title</th>
              <th className="py-2 px-4 text-left">Course Code</th>
              <th className="py-2 px-4 text-left">Recommended For (# Students)</th>
            </tr>
          </thead>
          <tbody>
            {courseStats.map((course, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{course.title}</td>
                <td className="py-2 px-4">{course.code}</td>
                <td className="py-2 px-4">{course.recommendedCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section: Student-wise AI Recommendations */}
      <h2 className="text-2xl font-bold text-[#0c1135] mb-4">
        👨‍🎓 Student-wise AI Recommendations
      </h2>
      <div className="space-y-4">
        {studentRecommendations.map((student, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow p-4 border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-[#1E2A78]">
              {student.name} ({student.id})
            </h3>
            <ul className="list-disc pl-6 mt-2">
              {student.recommendations.map((rec, recIdx) => (
                <li key={recIdx} className="text-[#333333]">
                  {rec.title} ({rec.code})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
