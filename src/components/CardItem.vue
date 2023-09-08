<template>
  <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
    <div class="max-h-[250px] overflow-clip">
      <RouterLink :to="'event/' + eventData.id">
        <img
          class="rounded-t-lg"
          :src="'http://localhost:1337' + eventData.img"
          alt="office space"
        />
      </RouterLink>
    </div>
    <div class="p-5">
      <RouterLink :to="'event/' + eventData.id">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ eventData.title }}</h5>
      </RouterLink>
      <p class="mb-3 font-normal text-gray-700">{{ eventData.description }}</p>
      <div class="flex justify-between">
        <RouterLink
          :to="'event/' + eventData.id"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Read more
          <ArrowRight class="w-3.5 h-3.5 ml-2" />
        </RouterLink>
        <div class="flex items-center gap-1">
          <CalendarDaysIcon class="h-8 w-8 text-blue-500" />
          <span class="font-bold text-sm mt-1">{{ formattedDate }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ArrowRight from './icons/ArrowRight.vue'
import { CalendarDaysIcon } from '@heroicons/vue/20/solid'
import dayjs from 'dayjs'
import { computed } from 'vue'
import { type Event } from '@/types'

const { eventData } = defineProps<{ eventData: Event }>()

const formattedDate = computed(() => {
  const newDate = dayjs(eventData.plannedDate).format('DD.MM.YYYY')
  return newDate
})
</script>
