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
      <StarRating v-model="comment.rating" :readonly="true" />
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
      .select("id, rating, content")
      .eq("book_id", this.bookId);
    if (error) {
      console.log(error);
    } else {
      this.comments = comments;
    }

    this.commentsSubscription = this.$supabase
      .from("comments")
      .on("INSERT", payload => {
        console.log("Change received!", payload);
        if(payload.new.bookId === this.bookId) {
          this.comments.push(payload.new)
        }
      })
      .subscribe();
      console.log(this.commentsSubscription)
  }
};
</script>
