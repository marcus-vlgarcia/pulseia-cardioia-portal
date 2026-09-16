import { ArrowLeft, HeartCrack } from 'lucide-react'
import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <main className={styles.page}>
      <HeartCrack size={42} />
      <span>Erro 404</span>
      <h1>Página não encontrada</h1>
      <p>O endereço informado não faz parte do portal CardioIA.</p>
      <Link to="/"><ArrowLeft size={18} /> Voltar ao início</Link>
    </main>
  )
}
