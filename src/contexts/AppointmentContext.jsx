import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'

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
      const next = [{ ...action.payload, id: action.payload.id ?? crypto.randomUUID() }, ...state]
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

  const addAppointment = useCallback((appointment) => {
    const nextAppointment = { ...appointment, id: appointment.id ?? crypto.randomUUID() }
    dispatch({ type: 'ADD', payload: nextAppointment })
    return nextAppointment
  }, [])

  useEffect(() => {
    const context = document.modelContext
    if (!context?.registerTool) return undefined

    const lifecycle = new AbortController()
    const registration = context.registerTool(
      {
        name: 'create_appointment',
        title: 'Agendar consulta no CardioIA',
        description: 'Cria um agendamento simulado e o inclui na agenda visível do portal.',
        inputSchema: {
          type: 'object',
          properties: {
            patient: { type: 'string', minLength: 2 },
            date: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
            time: { type: 'string', pattern: '^\\d{2}:\\d{2}$' },
            doctor: { type: 'string' },
            type: { type: 'string' },
            notes: { type: 'string' },
          },
          required: ['patient', 'date', 'time'],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute(input) {
          if (
            !input ||
            typeof input.patient !== 'string' ||
            !/^\d{4}-\d{2}-\d{2}$/.test(input.date) ||
            !/^\d{2}:\d{2}$/.test(input.time)
          ) {
            throw new Error('Paciente, data e horário válidos são obrigatórios.')
          }

          const appointment = addAppointment({
            patient: input.patient.trim(),
            date: input.date,
            time: input.time,
            doctor: input.doctor?.trim() || 'Dra. Marina Alves',
            type: input.type?.trim() || 'Avaliação cardiológica',
            notes: input.notes?.trim() || '',
            status: 'Pendente',
          })

          return { id: appointment.id, status: appointment.status }
        },
      },
      { signal: lifecycle.signal },
    )

    void Promise.resolve(registration).catch((error) => {
      console.warn('Não foi possível registrar a ferramenta do portal.', error)
    })

    return () => lifecycle.abort()
  }, [addAppointment])

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
