import Antd from 'ant-design-vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'

import 'ant-design-vue/dist/reset.css'
import App from './App.vue'
import '@/styles/main.sass'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(Antd)
app.mount('#app')