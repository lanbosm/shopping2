<template>
	 <div class="appCenter">
		 <app-center-loading v-if="waiting"></app-center-loading>
		 <order-main v-if="mode=='order'"></order-main>
		 <print-main v-if="mode=='print'"></print-main>
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
			mode(){
				return this.$store.state.currentPage.mode;
			},
            appLoading(){
                return this.$store.state.appLoading;
            },
			waiting: function() {
                    return this.$store.state.currentPage.waiting
            },
        },
        components: {
            OrderMain,
            PrintMain,
            AppCenterLoading
        },
        watch:{
            'mode':"routerGo"
        },
		created(){
            this.routerGo();
		},
		methods:{

		    routerGo(){
                if(this.mode=="index"){
                    this.$router.replace('/');
                }
			}

		}
    }
</script>

