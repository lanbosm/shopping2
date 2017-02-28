<template>
	<h1 class="div1"><span>我是组件</span></h1>
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
<style rel=”stylesheet/less” lang="less">
	/*当然也可以加个scope，表示只在这个vue生效，不会污染到其他的component*/
	/*<style scoped lang="less">*/
	/*@import'./assets/less/main.less';*/

	.div1 {
		background: red;
		z-index: 100;
		width: 100%;
		left: 0;
		top: 0;
		span{
			background: yellow;
		}
	}
</style>