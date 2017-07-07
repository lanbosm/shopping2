<template>
   	    <div class="searchbar">
            <div class="input-group">

                <input type="text" class="form-control" id="searchBar" v-model="keyword" @keyup.enter="fetchList"  :placeholder="typestr">
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
              keyword:"",
              searching:false,
          }
        },
       watch:{
        },
        methods:{
            //barcode
            switchType(type){


                this.type=type;
                this.typestr=this.typestrArr[type];

                if(type=='barcode') {
                    this.keyword = "";
                    document.querySelector('#searchBar').focus();
                }else{
                    this.fetchList();
                }

            },
            //请求列表
            fetchList() {

                if(this.searching){
                    return false;
                }



                if(this.type=="search") {

                    this.$store.commit('setProductParams',{"searchStr": this.keyword, "pageNum": 1,"type":0});

                }else{
                    if(!this.keyword){
                        this.$message.error('请输入商品条码');
                        return false;
                    }


                    this.$store.dispatch('fetchList', {"searchStr":this.keyword, "pageNum": 1,"type":1,categoryId:null, brandId:null }).then(res=> {
                        this.keyword ="";
                        if (res.page) {
                            var item = res.page.list[0];
                            var newitem = {};
                            Object.assign(newitem, item);
                            newitem.amount = 1;
                            this.$parent.pushCart(newitem);
                            document.querySelector('#searchBar').focus();
                            this.$message.success('添加购物车成功');
                            this.keyword ="";
                            this.searching=false;
                        }else{
                            document.querySelector('#searchBar').focus();
                            this.$message.error('找不到该商品条码');
                            this.keyword ="";
                            this.searching=false;

                        }
                    }).catch(res=>{
                        document.querySelector('#searchBar').focus();
                        this.$message.error('找不到该商品条码');
                        this.keyword ="";
                        this.searching=false;

                    })

                }
            }
        }
    }
</script>

