<template>
   <nav-bar></nav-bar>
   <search-bar></search-bar>
   <!-- <disc-item></disc-item> -->
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import SearchBar from '@/components/SearchBar.vue'; 
// import DiscItem from '@/components/DiscItem.vue'; 

export default {
   name: 'Home',
   components: {
      NavBar, 
      SearchBar,
      // DiscItem,
   }
}
</script>

<style scoped>
</style>