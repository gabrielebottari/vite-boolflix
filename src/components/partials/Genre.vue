<script>

import { store } from '../../data/store.js';

export default{
	data() {
		return{
			store,
            isActive: false,
		};
	},
	props:{
		genre:Object,
	},
    methods: {

        toggleGenre() {
            this.isActive = !this.isActive;
            this.$emit('genreSelected', this.genre.id, this.isActive);
        },

    },
}

</script>

<template>
    <button  @click="toggleGenre"
        :class="{ active: isActive }">
        {{ genre.name }}
    </button>
</template>

<style lang ="scss" scoped>
.active{
    -webkit-box-shadow: 0px 0px 5px 5px rgba(229,9,19,0.7);
    -moz-box-shadow: 0px 0px 5px 5px rgba(229,9,19,0.7);
    box-shadow: 0px 0px 5px 5px rgba(229,9,19,0.7);
}

</style>