<template>
  <div>
            <div class="grid grid-cols-2 gap-6">
              <label class="text-gray-700" for="startDate">
                <span>Start Date:</span>
                <input
                  :value="startDate"
                  type="date"
                  class="
                    appearance-none
                    border border-gray-300
                    w-full
                    py-1
                    px-2
                    bg-white
                    text-gray-700
                    placeholder-gray-400
                    rounded-lg
                    text-base
                    focus:outline-none
                    focus:ring-2 focus:ring-purple-600
                    focus:border-transparent
                    flex-1
                  "
                />
              </label>
              <label class="text-gray-700" for="endDate">
                <span>End Date:</span>
                <input
                  :value="finishDate"
                  type="date"
                  class="
                    appearance-none
                    border border-gray-300
                    w-full
                    py-1
                    px-2
                    bg-white
                    text-gray-700
                    placeholder-gray-400
                    rounded-lg
                    text-base
                    focus:outline-none
                    focus:ring-2 focus:ring-purple-600
                    focus:border-transparent
                    flex-1
                  "
                />
              </label>
            </div>
          </div>
</template>

<script>
export default {
  props: ['startDate', 'finishDate']
}
</script>