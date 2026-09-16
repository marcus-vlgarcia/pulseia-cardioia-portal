import { useReducer, useState } from 'react'
import { CalendarPlus, CheckCircle2 } from 'lucide-react'
import { useAppointments } from '../contexts/AppointmentContext'
import styles from './AppointmentForm.module.css'

const initialForm = {
  patient: '',
  doctor: 'Dra. Marina Alves',
  date: '',
  time: '',
  type: 'Avaliação cardiológica',
  notes: '',
}

function formReducer(state, action) {
  switch (action.type) {
    case 'CHANGE':
      return { ...state, [action.field]: action.value }
    case 'RESET':
      return initialForm
    default:
      return state
  }
}

export default function AppointmentForm({ patients }) {
  const [form, dispatch] = useReducer(formReducer, initialForm)
  const [message, setMessage] = useState('')
  const { addAppointment } = useAppointments()

  function updateField(event) {
    dispatch({ type: 'CHANGE', field: event.target.name, value: event.target.value })
    setMessage('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    addAppointment({ ...form, status: 'Pendente' })
    dispatch({ type: 'RESET' })
    setMessage('Consulta adicionada à agenda simulada.')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formHeading}>
        <span><CalendarPlus size={21} /></span>
        <div>
          <h2>Nova consulta</h2>
          <p>Preencha os dados do agendamento.</p>
        </div>
      </div>

      <label className={styles.full}>
        <span>Paciente</span>
        <select name="patient" value={form.patient} onChange={updateField} required>
          <option value="">Selecione um paciente</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.name}>{patient.name}</option>
          ))}
        </select>
      </label>

      <label className={styles.full}>
        <span>Profissional</span>
        <select name="doctor" value={form.doctor} onChange={updateField} required>
          <option>Dra. Marina Alves</option>
          <option>Dr. Ricardo Melo</option>
          <option>Dra. Camila Torres</option>
        </select>
      </label>

      <label>
        <span>Data</span>
        <input name="date" type="date" value={form.date} onChange={updateField} required />
      </label>

      <label>
        <span>Horário</span>
        <input name="time" type="time" value={form.time} onChange={updateField} required />
      </label>

      <label className={styles.full}>
        <span>Tipo de consulta</span>
        <select name="type" value={form.type} onChange={updateField} required>
          <option>Avaliação cardiológica</option>
          <option>Primeira consulta</option>
          <option>Retorno</option>
          <option>Avaliação preventiva</option>
        </select>
      </label>

      <label className={styles.full}>
        <span>Observações</span>
        <textarea
          name="notes"
          rows="3"
          value={form.notes}
          onChange={updateField}
          placeholder="Informações importantes para a consulta"
        />
      </label>

      {message && (
        <p className={styles.success} role="status">
          <CheckCircle2 size={18} />
          {message}
        </p>
      )}

      <button className={styles.submit} type="submit">Agendar consulta</button>
    </form>
  )
}
