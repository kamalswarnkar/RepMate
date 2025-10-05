import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import img from "../assets/images/forgot-password.png";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      alert("Please fill in both fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const storedUserData = localStorage.getItem("repMateUserData");
    if (!storedUserData) {
      alert("User not found!");
      return;
    }

    let userData = JSON.parse(storedUserData);
    if (!userData.email) {
      alert("User not found!");
      return;
    }

    userData.password = newPassword;
    localStorage.setItem("repMateUserData", JSON.stringify(userData));

    setTimeout(() => {
      alert("Your password has been reset successfully!");
      setNewPassword("");
      setConfirmPassword("");
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="bg-[#10141a] text-[#e4e6eb] m-0 min-h-screen">
      {/* Global fonts + autofill fix */}
      <style>{`
        body { font-family: 'Inter', sans-serif; background-color:#10141a; color:#e4e6eb; }
        .orbitron { font-family:'Orbitron', sans-serif; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #10141a inset !important;
          -webkit-text-fill-color: #e4e6eb !important;
          transition: background-color 9999s ease-in-out 0s;
        }
      `}</style>

      <div className="flex h-screen w-full overflow-hidden">
        {/* Left Side Image */}
        <div className="flex-1 bg-[#151a20] flex flex-col items-center justify-center p-8 relative shadow-inner shadow-[#00ffaa1a] overflow-hidden">
          <img
            src={img}
            alt="Reset Password Illustration"
            className="max-w-[90%] max-h-[70%] object-contain rounded-lg border-2 border-dashed border-[#2c3340] shadow-[0_0_10px_rgba(62,207,142,0.1)] transition-transform duration-400 hover:scale-105 hover:border-[#3ECF8E] hover:shadow-[0_0_16px_rgba(62,207,142,0.3),0_0_30px_rgba(62,207,142,0.15)]"
          />
          <p className="mt-4 orbitron text-[#3ECF8E] text-sm text-center drop-shadow-[0_0_6px_rgba(62,207,142,0.3)]">
            "Secure your account and get back to RepMate."
          </p>
        </div>

        {/* Right Side Form */}
        <div className="flex-1 flex items-center justify-center bg-[#1a1f27] shadow-inner shadow-[#0066ff0d] p-8">
          <div className="w-full max-w-md bg-[#12171e] p-8 rounded-lg shadow-[0_0_10px_rgba(0,255,170,0.05)]">
            <h1 className="text-center text-2xl font-bold orbitron text-[#3ECF8E] mb-8">
              Reset Password
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col relative">
                <label
                  htmlFor="new-password"
                  className="orbitron text-[#c8ccd4] text-sm mb-1"
                >
                  New Password
                </label>
                <input
                  type={showNew ? "text" : "password"}
                  id="new-password"
                  placeholder="Enter new password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-[#10141a] border border-[#2c3340] rounded-lg p-3 pr-10 text-[#e4e6eb] outline-none focus:border-[#3ECF8E] focus:shadow-[0_0_10px_rgba(62,207,142,0.2)]"
                />
                <span
                  className={`absolute right-3 bottom-3 cursor-pointer text-lg ${
                    showNew ? "text-[#3ECF8E]" : "text-gray-400 hover:text-green-500"
                  }`}
                  onClick={() => setShowNew(!showNew)}
                >
                  👁
                </span>
              </div>

              <div className="flex flex-col relative">
                <label
                  htmlFor="confirm-password"
                  className="orbitron text-[#c8ccd4] text-sm mb-1"
                >
                  Confirm Password
                </label>
                <input
                  type={showConfirm ? "text" : "password"}
                  id="confirm-password"
                  placeholder="Confirm new password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-[#10141a] border border-[#2c3340] rounded-lg p-3 pr-10 text-[#e4e6eb] outline-none focus:border-[#3ECF8E] focus:shadow-[0_0_10px_rgba(62,207,142,0.2)]"
                />
                <span
                  className={`absolute right-3 bottom-3 cursor-pointer text-lg ${
                    showConfirm ? "text-[#3ECF8E]" : "text-gray-400 hover:text-green-500"
                  }`}
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  👁
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0066FF] text-white font-semibold orbitron py-3 rounded-tl-[15px] rounded-br-[15px] rounded-tr-[8px] rounded-bl-[8px] transition-all hover:bg-[#0052cc] hover:text-[#3ECF8E] hover:shadow-[0_0_10px_rgba(0,102,255,0.6),0_0_18px_rgba(0,102,255,0.3)] hover:-translate-y-0.5"
              >
                Reset Password
              </button>

              <p className="mt-4 text-center text-sm text-[#c8ccd4]">
                Remembered your password?{" "}
                <Link
                  to="/login"
                  className="text-[#3ECF8E] font-semibold hover:drop-shadow-[0_0_6px_rgba(62,207,142,0.4)]"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
