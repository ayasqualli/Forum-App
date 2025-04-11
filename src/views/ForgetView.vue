<template>
    <div>
    <form @submit.prevent="sendReset">
      <label>Email</label>
      <input type="email" v-model="email" required />
      <button type="submit">Send Reset Email</button>
    </form>
  </div>
  </template>
  
  <script>
import { sendPasswordReset } from "@/firebase";
  export default {
    
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async sendReset() {
      try {
        await sendPasswordReset(this.email);
        alert("Reset email sent! Check your inbox.");
      } catch (err) {
        alert("Error: " + err.message);
      }
    },
  },
  }
  </script>
  