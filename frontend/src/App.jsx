import React from 'react'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import { Routes, Route } from 'react-router-dom'
import ResetPassword from './pages/ResetPassword'
import Profile from './pages/Profile'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Error from './pages/Error'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import GoalSelection from './pages/GoalSelection'
import Plan from './pages/Plan'
import Questionnaire from './pages/Questionnaire'
import Workout from './pages/Workout'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/error" element={<Error />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/goal" element={<GoalSelection />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/workout" element={<Workout />} />
      </Routes>
    </>
  )
}

export default App
