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
export default {
  name: 'MyList',
  data() {
    return {
      loading: true,
      items: [],
    };
  },
  methods: {
    async fetchItems(query) {
      this.loading = true;
      // https://liyasthomas.github.io/books/#fiction
      const { data: itemsFromMyList, error } = await this.$supabase
        .from("usersbooks")
        .select("id, book_id, books(*)")
        .eq("user_id", await this.$supabase.auth.user()?.id)
        .eq("status", 'FINISHED')
      
      console.log(itemsFromMyList)
      this.items = itemsFromMyList.map(item => item.books)

      this.loading = false;
    },
  },
  async mounted() {
    this.fetchItems();
  }
};
</script>
