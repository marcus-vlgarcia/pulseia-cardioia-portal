import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import styles from './MetricCard.module.css'

export default function MetricCard({ icon: Icon, label, value, detail, tone = 'mint', to }) {
  const content = (
    <>
      <div className={styles.topline}>
        <span className={styles.icon}>
          <Icon size={21} strokeWidth={2.2} />
        </span>
        <ArrowUpRight className={styles.arrow} size={18} aria-hidden="true" />
      </div>
      <strong>{value}</strong>
      <span className={styles.label}>{label}</span>
      <small>{detail}</small>
    </>
  )

  if (to) {
    return <Link className={`${styles.card} ${styles[tone]} ${styles.interactive}`} to={to} aria-label={`Ver ${label.toLowerCase()}`}>{content}</Link>
  }

  return <article className={`${styles.card} ${styles[tone]}`}>{content}</article>
}
