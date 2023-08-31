<template>
  <div>
		<!-- TODO: Add location name from https://www.geoapify.com/ -->
    <div v-if="event" class="max-w-7xl mx-auto flex justify-center">
      <div class="max-w-xl">
        <img :src="'/' + event.img" :alt="event.title + ' image'" class="mx-auto" />
        <h1 class="text-center text-4xl font-extrabold my-5">{{ event.title }}</h1>
        <p>{{ event.description }}</p>
        <div class="flex justify-center pt-3">
          <button
            class="inline-flex items-center px-3 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none"
            @click="handleAddToSelected"
          >
            Add to selected
          </button>
        </div>
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
import router from '@/router';

const route = useRoute()

const event = data.find((el) => el.id === route.params.eventId)

const handleAddToSelected = () => {
	console.log('clicked!')
	router.push('/')
}

</script>
