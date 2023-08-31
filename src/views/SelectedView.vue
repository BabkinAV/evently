<template>
  <div>
    <h1 class="text-center font-bold">This is a view for selected events</h1>
    <CardGallery :eventArr="selectedEvents" />
  </div>
</template>

<script setup lang="ts">
import CardGallery from '@/components/CardGallery.vue'
import { useSelectedStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';


const store = useSelectedStore()

const {selectedEvents} = storeToRefs(store)

</script>
