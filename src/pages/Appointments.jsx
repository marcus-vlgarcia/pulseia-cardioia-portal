import { useEffect, useMemo, useState } from 'react'
import { CalendarClock, CheckCircle2, Clock3, Stethoscope } from 'lucide-react'
import AppointmentForm from '../components/AppointmentForm'
import PageHeader from '../components/PageHeader'
import StatusBadge from '../components/StatusBadge'
import { useAppointments } from '../contexts/AppointmentContext'
import { getPatients } from '../services/patientService'
import styles from './Appointments.module.css'

function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`)).replace('.', '')
}

export default function Appointments() {
  const [patients, setPatients] = useState([])
  const [filter, setFilter] = useState('todas')
  const { appointments, toggleStatus } = useAppointments()

  useEffect(() => {
    const controller = new AbortController()
    getPatients(controller.signal).then(setPatients).catch(() => {})
    return () => controller.abort()
  }, [])

  const visibleAppointments = useMemo(() => {
    return [...appointments]
      .filter((appointment) => filter === 'todas' || appointment.status === filter)
      .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
  }, [appointments, filter])

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="Organização clínica"
        title="Agendamentos"
        description="Cadastre novas consultas e acompanhe a agenda persistida neste navegador."
      />

      <section className={styles.grid}>
        <AppointmentForm patients={patients} />

        <article className={styles.agenda}>
          <div className={styles.agendaHeader}>
            <div>
              <span>Agenda simulada</span>
              <h2>{appointments.length} consultas</h2>
            </div>
            <label>
              <span className="sr-only">Filtrar por status</span>
              <select value={filter} onChange={(event) => setFilter(event.target.value)}>
                <option value="todas">Todas</option>
                <option value="Confirmada">Confirmadas</option>
                <option value="Pendente">Pendentes</option>
              </select>
            </label>
          </div>

          <div className={styles.list}>
            {visibleAppointments.length === 0 ? (
              <div className={styles.empty}>
                <CalendarClock size={30} />
                <strong>Nenhum agendamento neste filtro</strong>
              </div>
            ) : visibleAppointments.map((appointment) => (
              <article className={styles.appointment} key={appointment.id}>
                <div className={styles.when}>
                  <strong>{formatDate(appointment.date)}</strong>
                  <span><Clock3 size={14} /> {appointment.time}</span>
                </div>
                <div className={styles.details}>
                  <div className={styles.titleLine}>
                    <h3>{appointment.patient}</h3>
                    <StatusBadge tone={appointment.status === 'Confirmada' ? 'confirmed' : 'pending'}>
                      {appointment.status}
                    </StatusBadge>
                  </div>
                  <p><Stethoscope size={15} /> {appointment.doctor} · {appointment.type}</p>
                  {appointment.notes && <small>{appointment.notes}</small>}
                </div>
                <button type="button" onClick={() => toggleStatus(appointment.id)}>
                  <CheckCircle2 size={17} />
                  {appointment.status === 'Confirmada' ? 'Marcar pendente' : 'Confirmar'}
                </button>
              </article>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}
