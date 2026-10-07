import { useEffect, useMemo, useState } from 'react'
import { Search, SlidersHorizontal, UserRound } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import StatusBadge from '../components/StatusBadge'
import { getPatients } from '../services/patientService'
import styles from './Patients.module.css'

const riskTone = { baixo: 'low', moderado: 'moderate', alto: 'high' }

function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(`${date}T12:00:00`))
}

export default function Patients() {
  const [patients, setPatients] = useState([])
  const [search, setSearch] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const risk = searchParams.get('risco') === 'alto' ? 'alto' : 'todos'

  useEffect(() => {
    const controller = new AbortController()
    getPatients(controller.signal)
      .then(setPatients)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [])

  const filteredPatients = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('pt-BR')
    return patients.filter((patient) => {
      const matchesRisk = risk === 'todos' || patient.risk === risk
      const matchesSearch = !normalizedSearch ||
        patient.name.toLocaleLowerCase('pt-BR').includes(normalizedSearch) ||
        patient.condition.toLocaleLowerCase('pt-BR').includes(normalizedSearch)
      return matchesRisk && matchesSearch
    })
  }, [patients, risk, search])

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="Base assistencial"
        title="Pacientes"
        description="Consulte os registros demonstrativos e os perfis de acompanhamento cardiovascular."
      />

      <section className={styles.controls} aria-label="Filtros da lista">
        <label className={styles.search}>
          <span className="sr-only">Buscar pacientes por nome ou condição</span>
          <Search size={19} aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por nome ou condição"
          />
        </label>
        <label className={styles.filter}>
          <SlidersHorizontal size={18} aria-hidden="true" />
          <select value={risk} onChange={(event) => {
            const nextRisk = event.target.value
            setSearchParams(nextRisk === 'todos' ? {} : { risco: nextRisk })
          }}>
            <option value="todos">Todos os riscos</option>
            <option value="baixo">Risco baixo</option>
            <option value="moderado">Risco moderado</option>
            <option value="alto">Risco alto</option>
          </select>
        </label>
        <span className={styles.resultCount}>{filteredPatients.length} registros</span>
      </section>

      {error && <div className="error-banner" role="alert">{error}</div>}

      <section className={styles.tableCard} aria-live="polite">
        {loading ? (
          <div className={styles.loading}>Carregando pacientes simulados…</div>
        ) : filteredPatients.length === 0 ? (
          <div className={styles.empty}>
            <UserRound size={30} />
            <strong>Nenhum paciente encontrado</strong>
            <span>Tente alterar os filtros da busca.</span>
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Idade</th>
                  <th>Condição acompanhada</th>
                  <th>Risco simulado</th>
                  <th>Última consulta</th>
                  <th>Situação</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td>
                      <Link className={styles.patientName} to={`/pacientes/${patient.id}`} aria-label={`Ver ficha de ${patient.name}`}>
                        <span className={styles.patientAvatar}>{patient.name.charAt(0)}</span>
                        <span>
                          <strong>{patient.name}</strong>
                          <small>{patient.phone} · Ver ficha</small>
                        </span>
                      </Link>
                    </td>
                    <td>{patient.age} anos</td>
                    <td>{patient.condition}</td>
                    <td>
                      <StatusBadge tone={riskTone[patient.risk]}>
                        {patient.risk.charAt(0).toUpperCase() + patient.risk.slice(1)}
                      </StatusBadge>
                    </td>
                    <td>{formatDate(patient.lastVisit)}</td>
                    <td>{patient.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <p className={styles.footnote}>
        Todos os nomes, contatos, condições e classificações desta página são fictícios.
      </p>
    </div>
  )
}
