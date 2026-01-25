import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthService } from '@/services/authService.js'
import { useAsyncHandler } from '@/composables/useAsyncHandler.js'

export const useAuthStore = defineStore('auth', () => {
  const authService = useAuthService()

  const usuario = ref(authService.getCurrentUser())
  const carregando = ref(false)
  const erro = ref(null)

  const { run: withHandling } = useAsyncHandler({ carregando, erro })

  const cadastrar = async (email, senha) => {
    try {
      const res = await withHandling(
        () => authService.register(email, senha),
        'Erro ao cadastrar'
      )
      usuario.value = authService.getCurrentUser()
      return true
    } catch {
      return false
    }
  }

  const login = async (email, senha) => {
    try {
      const res = await withHandling(
        () => authService.login(email, senha),
        'Erro ao realizar login'
      )
      usuario.value = authService.getCurrentUser()
      return true
    } catch {
      return false
    }
  }

  const logout = async () => {
    try {
      await withHandling(
        () => authService.logout(),
        'Erro ao sair'
      )
      usuario.value = null
      return true
    } catch {
      return false
    }
  }

  const sincronizarSessao = async () => {
    try {
      const res = await withHandling(
        () =>
          authService.verificaLogin
            ? authService.verificaLogin()
            : Promise.resolve({ ok: false }),
        'Erro ao sincronizar sessão'
      )
      usuario.value = res?.ok ? authService.getCurrentUser() : null
      return res?.ok === true
    } catch {
      usuario.value = null
      return false
    }
  }

  const isAdmin = () => usuario.value?.role === 'admin'
  const isAuthenticated = () => !!usuario.value

  return {
    usuario,
    carregando,
    erro,
    cadastrar,
    login,
    logout,
    sincronizarSessao,
    isAdmin,
    isAuthenticated,
  }
})
