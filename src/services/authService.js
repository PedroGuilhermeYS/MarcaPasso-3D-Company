// src/services/authService.js
import {
  doLoginNaApi,
  verificaLoginNaApi,
  doLogoutNaApi,
  doCadastroNaApi,
} from '@/api/auth'

const TOKEN_KEY = 'token'

export function useAuthService() {
  function setToken(token) {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  }

  function getToken() {
    return localStorage.getItem(TOKEN_KEY)
  }

  function parseJwt(token) {
    try {
      const parts = token.split('.')
      if (parts.length < 2) return null
      return JSON.parse(atob(parts[1]))
    } catch {
      return null
    }
  }

  function isTokenValid(token) {
    const payload = parseJwt(token)
    return !!payload && payload.exp && payload.exp > Math.floor(Date.now() / 1000)
  }

  async function login(email, password) {
    const res = await doLoginNaApi(email, password)
    if (res?.ok && res.token) {
      setToken(res.token)
    }
    return res
  }

  async function register(email, password) {
    const res = await doCadastroNaApi(email, password)
    if (res?.ok && res.token) {
      setToken(res.token)
    }
    return res
  }

  async function logout() {
    // remove local token primeiro (cliente) e então notifica API se necessário
    setToken(null)
    return await doLogoutNaApi()
  }

  function getCurrentUser() {
    const token = getToken()
    if (!token || !isTokenValid(token)) return null
    const payload = parseJwt(token)
    return { id: payload.sub, email: payload.email, role: payload.role }
  }

  function isAuthenticated() {
    const token = getToken()
    return !!token && isTokenValid(token)
  }

  // opcional: delega verificação ao "endpoint" (útil se o backend tiver lógica adicional)
  async function verificaLogin() {
    const token = getToken()
    // many mocks accept token argument; real API may read header server-side
    try {
      const res = await verificaLoginNaApi(token)
      // se a API retornar ok e token válido, sincroniza storage (caso retorne novo token)
      if (res?.ok && res.token) setToken(res.token)
      return res
    } catch (err) {
      return { ok: false, error: err }
    }
  }

  function getAuthHeader() {
    const t = getToken()
    return t ? { Authorization: `Bearer ${t}` } : {}
  }

  return {
    login,
    register,
    logout,
    getCurrentUser,
    isAuthenticated,
    verificaLogin,
    getAuthHeader,
  }
}
