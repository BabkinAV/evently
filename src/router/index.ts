import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventView from '../views/EventView.vue'
import SelectedView from '@/views/SelectedView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AddEventView from '@/views/AddEventView.vue'
import { useAuthStore } from '@/stores/auth'



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
      component: LoginView,
			beforeEnter: () => {
				const authStore = useAuthStore()
        if (authStore.user) {
          return { name: 'home' }
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/add',
      name: 'add',
      component: AddEventView,
      beforeEnter: () => {
				const authStore = useAuthStore()
        if (!authStore.user) {
          return { name: 'login' }
        }
      }
    }
  ]
})

export default router
