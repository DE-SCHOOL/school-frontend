import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from '../../../screens/pages/dashboards/AdminDashboard'
import TeacherDashboard from '../../../screens/pages/dashboards/TeacherDashboard'
import StudentDashboard from '../../../screens/pages/dashboards/StudentDashboard'

function DashboardRoute() {
  return (
    <Routes>
      <Route path='/dashboards'>
        <Route path='admin' element={<AdminDashboard /> } />
        <Route path='teacher' element={<TeacherDashboard />} />
        <Route path='student' element={<StudentDashboard />} />
      </Route>
    </Routes>
  )
}
export default DashboardRoute