<template>
   <nav-bar></nav-bar>
   <search-bar></search-bar>
   <discussion-item></discussion-item>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import SearchBar from '@/components/SearchBar.vue'; 
import DiscussionItem from '@/components/DiscussionItem.vue'; 

export default {
   name: 'Home',
   components: {
      NavBar, 
      SearchBar,
      DiscussionItem
   }
}
</script>

<style scoped>
</style>