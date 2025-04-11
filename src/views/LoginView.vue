
<template>
    <div>
        <form @submit.prevent="loginUser">
            <legend>
                Log in
            </legend>
            <div>
                <label>
                    USERNAME
                </label>
                <input type="text" v-model="username">
            </div>
            <div>
                <label>
                    PASSWORD
                </label>
                <input type="password" v-model="password">
            </div>
            <button>SIGN IN</button>
            <router-link to="/Forgot">Forgot Password</router-link>
        </form>
        <div>Create an  account <router-link to="/signup">Sign up</router-link></div>

        
    </div>
  </template>
  
  <script>
import { loginWithEmailAndPassword } from "@/firebase"; 
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
        this.$router.push("/dashboard"); // or home page
      } catch (error) {
        if (error.code === "auth/wrong-password") {
          alert("Wrong password. Redirecting to reset page...");
          this.$router.push("/forgot");
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
  