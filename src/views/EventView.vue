<template>
  <div>
    <!-- TODO: Add location name from https://www.geoapify.com/ -->
    <div v-if="event !== undefined" class="max-w-7xl mx-auto flex justify-center">
      <div class="max-w-xl">
        <img :src="'http://localhost:1337' + event.img" :alt="event.title + ' image'" class="mx-auto" />
        <h1 class="text-center text-4xl font-extrabold my-5">{{ event.title }}</h1>
        <p>{{ event.description }}</p>
        <div class="flex justify-center pt-3">
          <ButtonCustom
            @click="handleAddToSelected"
          >
            Add to selected
          </ButtonCustom>
					<ButtonCustom class="ml-5" @click="handleReturnClick" variant="outlined">
						Return to main
					</ButtonCustom>
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
import { useEventsStore } from '@/stores/events'
import axios from 'axios'
import { useRoute } from 'vue-router'
import ButtonCustom from '@/components/ui/ButtonCustom.vue'

import type { Event, EventResponse } from '@/types'
import { ref } from 'vue'

const route = useRoute()
const eventsStore = useEventsStore()

const { addToSelectedEvents } = eventsStore;


const event = ref<Event>()


const handleAddToSelected = () => {
  if (event.value) {
    addToSelectedEvents(event.value)
  }
  router.push('/')
}

const handleReturnClick = () => {
	router.push('/')
}


const fetchEvent = () => {
  axios
    .get<{ data: EventResponse }>(`http://localhost:1337/api/events/${route.params.eventId}?populate=image`)
    .then((resp) => {
			const respObj = resp.data.data;
      const foundEvent = {
				id: respObj.id,
				img: respObj.attributes.image.data.attributes.url,
				title: respObj.attributes.title,
				description: respObj.attributes.description,
				plannedDate: respObj.attributes.plannedDate,
			}
			event.value = foundEvent;
			
    })
    .catch((err) => {
      console.log(err)
    })
}

fetchEvent()
</script>
