<template>
  <div class="user-profile">
    <h2>My Profile</h2>
    <form @submit.prevent="updateProfile">
      <label>Name:</label>
      <input v-model="userData.name" />

      <label>Email:</label>
      <input v-model="userData.email" disabled />

      <label>Bio:</label>
      <textarea v-model="userData.bio" />

      <button type="submit">Update</button>
    </form>
  </div>
</template>
<script>
import { db, auth } from "../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      userData: {
        name: "",
        email: "",
        bio: ""
      }
    };
  },
  created() {
    this.waitForUser();
  },
  methods: {
    waitForUser() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            this.userData = {
              ...docSnap.data(),
              email: user.email, // just in case it's not in Firestore
            };
          }
        } else {
          console.warn("User not logged in.");
          this.$router.push("/login");
        }
      });
    },
    async updateProfile() {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, {
          name: this.userData.name,
          bio: this.userData.bio,
        });
        alert("Profile updated.");
        this.$router.push("/");
      }
    }
  }
};
</script>
