<script>
import {store} from "../data/store";

export default {
  data() {
    return {
      store,
    };
  },
  methods: {

    },
};
</script>

<template>
    <header class="bg-dark">

        <div class="container py-3">

            <div class="row">

                <div class="col-3">
                    <img src="../../public/BoolflixLogo.png" alt="logo">
                </div>

                <div class="col-9 d-flex align-items-center">
                    
                    <div class="input-group">

                        <input v-model="store.searchInput" @keyup.enter="$emit('searchMovies'), $emit('searchSeries')" type="text" class="form-control" placeholder="Search" aria-label="Search" />

                        <button @click="$emit('searchMovies'), $emit('searchSeries')" class="btn btn-danger" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>

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