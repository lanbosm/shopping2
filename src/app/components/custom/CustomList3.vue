<!-- list -->
<!--                    <div v-for="(v, i) in listData.list" :key="v.id" @click="activeIndex" :class="['category-item', { active: v.id === activedCategory }]">
-->
<template>
    <div class="list" >
        <div class="custom-table-body" >
            <p class="data-placeholder" v-if="!listData.list" >数据加载中...</p>
            <p class="data-placeholder" v-else-if="listData.list.length==0" >暂无记录</p>
            <ul class="custom-list">
            <scroll :scroll-to-ele="scrollToEle" :refresh-status="true" :scroll-direction=scrollDirection :after-release="afterRelease" :before-release="beforeRelease">

                    <li v-for="(item,index) in listData.list" :class="{select:index==currentIndex}" @click="checkCustom(index)"
                        @dblclick="viewCustom(item,index)">
                        <div class="item-col item-col1">
                        <div class="item-photo" style="width: 200px;">
                        <img :src="item.headPortrait" />
                        </div>
                        </div>
                        <div class="item-col item-col2">
                        <span>{{item.name}}</span>
                        </div>
                        <div class="item-col item-col3">
                        <span>{{item.phone}}</span>
                        </div>
                       </li>
                      </scroll>
            </ul>
                      <!--<ul class="custom-list" v-else >-->
              <!--<li v-for="(item,index) in listData.list" :class="{select:index==currentIndex}" @click="checkCustom(index)"-->
                    <!--@dblclick="viewCustom(item,index)">-->
                  <!--<div class="item-col item-col1">-->
                      <!--<div class="item-photo">-->
                        <!--<img :src="item.headPortrait"/>-->
                      <!--</div>-->
                  <!--</div>-->
                  <!--<div class="item-col item-col2">-->
                      <!--<span>{{item.name}}</span>-->
                  <!--</div>-->
                  <!--<div class="item-col item-col3">-->
                      <!--<span>{{item.phone}}</span>-->
                <!--</div>-->
              <!--</li>-->

          <!--</ul>-->
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="listData.pageNum"
                    :page-size=listData.pageSize
                    layout="total, prev, pager, next"
                    :total=listData.total>
            </el-pagination>
        </div>
    </div>
</template>
<style lang="less">
    .custom-list{
        width: 100%;
        height:300px;
        overflow: hidden
    }
    .scroll-wrap {
        overflow: hidden;
        width: 100%;
        height: 100%;
        line-height: 0;
        position: relative;

    }
    .scroll-horizontal {
        &-inner {
            min-width: 100%;
            height: 100%;
            line-height: 0;
            display: table-cell;
            white-space: nowrap;
            transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);
            // transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
            transition-duration: 0ms;
            transform: translate(0px, 0px) translateZ(0px);
            backface-visibility: hidden;
            position: relative;
            z-index: 2;
        }
        &-item {
            display: inline-block;;
        }
    }
    .scroll-vertical {
        &-inner {
            width: 102%;
            // overflow-y: scroll;
            transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);
            transition-duration: 0ms;
            transform: translate(0px, 0px) translateZ(0px);
            backface-visibility: hidden;
            position: relative;
        }
        &-item {
            display: inline-block;
            width: 100%;
        }
    }
    .scroll-shadow {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        z-index: 1;
    }


</style>
<script>
        import Scroll from 'components/scroll/Scroll'
        require('components/scroll/Scroll.less')
        export default{
        name:"CustomList",
        props:['listIndex','listData','listCallback','pageTo','selectedCustom'],
        data(){
            return {
                custom:{},
                currentIndex:1,
                scrollToEle: undefined,
               // moreShadow: true, // 滚动至尾部是否展示阴影效果（仅对水平滑动有效）
                scrollDirection: 'vertical' // (horizontal/vertical, 默认horizontal)
            }
        },
        components: {
                Scroll
        },
        created(){


            this.custom=this.selectedCustom;

            if(this.listIndex){
                this.currentIndex=this.listIndex;
            }else{
                this.currentIndex=-1;
            }
        },
        methods:{
            scrollToActivedElement() {
                // 确保激活的分类在可视区域
                Vue.nextTick(() => {
                    this.scrollToEle = this.$el.querySelector('.active');
                });
            },
            afterRelease() {
                console.log('afterRelease');
                // TODO: afterRelease
            },
            beforeRelease() {
                console.log('beforeRelease');
                // TODO: beforeRelease
            },
            handleCurrentChange(index){
                this.currentIndex=-1;
                this.pageTo(index);
            },
            checkCustom(index){
                this.currentIndex=index;
            },
            viewCustom(item,index){
                this.listCallback(item,index);
            }
        }
    }
</script>


