<template>
    <div class="order">
        <app-center-header :title="title" :back="back" :next="next" mode="mode"></app-center-header>
        <app-center-custom :mode="mode" :message="message" :amount="amount"></app-center-custom>
        <div class="container order-body">
            <div class="row">
                <div class="col-nn-30  left-con">
                    <app-center-menu :mode="mode"></app-center-menu>
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
    import AppCenterHeader from 'components/AppCenterHeader.vue';
    import AppCenterCustom from 'components/AppCenterCustom.vue';
    import AppCenterMenu from 'components/AppCenterMenu.vue';

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
            AppCenterHeader,
            AppCenterMenu,
            AppCenterCustom
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

