<template>
    <div class="container order-custom">
            <div class="row">
                <div class="col-nn-30">
                    <a class="btn btn-default custom-btn btn-block">
                        <span class="glyphicon glyphicon-user"></span> {{custom.nickname}}
                    </a>
                </div>

                <info-list v-if="showInfo"></info-list>
                <recharge-list v-if="showRecharge"></recharge-list>

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
        props:["showInfo","showRecharge"],
        data() {
            return {
                message: '请选择一个付款方式',
                index: 0,
                choice: {
                    'fir': true,
                    'sec': false,
                    'thr': false
                }
            }
        },
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
        },
        methods: {

                toPrint:function(){
                    location.href="./print.html";
                },
                switchPay:function (index) {
                    this.index = index;
                },
                choiceDis:function(param){
                    this.choice[param] = !this.choice[param];
                }

        }
    }
</script>
