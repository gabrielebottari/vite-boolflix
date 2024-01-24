<script>
import {store} from "../data/store";
import Card    from "../components/partials/card.vue";

export default {

  data(){
    
    return {
        store,  
    }

  },
  components: {
        Card,
    },
}
</script>

<template>

    <main>
        <div v-if="store.loading" class="d-flex justify-content-center p-5">
            <div class="spinner-border text-danger fs-6" role="status">
                <span class="sr-only"></span>
            </div>
        </div>

        <div v-else class="text-white">
           <p v-if="!store.loading && store.moviesArray.length === 0 && store.seriesArray.length === 0" class="fs-1 text-center">Nessun risultato trovato!</p>

            <!-- Se ci sono film, mostra la sezione "Film trovati" -->
            <div v-if="store.moviesArray.length > 0" class="row">
                <p class="ps-3 fs-3">Film trovati:</p>
                <div v-for="movie in store.moviesArray" :key="movie.id" class="col-lg-3 col-md-4 col-sm-6 p-3 bg-dark text-white">
                    <Card
                        :poster="movie.poster_path"
                        :title="movie.title"
                        :originalTitle="movie.original_title" 
                        :language="movie.original_language"
                        :overview="movie.overview"
                        :averageScore="Math.round(movie.vote_average / 2)"
                    />
                </div>
            </div>

            <!-- Se ci sono serie TV, mostra la sezione "Serie trovate" -->
            <div v-if="store.seriesArray.length > 0" class="row">
                <p class="ps-3 fs-3">Serie trovate:</p>
                <div v-for="serie in store.seriesArray" :key="serie.id" class="col-lg-3 col-md-4 col-sm-6 p-3 bg-dark text-white">
                    <Card
                        :poster="serie.poster_path"
                        :title="serie.name"
                        :originalTitle="serie.original_name"
                        :language="serie.original_language"
                        :overview="serie.overview"
                        :averageScore="Math.round(serie.vote_average / 2)"
                    />
                </div>
            </div>
        </div>
    </main>

</template>

<style lang="scss" scoped>

    .spinner-border{
        width: 5rem;
        height: 5rem;
    }

    p {
        margin: 0;
    }
</style>