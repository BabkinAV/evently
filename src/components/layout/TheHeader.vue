<template>
  <header class="bg-blue-500 shadow pl-[calc(100vw-100%)]">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
      <RouterLink to="/">
        <h1 class="text-5xl font-bold tracking-tight text-white text-center font-logo inline-block">
          Evently
        </h1>
      </RouterLink>
      <div v-if="auth.user" class="text-white text-md flex">
        <RouterLink to="/add">
          <span class="flex items-center gap-1">
            <PlusCircleIcon class="w-7 h-7" />
            <span class="pr-5"> Add event </span>
          </span>
        </RouterLink>
        <button @click="auth.logoutUser()">
          <span class="flex items-center gap-1">
            <ArrowLeftOnRectangleIcon class="w-7 h-7" />
            <span>Logout</span>
          </span>
        </button>
      </div>	
			
      <RouterLink to="/login" v-else>
        <span class="flex items-center gap-1 text-white text-md">
          <UserIcon class="w-7 h-7" />
          <span class="pr-5">Login</span>
        </span>
      </RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { PlusCircleIcon } from '@heroicons/vue/20/solid'
import { ArrowLeftOnRectangleIcon } from '@heroicons/vue/20/solid'
import { UserIcon } from '@heroicons/vue/20/solid'
const auth = useAuthStore()
</script>
