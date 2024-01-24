<script>
import {store} from "../data/store";
import Card    from "../components/partials/Card.vue";

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
        <div class="text-white row">
            <p>Film trovati</p>
            <div v-for="movie in store.moviesArray" :key="movie.id" class="card col-3 p-2 bg-dark text-white">
                
                <Card
                :poster="movie.poster_path"
                :title="movie.title"
                :originalTitle="movie.original_title" 
                :language="movie.original_language"
                :averageScore="Math.round(movie.vote_average / 2)"/>
            </div> 

            <p>serie trovate</p>
            <div v-for="serie in store.seriesArray" :key="serie.id" class="card col-3 p-2 bg-dark text-white">
                
                <Card
                :poster="serie.poster_path"
                :title="serie.name"
                :originalTitle="serie.original_name"
                :language="serie.original_language"
                :averageScore="Math.round(serie.vote_average / 2)"/>
            </div>
            
        </div>
    </main>
</template>

<style lang="scss" scoped>
    img {
        width: 30px;
    }
</style>