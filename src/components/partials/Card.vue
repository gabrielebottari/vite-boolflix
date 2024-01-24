<script>
import { store } from "../../data/store";
export default {

    props: {
        poster : String,
        title : String,
        originalTitle : String,
        language : String,
        overview : String,
        averageScore : Number,
    },

    data() {
        return {
            store,
            showInfo: false,
        }
    },
    methods: {
  },

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
        width: 10px; // Larghezza della scrollbar
    }

    ::-webkit-scrollbar-thumb {
        background-color: #6c757d; // Colore del "pulsante" della scrollbar
    }

    ::-webkit-scrollbar-track {
        background-color: #343a40; // Colore della "traccia" della scrollbar
    }
}
</style>