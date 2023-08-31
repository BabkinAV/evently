import type { Event } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSelectedStore = defineStore('selected', () => {
  const selectedEvents = ref<Event[]>([])
  // const doubleCount = computed(() => count.value * 2)
  function addToSelectedEvents(addedEvent: Event) {
    selectedEvents.value.push(addedEvent)
  }

  return { selectedEvents, addToSelectedEvents }
})
