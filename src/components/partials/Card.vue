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
        typeApi:String,
        film:Object,
    },

    data() {
        return {
            store,
            showInfo: false,
            actors:[],
			type:[],
        }
    },
    methods: {
        getActorsApi() {
        if (!this.film || !this.film.id) {
            console.error("ID del film non definito.");
            return;
        }

        if (this.actors.length > 0 || this.type.length > 0) {
            this.actors = [];
            this.type = [];
        } else {
            const urlActors = `https://api.themoviedb.org/3/${this.typeApi}/${this.film.id}/credits?api_key=f2191c31fa927ebbbfd133d861d35f14`;

            axios.get(urlActors)
                .then((response) => {
                    for (let i = 0; i < 5; i++) {
                        this.actors.push(response.data.cast[i].name);
                    }
                    if (this.actors.length === 0) {
                        this.actors = ["non trovato generi"];
                    }
                })
                .catch((error) => {
                    this.actors = ["non trovati attori"];
                    console.error(error);
                });

            const urlType = `https://api.themoviedb.org/3/${this.typeApi}/${this.film.id}?api_key=f2191c31fa927ebbbfd133d861d35f14`;

            axios.get(urlType)
                .then((response) => {
                    let i = 0;
                    while (response.data.genres && (response.data.genres.length - 1 >= i) && i <= 2) {
                        this.type.push(response.data.genres[i].name);
                        i++;
                    }
                    if (this.type.length === 0) {
                        this.type = ["non trovato generi"];
                    }
                })
                .catch((error) => {
                    this.type = ["non trovato generi"];
                    console.error(error);
                });
        }
    
    },

},
mounted() {

    this.getActorsApi();

}

}
</script>

<template>

    <div class="movie-card" @mouseover="showInfo = true" @mouseleave="showInfo = false">

        <div class="card-img pt-1">
            <img v-if="poster === null" src="../../../public/nope-not-here.webp" alt="image_not_found">
            <img v-else :src="`https://image.tmdb.org/t/p/w342${poster}`" alt="poster">
        </div>

        <div class="card-info p-3">

            <div class="card-title">
                <h5>{{ title }}</h5>
                <h6>{{ originalTitle }}</h6>
                <div class="overview">
                    <p>{{ overview }}</p>
                    <div class="p-1" v-if="(this.type.length>0)">
                        <div>Genere:</div>
			            <div class="" v-for="(genre,i) in this.type" :key="i">{{ genre }}</div>
			
		            </div>
		            <div class="p-1" v-if="(this.actors.length>0)">
			            <div>Attori:</div>
			            <div class="" v-for="(actor,i) in this.actors" :key="i">{{ actor }}</div>
		            </div>
                </div>
            </div>

            <div class="card-end">

                <div class="card-lang pt-1">
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

  .card-img {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.5s;
        img{
            height: 100%;
            width: 100%;
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