<template>
  <div class="flex min-h-full flex-col justify-center px-6 pb-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Add new event
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
      <form class="space-y-6" @submit="handleAddEventFormSubmit" method="POST" ref="newEventForm">
        <div class="relative">
          <img :src="imgSrc" class="w-full" />
          <div>
            <label
              for="fileInput"
              class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              :class="{ hidden: imgSrc !== DEFAULT_IMAGE }"
            >
              <u>Click here to upload an image</u>
            </label>
            <input
              type="file"
              name="file"
              id="fileInput"
              class="opacity-0 overflow-hidden absolute w-[1px] h-[1px] top-0 left-0"
              @change="onFileInputChange"
              ref="fileInput"
              accept=".jpg,.jpeg,.png"
            />
          </div>
        </div>
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
            <label for="description" class="block text-sm font-medium leading-6 text-gray-900"
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
          <p for="title" class="block text-sm font-medium leading-6 text-gray-900">
            Pick location on a map:
          </p>
          <MapItemDraggable
            class="mt-2"
            :coordinates="mapCoordinates"
            @update-coordinates="handleUpdateCoordinates"
          />
        </div>

        <div class="flex justify-center">
          <ButtonCustom type="submit" class="min-w-[100px] flex justify-center">
            <span v-if="!isFormSubmitting">Add event</span>
            <SpinnerIconVue v-else color="white" />
          </ButtonCustom>
          <ButtonCustom class="ml-5 px-5" @click="handleClearForm" variant="outlined" type="button">
            Clear
          </ButtonCustom>
        </div>
      </form>
      <p v-if="errorSubmitting !== ''" class="text-red-500 pt-4 text-center">
        {{ errorSubmitting }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import MapItemDraggable from '@/components/maps/MapItemDraggable.vue'
import ButtonCustom from '@/components/ui/ButtonCustom.vue'
import SpinnerIconVue from '@/components/ui/SpinnerIcon.vue'
import { DEFAULT_COORDINATES, DEFAULT_IMAGE } from '@/defaultValues'
import router from '@/router'
import { useEventsStore } from '@/stores/events'
import { useAuthStore } from '@/stores/auth'
import type { ErrorResponse, EventCreateResponse } from '@/types'
import axios, { AxiosError } from 'axios'
import { ref } from 'vue'

const imgSrc = ref(DEFAULT_IMAGE)

const fileInput = ref<HTMLInputElement | null>(null)

const newEventForm = ref<HTMLFormElement | null>(null)

const mapCoordinates = ref<number[]>(DEFAULT_COORDINATES)

const isFormSubmitting = ref(false)

const errorSubmitting = ref('')

const eventStore = useEventsStore()
const authStore = useAuthStore()

const handleAddEventFormSubmit = (event: Event) => {
  event.preventDefault()
  const target = event.target as typeof event.target & {
    title: { value: string }
    description: { value: string }
    location: { value: string }
    date: { value: string }
    file: {
      value?: string
    }
  }
  isFormSubmitting.value = true
  errorSubmitting.value = ''


  const formData = new FormData()
	formData.append('name', target.title.value);
	formData.append('description', target.description.value);
	formData.append('plannedDate', target.date.value);
	formData.append('title', target.title.value);
	formData.append('lat', mapCoordinates.value[0].toString());
	formData.append('long', mapCoordinates.value[1].toString());
  if (fileInput.value?.files) {
    formData.append('image', fileInput.value?.files[0])
  }

  const token = authStore.user?.jwt

  if (!token) return

  axios
    .post<EventCreateResponse>('http://localhost:8000/api/events/', formData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then(() => {
      eventStore.fetchEvents()
      handleClearForm()
      router.push('/')
    })
    .catch((errResp: AxiosError<ErrorResponse>) => {
      errorSubmitting.value = errResp.response?.data?.message ?? 'Error submitting data'
      console.log(errResp)
    })
    .finally(() => {
      isFormSubmitting.value = false
    })
}

const handleClearForm = () => {
  newEventForm.value?.reset()
  mapCoordinates.value = DEFAULT_COORDINATES
  imgSrc.value = DEFAULT_IMAGE
}

const handleUpdateCoordinates = (coordinates: number[]) => {
  mapCoordinates.value = coordinates
}

const onFileInputChange = () => {
  if (fileInput.value?.files) {
    imgSrc.value = URL.createObjectURL(fileInput.value?.files[0])
  }
  // call URL.revokeObjectURL() to prefent memory leak
  setTimeout(() => {
    URL.revokeObjectURL(imgSrc.value)
  }, 1000)
}
</script>
