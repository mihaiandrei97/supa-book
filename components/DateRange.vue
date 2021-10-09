<template>
  <div>
    <div class="block md:grid grid-cols-2 gap-6">
      <label class="text-gray-700" for="startDate">
        <span class="dark:text-dark-accent">Start Date:</span>
        <input
          ref="startDate"
          :value="startDate"
          @change="onStartChange"
          type="date"
          class="
            appearance-none
            border 
            w-full
            py-1
            px-2
            text-gray-700
            placeholder-gray-400
            rounded-lg
            text-base
            focus:outline-none
            focus:ring-2
            focus:border-transparent
            flex-1
            bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-900 dark:text-gray-100
          "
        />
      </label>
      <label class="text-gray-700" for="endDate">
        <span class="dark:text-dark-accent">End Date:</span>
        <input
          :disabled="this.status !== 'FINISHED'"
          ref="endDate"
          :value="endDate"
          @change="onEndChange"
          type="date"
          class="
            disabled:opacity-70
            appearance-none
            border
            w-full
            py-1
            px-2
            text-gray-700
            placeholder-gray-400
            rounded-lg
            text-base
            focus:outline-none
            focus:ring-2
            focus:border-transparent
            flex-1
            bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-900 dark:text-gray-100
          "
        />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: ["startDate", "endDate", "id", "status"],
  methods: {
    async onStartChange($event) {
      const value = $event.target.value;
      if (!value) {
        this.$toast.error("No date selected", {
          position: "bottom-right",
          duration: 3000
        });
        this.$refs.startDate.value = this.startDate;
        return;
      }
      const { data, error } = await this.$supabase
        .from("usersbooks")
        .update({ startDate: value })
        .eq("id", this.id);
      if (error) {
        console.log(error);
      } else {
        this.$toast.success("Successfully modified start date.", {
          position: "bottom-right",
          duration: 3000
        });
      }
    },
    async onEndChange($event) {
      const value = $event.target.value;
      if (!value) {
        this.$toast.error("No date selected", {
          position: "bottom-right",
          duration: 3000
        });
        return;
      }

      if (this.status !== "FINISHED") {
        this.$toast.error("You need to finish the book first.", {
          position: "bottom-right",
          duration: 5000
        });
        console.log(this.$refs.endDate.value);
        this.$refs.endDate.value = this.endDate;
        return;
      }

      const { data, error } = await this.$supabase
        .from("usersbooks")
        .update({ endDate: value })
        .eq("id", this.id);
      if (error) {
        console.log(error);
      } else {
        this.$toast.success("Successfully modified end date.", {
          position: "bottom-right",
          duration: 3000
        });
      }
    }
  }
};
</script>
