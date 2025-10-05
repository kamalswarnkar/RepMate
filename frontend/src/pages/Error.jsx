// src/pages/Error.jsx
import React from "react";
import logo from "../assets/images/new-logo.png";

const Error = () => {
  return (
    <div className="m-0" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#10141a", color: "#e4e6eb" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700&family=Inter:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .orbitron { font-family: 'Orbitron', sans-serif; }
        a.nav-link:hover { text-shadow: 0 0 6px rgba(62,207,142,0.6), 0 0 10px rgba(62,207,142,0.3); }
        .glitch-shadow { text-shadow: 0 0 8px rgba(62,207,142,0.5),0 0 15px rgba(0,255,170,0.2); }
      `}</style>

      {/* Header */}
      <header>
        <nav className="flex justify-between items-center px-8 py-5 bg-[#12171e] border-b border-[#2c3340] shadow orbitron">
          <div className="flex items-center gap-2 text-[#3ECF8E] font-bold text-2xl">
            <img
              src={logo}
              alt="RepMate Logo"
              className="w-12 h-12 object-cover rounded-full border-2 border-[#3ECF8E] bg-[#10141a]
                shadow-[0_0_8px_rgba(0,255,170,0.5),0_0_16px_rgba(0,255,170,0.15)]
                transition-transform hover:scale-105 hover:shadow-[0_0_10px_rgba(0,255,170,0.6),
                0_0_20px_rgba(0,255,170,0.25)]"
            />
            <span className="uppercase orbitron">RepMate</span>
          </div>
          <ul className="flex gap-5 orbitron">
            <li>
              <a href="/about" className="font-semibold text-[#e4e6eb] hover:text-[#3ECF8E] transition">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="font-semibold text-[#e4e6eb] hover:text-[#3ECF8E] transition">
                Contact
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="bg-[#0066FF] px-4 py-2 rounded-tl-[15px] rounded-br-[15px] rounded-tr-[8px] rounded-bl-[8px]
                  border border-white/5 text-white font-semibold orbitron
                  shadow-[0_0_6px_rgba(0,102,255,0.3)] transition transform
                  hover:bg-[#0052cc] hover:text-[#3ECF8E] hover:-translate-y-0.5
                  hover:shadow-[0_0_10px_rgba(0,102,255,0.6),
                  0_0_18px_rgba(0,102,255,0.3)]"
              >
                Login
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Error Hero */}
      <main className="text-center py-24 px-8 max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-[#3ECF8E] orbitron mb-4 glitch-shadow">
          404: Page Not Found
        </h1>
        <p className="text-xl text-[#c8ccd4] mb-10">
          Looks like this page forgot leg day and vanished 💨
        </p>
        <a
          href="/"
          className="inline-block bg-[#0066FF] text-white px-6 py-3 font-semibold orbitron
            border border-white/5 shadow-[0_0_6px_rgba(0,102,255,0.3)]
            rounded-tl-[15px] rounded-br-[15px] rounded-tr-[8px] rounded-bl
            transition-all hover:bg-[#0052cc] hover:text-[#3ECF8E]
            hover:shadow-[0_0_10px_rgba(0,102,255,0.6),
            0_0_18px_rgba(0,102,255,0.3)] hover:translate-y-[-2px]"
        >
          Back to Home
        </a>
      </main>

      {/* Footer */}
      <footer className="text-center p-8 text-gray-500 text-sm font-inter">
        <p>© 2025 RepMate. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Error;
