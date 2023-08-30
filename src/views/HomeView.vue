<template>
  <div class="flex">
    <CardItem
      v-for="eventData in data"
      :key="eventData.id"
      :eventData="eventData"
    />
  </div>
</template>

<script setup lang="ts">
import CardItem from '../components/CardItem.vue'

import data from '../data/data'
</script>
