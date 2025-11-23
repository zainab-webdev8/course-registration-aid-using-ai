// src/pages/SemesterCourses.jsx
import React, { useState } from "react";
import timetable from "../data/timetable.json";
import {
  checkClash,
  findCourseAlternatives,
  getCurrentUser,
  getPendingCourses,
} from "../utils/studentUtils";

export default function SemesterCourses({
  degree = "CS",
  semester = 1,
  mode = "student",
}) {
  const courses =
    (timetable[degree] && timetable[degree][String(semester)]) || [];
  const [selected, setSelected] = useState([]);
  const [messages, setMessages] = useState([]);

  // 🔹 Check pending failed/dropped courses
  const userId = getCurrentUser();
  const pending = userId ? getPendingCourses(userId) : [];

  const handleToggle = (course) => {
    const key = `${course.course_code}::${course.teacher}::${semester}`;
    const exists = selected.some(
      (s) => `${s.course_code}::${s.teacher}::${semester}` === key
    );
    if (exists) {
      setSelected(
        selected.filter(
          (s) => `${s.course_code}::${s.teacher}::${semester}` !== key
        )
      );
    } else {
      setSelected([...selected, { ...course, semester }]);
    }
  };

  const handleCheck = () => {
    const msgs = [];
    const selectedCodes = selected.map((s) => s.course_code);
    const selectedSchedules = selected.map((s) => s.schedule);

    if (selected.length === 0) {
      setMessages(["⚠️ Please select at least one course to check."]);
      return;
    }

    // 🔹 Fail/Drop mandatory enforcement
    pending.forEach((p) => {
      if (!selectedCodes.includes(p.course_code)) {
        msgs.push(
          `❌ You must re-register ${p.course_code} (was ${p.status}).`
        );
      }
    });

    // Clash detection
    for (let i = 0; i < selected.length; i++) {
      for (let j = i + 1; j < selected.length; j++) {
        if (checkClash(selected[i].schedule, selected[j].schedule)) {
          msgs.push(
            `❌ Clash between ${selected[i].course_code} and ${selected[j].course_code}`
          );
        }
      }
    }

    // Alternatives (only for admin)
    let alternatives = {};
    if (mode === "admin") {
      for (const sel of selected) {
        const alt = findCourseAlternatives(
          sel.course_code,
          sel.teacher,
          degree,
          selectedSchedules
        );
        if (alt.length > 0) alternatives[sel.course_code] = alt;
      }
    }

    setMessages(() => {
      const out = [];
      if (msgs.length === 0) {
        out.push("✅ No clashes detected.");
      } else {
        out.push(...msgs);
      }

      if (mode === "admin" && Object.keys(alternatives).length > 0) {
        out.push("📌 Alternatives:");
        for (const [course, alts] of Object.entries(alternatives)) {
          out.push(`${course}:`);
          alts.forEach((a) =>
            out.push(
              `  - ${a.course_code} (${a.course_title}) — Sem ${a.semester} — ${a.teacher}`
            )
          );
        }
      }
      return out;
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <h2 className="text-xl font-bold mb-4">
        {degree} — Semester {semester} Timetable
      </h2>

      {/* 🔹 Warning for pending failed/dropped */}
      {mode === "student" && pending.length > 0 && (
        <div className="mb-4 p-3 border-l-4 border-red-500 bg-red-50 text-sm text-red-700">
          ⚠️ You must retake the following courses before registering new ones:
          <ul className="list-disc ml-6 mt-2">
            {pending.map((p, i) => (
              <li key={i}>
                {p.course_code} — (Status: {p.status})
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-3">
        {courses.length === 0 && (
          <div className="text-gray-500">
            No courses found for this semester.
          </div>
        )}

        {courses.map((c, idx) => (
          <div
            key={idx}
            className="p-3 border rounded bg-[#F9FAFB] flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">
                {c.course_code} — {c.course_title}
              </div>
              <div className="text-sm text-gray-600">Teacher: {c.teacher}</div>
              <div className="text-sm">
                {c.schedule.map((s, i) => (
                  <span key={i} className="inline-block mr-3">
                    {s.day} {s.start}-{s.end}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <input
                type="checkbox"
                checked={selected.some(
                  (s) =>
                    s.course_code === c.course_code && s.teacher === c.teacher
                )}
                onChange={() => handleToggle(c)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          className="text-sm px-4 py-2 rounded bg-[#0c1135] hover:bg-[#1c1f45] text-white"
          onClick={handleCheck}
        >
          Check Clash
        </button>
      </div>

      <div className="mt-4 space-y-1">
        {messages.map((m, i) => (
          <div key={i} className="text-sm text-gray-800">
            {m}
          </div>
        ))}
      </div>
    </div>
  );
}
