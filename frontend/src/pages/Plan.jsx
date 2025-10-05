import React, { useEffect } from "react";
import logo from "../assets/images/new-logo.png";

const Plan = () => {
  useEffect(() => {
    const loggedIn = localStorage.getItem("repMateUserLoggedIn");
    if (loggedIn !== "true") {
      window.location.href = "/login";
      return;
    }

    const savedPlan = localStorage.getItem("repMateSelectedPlan");
    if (savedPlan) {
      const plan = JSON.parse(savedPlan);
      currentPlace = plan.place;
      generatePlan(plan.profile, plan.goal, plan.place, false);
    } else {
      const savedPlace = localStorage.getItem("repMateWorkoutPlace");
      if (savedPlace) {
        const profileData = JSON.parse(localStorage.getItem("repMateUserProfile")) || {};
        const goalData = JSON.parse(localStorage.getItem("selectedGoals")) || ["Build Strength"];
        currentPlace = savedPlace;
        generatePlan(profileData, goalData, savedPlace, true);
      } else {
        document.getElementById("homeGymModal").classList.remove("hidden");
      }
    }
  }, []);

  let currentPlace = null;

  const selectWorkoutPlace = (place) => {
    currentPlace = place;
    document.getElementById("homeGymModal").classList.add("hidden");
    localStorage.setItem("repMateWorkoutPlace", place);

    const profileData = JSON.parse(localStorage.getItem("repMateUserProfile")) || {};
    const goalData = JSON.parse(localStorage.getItem("selectedGoals")) || ["Build Strength"];

    generatePlan(profileData, goalData, place, true);
  };

  const generatePlan = (profileData, goalData, place, save = true) => {
    const workoutBox = document.getElementById("workout-content");
    const dietBox = document.getElementById("diet-content");
    const tipsBox = document.getElementById("tips-content");
    const startWorkoutBtn = document.getElementById("start-workout");
    const regeneratePlanBtn = document.getElementById("regenerate-plan");
    const downloadPlanBtn = document.getElementById("download-plan");

    const username = profileData.username || "RepMate User";
    const fitnessLevel = profileData.fitnessLevel || "Intermediate";
    const weight = profileData.weight || "70";
    const medical = profileData.medical || "";

    workoutBox.innerHTML = `
      <p>Hello <strong>${username}</strong>! Here's your <strong>${place}</strong> workout based on your fitness level <strong>${fitnessLevel}</strong> and goal <strong>${goalData.join(" & ")}</strong>.</p>
      <ul class="list-disc ml-6 mt-2">
        <li>🧍 Warm-up: 5-10 mins of dynamic stretches</li>
        <li>🏋️ Main workout: ${place === "Gym" ? "Weighted exercises with progressive overload" : "Bodyweight routines with high intensity"} targeting ${goalData.join(", ")}</li>
        <li>🧘 Cool-down: Gentle stretches and breathing</li>
      </ul>
    `;

    dietBox.innerHTML = `
      <p>Your meals tailored to <strong>${weight}kg</strong> and goal: <strong>${goalData.join(" & ")}</strong>.</p>
      <ul class="list-disc ml-6 mt-2">
        <li>🥗 Breakfast: Oats + 3 eggs + fruit</li>
        <li>🍛 Lunch: Grilled chicken/fish + rice + veggies</li>
        <li>🌯 Dinner: Light salad + protein source</li>
        <li>🥤 Snacks: Nuts, yogurt, protein shake</li>
      </ul>
    `;

    tipsBox.innerHTML = `
      <ul class="list-disc ml-6 mt-2">
        <li>🚰 Stay hydrated (3L/day)</li>
        <li>📏 Track your progress weekly</li>
        <li>💤 Get at least 7-8 hrs of sleep</li>
        ${medical ? `<li>🩺 Reminder: Take care of your ${medical}</li>` : ""}
      </ul>
    `;

    [startWorkoutBtn, regeneratePlanBtn, downloadPlanBtn].forEach((btn) => {
      btn.style.display = "inline-block";
      btn.className =
        "bg-[#0066FF] text-white font-semibold orbitron py-3 px-6 mt-4 " +
        "rounded-tl-[15px] rounded-br-[15px] rounded-tr-[8px] rounded-bl-[8px] " +
        "transition-all hover:bg-[#0052cc] hover:text-[#3ECF8E] " +
        "hover:shadow-[0_0_10px_rgba(0,102,255,0.6),0_0_18px_rgba(0,102,255,0.3)] " +
        "hover:-translate-y-0.5";
    });

    startWorkoutBtn.onclick = () => {
      const customPlan = { profile: profileData, goal: goalData, place, createdAt: new Date().toISOString() };
      localStorage.setItem("repMateSelectedPlan", JSON.stringify(customPlan));
      window.location.href = "/workout?day=1";
    };

    if (save) {
      const customPlan = { profile: profileData, goal: goalData, place, createdAt: new Date().toISOString() };
      localStorage.setItem("repMateSelectedPlan", JSON.stringify(customPlan));
    }
  };

  const regeneratePlan = () => {
    const savedPlan = JSON.parse(localStorage.getItem("repMateSelectedPlan"));
    if (savedPlan) {
      generatePlan(savedPlan.profile, savedPlan.goal, savedPlan.place, true);
    }
  };

  const downloadPlan = () => {
    alert("⬇️ Download feature coming soon!");
  };

  return (
    <div className="bg-[#0d0d0d] text-white flex flex-col min-h-screen">
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700&family=Inter:wght@400;500&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <header className="bg-[#12171e] border-b border-[#2c3340] flex items-center justify-between px-8 h-20 relative font-['Orbitron']">
        <div
          id="logoArea"
          className="flex items-center gap-2 font-bold text-2xl text-[#3ECF8E] cursor-pointer"
          onClick={() => {
            if (localStorage.getItem("repMateUserLoggedIn") === "true") {
              window.location.href = "/dashboard";
            } else {
              window.location.href = "/";
            }
          }}
        >
          <img
            src={logo}
            alt="RepMate Logo"
            className="w-12 h-12 object-cover rounded-full border-2 border-[#3ECF8E] bg-[#10141a] shadow-[0_0_8px_rgba(0,255,170,0.5),0_0_16px_rgba(0,255,170,0.15)] transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_10px_rgba(0,255,170,0.6),0_0_20px_rgba(0,255,170,0.25)]"
          />
          <span className="orbitron text-[#3ECF8E] uppercase tracking-wide">RepMate</span>
        </div>
        <h1 className="orbitron text-[#3ECF8E] text-2xl font-bold absolute left-1/2 -translate-x-1/2">
          AI Custom Plan
        </h1>
        <nav className="flex gap-6">
          <a href="/" className="orbitron text-white/80 hover:text-[#3ECF8E] transition">
            Home
          </a>
          <a href="/dashboard" className="orbitron text-white/80 hover:text-[#3ECF8E] transition">
            Dashboard
          </a>
          <a href="/goal-selection" className="orbitron text-white/80 hover:text-[#3ECF8E] transition">
            Goals
          </a>
          <a href="/profile" className="orbitron text-white/80 hover:text-[#3ECF8E] transition">
            Profile
          </a>
          <a href="/contact" className="orbitron text-white/80 hover:text-[#3ECF8E] transition">
            Contact
          </a>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center gap-8 p-6 max-w-[1200px] mx-auto">
        <div className="flex flex-wrap justify-center gap-8 w-full">
          <section className="bg-[#1a1f27] border-2 border-[#2c3340] rounded-xl p-6 shadow-md transition hover:-translate-y-1.5 hover:shadow-xl hover:bg-[#1f252e] hover:border-[#3ECF8E] flex-1 min-w-[340px] max-w-[500px] h-[400px] flex flex-col justify-between">
            <h2 className="text-center text-2xl orbitron text-[#3ECF8E] font-['Orbitron']">Workout Plan 🏋️‍♂️</h2>
            <div
              className="bg-[#10141a] border border-[#2c3340] rounded-lg p-4 mt-4 h-full overflow-y-auto transition hover:border-[#0ef] hover:shadow-[0_0_15px_rgba(0,255,170,0.2)]"
              id="workout-content"
            >
              <p className="italic text-white/60 font-['Inter']">Generating your customized workout plan...</p>
            </div>
          </section>

          <section className="bg-[#1a1f27] border-2 border-[#2c3340] rounded-xl p-6 shadow-md transition hover:-translate-y-1.5 hover:shadow-xl hover:bg-[#1f252e] hover:border-[#3ECF8E] flex-1 min-w-[340px] max-w-[500px] h-[400px] flex flex-col justify-between">
            <h2 className="text-center text-2xl orbitron text-[#3ECF8E] font-['Orbitron']">Diet Plan 🍽️</h2>
            <div
              className="bg-[#10141a] border border-[#2c3340] rounded-lg p-4 mt-4 h-full overflow-y-auto transition hover:border-[#0ef] hover:shadow-[0_0_15px_rgba(0,255,170,0.2)]"
              id="diet-content"
            >
              <p className="italic text-white/60">Crunching macros & meal strategy...</p>
            </div>
          </section>
        </div>

        <section className="bg-[#1a1f27] border-2 border-[#2c3340] rounded-xl p-6 shadow-md w-full max-w-[1040px] transition hover:-translate-y-1.5 hover:shadow-xl hover:bg-[#1f252e] hover:border-[#3ECF8E] flex-1 flex flex-col justify-between">
          <h2 className="text-center text-2xl orbitron text-[#3ECF8E] font-['Orbitron']">Extra Tips 💡</h2>
          <div
            className="bg-[#10141a] border border-[#2c3340] rounded-lg p-4 mt-4 h-full overflow-y-auto transition hover:border-[#0ef] hover:shadow-[0_0_15px_rgba(0,255,170,0.2)]"
            id="tips-content"
          >
            <p className="italic text-white/60">Cooking up some personalized advice...</p>
          </div>
        </section>

        <div className="flex justify-center gap-4 mt-8 font-['Orbitron']">
          <button onClick={regeneratePlan} id="regenerate-plan" className="bg-[#0066FF] text-white px-6 py-3 rounded-md">
            Regenerate Plan
          </button>
          <button onClick={downloadPlan} id="download-plan" className="bg-[#0066FF] text-white px-6 py-3 rounded-md">
            Download Plan
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button id="start-workout" style={{ display: "none" }} className="bg-[#0066FF] text-white px-6 py-3 rounded-md">
            Start Plan
          </button>
        </div>
      </main>

      {/* Modal */}
      <div id="homeGymModal" className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center hidden">
        <div className="bg-[#1a1f27] border-2 border-[#3ECF8E] rounded-xl p-8 shadow-lg text-center w-[320px]">
          <h2 className="font-['Orbitron'] text-[#3ECF8E] text-xl mb-4">Where will you workout?</h2>
          <div className="flex gap-4 justify-center">
            <button onClick={() => selectWorkoutPlace("Home")} className="font-['Orbitron'] bg-[#0066FF] text-white px-4 py-2 rounded-md">Home</button>
            <button onClick={() => selectWorkoutPlace("Gym")} className="font-['Orbitron'] bg-[#0066FF] text-white px-4 py-2 rounded-md">Gym</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-4 border-t border-[#2c3340] text-center text-gray-500 text-sm font-['Inter']">
        <p>&copy; 2025 RepMate. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Plan;
