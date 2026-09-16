import styles from './PageHeader.module.css'

export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <header className={styles.header}>
      <div>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </header>
  )
}
