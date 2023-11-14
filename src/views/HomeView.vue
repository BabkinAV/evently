<template>
  <div v-if="loadingEvent">
    <SpinnerIcon />
  </div>
  <div v-else>
    <CardGallery :eventArr="eventArr" v-if="eventArr.length > 0" :key="eventArr.length" />
    <p v-else>No events found</p>
  </div>
</template>

<script setup lang="ts">
import CardGallery from '@/components/CardGallery.vue'
import SpinnerIcon from '@/components/ui/SpinnerIcon.vue'
import { useEventsStore } from '@/stores/events'
import { storeToRefs } from 'pinia'

const eventStore = useEventsStore()

const { eventArr, loadingEvent } = storeToRefs(eventStore)
</script>
