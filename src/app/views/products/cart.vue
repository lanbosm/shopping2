<template>
   	<div class="shoppingCart">
				<div class="shoppingCart-list" id="shoppingCart-list" :class="{empty:filterCartData.length==0 && pickData.length==0}">
					<ul>
						<li :class="{checked:item.id==cartSelectItem.id && cartZone=='cart'}" v-for="(item,index) in filterCartData " @click="checkCartItem(item,'cart',cartData);">
							<div class="shoppingCart-item">
								<p>{{item.title}}</p>
								<p class="small">

									<span>{{item.name}}</span>
									<span >
										<em v-if="item.isDiscount && item.discountPrice || item.isSales && item.sales">
															{{item | realPrice | currency}}
										</em>
										<em v-else-if="item.seckillPrice"><del>{{item.amount * item.price | currency }}</del>{{item.amount * item.seckillPrice | currency }} </em>
										<em v-else>{{item.amount * item.price | currency }}</em>
									</span>
								</p>
								<p class="small">
									<span >
										数量 :{{item.amount}} *
										<em v-if="item.isDiscount"  :class="{editPrice:item.isDiscount===true}">
											{{item.discountPrice | currency}}
										</em>
										<em v-else>{{item.seckillPrice || item.price | currency }}</em>
									</span>
									<span class="tips" v-if="item.needStock" @click="openStock(item)">
										<a class="btn needStock-btn">申请调拨</a>
									</span>
								</p>
								<p class="small sales" v-if="item.isSales">
									<i> {{item.sales}} 折</i>
								</p>
								<p class="small">
									<span v-if="item.appGiftItem">赠送：{{item.appGiftItem.name}}</span>
								</p>
							</div>
						</li>
						<div class="add-list" v-if="filterAddData.length>0"  >
								<div class="add-list-box"  v-if="row.pickItems.length>0" v-for="(row,rowindex) in filterAddData">
									<div class="title" :class="{over:row.overline}">
										+ 加购价 <span>满 {{row.meetPrice}} 加 {{row.additionalPrice}}元 </span>
									</div>
									<ul>
										<li :class="{checked:item.id==cartSelectItem.id && cartZone==row.name}" v-for="(item,index) in row.pickItems" @click="checkCartItem(item,row.name,row.pickItems);">
												<div class="shoppingCart-item">
													<p>{{item.title}}</p>
													<p class="small">
														<span>{{item.name}}</span>
														<span >
														<em v-if="item.isDiscount && item.discountPrice || item.isSales && item.sales">
															{{item | realPrice | currency}}
														</em>
														<em v-else-if="item.seckillPrice"><u>{{item.amount * item.price | currency }}<</u>{{item.seckillPrice | currency }} </em>
														<em v-else>{{item.amount * item.price  | currency }}</em>
													</span>
													</p>
													<p class="small">
														<span >
															数量 :{{item.amount}} *
															<em v-if="item.isDiscount"  :class="{editPrice:item.isDiscount===true}">
																{{item.discountPrice | currency}}
															</em>
															<em v-else>{{item.seckillPrice || item.price | currency }}</em>
														</span>
														<span class="tips" v-if="item.amount>item.availableStock" >
															<a class="btn needStock-btn">库存不足</a>
														</span>
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
									<div class="addProuct" v-if="row.addProuct">
											<li>
												<div class="shoppingCart-item">
													<p class="small">
														<span>{{row.addProuct.name}} <b>加价购</b></span>
														<span >
															<em ><b>{{row.addProuct.additionalPrice | currency }}</b></em>
														</span>
													</p>
													<p class="small">
														<span >
															数量 :1 * <em><del>{{row.addProuct.price | currency }}</del></em>
														</span>
													</p>
												</div>
											</li>
									</div>
								</div>
						</div>
					</ul>
					<div class="totalprice">
						总价 <span class="primary">{{totalprice | currency }}</span>
					</div>
				</div>

	</div>
</template>

<style>

</style>
<script>


    export default{
        name:"cart",
        filters: {
			realPrice: function(e){
                var realPrcie=e.isDiscount?e.discountPrice:e.seckillPrice?e.seckillPrice:e.price;

                if( e.isSales && e.sales>=10){e.sales=10;}
                var realSales=e.isSales?e.sales*0.1:1;

                return  Number(realPrcie)*e.amount*realSales
			}
        },
		props:['cartData','addData','cartSelectItem','cartZone'],

        created(){
            this.$nextTick(_=> {
                this.$simpleScroll('.shoppingCart-list');
            });

		},
        watch:{



		},
        computed: {
            filterCartData(){

                this.cartData.forEach((ele,index)=>{

                    if(ele.amount>ele.availableStock){
                        this.$set(ele,'needStock',true);
					}else{
                        this.$set(ele,'needStock',false);
					}

				});

              	return   this.cartData;
			},
            filterAddData(){
                //检查是否
                this.addData.forEach((ele,index)=>{

						 if(!ele.overline){

					     delete  ele.addProuct;
                     }
				})
				//console.log(this.addData);
                return   this.addData;
            },
            pickData(){
                var pickData=[];
               // console.log(this.addData);
                this.addData.forEach((ele, index) => {
                    pickData= pickData.concat(ele.pickItems);
                });

                return pickData;
            },
            additionalData(){
                var additionalData=[];

                this.addData.forEach((ele, index) => {

                    if(ele.addProuct) {
                        additionalData.push(ele.addProuct);
                    }
                });
                return  additionalData;
			},
            //数据来自全局
            totalprice () {
                var total=0;
                this.cartData.forEach(function(e,i){
                    var realPrcie=e.isDiscount?e.discountPrice:e.seckillPrice?e.seckillPrice:e.price;
                    if( e.isSales && e.sales>=10){e.sales=10;}
                    var realSales=e.isSales?e.sales*0.1:1;

                   // console.log(realSales);
                    total+=Number(realPrcie)*e.amount*realSales;
                })

				//选择加价购的物品
                this.pickData.forEach(function(e,i){
                    var realPrcie=e.isDiscount?e.discountPrice:e.price;
                    if( e.isSales && e.sales>=10){e.sales=10;}
                    var realSales=e.isSales?e.sales*0.1:1;
                    // console.log(realSales);
                    total+=Number(realPrcie)*e.amount*realSales;
                })


                //加价购的的价格
                this.additionalData.forEach(function(e,i){
                    // console.log(realSales);
                   		total+=Number(e.additionalPrice);
                })
                //this.additionalData.addProuct()


                return total;
            }

        },
        methods:{

            checkCartItem:function(item,type,list){

                this.$parent.cartZone=type;
                this.$parent.cartZoneList=list;
                this.$parent.cartSelectItem = item;

            },
            openStock:function(item){
                if(item){
                	this.$emit('open-stock',item);
                }

			}

        }
    }
</script>

