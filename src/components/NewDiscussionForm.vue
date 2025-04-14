<template>
    <div class="new-discussion-form">
      <h2>New discussion</h2>
      <form @submit.prevent="submitDiscussion">
        <label>Title :</label>
        <input v-model="titre" required />
  
        <label>Content :</label>
        <textarea v-model="contenu" required></textarea>

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
        titre: "",
        contenu: "",
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
          this.titre = "";
          this.contenu = "";
          this.$router.push("/");
        } catch (error) {
          console.error("Error :", error);
          alert("Error!");
        }
      }
    }
  };
  </script>
