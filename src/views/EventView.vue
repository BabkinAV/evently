<template>
  <div>
		<!-- TODO: introduce 'isLoading' ref and modify v-if directive -->
    <div v-if="event !== undefined" class="max-w-7xl mx-auto flex justify-center">
      <div class="max-w-xl">
        <img
          :src="'http://localhost:8000/storage/' + event.img"
          :alt="event.title + ' image'"
          class="mx-auto"
        />
        <h1 class="text-center text-4xl font-extrabold mt-5">{{ event.title }}</h1>
        <div class="flex justify-between gap-12 py-6">
          <div class="flex items-center">
            <MapPinIcon class="h-10 w-10 text-blue-500 inline-block" />
            <span class="text-lg pl-1" v-if="eventLocation !== undefined">
              {{ eventLocation.title }}
            </span>
          </div>
          <div class="flex items-center">
            <CalendarDaysIcon class="h-10 w-10 text-blue-500 inline-block" />
            <span class="text-lg pl-1">
              {{ formattedDate(event.plannedDate) }}
            </span>
          </div>
        </div>
        <p>{{ event.description }}</p>
        <MapItem
          class="my-6"
          :coordinates="[eventLocation.lat, eventLocation.long]"
          v-if="eventLocation !== undefined"
        />
        <div class="flex justify-center pt-3">
          <ButtonCustom @click="handleAddToSelected"> Add to selected </ButtonCustom>
          <ButtonCustom class="ml-5" @click="handleReturnClick" variant="outlined">
            Return to main
          </ButtonCustom>
        </div>
      </div>
    </div>
    <SpinnerIcon v-else />
  </div>
</template>

<script setup lang="ts">
import ButtonCustom from '@/components/ui/ButtonCustom.vue'
import MapItem from '@/components/maps/MapItem.vue'
import SpinnerIcon from '@/components/ui/SpinnerIcon.vue'
import { formattedDate } from '@/helpers/formattedDate'
import router from '@/router'
import { useEventsStore } from '@/stores/events'
import { CalendarDaysIcon, MapPinIcon } from '@heroicons/vue/20/solid'
import axios from 'axios'
import { useRoute } from 'vue-router'

import type { Event, EventResponse } from '@/types'
import { ref } from 'vue'

const route = useRoute()
const eventsStore = useEventsStore()

const { addToSelectedEvents } = eventsStore

const event = ref<Event>()

const notFound = ref<Boolean>(false)

const eventLocation = ref<{
  title: string
  lat: number
  long: number
}>()

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
    .get<EventResponse | undefined>(`http://localhost:8000/api/events/${route.params.eventId}`)
    .then((resp) => {
			notFound.value = false;
      if (resp.data) {
        const respObj = resp.data

        // console.log(respObj);
        const foundEvent = {
          id: respObj.id,
          img: respObj.image,
          title: respObj.name,
          description: respObj.description,
          plannedDate: respObj.plannedDate
        }
        event.value = foundEvent
        eventLocation.value = {
          title: respObj.location.title,
          lat: respObj.location.lat,
          long: respObj.location.long
        }
        console.log(eventLocation.value)
      } else {
				notFound.value = true;
			}
    })
    .catch((err) => {
      console.log(err)
    })
}

fetchEvent()
// fetchLocation(55.784819222274876, 37.62603869054313)
// Radisson Blu Olimpiyskiy
</script>
