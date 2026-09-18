import { useEffect, useState } from 'react'
import { ArrowUpRight, Clock3, Stethoscope, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { getDoctors } from '../services/doctorService'
import styles from './Doctors.module.css'

export default function Doctors() {
  const [doctors, setDoctors] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    getDoctors(controller.signal)
      .then(setDoctors)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
    return () => controller.abort()
  }, [])

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="Corpo clínico"
        title="Médicos"
        description="Conheça os perfis e a disponibilidade da equipe fictícia do CardioIA."
      />

      {error && <div className="error-banner" role="alert">{error}</div>}

      <section className={styles.grid} aria-label="Profissionais simulados">
        {doctors.length === 0 && !error ? (
          <div className={styles.loading}><UserRound size={30} /> Carregando profissionais simulados…</div>
        ) : doctors.map((doctor) => (
          <article className={styles.card} key={doctor.id}>
            <div className={styles.cardTop}>
              <span className={styles.avatar}>{doctor.initials}</span>
              <span className={styles.availability}>{doctor.availability}</span>
            </div>
            <h2>{doctor.name}</h2>
            <p className={styles.specialty}><Stethoscope size={16} /> {doctor.specialty}</p>
            <p className={styles.role}>{doctor.role}</p>
            <div className={styles.hours}>
              <Clock3 size={17} />
              <span><strong>Próximo período</strong>{doctor.schedule[0].day} · {doctor.schedule[0].hours}</span>
            </div>
            <Link className={styles.detailLink} to={`/medicos/${doctor.id}`}>
              Ver ficha profissional <ArrowUpRight size={17} />
            </Link>
          </article>
        ))}
      </section>

      <p className={styles.footnote}>Todos os perfis, credenciais, contatos e horários apresentados são fictícios.</p>
    </div>
  )
}
