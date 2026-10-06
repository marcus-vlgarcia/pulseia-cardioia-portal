import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { authenticate, clearSession, restoreSession, tokenExpiration } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => restoreSession())

  useEffect(() => {
    function checkSession() {
      setSession(restoreSession())
    }
    window.addEventListener('storage', checkSession)
    window.addEventListener('focus', checkSession)
    const timeout = session ? window.setTimeout(() => {
      clearSession()
      setSession(null)
    }, Math.max(0, tokenExpiration(session.token) - Date.now())) : null
    return () => {
      window.removeEventListener('storage', checkSession)
      window.removeEventListener('focus', checkSession)
      if (timeout !== null) window.clearTimeout(timeout)
    }
  }, [session])

  async function login(email, password) {
    const nextSession = await authenticate(email, password)
    setSession(nextSession)
  }

  function logout() {
    clearSession()
    setSession(null)
  }

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      isAuthenticated: Boolean(session?.token),
      login,
      logout,
    }),
    [session],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider.')
  return context
}
