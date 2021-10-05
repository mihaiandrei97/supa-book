<template>
  <div>
    <div style="border-bottom: 2px solid #eaeaea">
      <ul class="flex cursor-pointer">
        <li
          :class="
            `py-2 px-6 ${
              tab.value === currentTab
                ? 'bg-white'
                : 'bg-gray-200 text-gray-500'
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
    <p class="my-4" v-if="!isMyList">
      This area is disabled until you add the book to your list.
    </p>
    <keep-alive>
      <component
      @onNotesChanged="onNotesChanged"
        :disabled="!isMyList"
        :notes="notes"
        :is="currentTab === 'COMMENTS' ? 'comments' : 'notes'"
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
      default: ''
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
      if(!value) return

      const { data, error } = await this.$supabase
        .from("usersbooks")
        .update({ notes: value })
        .eq("id", this.id);
      
      if(error) {
        console.log(error)
      } else {
        this.$toast.success("Notes saved.", {
          position: "bottom-right",
          duration: 3000
        });
      }
    }
  },
};
</script>
