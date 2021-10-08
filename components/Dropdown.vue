<template>
  <select :value="value" @input="$emit('input',$event.target.value)" class="block w-52 text-gray-700 py-2 px-3 border border-gray-300 dark:bg-gray-800 dark:border-gray-900 dark:text-gray-100 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="animals">
    
    <option value="">
        All categories
    </option>
    <option v-for="item in items" :key="item" :value="item">
        {{item}}
    </option>
   
</select>

</template>

<script>
export default {
  props:['value'],
  data() {
    return {
      items: [
        "Adult",
        "Anthologies",
        "Art",
        "Audiobooks",
        "Biographies",
        "Body",
        "Business",
        "Children",
        "Comics",
        "Contemporary",
        "Cooking",
        "Crime",
        "Engineering",
        "Entertainment",
        "Fantasy",
        "Fiction",
        "Food",
        "General",
        "Health",
        "History",
        "Horror",
        "Investing",
        "Literary",
        "Literature",
        "Manga",
        "Memoirs",
        "Mind",
        "Mystery",
        "Nonfiction",
        "Religion",
        "Romance",
        "Science",
        "Self",
        "Spirituality",
        "Sports",
        "Superheroes",
        "Technology",
        "Thrillers",
        "Travel",
        "Women",
        "Young"
      ]
    };
  }
};
</script>
