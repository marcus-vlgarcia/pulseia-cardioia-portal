import { Activity } from 'lucide-react'
import styles from './Brand.module.css'

export default function Brand({ compact = false }) {
  return (
    <div className={`${styles.brand} ${compact ? styles.compact : ''}`}>
      <span className={styles.mark} aria-hidden="true">
        <Activity size={24} strokeWidth={2.3} />
      </span>
      <span>
        <strong>CardioIA</strong>
        {!compact && <small>PulseIA</small>}
      </span>
    </div>
  )
}
