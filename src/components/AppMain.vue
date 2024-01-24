<script>
import {store} from "../data/store";

export default {

  data(){

    return {
        store,  
    }

  },
}
</script>

<template>
    <main>
        <div>
            <div v-for="movie in store.movieArray" :key="movie.id" class="card my-3">
                <div class="card-body">
                <h5 class="card-title">Titolo: {{ movie.title }}</h5>
                <p class="card-text">Titolo Originale: {{ movie.original_title }}</p>
                <p class="card-text">Lingua: {{ movie.original_language }}</p>
                <p class="card-text">Voto: {{ movie.vote_average }}</p>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
</style>