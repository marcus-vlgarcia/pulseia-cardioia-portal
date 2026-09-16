import { ArrowUpRight } from 'lucide-react'
import styles from './MetricCard.module.css'

export default function MetricCard({ icon: Icon, label, value, detail, tone = 'mint' }) {
  return (
    <article className={`${styles.card} ${styles[tone]}`}>
      <div className={styles.topline}>
        <span className={styles.icon}>
          <Icon size={21} strokeWidth={2.2} />
        </span>
        <ArrowUpRight className={styles.arrow} size={18} aria-hidden="true" />
      </div>
      <strong>{value}</strong>
      <span className={styles.label}>{label}</span>
      <small>{detail}</small>
    </article>
  )
}
