<template>
    <div>
        <div>{{ discussion.titre }}</div>
        <div>{{ discussion.date_de_creation }}</div>
        <div>{{ discussion.auteur }}</div>
        <div>{{ getExcerpt(discussion.contenu) }}</div>
    </div>
    <button @click="goToDetail">Afficher plus de détails</button>
</template>
<script>
export default {
    name: 'DiscussionItem',
    props: {
        discussion: Object, 
    },
    methods: {
        getExcerpt() {
  return this.discussion && this.discussion.contenu
    ? this.discussion.contenu.slice(0, 100) + '...'
    : '';
},
        goToDetail() {
            this.$router.push({ name: 'detail', params: { id: this.discussion.id } });
        },
    },
};
</script>
