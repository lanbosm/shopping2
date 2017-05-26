<!-- info -->
<template>
    <div class="list" >
          <ul>
              <li class="">
                  <div class="item-pack item-photo">
                        <img src=""/>
                  </div>
                  <div class="item-pack item-name">
                        你姐
                  </div>
                  <div class="item-pack item-phone">
                        13636574272
                  </div>
              </li>
          </ul>
            <el-pagination
                    layout="prev, pager, next"
                    :total="50">
            </el-pagination>


    </div>
</template>
<style  rel="stylesheet/less"  lang="less">
    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";


</style>

<script>
    import layer from 'layer';
    export default{
        name:"CustomList",
        props:['member'],
        data(){
            return {
                msg:''
            }
        },
        created(){
//            console.log(this.member.id)
        },
        computed: {
//            customData() {
//                return this.$store.state.customData;
//            }
        },
        filters:{
            couponType(val){
                if(val === 'fullReduce'){
                    return '满减劵';
                }else if(val === 'fullBack'){
                    return '满返劵';
                }else{
                    return '';
                }
            }
        },
        methods:{
            goPcikGood(){
                var vm=this;
                alert(vm.member.id);
                this.$store.dispatch("fetchPickList",{"memberId":vm.member.id}).then(res=>{
                         alert(res);
                    this.$router.push({path:'/membercargo'});
                    this.$root.showCustomModal=false;
                    $("#layer-custom").modal('hide');
                });

            },
            againPass(){
                var vm=this;
                this.$root.showAgainPass=true;

                this.$nextTick(()=>{
                    layer.open({
                        id: 'layer-box',
                        type: 1,            //1 普通层
                        shade: 0.01,  //遮罩
                        anim: 0,
                        zIndex: 9999,
                        closeBtn: 1,
                        title: false,
                        area: ['auto', 'auto'], //宽高
                        content: $('#layer-again-box'),
                        success: function () {

                            alert(222222222222);
                        },
                        end: function () {
                            vm.$root.showAgainPass=false
                        }
                    });
                })
            }
        }
    }
</script>


