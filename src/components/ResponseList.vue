<template>
  <div>
    <div v-if="responses.length === 0" class="no-responses">
      Aucune réponse pour le moment.
    </div>
    <div v-else>
      <div v-for="response in responses" :key="response.documentId" class="response-item">
        <h4>{{ response.auteur }} - {{ response.date_de_creation }}</h4>
        <p><strong>Catégorie :</strong> {{ response.categorie }}</p>
        <p>{{ response.contenu }}</p>
        <hr/>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { db } from '../firebase-config';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';

export default {
  props: {
    discussionId: {
      type: String,
      required: true
    },
    newResponse: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const responses = ref([]);

    const addResponse = (response) => {
      if (response) {
        responses.value = [response, ...responses.value];
      }
    };

    const fetchResponses = async () => {
      try {
        console.log("Fetching responses for discussion document ID:", props.discussionId);
        
        const q = query(
          collection(db, "responses"),
          where("discussionId", "==", props.discussionId)
        );

        const querySnapshot = await getDocs(q);
        console.log("Found responses:", querySnapshot.docs.length);
        
        responses.value = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            documentId: doc.id,
            authorId: data.authorId,
            ...data
          };
        });
      } catch (error) {
        console.error("Erreur lors du chargement des réponses :", error);
      }
    };

    // Watch for new responses from parent
    watch(() => props.newResponse, (newVal) => {
      if (newVal) {
        addResponse(newVal);
      }
    });

    // Set up real-time listener
    onMounted(() => {
      if (!props.discussionId) {
        console.error("No discussionId provided");
        return;
      }

      console.log("Setting up real-time listener for discussion:", props.discussionId);
      const q = query(
        collection(db, "responses"),
        where("discussionId", "==", props.discussionId)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log("Real-time update received, responses count:", snapshot.docs.length);
        responses.value = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            documentId: doc.id,
            authorId: data.authorId,
            ...data
          };
        });
      }, (error) => {
        console.error("Error in real-time listener:", error);
      });

      // Initial fetch
      fetchResponses();

      // Clean up listener when component is unmounted
      return () => unsubscribe();
    });

    return {
      responses,
      refreshResponses: fetchResponses
    };
  }
};
</script>

<style scoped>
.response-item {
  margin-bottom: 1.5em;
  padding: 1em;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.no-responses {
  text-align: center;
  padding: 2em;
  color: #666;
  font-style: italic;
}
</style>
