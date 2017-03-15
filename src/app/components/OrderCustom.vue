<template>
    <div class="container order-custom">
            <div class="row">
                <div class="col-nn-30">
                    <a class="btn btn-default custom-btn btn-block">
                        <span class="iconfont icon-guanliyuan"></span> {{custom.nickname}}
                    </a>
                </div>

                <info-list v-if="mode=='order'" :amount="amount" :message="message"></info-list>
                <recharge-list v-if="mode=='recharge'" :amount="amount" :message="message"></recharge-list>

            </div>
        </div>
</template>

<style>
</style>
<script>
    import InfoList from 'components/InfoList.vue';
    import RechargeList from 'components/RechargeList.vue';

    export default{
        name: 'OrderHeader',
        props:["mode","amount","message"],
        computed: {
            //数据来自全局
            custom () {
                let customs = this.$store.state.customData;
                if(customs && customs.length){
                    return customs[0];
                }else{
                    return {
                        nickname:'顾客'
                    }
                }
            },
        },
        components: {
            RechargeList,
            InfoList
        }
    }
</script>
