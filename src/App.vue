<template>
  <div class="min-h-screen bg-slate-50">
    <TheHeader />
    <main>
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import TheHeader from './components/layout/TheHeader.vue'
</script>
