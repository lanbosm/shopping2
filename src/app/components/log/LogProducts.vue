<template>
   	  <div class="log-products container">
			<div class="row">
				<div class="col-xs-12">
					<div class="list-header">
						<div class="list-row">
							<span>商品</span>
							<span>数量</span>
							<span>条码</span>
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
									编号： {{item.sn}}
								</div>
							  	<div class="c">
									<span>
										<img :src="item.image"/>
										<em>{{item.name}}</em>
									</span>
									<span>{{item.quantity}}件</span>
									<span>{{item.barcode}}</span>
								</div>
						  </div>

					  </div>
				  </div>
			</div>
		  	<div class="row">
				<div class="col-xs-12">
					<pagination :page="listData" :go-callback="goCallback"></pagination>
				</div>
			</div>
		  <div class="row list-footer">

		  </div>
      </div>
</template>

<style  rel="stylesheet/less"  lang="less">

    @import "../../../css/util/skin.less";
    @import "../../../css/util/mixin.less";

	.no-list{ width: 100%; height:600px; background: url(/images/no_list.jpg) no-repeat 50% 0%;}
    .log-products{
		position: relative;
        .list-row{

			clear: both;

		    span{
			   display: block; width: 25%; float: left; text-align: center;
			   &:first-child{width: 50%;}
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
			height: 600px;
			.list-row{
				border: solid 1px  @border-color;
				margin-top: @gutter;
				margin-bottom: @gutter;
				border-radius: 5px;
				clear: both;
				.t{
					color: @thinColor;
					padding-left: @gutter;
					padding-right: @gutter;
					font-size: 16px;
					line-height: 40px;
				}
				.c {
					padding-left: @gutter;
					padding-right: @gutter;
					font-size: 16px;
					border-top: @borderDashedStyle;
					line-height:100px;
					span {
						display: block;
						width: 25%;
						float: left;
						text-align: center;
						color: @thinColor;
						&:first-child {
							width: 50%;
							color: @color;
							text-align: left;
							em{ margin-left: @gutter; display: inline-block; width: 75%; height: 60px;
								.norow;
							}
						}
					}
					img{width: 60px; height: 60px; display: inline-block;}
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
        name:"logProducts",
        data() {
            return {
                listData:{},
                pageNum:1,                 //一页显示多少个
            }
        },
        components:{
            Pagination
        },
        created(){
			this.fetchList()
        },
        methods:{
            goCallback(pageIndex){
                this.pageNum=pageIndex;
                this.fetchList();
                window.scrollTo(0,0);
            },
            //请求列表
            fetchList() {
                this.$store.dispatch('fetchShiftList',{"pageNum":this.pageNum}).then(res=>{
                    	this.listData=res.page;
				})
            }
        }
    }
</script>

