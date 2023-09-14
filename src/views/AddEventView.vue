<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Add new event
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
      <form class="space-y-6" @submit="handleAddEventFormSubmit" method="POST">
        <div>
          <label for="title" class="block text-sm font-medium leading-6 text-gray-900"
            >Event title</label
          >
          <div class="mt-2">
            <input
              id="title"
              name="title"
              type="text"
              autocomplete="title"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
            />
          </div>
        </div>

				<div class="flex gap-2">
					<div class="grow">
          <label for="title" class="block text-sm font-medium leading-6 text-gray-900"
            >Event location</label
          >
          <div class="mt-2">
            <input
              id="location"
              name="location"
              type="text"
              autocomplete="location"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
            />
          </div>
        </div>
				<div>
          <label for="date" class="block text-sm font-medium leading-6 text-gray-900"
            >Event date</label
          >
          <div class="mt-2">
            <input
              id="date"
              name="date"
              type="date"
              autocomplete="date"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
            />
          </div>
        </div>
				</div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
              >Event description</label
            >
          </div>
          <div class="mt-2">
            <textarea
              id="description"
              name="description"
              type="description"
							autocomplete="title"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
            />
          </div>
        </div>
        <div>
					<p for="title" class="block text-sm font-medium leading-6 text-gray-900 "
            >Pick location on a map: </p
          >
          <MapItemDraggable class="mt-2"/>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 min-h-[36px] items-center"
          >
            <span>Add Event</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import MapItemDraggable from '@/components/Maps/MapItemDraggable.vue';

const handleAddEventFormSubmit = () => {
  // code here...
}
</script>
