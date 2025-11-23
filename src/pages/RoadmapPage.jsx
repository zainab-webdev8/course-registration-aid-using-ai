// src/pages/RoadmapPage.jsx
import React, { useEffect, useState } from "react";
import { getCurrentUser, getStudent } from "../utils/studentUtils";
import { generateRoadmap } from "../utils/roadmap";

export default function RoadmapPage() {
  const [student, setStudent] = useState(null);
  const [roadmap, setRoadmap] = useState([]);

  useEffect(() => {
    const id = getCurrentUser();
    if (!id) return;
    const s = getStudent(id);
    setStudent(s);
    if (s) {
      const plan = generateRoadmap(s, { maxPerSemester: 5 });
      setRoadmap(plan);
    }
  }, []);

  if (!student)
    return <div className="p-6">⚠️ Please login to view your roadmap.</div>;

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-6">
      <div className="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1E2A78] mb-6">
          📚 Roadmap for {student.name || student.id}
        </h2>

        {roadmap.length === 0 && (
          <p className="text-gray-600">No roadmap generated.</p>
        )}

        <div className="space-y-4">
          {roadmap.map((sem, i) => (
            <div key={i} className="border rounded-lg p-4">
              <h3 className="font-semibold text-[#114936] mb-2">
                Semester {sem.semester}
              </h3>
              {sem.courses.length === 0 ? (
                <p className="text-sm text-gray-500">No courses assigned.</p>
              ) : (
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {sem.courses.map((c, idx) => (
                    <li
                      key={idx}
                      className={
                        c.includes("⚠️")
                          ? "text-red-600 font-semibold"
                          : "text-gray-800"
                      }
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
