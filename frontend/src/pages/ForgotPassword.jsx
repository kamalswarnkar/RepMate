import React, { useEffect } from "react";
import img from "../assets/images/forgot-password.png";

const ForgotPassword = () => {
  useEffect(() => {
    const forgotForm = document.querySelector("#forgot-form");

    forgotForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.querySelector("#email").value.trim();
      if (!email) {
        alert("Please enter your email.");
        return;
      }
      setTimeout(() => {
        alert(`Reset link has been sent to ${email}`);
        forgotForm.reset();
      }, 1000);
    });
  }, []);

  return (
    <div className="bg-[#10141a] text-[#e4e6eb] m-0 min-h-screen">
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
            alt="Forgot Password Illustration"
            className="max-w-[90%] max-h-[70%] object-contain rounded-lg border-2 border-dashed border-[#2c3340] shadow-[0_0_10px_rgba(62,207,142,0.1)] transition-transform duration-400 hover:scale-105 hover:border-[#3ECF8E] hover:shadow-[0_0_16px_rgba(62,207,142,0.3),0_0_30px_rgba(62,207,142,0.15)]"
          />
          <p className="mt-4 orbitron text-[#3ECF8E] text-sm text-center drop-shadow-[0_0_6px_rgba(62,207,142,0.3)]">
            "Let’s get you back into RepMate."
          </p>
        </div>

        {/* Right Side Form */}
        <div className="flex-1 flex items-center justify-center bg-[#1a1f27] shadow-inner shadow-[#0066ff0d] p-8">
          <div className="w-full max-w-md bg-[#12171e] p-8 rounded-lg shadow-[0_0_10px_rgba(0,255,170,0.05)]">
            <h1 className="text-center text-2xl font-bold orbitron text-[#3ECF8E] mb-8">
              Forgot Password
            </h1>
            <form id="forgot-form" className="space-y-6">
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="orbitron text-[#c8ccd4] text-sm mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  required
                  className="bg-[#10141a] border border-[#2c3340] rounded-lg p-3 text-[#e4e6eb] outline-none focus:border-[#3ECF8E] focus:shadow-[0_0_10px_rgba(62,207,142,0.2)]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0066FF] text-white font-semibold orbitron py-3 rounded-tl-[15px] rounded-br-[15px] rounded-tr-[8px] rounded-bl-[8px] transition-all hover:bg-[#0052cc] hover:text-[#3ECF8E] hover:shadow-[0_0_10px_rgba(0,102,255,0.6),0_0_18px_rgba(0,102,255,0.3)] hover:-translate-y-0.5"
              >
                Send Reset Link
              </button>

              <p className="mt-4 text-center text-sm text-[#c8ccd4]">
                Remembered your password?{" "}
                <a
                  href="/login"
                  className="text-[#3ECF8E] font-semibold hover:drop-shadow-[0_0_6px_rgba(62,207,142,0.4)]"
                >
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
