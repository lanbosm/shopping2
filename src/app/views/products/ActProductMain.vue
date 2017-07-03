//列表组件
<template>
	<div class="actlist">
		<div class="act-type">
				<a class="btn act-type-btn " :class="{selected:type=='all'}" @click="type='all'">全部</a>
				<a class="btn act-type-btn " :class="{selected:type=='type1'}"  @click="type='type1'">双倍积分</a>
			    <a class="btn act-type-btn " :class="{selected:type=='type2'}"  @click="type='type2'">限时抢购</a>
				<a class="btn act-type-btn" :class="{selected:type=='type3'}"  @click="type='type3'">加价购</a>
		</div>
		<div class="">
				<act-product-list  v-if="type!='type3'" :type="type" @open-detail="openDetail"></act-product-list>
				<act-product-list2  v-if="type=='type3'" :type="type" @open-detail="openDetail"></act-product-list2>
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
          	    type:"all"
			}

		},
        components: {
            ActProductList,                 //活动
            ActProductList2,                 //活动
        },
        mounted(){

        },
        methods:{
            openDetail() {
                //是否存在赠品
                this.$emit('open-detail');
            },


        }
    }
</script>

<style scoped>


</style>