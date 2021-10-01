<template>
  <div>
    <LoadingCard :loading="loading" :nbOfItems="1" />
    <div v-if="!loading && !item">Sorry we couldn't find that item</div>
    <div v-if="!loading && item">
      <div class="flex">
        <div class="w-3/4 px-8 pb-6">
          <div class="mb-5">
            <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2">
              {{ item.title }}
            </h5>
            <p class="text-gray-800 font-light italic" v-if="item.authors">
              {{ item.authors }}
            </p>
          </div>
          <div class="mb-5"><ActionButtons :isMyList="isMyList" /></div>
          <DateRange v-if="isMyList" />
          <div class="mt-4 text-justify">
            <small>{{ item.description }}</small>
          </div>
        </div>
        <div class="w-1/4">
          <img
            class="
              max-h-full
              w-full
              object-cover
              rounded-t-lg
              md:rounded-none md:rounded-l-lg
              shadow-xl
            "
            :src="item.imageLink"
            alt=""
            style="max-width: 150px"
          />

          <!-- <ActionButtons :isMyList="isMyList" /> -->
  
        </div>
      </div>
      <Tabs :isMyList="isMyList"/>
    </div>
  </div>
</template>


<script>
import { mapItem } from "@/utils";

export default {
  data() {
    return {
      item: null,
      loading: true,
      startDate: null,
      finishDate: null,
      isMyList: false
    };
  },
  async mounted() {
    this.loading = true;
    const result = await this.$axios.$get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${this.$route.params.isbn}`
    ); 
    if(result?.items?.length > 0){
      this.item = mapItem(result.items[0], true);
    }
    this.loading = false;



    // Check if it is added to myList for current user. If yes, show add to reading list button. If not, show finish and remove
    // If yes, show notes.
    // TODO: Check if book is in comments db. If yes, add comments. Check if current user has notes for this book. If yes, add them here.
  },
};
</script>
