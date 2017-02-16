import util from 'util/util.js';
import $ from 'jquery';
import layer from 'layer';
import {request, API_URLS, HOST} from 'util/request.js';

// import util from 'ui/model.js';


/**
 * [设置购物车的高]
 */
function setCartHeight (){

    setTimeout(function() {
        var w = window.innerWidth;
        var lh = document.querySelector('.left-con').offsetHeight;
        var ch = document.querySelector('.shoppingCalc').offsetHeight;

        if (w >= 768) {
            $("#shoppingCart-list").show();
            $("#shoppingCart-list").height(lh - ch -160 + "px");
        } else {
            $("#shoppingCart-list").hide();
        }
    },300);
}



//定义组件
Vue.component('layer-item', {
    template: '#layer-item-Component',           //如果要传参 一定要遵循相关的规范 参考wiki 驼峰要 -拆开
    props: {                                       //定义参数类型
        itemDetail:Object
    },
    methods: {
        switchSpec: function (pid) {
            if (pid){
                this.$dispatch('switchSpec', pid)
            }
        },
        pushCart: function (appProductDetail) {
            if (appProductDetail){
                this.$dispatch('pushCart', appProductDetail)
            }
        }
    }

});


Vue.component('layer-custom', {
    template: '#layer-custom-Component',           //如果要传参 一定要遵循相关的规范 参考wiki 驼峰要 -拆开
    props: {                                       //定义参数类型
        customModal: {                             //会员弹层
            type: Object
        },
        customData: {
            type: Object
        }
    },
    methods:{
        save: function (customdata) {
            if (customdata){
                this.$dispatch('register', customdata)
            }
        }
    }
});

