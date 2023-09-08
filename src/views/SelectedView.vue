<template>
  <div>
    <h1 class="text-center font-bold text-2xl">Your selected events:</h1>
    <CardGallery :eventArr="selectedEvents" />
  </div>
</template>

<script setup lang="ts">
import CardGallery from '@/components/CardGallery.vue'
import { useEventsStore } from '@/stores/events';
import { storeToRefs } from 'pinia';


const store = useEventsStore()

const {selectedEvents} = storeToRefs(store)

</script>
