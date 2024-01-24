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
      hasPerformedSearch: false
    };
  },
  methods: {

    getApi() {
    const trimmedSearchInput = (store.searchInput || "").trim();

    // Imposta lo stato di loading su true
    store.loading = true;

    if (trimmedSearchInput !== "") {
        axios
        .get(store.apiUrl, {
            params: {
            query: trimmedSearchInput,
            },
        })
        .then((result) => {
            store.moviesArray = result.data.results;
            console.log("movies", store.moviesArray);
            this.hasPerformedSearch = true; // Imposta a true dopo la ricerca
        })
        .catch((error) => {
            console.error("Errore nella chiamata API:", error);
        })
        .finally(() => {
            // Imposta lo stato di loading su false alla fine
            store.loading = false;
        });
    } else {
        console.log(
        "La stringa di ricerca è vuota dopo il trim, evito la chiamata API."
        );
        // Imposta lo stato di loading su false
        store.loading = false;
    }
    },

    getApiTV() {
    const trimmedSearchInput = (store.searchInput || "").trim();

    // Imposta lo stato di loading su true
    store.loading = true;

    if (trimmedSearchInput !== "") {
        axios
        .get(store.apiUrlTV, {
            params: {
            query: trimmedSearchInput,
            },
        })
        .then((result) => {
            store.seriesArray = result.data.results;
            console.log("series", store.seriesArray);
            this.hasPerformedSearch = true; // Imposta a true dopo la ricerca
        })
        .catch((error) => {
            console.error("Errore nella chiamata API:", error);
        })
        .finally(() => {
            // Imposta lo stato di loading su false alla fine
            store.loading = false;
        });
    } else {
        console.log(
        "La stringa di ricerca è vuota dopo il trim, evito la chiamata API."
        );
        // Imposta lo stato di loading su false
        store.loading = false;
    }
    },

    getApiLoad() {
    store.loading = true;

    axios
      .get(store.apiUrlLoad, {})
      .then((result) => {
        store.moviesArray = result.data.results;
        console.log("series", store.loadArray);
        this.hasPerformedSearch = true; // Imposta a true dopo la ricerca
      })
      .finally(() => {
        // Imposta lo stato di loading su false alla fine
        store.loading = false;
      });
    },

  },

  created() {
    this.getApiLoad();
},
    
}
</script>

<template>

    <div class="bg-dark container-fluid p-2">

        <AppHeader @searchMovies="getApi" @searchSeries="getApiTV"/>

        <AppMain class="bg-dark px-5 py-1"/>

    </div>


</template>

<style lang="scss">
@use "assets/scss/main" as *;
@import "assets/scss/partials/reset";
</style>