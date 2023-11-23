import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from '../../../screens/pages/dashboards/AdminDashboard'

function DashboardRoute() {
  return (
    <Routes>
      <Route path='/dashboards'>
        <Route path='admin' element={<AdminDashboard /> } />
      </Route>
    </Routes>
  )
}
export default DashboardRoute