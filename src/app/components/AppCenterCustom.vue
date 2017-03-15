<template>
    <div class="container order-custom">
            <div class="row">
                <div class="col-nn-30">
                    <a class="btn btn-default custom-btn btn-block" @click="showCustomModal()">
                        <span class="iconfont icon-guanliyuan"></span> {{custom.nickname}}
                    </a>
                </div>

                <info-list v-if="mode=='order'" :amount="amount" :message="message" :custom="custom"></info-list>
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
        },
        methods:{

            //显示会员模块
            showCustomModal(){

                this.$root.showCustomModal=true;
                function centerModals() {
                    $(this).each(function(i) {
                        var $clone = $(this).clone().css('display','block').appendTo('body');
                        var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
                        top = top > 0 ? top : 0;
                        $clone.remove();
                        $(this).find('.modal-content').css("margin-top", top);
                    });
                };
                this.$nextTick(()=>{
                    var modal='#layer-custom';
                    $(modal).on('show.bs.modal', centerModals);
                    //禁用空白处点击关闭
                    $(modal).modal({
                        backdrop: 'static',
                        keyboard: false,//禁止键盘
                        show:false
                    });
                    //页面大小变化是仍然保证模态框水平垂直居中
                    $(window).on('resize',(modal)=>centerModals);
                    //shop_admins
                    $(modal).modal('toggle');
                })


            }

        }
    }
</script>
