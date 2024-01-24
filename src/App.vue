<script>
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import {store} from './data/store';
import axios from 'axios'
//import AppFooter from './components/AppFooter.vue';

export default {
  components: {
    AppHeader,
    AppMain
  },
  data() {
    return {
      movies: []
    };
  },
  methods: {
    
    getApi(){
        // store.isLoading = true;
        axios.get(store.apiUrl, {
          params: {
            query: store.searchInput
          }
        }).then(result => {
          store.movieArray  = result.data.results;
          store.displayCard = true;
            console.log('movie cercato -->', store.movieArray);
        })},
    },
}
</script>

<template>

    <AppHeader @searchMovie="getApi"/>

    <AppMain :movies="movies"/>

</template>

<style lang="scss">
@use "assets/scss/main" as *;
@import "assets/scss/partials/reset";
</style>