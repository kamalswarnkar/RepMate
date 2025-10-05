import React, { useState, useEffect } from "react";
import AvatarModal from "../components/AvatarModal";
import img from "../assets/images/new-logo.png";

const Profile = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    diet: "",
    medical: "",
  });
  const [avatar, setAvatar] = useState("/avatars/avatar1.jpeg");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("repMateUserLoggedIn");
    if (!userLoggedIn) {
      window.location.href = "/login";
      return;
    }

    const email = localStorage.getItem("repMateUserEmail");
    const savedProfile =
      JSON.parse(localStorage.getItem(`repMateUserProfile_${email}`)) ||
      JSON.parse(localStorage.getItem("repMateUserProfile")) ||
      {};

    setForm({
      username: savedProfile.username || "",
      email: savedProfile.email || "",
      age: savedProfile.age || "",
      gender: savedProfile.gender || "",
      height: savedProfile.height || "",
      weight: savedProfile.weight || "",
      diet: savedProfile.diet || "",
      medical: savedProfile.medical || "",
    });

    if (savedProfile.avatar) setAvatar(savedProfile.avatar);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const saveProfile = (e) => {
    e.preventDefault();
    const email = localStorage.getItem("repMateUserEmail");
    const updatedProfile = { ...form, avatar };

    if (
      !form.username ||
      !form.email ||
      !form.age ||
      !form.gender ||
      !form.height ||
      !form.weight
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      localStorage.setItem("repMateUserProfile", JSON.stringify(updatedProfile));
      if (email)
        localStorage.setItem(
          `repMateUserProfile_${email}`,
          JSON.stringify(updatedProfile)
        );
      alert("Profile saved! 🚀");
    } catch (err) {
      console.error(err);
      alert("Failed to save profile. Try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("repMateUserLoggedIn");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-['Inter']">
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600&family=Inter&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        .btn-primary {
          padding: 0.6rem 1.25rem;
          font-family: 'Orbitron', sans-serif;
          font-weight: 600;
          background: #29f5a6;
          color: #fff;
          border: 2px solid #29f5a6;
          border-top-left-radius: 15px;
          border-bottom-right-radius: 15px;
          border-top-right-radius: 8px;
          border-bottom-left-radius: 8px;
          transition: all 0.25s ease;
          text-transform: uppercase;
          font-size: 0.9rem;
        }
        .btn-primary:hover {
          background: #20c28c;
          transform: translateY(-2px);
          box-shadow: 0 0 10px rgba(41,245,166,0.7), 0 0 20px rgba(41,245,166,0.4);
        }
        .btn-logout {
          padding: 0.6rem 1.25rem;
          border: 2px solid #ef4444;
          color: #ef4444;
          font-weight: 700;
          border-top-left-radius: 15px;
          border-bottom-right-radius: 15px;
          border-top-right-radius: 8px;
          border-bottom-left-radius: 8px;
          transition: all 0.25s ease;
          font-size: 0.9rem;
        }
        .btn-logout:hover {
          background: #ef4444;
          color: #000;
        }
      `}</style>

      <header>
        <nav className="flex justify-between items-center px-8 py-5 bg-[#12171e] border-b border-[#2c3340] shadow font-orbitron">
          <div className="flex items-center gap-2 text-[#3ECF8E] font-bold text-2xl">
            <img
              src={img}
              alt="RepMate Logo"
              className="w-12 h-12 object-cover rounded-full border-2 border-[#3ECF8E] bg-[#10141a] shadow-[0_0_8px_rgba(0,255,170,0.5),0_0_16px_rgba(0,255,170,0.15)] hover:scale-105 transition"
            />
            <span className="uppercase">RepMate</span>
          </div>
          <ul className="flex gap-5 font-orbitron">
            <li>
              <a
                href="/dashboard"
                className="text-gray-300 font-semibold hover:text-[#3ECF8E]"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/goal-selection"
                className="text-gray-300 font-semibold hover:text-[#3ECF8E]"
              >
                Goals
              </a>
            </li>
            <li>
              <a
                href="/plan"
                className="text-gray-300 font-semibold hover:text-[#3ECF8E]"
              >
                AI Planner
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex flex-col items-center p-8">
        <div className="flex justify-between items-start gap-10 mt-8 w-full max-w-6xl flex-wrap">
          {/* === Form Section === */}
          <div className="bg-[#1a1a1a] rounded-lg p-8 w-[420px] shadow-[0_0_15px_#29f5a68c] flex flex-col gap-6">
            <h2 className="font-orbitron text-3xl text-center uppercase text-[#3ECF8E] tracking-wider">
              User Profile
            </h2>

            <form className="flex flex-col gap-4" onSubmit={saveProfile}>
              <div className="flex flex-col">
                <label className="font-orbitron text-sm text-gray-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  className="w-full max-w-[95%] p-2 rounded bg-[#2c2c2c] text-white outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-orbitron text-sm text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full max-w-[95%] p-2 rounded bg-[#2c2c2c] text-white outline-none"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col flex-1">
                  <label className="font-orbitron text-sm text-gray-300 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="21"
                    className="w-full p-2 rounded bg-[#2c2c2c] text-white outline-none"
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <label className="font-orbitron text-sm text-gray-300 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-[#2c2c2c] text-white outline-none"
                  >
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col flex-1">
                  <label className="font-orbitron text-sm text-gray-300 mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={form.height}
                    onChange={handleChange}
                    placeholder="170"
                    className="w-full p-2 rounded bg-[#2c2c2c] text-white outline-none"
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <label className="font-orbitron text-sm text-gray-300 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={form.weight}
                    onChange={handleChange}
                    placeholder="70"
                    className="w-full p-2 rounded bg-[#2c2c2c] text-white outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="font-orbitron text-sm text-gray-300 mb-1">
                  Diet Preference
                </label>
                <select
                  name="diet"
                  value={form.diet}
                  onChange={handleChange}
                  className="w-full max-w-[95%] p-2 rounded bg-[#2c2c2c] text-white outline-none"
                >
                  <option value="">Select your preference</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="keto">Keto</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-orbitron text-sm text-gray-300 mb-1">
                  Medical Conditions
                </label>
                <textarea
                  rows="4"
                  name="medical"
                  value={form.medical}
                  onChange={handleChange}
                  placeholder="E.g. Asthma, Knee pain, etc."
                  className="w-full max-w-[95%] p-2 rounded bg-[#2c2c2c] text-white outline-none resize-y"
                ></textarea>
              </div>

              <div className="flex justify-center items-center gap-3">
                <label className="font-orbitron">Fitness Goal</label>
                <a href="/goal-selection" className="btn-primary">
                  Select Your Goal
                </a>
              </div>

              <div className="flex justify-between mt-4">
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
                <button type="button" onClick={logout} className="btn-logout">
                  Logout
                </button>
              </div>
            </form>
          </div>

          {/* === Avatar Section === */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="group w-[300px] h-[300px] bg-[#1a1f27] border-2 border-dashed border-[#2c3340] rounded-lg overflow-hidden flex justify-center items-center transition hover:scale-[1.03] hover:border-[#3ECF8E]">
              <img
                src={avatar}
                alt="User Avatar"
                className="w-full h-full object-cover rounded-lg transition-transform duration-400 ease-in-out group-hover:scale-105"
              />
            </div>
            <button onClick={() => setModalOpen(true)} className="btn-primary">
              Change Photo
            </button>
          </div>
        </div>
      </main>

      <footer className="text-center p-5 bg-[#121212] text-gray-500 text-sm mt-10">
        <p>&copy; 2025 RepMate. All rights reserved.</p>
      </footer>

      {modalOpen && (
        <AvatarModal setAvatar={setAvatar} closeModal={() => setModalOpen(false)} />
      )}
    </div>
  );
};

export default Profile;
