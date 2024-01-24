<script>
import { store } from "../../data/store";
export default {

    props: {
        poster         : String,
        title          : String,
        originalTitle  : String,
        language       : String,
        averageScore   : Number,
    },
    data() {
        return {
            store,
        }
    }
}
</script>

<template>

    <div class="p-1">
        <div>

            <div class="card-img pt-1">
                <img :src="`https://image.tmdb.org/t/p/original${poster}`" alt="poster">
            </div>

            <div class="card-info">

                <div class="card-title">
                    <h4>{{ title }}</h4>
                    <h5>{{ originalTitle }}</h5>
                </div>

                <div class="card-lang">
                    <img :src="`flags/${language}.svg`"  class="lang" alt="original_language">
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

.card-img {
    img {
        width: 100%;
    }
}

.lang {
    width: 30px;
}

</style>