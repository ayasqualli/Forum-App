<template>
    <div>
      <h2>Reset Your Password</h2>
      <form @submit.prevent="resetPassword">
        <label>New Password</label>
        <input type="password" v-model="newPassword" required />
        <button type="submit">Update Password</button>
      </form>
    </div>
  </template>
  <script>
  import { verifyResetCode, confirmReset } from "../firebase-config";

export default {
  data() {
    return {
      newPassword: "",
      oobCode: "",
    };
  },
  async mounted() {
    this.oobCode = this.$route.query.oobCode;
    if (!this.oobCode) {
      alert("Missing token.");
      this.$router.push("/login");
    }

    try {
      await verifyResetCode(this.oobCode);
    } catch (err) {
      alert("Invalid or expired reset link.");
      this.$router.push("/login");
    }
  },
  methods: {
    async resetPassword() {
      try {
        await confirmReset(this.oobCode, this.newPassword);
        alert("Password updated! You can now log in.");
        this.$router.push("/login");
      } catch (err) {
        alert("Failed to reset password: " + err.message);
      }
    },
  },
};
</script>