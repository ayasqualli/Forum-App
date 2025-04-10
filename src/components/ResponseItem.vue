<template>
    <div>
        <div>{{ response.auteur }}</div>
        <div>{{ response.categorie }}</div>
        <div>{{ response.date_de_creation }}</div>
        <div>{{ response.contenu }}</div>
    </div>
</template>
<script>
import { db } from '../firebase-config'; 
export default{
    props : {
        response :response ,
    }
}
</script>