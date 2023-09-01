<template>
  <CardGallery :eventArr="eventArr" v-if="eventArr.length > 0"/>
	<p v-else>Loading...</p>
	<div v-for="event in eventArr" :key="event.id">
	</div>
</template>

<script setup lang="ts">
import CardGallery from '@/components/CardGallery.vue'
import type { Event, EventResponse } from '@/types'
import axios from 'axios'
import { ref } from 'vue'


const eventArr = ref<Event[]>([])

console.log(eventArr.value)

const fetchEvents =   () => {

  // }
  axios
    .get<{data: EventResponse[]}>('http://localhost:1337/api/events?populate=image')
    .then((resp) => {
  		console.log(resp.data.data);
      eventArr.value = resp.data.data.map((el) => {
        return {
          id: el.id,
          img: el.attributes.image.data.attributes.url,
          title: el.attributes.title,
          description: el.attributes.description,
          plannedDate: el.attributes.plannedDate
        }
      })
  		console.log(eventArr.value);
    })
    .catch((err) => {
      console.log(err)
    })
}

fetchEvents()

</script>
