<!-- list -->
<template>
    <div class="list" >
        <div class="custom-table-body" >
            <p class="data-placeholder" v-if="!listData.list" >数据加载中...</p>
            <p class="data-placeholder" v-else-if="listData.list.length==0" >暂无记录</p>
            <ul class="custom-list" v-else >
              <li v-for="(item,index) in listData.list" :class="{select:index==currentIndex}" @click="checkCustom(index)"
                    @dblclick="viewCustom(item,index)">
                  <div class="item-col item-col1">
                      <div class="item-photo">
                        <img :src="item.headPortrait"/>
                      </div>
                  </div>
                  <div class="item-col item-col2">
                      <span>{{item.name}}</span>
                  </div>
                  <div class="item-col item-col3">
                      <span>{{item.phone}}</span>
                </div>
              </li>

          </ul>
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

<script>
        export default{
        name:"CustomList",
        props:['listIndex','listData','listCallback','pageTo','selectedCustom'],
        data(){
            return {
                custom:{},
                currentIndex:1
            }
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


