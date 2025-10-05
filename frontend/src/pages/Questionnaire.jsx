import React, { useEffect, useState } from "react";
import logo from "../assets/images/new-logo.png";

const Questionnaire = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: ""
  });
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (currentCard + 1 < 4) {
      setCurrentCard(currentCard + 1);
    } else {
      setShowModal(true);
    }
  };

  const redirectToPlan = (mode) => {
    window.location.href = `plan.html?mode=${mode}`;
  };

  useEffect(() => {
    // No extra logic needed here as React handles re-render
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-white font-['Inter']">
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&family=Inter&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <header className="bg-[#12171e] border-b border-[#2c3340] flex items-center justify-between px-8 h-20 font-['Orbitron']">
        <div className="flex items-center gap-2 text-[#3ECF8E] font-bold text-2xl">
          <img
            src={logo}
            alt="RepMate Logo"
            className="w-12 h-12 object-cover rounded-full border-2 border-[#3ECF8E] bg-[#10141a] shadow-[0_0_8px_rgba(0,255,170,0.5),0_0_16px_rgba(0,255,170,0.15)] transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_10px_rgba(0,255,170,0.6),0_0_20px_rgba(0,255,170,0.25)]"
          />
          <span className="orbitron uppercase tracking-wider">RepMate</span>
        </div>
        <h1 className="text-[#3ECF8E] text-2xl font-bold orbitron">Questionnaire</h1>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg relative">
          {/* Question Cards */}
          {[1, 2, 3, 4].map((q, idx) => (
            <div
              key={q}
              className={`question-card bg-[#1a1f27] border border-[#2c3340] rounded-xl p-6 text-center shadow-md transition ${
                currentCard === idx ? "" : "hidden"
              }`}
            >
              {q === 1 && (
                <>
                  <h2 className="text-[#3ECF8E] text-lg font-['Orbitron'] mb-4">
                    Preferred workout time?
                  </h2>
                  <select
                    id="q1"
                    value={answers.q1}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#10141a] border border-[#2c3340] rounded-lg text-white focus:outline-none focus:border-[#3ECF8E]"
                  >
                    <option value="">-- Select --</option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                    <option>Night</option>
                  </select>
                  <button
                    onClick={handleNext}
                    className="next-btn mt-6 bg-[#0066FF] text-white px-6 py-2 rounded-tl-[15px] rounded-br-[15px] rounded-tr-[8px] rounded-bl-[8px] font-['Orbitron'] font-semibold hover:bg-[#0052cc] transition"
                    disabled={!answers.q1}
                  >
                    Next
                  </button>
                </>
              )}

              {q === 2 && (
                <>
                  <h2 className="text-[#3ECF8E] text-lg font-['Orbitron'] mb-4">
                    Do you have access to equipment?
                  </h2>
                  <select
                    id="q2"
                    value={answers.q2}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#10141a] border border-[#2c3340] rounded-lg text-white focus:outline-none focus:border-[#3ECF8E]"
                  >
                    <option value="">-- Select --</option>
                    <option>Full Gym</option>
                    <option>Basic Dumbbells</option>
                    <option>Resistance Bands</option>
                    <option>No Equipment</option>
                  </select>
                  <button
                    onClick={handleNext}
                    className="next-btn mt-6 bg-[#0066FF] text-white px-6 py-2 rounded-tl-[15px] rounded-br-[15px] rounded-tr-[8px] rounded-bl-[8px] font-['Orbitron'] font-semibold hover:bg-[#0052cc] transition"
                    disabled={!answers.q2}
                  >
                    Next
                  </button>
                </>
              )}

              {q === 3 && (
                <>
                  <h2 className="text-[#3ECF8E] text-lg font-['Orbitron'] mb-4">
                    Any injuries we should know?
                  </h2>
                  <input
                    type="text"
                    id="q3"
                    value={answers.q3}
                    onChange={handleInputChange}
                    placeholder="Type here..."
                    className="w-full p-3 bg-[#10141a] border border-[#2c3340] rounded-lg text-white focus:outline-none focus:border-[#3ECF8E]"
                  />
                  <button
                    onClick={handleNext}
                    className="next-btn mt-6 bg-[#0066FF] text-white px-6 py-2 rounded-tl-[15px] rounded-br-[15px] rounded-tr-[8px] rounded-bl-[8px] font-['Orbitron'] font-semibold hover:bg-[#0052cc] transition"
                    disabled={!answers.q3}
                  >
                    Next
                  </button>
                </>
              )}

              {q === 4 && (
                <>
                  <h2 className="text-[#3ECF8E] text-lg font-['Orbitron'] mb-4">
                    How many days per week are you available?
                  </h2>
                  <select
                    id="q4"
                    value={answers.q4}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#10141a] border border-[#2c3340] rounded-lg text-white focus:outline-none focus:border-[#3ECF8E]"
                  >
                    <option value="">-- Select --</option>
                    <option>2 Days</option>
                    <option>3 Days</option>
                    <option>4 Days</option>
                    <option>5 Days</option>
                    <option>6 Days</option>
                    <option>7 Days</option>
                  </select>
                  <button
                    onClick={handleNext}
                    className="submit-btn mt-6 bg-[#3ECF8E] text-black px-6 py-2 rounded-tl-[15px] rounded-br-[15px] rounded-tr-[8px] rounded-bl-[8px] font-['Orbitron'] font-semibold hover:bg-[#32b877] transition"
                    disabled={!answers.q4}
                  >
                    Submit
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-[#1a1f27] border border-[#2c3340] rounded-xl p-6 text-center max-w-sm w-full">
            <h2 className="text-[#3ECF8E] font-['Orbitron'] mb-4">Choose your workout mode</h2>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => redirectToPlan("home")}
                className="bg-[#0066FF] hover:bg-[#0052cc] text-white px-5 py-2 rounded-tl-[15px] rounded-br-[15px] rounded-tr-[8px] rounded-bl-[8px] font-['Orbitron']"
              >
                Home
              </button>
              <button
                onClick={() => redirectToPlan("gym")}
                className="bg-[#3ECF8E] hover:bg-[#32b877] text-black px-5 py-2 rounded-tl-[15px] rounded-br-[15px] rounded-tr-[8px] rounded-bl-[8px] font-['Orbitron']"
              >
                Gym
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-4 border-t border-[#2c3340] text-center text-gray-400 text-sm">
        <p>&copy; 2025 RepMate. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Questionnaire;
