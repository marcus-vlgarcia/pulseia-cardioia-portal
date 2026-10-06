const TOKEN_KEY = 'cardioia.fakeToken'
const USER_KEY = 'cardioia.user'

function encodeSegment(value) {
  const bytes = new TextEncoder().encode(JSON.stringify(value))
  return btoa(String.fromCharCode(...bytes)).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '')
}

export function tokenExpiration(token) {
  try {
    const segment = token.split('.')[1].replaceAll('-', '+').replaceAll('_', '/')
    const bytes = Uint8Array.from(atob(segment), (character) => character.charCodeAt(0))
    return JSON.parse(new TextDecoder().decode(bytes)).exp * 1000
  } catch {
    return 0
  }
}

function createFakeToken(email) {
  const payload = {
    sub: email,
    role: 'cardiologia',
    exp: Math.floor(Date.now() / 1000) + 8 * 60 * 60,
  }

  return `${encodeSegment({ alg: 'none', typ: 'JWT' })}.${encodeSegment(payload)}.assinatura-simulada`
}

function tokenIsValid(token) {
  if (!token) return false

  try {
    return tokenExpiration(token) > Date.now()
  } catch {
    return false
  }
}

export function restoreSession() {
  try {
    const token = localStorage.getItem(TOKEN_KEY)
    const rawUser = localStorage.getItem(USER_KEY)
    const user = rawUser ? JSON.parse(rawUser) : null
    if (!tokenIsValid(token) || !user || typeof user.name !== 'string' ||
        typeof user.email !== 'string' || typeof user.role !== 'string') {
      clearSession()
      return null
    }
    return { token, user }
  } catch {
    clearSession()
    return null
  }
}

export async function authenticate(email, password) {
  await new Promise((resolve) => setTimeout(resolve, 650))

  email = email.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 4) {
    throw new Error('Informe um e-mail válido e uma senha com pelo menos 4 caracteres.')
  }

  const token = createFakeToken(email)
  const user = {
    name: email === 'admin@cardioia.com' ? 'Dra. Marina Alves' : email.split('@')[0],
    email,
    role: 'Equipe de cardiologia',
  }

  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  return { token, user }
}

export function clearSession() {
  try {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  } catch {
    // Logout remains available even when the browser blocks storage.
  }
}
