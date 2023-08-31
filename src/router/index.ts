import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventView from '../views/EventView.vue'
import SelectedView from '@/views/SelectedView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/event/:eventId',
      name: 'event',
			component: EventView
    },
    {
      path: '/selected',
      name: 'selected',
			component: SelectedView
    }
  ]
})

export default router
