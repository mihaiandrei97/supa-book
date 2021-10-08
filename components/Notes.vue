<template>
  <div class="mt-6">
    <label class="text-gray-700" for="name">
      <textarea
        :disabled="disabled"
        :value="notes"
        class="
              flex-1
              appearance-none
              border border-gray-300
              w-full
              py-2
              px-4
              text-gray-700
              placeholder-gray-400
              rounded-lg
              text-base
              focus:outline-none
              focus:border-transparent
              disabled:bg-gray-200
              bg-gray-100 dark:bg-gray-800 dark:border-gray-900 dark:text-gray-100
            "
        id="notes"
        placeholder="Notes"
        name="notes"
        rows="5"
        cols="40"
        @input="onNotesChanged"
      >
      </textarea>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: true
    },
    notes: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      timeout: null
    }
  },
  methods: {
    onNotesChanged($event) {
      const value = $event.target.value
      if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.$emit('onNotesChanged', value)
        }, 500)
    }
  },
}
</script>