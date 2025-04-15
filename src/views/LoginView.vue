<template>
  <div class="bigbro">
    <div class="page-container"></div>
    <div class="flexy">
      <div class="form-container">
        <form @submit.prevent="loginUser" class="form">
          <div class="title">
            <h1>Log-in</h1>
          </div>
          <div class="form-group">
            <label>EMAIL</label>
            <input type="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label>PASSWORD</label>
            <input type="password" v-model="password" required />
          </div>
          <button type="submit">SIGN IN</button>
          <div class="signup-prompt">
            <p class="signup-text">
              Create an account
              <router-link to="/signup" class="signup-link">Sign up</router-link>
            </p>
          </div>
          <router-link to="/Forgot" class="forgot-password">Forgot Password?</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { loginWithEmailAndPassword } from "../firebase-config";
import {auth, db} from "../firebase-config";
import { doc, getDoc } from "firebase/firestore"; // make sure you imported these at the top

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async loginUser() {
      console.log('Attempting to login with email:', this.email);
      try {
         await loginWithEmailAndPassword(this.email, this.password);
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          console.log("Login successful, user:", userDocSnap.data().username);
        } else {
          console.log("No such user document found.");
        }

        this.$router.push("/Profile");
      } catch (error) {
        console.error('Login error:', error);
        if (error.code === "auth/wrong-password") {
          console.warn('Wrong password detected');
          alert("Wrong password. Redirecting to reset page...");
          this.$router.push("/Forgot");
        } else if (error.code === "auth/user-not-found") {
          console.warn('User not found');
          alert("User not found.");
        } else {
          console.error('Unexpected error:', error);
          alert("Error: " + error.message);
        }
      }
    },
  },
}
</script>


<style scoped>
.bigbro {
  overflow: hidden;
}

.page-container {
  position: absolute;
  overflow: hidden;
  width: 110%;
  height: 120%;
  top: -10%;
  left: -10%;
  background: linear-gradient(to right, #003f5c, #58508d, #bc5090);
}

.flexy {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
}

.form-container {
  width: 40%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  background-color: rgba(216, 216, 216, 0.1);
  backdrop-filter: blur(400%);
  -webkit-backdrop-filter: blur(400%);
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
  transition: border-color 0.3s ease-in;
}

.form-container:hover {
  border-color: rgb(241, 241, 241);
  box-shadow: 0 0 40px rgba(212, 212, 212, 0.5);
}

.form {
  width: 60%;
}

h1 {
  font-size: 60px;
  font-weight: 700;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  letter-spacing: -1px;
  margin-bottom: 20px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  margin: 20px 0;
}

label {
  font-weight: 600;
  margin-bottom: 5px;
  color: white;
}

input {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.8);
  transition: border-color 0.3s ease-in-out;
}

input:focus {
  outline: none;
  border-color: #bc5090;
  box-shadow: 0 0 10px rgba(188, 80, 144, 0.5);
}

button {
  height: fit-content;
  width: 150px;
  padding: 10px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  color: white;
  background-color: #58508d;
  cursor: pointer;
}

button:hover {
  background-color: #bc5090;
  transform: translateY(-2px) scale(1.05);
  transition: transform 0.2s ease;
}

.terms {
  display: flex;
  flex-direction: row;
  align-self: center;
  margin-bottom: 10px;
}
.signup-prompt {
  margin-top: 20px;
  color: white;
}

.signup-prompt a {
  color: #bc5090;
  text-decoration: none;
}

.signup-prompt a:hover {
  text-decoration: underline;
}
</style>