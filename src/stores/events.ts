import type { Event, EventResponse } from '@/types'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEventsStore = defineStore('events', () => {
  const selectedEvents = ref<Event[]>([])
	const eventArr =  ref<Event[]>([]);
  // const doubleCount = computed(() => count.value * 2)
  const addToSelectedEvents = (addedEvent: Event) => {
    selectedEvents.value.push(addedEvent)
  }

	const fetchEvents = () => {
		axios
    .get<{data: EventResponse[]}>('http://localhost:1337/api/events?populate=image')
    .then((resp) => {
			eventArr.value = resp.data.data.map((el) => {
        return {
          id: el.id,
          img: el.attributes.image.data.attributes.url,
          title: el.attributes.title,
          description: el.attributes.description,
          plannedDate: el.attributes.plannedDate
        }
      })
    })
    .catch((err) => {
      console.log(err)
    })
	}



	fetchEvents();

  return { eventArr, fetchEvents,  selectedEvents, addToSelectedEvents }
})
