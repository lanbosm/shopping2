<template>
   	<div class="shoppingCart">
				<div class="shoppingCart-list" id="shoppingCart-list" :class="{empty:cartData.length==0}">
					<ul>
						<li :class="{checked:index==cartItemIndex}" v-for="(item,index) in cartData " track-by="$index" @click="checkCartItem(index);">
							<div class="shoppingCart-item">
								<p>{{item.title}}</p>
								<p class="small">
									<span>{{item.name}}</span>
									<span >
										<em v-if="item.isDiscount && item.discountPrice || item.isSales && item.sales">
											{{item | realPrice | currency}}
										</em>
										<em v-else>{{item.amount*item.price | currency }}</em>
									</span>
								</p>
								<p class="small">
									<span >
										数量 :{{item.amount}} * {{item.isDiscount}}
										<em v-if="item.isDiscount"  :class="{editPrice:item.isDiscount===true}">
											{{item.discountPrice | currency}}
										</em>
										<em v-else>{{item.price | currency }}</em>
									</span>
									<span class="tips" @click="openStock(item)">{{item | stocktips}}</span>
								</p>
								<p class="small sales" v-if="item.isSales">
									<i> {{item.sales}} 折</i>
								</p>
								<p class="small">
									<span v-if="item.appGiftItem">赠送：{{item.appGiftItem.name}}</span>
								</p>
							</div>
						</li>
					</ul>
				</div>
				<div class="totalprice">
					总价 <span class="primary">{{totalprice | currency }}</span>
				</div>
	</div>
</template>

<style>

</style>
<script>


    export default{
        name:"cart",
        filters: {
            stocktips: function (value) {
               // console.log(value.id);
                if(value.amount>value.availableStock) {
                    return "库存不足";
                }else{
                    return "";
				}
            },
			realPrice: function(e){
                var realPrcie=e.isDiscount?e.discountPrice:e.price;
                if( e.isSales && e.sales>=10){e.sales=10;}
                var realSales=e.isSales?e.sales*0.1:1;

                return  Number(realPrcie)*e.amount*realSales
			}
        },
		props:['cartData','cartItemIndex'],

        mounted(){
            this.$simpleScroll('.shoppingCart-list');
		},
        computed: {
            //数据来自全局
            totalprice () {
                var total=0;
                this.cartData.forEach(function(e,i){
                    var realPrcie=e.isDiscount?e.discountPrice:e.price;
                    if( e.isSales && e.sales>=10){e.sales=10;}
                    var realSales=e.isSales?e.sales*0.1:1;

                    console.log(realSales);
                    total+=Number(realPrcie)*e.amount*realSales;
                })
                return total;
            }

        },
        methods:{
            //自适应高
           setCartHeight (){

                    var w = window.innerWidth;
                    var lh = document.querySelector('.left-con').offsetHeight;
                    var ch = document.querySelector('.shoppingCalc').offsetHeight;


                    if (w >= 768) {
                        document.getElementById("#shoppingCart-list").style.display="block";
                        document.getElementById("shoppingCart-list").style.height = lh - ch - 140 + "px";
                    } else {

                        document.getElementById("#shoppingCart-list").style.display="none";
                    }

			},
            checkCartItem:function(index){
				//console.log(this.cartData);
                this.$parent.cartItemIndex=index;
            },
            openStock:function(item){
                if(item){
                	this.$emit('open-stock',item);
                }

			},
            openPrice:function(item){
                if(item){
                    this.$emit('open-price',item);
                }

            }
        }
    }
</script>

