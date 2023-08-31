<template>
  <div class="pl-[80px] flex justify-between items-center">
    <SelectInputSort v-model="sortParameter" />
    <RouterLink to="selected">
      <p class="underline inline">Selected events:</p>
      <span>(2)</span>
    </RouterLink>
  </div>
  <div
    class="grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] mt-12 gap-4 justify-items-center"
  >
    <CardItem v-for="eventData in sortedEvents" :key="eventData.id" :eventData="eventData" />
  </div>
</template>

<script setup lang="ts">
import SelectInputSort from '@/components/SelectInputSort.vue';
import type { Event } from '@/types';
import { computed, ref } from 'vue';
import CardItem from '../components/CardItem.vue';
const sortParameter = ref<'title' | 'date'>('title')

const { eventArr } = defineProps<{ eventArr: Event[] }>()


const sortedEvents = computed(() => {
  if (sortParameter.value === 'title') {
    return [...eventArr].sort((a, b) => a.title.localeCompare(b.title))
  } else if (sortParameter.value === 'date') {
    return [...eventArr].sort((a, b) => a.plannedDate - b.plannedDate)
  } else {
    return eventArr
  }
})
</script>
