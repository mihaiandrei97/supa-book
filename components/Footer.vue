<template>
  <footer
    class="flex justify-between -mt-12 container bg-transparent dark:bg-gray-800 dark:text-dark-accent text-gray-600 py-3 px-10 mx-auto max-w-3xl lg:max-w-5xl -mb-4 rounded-t-lg text-center"
  >
    <p>
      ©2021 Made with ❤ by
      <a
        class="font-bold"
        target="_blank"
        href="https://twitter.com/MihaiAdrianAnd1"
        >Andrei Mihai</a
      >
    </p>
    <nuxt-link v-if="authenticated" to="/contact">Contact</nuxt-link>
  </footer>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(["authenticated"]),
  },
};
</script>
