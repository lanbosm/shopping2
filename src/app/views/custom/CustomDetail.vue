<!-- info -->
<template>
    <div class="detail" id="custom-detail">

        <div class="custom-table-body">
            <div class="custom-member">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 clearfix">
                        <!--{{customData.curCustom.sex | sex}}-->
                        <em class="sex-photo"><img v-show="member.headPortrait" :src="member.headPortrait"/></em>
                        <span class="nickname">{{member.nickname}}</span>
                        <span class="brand">
                            <em v-for="item in member.brands">{{item}}</em></span>
                        <span class="password_again" @click="againPass()">重置密码</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 col-sm-6">手机号<span>{{member.username}}</span></div>
                    <div class="col-xs-12 col-sm-6">积分<span>{{member.point}}</span></div>
                </div>
                <div class="row">
                    <div class="col-xs-12 col-sm-6">余额 <span>{{member.balance}}</span></div>
                </div>
            </div>
            <div class="custom-bar">
                    <a class="order-btn" @click="handleOrder()">订单</a>
                    <a class="rechange-btn" @click="handleRecharge()">充值</a>
            </div>
            <div class="custom-gallery" v-if="member.babyPhotos && member.babyPhotos.length>0">
                    <h5>宝宝照片</h5>
                    <div class="custom-gallery-list" id="custom-gallery-list">
                        <ul >
                            <li v-for="(item,index) in member.babyPhotos">
                                    <img :src="item"/>
                            </li>
                        </ul>
                    </div>

            </div>
            <div class="custom-ticket">
                <div class="line"><span class="primary glyphicon glyphicon-tag"></span></div>
                <div class="custom-ticket-header">优惠券</div>
                <div class="custom-ticket-body" id="custom-ticket-list">
                    <div class="text-center" v-if="!member.appCoupons || !member.appCoupons.length">暂无优惠券</div>
                    <ul >
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
            <div class="custom-stock-row" >
                <a class="storageStock-btn" @click="handleStock()">  <span class="iconfont icon-kucun"></span> 查看存货信息</a>
             </div>
        </div>
     </div>

</template>

<script>
    import layer from 'layer';
    export default{
        name:"CustomDetail",
        props:['member','orderCallback','rechargeCallback','stockCallback'],
        data(){
            return {
                photos:'',
                dialogFormVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px'
            }
        },
        created(){

                this.$nextTick(_=> {
                    this.$simpleScroll('#custom-ticket-list', 'vertical');
                    if(this.member&&this.member.babyPhotos.length>0){
                        this.$simpleScroll('#custom-gallery-list', 'horizontal');
                    }
                    this.$simpleScroll('#custom-detail', 'vertical');
                });
        },
        computed: {

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
            handleOrder(){
                this.orderCallback();
            },
            handleRecharge(){
                this.rechargeCallback();
            },
            handleStock(){

                this.stockCallback();

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


