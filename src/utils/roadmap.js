// src/utils/roadmap.js
import timetable from "../data/timetable.json";

/**
 * generateRoadmap(student, options)
 * - Prioritizes failed/dropped courses (⚠️ Must Retake)
 * - Works for both fresh students (sem=1) and late registrants (sem>1)
 * - maxPerSemester: default 5
 */
export function generateRoadmap(student, options = {}) {
  const maxPer = options.maxPerSemester || 5;
  const degree = student.degree || "CS";
  const degObj = timetable[degree] || {};

  // Collect all unique course codes for this degree
  const allCodes = [];
  Object.keys(degObj).forEach((sem) => {
    (degObj[sem] || []).forEach((c) => {
      if (!allCodes.includes(c.course_code)) {
        allCodes.push(c.course_code);
      }
    });
  });

  // Student history
  const passed = new Set(
    (student.history || [])
      .filter((h) => h.status === "passed")
      .map((h) => h.course_code)
  );
  const failed = new Set(
    (student.history || [])
      .filter((h) => h.status === "failed")
      .map((h) => h.course_code)
  );
  const dropped = new Set(
    (student.history || [])
      .filter((h) => h.status === "dropped")
      .map((h) => h.course_code)
  );

  // Remaining = all courses - passed
  let remaining = allCodes.filter((c) => !passed.has(c));

  const plan = [];
  let sem = student.semester || 1;

  // Loop semester by semester
  while (remaining.length > 0 && sem <= 12) {
    const placed = [];
    const offered = degObj[String(sem)] || [];

    // 1. Place failed/dropped first (compulsory)
    for (let i = 0; i < remaining.length && placed.length < maxPer; i++) {
      const code = remaining[i];
      if (
        offered.find((o) => o.course_code === code) &&
        (failed.has(code) || dropped.has(code))
      ) {
        placed.push(`${code} ⚠️ Must Retake`);
        remaining.splice(i, 1);
        i--;
      }
    }

    // 2. Then place other courses offered in this semester
    for (let i = 0; i < remaining.length && placed.length < maxPer; i++) {
      const code = remaining[i];
      if (offered.find((o) => o.course_code === code)) {
        placed.push(code);
        remaining.splice(i, 1);
        i--;
      }
    }

    plan.push({ semester: sem, courses: placed });
    sem++;
  }

  // 3. If leftover courses exist → push into later semesters
  let overflowSem = sem;
  while (remaining.length > 0) {
    const take = remaining.splice(0, maxPer);
    plan.push({ semester: overflowSem, courses: take });
    overflowSem++;
  }

  return plan;
}
