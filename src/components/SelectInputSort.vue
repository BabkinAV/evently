<template>
	<div class="max-w-[200px]">
      <label for="sorting-order" class="hidden">Select an option</label>
      <select
        id="sorting-order"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				v-model="value"

      >
        <option disabled value="">Please select</option>
        <option selected value="title">Sort by title</option>
        <option value="date">Sort by date</option>
      </select>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>