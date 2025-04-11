<template>
    <div class="new-discussion-form">
      <h2>New discussion</h2>
      <form @submit.prevent="submitDiscussion">
        <label>Title :</label>
        <input v-model="title" required />
  
        <label>Content :</label>
        <textarea v-model="content" required></textarea>
  
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
        content: ""
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
            categorie: '',
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

  