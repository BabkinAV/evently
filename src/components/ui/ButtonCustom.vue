<template>
  <button
    :class="['inline-flex items-center px-3 py-3 text-sm font-medium text-center rounded-lg focus:outline-none ', (variant === 'outlined') ? 'hover:text-white  hover:bg-blue-800 text-blue-700 border-2 border-blue-700' : 'text-white bg-blue-700 hover:bg-blue-800 focus:outline-none']"
    
    @click="$emit('buttonClick')"
  >
    <slot>

		</slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
	variant?:  'contained' | 'outlined',
}>()

// class="inline-flex items-center px-3 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none"

</script>
