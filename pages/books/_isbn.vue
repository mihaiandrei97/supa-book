<template>
  <div>
    <LoadingBook :loading="loading" />
    <NotFound v-if="!loading && !item" />
    <transition name="fade" mode="out-in">
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
            <div class="mb-5">
              <ActionButtons
                :isMyList="isMyList"
                @addToReadingList="addToReadingList"
                @remove="remove"
                @finish="finish"
                :status="itemFromMyList ? itemFromMyList.status : ''"
              />
            </div>
            <DateRange
              v-if="isMyList && itemFromMyList"
              :startDate="itemFromMyList.startDate"
              :endDate="itemFromMyList.endDate"
              :id="itemFromMyList.id"
              :status="itemFromMyList.status"
            />
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
          </div>
        </div>
        <Tabs
          :isMyList="isMyList"
          :notes="itemFromMyList ? itemFromMyList.notes : ''"
          :id="itemFromMyList ? itemFromMyList.id : ''"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapItem } from "@/utils";

const STATUS = {
  IN_PROGRESS: "IN_PROGRESS",
  FINISHED: "FINISHED"
};

export default {
  data() {
    return {
      item: null,
      loading: true,
      startDate: null,
      finishDate: null,
      fromSupabase: false,
      itemFromMyList: null
    };
  },
  async mounted() {
    this.loading = true;
    const { data: itemFromSupabase, error } = await this.$supabase
      .from("books")
      .select("*")
      .eq("isbn", this.$route.params.isbn)
      .single();

    if (itemFromSupabase) {
      console.log("ITEM FROM SUPABASE");
      this.item = itemFromSupabase;
      this.fromSupabase = true;
      const { data: itemFromMyList, error } = await this.$supabase
        .from("usersbooks")
        .select("*")
        .eq("book_id", itemFromSupabase.id)
        .eq("user_id", await this.$supabase.auth.user()?.id)
        .single();
      if (error) {
        console.log(error);
      } else {
        console.log(itemFromMyList);
        this.itemFromMyList = itemFromMyList;
      }
      this.loading = false;
      return;
    }
    const result = await this.$axios.$get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${this.$route.params.isbn}`
    );
    if (result?.items?.length > 0) {
      console.log("ITEM FROM GOOGLE");
      this.item = mapItem(result.items[0], true);
    }
    this.loading = false;

    // Check if it is added to myList for current user. If yes, show add to reading list button. If not, show finish and remove
    // If yes, show notes.
    // TODO: Check if book is in comments db. If yes, add comments. Check if current user has notes for this book. If yes, add them here.
  },
  methods: {
    async addBookToLocalDb() {
      const { data, error } = await this.$supabase
        .from("books")
        .insert([{ ...this.item }]);
      console.log({ ...this.item });
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    },
    async addBookToMyList() {
      const payload = {
        book_id: this.item.id,
        user_id: await this.$supabase.auth.user()?.id,
        status: STATUS.IN_PROGRESS,
        startDate: new Date().toISOString().split("T")[0],
        endDate: null,
        notes: null
      };

      const { data: itemFromMyList, error } = await this.$supabase
        .from("usersbooks")
        .insert([payload]);

      if (error) {
        console.log(error);
      } else {
        this.itemFromMyList = itemFromMyList[0];
      }
    },
    async finish() {
      this.$store.dispatch("setLoading");
      const { data, error } = await this.$supabase
        .from("usersbooks")
        .update({ endDate:  new Date().toISOString().split("T")[0], status: STATUS.FINISHED })
        .eq("id", this.itemFromMyList.id);
        if (error) {
        console.log(error);
      } else {
        this.itemFromMyList = data[0]
        this.$toast.success("Successfully added to finished books", {
          position: "bottom-right",
          duration: 3000
        });
      }
      this.$store.dispatch("clearLoading");
    },
    async remove() {
      this.$store.dispatch("setLoading");
      const { data, error } = await this.$supabase
        .from("usersbooks")
        .delete()
        .eq("id", this.itemFromMyList.id);
      if (error) {
        this.$toast.error("Error. Could not delete the record.", {
          position: "bottom-right",
          duration: 5000
        });
      } else {
        this.$toast.success("Removed from my list.", {
          position: "bottom-right",
          duration: 5000
        });
        this.itemFromMyList = null
      }
      this.$store.dispatch("clearLoading");
    },
    async addToReadingList() {
      try {
        this.$store.dispatch("setLoading");

        if (!this.fromSupabase) {
          await this.addBookToLocalDb();
        }

        await this.addBookToMyList();
      } catch (error) {
        console.log(error);
      } finally {
        this.$store.dispatch("clearLoading");
      }
    }
  },
  computed: {
    isMyList() {
      return this.itemFromMyList ? true : false;
    }
  }
};
</script>
