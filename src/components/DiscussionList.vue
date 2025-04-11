<template>
    <div>
        <DiscussionItem
        v-for="discussion in discussions"
        :key="discussion.id"
        :discussion="discussion"
        />
    </div>
</template>
<script>
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";
import DiscussionItem from "./DiscussionItem.vue"; 

export default {
  components: {
    DiscussionItem,
  },
  data() {
    return {
      discussions: [],
    };
  },
  created() {
    this.fetchDiscussions();
  },
  methods: {
    fetchDiscussions() {
      const discussionsCollection = collection(db, "discussions");
      onSnapshot(discussionsCollection, (snapshot) => {
        this.discussions = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
      });
    },
  },
};
</script>

