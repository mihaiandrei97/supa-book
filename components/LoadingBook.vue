<template>
  <div v-if="loading">
      <div
        class="border border-gray-300 shadow rounded-md p-4 w-full my-2 h-96"
      >
        <div class="animate-pulse flex space-x-4">
          
          <div class="flex-1 space-y-4 py-1">
            <div class="h-4 bg-gray-400 rounded w-3/4"></div>
            <div class="h-4 bg-gray-400 rounded w-2/4"></div>
            <div class="space-y-4">
              <div class="h-4"></div>
              <div class="h-4 bg-gray-400 rounded"></div>
              <div class="h-4 bg-gray-400 rounded"></div>
              <div class="h-4 bg-gray-400 rounded"></div>
              <div class="h-4 bg-gray-400 rounded"></div>
              <div class="h-4 bg-gray-400 rounded"></div>
              <div class="h-4 bg-gray-400 rounded w-5/6"></div>
            </div>
          </div>
          <div class="rounded-md bg-gray-400 h-32 w-32"></div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  },
}
</script>