<template>
  <div>
    <!-- TODO: Add location name from https://www.geoapify.com/ -->
    <div v-if="event !== undefined" class="max-w-7xl mx-auto flex justify-center">
      <div class="max-w-xl">
        <img :src="'http://localhost:1337' + event.img" :alt="event.title + ' image'" class="mx-auto" />
        <h1 class="text-center text-4xl font-extrabold my-5">{{ event.title }}</h1>
        <p>{{ event.description }}</p>
        <div class="flex justify-center pt-3">
          <button
            class="inline-flex items-center px-3 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none"
            
          >
            Add to selected
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Loading...</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { useSelectedStore } from '@/stores/counter'
import axios from 'axios'
import { useRoute } from 'vue-router'
import data from '../data/data'

import type { Event, EventResponse } from '@/types'
import { ref } from 'vue'

const route = useRoute()
const store = useSelectedStore()

const { addToSelectedEvents } = store

const eventFromData = data.find((el) => el.id === route.params.eventId)

const event = ref<Event>()

// @click="handleAddToSelected"

// const handleAddToSelected = () => {
//   if (event.value) {
//     addToSelectedEvents(event.value)
//   }
//   router.push('/')
// }

// const myObj = {
// 	id: '',
// 	img: 'fsfsf',
// 	title: 'fsf',
// 	description: 'sfs',
// 	plannedDate: 'fsfs'
// } as Event;

// event.value = myObj



const fetchEvents = () => {
  // }
  axios
    .get<{ data: EventResponse }>(`http://localhost:1337/api/events/${route.params.eventId}?populate=image`)
    .then((resp) => {
      console.log(resp.data.data)
			const respObj = resp.data.data;
      const foundEvent = {
				id: respObj.id,
				img: respObj.attributes.image.data.attributes.url,
				title: respObj.attributes.title,
				description: respObj.attributes.description,
				plannedDate: respObj.attributes.plannedDate,
			}
			event.value = foundEvent;
			
      console.log(event.value)
    })
    .catch((err) => {
      console.log(err)
    })
}

fetchEvents()
</script>
