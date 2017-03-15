<template>
    <div class="order">
        <order-header :title="title" :back="back" :next="next" :mode="mode"></order-header>
        <order-custom  :mode="mode" :message="message" :amount="amount" :gift-amount="giftAmount"></order-custom>
        <div class="container order-body">
            <div class="row">
                <div class="col-nn-30  left-con">
                     <order-menu :mode="mode"></order-menu>
                </div>
                <div class="col-nn-70 right-con">
                    <div class="content">
                        <transition name="slide">
                            <keep-alive>
                               <router-view :message="message" :amount="amount" :gift-amount="giftAmount"></router-view>
                            </keep-alive>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import OrderHeader from 'components/OrderHeader.vue';
    import OrderCustom from 'components/OrderCustom.vue';
    import OrderMenu from 'components/OrderMenu.vue';
    export default{
        data() {
            return {
                title:"充值",
                back:{"label":"返回","url":"order","show":true},
                next:{"label":"打印","url":"print","show":true},
                message: '请选择一个充值方式',
                amount:0,
                giftAmount:0
            }
        },
        created(){

        },
        components:{
            OrderHeader,
            OrderMenu,
            OrderCustom
        },
        computed: {
            //数据来自全局
            mode(){
                return this.$store.state.currentPage.mode;
            }
        },
        methods: {


        },
        mounted(){

        }
    }
</script>

