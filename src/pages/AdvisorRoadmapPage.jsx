// src/pages/AdvisorRoadmapPage.jsx
import React, { useState, useEffect } from "react";
import { getAllStudents, getStudent } from "../utils/studentUtils";
import { generateRoadmap } from "../utils/roadmap";

export default function AdvisorRoadmapPage() {
  const [students, setStudents] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [roadmap, setRoadmap] = useState([]);

  useEffect(() => {
    const all = getAllStudents();
    const ids = Object.keys(all);
    setStudents(ids);
    if (ids.length > 0) setSelectedId(ids[0]);
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    const s = getStudent(selectedId);
    if (s) {
      const plan = generateRoadmap(s, { maxPerSemester: 5 });
      setRoadmap(plan);
    }
  }, [selectedId]);

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-6">
      <div className="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1E2A78] mb-6">
          📚 Advisor: Roadmap Viewer
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium">Select Student</label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          >
            {students.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>

        {roadmap.length === 0 && <p>No roadmap found.</p>}

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
                    <li key={idx}>{c}</li>
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
