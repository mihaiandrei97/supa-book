<template>
  <div class="mt-6">
    <div class="grid grid-cols-3 items-start">
      <div class="col-span-2">
        <label
          for="message"
          class="text-sm font-medium text-gray-900 block mb-2 dark:text-dark-accent"
          >Your message and rating</label
        >
        <div class="py-2">
          <StarRating v-model="rating" />
        </div>
      </div>

      <button
        :disabled="disabled"
        type="button"
        @click="submit"
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
        border 
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
        bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-900 dark:text-gray-100
      "
      id="comment"
      placeholder="Leave a comment..."
      name="comment"
      rows="5"
      cols="40"
      v-model="comment"
    >
    </textarea>
    <CommentsList :bookId="bookId" />
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: true,
    },
    bookId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      rating: 3,
      comment: ''
    };
  },
  methods: {
    submit() {
      this.$emit('onCommentSubmit', this.comment, this.rating)
      this.rating = 3
      this.comment = ''
    }
  },
};
</script>
