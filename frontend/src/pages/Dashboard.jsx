import React, { useEffect } from "react";
import logo from "../assets/images/new-logo.png";

const Dashboard = () => {

  useEffect(() => {
    function safeParse(str) {
      if (!str) return null;
      try { return JSON.parse(str); } catch (e) { return null; }
    }

    const userEmail = localStorage.getItem("repMateUserEmail");
    let progressRaw = localStorage.getItem("repMateProgress") || null;
    if (!progressRaw && userEmail) {
      progressRaw = localStorage.getItem("repMateProgress_" + userEmail) || null;
    }

    if (!progressRaw) {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!k) continue;
        if (k === "repMateProgress" || k.startsWith("repMateProgress")) {
          const candidateVal = localStorage.getItem(k);
          const parsedVal = safeParse(candidateVal);
          if (parsedVal && (parsedVal.profile || parsedVal.completed || parsedVal.goal)) {
            progressRaw = candidateVal;
            break;
          }

          const prefix = "repMateProgress_";
          if (k.startsWith(prefix)) {
            const keyJson = k.slice(prefix.length);
            const parsedKeyJson = safeParse(keyJson);
            if (parsedKeyJson && (parsedKeyJson.profile || parsedKeyJson.goal)) {
              const merged = Object.assign({}, parsedKeyJson, (parsedVal || {}));
              progressRaw = JSON.stringify(merged);
              break;
            }
          }

          if (candidateVal) {
            progressRaw = candidateVal;
            break;
          }
        }
      }
    }

    let progressData = safeParse(progressRaw);
    if (!progressData) {
      const profileFromUserProfile = safeParse(localStorage.getItem("repMateUserProfile")) ||
                                     safeParse(localStorage.getItem("repMateUserProfile_" + userEmail)) ||
                                     null;
      const selectedGoals = safeParse(localStorage.getItem("selectedGoals")) || safeParse(localStorage.getItem("selectedGoals_" + userEmail)) || null;
      const selectedPlan = safeParse(localStorage.getItem("repMateSelectedPlan")) ||
                           safeParse(localStorage.getItem("selectedPlan")) ||
                           safeParse(localStorage.getItem("repMateSelectedPlan_" + userEmail)) ||
                           null;

      progressData = {};
      progressData.profile = (selectedPlan && selectedPlan.profile) ? selectedPlan.profile : (profileFromUserProfile || { username: "", email: userEmail || "" });
      progressData.goal = (selectedPlan && selectedPlan.goal) ? selectedPlan.goal : (selectedGoals || []);
      progressData.place = (selectedPlan && selectedPlan.place) ? selectedPlan.place : (selectedPlan && selectedPlan.profile && selectedPlan.profile.place) || "Home";

      const possibleCompleted = safeParse(localStorage.getItem("repMateProgressCompleted")) ||
                                safeParse(localStorage.getItem("repMateProgress_completed")) ||
                                safeParse(localStorage.getItem("repMateProgressData")) ||
                                null;
      progressData.completed = (possibleCompleted && possibleCompleted.completed) ? possibleCompleted.completed : (possibleCompleted && Array.isArray(possibleCompleted) ? possibleCompleted : []);
    }

    if (typeof progressData === "string") {
      const tmp = safeParse(progressData);
      if (tmp) progressData = tmp;
    }

    progressData.profile = progressData.profile || {};
    progressData.goal = progressData.goal || [];
    let completed = [];
    if (Array.isArray(progressData.completed)) {
      completed = progressData.completed;
    } else if (progressData.completed && Array.isArray(progressData.completed.completed)) {
      completed = progressData.completed.completed;
    } else if (typeof progressData.completed === "object") {
      for (const k in progressData.completed) {
        if (Array.isArray(progressData.completed[k])) {
          completed = progressData.completed[k];
          break;
        }
      }
    } else if (!progressData.completed) {
      completed = [];
    }
    if (!Array.isArray(completed)) completed = [];

    const username = (progressData.profile && progressData.profile.username && String(progressData.profile.username).trim()) ? progressData.profile.username : (
      (safeParse(localStorage.getItem("repMateUserProfile")) && safeParse(localStorage.getItem("repMateUserProfile")).username) ? safeParse(localStorage.getItem("repMateUserProfile")).username :
      (safeParse(localStorage.getItem("repMateUserData")) && safeParse(localStorage.getItem("repMateUserData")).name) ? safeParse(localStorage.getItem("repMateUserData")).name :
      "Fitness Champ"
    );
    document.querySelector(".welcome-msg").textContent = `Welcome back, ${username}!`;

    const streakCount = completed.length || 0;
    document.getElementById("streak-count").textContent = streakCount;

    let totalWorkouts = 7;
    const selectedPlanCandidate = safeParse(localStorage.getItem("repMateSelectedPlan")) ||
                                  safeParse(localStorage.getItem("selectedPlan")) ||
                                  safeParse(localStorage.getItem("repMateSelectedPlan_" + userEmail));
    if (selectedPlanCandidate) {
      if (Array.isArray(selectedPlanCandidate.workouts) && selectedPlanCandidate.workouts.length > 0) {
        totalWorkouts = selectedPlanCandidate.workouts.length;
      } else if (typeof selectedPlanCandidate.totalDays === "number") {
        totalWorkouts = selectedPlanCandidate.totalDays;
      }
    }
    if (typeof progressData.totalWorkouts === "number") totalWorkouts = progressData.totalWorkouts;
    if (Array.isArray(progressData.workouts) && progressData.workouts.length > 0) totalWorkouts = progressData.workouts.length;

    const progressPercent = Math.min(Math.round((streakCount / Math.max(1, totalWorkouts)) * 100), 100);
    const progressFill = document.getElementById("progress-fill");
    progressFill.style.width = progressPercent + "%";
    progressFill.textContent = progressPercent + "%";

    document.getElementById("calories-content").innerHTML =
      progressData.calories || localStorage.getItem("caloriesBurned") || "No data yet 🔥";

    const goalsFromProgress = (progressData.goals && (Array.isArray(progressData.goals) ? progressData.goals.join(", ") : progressData.goals));
    const selectedGoals = safeParse(localStorage.getItem("selectedGoals")) || safeParse(localStorage.getItem("selectedGoals_" + userEmail));
    document.getElementById("goals-content").innerHTML =
      goalsFromProgress || (selectedGoals && selectedGoals.length ? selectedGoals.join(", ") : localStorage.getItem("goalsAchieved") || "No data yet 🏆");

    document.getElementById("timeline-content").innerHTML =
      progressData.timeline || localStorage.getItem("progressTimeline") || "Track your progress 📈";

    document.getElementById("workouts-card").addEventListener("click", () => {
      const planCandidate = safeParse(localStorage.getItem("repMateSelectedPlan")) ||
                            safeParse(localStorage.getItem("selectedPlan")) ||
                            safeParse(localStorage.getItem("repMateSelectedPlan_" + userEmail));
      if (planCandidate) {
        window.location.href = "/workout?day=1";
      } else {
        window.location.href = "/plan";
      }
    });

    if (progressPercent >= 100) {
      try { localStorage.removeItem("repMateProgress"); } catch (e) {}
      window.location.href = "/goal";
    }

    document.querySelector(".logout-btn").addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "/login";
    });

  }, []);

  return (
    <div className="h-full m-0  font-['Inter'] bg-[#0f172a] text-white">

      <header className="p-5 relative z-10 font-['Orbitron']">
        <div className="flex items-center gap-3">
          <img src={logo} alt="RepMate Logo"
               className="w-12 h-12 object-cover rounded-full border-2 border-[#3ECF8E] bg-[#10141a] shadow-[0_0_8px_rgba(0,255,170,0.5),0_0_16px_rgba(0,255,170,0.15)] transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_10px_rgba(0,255,170,0.6),0_0_20px_rgba(0,255,170,0.25)]"/>
          <h1 className="main-heading orbitron text-[#3ECF8E] text-4xl uppercase tracking-wide">Dashboard</h1>
        </div>
      </header>

      <div className="flex px-10 gap-10 font-['Orbitron']">

        <div className="flex-1 grid grid-cols-2 gap-9 pt-10">
          <h2 className="welcome-msg orbitron text-[#3ECF8E] col-span-2 mb-2">Welcome back, Champ!</h2>

          <div id="streak-card" className="dashboard-card bg-[#1a1f27] border-2 border-[#2c3340] rounded-lg p-5 flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_rgba(0,255,170,0.2)] hover:bg-[#1f252e] hover:border-[#3ECF8E] w-full h-[150px]">
            <div className="card-content flex items-center justify-center orbitron text-[#3ECF8E] text-2xl">🔥 <span id="streak-count" className="ml-2">0</span></div>
            <span className="card-label orbitron text-[#3ECF8E] text-lg uppercase tracking-wide mt-2">Streak</span>
          </div>

          <div id="progress-card" className="dashboard-card bg-[#1a1f27] border-2 border-[#2c3340] rounded-lg p-5 flex flex-col justify-center cursor-pointer transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_rgba(0,255,170,0.2)] hover:bg-[#1f252e] hover:border-[#3ECF8E] w-full h-[150px]">
            <span className="card-label orbitron text-[#3ECF8E] text-lg uppercase tracking-wide mb-2">Progress</span>
            <div className="w-full bg-[#2c3340] rounded-full h-4">
              <div id="progress-fill" className="bg-[#3ECF8E] h-4 rounded-full orbitron text-xs text-black text-center" style={{ width: "0%" }}>0%</div>
            </div>
          </div>

          <div id="workouts-card" className="dashboard-card bg-[#1a1f27] border-2 border-[#2c3340] rounded-lg p-5 flex flex-col items-center justify-between cursor-pointer transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_rgba(0,255,170,0.2)] hover:bg-[#1f252e] hover:border-[#3ECF8E] min-h-[300px]">
            <div className="card-content flex-1 w-full flex items-center justify-center rounded-lg"></div>
            <span className="card-label orbitron text-[#3ECF8E] text-lg uppercase tracking-wide mt-2">Workout Logs</span>
          </div>

          <div className="dashboard-card bg-[#1a1f27] border-2 border-[#2c3340] rounded-lg p-5 flex flex-col items-center justify-between cursor-pointer transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_rgba(0,255,170,0.2)] hover:bg-[#1f252e] hover:border-[#3ECF8E] min-h-[300px]">
            <div className="card-content flex-1 w-full flex items-center justify-center rounded-lg" id="calories-content"></div>
            <span className="card-label orbitron text-[#3ECF8E] text-lg uppercase tracking-wide mt-2">Calories Burned</span>
          </div>

          <div className="dashboard-card bg-[#1a1f27] border-2 border-[#2c3340] rounded-lg p-5 flex flex-col items-center justify-between cursor-pointer transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_rgba(0,255,170,0.2)] hover:bg-[#1f252e] hover:border-[#3ECF8E] min-h-[300px]">
            <div className="card-content flex-1 w-full flex items-center justify-center rounded-lg" id="goals-content"></div>
            <span className="card-label orbitron text-[#3ECF8E] text-lg uppercase tracking-wide mt-2">Goals Achieved</span>
          </div>

          <div className="dashboard-card bg-[#1a1f27] border-2 border-[#2c3340] rounded-lg p-5 flex flex-col items-center justify-between cursor-pointer transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_rgba(0,255,170,0.2)] hover:bg-[#1f252e] hover:border-[#3ECF8E] min-h-[300px]">
            <div className="card-content flex-1 w-full flex items-center justify-center rounded-lg" id="timeline-content"></div>
            <span className="card-label orbitron text-[#3ECF8E] text-lg uppercase tracking-wide mt-2">Progress Timeline</span>
          </div>

        </div>

        <aside className="w-[260px] bg-white/5 border-t border-l border-b border-[#42f5b940] p-5 h-screen sticky top-0 flex flex-col justify-between">
          <ul className="flex-1 p-0 m-0">
            <li className="mb-5 text-white orbitron text-lg hover:text-[#3ECF8E] hover:drop-shadow-[0_0_8px_#3ECF8E]"><a href="/">Home</a></li>
            <li className="mb-5 text-white orbitron text-lg hover:text-[#3ECF8E] hover:drop-shadow-[0_0_8px_#3ECF8E]"><a href="/profile">Profile</a></li>
            <li className="mb-5 text-white orbitron text-lg hover:text-[#3ECF8E] hover:drop-shadow-[0_0_8px_#3ECF8E]"><a href="/goal">Goals</a></li>
            <li className="mb-5 text-white orbitron text-lg hover:text-[#3ECF8E] hover:drop-shadow-[0_0_8px_#3ECF8E]"><a href="/plan">AI Planner</a></li>
            <li className="mb-5 text-white orbitron text-lg hover:text-[#3ECF8E] hover:drop-shadow-[0_0_8px_#3ECF8E]"><a href="/about">About</a></li>
            <li className="mb-5 text-white orbitron text-lg hover:text-[#3ECF8E] hover:drop-shadow-[0_0_8px_#3ECF8E]"><a href="/contact">Contact</a></li>
          </ul>
          <button className="logout-btn text-[#ff4f4f] border-2 border-[#ff4f4f] font-bold rounded-tl-[15px] rounded-br-[15px] rounded-tr-[8px] rounded-bl-[8px] p-3 mt-auto mb-2 w-full hover:bg-[#ff4f4f] hover:text-black orbitron transition">Logout</button>
        </aside>

      </div>

      <div className="flex-1 grid grid-cols-2 gap-9 col-span-2 mt-8 mb-8 font-['Orbitron']">
        <div className="dashboard-card bg-[#1a1f27] border-2 border-[#2c3340] rounded-lg p-6 flex flex-col items-center justify-between cursor-pointer transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_rgba(0,255,170,0.2)] hover:bg-[#1f252e] hover:border-[#3ECF8E] min-h-[220px] col-span-2">
          <div className="grid grid-cols-3 gap-6 w-full h-full flex-1">
            <a href="#" id="share-twitter"
               className="bg-[#12171e] border-2 border-[#2c3340] rounded-lg flex items-center justify-center text-3xl transition hover:border-[#E4405F] hover:shadow-[0_0_12px_#E4405F]">
               🐦
            </a>
            <a href="#" id="share-instagram"
               className="bg-[#12171e] border-2 border-[#2c3340] rounded-lg flex items-center justify-center text-3xl transition hover:border-[#E4405F] hover:shadow-[0_0_12px_#E4405F]">
               📸
            </a>
            <a href="#" id="share-whatsapp"
               className="bg-[#12171e] border-2 border-[#2c3340] rounded-lg flex items-center justify-center text-3xl transition hover:border-[#E4405F] hover:shadow-[0_0_12px_#E4405F]">
               💬
            </a>
          </div>
          <span className="orbitron text-[#3ECF8E] text-lg uppercase tracking-wide mt-4">Share Progress</span>
        </div>
      </div>

      <footer className="text-center text-sm text-gray-400 py-5 mt-14 border-t border-[#333] font-['Inter']">
        <p>© 2025 RepMate. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
