<template>
   	  <div class="log-sales container">
			<div class="row">
				<div class="col-xs-12">
					<div class="list-header">
						<div class="list-row">
							<span>订单信息</span>
							<span>单价/数量</span>
							<span>买家</span>
							<span>实付金额</span>
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
						<div class="no-list"></div>
					</div>
					<div class="list-body" v-else>
						<!--list-->
						<div class="list-row" v-for="(item,index) in listData.list">
							<div class="t">
								<span>订单号： {{item.sn}} x  {{item.paymentMethod}}</span><span>{{item.createDate}}</span>
							</div>
							<div class="c">
									<dl class="col">
										<dd  v-for="item2 in item.items" :class="{'single':item.items.length==1}">{{item2.name}}</dd>
									</dl>
									<dl class="col">
										<dd  v-for="item2 in item.items" :class="{'single':item.items.length==1}">
											{{item2.price}} x {{item2.quantity}}
										</dd>
									</dl>
									<span class="col">{{item.username}}</span>
									<span class="col">{{item.amountPaid}}</span>
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
		  <div class="row list-footer" v-if="shiftInfo.totalSales">
				<div class="col-xs-12">
					总销售额<span>{{shiftInfo.totalSales | currency }}</span>元
				</div>
		  </div>
      </div>
</template>

<style  rel="stylesheet/less"  lang="less">

    @import "../../../css/util/skin.less";
    @import "../../../css/util/mixin.less";

    .log-sales{
		position: relative;



		.list-row{

			clear: both;

			span{
				display: block; width: 20%; float: left;text-align:center;
				&:first-child{width: 40%;}
			}
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
				margin-top: @gutter;
				margin-bottom: @gutter;
				border-radius: 5px;
				clear: both;
				.t{
					background: #f7f7f7;
					color: @thinColor;
					padding-left: @gutter;
					padding-right: @gutter;
					font-size: 16px;
					line-height: 40px;
					span{
						&:first-child { float: left; text-align: left;}
						&:last-child { float: right; text-align: right;}
					}
					.clearfix;
				}
				.c {
					padding-left: @gutter;
					padding-right: @gutter;
					font-size: 16px;
					border-top: @borderDashedStyle;
					line-height:60px;
					.col {
						display: block;
						width: 20%;
						float: left;
						text-align: center;
						color: @color;

						dd{line-height: 20px;
							.norow;
							&.single{ line-height: 60px;}
						}
						&:first-child {
							width: 40%;
							text-align: left;
							em{ margin-left: @gutter; display: inline-block; width: 75%; height: 60px;
								.norow;
							}
						}
						&:last-child {
							color: @themeColor;
							font-size: 24px;
						}
					}
					img{width: 60px; height: 60px; display: inline-block;}
					.clearfix;
				}
				.clearfix;
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
        name:"logSales",
        data(){

            return {
                listData:{},
                shiftInfo:{},
                pageNum:1,                 //一页显示多少个
            }

		},
        filters: {
            currency: function (value) {
                if (!value) return '0.00';
                return '¥ ' + Number(value).toFixed(2);
            }
        },
        components:{
            Pagination
        },
        created(){
			this.fetchList()
        },
        methods:{
            //
            goCallback(pageIndex){
                this.pageNum=pageIndex;
                this.fetchList()
            },
            //请求列表
            fetchList() {

                    this.$store.dispatch('fetchLog',{"type":"sales","pageNum":this.pageNum}).then(res=>{
                         this.listData=res.page;
                         this.shiftInfo=res.appShiftInfo;
                    })
            }
        }
    }
</script>

