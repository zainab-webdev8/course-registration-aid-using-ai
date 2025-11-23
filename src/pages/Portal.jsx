import { Link } from "react-router-dom";

export default function Portal() {
  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url("/portal-bg-v2.jpg")` }} // direct path from public folder
    >
      {/* Overlay for readability */}
      <div className="flex flex-col flex-1 bg-black/50 p-10">
        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
          SMART COURSE REGISTRATION AID USING AI
        </h1>

        {/* Description */}
        <p className="mb-10 max-w-3xl text-center text-lg mx-auto">
          A Smart Advisor System that streamlines course registration, validates student
          enrollments, assists advisors in decision-making, and provides real-time
          academic roadmaps for HOD and Program In-Charge.
        </p>

        {/* Modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-5xl mx-auto">
          {/* Student */}
          <Link
            to="/login"
            className="flex flex-col items-center bg-white text-[#0c1135] p-6 rounded-2xl shadow-lg hover:scale-105 transition"
          >
            <div className="text-4xl mb-3">🎓</div>
            <span className="font-bold text-lg">Student Portal</span>
          </Link>

          {/* Advisor */}
          <Link
            to="/admin-login"
            className="flex flex-col items-center bg-white text-[#0c1135] p-6 rounded-2xl shadow-lg hover:scale-105 transition"
          >
            <div className="text-4xl mb-3">🛡️</div>
            <span className="font-bold text-lg">Advisor Portal</span>
          </Link>

          {/* HOD */}
          <Link
            to="/hod-login"
            className="flex flex-col items-center bg-white text-[#0c1135] p-6 rounded-2xl shadow-lg hover:scale-105 transition"
          >
            <div className="text-4xl mb-3">📘</div>
            <span className="font-bold text-lg">HOD Portal</span>
          </Link>

          {/* PIC */}
          <Link
            to="/pic-login"
            className="flex flex-col items-center bg-white text-[#0c1135] p-6 rounded-2xl shadow-lg hover:scale-105 transition"
          >
            <div className="text-4xl mb-3">📂</div>
            <span className="font-bold text-lg">PIC Portal</span>
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-auto text-center text-white/80 text-sm md:text-base max-w-2xl mx-auto mt-10">
          This system helps manage student registrations, program planning, advisor oversight,
          and departmental analytics. It ensures smooth academic operations for CS and AI programs.
        </p>
      </div>
    </div>
  );
}
