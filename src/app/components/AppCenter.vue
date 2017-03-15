<template>
	 <div class="appCenter">
		 <order-main v-if="mode=='order'"></order-main>

		 <recharge-main v-if="mode=='recharge'"></recharge-main>

		 <print-main v-if="mode=='print'"></print-main>

	 </div>
</template>

<style>
</style>
<script>

    import OrderMain from 'components/OrderMain.vue'
    import RechargeMain from 'components/RechargeMain.vue'
    import PrintMain from 'components/PrintMain.vue'

    export default{
        name: 'appCenter',
        computed: {
            //数据来自全局
			mode(){
				return this.$store.state.currentPage.mode;
			}

        },
        components: {
            OrderMain,
            RechargeMain,
            PrintMain
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

