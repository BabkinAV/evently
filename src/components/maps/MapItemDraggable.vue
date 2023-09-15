<template>
  <YandexMap :coordinates="coordinates" :zoom="16" @click="handleMapClick">
    <YandexMarker :coordinates="coordinates" :marker-id="123" />
  </YandexMap>
</template>
<!-- @click="onClick" -->
<script setup lang="ts">
import { YandexMap, YandexMarker } from 'vue-yandex-maps'
const emit = defineEmits<{
  (e: 'updateCoordinates', coordinates: number[]): void
}>()
defineProps<{ coordinates: number[] }>()
const handleMapClick = (e: Event & { get: (arg: string) => number[] }) =>
  // (coordinates.value = e.get('coords'))
  emit('updateCoordinates', e.get('coords'))
</script>

<style>
.yandex-container {
  height: 400px;
}

.yandex-balloon {
  height: 100px;
  width: 100px;
}
</style>
