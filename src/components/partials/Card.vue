<script>
import { store } from "../../data/store";
import axios from 'axios';

export default {

    props: {
        poster : String,
        title : String,
        originalTitle : String,
        language : String,
        overview : String,
        averageScore : Number,
        kind: String,
        film:Object,
        activeGenre: String,
        isActive: Boolean,
        checkActiveGenre: Function,
        activeGenre: Number,
        
    },

    data() {
        return {
            store,
            showInfo: false,
            actors:[],
            genres:[],
        }
    },
    methods: {
        isActiveGenre() {
        // Se non è stato selezionato alcun genere, considera tutte le card non attive
        if (!this.store.activeGenre) return false;

        // Se un genere è stato selezionato, verifica se la card corrisponde al genere attivo
        return this.film.genre_ids.includes(this.store.activeGenre);
    },

            getInfoApi() {
        if (!this.film || !this.film.id) {
            console.error("ID del film non definito.");
            return;
        }

        if (this.actors.length > 0 || this.genres.length > 0) {
            this.actors = [];
            this.genres = [];
        } else {
            const urlActors = `https://api.themoviedb.org/3/${this.kind}/${this.film.id}/credits?api_key=f2191c31fa927ebbbfd133d861d35f14`;

            axios.get(urlActors)
                .then((response) => {
                    for (let i = 0; i < 5; i++) {
                        this.actors.push(response.data.cast[i].name);
                    }
                    if (this.actors.length === 0) {
                        this.actors = ["Informazioni non disponibili"];
                    }
                })
                .catch((error) => {
                    this.actors = ["Informazioni non disponibili"];
                    console.error(error);
                });

            const urlGenres = `https://api.themoviedb.org/3/${this.kind}/${this.film.id}?api_key=f2191c31fa927ebbbfd133d861d35f14`;

            axios.get(urlGenres)
                .then((response) => {
                    if (response.data.genres && response.data.genres.length > 0) {
                        let i = 0;
                        while ((response.data.genres.length - 1 >= i) && i <= 2) {
                            this.genres.push(response.data.genres[i].name);
                            i++;
                        }
                    } else {
                        this.genres = ["Informazioni non disponibili"];
                    }
                })
                .catch((error) => {
                    this.genres = ["Informazioni non disponibili"];
                    console.error(error);
                });
        }
    },

    },
    mounted() {
        this.getInfoApi();

        // Aggiungi il console log qui per verificare se la carta è attiva
        console.log("Card attiva:", this.isActive);
        console.log("Generi della card:", this.film.genre_ids);
        console.log("Genere attivo:", this.store.activeGenre);
        console.log("checkActiveGenre è una funzione:", typeof this.checkActiveGenre === 'function');
    
    },

}
</script>

<template>

    <div class="movie-card mt-1" :class="{ active: isActiveGenre() }" @mouseover="showInfo = true" @mouseleave="showInfo = false">

        <div class="card-img">
            <img v-if="poster === null" src="../../../public/nope-not-here.webp" alt="image_not_found">
            <img v-else :src="`https://image.tmdb.org/t/p/w342${poster}`" alt="poster">
        </div>

        <div class="card-info p-3">

            <div class="card-title">
                <h5>{{ title }}</h5>
                <h6>{{ originalTitle }}</h6>
                <div class="overview">
                    <p>{{ overview }}</p>
                    <div class="p-1" v-if="(this.genres.length>0)">
                        <div>Genere:</div>
			            <div class="" v-for="(genre,i) in this.genres" :key="i">{{ genre }}</div>
			
		            </div>
		            <div class="p-1" v-if="(this.actors.length>0)">
			            <div>Attori:</div>
			            <div class="" v-for="(actor,i) in this.actors" :key="i">{{ actor }}</div>
		            </div>
                </div>
            </div>

            <div class="card-end">

                <div class="card-lang">
                    <img :src="`flags/${language}.svg`" class="lang" alt="#">
                </div>

                <div class="card-vote">
                    <i v-for="star in averageScore" :key="star" class="fa-solid fa-star" style="color: #DC3545;"></i>
                    <i v-for="star in (5 - averageScore)" :key="star" class="fa-solid fa-star"></i>
                </div>

            </div>

        </div>

    </div>


</template>

<style lang="scss" scoped>

.movie-card {
  position: relative;
  height: 420px;
    &.active {
        -webkit-box-shadow: #FFF 0 -1px 4px, #ff0 0 -2px 10px, #ff8000 0 -10px 20px, red 0 -18px 40px, 0px 50px 50px -30px rgba(0,0,0,0.14); 
        box-shadow: #FFF 0 -1px 4px, #ff0 0 -2px 10px, #ff8000 0 -10px 20px, red 0 -18px 40px, 0px 50px 50px -30px rgba(0,0,0,0.14);
    }

  
  .card-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.5s;
        img{
            display: block;
            width: 100%;    
            height: 100%;   
            margin: 0;      
        }

  }

  .card-info {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    transform: rotateY(-180deg);
    transition: transform 0.5s;
    background-color: black;
        .active{
		background-color:orange;
	    }

    .card-title{
        .overview{
            height: 235px;
            overflow-y: auto;
            padding: 5px;

            p {
                margin: 0;
                font-size: 0.9em;
            }

            div {
                font-size: 0.9em;
            }
        }
    }

    .card-end{

        position: absolute;
        bottom: 10px;
        .card-lang{
            img{
                width: 30px;
            }
        }
    }

  }

  &:hover {
    .card-img {
      transform: rotateY(180deg);
    }

    .card-info {
      transform: rotateY(0deg);
    }
  }

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #6c757d;
    }

    ::-webkit-scrollbar-track {
        background-color: #343a40;
    }
}
</style>