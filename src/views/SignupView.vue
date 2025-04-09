<template>
    <div>
      <form @submit.prevent="submitForm">
        <legend>Sign up</legend>
  
        <div>
          <label>NAME</label>
          <input type="text" v-model="name">
        </div>
  
        <div>
          <label>USERNAME</label>
          <input type="text" v-model="username">
        </div>

        <div>
            <label>PASSWORD</label>
          <input type="password" v-model="password">
        </div>
  
        <div>
          <label>EMAIL</label>
          <input type="email" v-model="email">
        </div>
  
        <div>
          <label>PROFILE PICTURE</label>
          <input type="file" @change="handleImageUpload">
          <img v-if="profilePicture" :src="profilePicture" alt="Preview" style="max-width: 200px; margin-top: 10px;" />
        </div>
  
        <div>
          <input type="checkbox" v-model="agreeToTerms">
          <label>I read and agree to <span>Terms & Conditions</span></label>
        </div>
  
        <button type="submit">CREATE MY ACCOUNT</button>
      </form>
  
      <div>
        Already have an account?
        <RouterLink to="/login">Sign in</RouterLink>
      </div>
    </div>
  </template>
  
  <script>
  import { RouterLink } from 'vue-router';
  
  export default {
    name: 'signup',
    components: {

    },
    data() {
      return {
        name: '',
        username: '',
        email: '',
        profilePicture: '',
        password:'',
        agreeToTerms: false
      };
    },
    methods: {
      handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.profilePicture = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      submitForm() {
        if (!this.agreeToTerms) {
          alert("You must agree to the terms and conditions.");
          return;
        }
      }
    }
  };
  </script>
  