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
        </div>
    </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  data() {
    return {
      username: "",
      password: "",
    };
  },
};
</script>

<style scoped>

.bigbro{
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

.flexy{
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
.title {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
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
}
button:hover {
  background-color: #bc5090;
  transform: translateY(-2px) scale(1.05);
  transition: transform 0.2s ease;
}
.signup-prompt {
  margin-top: 20px;
  text-align: center;
}
.signup-text {
  color: #f8f8f8;
  font-size: 18px;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  margin-right: 10px;
}
.signup-link {
  color: #bc5090;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}
.signup-link:hover {
  color: #ff6361;
  text-decoration: underline;
}
.signup-prompt:hover .signup-text {
  opacity: 1;
}
</style>
