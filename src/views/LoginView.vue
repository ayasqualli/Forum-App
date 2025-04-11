
<template>
    <div class="bigbro">
        <div class="page-container">
        </div>
        <div class="flexy">
            <div class="form-container">
            <form class="form">
                <div class="title">
                <h1>Log-in</h1>
                </div>
                <div class="form-group">
                <label> USERNAME </label>
                <input type="text" v-model="username" />
                </div>
                <div class="form-group">
                <label> PASSWORD </label>
                <input type="password" v-model="password" />
                </div>
                <button>SIGN IN</button>
            </form>
            <div class="signup-prompt">
                <p class="signup-text">
                Create an account
                <router-link to="/signup" class="signup-link">Sign up</router-link>
                </p>
            </div>
            </div>
            <button>SIGN IN</button>
            <router-link to="/Forgot">Forgot Password</router-link>
        </form>
        <div>Create an  account <router-link to="/signup">Sign up</router-link></div>

        
    </div>
  </template>
  
  <script>
import { loginWithEmailAndPassword } from "./firebase-config"; 
  export default {
    name: 'login',
    components: {
      
    },
    data(){
        return{
            username: '',
            password: '',
        }
    },
    methods: {
    async loginUser() {
      try {
        await loginWithEmailAndPassword(this.username, this.password);
        this.$router.push("/Profile"); // or home page
      } catch (error) {
        if (error.code === "auth/wrong-password") {
          alert("Wrong password. Redirecting to reset page...");
          this.$router.push("/Forgot");
        } else if (error.code === "auth/user-not-found") {
          alert("User not found.");
        } else {
          alert("Error: " + error.message);
        }
      }
    },
  },
  }
  </script>
  