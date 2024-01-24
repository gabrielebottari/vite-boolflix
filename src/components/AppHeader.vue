<script>
import {store} from "../data/store";

export default {
  data() {
    return {
      store,
    };
  },
  methods: {

  }
};
</script>

<template>
    <header class="bg-dark">

        <div class="container my-5">

            <div class="row">
                <div class="col-md-6 offset-md-3">

                    <div class="input-group mb-3">

                        <input
                            v-model="store.searchInput"
                            type="text"
                            class="form-control"
                            placeholder=""
                        />
                        <button @click="$emit('searchMovies'), $emit('searchSeries')" class="btn btn-danger" type="submit">Search</button>

                    </div>

                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
</style>