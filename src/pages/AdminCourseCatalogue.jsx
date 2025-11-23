import React, { useState } from "react";

const courses = [
  {
    title: "Introduction to Computer Science",
    code: "CS101",
    credits: 3,
    description:
      "Fundamental concepts of computer science, including algorithms, data structures, and software development.",
  },
  {
    title: "Calculus I",
    code: "MATH201",
    credits: 4,
    description:
      "Differential and integral calculus of one variable, with applications and problem-solving.",
  },
  {
    title: "Data Structures",
    code: "CS201",
    credits: 3,
    description:
      "Study of data structures such as lists, stacks, queues, trees, and graphs, including implementation.",
  },
  {
    title: "Operating Systems",
    code: "CS450",
    credits: 3,
    description:
      "Design and implementation of operating systems, covering processes, memory management, and file systems.",
  },
];

export default function AdminCourseCatalogue() {
  const [search, setSearch] = useState("");

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-[#0c1135] mb-6">
        Course Catalogue
      </h2>

      <input
        type="text"
        placeholder="Search courses..."
        className="p-2 border rounded w-full mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((course, index) => (
          <div key={index} className="bg-white shadow rounded-xl p-4">
            <h3 className="text-lg font-semibold text-[#333333] mb-1">
              {course.title}
            </h3>
            <div className="flex gap-2 text-sm text-gray-600 mb-2">
              <span className="bg-[#E6F0FF] px-2 py-1 rounded">
                {course.code}
              </span>
              <span className="bg-[#E6F0FF] px-2 py-1 rounded">
                {course.credits} Credits
              </span>
            </div>
            <p className="text-sm text-[#333333]">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
