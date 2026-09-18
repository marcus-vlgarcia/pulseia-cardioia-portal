import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Appointments from './pages/Appointments'
import Dashboard from './pages/Dashboard'
import DoctorProfile from './pages/DoctorProfile'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Patients from './pages/Patients'
import PatientProfile from './pages/PatientProfile'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pacientes" element={<Patients />} />
          <Route path="pacientes/:patientId" element={<PatientProfile />} />
          <Route path="medicos" element={<Doctors />} />
          <Route path="medicos/:doctorId" element={<DoctorProfile />} />
          <Route path="agendamentos" element={<Appointments />} />
        </Route>
      </Route>
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}
