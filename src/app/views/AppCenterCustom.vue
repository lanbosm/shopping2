<template>
    <div class="container order-custom">
            <div class="row">
                <div class="col-nn-30">
                    <a class="btn btn-default custom-btn btn-block" @click="showCustomModal()">
                        <span class="iconfont icon-guanliyuan"></span> {{custom.nickname}}
                    </a>
                </div>

                <info-list  :amount="amount" :message="message" :custom="custom" :order="order"></info-list>
            </div>
        </div>
</template>

<style>
</style>
<script>
    import InfoList from 'views/order/InfoList.vue';

    export default{
        name: 'OrderHeader',
        props:["amount","message","order"],
        computed: {
            //数据来自全局
            custom () {
                let customs = this.$store.state.currentPage.customData;

                return this.$store.state.currentPage.customData;
            }
        },
        components: {
            InfoList
        },
        methods:{

            //显示会员模块
            showCustomModal(){
                this.$root.showCustomDialog=true;
            }

        }
    }
</script>
