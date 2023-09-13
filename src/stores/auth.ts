import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { type ErrorResponse, type LoginResponse, type User } from '../types'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticating = ref<Boolean>(false)

  const authenticateUser = (identifier: string, password: string) => {
    isAuthenticating.value = true
    axios
      .post<LoginResponse>('http://localhost:1337/api/auth/local', { identifier, password })
      .then((resp) => {
        const userName = resp.data.user.username
        const jwt = resp.data.jwt

        user.value = { userName, jwt }

        localStorage.setItem('user', JSON.stringify({ userName, jwt: resp.data.jwt }))

        router.push('/')
        console.log(resp.data)
      })
      .catch((errResp: ErrorResponse) => {
        console.log(errResp.error.message)
      })
      .finally(() => {
        isAuthenticating.value = false
      })
  }

  const logoutUser = () => {
    localStorage.removeItem('user')
    user.value = null
  }

  return { authenticateUser, user, logoutUser, isAuthenticating }
})
