import router from '@/router'
import type { Event, EventResponse, ErrorResponse } from '@/types'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEventsStore = defineStore('events', () => {
	// TODO: introduce `loading` ref and modify conditional render in Home view, add Spinner component
  const selectedEvents = ref<Event[]>([])
  const eventArr = ref<Event[]>([])
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

  const deleteEvent = (EventId: string, token: string) => {
    axios
      .delete('http://localhost:8000/api/events/' + EventId, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(() => {
        router.push('/');
				fetchEvents();
      })
      .catch((err: ErrorResponse) => {
        console.log(err.message)
      })
  }

  fetchEvents()

  return { eventArr, fetchEvents, selectedEvents, addToSelectedEvents, deleteEvent }
})
