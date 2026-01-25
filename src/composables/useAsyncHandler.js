import { ApiError } from '@/errors/ApiError'

export function useAsyncHandler({ carregando, erro }) {
  async function run(fn, mensagemPadrao = 'Erro inesperado') {
    carregando.value = true
    erro.value = null

    try {
      return await fn()
    } catch (err) {
      if (err instanceof ApiError) {
        erro.value = err.message
      } else {
        erro.value = mensagemPadrao
        console.error(err)
      }
      throw err
    } finally {
      carregando.value = false
    }
  }

  return { run }
}
