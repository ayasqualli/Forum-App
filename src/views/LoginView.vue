<template>
    <div>
        <form>
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
        </form>
        <div>Create an  account <router-link to="/signup">Sign up</router-link></div>
    </div>
  </template>
  
  <script>

  export default {
    name: 'login',
    components: {
      
    },
    data(){
        return{
            username: '',
            password: '',
        }
    }
  }
  </script>
  