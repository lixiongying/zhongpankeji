$(function(){
	var Id = localStorage.getItem("museId"); 
	var Pwd = localStorage.getItem("musePwd"); 
	var Tag = localStorage.getItem("museOnlineTag"); 
	var vm=new Vue({
		el:'#collect',
		data:{
			huoList:{},
			url:link_All.link_Ali+'globalstone/common/file/download.do?storeFileName=',
			comList:{},
			proList:{},
		},
		mounted(){
			
		},
	//初始函数
		created:function(){
			this.init();
			this.inits();
			this.initg();
		},
		methods:{
			init:function(){
				var shef=this;
				$.ajax({
					type:"post",
					url:link_All.link_Ali+"globalstone/app/private/mall/queryCollectStoreForeignList.do",
					async:true,
					data:{museId:Id,musePwd:Pwd,museOnlineTag:Tag},     
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp1",    
	   				timeout:3000,
	   				  dataFilter:function(json){  	   				  	 
	       				return json;    
	   				},    
					 success:function(json,textStatus){  
//	       				console.log(json);
					 	
						shef.huoList=json.result;
//	       			console.log(shef.huoList);
	   },     
	   error:function(XMLHttpRequest,textStatus,errorThrown){  
	   	  alert('错误');
	       console.log("jsonp.error:"+textStatus);    
	   }    
	});  
			},//init函数结尾
			//企业
			inits:function(){
				console.log(Id)
				console.log(Pwd)
				console.log(Tag)
				var shef=this;
				$.ajax({
					type:"post",
					url:link_All.link_Ali+"globalstone/app/private/mallStore/myMallCollectStoreList.do",
					async:true,
					data:{museId:Id,musePwd:Pwd,museOnlineTag:Tag},     
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp2",    
	   				timeout:3000,
	   				  dataFilter:function(json){  	   				  	 
	       				return json;    
	   				},    
					 success:function(json,textStatus){  
//	       				console.log(json);
					 	
						shef.comList=json.result;
	       				console.log(shef.comList);
	   },     
	   error:function(XMLHttpRequest,textStatus,errorThrown){  
	   	  alert('错误');
	       console.log("jsonp.error:"+textStatus);    
	   }    
	});  
			},//inits函数结尾
		
			initg:function(){
				var shef=this;
				$.ajax({
					type:"post",
					url:link_All.link_Ali+"globalstone/app/private/mallGoods/myMallCollectGoodsList.do",
					async:true,
					data:{museId:Id,musePwd:Pwd,museOnlineTag:Tag},     
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp3",    
	   				timeout:3000,
	   				  dataFilter:function(json){  	   				  	 
	       				return json;    
	   				},    
					 success:function(json,textStatus){  
//	       				console.log(json);//店铺轮播图
					 	
						shef.proList=json.result;
//	       			console.log(shef.proList);
	   },     
	   error:function(XMLHttpRequest,textStatus,errorThrown){  
	   	  alert('错误');
	       console.log("jsonp.error:"+textStatus);    
	   }    
	});  
			},//initg函数结尾
			goto:function(id){
//				console.log(id)
				localStorage.setItem("mstoId",id);	
				mui.openWindow({
					url:'business.html',
					id:'business.html'
				})
//				window.location.href="business.html"
			},
			go:function(id){
//				console.log(id)
				localStorage.setItem("mcgoGoodsId",id);	
				mui.openWindow({
					url:'prodetail.html',
					id:'prodetail.html'
				})
//				window.location.href="prodetail.html"
			},
			gos:function(id){
				console.log(id)
				localStorage.setItem("msfoId",id);	
				mui.openWindow({
					url:'proddetail.html',
					id:'proddetail.html'
				})
//				window.location.href="proddetail.html"
			},			
		}//methods函数结尾
		
		
	});
})