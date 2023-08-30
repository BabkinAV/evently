<template>
  <div>
    <div v-if="event" class="max-w-7xl mx-auto flex justify-center">
      <div class="max-w-xl">
        <img :src="'../../public/' + event.img" :alt="event.title + ' image'" />
        <h1 class="text-center text-4xl font-extrabold my-5">{{ event.title }}</h1>
        <p>{{ event.description }}</p>
      </div>
    </div>
    <div v-else>
      <h1>Такого мероприятия не найдено</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import data from '../data/data'

const route = useRoute()

const event = data.find((el) => el.id === route.params.eventId)
</script>
