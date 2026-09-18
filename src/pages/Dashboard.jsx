import { useEffect, useMemo, useState } from 'react'
import { Activity, CalendarDays, Clock3, HeartPulse, Plus, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import MetricCard from '../components/MetricCard'
import PageHeader from '../components/PageHeader'
import StatusBadge from '../components/StatusBadge'
import { useAppointments } from '../contexts/AppointmentContext'
import { useAuth } from '../contexts/AuthContext'
import { getPatients } from '../services/patientService'
import styles from './Dashboard.module.css'

function firstName(name) {
  return name.replace(/^Dr(a)?\.\s*/i, '').split(' ')[0]
}

export default function Dashboard() {
  const [patients, setPatients] = useState([])
  const [error, setError] = useState('')
  const { appointments } = useAppointments()
  const { user } = useAuth()

  useEffect(() => {
    const controller = new AbortController()
    getPatients(controller.signal).then(setPatients).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [])

  const riskSummary = useMemo(() => ({
    baixo: patients.filter((patient) => patient.risk === 'baixo').length,
    moderado: patients.filter((patient) => patient.risk === 'moderado').length,
    alto: patients.filter((patient) => patient.risk === 'alto').length,
  }), [patients])

  const sortedAppointments = [...appointments].sort((a, b) =>
    `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`),
  )
  const patientIdsByName = new Map(patients.map((patient) => [patient.name, patient.id]))

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="Visão geral"
        title={`Olá, ${firstName(user.name)}.`}
        description="Acompanhe os principais dados da operação simulada do CardioIA."
        action={(
          <Link className="primary-button" to="/agendamentos">
            <Plus size={18} /> Nova consulta
          </Link>
        )}
      />

      {error && <div className="error-banner" role="alert">{error}</div>}

      <section className={styles.metrics} aria-label="Indicadores principais">
        <MetricCard
          icon={UsersRound}
          label="Pacientes"
          value={patients.length || '—'}
          detail="Registros demonstrativos"
          tone="mint"
        />
        <MetricCard
          icon={CalendarDays}
          label="Consultas"
          value={appointments.length}
          detail="Na agenda simulada"
          tone="blue"
        />
        <MetricCard
          icon={HeartPulse}
          label="Atenção prioritária"
          value={riskSummary.alto || '—'}
          detail="Perfis de risco alto"
          tone="coral"
        />
      </section>

      <section className={styles.dashboardGrid}>
        <article className={`${styles.panel} ${styles.appointmentsPanel}`}>
          <div className={styles.panelHeader}>
            <div>
              <span>Agenda clínica</span>
              <h2>Próximas consultas</h2>
            </div>
            <Link to="/agendamentos">Ver agenda</Link>
          </div>

          <div className={styles.appointmentList}>
            {sortedAppointments.slice(0, 4).map((appointment) => (
              <div className={styles.appointment} key={appointment.id}>
                <div className={styles.dateTile}>
                  <strong>{appointment.date.slice(-2)}</strong>
                  <span>SET</span>
                </div>
                <div className={styles.appointmentInfo}>
                  {patientIdsByName.has(appointment.patient) ? (
                    <Link to={`/pacientes/${patientIdsByName.get(appointment.patient)}`}>{appointment.patient}</Link>
                  ) : <strong>{appointment.patient}</strong>}
                  <span>{appointment.type}</span>
                </div>
                <span className={styles.time}><Clock3 size={15} /> {appointment.time}</span>
                <StatusBadge tone={appointment.status === 'Confirmada' ? 'confirmed' : 'pending'}>
                  {appointment.status}
                </StatusBadge>
              </div>
            ))}
          </div>
        </article>

        <article className={`${styles.panel} ${styles.riskPanel}`}>
          <div className={styles.panelHeader}>
            <div>
              <span>Base simulada</span>
              <h2>Perfis por risco</h2>
            </div>
            <Activity size={21} aria-hidden="true" />
          </div>

          <div className={styles.riskBars}>
            {[
              ['Baixo', riskSummary.baixo, 'low'],
              ['Moderado', riskSummary.moderado, 'moderate'],
              ['Alto', riskSummary.alto, 'high'],
            ].map(([label, value, tone]) => (
              <div className={styles.riskRow} key={label}>
                <div>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
                <div className={styles.track}>
                  <span
                    className={styles[tone]}
                    style={{ width: patients.length ? `${(value / patients.length) * 100}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.modelNote}>
            <HeartPulse size={22} />
            <p>
              <strong>Uso acadêmico</strong>
              Os níveis apresentados são fictícios e não representam avaliação clínica.
            </p>
          </div>
        </article>
      </section>
    </div>
  )
}
