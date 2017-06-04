<template>
    <div class="notice-con">
            <div class="c">
                <p>{{item.productName}}</p>
                <p>备注：{{item.applyMemo}}</p>
                <span>数量 {{item.num}}</span>
                <span>{{item.createDate}}</span>
            </div>
            <div class="r">
                <a class="btn btn-agree" @click="checkAllocation(item.id,'agreed',index)">同意</a>
                <a class="btn btn-refuse" @click="checkAllocation(item.id,'refused',index)">拒绝</a>
            </div>
    </div>
</template>

<style  rel="stylesheet/less"  lang="less">
    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";

    /*!item modale*/
    .notice {
        width: 400px !important;
        .el-notification__title{
            color: @themeColor;
            margin: 0;
            font-size: 18px;
            line-height: 30px;
            width: 85%;
        }
        p{
            width: 85%;
            color: #666666;
            margin-bottom: 5px;
        }
        span{
            display: block;
            color: #666666;
            margin-top: 5px;
        }
        .c{ height: 80px; line-height: 20px; overflow: hidden;  }
        .r{text-align: right; }
        .btn-agree{
            border: solid 1px @green;
            color: @green;
            position: relative;
            display: inline;
            margin-right: 12px;
            margin-left: 12px;
        }

        .btn-refuse{
            border: solid 1px @themeColor;
            color: @themeColor;
            position: relative;
            display: inline;
            margin-right: 12px;
            margin-left: 12px;
        }

    }


</style>




<script>
    


    export default{
        name:"LogModal",
        props:['item','index'],
        created(){
            //this.fetchLog()
        },
        methods:{
            checkAllocation(allocationId,status,mindex){

                if(!allocationId){
                    this.$message.error('该批准号无效');
                    return false;
                }
                var params={
                    'allocationId':allocationId,
                    'status':status,
                    'memo':''
                }

                this.$store.dispatch("approvalAllocation",params).then(res=>{
                    this.$alert('操作成功',{
                        type: 'success',
                    }).then(_=>{
                        this.$parent.close();
                    })

                }).catch(res=>{
                    this.$alert(msg,'操作失败',{
                        type: 'error',
                    }).then(_=>{
                        this.$parent.close();
                    })
                });
            }
        }
    }
</script>
