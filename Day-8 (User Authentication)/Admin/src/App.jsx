import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cookies from "js-cookie"
import Login from './Components/Login'
import Signup from './Components/Signup'
import UserDash from './Components/UserDash'
import ProtectedRoute from './ProtectedRoute'


const App = () => {

  const token = Cookies.get("token")
  console.log(token)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            token ?
              <UserDash />
              :
              <Login />
          } />
          <Route path='/signup' element={<Signup />} />
          <Route path='/user' element={
            <ProtectedRoute>
              <UserDash />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
