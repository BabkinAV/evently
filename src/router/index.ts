import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventView from '../views/EventView.vue'
import SelectedView from '@/views/SelectedView.vue'
import LoginView from '@/views/LoginView.vue'
import AddEventView from '@/views/AddEventView.vue'


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
    },
		{
      path: '/login',
      name: 'login',
			component: LoginView
    },
		{
      path: '/add',
      name: 'add',
			component: AddEventView
    },
  ]
})

export default router
