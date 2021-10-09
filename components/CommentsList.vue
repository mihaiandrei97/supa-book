<template>
  <div>
    <p v-if="comments.length > 0" class="text-gray-800 my-4 dark:text-dark-accent">
      What other people think of this book:
    </p>
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="border border-gray-400 dark:border-gray-900 dark:bg-gray-800 shadow-md p-4 mb-4"
    >
    <div class="flex justify-between">

      <StarRating v-model="comment.rating" :readonly="true" />
      <span class="text-gray-500">{{comment.created_at.split('T')[0]}}</span>
    </div>
      <p class="mt-1 text-gray-800 dark:text-dark-accent">{{ comment.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['bookId'],
  data() {
    return {
      comments: [],
      commentsSubscription: null
    };
  },
  destroyed() {
    this.$supabase.removeSubscription(this.commentsSubscription);
  },
  async mounted() {
    // TODO: Show only comments for this book
    let { data: comments, error } = await this.$supabase
      .from("comments")
      .select("id, rating, content, created_at")
      .eq("book_id", this.bookId);
    if (error) {
      console.log(error);
    } else {
      this.comments = comments;
    }

    this.commentsSubscription = this.$supabase
      .from("comments")
      .on("INSERT", payload => {
        if(String(payload.new.book_id) === String(this.bookId)) {
          this.comments = [...comments, payload.new]
        }
      })
      .subscribe();
  }
};
</script>
