<template>
  <div>
    <div class="relative">
      <input
        type="text"
        id="rounded-email"
        class=" rounded-lg border-transparent flex-1 appearance-none border bg-gray-100 border-gray-300 w-full py-2 px-4 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        placeholder="Search your book..."
        v-model="query"
        @keypress.enter="search"
      />
      <button class="absolute right-2 top-3 hover:opacity-50" @click="search">
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
    <LoadingCard :loading="loading" />
    <transition name="fade" mode="out-in">
      <transition-group v-if="!loading" tag="div">
        <HomeCard v-for="item in items" :key="item.isbn" :item="item" />
      </transition-group>
    </transition>
  </div>
</template>

<script>
import { mapItem } from "@/utils";
export default {
  name: 'Homepage',
  data() {
    return {
      loading: true,
      items: [],
      query: ""
    };
  },
  methods: {
    async fetchItems(query) {
      this.loading = true;
      // https://liyasthomas.github.io/books/#fiction
      const result = await this.$axios.$get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=0&maxResults=40&langRestrict=en`
      );

      if (result.totalItems === 0) {
        return;
      }

      this.items = result.items.map(item => mapItem(item)).filter(Boolean);
      this.loading = false;
      console.log(result);
    },
    async search() {
      if (this.query.length > 3) await this.fetchItems(this.query);
    }
  },
  async mounted() {
    this.fetchItems("harry potter");
  }
};
</script>
