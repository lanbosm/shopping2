<template>
	<h1>welcome Vue</h1>
	<h2 @click="change">{{msg}}</h2>
</template>
<script>
	export default{
		data(){
			return {
				msg:'welcome Vue ^_^'
			}
		},
		methods:{
			change(){
				this.msg='wahaha'
			}
		}
	}
</script>
<style>
	body{
		background: yellow;
	}
</style>