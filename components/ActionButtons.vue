<template>
  <div class="py-4 flex gap-8 justify-end">
    <button
      v-if="!isMyList"
      @click="addToReadingList"
      v-tooltip="addToReadingListTooltip"
      class="
        flex
        items-center
        p-1
        transition
        ease-in
        duration-200
        uppercase
        rounded-full
        hover:bg-yellow-400
        hover:text-white
        border-2 border-gray-900 text-gray-900
        dark:border-dark-accent
        dark:text-dark-accent
        dark:hover:border-yellow-300
        dark:hover:text-white
        hover:border-yellow-300
        focus:outline-none
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <button
      @click="finish"
      v-if="isMyList && status === 'IN_PROGRESS'"
      v-tooltip="'Finish Book'"
      class="
        flex
        items-center
        p-1
        transition
        ease-in
        duration-200
        uppercase
        rounded-full
        hover:bg-green-600
        hover:border-green-800
        hover:text-white
        border-2 border-gray-900
        focus:outline-none
        dark:border-dark-accent
        dark:text-dark-accent
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <button
      @click="remove"
      v-if="isMyList"
      v-tooltip="'Remove from list'"
      class="
        flex
        items-center
        p-1
        transition
        ease-in
        duration-200
        uppercase
        rounded-full
        hover:bg-red-600
        hover:text-white
        border-2 border-gray-900
        hover:border-red-800
        focus:outline-none
        dark:border-dark-accent
        dark:text-dark-accent
        dark:hover:text-red-800
        dark:hover:border-red-800
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    isMyList: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: ''
    }
  },
  methods: {
    addToReadingList() {
      if (!this.authenticated) return;
      this.$emit('addToReadingList')
    },
    remove(){
      this.$emit('remove')
    },
    finish(){
      this.$emit('finish')
    }

  },
  computed: {
    ...mapState(["authenticated"]),
    addToReadingListTooltip() {
      return this.authenticated
        ? "Add to Reading List"
        : "Please login to add a card to your Reading List";
    }
  }
};
</script>

<style>
.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip-inner {
  background: #131212;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}
</style>
