//列表组件
<template>
	<div class="actlist">
		<div class="act-type">
				<a class="btn act-type-btn " :class="{selected:type=='points'}" @click="changeActType('points')">送积分</a>
			    <a class="btn act-type-btn " :class="{selected:type=='seckills'}"  @click="changeActType('seckills')">限时抢购</a>
				<a class="btn act-type-btn " :class="{selected:type=='gifts'}"  @click="changeActType('gifts')">赠品</a>
				<a class="btn act-type-btn" :class="{selected:type=='add'}"  @click="changeActType('add')">加价购</a>
		</div>
		<div class="">
				<act-product-list ref="actProductList" v-if="type!='add'" :type="type" @open-detail="openDetail"></act-product-list>
				<act-product-list2  v-if="type=='add'" :type="type" @open-detail="openDetail"></act-product-list2>
		</div>

	</div>    
</template>
<script>

    import ActProductList from 'views/products/ActProductList.vue';
    import ActProductList2 from 'views/products/ActProductList2.vue';

    export default {
        name: 'ActProductMain',
        computed: {

        },
        created(){

        },
        data(){
          	return {
          	    type:"points"
			}

		},
        components: {
            ActProductList,                 //活动
            ActProductList2,                 //活动
        },
        mounted(){

        },
        methods:{


            changeActType(type){
				this.type=type;

			},
            openDetail() {
                //是否存在赠品
                this.$emit('open-detail');
            },


        }
    }
</script>

<style scoped>


</style>