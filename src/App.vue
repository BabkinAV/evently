<template>
  <div>
    <div class="min-h-screen bg-slate-50">
      <TheHeader />
      <main>
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-">
          <RouterView :key="$route.fullPath"/>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheHeader from './components/layout/TheHeader.vue'
import { useAuthStore } from './stores/auth'
import type { User } from './types'


const authStore = useAuthStore()

const user = localStorage.getItem('user')

if (user) {
	const parsedUser = JSON.parse(user) as User
	if (parsedUser.jwt) {
		authStore.validateToken(parsedUser.jwt)
	} else {
		localStorage.removeItem('user')
	}
}
</script>
