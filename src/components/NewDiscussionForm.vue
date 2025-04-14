<template>
  <div class="whole">
    <div class="page-container"></div>
    <div class="flex-container">
      <div class="form-container">
        <form class="form" @submit.prevent="submitDiscussion">
          <div class="title">
            <h1>Create New Discussion</h1>
          </div>
          <div class="form-group">
            <label>Title :</label>
            <input v-model="title" required />
          </div>
          <div class="form-group">
            <label>Content :</label>
            <textarea v-model="content" required></textarea>
          </div>

          <div class="form-group">
            <label>Categorie :</label>
            <input v-model="categorie" required />
          </div>

          <button type="submit">Publish</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from "../firebase-config";
import { collection, addDoc, serverTimestamp, updateDoc } from "firebase/firestore";

export default {
  name: "NewDiscussion",
  data() {
    return {
      title: "",
      content: "",
      categorie: "",
    };
  },
  methods: {
    async submitDiscussion() {
      console.log("Starting discussion submission..."); // Debug log
      const user = auth.currentUser;

      if (!user) {
        console.warn("No user found, redirecting to login"); // Debug log
        alert("You have to be logged in to create a discussion.");
        this.$router.push("/login");
        return;
      }

      try {
        console.log("Creating discussion document..."); // Debug log
        const docRef = await addDoc(collection(db, "discussions"), {
          date_de_creation: new Date().toISOString(),
          categorie: this.categorie,
          titre: this.title,
          contenu: this.content,
          userId: user.uid,
          auteur: user.displayName || "Anonyme",
          createdAt: serverTimestamp(),
        });
        
        // Update the document to add the discussionId
        await updateDoc(docRef, {
          discussionId: docRef.id
        });
        
        console.log("Discussion created with ID:", docRef.id); // Debug log
        alert("Discussion created !");
        this.title = "";
        this.content = "";
        this.$router.push("/");
      } catch (error) {
        console.error("Error creating discussion:", error); // Enhanced error log
        alert("Error!");
      }
    },
  },
};
</script>

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
  background-color: rgb(243, 151, 149);
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
  width: 100%;
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
  margin: 5px 0; 
  padding: 5px;
}

</style>
