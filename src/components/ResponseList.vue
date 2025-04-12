<template>
  <div>
    <div>
      <div v-for="(response, index) in responses" :key="index" class="response-item">
        <h4>{{ response.auteur }} - {{ response.date_de_creation }}</h4>
        <p><strong>Catégorie :</strong> {{ response.categorie }}</p>
        <p>{{ response.contenu }}</p>
        <hr/>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase-config';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';

export default {
  props: {
    discussionId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const responses = ref([]);

    const fetchResponses = async () => {
      try {
        console.log("Fetching responses for discussionId:", props.discussionId);
        console.log("Type of discussionId:", typeof props.discussionId);
        
        // First, let's check all responses in the collection
        const allResponses = await getDocs(collection(db, "responses"));
        console.log("All responses in collection:", allResponses.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));

        const q = query(
          collection(db, "responses"),
          where("discussionId", "==", props.discussionId)
        );

        const querySnapshot = await getDocs(q);
        console.log("Found responses:", querySnapshot.docs.length);
        console.log("Query results:", querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
        
        responses.value = querySnapshot.docs.map(doc => {
          const data = doc.data();
          console.log("Response data:", data);
          return {
            id: doc.id,
            ...data
          };
        });
      } catch (error) {
        console.error("Erreur lors du chargement des réponses :", error);
      }
    };

    // Set up real-time listener
    onMounted(() => {
      console.log("ResponseList mounted with discussionId:", props.discussionId);
      console.log("Type of discussionId:", typeof props.discussionId);
      
      const q = query(
        collection(db, "responses"),
        where("discussionId", "==", props.discussionId)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log("Real-time update received. Number of responses:", snapshot.docs.length);
        console.log("Query results:", snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
        
        responses.value = snapshot.docs.map(doc => {
          const data = doc.data();
          console.log("Response data:", data);
          return {
            id: doc.id,
            ...data
          };
        });
      });

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
