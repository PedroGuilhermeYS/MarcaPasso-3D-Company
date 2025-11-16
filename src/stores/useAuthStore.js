import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '@/firebase/firebase.js'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const usuario = ref(null)

  const cadastrar = async (email, senha) => {
    const cred = await createUserWithEmailAndPassword(auth, email, senha)
    usuario.value = cred.user
  }

  const login = async (email, senha) => {
    const cred = await signInWithEmailAndPassword(auth, email, senha)
    usuario.value = cred.user
  }

  const logout = async () => {
    await signOut(auth)
    usuario.value = null
  }

  onAuthStateChanged(auth, (user) => {
    usuario.value = user
  })

  return { usuario, cadastrar, login, logout }
})