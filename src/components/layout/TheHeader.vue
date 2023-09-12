<template>
  <header class="bg-blue-500 shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
      <RouterLink to="/">
        <h1 class="text-5xl font-bold tracking-tight text-white text-center font-logo inline-block">
          Evently
        </h1>
      </RouterLink>
      <button v-if="auth.user" class="text-white text-md" @click="auth.logoutUser()">Logout</button>
      <RouterLink to="/login" v-else>
        <span class="text-white text-md"> Login </span>
      </RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>
