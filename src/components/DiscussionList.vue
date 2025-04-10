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
            // Charger toutes les discussions depuis Firebase Realtime Database
            const discussionsRef = db.ref('discussions'); // Supposons que les discussions sont sous 'discussions' dans Firebase
            discussionsRef.on('value', (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    this.discussions = Object.keys(data).map((key) => ({
                        ...data[key],
                        id: key, // Ajout de l'ID de la discussion
                    }));
                }
            });
        },
    },
};
</script>
