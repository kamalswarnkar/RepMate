import React, { useEffect } from "react";
import logo from "../assets/images/new-logo.png";
import img from "../assets/images/contact.png";

const Contact = () => {
  useEffect(() => {
    const form = document.getElementById("contact-form");
    const logoLink = document.getElementById("logo-link");

    if (logoLink) {
      logoLink.addEventListener("click", () => {
        if (localStorage.getItem("repMateUserLoggedIn") === "true") {
          window.location.href = "dashboard.html";
        } else {
          window.location.href = "home.html";
        }
      });
    }

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = {
          name: document.getElementById("name").value.trim(),
          email: document.getElementById("email").value.trim(),
          phone: document.getElementById("phone").value.trim(),
          department: document.getElementById("department").value,
          message: document.getElementById("message").value.trim(),
          timestamp: new Date().toISOString(),
        };

        let messages = JSON.parse(localStorage.getItem("repMateMessages")) || [];
        messages.push(formData);
        localStorage.setItem("repMateMessages", JSON.stringify(messages));

        alert("✅ Message sent successfully! We'll get back to you soon, legend!");
        form.reset();
      });
    }
  }, []);

  return (
    <div className="font-['Inter'] bg-[#10141a] text-[#e4e6eb] min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');
        input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
          box-shadow: 0 0 0px 1000px #12171e inset !important;
          -webkit-box-shadow: 0 0 0px 1000px #12171e inset !important;
          -webkit-text-fill-color: #e4e6eb !important;
        }
        nav ul li a {
          display: inline-block;
          border: none !important;
        }
        nav ul li a:hover {
          text-shadow: 0 0 6px rgba(62,207,142,0.6), 0 0 10px rgba(62,207,142,0.3);
        }
        .custom-checkbox input {
          position: absolute; opacity: 0; cursor: pointer; height: 0; width: 0;
        }
        .checkmark {
          height: 20px; width: 20px; background-color: #12171e; border: 2px solid #3ECF8E;
          border-radius: 4px; box-shadow: 0 0 4px rgba(62,207,142,0.3); transition: all 0.3s ease;
          position: relative; display: inline-block; flex-shrink: 0;
        }
        .custom-checkbox input:checked + .checkmark {
          background-color: #3ECF8E;
          box-shadow: 0 0 10px rgba(62,207,142,0.6), 0 0 18px rgba(62,207,142,0.3);
        }
        .checkmark::after {
          content: ''; position: absolute; display: none; left: 6px; top: 2px; width: 5px; height: 10px;
          border: solid #10141a; border-width: 0 2px 2px 0; transform: rotate(45deg);
        }
        .custom-checkbox input:checked + .checkmark::after { display: block; }
      `}</style>

      {/* Navbar */}
      <header>
        <nav className="flex justify-between items-center px-8 py-5 bg-[#12171e] border-b border-[#2c3340] shadow-md orbitron">
          <div
            id="logo-link"
            className="flex items-center gap-2 font-bold text-2xl text-[#3ECF8E] cursor-pointer"
          >
            <img
              src={logo}
              alt="RepMate Logo"
              className="w-12 h-12 rounded-full border-2 border-[#3ECF8E] object-cover bg-[#10141a] shadow-[0_0_8px_rgba(0,255,170,0.5),0_0_16px_rgba(0,255,170,0.15)] hover:scale-105 hover:shadow-[0_0_10px_rgba(0,255,170,0.6),0_0_20px_rgba(0,255,170,0.25)] transition duration-300"
            />
            <span className="uppercase tracking-wider font-['Orbitron']">RepMate</span>
          </div>
          <ul className="inline-flex items-center flex gap-5 list-none font-['Orbitron']">
            <li>
              <a
                href="home.html"
                className="font-semibold text-[#e4e6eb] hover:text-[#3ECF8E] transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="about.html"
                className="font-semibold text-[#e4e6eb] hover:text-[#3ECF8E] transition"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="login.html"
                className="px-4 py-2 bg-[#0066FF] rounded-tl-[15px] rounded-br-[15px] rounded-tr-[8px] rounded-bl-[8px] text-white font-['Orbitron'] font-semibold hover:bg-[#0052cc] hover:shadow-[0_0_10px_rgba(0,102,255,0.6),0_0_18px_rgba(0,102,255,0.3)] hover:text-[#3ECF8E] hover:-translate-y-0.5 hover:[text-shadow:_0_0_6px_rgba(62,207,142,0.6)] transition"
              >
                Login
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Contact Section */}
      <main className="max-w-[1200px] mx-auto my-16 px-6">
        <div className="flex flex-wrap gap-8 items-start justify-center">
          {/* Left */}
          <div className="flex-1 min-w-[300px] min-h-[400px] bg-[#151a20] shadow-[0_0_10px_rgba(62,207,142,0.1)] p-4">
            <div className="w-full h-[300px] bg-[#1a1f27] border-2 border-dashed border-[#2c3340] rounded-xl shadow-[0_0_10px_rgba(62,207,142,0.1)] mb-4 flex items-center justify-center overflow-hidden relative transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:border-[#3ECF8E] hover:shadow-[0_0_10px_rgba(62,207,142,0.6),0_0_16px_rgba(62,207,142,0.3)]">
              <img
                src={img}
                alt="Animated Character"
                className="w-full h-full object-cover rounded-xl transition-transform duration-400 ease-in-out hover:scale-105"
              />
            </div>
            <div className="text-center font-['Orbitron'] text-[#3ECF8E] text-sm [text-shadow:_0_0_6px_rgba(62,207,142,0.3)] px-2">
              <p>"Empowered by tech, driven by vision."</p>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 min-w-[500px] bg-[#1a1f27] border border-[#2c3340] rounded-xl p-8 shadow-[0_0_16px_rgba(0,255,170,0.05)]">
            <h1 className="font-['Orbitron'] text-4xl font-bold text-[#3ECF8E] text-center mb-8">
              Contact Us
            </h1>
            <form id="contact-form">
              <div className="flex flex-col mb-6">
                <label htmlFor="name" className="font-['Orbitron'] text-base text-[#c8ccd4] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your full name"
                  required
                  className="bg-[#12171e] border border-[#2c3340] px-4 py-3 rounded-lg text-[#e4e6eb] text-base focus:border-[#3ECF8E] focus:shadow-[0_0_10px_rgba(62,207,142,0.2)] outline-none"
                />
              </div>

              <div className="flex flex-col mb-6">
                <label htmlFor="email" className="font-['Orbitron'] text-base text-[#c8ccd4] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  required
                  className="bg-[#12171e] border border-[#2c3340] px-4 py-3 rounded-lg text-[#e4e6eb] text-base focus:border-[#3ECF8E] focus:shadow-[0_0_10px_rgba(62,207,142,0.2)] outline-none"
                />
              </div>

              <div className="flex flex-col mb-6">
                <label htmlFor="phone" className="font-['Orbitron'] text-base text-[#c8ccd4] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="e.g. +91 9876543210"
                  required
                  className="bg-[#12171e] border border-[#2c3340] px-4 py-3 rounded-lg text-[#e4e6eb] text-base focus:border-[#3ECF8E] focus:shadow-[0_0_10px_rgba(62,207,142,0.2)] outline-none"
                />
              </div>

              <div className="flex flex-col mb-6">
                <label htmlFor="department" className="font-['Orbitron'] text-base text-[#c8ccd4] mb-2">
                  Select Department
                </label>
                <select
                  id="department"
                  required
                  className="bg-[#12171e] border border-[#2c3340] px-4 py-3 rounded-lg text-[#e4e6eb] text-base focus:border-[#3ECF8E] focus:shadow-[0_0_10px_rgba(62,207,142,0.2)] outline-none"
                >
                  <option value="">-- Choose an option --</option>
                  <option value="tech">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnerships</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex flex-col mb-6">
                <label htmlFor="message" className="font-['Orbitron'] text-base text-[#c8ccd4] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="What's on your mind?"
                  required
                  className="bg-[#12171e] border border-[#2c3340] px-4 py-3 rounded-lg text-[#e4e6eb] text-base focus:border-[#3ECF8E] focus:shadow-[0_0_10px_rgba(62,207,142,0.2)] outline-none"
                ></textarea>
              </div>

              <label className="flex items-center gap-3 mb-6 custom-checkbox relative cursor-pointer text-[#c8ccd4] text-sm">
                <input type="checkbox" id="terms" required />
                <span className="checkmark"></span>
                <span className="text-[#c8ccd4] [text-shadow:_0_0_4px_rgba(62,207,142,0.2)]">
                  I agree to the terms and conditions
                </span>
              </label>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0066FF] rounded-tl-[15px] rounded-br-[15px] rounded-tr-[8px] rounded-bl-[8px] text-white font-['Orbitron'] font-semibold hover:bg-[#0052cc] hover:shadow-[0_0_10px_rgba(0,102,255,0.6),0_0_18px_rgba(0,102,255,0.3)] hover:text-[#3ECF8E] hover:-translate-y-0.5 hover:[text-shadow:_0_0_6px_rgba(62,207,142,0.6)] transition"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-[#78818e]">
        © 2025 RepMate. All rights reserved.
      </footer>
    </div>
  );
};

export default Contact;
