import React, { useEffect } from "react";
import logo from "../assets/images/new-logo.png";
import dev1 from "../assets/images/shadow architect.jpg";
import dev2 from "../assets/images/synth whisper.jpg";

const About = () => {
  useEffect(() => {
    const logoLink = document.getElementById("logo-link");
    if (logoLink) {
      logoLink.addEventListener("click", () => {
        if (localStorage.getItem("repMateUserLoggedIn") === "true") {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/home";
        }
      });
    }

    return () => {
      if (logoLink) {
        logoLink.removeEventListener("click", () => {});
      }
    };
  }, []);

  return (
    <div className="m-0" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#10141a", color: "#e4e6eb" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700&family=Inter:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .orbitron { font-family:'Orbitron', sans-serif; }
        a.nav-link:hover { text-shadow: 0 0 6px rgba(62,207,142,0.6), 0 0 10px rgba(62,207,142,0.3); }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 8px rgba(62,207,142,0.5), 0 0 16px rgba(62,207,142,0.2); }
          50% { box-shadow: 0 0 16px rgba(62,207,142,0.9), 0 0 32px rgba(62,207,142,0.4); }
          100% { box-shadow: 0 0 8px rgba(62,207,142,0.5), 0 0 16px rgba(62,207,142,0.2); }
        }
      `}</style>

      {/* Header */}
      <header>
        <nav className="flex justify-between items-center px-8 py-5 bg-[#12171e] border-b border-[#2c3340] shadow orbitron">
          <div id="logo-link" className="flex items-center gap-2 text-[#3ECF8E] font-bold text-2xl cursor-pointer">
            <img
              src={logo}
              alt="RepMate Logo"
              className="w-12 h-12 object-cover rounded-full border-2 border-[#3ECF8E] bg-[#10141a] shadow-[0_0_8px_rgba(0,255,170,0.5),0_0_16px_rgba(0,255,170,0.15)] transition-transform hover:scale-105 hover:shadow-[0_0_10px_rgba(0,255,170,0.6),0_0_20px_rgba(0,255,170,0.25)]"
            />
            <span className="uppercase">RepMate</span>
          </div>
          <ul className="flex gap-5 orbitron">
            <li>
              <a href="/home" className="font-semibold text-[#e4e6eb] hover:text-[#3ECF8E] transition">
                Home
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
                className="bg-[#0066FF] px-4 py-2 rounded-tl-[15px] rounded-br-[15px] rounded-tr-[8px] rounded-bl border border-white/5 text-white font-semibold orbitron shadow-[0_0_6px_rgba(0,102,255,0.3)] transition transform hover:bg-[#0052cc] hover:text-[#3ECF8E] hover:-translate-y-0.5 hover:shadow-[0_0_10px_rgba(0,102,255,0.6),0_0_18px_rgba(0,102,255,0.3)]"
              >
                Login
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto mt-16 px-8 text-[#c8ccd4]">
        <h1 className="text-center text-3xl font-bold text-[#3ECF8E] orbitron mb-8">About RepMate</h1>
        <p>
          RepMate is your futuristic fitness companion — an AI-powered system that understands your goals, analyzes your
          inputs, and generates smart, personalized workout and diet plans.
        </p>
        <p>
          Whether you're just starting out or pushing through advanced training, RepMate adapts to your journey,
          offering gamified motivation, progress tracking, and expert-like feedback.
        </p>
        <p>We believe fitness should be smart, simple, and exciting — that's why we built RepMate.</p>
      </main>

      {/* Developers Section */}
      <section className="bg-[#12171e] py-16 text-center px-8">
        <h2
          className="text-3xl font-bold text-[#3ECF8E] orbitron mb-12"
          style={{ textShadow: "0 0 10px rgba(62,207,142,0.2)" }}
        >
          Meet the Developers
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Developer 1 */}
          <div className="group bg-[#1a1f27] border border-[#2c3340] rounded-lg p-6 max-w-xs text-center shadow-[0_0_10px_rgba(0,255,170,0.1)] transition-transform hover:-translate-y-1.5 hover:shadow-[0_0_20px_rgba(0,255,170,0.2)]">
            <img
              src={dev1}
              alt="Shadow Architect"
              className="w-20 h-20 mx-auto rounded-full object-cover mb-4 border-2 border-[#3ECF8E] shadow-[0_0_6px_rgba(62,207,142,0.3)] transition-transform group-hover:scale-150 group-hover:animate-[pulseGlow_1.5s_infinite_ease-in-out] group-hover:shadow-[0_0_12px_rgba(62,207,142,0.6),0_0_24px_rgba(62,207,142,0.25)]"
            />
            <h3 className="text-[#3ECF8E] orbitron font-bold text-xl mb-2">Shadow Architect</h3>
            <p className="text-[#c8ccd4] text-sm leading-relaxed">
              Silent yet unmistakable, the Shadow Architect moves through code the way an artist moves through
              ink—fluid, focused, and deliberate. With a crow as his companion and a gaze that sees beyond the surface,
              he designs the unseen architecture of RepMate’s soul. Calm in presence and bold in thought, he’s not here
              for the spotlight—he’s here to build worlds in silence and let the results speak louder than words.
            </p>
          </div>

          {/* Developer 2 */}
          <div className="group bg-[#1a1f27] border border-[#2c3340] rounded-lg p-6 max-w-xs text-center shadow-[0_0_10px_rgba(0,255,170,0.1)] transition-transform hover:-translate-y-1.5 hover:shadow-[0_0_20px_rgba(0,255,170,0.2)]">
            <img
              src={dev2}
              alt="Synth Whisper"
              className="w-20 h-20 mx-auto rounded-full object-cover mb-4 border-2 border-[#3ECF8E] shadow-[0_0_6px_rgba(62,207,142,0.3)] transition-transform group-hover:scale-150 group-hover:animate-[pulseGlow_1.5s_infinite_ease-in-out] group-hover:shadow-[0_0_12px_rgba(62,207,142,0.6),0_0_24px_rgba(62,207,142,0.25)]"
            />
            <h3 className="text-[#3ECF8E] orbitron font-bold text-xl mb-2">Synth Whisper</h3>
            <p className="text-[#c8ccd4] text-sm leading-relaxed">
              Beneath his cozy hoodie and warm smile lives a sharp, ever-curious thinker. Synth Whisper doesn’t build
              with wires—he connects with ideas, always finding the human heartbeat inside the algorithm. With a quirky
              hamster by his side and stars above, he brings clarity, warmth, and an unexpected touch of joy to every
              challenge. He’s the kind of mind that listens deeply—then speaks in code that feels like a conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center p-8 text-gray-500 text-sm">
        <p>© 2025 RepMate. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
