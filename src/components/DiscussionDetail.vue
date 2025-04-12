<template>
  <div v-if="discussion">
    <h2>{{ discussion.titre }}</h2>
    <div>{{ discussion.date_de_creation }}</div>
    <div>{{ discussion.auteur }}</div>
    <p>{{ discussion.contenu }}</p>
    <p>{{ discussion.categorie }}</p>

    <button @click="repondre">Répondre</button>

    <!-- Formulaire de réponse -->
    <form v-if="showForm" class="formulaire_pour_répondre">
      <h3>Veuillez entrer votre réponse ici : </h3>

      <label>Date de création :</label>
      <input v-model="response.date_de_creation" type="date" />

      <label>Auteur :</label>
      <input v-model="response.auteur" type="text" />

      <label>Catégorie :</label>
      <input v-model="response.categorie" type="text" />

      <label>Réponse :</label>
      <textarea v-model="response.contenu"></textarea>

      <button type="button" @click="submitResponse">SUBMIT</button>
    </form>

    <h3>Réponses :</h3>
    <ResponseList :discussionId="discussion.id" ref="responseList" />
  </div>

  <div v-else>
    <p>Chargement de la discussion...</p>
  </div>
</template>

<script>
import { db } from '../firebase-config';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import ResponseList from './ResponseList.vue';

export default {
  components: {
    ResponseList
  },
  data() {
    return {
      discussion: null,
      showForm: false,
      showresponse: false,
      response: {
        date_de_creation: new Date().toISOString().split("T")[0],
        auteur: '',
        categorie: '',
        contenu: ''
      }
    };
  },
  created() {
    const discussionId = this.$route.params.id;
    console.log("ID de la discussion :", discussionId); // 🔍 Debug
    this.fetchDiscussionDetail(discussionId);
  },
  methods: {
    repondre() {
      this.showForm = !this.showForm;
    },
    afficher() {
      this.showresponse = !this.showresponse;
    },
    async submitResponse() {
      const discussionId = this.$route.params.id;
      try {
        await addDoc(collection(db, "responses"), {
          discussionId,
          ...this.response
        });
        console.log("Réponse ajoutée avec succès");
        this.showForm = false;
        this.clearForm();
        // Refresh the responses list
        this.$refs.responseList.refreshResponses();
      } catch (error) {
        console.error("Erreur lors de l'ajout de la réponse :", error);
      }
    },
    clearForm() {
      this.response = {
        date_de_creation: new Date().toISOString().split("T")[0],
        auteur: '',
        categorie: '',
        contenu: ''
      };
    },
    async fetchDiscussionDetail(id) {
      try {
        console.log("Fetching discussion with ID:", id);
        const docRef = doc(db, "discussions", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.discussion = { id: docSnap.id, ...docSnap.data() };
          console.log("Discussion data:", this.discussion);
        } else {
          console.log("Aucune discussion trouvée");
        }
      } catch (error) {
        console.error("Erreur de récupération :", error);
      }
    }
  }
};
</script>
