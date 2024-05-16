import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from './register.js'
import Login from './login.js'

import AdminDashboard from '../components/admin/adminDashboard.js'
import PatientDashboard from '../components/patient/patientDashboard.js'
import Index from '../components/patient/index.js'
import DoctorDashboard from '../components/doctor/doctorDashboard.js'
import DoctorIndex from '../components/doctor/doctorIndex.js'
import ResetPassword from './resetPassword.js'
const mainRouts = () => {
  // const admin = localStorage.getItem('userData')
  // console.log('admin', admin)
  // const admin = JSON.parse(localStorage.getItem('userData'))
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/doctorDashboard" element={<DoctorDashboard />} />
        <Route path="/doctorIndex" element={<DoctorIndex />} />
        <Route path="/index" element={<Index />} />
        <Route path="/patientDashboard" element={<PatientDashboard />} />
      </Routes>
    </Router>
  )
}

export default mainRouts
