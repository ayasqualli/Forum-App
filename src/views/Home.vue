<template>
   <nav-bar></nav-bar>
   <search-bar></search-bar>
   <disc-item></disc-item>
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