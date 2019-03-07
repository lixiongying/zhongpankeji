$(function(){
	var vm=new Vue({
		el:'#index',
		data:{
//			return {
//				imgAdd:'http://120.79.70.221:9281/globalstone/common/file/download.do?storeFileName=',
//			
//			}
			url:'http://120.79.70.221:9281/globalstone/common/file/download.do?storeFileName=',
			qingList:{},
			lunList:{},
			huoList:{
					stores:[{
						
					}]
					},
			imgurl:[],
			mgooId:'',
	
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
					url:'http://120.79.70.221:9281/globalstone/app/public/mallStore/queryMallStoreRECList.do',					
					async:true,
					data:{page:1,pageSize:2},    
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp1",    
	   				timeout:3000,
	   				  dataFilter:function(json){  	   				  	
					//console.log("jsonp.filter:"+json);    
	       				return json;    
	   				},    
					 success:function(json,textStatus){
					 	
					 	shef.huoList=json.result;
					 	
//	       				console.log(shef.huoList);
	   },     
	   error:function(XMLHttpRequest,textStatus,errorThrown){  
	   	  alert('错误');
	       console.log("jsonp.error:"+textStatus);    
	   }    
	});  
			},//init函数结尾	
			
			inits:function(){
				var shef=this;
				$.ajax({
					type:"post",
					url:'http://120.79.70.221:9281/globalstone/app/public/mallStore/mallGoodsType.do',					
					async:true,
					data:{mstoId:21},    
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp2",    
	   				timeout:3000,
	   				  dataFilter:function(json){  	   				  	
					//console.log("jsonp.filter:"+json);    
	       				return json;    
	   				},    
					 success:function(json,textStatus){
					 	
					 	shef.qingList=json;
					 	shef.mgooId =  shef.qingList.mgooId 
//	       				console.log(shef.qingList.mstoImage);
//	       				console.log(shef.qingList);
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
					url:'http://120.79.70.221:9281/globalstone/app/public/mall/queryImagesByPositionId.do',					
					async:true,
					data:{positionId:1},    
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp3",    
	   				timeout:3000,
	   				  dataFilter:function(json){  	   				  	
					//console.log("jsonp.filter:"+json);    
	       				return json;    
	   				},    
					 success:function(json,textStatus){
					 	
//	       				console.log(json.result[0].image);
					 	shef.imgList=json.result;
					 	for(var i=0;i<shef.imgList.length;i++){
//					 		console.log(i)
							shef.imgurl.push(shef.imgList[i].image)
							shef.imgurl.push(shef.imgurl[0])							
						}
						lunbo(shef.imgurl);
	       				console.log(shef.imgurl);
	       				
	   },     
	   error:function(XMLHttpRequest,textStatus,errorThrown){  
	   	  alert('错误');
	       console.log("jsonp.error:"+textStatus);    
	   }    
	});  
			},//initg函数结尾	
			go:function(id){
				console.log(id)
				localStorage.setItem("mstoId",id);				
				window.location.href="business.html"
			},
			gotos:function(id){
				console.log(id)
				localStorage.setItem("mstoId",id);				
				window.location.href="business.html"
			},
		
			
		}//methods函数结尾		
	});
	
	
	 var lunbo = function(img){
//	 	console.log(img)
		$('.mui-slider .mui-slider-group').empty();//清楚产品列表原有子元素
		//循环输出产品列表
		
		for(var i=0;i<img.length;i++){
			console.log(img[i])
			$('.mui-slider .mui-slider-group').append('<div class="mui-slider-item"><img src="http://120.79.70.221:9281/globalstone/common/file/download.do?storeFileName='+img[i]+'" alt="" /></div>');
		}
	}
	 
})

