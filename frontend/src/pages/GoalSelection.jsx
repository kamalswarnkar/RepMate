import React, { useState, useEffect } from "react";
import logo from "../assets/images/new-logo.png";
import img1 from "../assets/images/muscle-gain.png";
import img2 from "../assets/images/fat-loss.png";
import img3 from "../assets/images/endurance.png";
import img4 from "../assets/images/general-fitness.png";
import img5 from "../assets/images/athelete.png";
import img6 from "../assets/images/copy.png";

const GoalSelection = () => {
  const goalsData = [
    { name: "Muscle Gain", img: img1 },
    { name: "Fat Loss", img: img2 },
    { name: "Endurance", img: img3 },
    { name: "General Fitness", img: img4 },
    { name: "Athletic Build", img: img5 },
    { name: "Injury Rehab", img: img6 },
  ];

  const [selectedGoals, setSelectedGoals] = useState(
    new Set(JSON.parse(localStorage.getItem("selectedGoals")) || [])
  );

  const toggleGoal = (goal) => {
    const updatedGoals = new Set(selectedGoals);
    if (updatedGoals.has(goal)) {
      updatedGoals.delete(goal);
    } else {
      updatedGoals.add(goal);
    }
    setSelectedGoals(updatedGoals);
    localStorage.setItem("selectedGoals", JSON.stringify(Array.from(updatedGoals)));
  };

  const handleContinue = (e) => {
    if (selectedGoals.size === 0) {
      e.preventDefault();
      alert("🏋️‍♀️ Please select at least one goal before continuing!");
    }
  };

  return (
    <div className="bg-[#10141a] text-[#e4e6eb] font-inter m-0">
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&family=Inter:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .orbitron {
          font-family: 'Orbitron', sans-serif;
        }
      `}</style>

      {/* Header */}
      <header className="bg-[#12171e] border-b border-[#2c3340] shadow-md orbitron">
        <nav className="flex justify-between items-center px-8 py-4">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="RepMate Logo"
              className="w-12 h-12 rounded-full border-2 border-[#3ECF8E] bg-[#10141a] shadow-[0_0_8px_rgba(0,255,170,0.5),0_0_16px_rgba(0,255,170,0.15)] transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_10px_rgba(0,255,170,0.6),0_0_20px_rgba(0,255,170,0.25)]"
            />
            <span className="text-[#3ECF8E] text-2xl uppercase tracking-wide font-bold">
              RepMate
            </span>
          </div>
          <ul className="flex gap-6 font-semibold">
            <li>
              <a
                href="/about"
                className="transition nav-link text-[#e4e6eb]"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="transition nav-link text-[#e4e6eb]"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="bg-[#0066FF] px-4 py-2 rounded-tl-[15px] rounded-br-[15px] rounded-tr-[8px] rounded-bl-[8px] font-semibold text-white shadow-[0_0_6px_rgba(0,102,255,0.3)] hover:bg-[#0052cc] hover:text-[#3ECF8E] hover:shadow-[0_0_10px_rgba(0,102,255,0.6),0_0_18px_rgba(0,102,255,0.3)] transition"
              >
                Login
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero */}
      <main className="text-center py-16 px-4">
        <h1 className="text-4xl orbitron text-[#3ECF8E] mb-4">Choose Your Fitness Goal</h1>
        <p className="text-[#e4e6eb]">
          Select one or more goals to get started with a tailored AI plan.
        </p>
      </main>

      {/* Goal Cards */}
      <section className="bg-[#12171e] text-center py-12 px-4">
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {goalsData.map((goal) => {
            const isSelected = selectedGoals.has(goal.name);
            return (
              <div
                key={goal.name}
                className={`goal-card relative w-44 h-44 bg-[#1a1f27] border-2 border-[#2c3340] rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,255,170,0.2)] hover:bg-[#1f252e] hover:border-[#3ECF8E]
                ${isSelected ? "border-[#00ffcc] shadow-[0_0_16px_#00ffcc,0_0_30px_rgba(0,255,204,0.4)] bg-[#1f252e] -translate-y-1" : ""}`}
                onClick={() => toggleGoal(goal.name)}
              >
                <img
                  src={goal.img}
                  alt={goal.name}
                  className="w-full h-full object-contain rounded-lg transition-transform duration-300"
                />
                <div className="card-desc orbitron text-[#3ECF8E] text-lg mt-2">{goal.name}</div>
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        <a
          href="/questionnaire"
          onClick={handleContinue}
          className="inline-block mt-12 bg-[#0066FF] text-white orbitron font-semibold px-6 py-3 rounded-tl-[15px] rounded-br-[15px] rounded-tr-[8px] rounded-bl-[8px] border border-[rgba(255,255,255,0.05)] shadow-[0_0_6px_rgba(0,102,255,0.3)] hover:bg-[#0052cc] hover:text-[#3ECF8E] hover:shadow-[0_0_10px_rgba(0,102,255,0.6),0_0_18px_rgba(0,102,255,0.3)] hover:translate-y-[-2px] transition"
        >
          Continue
        </a>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-[#78818e] font-inter">
        <p>&copy; 2025 RepMate. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default GoalSelection;
