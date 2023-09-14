import axios, { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { type ErrorResponse, type LoginResponse, type User } from '../types'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticating = ref<Boolean>(false)
	const authenticationError = ref<string>('');

  const authenticateUser = (identifier: string, password: string) => {
    isAuthenticating.value = true;
		authenticationError.value = '';
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
      .catch((errResp: AxiosError<ErrorResponse>) => {
				authenticationError.value = errResp.response?.data.error.message ?? errResp.message;
				console.log(errResp);
      })
      .finally(() => {
        isAuthenticating.value = false
      })
  }

  const logoutUser = () => {
    localStorage.removeItem('user')
    user.value = null
  }

	const clearAuthenticationError = () => {
		console.log('fired handler')
		authenticationError.value = '';
	}

  return { authenticateUser, user, logoutUser, isAuthenticating, authenticationError,  clearAuthenticationError}
})
