<template>
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <router-link to="/" class="home-link">Go back to Home</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound'
  }
  </script>
  
  <style scoped>
  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  
  h1 {
    font-size: 3rem;
    color: #ff4444;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
  }
  
  .home-link {
    padding: 10px 20px;
    background-color: #632382;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .home-link:hover {
    background-color: #632382;
  }
  </style>