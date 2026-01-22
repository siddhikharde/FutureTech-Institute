
import React from 'react'
import { Routes, BrowserRouter, Route } from 'react-router'
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
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/addStudents' element={<AddStudent />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='add-courses' element={<AddCourses/>}/>
          <Route path='/student-detail/:id' element={<StudentDetails/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
