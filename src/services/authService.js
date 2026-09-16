const TOKEN_KEY = 'cardioia.fakeToken'
const USER_KEY = 'cardioia.user'

function createFakeToken(email) {
  const payload = {
    sub: email,
    role: 'cardiologia',
    exp: Date.now() + 8 * 60 * 60 * 1000,
  }

  return `cardioia.${btoa(JSON.stringify(payload))}.assinatura-simulada`
}

function tokenIsValid(token) {
  if (!token) return false

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp > Date.now()
  } catch {
    return false
  }
}

export function restoreSession() {
  const token = localStorage.getItem(TOKEN_KEY)
  const rawUser = localStorage.getItem(USER_KEY)

  if (!tokenIsValid(token) || !rawUser) {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    return null
  }

  return { token, user: JSON.parse(rawUser) }
}

export async function authenticate(email, password) {
  await new Promise((resolve) => setTimeout(resolve, 650))

  if (!email.includes('@') || password.length < 4) {
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
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}
