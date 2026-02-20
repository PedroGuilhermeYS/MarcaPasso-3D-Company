import { ApiError } from '@/errors/ApiError'

const adminEmail = 'pedro210905@gmail.com'
const USERS = [
  { id: 1, email: adminEmail, password: '123456', role: 'admin' },
]

function generateFakeJwt(payload = {}, expiresInSeconds = 60 * 60) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds
  const body = btoa(JSON.stringify({ ...payload, exp }))
  const signature = btoa('signature-mock')
  return `${header}.${body}.${signature}`
}

function parseFakeJwt(token) {
  try {
    const parts = token.split('.')
    if (parts.length < 2) return null
    return JSON.parse(atob(parts[1]))
  } catch {
    return null
  }
}

const wait = (ms = 200) => new Promise(r => setTimeout(r, ms))

export async function doLoginNaApi(email, password) {
  await wait(250)
  const user = USERS.find(u => u.email == email && u.password == password)
  if (!user) {
    // padronizado para lançar ApiError em vez de retornar { ok: false }
    return Promise.reject(new ApiError('Credenciais inválidas', 401, null))
  }
  const token = generateFakeJwt({ sub: user.id, email: user.email, role: user.role }, 60 * 60)
  return { ok: true, token, user: { id: user.id, email: user.email, role: user.role } }
}

export async function verificaLoginNaApi(token) {
  await wait(50)
  if (!token) {
    return Promise.reject(new ApiError('Token ausente', 401, null))
  }
  const payload = parseFakeJwt(token)
  const valid = !!payload && payload.exp && payload.exp > Math.floor(Date.now() / 1000)
  if (!valid) {
    return Promise.reject(new ApiError('Token inválido ou expirado', 401, null))
  }
  return { ok: true, token, user: { id: payload.sub, email: payload.email, role: payload.role } }
}

export async function doLogoutNaApi() {
  await wait(50)
  // logout no mock só confirma
  return { ok: true }
}

export async function doCadastroNaApi(email, password) {
  await wait(300)
  if (USERS.some(u => u.email == email)) {
    return Promise.reject(new ApiError('Usuário já existe', 409, null))
  }
  const id = USERS.length + 1
  const newUser = { id, email, password, role: 'user' }
  USERS.push(newUser)
  const token = generateFakeJwt({ sub: id, email, role: 'user' }, 60 * 60)
  return { ok: true, token, user: { id, email, role: 'user' } }
}
