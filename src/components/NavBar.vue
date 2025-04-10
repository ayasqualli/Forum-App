<template>
    <nav>
      <div class="logo">
        <img src="../assets/logo.png" />
      </div>
      <div class="nav-links">
        <div class="link-wrapper">
          <router-link to="/" class="nav-button">Home</router-link>
          <div class="hover"></div>
        </div>
        <div class="link-wrapper">
          <router-link to="/new-discussion" class="nav-button">Create Discussion</router-link>
          <div class="hover"></div>
        </div>
        <div class="link-wrapper">
          <router-link to="/all" class="nav-button">All Discussions</router-link>
          <div class="hover"></div>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  nav {
    background-color: #001d5c;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 120px;
    width: 100%;
    border-radius: 10px;
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  
  .logo {
    margin-left: 10px;
    margin-right: auto;
  }
  
  img {
    max-height: 20%;
    max-width: 30%;
    height: auto;
    width: auto;
    margin-left: 10px;
  }
  
  .nav-links {
    color: white;
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-right: 20px;
    font-weight: bold;
    font-size: 20px;
  }
  
  .nav-button {
    color: white;
    text-decoration: none;
    background-color: #001d5c;
    margin: 10px 10px 5px 10px;
    width: fit-content;
    padding: 0;
  }
  
  .link-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .nav-button:hover {
    color: #bc5090;
    transition: color 0.3s ease;
    transform: scale(1.05);
  }
  
  .hover {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #bc5090;
    transition: width 0.3s ease;
  }
  
  .link-wrapper:hover .hover {
    width: 100%;
  }
  </style>
  