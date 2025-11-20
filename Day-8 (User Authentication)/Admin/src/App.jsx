import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cookies from "js-cookie"
import Login from './Components/Login'
import Signup from './Components/Signup'
import UserDash from './Components/UserDash'
import ProtectedRoute from './ProtectedRoute'
import ForgetPass from './Components/ForgetPass'
import OtpVerify from './Components/OtpVerify'
import ResetPass from './Components/ResetPass'
import SAdmin from './Components/SAdmin'
import AdminPanel from './Components/AdminPanel'


const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* Login */}
          <Route path='/' element={<Login />} />

          {/* Signup */}
          <Route path='/signup' element={<Signup />} />

          {/* Forget Password */}
          <Route path='/forget' element={<ForgetPass />} />

          <Route path='/otpverify' element={<OtpVerify />} />

          <Route path='/resetpass' element={<ResetPass />} />

          {/* Super Admin Dashbord */}
          <Route path='/superadmin' element={
            <ProtectedRoute role="superadmin">
              <SAdmin />
            </ProtectedRoute>
          }
          />

          {/* Admin Dashbord */}
          <Route path='/admin' element={
            <ProtectedRoute role="admin">
              <AdminPanel />
            </ProtectedRoute>
          }
          />

          {/* User Dashbord */}
          <Route path='/user' element={
            <ProtectedRoute role="user">
              <UserDash />
            </ProtectedRoute>
          }
          />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
