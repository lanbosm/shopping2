<!-- info -->
<template>
    <div class="detail" >
        <div class="custom-table-body">
            <div class="custom-member">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 clearfix">
                        <!--{{customData.curCustom.sex | sex}}-->
                        <em class="sex-photo"><img v-show="member.headPortrait" :src="member.headPortrait"/></em>
                        <span class="nickname">{{member.nickname}}</span>
                        <span class="password_again" @click="againPass()">重置密码</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 col-sm-6">手机号<span>{{member.phone}}</span></div>
                    <div class="col-xs-12 col-sm-6">积分<span>{{member.point}}</span></div>
                </div>
                <div class="row">
                    <div class="col-xs-12 col-sm-6">余额 <span>{{member.balance}}</span></div>
                </div>
            </div>
            <div class="line"><span class="primary glyphicon glyphicon-tag"></span></div>
            <div class="custom-ticket">
                <div class="custom-ticket-header">优惠券</div>
                <div class="custom-ticket-body">
                    <div class="text-center" v-if="!member.appCoupons || !member.appCoupons.length">暂无优惠券</div>
                    <ul>
                        <li v-for="coupon in member.appCoupons">
                            <div class="left">
                                <span class="m">{{coupon.amount}}</span>
                                <span class="u">满{{coupon.conditionLine}}可用</span>
                            </div>
                            <div class="right">
                                    <span class="yxq" >有效期
                                        <em class="primary">{{coupon.endDate}}</em>
                                    </span>
                                <span class="l2">{{coupon.toSbName}}</span>
                                <span class="l3 primary">{{coupon.type | couponType}}</span>
                            </div>
                        </li>
                    </ul>

                 </div>
            </div>
            <div class="btn  storageStock btn-lightgreen " @click="goPcikGood()">
                <span class="iconfont icon-kucun invent_btn"></span> 查看存货信息
             </div>
        </div>
     </div>

</template>

<script>
    import layer from 'layer';
    export default{
        name:"CustomDetail",
        props:['member'],
        data(){
            return {
                msg:''
            }
        },
        created(){
//            console.log(this.member.id)
        },
        computed: {
//            customData() {
//                return this.$store.state.customData;
//            }
        },
        filters:{
            couponType(val){
                if(val === 'fullReduce'){
                    return '满减劵';
                }else if(val === 'fullBack'){
                    return '满返劵';
                }else{
                    return '';
                }
            }
        },
        methods:{

            goPcikGood(){
                var vm=this;
                alert(vm.member.id);
                this.$store.dispatch("fetchPickList",{"memberId":vm.member.id}).then(res=>{
                         alert(res);
                    this.$router.push({path:'/membercargo'});
                    this.$root.showCustomModal=false;
                    $("#layer-custom").modal('hide');
                });

            },
            againPass(){
                var vm=this;
                this.$root.showAgainPass=true;

                this.$nextTick(()=>{
                    layer.open({
                        id: 'layer-box',
                        type: 1,            //1 普通层
                        shade: 0.01,  //遮罩
                        anim: 0,
                        zIndex: 9999,
                        closeBtn: 1,
                        title: false,
                        area: ['auto', 'auto'], //宽高
                        content: $('#layer-again-box'),
                        success: function () {

                        },
                        end: function () {
                            vm.$root.showAgainPass=false
                        }
                    });
                })
            }
        }
    }
</script>


