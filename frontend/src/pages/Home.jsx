import React, { useEffect } from "react";
import logo from "../assets/images/new-logo.png";

const Home = () => {
  useEffect(() => {
    const ctaBtn =
      document.querySelector(".cta-btn") ||
      document.querySelector("a[href='onboarding/goal.html']");
    if (ctaBtn) {
      ctaBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const isLoggedIn = localStorage.getItem("repMateUserLoggedIn");
        if (isLoggedIn === "true") {
          window.location.href = "profile.html";
        } else {
          window.location.href = "login.html";
        }
      });
    }
  }, []);

  return (
    <div className="bg-[#10141a] text-[#e4e6eb]">
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700&family=Inter:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <style>{`
        body {
          font-family: 'Inter', sans-serif;
          background-color: #10141a;
          color: #e4e6eb;
        }
        .orbitron {
          font-family: 'Orbitron', sans-serif;
        }
        /* ✅ Match old navbar hover glow (text only) */
        .nav-link {
          transition: color 0.3s ease, text-shadow 0.3s ease, transform 0.3s ease;
        }
        .nav-link:hover {
          color: #3ECF8E;
          text-shadow: 0 0 6px rgba(62, 207, 142, 0.6), 0 0 10px rgba(62, 207, 142, 0.3);
          transform: translateY(-2px);
        }
      `}</style>

      {/* Navbar */}
      <header>
        <nav className="flex justify-between items-center px-8 py-5 bg-[#12171e] border-b border-[#2c3340] shadow-md orbitron">
          <div className="flex items-center gap-2 font-bold text-2xl text-[#3ECF8E]">
            <img
              src={logo}
              alt="RepMate Logo"
              className="w-12 h-12 object-cover rounded-full border-2 border-[#3ECF8E] bg-[#10141a] shadow-[0_0_8px_rgba(0,255,170,0.5),0_0_16px_rgba(0,255,170,0.15)] hover:scale-105 hover:shadow-[0_0_10px_rgba(0,255,170,0.6),0_0_20px_rgba(0,255,170,0.25)] transition duration-300"
            />
            <span className="uppercase tracking-wider">RepMate</span>
          </div>
          <ul className="flex gap-6 text-[15px] font-semibold">
            <li>
              <a href="/about" className="nav-link">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="nav-link">
                Contact
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="bg-[#0066FF] px-4 py-2 rounded-tl-[15px] rounded-br-[15px] rounded-tr-[8px] rounded-bl-[8px] text-white shadow-[0_0_6px_rgba(0,102,255,0.3)] border border-white/5 hover:bg-[#0052cc] hover:bg-[#0052cc] hover:shadow-[0_0_10px_rgba(0,102,255,0.6),0_0_18px_rgba(0,102,255,0.3)] hover:text-[#3ECF8E] hover:translate-y-[-2px] hover:[text-shadow:0_0_6px_rgba(62,207,142,0.6),0_0_10px_rgba(62,207,142,0.3)] transition"
              >
                Login
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero */}
      <main className="text-center px-6 py-16">
        <h1 className="text-4xl font-bold text-[#3ECF8E] orbitron tracking-wide">
          RepMate: Your Personalized AI Fitness Coach
        </h1>
        <p className="text-base text-[#c8ccd4] max-w-xl mx-auto mt-4">
          Transform your body with a smart, goal-based workout & diet plan —
          crafted just for you.
        </p>
        <a
          href="/goal"
          className="mt-8 inline-block bg-[#0066FF] text-white px-6 py-3 orbitron font-semibold tracking-wide shadow-[0_0_6px_rgba(0,102,255,0.3)] border border-white/5 rounded-tl-[15px] rounded-br-[15px] rounded-tr-[8px] rounded-bl-[8px] hover:bg-[#0052cc] hover:shadow-[0_0_10px_rgba(0,102,255,0.6),0_0_18px_rgba(0,102,255,0.3)] hover:text-[#3ECF8E] hover:translate-y-[-2px] hover:[text-shadow:0_0_6px_rgba(62,207,142,0.6),0_0_10px_rgba(62,207,142,0.3)] transition"
        >
          Start Your Journey
        </a>
      </main>

      {/* How It Works */}
      <section className="px-6 py-12 bg-[#12171e] text-center">
        <h2 className="text-2xl font-bold orbitron">How It Works</h2>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          <div className="w-60 h-60 bg-[#1a1f27] border-2 border-[#2c3340] rounded-xl shadow-md p-5 flex flex-col justify-center items-center orbitron hover:translate-y-[-6px] hover:shadow-[0_12px_24px_rgba(0,255,170,0.2)] hover:bg-[#1f252e] hover:border-[#3ECF8E] transition">
            <h3 className="text-base font-semibold text-[#3ECF8E] mb-2">
              1️⃣ Choose Your Goal
            </h3>
            <p className="text-sm text-[#c9ccd1] font-normal">
              Tell us the physique you want — lean, bulky, athletic, or just
              healthier.
            </p>
          </div>
          <div className="w-60 h-60 bg-[#1a1f27] border-2 border-[#2c3340] rounded-xl shadow-md p-5 flex flex-col justify-center items-center orbitron hover:translate-y-[-6px] hover:shadow-[0_12px_24px_rgba(0,255,170,0.2)] hover:bg-[#1f252e] hover:border-[#3ECF8E] transition">
            <h3 className="text-base font-semibold text-[#3ECF8E] mb-2">
              2️⃣ Get a Custom Plan
            </h3>
            <p className="text-sm text-[#c9ccd1] font-normal">
              Our AI crafts a personalized workout + diet routine just for you.
            </p>
          </div>
          <div className="w-60 h-60 bg-[#1a1f27] border-2 border-[#2c3340] rounded-xl shadow-md p-5 flex flex-col justify-center items-center orbitron hover:translate-y-[-6px] hover:shadow-[0_12px_24px_rgba(0,255,170,0.2)] hover:bg-[#1f252e] hover:border-[#3ECF8E] transition">
            <h3 className="text-base font-semibold text-[#3ECF8E] mb-2">
              3️⃣ Start Training
            </h3>
            <p className="text-sm text-[#c9ccd1] font-normal">
              Track progress, earn XP, and stay motivated with smart feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-[#78818e]">
        © 2025 RepMate. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
