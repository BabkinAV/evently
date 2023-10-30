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
    .get<EventResponse[]>('http://localhost:8000/api/events')
    .then((resp) => {
			eventArr.value = resp.data.map((el) => {
        return {
          id: el.id,
          img: el.image,
          title: el.name,
          description: el.description,
          plannedDate: el.plannedDate
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
