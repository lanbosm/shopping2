<template>
	<div class="log-recharge container">
		<div class="row">
			<div class="col-xs-12">
				<div class="list-header">
					<div class="list-row">
						<span>会员</span>
						<span>支付方式</span>
						<span>充值金额</span>
						<span>充值时间</span>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<div class="list-body" v-if="!listData.list">
					加载中...
                </div>
				<div class="list-body" v-else-if="listData.list.length==0">
					<div class="log-no-list"></div>
				</div>
				<div class="list-body" v-else>
					<!--list-->
					<div class="list-row"  v-for="(item,index) in listData.list">
						<div class="col-xs-12">
							<span>{{item.username}}</span>
							<span>{{item.paymentMethod}}</span>
							<span>{{item.amount | currency }}</span>
							<span>{{item.date}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<pagination :page="listData" :go-callback="goCallback"></pagination>
				<!--listData-->
			</div>
		</div>
		<div class="row list-footer" v-if="shiftInfo.totalRecharge">
			<div class="col-xs-12">
				总充值<span>{{shiftInfo.totalRecharge | currency }}</span>元
			</div>
		</div>
	</div>
</template>

<style  rel="stylesheet/less"  lang="less">

	@import "../../../less/util/skin.less";
	@import "../../../less/util/mixin.less";

	.log-recharge{
		position: relative;
		.list-row{

			clear: both;
			span{ display: block; width: 25%; float: left; text-align: center;}
			.clearfix;
		}

		.list-header {
			.list-row{
				line-height: 50px;
				font-size: 18px;
			}
		}

		.list-body {
			height: @listHeight;
			.list-row{
				border: solid 1px  @border-color;
				line-height: 100px;
				font-size: 20px;
				margin-top:@gutter;
				margin-bottom: @gutter;
				color: @thinColor;
				border-radius: 5px;
				clear: both;
				span:nth-child(3){color:@themeColor;  font-size: 28px;}
				span:nth-child(4){color:#999999;}
			}
		}

		.list-footer{
			height: 90px;
			width: 100%;
			line-height: 90px;
			text-align: center;
			color: @themeColor;
			font-size: 16px;
			border-top: @borderDashedStyle;
			border-width: 2px;
			span{font-size: 36px; padding-left: 12px; padding-right: 12px;}
		}

	}


</style>
<script>

    import Pagination from 'components/pagination/Pagination.vue';

    export default{
        name:"log",
        data(){

            return {
                listData:{},
                shiftInfo:{},
                pageNum:1,                 //一页显示多少个
            }

        },
        components:{
            Pagination
        },
        filters: {
            currency: function (value) {
                if (!value) return '0.00';
                return '¥ ' + Number(value).toFixed(2);
            }
        },
        computed:{
            totalCash(){
                var sum=0;
                this.listData.list.forEach((ele,index)=>{

                    sum+=Number(ele.amountPaid);
                })
                return sum;
            }

        },
        created(){
            this.fetchList()
        },
        methods:{
            //
            goCallback(pageIndex){
                this.pageNum=pageIndex;
                this.fetchList();
                window.scrollTo(0,0);
            },
            //请求列表
            fetchList() {
                this.$store.dispatch('fetchLog',{"type":"recharge","pageNum":this.pageNum}).then(res=>{
                    this.listData=res.page;
                    this.shiftInfo=res.appShiftInfo;

                    console.log(this.shiftInfo);
                }).catch(res=>{

                    this.$alert(res.msg,{
                        type: 'error',
                    })
                })
            }
        }
    }
</script>

