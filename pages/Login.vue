<template>
  <main class="flex justify-center mt-16">
    <div
      class="flex flex-col w-full max-w-md px-4 py-8 bg-gray-100 rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10"
    >
      <div v-if="!submitted">
        <div
          class="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-dark-accent"
        >
          Send Magic Link
        </div>
        <div>
          <form @submit.prevent="signIn" autoComplete="off">
            <div class="flex flex-col mb-2">
              <div class="flex relative ">
                <span
                  class="rounded-l-md inline-flex  items-center px-3 border-t  border-l border-b   text-gray-500 shadow-sm text-sm bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-900 dark:text-gray-100"
                >
                  <svg
                    width="15"
                    height="15"
                    fill="currentColor"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"
                    ></path>
                  </svg>
                </span>
                <input
                  type="text"
                  id="sign-in-email"
                  class=" rounded-r-lg flex-1 appearance-none border w-full py-2 px-4  text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-900 dark:text-gray-100"
                  placeholder="Your email"
                  v-model="email"
                />
              </div>
            </div>

            <div class="flex w-full mt-8">
              <button
                type="submit"
                class="py-2 px-4  bg-green-800 hover:bg-green-700 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <div v-if="submitted">
        <div class="bg-gray-100 dark:bg-gray-800 p-2 text-center">
          
            <h2
              class="text-2xl font-extrabold text-gray-700 dark:text-gray-100 sm:text-2xl"
            >
              <span class="block mb-4 text-gray-900 dark:text-dark-accent">
                Please check your email to sign in.
              </span>
            </h2>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  layout: "login",
  data: () => ({
    submitted: false,
    email: ""
  }),
  methods: {
    async signIn() {
      this.$store.dispatch("setLoading");
      /* signIn sends the user a magic link */
      const { email } = this;
      if (!email) return;
      const { error, data } = await this.$supabase.auth.signIn({
        email
      });
      this.submitted = true;
      this.$store.dispatch("clearLoading");
    }
  }
};
</script>
