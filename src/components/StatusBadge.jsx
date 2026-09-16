import styles from './StatusBadge.module.css'

export default function StatusBadge({ children, tone = 'neutral' }) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>
}
