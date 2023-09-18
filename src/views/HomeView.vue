<template>
  <CardGallery :eventArr="eventArr" v-if="eventArr.length > 0" :key="eventArr.length"/>
	<p v-else>Loading...</p>
	<div v-for="event in eventArr" :key="event.id">
	</div>
</template>

<script setup lang="ts">
import CardGallery from '@/components/CardGallery.vue'
import { useEventsStore } from '@/stores/events'
import { storeToRefs } from 'pinia'


const eventStore = useEventsStore()

const {eventArr} = storeToRefs(eventStore);


</script>
