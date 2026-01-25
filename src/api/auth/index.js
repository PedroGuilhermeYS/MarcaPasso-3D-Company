const useMock = import.meta.env.VITE_API_MOCK === 'true'

const authApi = useMock
  ? await import('./authMock.js')
  : await import('./authApi.js')

export const {
  doLoginNaApi,
  verificaLoginNaApi,
  doLogoutNaApi,
  doCadastroNaApi,
} = authApi
