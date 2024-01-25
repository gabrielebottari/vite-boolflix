<script>
import { store } from "../data/store";
import axios from 'axios';
import Card from "../components/partials/card.vue";
import Genre from "../components/partials/Genre.vue";

export default {
  data() {
    return {
      store,
    };
  },
  components: {
    Card,
    Genre,
  },

  methods: {
    getGenresApi() {
      console.log("partia chiamata Genres")
      axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=f2191c31fa927ebbbfd133d861d35f14").then((response) => {
        this.store.genres = response.data.genres
      }).catch((error) => {
        console.log("errore", error);
      })
          // Chiamata API per i generi dei film
    axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=f2191c31fa927ebbbfd133d861d35f14")
      .then(response => {
        this.store.movieGenres = response.data.genres;
      })
      .catch(error => {
        console.log("errore", error);
      });

    // Chiamata API per i generi delle serie TV
    axios.get("https://api.themoviedb.org/3/genre/tv/list?api_key=f2191c31fa927ebbbfd133d861d35f14")
      .then(response => {
        this.store.tvGenres = response.data.genres;
      })
      .catch(error => {
        console.log("errore", error);
      });
    },

    updateActiveGenre(genreName, isActive) {
      this.store.activeGenre = isActive ? genreName : "";
    },
    // Assicurati che questa funzione confronti correttamente gli ID dei generi
    handleGenreSelection(genreId, isActive) {
        this.store.activeGenre = isActive ? genreId : '';
    },
    isActiveGenre(genreIds) {
        if (!this.store.activeGenre || !genreIds) return true;
        return genreIds.includes(this.store.activeGenre);
    },

  },
  mounted() {
    this.getGenresApi();
  }
}
</script>

<template>

    <main>
      
        <div class="px-5 py-1 d-flex justify-content-center flex-wrap">
            <Genre class="btn btn-danger m-1" v-for="(elem,i) in this.store.genres" :key="i" :genre="elem" @activateGenre="updateActiveGenre" @genreSelected="handleGenreSelection"/>
        </div>

        <div v-if="store.loading" class="d-flex justify-content-center p-5">
            <div class="spinner-border text-danger fs-6" role="status">
                <span class="sr-only"></span>
            </div>
        </div>

        <div v-else class="text-white container">

           <p v-if="!store.loading && store.moviesArray.length === 0 && store.seriesArray.length === 0" class="fs-1 text-center">Nessun risultato trovato!</p>

            <!-- Se ci sono film, mostra la sezione "Film trovati" -->
            <div v-if="store.moviesArray.length > 0" class="row">
                <p class="ps-5 fs-3">Film trovati:</p>
                <div v-for="movie in store.moviesArray" :key="movie.id" class="col-lg-3 col-md-4 col-sm-6 p-3 bg-dark text-white">
                    <Card class="poster"
                        :poster="movie.poster_path"
                        :title="movie.title"
                        :originalTitle="movie.original_title" 
                        :language="movie.original_language"
                        :overview="movie.overview"
                        :film="movie"
                        :kind="'movie'"
                        :averageScore="Math.round(movie.vote_average / 2)"
                        :isActive="isActiveGenre(movie.genre_ids)"
                        :checkActiveGenre="isActiveGenre"
                        :activeGenre="Number(store.activeGenre)"
                    />
                </div>
            </div>

            <!-- Se ci sono serie TV, mostra la sezione "Serie trovate" -->
            <div v-if="store.seriesArray.length > 0" class="row">
                <p class="ps-5 fs-3">Serie trovate:</p>
                <div v-for="serie in store.seriesArray" :key="serie.id" class="col-lg-3 col-md-4 col-sm-6 p-3 bg-dark text-white">
                    <Card
                        :poster="serie.poster_path"
                        :title="serie.name"
                        :originalTitle="serie.original_name"
                        :language="serie.original_language"
                        :overview="serie.overview"
                        :film="serie"
                        :kind="'tv'"
                        :isActive="isActiveGenre(serie.genre_ids)"
                        :checkActiveGenre="isActiveGenre"
                        :averageScore="Math.round(serie.vote_average / 2)"
                        :activeGenre="Number(store.activeGenre)"
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