import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import { appointmentError, localDate, validStoredAppointment } from '../services/appointmentService'
import { useAuth } from './AuthContext'

const STORAGE_KEY = 'cardioia.appointments'
const initialAppointments = [
  {
    id: 'consulta-1',
    patient: 'Ana Martins',
    doctor: 'Dra. Marina Alves',
    date: '2026-09-17',
    time: '09:30',
    type: 'Retorno',
    notes: 'Revisão do controle pressórico.',
    status: 'Confirmada',
  },
  {
    id: 'consulta-2',
    patient: 'Carlos Henrique',
    doctor: 'Dr. Ricardo Melo',
    date: '2026-09-17',
    time: '11:00',
    type: 'Avaliação cardiológica',
    notes: 'Avaliar episódios recentes de palpitação.',
    status: 'Confirmada',
  },
  {
    id: 'consulta-3',
    patient: 'Lúcia Ferreira',
    doctor: 'Dra. Marina Alves',
    date: '2026-09-18',
    time: '14:15',
    type: 'Retorno',
    notes: 'Acompanhamento acadêmico simulado.',
    status: 'Pendente',
  },
]

function loadAppointments() {
  const defaults = initialAppointments.map((appointment, index) => {
    const date = new Date()
    date.setDate(date.getDate() + index + 1)
    return { ...appointment, date: localDate(date) }
  })
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return defaults
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) && parsed.every(validStoredAppointment) ? parsed : defaults
  } catch {
    return defaults
  }
}

function appointmentReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const next = [{ ...action.payload, id: action.payload.id ?? crypto.randomUUID() }, ...state]
      return next
    }
    case 'TOGGLE_STATUS': {
      const next = state.map((appointment) =>
        appointment.id === action.payload
          ? {
              ...appointment,
              status: appointment.status === 'Confirmada' ? 'Pendente' : 'Confirmada',
            }
          : appointment,
      )
      return next
    }
    default:
      return state
  }
}

const AppointmentContext = createContext(null)

export function AppointmentProvider({ children }) {
  const { isAuthenticated } = useAuth()
  const [appointments, dispatch] = useReducer(
    appointmentReducer,
    undefined,
    loadAppointments,
  )

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments))
    } catch {
      console.warn('Agenda disponível nesta sessão; armazenamento local indisponível.')
    }
  }, [appointments])

  const addAppointment = useCallback((appointment) => {
    if (!isAuthenticated) throw new Error('Entre no portal para agendar uma consulta.')
    const error = appointmentError(appointment, appointments)
    if (error) throw new Error(error)
    const nextAppointment = { ...appointment, id: appointment.id ?? crypto.randomUUID() }
    dispatch({ type: 'ADD', payload: nextAppointment })
    return nextAppointment
  }, [appointments, isAuthenticated])

  const value = useMemo(
    () => ({
      appointments,
      addAppointment,
      toggleStatus: (id) => dispatch({ type: 'TOGGLE_STATUS', payload: id }),
    }),
    [addAppointment, appointments],
  )

  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>
}

export function useAppointments() {
  const context = useContext(AppointmentContext)
  if (!context) {
    throw new Error('useAppointments deve ser usado dentro de AppointmentProvider.')
  }
  return context
}
