import { createApp, watch } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/useAuthStore'

import './style/main.css'
import './style/ul.css'
import './style/market.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const authStore = useAuthStore()

watch(
  () => authStore.isAuthenticated,
  (isAuth) => {
    if (!isAuth) {
      router.push({ name: 'Login' })
    }
  }
)

app.mount('#app')
