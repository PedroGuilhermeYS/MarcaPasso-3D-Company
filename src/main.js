import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { getAuth, onAuthStateChanged } from "firebase/auth"

let app

onAuthStateChanged(getAuth(), () => {
  if (!app) {
    app = createApp(App)

    app.use(createPinia())
    app.use(router)

    app.mount('#app')
  }
})