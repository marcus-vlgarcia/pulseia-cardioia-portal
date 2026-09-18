import { useEffect, useMemo, useState } from 'react'
import { Activity, ArrowLeft, CalendarDays, HeartPulse, Mail, MapPin, Phone, ShieldAlert, UserRound } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import StatusBadge from '../components/StatusBadge'
import { useAppointments } from '../contexts/AppointmentContext'
import { buildPatientProfile } from '../services/patientProfileService'
import { getPatientById } from '../services/patientService'
import styles from './PatientProfile.module.css'

const riskTone = { baixo: 'low', moderado: 'moderate', alto: 'high' }

function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(`${date}T12:00:00`))
}

export default function PatientProfile() {
  const { patientId } = useParams()
  const [patient, setPatient] = useState(null)
  const [error, setError] = useState('')
  const { appointments } = useAppointments()

  useEffect(() => {
    const controller = new AbortController()
    getPatientById(patientId, controller.signal)
      .then((patientData) => {
        if (!patientData) setError('Paciente não encontrado na base simulada.')
        setPatient(patientData)
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
    return () => controller.abort()
  }, [patientId])

  const patientAppointments = useMemo(() => {
    if (!patient) return []
    return appointments.filter((appointment) => appointment.patient === patient.name)
      .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
  }, [appointments, patient])

  if (error) {
    return <div className="page-container"><div className="error-banner" role="alert">{error}</div><Link className={styles.backLink} to="/pacientes"><ArrowLeft size={17} /> Voltar para pacientes</Link></div>
  }

  if (!patient) {
    return <div className="page-container"><div className={styles.loading}>Carregando ficha de paciente simulada…</div></div>
  }

  const profile = buildPatientProfile(patient)
  const nextAppointment = patientAppointments.find((appointment) => appointment.date >= '2026-09-18') ?? patientAppointments[0]

  return (
    <div className="page-container">
      <Link className={styles.backLink} to="/pacientes"><ArrowLeft size={17} /> Voltar para pacientes</Link>
      <PageHeader eyebrow="Base assistencial · ficha simulada" title={patient.name} description={`Registro ${profile.record} · informações demonstrativas`} />

      <section className={styles.hero}>
        <span className={styles.avatar}>{patient.name.charAt(0)}</span>
        <div className={styles.heroContent}>
          <div className={styles.badges}>
            <StatusBadge tone={riskTone[patient.risk]}>Risco {patient.risk}</StatusBadge>
            <span className={styles.status}>{patient.status}</span>
          </div>
          <h2>{patient.condition}</h2>
          <p>{profile.priority}</p>
        </div>
        <div className={styles.heroFacts}><span>{patient.age} anos</span><span>{patient.sex}</span><span>Tipo {profile.bloodType}</span></div>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}>
          <div className={styles.cardTitle}><UserRound size={19} /><h2>Dados cadastrais</h2></div>
          <div className={styles.infoList}>
            <div><Phone size={17} /><span><strong>Telefone</strong>{patient.phone}</span></div>
            <div><Mail size={17} /><span><strong>E-mail demonstrativo</strong>{profile.email}</span></div>
            <div><MapPin size={17} /><span><strong>Endereço</strong>{profile.address}</span></div>
            <div><ShieldAlert size={17} /><span><strong>Contato de apoio</strong>{profile.emergencyContact}</span></div>
          </div>
        </article>

        <article className={styles.card}>
          <div className={styles.cardTitle}><HeartPulse size={19} /><h2>Contexto de acompanhamento</h2></div>
          <p className={styles.plan}>{profile.carePlan}</p>
          <div className={styles.factors}>{profile.factors.map((factor) => <span key={factor}>{factor}</span>)}</div>
          <p className={styles.observation}>{profile.observations}</p>
        </article>
      </section>

      <section className={styles.timelineCard}>
        <div className={styles.cardTitle}><CalendarDays size={19} /><h2>Consultas e histórico</h2></div>
        <div className={styles.timeline}>
          <div><span className={styles.timelineIcon}><Activity size={17} /></span><p><strong>Última consulta registrada</strong>{formatDate(patient.lastVisit)} · {patient.condition}</p></div>
          {nextAppointment ? (
            <div><span className={styles.timelineIcon}><CalendarDays size={17} /></span><p><strong>Próximo agendamento no portal</strong>{formatDate(nextAppointment.date)} às {nextAppointment.time} · {nextAppointment.doctor}</p></div>
          ) : (
            <div><span className={styles.timelineIcon}><CalendarDays size={17} /></span><p><strong>Próximo agendamento</strong>Nenhuma consulta simulada cadastrada para este perfil.</p></div>
          )}
        </div>
        <Link className={styles.agendaLink} to="/agendamentos">Ver agenda completa</Link>
      </section>
    </div>
  )
}
