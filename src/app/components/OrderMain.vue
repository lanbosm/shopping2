<template>
    <div class="order">
        <order-header :title="title" :back="back" :next="next"></order-header>
        <order-custom :show-info="true" :show-recharge="false"></order-custom>
        <div class="container order-body">
            <div class="row">
                <div class="col-nn-30  left-con">
                     <order-menu :show-recharge-btn="true"></order-menu>
                </div>
                <div class="col-nn-70 right-con">
                    <div class="content">
                        <transition name="slide">
                            <keep-alive>
                               <router-view :message="message" :amount="amount"></router-view>
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
                title:"结账",
                back:{"label":"返回","url":"index","show":true},
                next:{"label":"打印","url":"print","show":true},
                message: '请选择一个付款方式',
                amount:21.50,
                index: 0
            }
        },
        components:{
            OrderHeader,
            OrderMenu,
            OrderCustom
        },
        watch: {
           // '$route': 'fetchData'
        },
        computed: {
            listData () {
                return [];
            }
        },
        methods: {


        },
        mounted(){

        }
    }
</script>
