import React, { useEffect, useState } from "react";
import logo from "../assets/images/new-logo.png";
//import workoutPreview from "../assets/images/workout-preview.jpg";

const Workout = () => {
  const [workout, setWorkout] = useState({
    title: "Today's Session 💪",
    instructions: "",
    video: "/videos/sample-workout.mp4"
  });

  useEffect(() => {
    if (localStorage.getItem("repMateUserLoggedIn") !== "true") {
      window.location.href = "login.html";
      return;
    }

    const selectedPlan = localStorage.getItem("repMateSelectedPlan");
    if (!selectedPlan) {
      window.location.href = "plan.html";
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    let day = urlParams.get("day");
    if (!day) {
      const today = new Date().getDay();
      day = today === 0 ? 7 : today;
    }

    const plans = JSON.parse(localStorage.getItem("repMatePlans")) || {};
    const workouts = plans[selectedPlan] || {
      1: { title: "Day 1: Chest + Core", instructions: "🔹 3 Sets x 15 Push-Ups\n🔹 3 Sets x 20 Crunches\n🔹 2 Sets x 30s Plank", video: "/videos/sample-workout.mp4" },
      2: { title: "Day 2: Legs + Glutes", instructions: "🔹 3 Sets x 20 Squats\n🔹 2 Sets x 15 Lunges (each leg)\n🔹 2 Sets x 15 Glute Bridges", video: "/videos/sample-workout.mp4" },
      3: { title: "Day 3: Back + Biceps", instructions: "🔹 3 Sets x 12 Pull-Ups\n🔹 3 Sets x 15 Dumbbell Rows\n🔹 3 Sets x 12 Bicep Curls", video: "/videos/sample-workout.mp4" },
      4: { title: "Day 4: Shoulders + Abs", instructions: "🔹 3 Sets x 12 Shoulder Press\n🔹 3 Sets x 15 Lateral Raises\n🔹 3 Sets x 20 Russian Twists", video: "/videos/sample-workout.mp4" },
      5: { title: "Day 5: Full Body HIIT", instructions: "🔹 30s Jumping Jacks\n🔹 30s Burpees\n🔹 30s Mountain Climbers\nRepeat x 4 rounds", video: "/videos/sample-workout.mp4" },
      6: { title: "Day 6: Lower Body Strength", instructions: "🔹 3 Sets x 12 Deadlifts\n🔹 3 Sets x 15 Step-Ups\n🔹 3 Sets x 20 Calf Raises", video: "/videos/sample-workout.mp4" },
      7: { title: "Day 7: Active Recovery", instructions: "🔹 20 min Yoga/Stretching\n🔹 15 min Light Cardio (Walk or Cycle)\n🔹 Breathing Exercises", video: "/videos/sample-workout.mp4" }
    };

    if (workouts[day]) {
      setWorkout({
        title: workouts[day].title,
        instructions: workouts[day].instructions,
        video: workouts[day].video
      });
    } else {
      setWorkout({
        title: "Invalid Day",
        instructions: "Oops! Workout not found.",
        video: "/videos/sample-workout.mp4"
      });
    }
  }, []);

  const startCamera = () => {
    alert("📷 Camera activation coming soon!");
  };

  const goBack = () => {
    window.location.href = "plan.html";
  };

  const goDashboard = () => {
    if (localStorage.getItem("repMateUserLoggedIn") === "true") {
      window.location.href = "dashboard.html";
    } else {
      window.location.href = "login.html";
    }
  };

  const markComplete = () => {
    const selectedPlan = localStorage.getItem("repMateSelectedPlan");
    const progressKey = `repMateProgress_${selectedPlan}`;
    let progress = JSON.parse(localStorage.getItem(progressKey)) || { completed: [] };

    const urlParams = new URLSearchParams(window.location.search);
    let day = urlParams.get("day") || new Date().getDay();
    day = day === 0 ? 7 : day;

    if (!progress.completed.includes(day)) {
      progress.completed.push(day);
      localStorage.setItem(progressKey, JSON.stringify(progress));
    }

    alert("✅ Workout marked complete! Streak & progress updated.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-white font-['Inter']">
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&family=Inter&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <header className="bg-[#12171e] border-b border-[#2c3340] flex items-center justify-between px-8 h-20 relative font-['Orbitron']">
        <div onClick={goDashboard} className="flex items-center gap-2 text-[#3ECF8E] font-bold text-2xl cursor-pointer">
          <img
            src={logo}
            alt="RepMate Logo"
            className="w-12 h-12 object-cover rounded-full border-2 border-[#3ECF8E] bg-[#10141a] shadow-[0_0_8px_rgba(0,255,170,0.5),0_0_16px_rgba(0,255,170,0.15)] hover:scale-105 hover:shadow-[0_0_10px_rgba(0,255,170,0.6),0_0_20px_rgba(0,255,170,0.25)] transition duration-300"
          />
          <span className="logo-text text-[#3ECF8E] uppercase tracking-wider">RepMate</span>
        </div>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[#3ECF8E] text-2xl font-bold m-0">
          Workout Arena
        </h1>
        <nav className="flex gap-6">
          <a href="home.html" className="text-white/80 hover:text-[#3ECF8E] transition">Home</a>
          <a href="dashboard.html" className="text-white/80 hover:text-[#3ECF8E] transition">Dashboard</a>
          <a href="goal-selection.html" className="text-white/80 hover:text-[#3ECF8E] transition">Goals</a>
          <a href="profile.html" className="text-white/80 hover:text-[#3ECF8E] transition">Profile</a>
          <a href="contact.html" className="text-white/80 hover:text-[#3ECF8E] transition">Contact</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center px-4 py-8 max-w-4xl mx-auto flex-1">
        <section className="bg-[#1a1f27] border-2 border-[#2c3340] rounded-xl p-8 shadow-md w-full max-w-2xl text-center transition hover:-translate-y-1.5 hover:shadow-[0_12px_24px_rgba(0,255,170,0.2)] hover:bg-[#1f252e] hover:border-[#3ECF8E]">
          <h2 id="workout-title" className="text-[#3ECF8E] text-2xl font-['Orbitron']" >{workout.title}</h2>

          {/* Video Box */}
          <div className="border border-[#2c3340] rounded-lg bg-[#10141a] mt-4 p-4">
            <video controls /*poster={workoutPreview}*/ className="w-full rounded-lg workout-media">
              <source src={workout.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Instructions */}
          <pre id="workout-instructions" className="text-left mt-4 whitespace-pre-line">{workout.instructions}</pre>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6 flex-wrap font-['Orbitron']">
            <button
              onClick={startCamera}
              className="cta-btn bg-[#0066FF] text-white px-6 py-3 font-semibold tracking-wide border border-white/5 shadow-[0_0_6px_rgba(0,102,255,0.3)] rounded-tl-[15px] rounded-br-[15px] rounded-tr-[8px] rounded-bl-[8px] transition hover:bg-[#0052cc] hover:-translate-y-0.5 hover:text-[#3ECF8E]"
            >
              Start Camera
            </button>
            <button
              onClick={markComplete}
              className="cta-btn bg-[#3ECF8E] text-black px-6 py-3 font-semibold tracking-wide border border-white/5 shadow-[0_0_6px_rgba(62,207,142,0.3)] rounded-tl-[15px] rounded-br-[15px] rounded-tr-[8px] rounded-bl-[8px] transition hover:bg-[#2ea86c] hover:-translate-y-0.5 hover:text-[#ffffff]"
            >
              Mark As Complete
            </button>
            <button
              onClick={goBack}
              className="cta-btn bg-[#0066FF] text-white px-6 py-3 font-semibold tracking-wide border border-white/5 shadow-[0_0_6px_rgba(0,102,255,0.3)] rounded-tl-[15px] rounded-br-[15px] rounded-tr-[8px] rounded-bl-[8px] transition hover:bg-[#0052cc] hover:-translate-y-0.5 hover:text-[#3ECF8E]"
            >
              Back to Plan
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-4 border-t border-[#2c3340] text-center text-gray-400 text-sm">
        <p>&copy; 2025 RepMate. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Workout;
