<template>
	<div>
		<h1 class="text-center font-bold">This is a view for selected events</h1>
		<CardGallery :event-arr="data"/>
	</div>
</template>

<script setup lang="ts">
import CardGallery from '@/components/CardGallery.vue';
import data from '../data/data'


</script>
