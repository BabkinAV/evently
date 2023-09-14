<template>
  <YandexMap :coordinates="coordinates" :zoom="16" @click="onClick">
    <YandexMarker :coordinates="coordinates" :marker-id="123" />
  </YandexMap>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { YandexMap, YandexMarker } from 'vue-yandex-maps'

const coordinates = ref([55.784819222274876, 37.62603869054313])
const onClick = (e: Event & { get: (arg: string) => number[] }) =>
  (coordinates.value = e.get('coords'))
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
