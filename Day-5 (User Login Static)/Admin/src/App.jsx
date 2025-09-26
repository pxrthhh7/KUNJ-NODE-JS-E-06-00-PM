import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Dashbord from './Dashbord'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashbord' element={<Dashbord />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
