<template>
    <div class="categroy row"  >
        <div class="col-xs-12 category-list clearfix" @mouseleave="navData.show=false">
        <div class="menu">
            <a href="#" class="sub " v-on:mouseenter="navData.index=index"  @click="getItemList(nav.id)" >链接1</a>
            <a href="#" class="sub " v-on:mouseenter="navData.index=index"  @click="getItemList(nav.id)" >链接1</a>
            <a href="#" class="sub " v-on:mouseenter="navData.index=index"  @click="getItemList(nav.id)" >链接1</a>
        </div>
            <!--<a :href="nav.id" class="sub btn-lightgreen" v-on:mouseenter="navData.index=index" v-for="(index,nav) in navData.list" @click="getItemList(nav.id)" >{{nav.name}}</a>-->

        <div class="sub-menu" >
                <!--<template v-if="!navData.list[navData.index]">-->
                    <!--<p> 数据加载中...</p>-->
                    <!--<template v-if="1<2">-->
                        <!--<p> 没有分类</p>-->
                    <!--</template>-->
                <!--</template>-->
                <!--<template v-else>-->
                    <div class="l">
                        <div class="l-t">国内</div>
                        <div class="l-c">
                            <a  class="btn btn-default sub-menu-category" href="#"  @click="getItemList(nav.id)">子类</a>
                        </div>
                    </div>
                    <div class="l">
                        <div class="l-t">国内</div>
                        <div class="l-c">
                            <a  class="btn btn-default sub-menu-category" href="#"  @click="getItemList(nav.id)">子类</a>
                            <a  class="btn btn-default sub-menu-category" href="#"  @click="getItemList(nav.id)">子类</a>
                            <a  class="btn btn-default sub-menu-category" href="#"  @click="getItemList(nav.id)">子类</a><a  class="btn btn-default sub-menu-category" href="#"  @click="getItemList(nav.id)">子类</a><a  class="btn btn-default sub-menu-category" href="#"  @click="getItemList(nav.id)">子类</a><a  class="btn btn-default sub-menu-category" href="#"  @click="getItemList(nav.id)">子类</a><a  class="btn btn-default sub-menu-category" href="#"  @click="getItemList(nav.id)">子类</a><a  class="btn btn-default sub-menu-category" href="#"  @click="getItemList(nav.id)">子类</a><a  class="btn btn-default sub-menu-category" href="#"  @click="getItemList(nav.id)">子类</a><a  class="btn btn-default sub-menu-category" href="#"  @click="getItemList(nav.id)">子类</a><a  class="btn btn-default sub-menu-category" href="#"  @click="getItemList(nav.id)">子类</a><a  class="btn btn-default sub-menu-category" href="#"  @click="getItemList(nav.id)">子类</a><a  class="btn btn-default sub-menu-category" href="#"  @click="getItemList(nav.id)">子类</a><a  class="btn btn-default sub-menu-category" href="#"  @click="getItemList(nav.id)">子类</a><a  class="btn btn-default sub-menu-category" href="#"  @click="getItemList(nav.id)">子类</a><a  class="btn btn-default sub-menu-category" href="#"  @click="getItemList(nav.id)">子类</a><a  class="btn btn-default sub-menu-category" href="#"  @click="getItemList(nav.id)">子类</a><a  class="btn btn-default sub-menu-category" href="#"  @click="getItemList(nav.id)">子类</a><a  class="btn btn-default sub-menu-category" href="#"  @click="getItemList(nav.id)">子类</a><a  class="btn btn-default sub-menu-category" href="#"  @click="getItemList(nav.id)">子类</a>
                        </div>
                    </div>

                <!--</template>-->

        </div>
        <!--<div class="sub-menu" >-->
        <!--<template v-if="!navData.list[navData.index]">-->
        <!--<p> 数据加载中...</p>-->
        <!--<template v-if="1<2">-->
        <!--<p> 没有分类</p>-->
        <!--</template>-->
        <!--</template>-->
        <!--<template v-else>-->
        <!--<a  class="btn btn-default sub-menu-category" :href="nav.id" v-for="(index,nav) in navData.list[navData.index].children" @click="getItemList(nav.id)">{{nav.name}}</a>-->
        <!--</template>-->
    <!---->
        <!--</div>-->

        </div>
    </div>
</template>

<style lang="less">


</style>
<script>
    "use strict";
  
    export default{
        name:"category",
        computed: {
            //数据来自全局
            listData () {
                return [];
            },
        },
        methods:{
            filterList:function(id){

                this.cartData.index=index;
            }
        }
    }
</script>

