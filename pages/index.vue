<template>
  <div>
    <div class="relative">
      <input
        type="text"
        id="rounded-email"
        class=" rounded-lg border-transparent flex-1 appearance-none border bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-900 dark:text-gray-100 w-full py-2 px-4 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:border-transparent"
        placeholder="Search your book..."
        v-model="query"
        @keypress.enter="search"
      />
      <button class="absolute right-2 top-3 hover:opacity-50 text-gray-800" @click="search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <!-- <p class="text-center my-4  ">OR</p> -->
    <div class="my-4 flex justify-between items-center">
      <p class="text-gray-800 dark:text-dark-accent">You can also select a category:</p>
      <Dropdown v-model="category" />
    </div>
    <LoadingCard :loading="loading" />
    <transition name="fade" mode="out-in">
      <transition-group v-if="!loading && !showError" tag="div">
        <HomeCard v-for="item in items" :key="item.isbn" :item="item" />
      </transition-group>
    </transition>
    <NotFound v-if="showError" />
  </div>
</template>

<script>
import { mapItem } from "@/utils";
export default {
  name: "Homepage",
  data() {
    return {
      showError: false,
      loading: true,
      items: [],
      query: "",
      category: ""
    };
  },
  methods: {
    async fetchItems(query) {
      try {
        this.loading = true;
        this.showError = false;
        // https://liyasthomas.github.io/books/#fiction
        const result = await this.$axios.$get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}${query && this.category ? '&' : ''}${
            this.category ? "subject:" + this.category : ""
          }&startIndex=0&maxResults=40&langRestrict=en`
        );
        // `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&harry+potter
        if (result.totalItems === 0) {
          this.loading = false;
          this.showError = true;
          return;
        }

        const mappedItems = result.items.map(item => mapItem(item)).filter(Boolean);

        if(mappedItems.length === 0) {
          this.loading = false;
          this.showError = true;
          return;
        }

        this.items = mappedItems;
        this.loading = false;
        console.log(result);
      } catch (e) {
        this.loading = false;
        this.showError = true;
      }
    },
    async search() {
      if (this.query === '' && this.category === '') {
        this.$toast.error("You need to input at least one character or select a category.", {
          position: "bottom-right",
          duration: 3000
        });
      } else {
        await this.fetchItems(this.query);
      }
    }
  },
  async mounted() {
    this.fetchItems("harry potter");
  }
};
</script>
