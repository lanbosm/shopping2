//var  util= require('util/util.js');
import util from 'util/util.js';

!(function (){

	if(!document.getElementById("header-nav")){return false;}
    var navbar=document.getElementById("header-nav");
	var template=navbar.innerHTML;


	var queueTools={
		login:false,
		template: template,
		data:{
			index:0,
			staff:"里可行",
			list:[
	 			
	 		]
		},
		init:function(){
			
			var localData=util.pullLocal("queue");
			if(localData){this.data=localData;}

			if(this.data.list==0){
				this.addCustom();
			}

           this.refresh();
			this.contact();
		},
        //获得用户资料
		getCustomData:function(){
			var custom={}
            custom.uid="1001";
			custom.name="custom_"+new Date().getTime();
			custom.cid=parseInt(Math.random()*1000);
			return custom;
		},
        //获得时间信息
		getTimeData:function(){
			function nz(n){
					if(n<10){
						n="0"+n;
					}else{
						n=n+"";
					}
					return n;
			}

			var time=new Date();
			var timestr=nz(time.getHours())+":"+nz(time.getMinutes());

			return timestr;
		},
		refresh:function(){
			
			var html=this.getHeaderHtml();

			navbar.innerHTML=html;


		},
		makeCustom:function(data){
			var _self=this;
			var html="";
			var template='<li><a class="custom {cur}" onclick="queueTools.switchCustom({index})"><span class="num">{index}</span><span class="time">{time}</span></a></li>';
			data.forEach(function(e,i){	
					var cur="cur";
					i==_self.data.index?cur = cur:cur="";
					var tmp = template.replace(/{index}/g,(i+1))
							  		  .replace(/{cur}/g,cur)
							  		  .replace(/{time}/g,e.time);	 
			    	html+=tmp;
			})  
			return html;
		},
		//获得最新的html
		getHeaderHtml:function(){
			var staff=this.data.staff;
			var aaa=this.data.list;
			var queue=this.makeCustom(aaa);
			var tmp = this.template.replace(/{staff}/g, staff)
			.replace(/{queue}/g, queue);
			return tmp;
		},
		//切换用户
		switchCustom:function(index){
			this.data.index=index-1;
			this.refresh();
            util.pushLocal("queue",this.data);

            //查询购物车
			this.findCart(this.data.list[index-1].custom.name,this.data.list[index-1].custom.cid)

		},
		//新增用户
		addCustom:function(){
			var queue={};
			//记录客户当前时间
			queue.time=this.getTimeData();
			//记录客户名会员
			queue.custom=this.getCustomData()
			//
			this.data.list.push(queue);
			this.data.index=this.data.list.length-1;

			this.refresh();
            util.pushLocal("queue",this.data);
		
		},

		//删除用户
		removeCustom:function(){
			var index=this.data.index;
			this.data.list.splice(index,1);
			this.refresh();
            util.pushLocal("queue",this.data);

		},
		//查询购物记录
		findCart:function(name,cartid){
			alert("用户名:"+name+",购物车id:"+cartid)

		},
        //设置用户信息
        setCustom:function(custom){
            if(this.data.list.length==0){return ;}
            var index =this.data.index;

            this.data.list[index].custom=custom;
            util.pushLocal("queue",this.data);

        },
        //连接设备
        contact:function(){
            document.querySelector('.contact-btn').classList.remove('success','error');
          if(2>1) {
              document.querySelector('.contact-btn').classList.add('success');

          }else{
              document.querySelector('.contact-btn').classList.add('error');
		  }

        },
        //连接设备
        exit:function(){
        	var res=confirm("确定退出吗? ");
        	if(res) {
                util.delLocal('queue');
                location.href="./login.html";
            }

        },
        //设置用户信息
        setCustom:function(custom){
            if(this.data.list.length==0){return ;}
            var index =this.data.index;

            this.data.list[index].custom=custom;
            util.pushLocal("queue",this.data);

        },

	}
	   

	queueTools.init();



	window.queueTools=queueTools;

})();

