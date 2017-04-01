<template>
   	  <div class="log-cash container">
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
					  <div class="list-body">
						  <!--list-->
						  <div class="list-row">
							  <span>13111222111</span>
							  <span>POS机</span>
							  <span>100.00</span>
							  <span>2016-10-14 19:10:10</span>
						  </div>
						  <div class="list-row">
							  <span>13111222111</span>
							  <span>POS机</span>
							  <span>100.00</span>
							  <span>2016-10-14 19:10:10</span>
						  </div>
						  <div class="list-row">
							  <span>13111222111</span>
							  <span>POS机</span>
							  <span>100.00</span>
							  <span>2016-10-14 19:10:10</span>
						  </div>
						  <div class="list-row">
							  <span>13111222111</span>
							  <span>POS机</span>
							  <span>100.00</span>
							  <span>2016-10-14 19:10:10</span>
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
		  <div class="row list-footer">
				<div class="col-xs-12">
					当前充值<span>300</span>元
				</div>
		  </div>
      </div>
</template>

<style  rel="stylesheet/less"  lang="less">

    @import "../../../css/util/skin.less";
    @import "../../../css/util/mixin.less";

    .log-cash{
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
			height: 600px;
			.list-row{
				border: solid 1px  #e5e5e5;
				line-height: 100px;
				font-size: 20px;
				margin-top: 12px;
				margin-bottom: 12px;

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
        computed:{
            listData(){

                    return {"pageNum":1,"pageSize":10,"size":10,"orderBy":null,"startRow":1,"endRow":10,"total":205,"pages":21,"list":[{"image":null,"name":"太子乐领护优900克2段","barCode":"03222","price":"256.00","id":416,"giftType":"none","brandName":"太子乐领护优","textTagStr":"","specDesc":"[]","stock":120},{"image":"http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-03-21/59da36d0-8cf5-413d-b6d4-a23ea3762254.png","name":"艾膳婴幼儿配方营养腹泻粉 400g","barCode":"52017032123836","price":"118.00","id":417,"giftType":"none","brandName":"艾膳安腹奶粉","textTagStr":"","specDesc":"[]","stock":120},{"image":"http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-03-04/2cccddd3-6395-47b6-a873-1b7efe5f44be.png","name":"宝素力加护金装幼儿配方奶粉 900g3段","barCode":"6939835600472","price":"278.00","id":421,"giftType":"none","brandName":"宝素力奶粉","textTagStr":"","specDesc":"","stock":240},{"image":"http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-03-04/de02ae33-fa0c-4d66-8f98-e1426ac597ec.png","name":"宝素力加护金装较大婴儿配方奶粉900g2段","barCode":"6939835600465","price":"278.00","id":422,"giftType":"none","brandName":"宝素力奶粉","textTagStr":"","specDesc":"","stock":240},{"image":"http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-03-04/76535de6-3468-43fa-a925-b42a96323002.png","name":"宝素力加护金装婴儿配方奶粉900g1段","barCode":"6939835600458","price":"278.00","id":423,"giftType":"none","brandName":"宝素力奶粉","textTagStr":"","specDesc":"","stock":240},{"image":"http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-03-04/03a7ae52-21ab-4ecc-bdf3-c932d5ee3635.png","name":"宝素力加护100幼儿配方奶粉900g3段","barCode":"6939835601240","price":"338.00","id":424,"giftType":"none","brandName":"宝素力奶粉","textTagStr":"","specDesc":"","stock":240},{"image":"http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-03-04/a1766a5d-9e5c-4456-b86e-174510027b41.png","name":"宝素力加护100较大婴儿配方奶粉900g2段","barCode":"6939835601233","price":"338.00","id":425,"giftType":"none","brandName":"宝素力奶粉","textTagStr":"","specDesc":"","stock":240},{"image":"http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-03-04/170a74e5-6503-42b5-8117-9aae4bcd4cc9.png","name":"宝素力加护100婴儿配方奶粉900g1段","barCode":"6939835600953","price":"338.00","id":426,"giftType":"none","brandName":"宝素力奶粉","textTagStr":"","specDesc":"","stock":240},{"image":"http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-03-04/170a74e5-6503-42b5-8117-9aae4bcd4cc9.png","name":"宝素力加护100婴儿配方奶粉900g1段","barCode":"6939835600953","price":"338.00","id":427,"giftType":"none","brandName":"宝素力奶粉","textTagStr":"","specDesc":"","stock":140},{"image":"http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-03-04/170a74e5-6503-42b5-8117-9aae4bcd4cc9.png","name":"宝素力加护100婴儿配方奶粉900g1段","barCode":"6939835600953","price":"338.00","id":428,"giftType":"none","brandName":"宝素力奶粉","textTagStr":"","specDesc":"","stock":300}],"firstPage":1,"prePage":0,"nextPage":2,"lastPage":8,"isFirstPage":true,"isLastPage":false,"hasPreviousPage":false,"hasNextPage":true,"navigatePages":8,"navigatepageNums":[1,2,3,4,5,6,7,8]};

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
               alert(pageIndex);
            },
            //请求列表
            fetchList() {


            }
        }
    }
</script>

