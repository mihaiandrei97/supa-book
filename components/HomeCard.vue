<template>
  <NuxtLink
    :to="`/books/${item.isbn}`"
    class="flex flex-col md:flex-row rounded-lg bg-white hover:bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-900 dark:hover:bg-gray-900 shadow-md items-center my-2"
    style="min-height: 200px;"
  >
    <img
      class="h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
      :src="item.imageLink"
      alt=""
      style="max-width: 128px;"
    />
    <div class="p-4 flex flex-col justify-between leading-normal">
      <h5 class="text-gray-900 dark:text-dark-accent font-bold text-2xl tracking-tight mb-2">
        {{ item.title }}
      </h5>
      <p class="font-normal text-gray-700 mb-3 dark:text-gray-200">
        {{
          item.description.length > 200
            ? `${item.description.substring(0, 200)}...`
            : item.description
        }}
      </p>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: ["item"]
};
</script>
