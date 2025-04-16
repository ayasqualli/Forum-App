<template>
  <div class="new-discussion-form">
    <h2>New discussion</h2>
    <form @submit.prevent="submitDiscussion">
      <label>Title :</label>
      <input v-model="title" required />

      <label>Content :</label>
      <textarea v-model="content" required></textarea>

      <label>Categorie :</label>
      <input v-model="categorie" required />

      <button type="submit">Publish</button>
    </form>
  </div>
</template>

<script>
import { db, auth } from "../firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default {
  data() {
    return {
      title: "",
      content: "",
      categorie: ""
    };
  },
  methods: {
    async submitDiscussion() {
      const user = auth.currentUser;
      console.log(user);
      if (!user) {
          alert("You have to be logged in to create a discussion.");
          this.$router.push("/login");
          return;
      }

      try {
        await addDoc(collection(db, "discussions"), {

         

          date_de_creation: new Date().toISOString(),
          categorie: this.categorie,
          titre: this.title,
          contenu: this.content,
          id: user.uid,
          auteur: user.displayName || "Anonyme",
          createdAt: serverTimestamp()
        });
        alert("Discussion created !");
        this.title = "";
        this.content = "";
        this.$router.push("/");
      } catch (error) {
        console.error("Error :", error);
        alert("Error!");
      }
    }
  }
};
</script>

<<<<<<< HEAD
<style scoped>
.whole {
  overflow: hidden;
  color: white;
}

.page-container {
  position: absolute;
  overflow: hidden;
  width: 110%;
  height: 120%;
  top: -10%;
  left: -10%;
  background-color: rgb(255, 189, 186);
}

.flex-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;

}

.form-container {
  width: 50%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  background-color: rgba(216, 216, 216, 0.1);
  backdrop-filter: blur(400%);
  -webkit-backdrop-filter: blur (400%);
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.form {
  width: 60%;
}

h1 {
  font-size: 50px;
  font-weight: 700;
  align-items: center;
  justify-content: center;
  color: white;
  letter-spacing: -1px;
  margin-bottom: 20px;
  text-shadow: 1px 1px 3px rgb(0, 0, 0, 0.4);
}

.form-group {
  margin: 20px 0; 
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

label{
  font-weight: 600;
  margin-bottom: 5px;
}

input {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  background-color: rgb(255, 255, 255, 0.8);
  transition: border-color 0.3s ease-in-out;
}

input:focus{
  outline: none;
  border-color: #ff6361;
  box-shadow: 0 0 10px #dc5654;
}

button{
  height: fit-content;
  width: 150px;
  padding: 10px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  background-color: 
}

</style>
=======
>>>>>>> 45013529f47600c7163ea0665962d8fc73458e71
