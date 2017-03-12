<template>
	<div class="shoppingCalc">
		<table class="table table-bordered" >
			<tbody >
			<tr>
				<td colspan="3" class="t1" @click="showCustomModal" ><span class="iconfont icon-guanliyuan"></span>顾客</td>
				<td><a  class="num-btn btn-default" @click="calc(1);">1</a></td>
				<td><a  class="num-btn btn-default" @click="calc(2);">2</a></td>
				<td><a  class="num-btn btn-default" @click="calc(3);">3</a></td>
				<td rowspan="3"><a class="num-btn btn-lightgreen" style="" @click="calc('qty');" >QTY</a></td>
			</tr>

			<tr>
				<td colspan="3" rowspan="3" class="t1 ">
					<a class="settle-accounts-btn" @click="checkOrder"></a>
				</td>
				<td><a  class="num-btn btn-default" @click="calc(4);">4</a></td>
				<td><a  class="num-btn btn-default" @click="calc(5);">5</a></td>
				<td><a  class="num-btn btn-default" @click="calc(6);">6</a></td>
			</tr>
			<tr>
				<td><a class="num-btn btn-default" @click="calc(7);">7</a></td>
				<td><a class="num-btn btn-default" @click="calc(8);">8</a></td>
				<td><a class="num-btn btn-default" @click="calc(9);">9</a></td>
			</tr>
			<tr>

				<td colspan="3"><a class="num-btn btn-default" @click="calc(0);">0</a></td>

				<td><a class="num-btn btn-default" @click="calc('x');">x</a></td>
			</tr>
			</tbody>
		</table>

	</div>
</template>

<style>
</style>
<script>
    "use strict";
    import util from 'util/util.js';
    import $ from 'jquery';
    export default{
        name:"calc",
        filters: {
            currency: function (value) {
                if (!value) return '';
                return '¥ ' + value.toFixed(2);
            }
        },
        props:['cartData','cartItemIndex'],
        methods:{
            //显示会员模块
			showCustomModal(){
			    var layerCustom='#layer-custom';
                function centerModals() {
                    $(layerCustom).each(function(i) {
                        var $clone = $(this).clone().css('display','block').appendTo('body');
                        var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
                        top = top > 0 ? top : 0;
                        $clone.remove();
                        $(this).find('.modal-content').css("margin-top", top);
                    });
                };
                $(layerCustom).on('show.bs.modal', centerModals);
                //禁用空白处点击关闭
                $(layerCustom).modal({
                    backdrop: 'static',
                    keyboard: false,//禁止键盘
                    show:false
                });
				//页面大小变化是仍然保证模态框水平垂直居中
                $(window).on('resize', centerModals);
                $(layerCustom).modal('toggle');
			},
            //计算器
            calc:function(keycode){
                var vm=this;
                if(this.cartData.length==0){return;}

                var index=this.cartItemIndex;


                //选中的单价
                var price=this.cartData[index].price;
                //选中的数量
                var amount=this.cartData[index].amount;

                if(isNaN(keycode)){
                    switch (keycode) {
                        case 'qty': //resize
                            this.cartData[index].amount=1;
                            break;
                        case 'x':   //close
                            var str=amount+"";
                            amount=str.substring(0,str.length-1);
                            if(amount==""){
                                this.cartData.splice(index,1);
                            }
                            else{
                                this.cartData[index].amount=parseInt(amount);
                            }
                            break;
                    }
                }else{
                    if(amount){
                        amount+=keycode+'';
                    }else{
                        amount=keycode;
                    }
                    this.cartData[index].amount=parseInt(amount);

                }
            },
			//结账
            checkOrder:function(){
                if(this.cartData.length>0) {

                    this.$emit('trigger-build-order',this.cartData);

                }else{
                    alert('请先选择物品');
                }
            }

        }
    }
</script>

