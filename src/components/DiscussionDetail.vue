<template>
    <div>
      <h2>{{ discussion.titre }}</h2>
      <div>{{ discussion.date_de_creation }}</div>
      <div>{{ discussion.auteur }}</div>
      <p>{{ discussion.contenu }}</p>
  
      <button @click="repondre">Répondre</button>
  
      <!-- Formulaire de réponse -->
      <form v-if="showForm" class="formulaire_pour_répondre">
        <h3>Veuillez entrer votre réponse ici : </h3>
        <label>Date de création : </label>
        <input v-model="response.date_de_creation" type="date" />
        <label>Auteur : </label>
        <input v-model="response.auteur" type="text" />
        <label>Catégorie : </label>
        <input v-model="response.categorie" type="text" />
        <label>Réponse : </label>
        <textarea v-model="response.contenu"></textarea>
  
        <button type="button" @click="submitResponse">SUBMIT</button>
      </form>
  
      <button @click="afficher">Afficher les autres réponses</button>
  
      <div v-if="showresponse">
        <ResponseList :discussionId="discussion.id" />
      </div>
    </div>
  </template>
  
  <script>
  import { db } from '../firebase-config'; 
  import ResponseList from './ResponseList.vue'; 
  export default {
    components: {
      ResponseList
    },
    data() {
      return {
        discussion: null, // Discussion récupérée
        showForm: false,
        showresponse: false,
        response: { // Modèle de la réponse
          date_de_creation: new Date().toISOString(),
          auteur: '',
          categorie: '',
          contenu: ''
        }
      };
    },
    created() {
      const discussionId = this.$route.params.id;
      this.fetchDiscussionDetail(discussionId);
    },
    methods: {
      repondre() {
        this.showForm = !this.showForm;
      },
      afficher() {
        this.showresponse = !this.showresponse;
      },
      submitResponse() {
        // Soumettre la réponse à Firebase
        const discussionId = this.$route.params.id;
  
        // Référence à la collection "responses"
        const responsesRef = db.collection('responses');
  
        // Ajouter les données de la réponse à la collection "responses"
        responsesRef.add({
          discussionId: discussionId, // L'ID de la discussion à laquelle cette réponse appartient
          date_de_creation: this.response.date_de_creation,
          auteur: this.response.auteur,
          categorie: this.response.categorie,
          contenu: this.response.contenu
        })
        .then(() => {
          console.log('Réponse ajoutée avec succès');
          this.showForm = false; // Cacher le formulaire après soumission
          this.clearForm(); // Réinitialiser les champs du formulaire
        })
        .catch((error) => {
          console.error('Erreur lors de l\'ajout de la réponse: ', error);
        });
      },
      clearForm() {
        this.response = {
          date_de_creation: '',
          auteur: '',
          categorie: '',
          contenu: ''
        };
      },
      fetchDiscussionDetail(id) {
        // Récupérer les détails de la discussion depuis la collection "discussions"
        db.collection('discussions').doc(id).get()
          .then(doc => {
            if (doc.exists) {
              this.discussion = doc.data();
              this.discussion.id = doc.id; // Ajouter l'ID de la discussion
            } else {
              console.log("Aucune discussion trouvée pour cet ID");
            }
          })
          .catch(error => {
            console.error("Erreur de récupération de la discussion: ", error);
          });
      }
    }
  };
  </script>
  