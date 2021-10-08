<template>
  <div>
     <LoadingCard :loading="loading" :nbOfItems="3"/>
    <transition name="fade" mode="out-in">
      <transition-group v-if="!loading && items.length > 0" tag="div">
        <HomeCard v-for="item in items" :key="item.id" :item="item" />
      </transition-group>
    </transition>
    <NotFound v-if="!loading && items.length === 0"/>
  </div>
</template>


<script>
import Pagination from 'vue-pagination-2';
export default {
  name: 'MyList',
  components: {
    'v-pag': Pagination,
  },
  data() {
    return {
      loading: true,
      items: [],
      page: 1
    };
  },
  methods: {
    async fetchItems(query) {
      this.loading = true;
      // https://liyasthomas.github.io/books/#fiction
      const { data: itemsFromMyList, error, count } = await this.$supabase
        .from("usersbooks")
        .select("id, book_id, books(*)", {count: 'exact'})
        .eq("user_id", await this.$supabase.auth.user()?.id)
        .eq("status", 'IN_PROGRESS')
      
      console.log(itemsFromMyList)
      console.log(count)
      this.items = itemsFromMyList.map(item => item.books)

      this.loading = false;
    },
  },
  async mounted() {
    this.fetchItems();
  }
};
</script>
