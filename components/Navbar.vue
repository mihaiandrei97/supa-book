<template>
  <nav class="mt-10 px-6 flex flex-wrap md:block">
    <NuxtLink
      exact
      to="/"
      class="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-2 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
      href="#"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
          clip-rule="evenodd"
        />
      </svg>
      <span class="mx-4 text-lg font-normal">
        Discover
      </span>
      <span class="flex-grow text-right"></span>
    </NuxtLink>
    <NuxtLink
      to="/my-list"
      class="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-2 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-100 rounded-lg dark:bg-gray-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
      </svg>
      <span class="mx-4 text-lg font-normal">
        My List
      </span>
      <span class="flex-grow text-right"> </span>
    </NuxtLink>
    <NuxtLink
      to="/finished"
      class="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-2 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
      href="#"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"
        />
      </svg>
      <span class="ml-4 text-lg font-normal">
        Finished
      </span>
      <span class="flex-grow text-right">
        <button
          type="button"
          class="w-6 h-6 text-xs  rounded-full text-white bg-red-500"
        >
          <span class="p-1">
            7
          </span>
        </button>
      </span>
    </NuxtLink>
  </nav>
</template>
