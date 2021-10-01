<template>
  <div class="mt-6">
    <div class="grid grid-cols-3 items-start">
      <div class="col-span-2">
        <label
          for="message"
          class="text-sm font-medium text-gray-900 block mb-2"
          >Your message and rating</label
        >
        <div class="py-2">
          <StarRating v-model="rating" />
        </div>
      </div>

      <button
        :disabled="disabled"
        type="button"
        class="
          disabled:opacity-50
          justify-self-end
          py-2
          px-4
          bg-green-600
          hover:bg-green-700
          focus:ring-green-500 focus:ring-offset-green-200
          text-white
          w-full
          transition
          ease-in
          duration-200
          text-center text-base
          font-semibold
          shadow-md
          focus:outline-none
          focus:ring-2 focus:ring-offset-2
        "
      >
        Send
      </button>
    </div>

    <textarea
      :disabled="disabled"
      class="
        flex-1
        appearance-none
        border border-gray-300
        w-full
        py-2
        px-4
        bg-white
        text-gray-700
        placeholder-gray-400
        rounded-lg
        text-base
        focus:outline-none
        focus:ring-2 focus:ring-purple-600
        focus:border-transparent
        disabled:bg-gray-200
      "
      id="comment"
      placeholder="Leave a comment..."
      name="comment"
      rows="5"
      cols="40"
    >
    </textarea>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      rating: 0,
    };
  },
};
</script>
