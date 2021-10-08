<template>
  <div class="flex">
    <button
      type="button"
      v-for="i in 5"
      :class="{ 'mr-1': i < 5 }"
      :readonly="readonly"
      @click="submit(i)"
      :key="i"
    >
      <svg
        class="block h-6 w-6"
        :class="[value >= i ? 'text-gray-700 dark:text-dark-accent' : 'text-gray-200']"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: "StarRating",
  props: {
    value: {
      type: Number
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    submit(i) {
      if (!this.readonly) this.$emit("input", i);
    }
  }
};
</script>
