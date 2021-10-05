<template>
  <div class="max-w-5xl mx-auto flex flex-col md:flex-row min-h-screen">
    <div  v-if="loading" class="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50 flex justify-center items-center">
      
        <svg
          width="100"
          height="100"
          fill="currentColor"
          class="mr-2 animate-spin"
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"
          ></path>
        </svg>
    </div>
    <div class="w-full md:w-3/12">
      <div
        class="flex items-center justify-start flex-row mx-auto md:flex-col lg:flex-row lg:mx-6 mt-10 w-52"
      >
        <img
          class="h-10"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Closed_Book_Icon.svg/768px-Closed_Book_Icon.svg.png"
        />
        <span class="text-gray-600 dark:text-gray-300 ml-4 text-2xl font-bold">
          Supa-Book
        </span>
      </div>
      <Navbar :authenticated="authenticated" />
    </div>
    <div class="w-full md:w-9/12 py-10 px-4">
      <Nuxt keep-alive :keep-alive-props="{include: ['Homepage']}"/>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      authenticated: null,
      authListener: null,
    };
  },
  computed: {
    ...mapState([
      'loading',
    ])
  },
  async mounted() {
    /* When the app loads, check to see if the user is signed in */
    /* also create a listener for when someone signs in or out */
    const { data: authListener } = this.$supabase.auth.onAuthStateChange(() =>
      this.checkUser()
    );
    this.authListener = authListener;
    this.checkUser();
  },
  methods: {
    async checkUser() {
      const user = await this.$supabase.auth.user();
      if (user) {
        this.authenticated = true;
        this.$store.dispatch('setAuthenticated')
      } else {
        this.authenticated = false;
        this.$store.dispatch('clearAuthenticated')
      }
    },
  },
  beforeUnmount() {
    this.authListener?.unsubscribe();
  },
};
</script>

