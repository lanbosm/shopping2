<template>
    <div class="shopAdminBox">
        <a class="btn btn-block btn-default addShopAdmin-btn" @click="showShopAdminModal">
        <span class="iconfont icon-gouwucheman" aria-hidden="true" > {{shopAdminName}}</span>
        </a>
    </div>
</template>



<script>
   
    import $ from 'jquery';
    export default{
        name: 'showAdminBtn',
        computed: {
            //数据来自全局
            shopAdminData(){
                return this.$store.state.currentPage.shopAdminData;
            },
            shopAdminName(){
                if(this.$store.state.currentPage.shopAdminData.name){
                    return this.$store.state.currentPage.shopAdminData.name
                }else{
                    return "选择导购员" ;
                }
            },
        },
        methods:{
            //显示导购模块
            showShopAdminModal(){
                this.$root.showShopAdminModal=true;
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
                    var modal='#layer-showAdmin';
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


            },
        }
    }
</script>

