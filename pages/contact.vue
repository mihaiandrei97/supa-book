<template>
  <form
    class="flex mx-auto w-full max-w-md space-x-3"
    @submit.prevent="onSubmit"
  >
    <div
      class="w-full max-w-2xl px-5 py-10 m-auto mt-10 bg-gray-100 rounded-lg shadow dark:bg-gray-800"
    >
      <div
        class="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-dark-accent"
      >
        Contact us!
      </div>
      <div class="grid max-w-xl grid-cols-2 gap-4 m-auto">
        <div class="col-span-2 lg:col-span-1">
          <Dropdown
            v-model="subject"
            :items="['Add a book', 'Report', 'Suggestions', 'Others']"
            emptyPlaceholder="Subject"
          />
        </div>

        <div class="col-span-2">
          <label class="text-gray-700" for="name">
            <textarea
              v-model="description"
              class=" rounded-lg border-transparent flex-1 appearance-none border bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-900 dark:text-gray-100 w-full py-2 px-4 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none  focus:border-transparent"
              id="request"
              placeholder="Description"
              name="request"
              rows="5"
              cols="40"
            >
            </textarea>
          </label>
        </div>
        <div class="col-span-2 text-right">
          <button
            type="submit"
            class="py-2 px-4  bg-green-800 hover:bg-green-700 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      subject: "",
      description: ""
    };
  },
  computed: {
    ...mapState(["authenticated"])
  },
  methods: {
    async onSubmit() {
      let alertMessage = null;
      if (!this.subject) {
        alertMessage = "Subject cannot be empty.";
      }

      if (!this.description) {
        alertMessage = "Description cannot be empty";
      }

      if (!this.authenticated) {
        alertMessage = "You need to be authenticated.";
      }

      if (alertMessage) {
        this.$toast.error(alertMessage, {
          position: "bottom-right",
          duration: 3000
        });
        return;
      }

      this.$store.dispatch("setLoading");
      const payload = {
        user_id: await this.$supabase.auth.user()?.id,
        subject: this.subject,
        description: this.description
      };

      const { error } = await this.$supabase.from("contact").insert([payload], {returning: 'minimal'});

      if (error) {
        console.log(error);
      } else {
        this.$toast.success("Request sent. Thank you for your feedback.", {
          position: "bottom-right",
          duration: 3000
        });
        this.subject = "";
        this.description = "";
      }
      this.$store.dispatch("clearLoading");
    }
  }
};
</script>
