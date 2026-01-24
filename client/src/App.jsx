
import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { isTokenExpired } from './Utils'
import toast from 'react-hot-toast'
import Login from './views/Login'
import Register from './views/Register'
import Contact from './views/Contact'
import About from './views/About'
import Courses from './views/Courses'
import Home from './views/Home'
import AddStudent from './views/admin/AddStudent'
import Dashboard from './views/admin/Dashboard'
import AddCourses from './views/admin/AddCourses'
import StudentDetails from './views/admin/StudentDetail'
import StudentDashboard from './views/StudentDashboard'
import AdminProtectedRoute from './routes/AdminProtectedRoute'

function App() {


  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/student-dashboard' element={<StudentDashboard />} />


        <Route element={<AdminProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addStudents" element={<AddStudent />} />
          <Route path="/add-courses" element={<AddCourses />} />
          <Route path="/student-detail/:id" element={<StudentDetails />} />
        </Route>

      </Routes>

    </div>
  )
}

export default App
