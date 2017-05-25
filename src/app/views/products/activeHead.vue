<template>
    <div class="activity_list">
        <a class="activity_btn btn-gray" :class="{activeOn: activeid==1}" @click="allGoods()">
            <span>全部</span>
        </a>
        <a class="activity_btn btn-gray" :class="{activeOn: activeid==2}" @click="DoubleMack()">
            <span>双倍积分</span>
        </a>
        <a class="activity_btn btn-gray" :class="{activeOn: activeid==3}" @click="addPrice()">
            <span>加价购</span>
        </a>
        <a class="activity_btn btn-gray" :class="{activeOn:activeid==4}" @click="flashSale()">
            <span>限时抢购</span>
        </a>
        <a class="activity_btn btn-gray" :class="{activeOn:activeid==5}" @click="hasGift()">
            <span>有赠品</span>
        </a>
    </div>
</template>

<script>
    export default{
        name:'activeHead',
        props:["flag"],
        computed: {
            activeid(){
                return this.$store.state.activeId.number;
            }
        },
        created(){

        },
        methods:{
            //全部
            allGoods(){
                this.$store.commit("setActive",{
                    number:1,
                });
                this.$store.dispatch("demo").then(res=>{

                    alert(res);
                }).catch(res=>{

                    alert("falile")
                })
            },
            //双倍积分
            DoubleMack(){
                this.$store.commit("setActive",{
                    number:2
                });

            },
            //加价购//子组件改变父组件的数据时 要用parent或者直接全局
            addPrice(){
                this.$store.commit("setActive",{
                    number:3
                });
                this.$parent.flag=false;
            },
            //限时抢购
            flashSale(){
                this.$store.commit("setActive",{
                    number:4
                });

            },
            //有赠品
            hasGift(){
                this.$store.commit("setActive",{
                    number:5
                })
            },

        }
    }
</script>