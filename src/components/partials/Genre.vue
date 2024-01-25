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
    -webkit-box-shadow: #FFF 0 -1px 4px, #ff0 0 -2px 10px, #ff8000 0 -10px 20px, red 0 -18px 40px, 0px 50px 50px -30px rgba(0,0,0,0.14); 
    box-shadow: #FFF 0 -1px 4px, #ff0 0 -2px 10px, #ff8000 0 -10px 20px, red 0 -18px 40px, 0px 50px 50px -30px rgba(0,0,0,0.14);
}

</style>