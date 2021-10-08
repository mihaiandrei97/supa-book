<template>
  <div>
    <div class="border-b-2 border-gray-300 dark:border-dark-accent">
      <ul class="flex cursor-pointer">
        <li
          :class="
            `py-2 px-6 ${
              tab.value === currentTab
                ? 'bg-gray-200 dark:bg-gray-800 dark:text-dark-accent'
                : 'bg-gray-500 text-gray-700 dark:bg-gray-800 dark:text-dark-accent dark:bg-opacity-80 dark:text-opacity-60'
            } rounded-t-lg`
          "
          v-for="tab in tabs"
          :key="tab.value"
          @click="currentTab = tab.value"
        >
          {{ tab.text }}
        </li>
      </ul>
    </div>
    <p class="my-4 text-gray-800 dark:text-dark-accent" v-if="!isMyList">
      This area is disabled until you add the book to your list.
    </p>
    <keep-alive>
      <component
        @onNotesChanged="onNotesChanged"
        :disabled="!isMyList"
        :notes="notes"
        :bookId="bookId"
        :is="currentTab === 'COMMENTS' ? 'comments' : 'notes'"
        @onCommentSubmit="onCommentSubmit"
      />
    </keep-alive>
  </div>
</template>

<script>
export default {
  props: {
    isMyList: {
      type: Boolean,
      default: false
    },
    notes: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    },
    bookId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      tabs: [
        { text: "Notes", value: "NOTES" },
        { text: "Comments", value: "COMMENTS" }
      ],
      currentTab: "NOTES"
    };
  },
  methods: {
    async onNotesChanged(value) {
      if (!value) return;

      const { data, error } = await this.$supabase
        .from("usersbooks")
        .update({ notes: value })
        .eq("id", this.id);

      if (error) {
        console.log(error);
      } else {
        this.$toast.success("Notes saved.", {
          position: "bottom-right",
          duration: 3000
        });
      }
    },
    async onCommentSubmit(content, rating) {
      this.$store.dispatch("setLoading");
      console.log('submit', content, rating);
      const payload = {
        book_id: this.bookId,
        user_id: await this.$supabase.auth.user()?.id,
        content,
        rating
      };

      const { data: itemFromMyList, error } = await this.$supabase
        .from("comments")
        .insert([payload]);

      if (error) {
        console.log(error);
      } else {
        this.itemFromMyList = itemFromMyList[0];
      }
      this.$store.dispatch("clearLoading");
    }
  }
};
</script>
