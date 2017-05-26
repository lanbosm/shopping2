<template>
	<div class="container-fluid index"  >
        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

        <el-dialog
                :visible.sync="dialogVisible"
                :size="small"
                :before-close="handleClose">
              <span slot="title" class="dialog-title">
                  <div class="con1" v-if="con1">
                      <el-table :data="gridData">
                        <el-table-column property="date" label="日期" width="150"></el-table-column>
                        <el-table-column property="name" label="姓名" width="200"></el-table-column>
                        <el-table-column property="address" label="地址"></el-table-column>
                      </el-table>
                  </div>
                  <div class="con2" v-if="con2">
                            <el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title="一致性 Consistency" name="1">
    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
  </el-collapse-item>
  <el-collapse-item title="反馈 Feedback" name="2">
    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
  </el-collapse-item>
  <el-collapse-item title="效率 Efficiency" name="3">
    <div>简化流程：设计简洁直观的操作流程；</div>
    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
  </el-collapse-item>
  <el-collapse-item title="可控 Controllability" name="4">
    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
  </el-collapse-item>
</el-collapse>



                  </div>
              </span>
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="openSecend()">确 定</el-button>
      </span>
            </el-dialog>


            <!--<div class="row" >-->
                <!--<div class="col-xs-9 left-con">-->
                    <!--&lt;!&ndash;<div class="left-con-header">&ndash;&gt;-->
                        <!--&lt;!&ndash;&lt;!&ndash;<breadcrumb  ref="breadcrumb" :product-params="productParams"></breadcrumb>&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--<div class="left-con-content">-->
                        <!--<Loading v-if="listLoading"></Loading>-->
                        <!--<div class="item-box panel panel-primary">-->
                            <!--<div class="panel-heading" >-->
                                <!--<category :show-category="showCategory" :product-categories="productCategories" :product-params="productParams"></category>-->
                                <!--<div class="row">-->
                                    <!--<div class="col-xs-2">-->
                                        <!--<a class="btn btn-gray shuaixuan" :class="{activeOn:activty==false}" @click="showCategory=!showCategory; activeTabt()" ><span class="glyphicon glyphicon-th-list"></span>分类筛选</a>-->
                                    <!--</div>-->
                                    <!--<div class="col-xs-2 activity">-->
                                        <!--<a class="btn btn-gray shuaixuan" @click="activeTab()"  :class="{activeOn:activty==true}" ><span class="glyphicon glyphicon-fire"></span>活动专区</a>-->
                                    <!--</div>-->
                                    <!--<div class="col-xs-3  col-xs-offset-5 ">-->
                                        <!--<searchbar  :product-params="productParams"></searchbar>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div class="panel-body">-->
                                <!--<active-head v-show="activty" :flag="flag"></active-head>-->
                                <!--<product-list :page="page" :product-params="productParams"  @open-detail="openDetail" v-show="flag"></product-list>-->
                                <!--<add-price :page="page" :product-params="productParams" @open-detail="openDetail" v-show="!flag"></add-price>-->
                            <!--</div>-->
                            <!--<div class="panel-footer">-->
                                <!--<Pagination :page="page" :go-callback="goCallback" v-show="flag"></Pagination>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
               <!---->
                <!--<div class="col-xs-3 right-con" >-->
                    <!--&lt;!&ndash; 购物车 &ndash;&gt;-->
                    <!--<cart @open-stock="openStock" :cart-data="cartData" :cart-item-index="cartItemIndex"></cart>-->
                    <!--&lt;!&ndash; 计算器 &ndash;&gt;-->
                    <!--<calc @trigger-build-order="buildOrder" :cart-data="cartData" :cart-item-index="cartItemIndex"></calc>-->
                <!--</div>-->
            <!--</div>-->
    </div>
</template>

<style>
</style>
<script>

    import breadcrumb from 'views/products/breadcrumb.vue';
    import searchbar from 'views/products/searchbar.vue';
    import category from 'views/products/category.vue';

    import AppCart from 'views/products/cart.vue';
    import AppCalc from 'views/products/calc.vue';
    import Loading from 'views/products/Loading.vue';


    import ProductList from 'views/products/List.vue';
    import addPrice from 'views/products/addPrice.vue';
    import activeHead from 'views/products/activeHead.vue';

    //import Pagination  from 'views/products/Pagination.vue';
    import Pagination from 'components/pagination/Pagination.vue';

    import layer from 'layer';
    import util from 'util/util.js';
    import {request, API_URLS} from 'util/request.js';

    export default {
        data() {
            return {
                msg:"动态东西1",
                dialogVisible: false,
                dialogVisible2:false,
                con1:true,
                con2:false
            };
        },
        methods: {
            openSecend(){
                this.dialogVisible = true;
                this.con1=!this.con1;
                this.con2=!this.con2;
                this.msg="动态东西2";
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        alert(done);
                        done();
                    })
                    .catch(_ => {});
            }
        }
    };

</script>

