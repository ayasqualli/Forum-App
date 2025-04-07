<template>
    <div>
        <form>
            <legend>
                Sign up
            </legend>
            <div>
                <label>
                    NAME
                </label>
                <input type="text">
            </div>
            <div>
                <label>
                    USERNAME
                </label>
                <input type="text">
            </div>
            <div>
                <label>
                    EMAIL
                </label>
                <input type="email">
            </div>
            <div>
                <label>
                    PROFIL PICTURE
                </label>
                <input type="image">
            </div>
            <div>
                <input type="checkbox">
                <label>I read and agree to <span>Terms & Conditions</span></label>
            </div>
            <button>CREATE MY ACCOUNT</button>
        </form>
        <div>Already have  an  account <Router-link to="/login">Sign in</Router-link></div>
    </div>
  </template>
  
  <script>
import { RouterLink } from 'vue-router';


  export default {
    name: 'signup',
    components: {
      
    }
  }
  </script>