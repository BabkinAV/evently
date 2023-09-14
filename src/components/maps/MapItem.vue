<template>
  <YandexMap :coordinates="coordinates" :zoom="16">
    <YandexMarker :coordinates="coordinates" :marker-id="123" />
  </YandexMap>
</template>

<script setup lang="ts">
import { YandexMap, YandexMarker } from 'vue-yandex-maps'

defineProps<{coordinates: [lat: number, long: number]}>()



// const coordinates = ref([55.784819222274876, 37.62603869054313])
</script>

<style>
.yandex-container {
  height: 400px;
}
</style>