new Vue({
    compiled:function(){
        setCartHeight();
        window.onresize=setCartHeight;
        this.getNavList();
    },
    ready: function() {

        var cid=util.getUrlHash("category");
        this.getItemList(cid);
        this.getCustomList();
    },
    filters: {
        sex: function(value){
            if(value=="男"){
                return "man";
            }else{
                return "women";
            }
        }
    },
    data:{

        searchItem:{
            text:"",          //文本
            input:"",		  //控件
            searching:false   //是否搜索中
        },
        searchCustom:{
            text:"",          //文本
            input:"",		  //控件
            searching:false   //是否搜索中
        },
        //导航数据
        navData:{
            apiUrl: '/data/navData.json',
            index:0,
            show:false,
            path:[],
            list:[]
        },
        //页对象
        page:{

        },
        //商品数据
        itemData:[],
        itemDetail:{},
        //购物车
        cartData:{
            index:0,
            list:[],
        },
        //会员数据
        customData:{
            apiUrl: '/data/customData.json',
            index:0,
            list:[],
            newCustom:{},
            curCustom:{}
        },
        //会员弹层
        customModal:{
            status:'normal',
            history:'',
            code:0
        }

    },
    computed: {
        //选中的谷歌

        totalprice: function () {
            var total=0;
            this.cartData.list.forEach(function(e,i){
                total+=e.price*e.amount;
            })
            return total;
        },
        //过滤物品数据列表
        filteredItemDataList: function () {
            var self = this;
            var p=this.itemData;
            var l=this.limit;

            //如果有搜索
            if(this.searchItem.searching){
                p=p.filter(function (item) {
                    return item.title.indexOf(self.searchItem.text) !== -1;
                });
            }

            //分页显示
            return p;
        },
        //filteredCustomDataList
        filteredCustomDataList: function () {
            var self = this;
            var p=this.customData.list;

            p=p.filter(function (custom) {

                if(self.searchCustom.text == custom.name || self.searchCustom.text == custom.phone){
                    return custom;
                }
            });
            return p;
        }

    },
    watch: {
        'searchItem.text': function (val) {
            if(val){
                this.searchItem.searching=true;

            }
            else{
                this.searchItem.searching=false;
            }
            //从第一页开始找
            this.pageCur=1;
        },
        'searchCustom.text': function (val) {
            var self=this;
            if(val){
                this.searchCustom.searching=true;
                this.customModal.code=301;
                setTimeout(function(){
                    $('#custom-layer').modal('hide');
                    if(self.filteredCustomDataList!=""){
                        self.customData.curCustom=self.filteredCustomDataList[0];
                        self.customModal.status='info';
                        self.customModal.history='info';
                        self.customModal.code=200;
                    }else{
                        self.customModal.status='normal';
                        self.customModal.history='normal';
                        self.customModal.code=404;
                    }
                },200);
                setTimeout(function(){
                    $('#custom-layer').modal('show');
                },800);
            }
            else{
                this.searchItem.searching=false;
                this.customModal.status='normal';
                this.customModal.history='normal';
                this.customModal.code=0;
            }

        }
    },
    //共有方法
    events:{
        //会员注册
        register: function(customdata){
            var name = customdata.newCustom.name;
            var phone = customdata.newCustom.phone;
            var sex = customdata.newCustom.sex;

            alert(name+'===='+phone+'==='+sex);
        },
        //选择规格
        switchSpec:function(sid){
            alert("规格"+sid);
        },
        //放入购物车
        pushCart: function (item) {
            layer.closeAll();
            var vm = this;
            var newitem = {};
            Object.assign(newitem, item);

            console.log(vm.itemDetail.appProductDetail);

            newitem.selectDate = util.getSelectDate(); //自动获取选择日期
            newitem.amount = 1; //自动获取选择日期
            this.cartData.list.push(newitem);
        }


    },
    methods: {
        //获取导航列表
        getNavList:function(){
            var vm = this;
            vm.$http.get(vm.navData.apiUrl,{
                params:{'cache':Math.random()},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                emulateJSON:true
            }).then((response) => { //成功
                   // console.log(response.data);
                vm.$set('navData.list', response.data.data);
                vm.$set('navData.path', response.data.path);
            }).catch(function(response) { //失败
                //console.log(response);
                alert("读取导航失败");
            })
        },
        //获取会员列表
        getCustomList:function(){
            var vm = this
            vm.$http.get(vm.customData.apiUrl,{
                params:{'p':1},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                emulateJSON:true
            }).then((response) => { //成功
                    //console.log(response.data);
                    vm.$set('customData.list', response.data.data);
            }).catch(function(response) { //失败
                    //console.log(response);
                    alert("读取会员失败");
            })
        },
        //获取物品列表
        getItemList:function(){
            var vm = this;
            var apiobj={
                url:API_URLS.products,                  //API_URLS.products
                data:{
                    'pageNum':1,
                    'categoryId':null,
                    'keyword':null,
                    'brandId':null
                }
            }
            request.fnGet(vm,apiobj,function(res){
                console.log(res.data);
                vm.page=res.data.page;
                vm.itemData=vm.page.list;

            });
        },
        //获取物品详情
        openItem:function(pid){

            var vm = this;
            var apiobj={
                url:API_URLS.products+pid,
                data:{
                    'id':pid
                }
            };
            var itemGift=false;
            var itemswiper='';

            request.fnGet(vm,apiobj,function(res){

                vm.itemDetail=res.data;
                console.log(vm.itemDetail.appProductDetail);
                //是否存在赠品
                vm.itemDetail.appProductDetail.appGiftActivity!=null?itemGift:itemGift=true;

                //弹出页面层
                layer.open({
                    id:'layui-layer-item',
                    type: 1,            //1 普通层
                    shade: 0.01,  //遮罩
                    anim:0,
                    zIndex:1000,
                    closeBtn: 2,
                    title: false,
                    area: ['auto', 'auto'], //宽高
                    content: $('#layer-item-box'),
                    success:function() {
                        if (itemGift){  //如果存在赠品
                            //data-gift
                            itemswiper = new Swiper('.gift-detail-item', {
                                pagination: '.gift-detail-item-pagination',
                                paginationClickable: true,
                                spaceBetween: 10

                            });

                            itemswiper.on('onSlideChangeEnd', function (swiper) {
                                //some code
                                $(".gift-detail-tab").find('a').removeClass('selected');
                                $(".gift-detail-tab").find('a').eq(swiper.activeIndex).addClass('selected');

                            })

                                $(".gift-detail-tab").find('a').eq(0).addClass('selected');
                                $(".gift-detail-tab").find('a').on('click',function(){

                                itemswiper.slideTo($(this).index());//
                            })

                        }
                    },
                    cancel: function(index){
                        // if(confirm('确定要关闭么')){
                        //     layer.close(index)
                        //  }
                        //  return false;
                    },
                    end:function(){
                        // alert("销毁了");
                        if(itemGift){
                            itemswiper.destroy();
                            $(".gift-detail-tab").find('a').off().removeClass('selected');
                        }
                    }
                });

            });

        },
        checkcartData:function(ev,index){
            this.cartData.index=index;
        },
        buildBill:function(){
            if(this.cartData.list.length>0) {
                console.log(this.cartData.list);
                location.href = "./bill.html";
            }else{
                alert('请先选择物品');
            }


        },
        //计算器
        calc:function(keycode){
            var vm=this;
            if(this.cartData.list.length==0){return;}

            var index=this.cartData.index;
            //选中的单价
            var price=this.cartData.list[index].price;
            //选中的数量
            var amount=this.cartData.list[index].amount;

            if(isNaN(keycode)){
                switch (keycode) {
                    case 'qty': //resize
                        this.cartData[index].amount=1;
                        break;
                    case 'x':   //close
                        var str=amount+"";
                        amount=str.substring(0,str.length-1);
                        if(amount==""){
                            this.cartData.list.splice(index,1);
                        }
                        else{
                            this.cartData.list[index].amount=parseInt(amount);
                        }
                        break;
                }
            }else{

                if(amount!=1){
                    amount+=keycode+'';
                }else{

                    amount=keycode;

                }

                this.cartData.list[index].amount=parseInt(amount);
               // this.cartData[index].amount=parseInt(amount);
                console.log(this.cartData.list);
            }
        },
        //分页
        filteredByPage:function(arr,limit){
            this.pageTotal=Math.ceil(arr.length/limit);
            return arr.slice((this.pageCur-1)*limit,(this.pageCur)*limit );
        },
        //页码点击事件
        pageClick: function(page){
            if(page != this.pageCur){
                this.pageCur = page;
                window.scrollTo(0,0);
            }
        },
        getspecsClick:function(index){

            return this.itemData.newItem.specs.index;

        },
        specsClick:function(index){

            this.itemData.newItem.specs.index=index;

        },
        //增加用户
        addNewCustom:function(){
            if(this.customData.newCustom.name==""){
                alert("姓名不能为空");
                return false;
            }
            if(this.customData.newCustom.phone==""){
                alert("手机号不能为空");
                return false;
            }

            this.customData.list.push(this.customData.newCustom);

            console.log(this.customData.list);
        }


    }
}).$mount('#main');