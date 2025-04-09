<template>
      <div class="search-container">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search forum posts by title or author..." 
            class="search-input"
          >
          <button @click="applyFilters" class="apply-button">Search</button>
          <button @click="ResetFilters" class="reset-button">Clear</button>
        </div>
      </div>
</template>

<script>
import { db } from "../firebase-config.js";
export default {
    data() {
        return {
            posts: [],
            searchQuery: "",
        };
    },
    methods: {
        applyFilters() {
            let filteredPosts = this.posts;
            
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filteredPosts = filteredPosts.filter(post => {
                    return post.title.toLowerCase().includes(query) || post.author.toLowerCase().includes(query);
                });
            }

            this.$emit('filtered', filteredPosts);
        },
        ResetFilters() {
            this.searchQuery = '';
            this.$emit('filtered', this.posts);
        }
    },
    async created() {
        try {
            const snapshot = await db.collection('discussions').get();
            this.posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            this.applyFilters();
        } catch (error) {
            console.error('Error fetching posts from Firestore:', error);
        }
    }
};
</script>

<style scoped>
.search-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 20px;
}

.search-box {
    display: flex;
    justify-content: center;
    align-items: center; /* Added to align buttons with the input */
    margin-bottom: 15px;
    width: 100%;
}

.search-input {
    padding: 15px 20px;
    border: 2px solid #e0e0e0;
    border-radius: 30px;
    font-size: 16px;
    min-width: 70%;
    transition: all 0.3s ease;
    background-color: #f8f8f8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.search-input:focus {
    outline: none;
    border-color: #58508d;
    background-color: white;
    box-shadow: 0 4px 8px rgba(88, 80, 141, 0.1);
    transform: scale(1.02);
}

.search-input::placeholder {
    color: #999;
    font-style: italic;
}

.apply-button, .reset-button {
    padding: 8px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    margin-left: 10px; /* Adjusted margin for spacing */
}

.apply-button {
    background-color: #58508d;
    color: white;
}

.reset-button {
    background-color: #bc5090;
    color: white;
}

.apply-button:hover, .reset-button:hover {
    transform: translateY(-2px) scale(1.05);
    transition: transform 0.2s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>