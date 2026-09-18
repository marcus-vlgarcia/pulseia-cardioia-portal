import { useEffect, useState } from 'react'
import { ArrowLeft, CalendarDays, Clock3, Mail, MapPin, Phone, Stethoscope } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { getDoctorById } from '../services/doctorService'
import styles from './DoctorProfile.module.css'

export default function DoctorProfile() {
  const { doctorId } = useParams()
  const [doctor, setDoctor] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    getDoctorById(doctorId, controller.signal)
      .then((doctorData) => {
        if (!doctorData) setError('Profissional não encontrado na base simulada.')
        setDoctor(doctorData)
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
    return () => controller.abort()
  }, [doctorId])

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
    </div>
  )
}
