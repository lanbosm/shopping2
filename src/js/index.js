import util from 'util/util.js';
import $ from 'jquery';
import layer from 'layer';
import {request, API_URLS, HOST} from 'util/request.js';

// import util from 'ui/model.js';

console.log(request.fnGet);
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
        pageCur: 1,//当前页码
        pageTotal: 10, //总页数
        limit:12,  //一页显示多少个
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
        //商品数据
        itemData:{
            apiUrl: '/data/itemData.json',
            index:0,
            list:[],
            newItem:{},
        },
        //购物车
        cartItem:{
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
        customModal:{
            status:'normal',
            history:'',
            code:0
        }
    },
    computed: {
        newItemModal:function(){

            if(this.itemData.newItem.specs){
                return true;
            }else{
                return false;
            }
        },
        totalprice: function () {
            var total=0;
            this.cartItem.list.forEach(function(e,i){
                total+=e.price*e.amount;
            })
            return total;
        },
        //过滤物品数据列表
        filteredItemDataList: function () {
            var self = this;
            var p=this.itemData.list;
            var l=this.limit

            //如果有搜索
            if(this.searchItem.searching){
                p=p.filter(function (item) {
                    return item.title.indexOf(self.searchItem.text) !== -1;
                });
            }

            //分页显示
            p=this.filteredByPage(p,l);
            return p;
        },
        pageindexs: function(){
            var left = 1
            var right = this.pageTotal
            var pages = []
            if(this.pageTotal>= 11){
                if(this.pageTotal > 5 && this.pageCur < this.pageTotal-4){
                    left = this.pageCur - 5
                    right = this.pageCur + 4
                }else{
                    if(this.pageCur<=5){
                        left = 1
                        right = 10
                    }else{
                        right = this.pageTotal
                        left = this.pageTotal -9
                    }
                }
            }
            while (left <= right){
                pages.push(left)
                left ++
            }
            return pages
        },
        //显示下一页
        showLast: function(){
            if(this.pageCur == this.pageTotal   ){
                return false
            }
            return true
        },
        //显示上一页
        showFirst: function(){
            if(this.pageCur == 1){
                return false
            }
            return true
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
    methods: {
        //获取导航列表
        getNavList:function(){
            var vm = this
            vm.$http.get(vm.navData.apiUrl,{
                params:{'cache':Math.random()},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                emulateJSON:true
            })
                .then((response) => { //成功
                   // console.log(response.data);
                    vm.$set('navData.list', response.data.data);
                    vm.$set('navData.path', response.data.path);

                })
                .catch(function(response) { //失败
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
            })
                .then((response) => { //成功
                    //console.log(response.data);
                    vm.$set('customData.list', response.data.data);
                })
                .catch(function(response) { //失败
                    //console.log(response);
                    alert("读取会员失败");
                })
        },
        //获取物品列表
        getItemList:function(cid){

            var vm = this;

            var apiobj={
                url:API_URLS.products,
                data:{'pageNum':1}
            }
           request.fnGet(vm,apiobj,function(data){

                console.log(data);

           });
           // alert(API_URLS.products);
            vm.$http.get(vm.itemData.apiUrl,{
                params:{'category':cid},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                emulateJSON:true
            })
                .then((response) => { //成功
                   // console.log(response.data);
                    vm.$set('itemData.list', response.data.data);
                    vm.$set('pageCur',1);
                })
                .catch(function(response) { //失败
                    //console.log(response);
                    alert("读取数据失败");
                })
            // $.ajax({
            // 	url: vm.itemData.apiUrl,
            // 	type: 'GET',
            // 	dataType: 'json',
            // 	data: {'p': '1'},
            // 	success:function(json){
            // console.log(json.length);
            // 		vm.$set('itemData.list', json.data)
            // 	},
            // 	error:function(){
            // 		 alert("读取数据失败");
            // 	}
            // })
        },
        //选择物品
        openItem:function(index){

            //layer.msg('hello');
            var itemswiper;

           //页面层
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
                     if (2>1){  //$(".gift-detail-tab").data("show")

                         itemswiper = new Swiper('.gift-detail-item', {
                             pagination: '.gift-detail-item-pagination',
                             paginationClickable: true,
                             spaceBetween: 10,

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
                     itemswiper.destroy();
                     $(".gift-detail-tab").find('a').off().removeClass('selected');
                 }
           });


            this.itemData.newItem=this.filteredItemDataList[index];
            this.itemData.index=index;

        },
        //放入购物车
        pushCart: function () {
            var index=this.itemData.index;
            var item={};
            item.id=this.itemData.list[index].id;
            item.title=this.itemData.list[index].title;
            item.boon=this.itemData.list[index].boon;
            item.price=this.itemData.list[index].price;
            item.imgurl=this.itemData.list[index].imgurl;
            item.specs=this.itemData.list[index].specs;
            item.amount=1;
            item.selectDate=util.getSelectDate(); //自动获取选择日期
            this.cartItem.list.push(item);
        },
        checkCartItem:function(ev,index){
            this.cartItem.index=index;
        },
        settleAccounts:function(){
            console.log(this.cartItem.list)

            // ok.onclick=function(){

            // 	save()
            // }

            // out.onclick=function(){
            // 	//localStorage.setItem("sss",'{"haha":12}');
            // 	var str=localStorage.getItem("bbb");
            // 	str =JSON.parse(str);
            // 	console.log(str);
            // }

        },
        //计算器
        calc:function(keycode){
            if(this.cartItem.list.length==0){return;}
            var index=this.cartItem.index;

            //选中的单价
            var prcie=this.cartItem.list[index].price;
            //选中的数量
            var amount=this.cartItem.list[index].amount;

            if(isNaN(keycode)){
                switch (keycode) {
                    case 'qrt': //resize
                        this.cartItem.list[index].amount=1;
                        break;
                    case 'x':   //close
                        var str=amount+"";
                        amount=str.substring(0,str.length-1);
                        if(amount==""){
                            this.cartItem.list.splice(index,1);
                        }
                        else{
                            this.cartItem.list[index].amount=parseInt(amount);
                        }
                        break;
                }
            }else{

                if(amount!=1){
                    amount+=keycode+'';
                }else{

                    amount=keycode;
                }


                this.cartItem.list[index].amount=parseInt(amount);
                console.log(this.cartItem.list);
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