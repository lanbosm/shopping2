//列表组件
<template>
	<div class="actlist">
		<div class="act-type">
				<a class="btn act-type-btn " :class="{selected:type=='all'}" @click="type='all'">全部</a>
				<a class="btn act-type-btn " :class="{selected:type=='type1'}"  @click="type='type1'">双倍积分</a>
				<a class="btn act-type-btn" :class="{selected:type=='type2'}"  @click="type='type2'">加价购</a>
		</div>
	    <div>
	        <div class="row"  v-if="!itemData">
	            <div class="col-xs-12">
	                加载中...
	            </div>
	        </div>
	        <div class="row"  v-else-if="itemData.length == 0">
	            <div class="col-xs-12">
	                没有数据
	            </div>
	        </div>
	        <div  id="actProductList"  v-else>
	           <div class="product">
					   <div class="col-xs-2 act-col" v-for="(item,index) in itemData "  @click="fetchItem(item.id);">
						   <div class="item">
							   <!--图片盒子-->
							   <div class="cc">
								   <div class="photo" :style="{'background-image':'url('+item.image+')'}">

									   <div class="txt">
										   <a  class="buy-btn" role="button"   v-show="item.giftType!='none'" ><span class="iconfont icon-baobei"></span></a>
										   <a  class="list-btn" role="button"   v-show="item.specDesc&&item.specDesc.length"><span class="iconfont icon-liebiao"></span></a>
										   <span class="info">
														 <span class="price">{{item.price | currency }}</span><span class="stock">&times;{{item.availableStock}}</span>
													</span>
									   </div>
								   </div>
							   </div>
							   <!--http://aoupprod.oss-cn-beijing.aliyuncs.com/ads/2017-03-25/08b32783-e2aa-407d-a1f8-ee1faced0364.png-->
							   <!--文本盒子-->
							   <div class="tt">
								   {{item.name}} {{item.barCode}}
								</div>
						   </div>
					   </div>
				   <div class="col-xs-2 act-col" v-for="(item,index) in itemData "  @click="fetchItem(item.id);">
					   <div class="item">
						   <!--图片盒子-->
						   <div class="cc">
							   <div class="photo" :style="{'background-image':'url('+item.image+')'}">

								   <div class="txt">
									   <a  class="buy-btn" role="button"   v-show="item.giftType!='none'" ><span class="iconfont icon-baobei"></span></a>
									   <a  class="list-btn" role="button"   v-show="item.specDesc&&item.specDesc.length"><span class="iconfont icon-liebiao"></span></a>
									   <span class="info">
														 <span class="price">{{item.price | currency }}</span><span class="stock">&times;{{item.availableStock}}</span>
													</span>
								   </div>
							   </div>
						   </div>
						   <!--http://aoupprod.oss-cn-beijing.aliyuncs.com/ads/2017-03-25/08b32783-e2aa-407d-a1f8-ee1faced0364.png-->
						   <!--文本盒子-->
						   <div class="tt">
							   {{item.name}} {{item.barCode}}
								</div>
					   </div>
				   </div>

				   <dl class="act-box">
							<dt class="dd1">满200</dt>
							<dd class="dd2">加10元</dd>
						   <dd class="dd3">
							   <em @click="wait();">查看赠品</em>
							   <small>当前金额 $ 60.00</small>
						   </dd>
						   <dd class="dd4" @click="wait();">查看全部</dd>
				   </dl>
			   </div>

				<div class="product">
					<div class="col-xs-2 act-col" v-for="(item,index) in itemData "  @click="fetchItem(item.id);">
						<div class="item">
							<!--图片盒子-->
							<div class="cc">
								<div class="photo" :style="{'background-image':'url('+item.image+')'}">

									<div class="txt">
										<a  class="buy-btn" role="button"   v-show="item.giftType!='none'" ><span class="iconfont icon-baobei"></span></a>
										<a  class="list-btn" role="button"   v-show="item.specDesc&&item.specDesc.length"><span class="iconfont icon-liebiao"></span></a>
										<span class="info">
														 <span class="price">{{item.price | currency }}</span><span class="stock">&times;{{item.availableStock}}</span>
													</span>
									</div>
								</div>
							</div>
							<!--http://aoupprod.oss-cn-beijing.aliyuncs.com/ads/2017-03-25/08b32783-e2aa-407d-a1f8-ee1faced0364.png-->
							<!--文本盒子-->
							<div class="tt">
								{{item.name}} {{item.barCode}}
								</div>
						</div>
					</div>
					<div class="col-xs-2 act-col" v-for="(item,index) in itemData "  @click="fetchItem(item.id);">
						<div class="item">
							<!--图片盒子-->
							<div class="cc">
								<div class="photo" :style="{'background-image':'url('+item.image+')'}">

									<div class="txt">
										<a  class="buy-btn" role="button"   v-show="item.giftType!='none'" ><span class="iconfont icon-baobei"></span></a>
										<a  class="list-btn" role="button"   v-show="item.specDesc&&item.specDesc.length"><span class="iconfont icon-liebiao"></span></a>
										<span class="info">
														 <span class="price">{{item.price | currency }}</span><span class="stock">&times;{{item.availableStock}}</span>
													</span>
									</div>
								</div>
							</div>
							<!--http://aoupprod.oss-cn-beijing.aliyuncs.com/ads/2017-03-25/08b32783-e2aa-407d-a1f8-ee1faced0364.png-->
							<!--文本盒子-->
							<div class="tt">
								{{item.name}} {{item.barCode}}
								</div>
						</div>
					</div>
					<dl class="act-box overline">
						<dt class="dd1">满200</dt>
						<dd class="dd2">加10元</dd>
						<dd class="dd3">
							<em @click="wait();">查看赠品</em>
							<small>当前金额 $ 60.00</small>
						</dd>
						<dd class="dd4" @click="wait();">查看全部</dd>
					</dl>
				</div>

				<div class="product">
					<div class="col-xs-2 act-col" v-for="(item,index) in itemData "  @click="fetchItem(item.id);">
						<div class="item">
							<!--图片盒子-->
							<div class="cc">
								<div class="photo" :style="{'background-image':'url('+item.image+')'}">

									<div class="txt">
										<a  class="buy-btn" role="button"   v-show="item.giftType!='none'" ><span class="iconfont icon-baobei"></span></a>
										<a  class="list-btn" role="button"   v-show="item.specDesc&&item.specDesc.length"><span class="iconfont icon-liebiao"></span></a>
										<span class="info">
														 <span class="price">{{item.price | currency }}</span><span class="stock">&times;{{item.availableStock}}</span>
													</span>
									</div>
								</div>
							</div>
							<!--http://aoupprod.oss-cn-beijing.aliyuncs.com/ads/2017-03-25/08b32783-e2aa-407d-a1f8-ee1faced0364.png-->
							<!--文本盒子-->
							<div class="tt">
								{{item.name}} {{item.barCode}}
								</div>
						</div>
					</div>
					<div class="col-xs-2 act-col" v-for="(item,index) in itemData "  @click="fetchItem(item.id);">
						<div class="item">
							<!--图片盒子-->
							<div class="cc">
								<div class="photo" :style="{'background-image':'url('+item.image+')'}">

									<div class="txt">
										<a  class="buy-btn" role="button"   v-show="item.giftType!='none'" ><span class="iconfont icon-baobei"></span></a>
										<a  class="list-btn" role="button"   v-show="item.specDesc&&item.specDesc.length"><span class="iconfont icon-liebiao"></span></a>
										<span class="info">
														 <span class="price">{{item.price | currency }}</span><span class="stock">&times;{{item.availableStock}}</span>
													</span>
									</div>
								</div>
							</div>
							<!--http://aoupprod.oss-cn-beijing.aliyuncs.com/ads/2017-03-25/08b32783-e2aa-407d-a1f8-ee1faced0364.png-->
							<!--文本盒子-->
							<div class="tt">
								{{item.name}} {{item.barCode}}
								</div>
						</div>
					</div>

					<dl class="act-box">
						<dt class="dd1">满200</dt>
						<dd class="dd2">加10元</dd>
						<dd class="dd3">
							<em @click="wait();">查看赠品</em>
							<small>当前金额 $ 60.00</small>
						</dd>
						<dd class="dd4" @click="wait();">查看全部</dd>
					</dl>
				</div>
			</div>


	    </div>
	</div>    
</template>
<script>
    export default {
        name: 'ProductList',
        props:["productParams","page"],
        computed: {
            itemData () {
                return this.page.list;
            },
            activeid(){
                return this.$store.state.activeId.number;
            }
        },
        filters: {
            currency: function (value) {
                if (!value) return '';
                return '¥ ' + value;
            }
        },
        created(){

        },
        data(){
          	return {
          	    type:"all"
			}

		},
        mounted(){
            this.$nextTick(_ => {
            setTimeout(_=> {

                    this.$simpleScroll('#actProductList', 'vertical', false);

            },300);
            });
        },
        methods:{
            //获取物品详情
            fetchItem:function(pid){
                this.$store.dispatch('fetchItem',pid).then(res=>{
                     this.$emit('open-detail'); //主动触发upup方法，'hehe'为向父组件传递的数据  父级传过来的方法  用$emit方法去触发
                })
            },
			wait(){

                this.$alert('此功能未开放',{
                    type:'warning'
				})
                    .then(_ => {

                    })

			}

        }
    }
</script>

<style scoped>


</style>