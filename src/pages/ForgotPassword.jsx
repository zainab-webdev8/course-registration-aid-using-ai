import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    alert("A reset link has been sent (simulated).");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left Illustration */}
      <div className="w-1/2">
        <img
          src="/login-illustration.png"
          alt="Forgot Password Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form */}
      <div className="w-1/2 bg-[#F5F7FA] flex items-center justify-center p-8">
        <form
          onSubmit={handleReset}
          className="bg-white shadow-lg p-8 rounded-2xl w-full max-w-md space-y-5"
        >
          <h2 className="text-2xl font-bold text-center text-[#1E2A78]">
            Reset Your Password
          </h2>

          <input
            type="text"
            placeholder="Enter your Email or Student ID"
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 ring-[#1E2A78] text-[#333333]"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#28B485] hover:bg-[#23976F] text-white p-2 rounded transition"
          >
            Send Reset Link
          </button>

          <p className="text-center text-sm text-[#333333]">
            Remembered your password?{" "}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-[#1E2A78] font-semibold hover:underline"
            >
              Back to Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
