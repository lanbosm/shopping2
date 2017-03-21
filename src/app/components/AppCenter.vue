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

    import AppCenterLoading from 'components/AppCenterloading.vue'

    import OrderMain from 'components/OrderMain.vue'
    import RechargeMain from 'components/RechargeMain.vue'
    import PrintMain from 'components/PrintMain.vue'



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
            RechargeMain,
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
                    //this.$router.replace('/');
                }
			}

		}
    }
</script>

