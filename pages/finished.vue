<template>
  <div>
    <div v-if="!authenticated && !loading">
      <NotFound message="You need to be logged in order to check this page." />
    </div>
    <div v-else>

    
     <LoadingCard :loading="loading" :nbOfItems="3"/>
    <transition name="fade" mode="out-in">
      <transition-group v-if="!loading && items.length > 0" tag="div">
        <HomeCard v-for="item in items" :key="item.id" :item="item" />
      </transition-group>
    </transition>
    <NotFound v-if="!loading && items.length === 0"/>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
export default {
  name: 'MyList',
  data() {
    return {
      loading: true,
      items: [],
    };
  },
  methods: {
    async fetchItems() {
      this.loading = true;
      const { data: itemsFromMyList, error } = await this.$supabase
        .from("usersbooks")
        .select("id, book_id, books(*)")
        .eq("user_id", await this.$supabase.auth.user()?.id)
        .eq("status", 'FINISHED')
      
      this.items = itemsFromMyList.map(item => item.books)

      this.loading = false;
    },
  },
  async mounted() {
    if (this.authenticated) {
      this.fetchItems();
    } else {
      this.loading = false;
    }
  },
  computed: {
    ...mapState(["authenticated"]),
  },
};
</script>
