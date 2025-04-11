<template>
    <div @click="goToDetail">
        <div>{{ discussion.titre }}</div>
        <div>{{ discussion.date_de_creation }}</div>
        <div>{{ discussion.auteur }}</div>
        <div>{{ getExcerpt(discussion.contenu) }}</div>
    </div>
</template>
<script>
export default {
    name: 'DiscussionItem',
    props: {
        discussion: Object, 
    },
    methods: {
        getExcerpt(text) {
            const maxLength = 100; 
            return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
        },
        goToDetail() {
            this.$router.push({ name: 'detail', params: { id: this.discussion.id } });
        },
    },
};
</script>
