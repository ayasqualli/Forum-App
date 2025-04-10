<template>
    <div>
      <div v-for="(response, index) in responses" :key="index">
        <ResponseItem :response="response" />
      </div>
    </div>
  </template>
  
  <script>
  import { db } from '../firebase-config';
  import { ref, onMounted } from 'vue';
  import ResponseItem from './ResponseItem.vue'; 
  
  export default {
    components: {
      ResponseItem
    },
    props: {
      discussionId: String 
    },
    setup(props) {
      const responses = ref([]);
  
      // Récupérer les réponses liées à la discussion
      onMounted(async () => {
        const querySnapshot = await db.collection('responses')
          .where('discussionId', '==', props.discussionId) // Filtrer par l'ID de la discussion
          .get();
        
        querySnapshot.forEach(doc => {
          responses.value.push(doc.data());
        });
      });
  
      return {
        responses
      };
    }
  };
  </script>
  