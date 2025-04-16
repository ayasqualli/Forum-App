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
        this.categorie = "";
        this.$router.push("/");
      } catch (error) {
        console.error("Error :", error);
        alert("Error!");
      }
    }
  }
};
</script>

<style scoped>
.new-discussion-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  font-weight: bold;
}

input, textarea {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>