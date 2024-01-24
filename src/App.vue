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
      store,
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
            store.moviesArray  = result.data.results;
            store.displayCard = true;
                console.log('movies cercato -->', store.moviesArray);
    })},
    
    
    getApiTV(){
        // store.isLoading = true;
        axios.get(store.apiUrlTV, {
          params: {
            query: store.searchInput
          }
        }).then(result => {
            store.seriesArray  = result.data.results;
            store.displayCard = true;
                console.log('series cercato -->', store.seriesArray);
    })},    
    
    },
    
}
</script>

<template>

    <AppHeader @searchMovies="getApi" @searchSeries="getApiTV"/>

    <AppMain />

</template>

<style lang="scss">
@use "assets/scss/main" as *;
@import "assets/scss/partials/reset";
</style>