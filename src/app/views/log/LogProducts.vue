<template>
	<commom-list>
		<div class="list-header" slot="list-header">
			<div class="list-row">
				<span class="col">商品</span>
				<span class="col">数量</span>
				<span class="col">条码</span>
			</div>
		</div>
		<div class="list-body" v-if="!listData.list">
			加载中...
        </div>
		<div class="list-body" v-else-if="listData.list.length==0">
			<div class="log-no-list"></div>
		</div>
		<div class="list-body" id="order-list-main-list" v-else>
			<!--list-->
			<div class="list-row" v-for="(item,index) in listData.list">
				<div class="t">
					<span>订单号： {{item.sn}}</span>
				</div>
				<div class="c">
					<span class="col">
						<img :src="item.image"/>
						<em>{{item.name}}</em>
					</span>
					<span class="col">{{item.quantity}}件</span>
					<span class="col" style="color: #999999;">{{item.barcode}}</span>
				</div>
			</div>
		</div>
		<div class="list-footer" slot="list-footer">
			<div class="footer-left">
				<pagination :page="listData" :go-callback="handleCurrentChange" ></pagination>
			</div>
		</div>
	</commom-list>

</template>

<style lang="less" scoped>

	@import "../../../less/util/skin.less";
	@import "../../../less/util/mixin.less";

	.refunded{
		color: @themeColor;
	}
	.list-row{
		clear: both;
		.col{
			display: block; width: 30%; float: left; text-align: center;
			&:nth-child(1){
				width: 40%;
				text-align: left;
			}
		}
		.clearfix;
	}

	.list-checkbox {
		margin-top:@gutter;
		margin-right:@gutter;
		width: 20px;
		height: 20px;
		overflow: hidden;
		display: inline-block;
		border-radius: 50%;
		border: solid 1px #cccccc;
		position: relative;

		&.inner-checkbox{
			margin-top:0;
			top:@gutter/2;
			margin-left:@gutter/2;
			width: 20px;
			height: 20px;
			overflow: hidden;
		}
		i{
			width: 100%;
			height:100%;
			overflow: hidden;
			position: absolute;
			pointer-events: none;
			top:0;
			left:0;

		}
		i:after{
			box-sizing: content-box;
			content: "";
			border: 2px solid #fff;
			border-left: 0;
			border-top: 0;
			height: 8px;
			left: 7px;
			position: absolute;
			top: 3px;
			transform: rotate(45deg) scaleY(0);
			width: 4px;
			transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
			transform-origin: center;
		}
		input[type=checkbox]{
			position: absolute;
			width: 100%;
			height:100%;
			opacity:0;
			margin: 0;
			outline:none;
			display: inline-block;
		}

		input[type=checkbox]:checked +i{
			background: @themeColor;
			border-radius: 50%;
		}
		input[type=checkbox]:checked +i:after {
			transform: rotate(45deg) scaleY(1);
		}

	}
	.list-header{
		line-height: 50px;
		font-size: 12px;
		text-align: center;
		.list-row .col{text-align: center;}
	}

	.list-body{

		height: @listHeight;
		overflow: hidden;


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
				font-size: 14px;
				line-height: 40px;
				span{
					&:first-child { float: left; text-align: left;}


					em{ margin-left: @gutter; display: inline-block; width: 75%; height: 60px;
								.norow;
					}

					img{width: 60px; height: 60px; display: inline-block;}
				}
				.clearfix;
			}
			.c {
				padding-left: @gutter;
				padding-right: @gutter;
				font-size: 12px;
				border-top: @borderDashedStyle;
				line-height:60px;
				.col {
					color: @color;
					dd{line-height: 30px;
						.norow;
						&.single{ line-height: 60px;}
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

		.refund-btn,.check-btn{
			font-size: 12px;
			line-height: 20px;
			.diy-btn(#ffffff,@themeColor,@themeColor,30px,@padding: 5px 20px);
		}
		.check-btn.dis{
			pointer-events: none;
			.diy-btn(#ffffff,#cccccc,#cccccc,30px,@padding: 5px 20px);
			opacity: 0.9;
		}
		.cancel-btn {
			margin-left: 5px;
			font-size: 12px;
			line-height: 20px;
			.diy-btn(@themeColor,#ffffff,@themeColor,30px,@padding: 5px 20px);
		}
	}
	.list-footer{
		.footer-center {
			height: 60px;
			width: 100%;
			line-height: 60px;
			text-align: right;
			color: @themeColor;
			font-size: 16px;
			span {
				font-size: 36px;
				padding-left: 12px;
				padding-right: 12px;
			}
			position: relative;
		}
		.footer-left{
			position: absolute;
			z-index:2;
			top:@gutter;
			left:@gutter;
		}
		.footer-right{
			position: absolute;
			top:@gutter;
			right:@gutter;



		}
	}
	</style>
<script>


    export default{
        name:"logProducts",
        data() {
            return {
                listData:{},
                pageNum:1,                 //一页显示多少个
            }
        },

        created(){
			this.fetchList()
        },
        methods:{
            handleCurrentChange(pageIndex){
                //this.$router.push({path:'/membercargo',query:{mid:item.id,p:this.pageNum}});
                this.pageNum=pageIndex;
                this.$router.replace({path:this.$route.path,query:{p:this.pageNum}});
                this.fetchList();
                window.scrollTo(0,0);
            },
            goCallback(pageIndex){
                this.pageNum=pageIndex;
                this.fetchList();
                window.scrollTo(0,0);
            },
            //请求列表
            fetchList() {
                this.$store.dispatch('fetchShiftList',{"pageNum":this.pageNum}).then(res=>{
                    	this.listData=res.page;
				}).catch(res=>{

                    this.$alert(res.msg,{
                        type: 'error',
                    })
                })
            }
        }
    }
</script>

