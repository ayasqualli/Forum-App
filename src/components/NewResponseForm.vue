<template>
    <form @submit.prevent="submitResponse" class="response-form">
      <textarea v-model="content" placeholder="Write your response..." required></textarea>
      <button type="submit">Post Response</button>
    </form>
</template>
  
<script>
  import { db, auth } from "../firebase-config";
  import { collection, addDoc, serverTimestamp } from "firebase/firestore";
  
  export default {
    name: "NewResponseForm",
    props: {
      discussionId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        content: ""
      };
    },
    methods: {
      async submitResponse() {
        const user = auth.currentUser;
  
        if (!user) {
            alert("You have to be logged in to respond.");
            this.$router.push("/login");
            return;
        }
  
        try {
          await addDoc(collection(db, "responses"), {

            date_de_creation: new Date().toISOString(),
            discussionId: this.discussionId,
            contenu: this.content,
            id: user.uid,
            auteur: user.displayName || "Anonyme",
            createdAt: serverTimestamp()
          });
          alert("Response created !");
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

  
  <style scoped>
  textarea {
    width: 100%;
    min-height: 80px;
    margin-bottom: 10px;
  }
  button {
    padding: 5px 10px;
  }
  </style>
  