<template>
    <form @submit.prevent="submitResponse" class="response-form">
      <textarea v-model="content" placeholder="Write your response..." required></textarea>
      <button type="submit">Post Response</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        content: ""
      };
    },
    props: {
      postId: String 
    },
    methods: {
        submitResponse() {
            const user = auth.currentUser;

            if (!user) {
                alert("You must be logged in to respond.");
                this.$router.push("/login");
                return;
            }

            const response = {
                content: this.content,
                postId: this.postId,
                createdAt: new Date().toISOString(),
                userId: user.uid,
                email: user.email,
                author: user.displayName || "Anonyme"
            };

            this.$emit("new-response", response);
            this.content = "";
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
  