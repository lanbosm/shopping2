<template>
   	    <div class="searchbar">
            <div class="input-group">

                <input type="text" class="form-control" id="searchBar" v-model="searchItem.keyword" @keyup.enter="fetchList"  :placeholder="typestr">
                <span class="input-group-btn">
                    <button  class="btn  btn-default" :class="{selected:type=='barcode'}" @click="switchType('barcode')"><span class="glyphicon  glyphicon-barcode"></span></button>
                    <button  class="btn  btn-default" :class="{selected:type=='search'}" @click="switchType('search')"><span class="glyphicon glyphicon-search"></span></button>
                </span>
            </div>
       </div>
</template>


<script>
    import {request, API_URLS} from 'util/request.js';

    export default{
        name:"searchbar",
        props:['productParams'],
        data(){
          return {
              type:"search",
              typestr:'搜索条码/商品名称',
              typestrArr:{'barcode':"条码入库",'search':"搜索条码/商品名称"},
              searchItem:{
                  searching:false,
                  keyword:""
              }
          }
        },
       watch:{
        },
        methods:{
            //barcode
            switchType(type){

                this.searchItem.keyword = "";
                this.type=type;
                this.typestr=this.typestrArr[type];

                if(type=='barcode') {
                    document.querySelector('#searchBar').focus();
                }

                if(!this.searchItem.keyword==""){

                    this.fetchList();
                }


            },
            //请求列表
            fetchList() {

                if(this.searchItem.searching){
                    this.searchItem.searching=false;
                    return false;
                }
                this.searchItem.searching=true;
                if(this.type=="search") {
                    this.$store.dispatch('fetchList', {"searchStr": this.searchItem.keyword, "pageNum": 1,"type":0}).then(_=>{
                        this.searchItem.searching=false;
                    })
                }else{
                    if(!this.searchItem.keyword){
                        this.$message.error('请输入商品条码');
                        return false;
                    }
                    this.$store.dispatch('fetchList', {"searchStr": this.searchItem.keyword, "pageNum": 1,"type":1}).then(res=> {
                        console.log(res);
                        if (res.page.list.length>0) {

                            var item = res.page.list[0];

                            item.amount = 1;
                            console.log(item);
                            this.$parent.pushCart(item);
                            this.searchItem.searching = false;
                            this.searchItem.keyword = "";
                        }else{
                            this.$message.error('找不到该商品条码');

                        }
                    }).catch(res=>{
                            this.$message.error('找不到该商品条码');

                    })

                }
            }
        }
    }
</script>

