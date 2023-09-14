import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import YmapPlugin from 'vue-yandex-maps'

const settings = {
  apiKey: import.meta.env.VITE_YANDEX_MAPS_KEY, // Индивидуальный ключ API
  lang: 'en_US', // Используемый язык
  coordorder: 'latlong', // Порядок задания географических координат
  debug: false, // Режим отладки
  version: '2.1' // Версия Я.Карт
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(YmapPlugin, settings)

app.mount('#app')
