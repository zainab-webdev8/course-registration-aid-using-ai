// src/utils/studentUtils.js
import timetable from "../data/timetable.json";

// ---------- Basic Student Utilities ----------

// Get current logged-in user id
export function getCurrentUser() {
  return localStorage.getItem("currentUserId") || null;
}

// Get student record
export function getStudent(id) {
  const all = JSON.parse(localStorage.getItem("students")) || {};
  return all[id] || null;
}

// Save/update student record
export function saveStudent(id, data) {
  const all = JSON.parse(localStorage.getItem("students")) || {};
  all[id] = data;
  localStorage.setItem("students", JSON.stringify(all));
}

// Get all students
export function getAllStudents() {
  return JSON.parse(localStorage.getItem("students")) || {};
}

// Mark course status: passed, failed, dropped
export function markCourseStatus(id, courseCode, semester, status) {
  const student = getStudent(id);
  if (!student) return;

  // remove from registered
  student.registered = (student.registered || []).filter(
    (c) => c.course_code !== courseCode || c.semester !== semester
  );

  // add to history
  student.history = student.history || [];
  student.history.push({ course_code: courseCode, semester, status });

  saveStudent(id, student);
}

// Example: create a student if not exists
export function ensureStudent(id) {
  const s = getStudent(id);
  if (!s) {
    saveStudent(id, {
      id,
      name: "New Student",
      degree: "CS",
      semester: 1,
      registered: [],
      history: [],
    });
  }
}

// ---------- Fail/Drop Handling ----------

// Get failed or dropped courses (pending to retake)
export function getPendingCourses(id) {
  const student = getStudent(id);
  if (!student) return [];
  const history = student.history || [];
  return history.filter(
    (h) => h.status === "failed" || h.status === "dropped"
  );
}

// ---------- Clash Helpers ----------

export const timeToMinutes = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export function slotsOverlap(a, b) {
  if (a.day !== b.day) return false;
  const aStart = timeToMinutes(a.start);
  const aEnd = timeToMinutes(a.end);
  const bStart = timeToMinutes(b.start);
  const bEnd = timeToMinutes(b.end);
  return !(aEnd <= bStart || bEnd <= aStart);
}

export function checkClash(scheduleA, scheduleB) {
  return scheduleA.some((sa) => scheduleB.some((sb) => slotsOverlap(sa, sb)));
}

// ---------- Alternatives Finder ----------

/**
 * Find alternative offerings of a course in other semesters/teachers
 * without clashing with already selected schedules
 */
export function findCourseAlternatives(
  courseCode,
  currentTeacher,
  degree,
  selectedSchedules = []
) {
  const alts = [];
  const degObj = timetable[degree] || {};
  for (const sem in degObj) {
    const courses = degObj[sem] || [];
    for (const c of courses) {
      if (c.course_code === courseCode && c.teacher !== currentTeacher) {
        const clashes = selectedSchedules.some((s) =>
          checkClash(s, c.schedule)
        );
        if (!clashes) {
          alts.push({ ...c, semester: sem });
        }
      }
    }
  }
  return alts;
}
