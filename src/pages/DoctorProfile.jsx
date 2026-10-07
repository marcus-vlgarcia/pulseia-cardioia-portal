import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, CalendarDays, Clock3, Mail, MapPin, Phone, Stethoscope, UsersRound } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import StatusBadge from '../components/StatusBadge'
import { useAppointments } from '../contexts/AppointmentContext'
import { isUpcoming } from '../services/appointmentService'
import { getDoctorById } from '../services/doctorService'
import { getPatients } from '../services/patientService'
import styles from './DoctorProfile.module.css'

function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' })
    .format(new Date(`${date}T12:00:00`)).replace('.', '')
}

export default function DoctorProfile() {
  const { doctorId } = useParams()
  const [doctor, setDoctor] = useState(null)
  const [patients, setPatients] = useState([])
  const [error, setError] = useState('')
  const { appointments } = useAppointments()

  useEffect(() => {
    const controller = new AbortController()
    setError('')
    setDoctor(null)
    Promise.all([getDoctorById(doctorId, controller.signal), getPatients(controller.signal)])
      .then(([doctorData, patientData]) => {
        if (!doctorData) setError('Profissional não encontrado na base simulada.')
        setDoctor(doctorData)
        setPatients(patientData)
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
    return () => controller.abort()
  }, [doctorId])

  const doctorAppointments = useMemo(() => {
    if (!doctor) return []
    return appointments
      .filter((appointment) => appointment.doctor === doctor.name && isUpcoming(appointment))
      .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
  }, [appointments, doctor])

  const patientIdsByName = useMemo(
    () => new Map(patients.map((patient) => [patient.name, patient.id])),
    [patients],
  )

  const doctorPatients = useMemo(
    () => [...new Set(doctorAppointments.map((appointment) => appointment.patient))],
    [doctorAppointments],
  )

  if (error) {
    return <div className="page-container"><div className="error-banner" role="alert">{error}</div><Link className={styles.backLink} to="/medicos"><ArrowLeft size={17} /> Voltar para médicos</Link></div>
  }

  if (!doctor) {
    return <div className="page-container"><div className={styles.loading}>Carregando ficha profissional simulada…</div></div>
  }

  return (
    <div className="page-container">
      <Link className={styles.backLink} to="/medicos"><ArrowLeft size={17} /> Voltar para médicos</Link>
      <PageHeader eyebrow="Corpo clínico · ficha simulada" title={doctor.name} description={doctor.specialty} />

      <section className={styles.hero}>
        <span className={styles.avatar}>{doctor.initials}</span>
        <div className={styles.heroContent}>
          <span className={styles.availability}>{doctor.availability}</span>
          <h2>{doctor.role}</h2>
          <p>{doctor.bio}</p>
        </div>
        <div className={styles.crm}>{doctor.crm}</div>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}>
          <div className={styles.cardTitle}><CalendarDays size={19} /><h2>Horários de atendimento</h2></div>
          <div className={styles.schedule}>
            {doctor.schedule.map((slot) => (
              <div key={slot.day}><strong>{slot.day}</strong><span>{slot.hours}</span></div>
            ))}
          </div>
        </article>

        <article className={styles.card}>
          <div className={styles.cardTitle}><Stethoscope size={19} /><h2>Atendimentos no portal</h2></div>
          <div className={styles.tags}>{doctor.consultations.map((item) => <span key={item}>{item}</span>)}</div>
          <p className={styles.note}>Tipos de consulta demonstrativos; não representam uma agenda ou serviço médico real.</p>
        </article>
      </section>

      <section className={styles.contactCard}>
        <div><MapPin size={18} /><span><strong>Local</strong>{doctor.room}</span></div>
        <div><Phone size={18} /><span><strong>Contato</strong>{doctor.phone}</span></div>
        <div><Mail size={18} /><span><strong>E-mail demonstrativo</strong>{doctor.email}</span></div>
        <div><Clock3 size={18} /><span><strong>Disponibilidade</strong>{doctor.availability}</span></div>
      </section>

      <section className={styles.agendaCard}>
        <div className={styles.agendaHeader}>
          <div className={styles.cardTitle}><CalendarDays size={19} /><h2>Próximas consultas</h2></div>
          <span>{doctorAppointments.length} na agenda simulada</span>
        </div>
        {doctorAppointments.length === 0 ? (
          <p className={styles.emptyAgenda}>Nenhuma consulta futura cadastrada para este profissional.</p>
        ) : (
          <div className={styles.appointmentList}>
            {doctorAppointments.map((appointment) => (
              <div className={styles.appointment} key={appointment.id}>
                <div className={styles.appointmentDate}><strong>{formatDate(appointment.date)}</strong><span>{appointment.time}</span></div>
                <div>
                  {patientIdsByName.has(appointment.patient) ? (
                    <Link className={styles.patientLink} to={`/pacientes/${patientIdsByName.get(appointment.patient)}`}>{appointment.patient}</Link>
                  ) : <strong>{appointment.patient}</strong>}
                  <span className={styles.appointmentType}>{appointment.type}</span>
                </div>
                <StatusBadge tone={appointment.status === 'Confirmada' ? 'confirmed' : 'pending'}>{appointment.status}</StatusBadge>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={styles.patientCard}>
        <div className={styles.agendaHeader}>
          <div className={styles.cardTitle}><UsersRound size={19} /><h2>Pacientes na lista</h2></div>
          <span>{doctorPatients.length} com consulta futura</span>
        </div>
        {doctorPatients.length === 0 ? (
          <p className={styles.emptyAgenda}>A lista será formada quando houver agendamentos futuros.</p>
        ) : (
          <div className={styles.patientList}>
            {doctorPatients.map((patientName) => patientIdsByName.has(patientName) ? (
              <Link key={patientName} to={`/pacientes/${patientIdsByName.get(patientName)}`}>{patientName}</Link>
            ) : <span key={patientName}>{patientName}</span>)}
          </div>
        )}
        <p className={styles.note}>Agenda e lista de pacientes são demonstrativas e usam somente os agendamentos salvos neste navegador.</p>
      </section>
    </div>
  )
}
