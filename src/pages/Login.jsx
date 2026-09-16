import { useState } from 'react'
import { ArrowRight, CheckCircle2, HeartPulse, LockKeyhole } from 'lucide-react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import Brand from '../components/Brand'
import { useAuth } from '../contexts/AuthContext'
import styles from './Login.module.css'

export default function Login() {
  const [email, setEmail] = useState('admin@cardioia.com')
  const [password, setPassword] = useState('cardio123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  if (isAuthenticated) return <Navigate to="/" replace />

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate(location.state?.from?.pathname || '/', { replace: true })
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <div className={styles.brandWrap}><Brand /></div>
        <div className={styles.introContent}>
          <span className={styles.kicker}>Portal clínico acadêmico</span>
          <h1>Dados que ajudam a enxergar o cuidado por inteiro.</h1>
          <p>
            Um ambiente demonstrativo para acompanhar pacientes, organizar consultas e
            visualizar indicadores do projeto CardioIA.
          </p>
          <div className={styles.features}>
            <span><CheckCircle2 size={18} /> Pacientes simulados</span>
            <span><CheckCircle2 size={18} /> Agenda integrada</span>
            <span><CheckCircle2 size={18} /> Métricas em tempo real</span>
          </div>
        </div>
        <div className={styles.pulse} aria-hidden="true">
          <HeartPulse size={42} />
          <svg viewBox="0 0 520 90" role="presentation">
            <path d="M0 48h90l18-29 25 55 34-70 35 68 23-24h295" />
          </svg>
        </div>
      </section>

      <section className={styles.access}>
        <div className={styles.formCard}>
          <span className={styles.lock}><LockKeyhole size={22} /></span>
          <span className={styles.formKicker}>Acesso seguro</span>
          <h2>Entrar no CardioIA</h2>
          <p>Use as credenciais demonstrativas para acessar o portal.</p>

          <form onSubmit={handleSubmit}>
            <label>
              <span>E-mail</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </label>
            <label>
              <span>Senha</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </label>

            {error && <p className={styles.error} role="alert">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? 'Validando acesso…' : 'Entrar no portal'}
              {!loading && <ArrowRight size={19} />}
            </button>
          </form>

          <div className={styles.demoCredentials}>
            <strong>Acesso de demonstração</strong>
            <span>admin@cardioia.com</span>
            <span>Senha: cardio123</span>
          </div>
        </div>
        <p className={styles.notice}>
          Simulação acadêmica. Não utilizar para diagnóstico ou atendimento médico.
        </p>
      </section>
    </main>
  )
}
