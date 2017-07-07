<template>
	 <div class="appCenter">
		 <app-center-loading v-if="waiting"></app-center-loading>
		 <order-main  ref="order" v-if="$route.path.indexOf('/order')!=-1"></order-main>
		 <print-main ref="print" v-if="$route.path=='/print'"></print-main>
	 </div>
</template>

<style>

</style>
<script>

    import AppCenterLoading from 'views/AppCenterloading.vue'

    import OrderMain from 'views/order/OrderMain.vue'
    import PrintMain from 'views/print/PrintMain.vue'



    export default{
        name: 'appCenter',
        computed: {
            //数据来自全局
			waiting: function() {
                    return this.$store.state.currentPage.waiting
            },
        },
        components: {
            OrderMain,
            PrintMain,
            AppCenterLoading
        },
		created(){
            console.log(this.$route);
           // this.$store.state.currentPage.mode="print";

            //this.routerGo();
		},
		methods:{



		}
    }
</script>

