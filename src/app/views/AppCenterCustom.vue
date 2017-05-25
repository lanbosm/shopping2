<template>
    <div class="container order-custom">
            <div class="row">
                <div class="col-nn-30">
                    <a class="btn btn-default custom-btn btn-block" @click="showCustomModal()">
                        <span class="iconfont icon-guanliyuan"></span> {{custom.nickname}}
                    </a>
                </div>

                <info-list v-if="mode=='order'" :amount="amount" :message="message" :custom="custom" :order="order"></info-list>
            </div>
        </div>
</template>

<style>
</style>
<script>
    import InfoList from 'views/order/InfoList.vue';

    export default{
        name: 'OrderHeader',
        props:["mode","amount","message","order"],
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
                var vm=this;
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
                    $(modal).on('hidden.bs.modal',function(){
                        vm.$root.showCustomModal=false;
                    });
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
