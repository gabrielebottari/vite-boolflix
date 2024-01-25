<script>
import {store} from "../data/store";

export default {
  data() {
    return {
      store,
      selectedMovieGenre: null,
      selectedTvGenre: null,
    };
  },
  methods: {
    handleMovieGenreChange() {
    this.$emit('movieGenreChanged', this.selectedMovieGenre);
  },
  handleTvGenreChange() {
    this.$emit('tvGenreChanged', this.selectedTvGenre);
  },
  getGenresApi(){
			console.log("partia chiamata Genres")
			axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=f2191c31fa927ebbbfd133d861d35f14").then((response) => {
				this.store.genres = response.data.genres
			}).catch((error) => {
				console.log("errore",error);
			})
	}


  }
};
</script>

<template>
    <header class="bg-dark">

        <div class="container py-3">

            <div class="row">

                <div class="col-3">
                    <img src="../../public/Logonetflix.png" alt="logo">
                </div>

                <div class="col-9 d-flex align-items-center">

                    
                    <div class="input-group">

                        <select v-model="selectedMovieGenre" id="movieGenre" @change="handleMovieGenreChange">
                        <option :value="null">Tutti Film</option>  <!-- Aggiorna il valore dell'opzione -->
                        <option v-for="genre in store.movieGenres" :key="genre.id" :value="genre.id">
                            {{ genre.name }}
                        </option>
                        </select>

                        <select v-model="selectedTvGenre" id="tvGenre" @change="handleTvGenreChange">
                        <option :value="null">Tutti TV</option>  <!-- Aggiorna il valore dell'opzione -->
                        <option v-for="genre in store.tvGenres" :key="genre.id" :value="genre.id">
                            {{ genre.name }}
                        </option>
                        </select>


                        <input v-model="store.searchInput" @keyup.enter="$emit('searchMovies'), $emit('searchSeries')" type="text" class="form-control" placeholder="Search" aria-label="Search"/>

                        <button @click="$emit('searchMovies'), $emit('searchSeries')" class="btn btn-danger rounded-0" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>

                    </div>

                </div>


            </div>

            
        </div>
    </header>
</template>

<style lang="scss" scoped>

    img {
        width: 100%;
    }

</style>