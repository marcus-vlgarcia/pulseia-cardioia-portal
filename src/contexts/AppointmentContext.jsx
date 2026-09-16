import { createContext, useContext, useMemo, useReducer } from 'react'

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
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : initialAppointments
  } catch {
    return initialAppointments
  }
}

function appointmentReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const next = [{ ...action.payload, id: crypto.randomUUID() }, ...state]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    }
    default:
      return state
  }
}

const AppointmentContext = createContext(null)

export function AppointmentProvider({ children }) {
  const [appointments, dispatch] = useReducer(
    appointmentReducer,
    undefined,
    loadAppointments,
  )

  const value = useMemo(
    () => ({
      appointments,
      addAppointment: (appointment) => dispatch({ type: 'ADD', payload: appointment }),
      toggleStatus: (id) => dispatch({ type: 'TOGGLE_STATUS', payload: id }),
    }),
    [appointments],
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
