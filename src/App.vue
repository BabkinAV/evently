<template>
  <div class="min-h-screen bg-slate-50">
    <header class="bg-blue-500 shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <RouterLink to="/">
          <h1 class="text-5xl font-bold tracking-tight text-white text-center font-logo">
            Evently
          </h1>
        </RouterLink>
      </div>
    </header>
    <main>
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts"></script>
