import { useState } from 'react'
import {
  CalendarDays,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  Stethoscope,
  UsersRound,
  X,
} from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Brand from './Brand'
import styles from './AppLayout.module.css'

const navigation = [
  { to: '/', label: 'Visão geral', icon: LayoutDashboard, end: true },
  { to: '/pacientes', label: 'Pacientes', icon: UsersRound },
  { to: '/medicos', label: 'Médicos', icon: Stethoscope },
  { to: '/agendamentos', label: 'Agendamentos', icon: CalendarDays },
]

export default function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <div className={styles.shell}>
      <aside className={`${styles.sidebar} ${menuOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <Brand />
          <button
            className={styles.closeButton}
            type="button"
            aria-label="Fechar menu"
            onClick={() => setMenuOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <nav className={styles.navigation} aria-label="Navegação principal">
          <span className={styles.navLabel}>Portal clínico</span>
          {navigation.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.disclaimer}>
          <ShieldCheck size={20} aria-hidden="true" />
          <p>Ambiente acadêmico com dados totalmente simulados.</p>
        </div>

        <div className={styles.userCard}>
          <span className={styles.avatar}>{user.name.charAt(0).toUpperCase()}</span>
          <span className={styles.userText}>
            <strong>{user.name}</strong>
            <small>{user.role}</small>
          </span>
          <button type="button" onClick={logout} aria-label="Sair do portal">
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {menuOpen && (
        <button
          className={styles.backdrop}
          type="button"
          aria-label="Fechar menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <main className={styles.content}>
        <header className={styles.mobileHeader}>
          <button type="button" onClick={() => setMenuOpen(true)} aria-label="Abrir menu">
            <Menu size={23} />
          </button>
          <Brand compact />
          <HeartPulse size={22} aria-hidden="true" />
        </header>
        <Outlet />
      </main>
    </div>
  )
}
