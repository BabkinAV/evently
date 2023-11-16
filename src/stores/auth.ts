import axios, { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { type ErrorResponse, type LoginResponse, type User, type UserResponse } from '../types'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticating = ref<Boolean>(false)
  const authenticationError = ref<string>('')

  const authenticateUser = (email: string, password: string) => {
    isAuthenticating.value = true
    authenticationError.value = ''
    axios
      .get('http://localhost:8000/sanctum/csrf-cookie')
      .then(() =>
        axios
          .post<LoginResponse>('http://localhost:8000/api/login', { email, password })
          .then((resp) => {
            const userName = resp.data.user.name
            const jwt = resp.data.token
            user.value = { userName, jwt }

            localStorage.setItem('user', JSON.stringify({ userName, jwt: resp.data.token }))

            router.push('/')
            console.log(resp.data)
          })
      )
      .catch((errResp: AxiosError<ErrorResponse>) => {
        authenticationError.value = errResp.response?.data.message ?? errResp.message
        console.log(errResp)
      })
      .finally(() => {
        isAuthenticating.value = false
      })
  }
  const registerUser = (name: string, email: string, password: string) => {
    isAuthenticating.value = true
    authenticationError.value = ''
    axios
      .get('http://localhost:8000/sanctum/csrf-cookie')
      .then(() =>
        axios
          .post<LoginResponse>('http://localhost:8000/api/register', { name, email, password })
          .then((resp) => {
            const userName = resp.data.user.name
            const jwt = resp.data.token
            user.value = { userName, jwt }

            localStorage.setItem('user', JSON.stringify({ userName, jwt: resp.data.token }))

            router.push('/')
            console.log(resp.data)
          })
      )
      .catch((errResp: AxiosError<ErrorResponse>) => {
        authenticationError.value = errResp.response?.data.message ?? errResp.message
        console.log(errResp)
      })
      .finally(() => {
        isAuthenticating.value = false
      })
  }

  const validateToken = (token: string) => {
    axios
      .get('http://localhost:8000/sanctum/csrf-cookie')
      .then(() =>
        axios
          .get<UserResponse>('http://localhost:8000/api/user', {
            headers: {
              Authorization: 'Bearer ' + token
            }
          })
          .then((resp) => {
            const userName = resp.data.name

            user.value = { userName, jwt: token }
          })
      )
      .catch((errResp: AxiosError<ErrorResponse>) => {
        localStorage.removeItem('user')
        console.log(errResp)
      })
  }

  const logoutUser = () => {
    localStorage.removeItem('user')
    user.value = null
    router.push('/')
  }

  const clearAuthenticationError = () => {
    authenticationError.value = ''
  }

  return {
    authenticateUser,
    validateToken,
    user,
    logoutUser,
    isAuthenticating,
    authenticationError,
    clearAuthenticationError,
    registerUser
  }
})
