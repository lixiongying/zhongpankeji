$(function(){
	var museId=localStorage.getItem("museId");
	var vm=new Vue({
		el:'#index',
		data:{
			url:link_All.link_Ali+'globalstone/common/file/download.do?storeFileName=',
			qingList:{},
			lunList:{},
			huoList:{
					stores:[{
						
					}]
					},
			imgurl:[],
			mgooId:'',
			show:0,
			err:0,
			kuanList:[],
			mgooId:'',
			mine:{},
	
		},
		mounted(){
			
		},
	//初始函数
		created:function(){
			this.init();
			this.inits();
			this.initg();
			this.inith();
		},
		methods:{
			//推荐石材商
			init:function(){
				var shef=this;
				$.ajax({
					type:"post",
					url:link_All.link_Ali+'globalstone/app/public/mallStore/queryMallStoreRECList.do',					
					async:true,
					data:{},    
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp1",    
	   				
	   				  dataFilter:function(json){  	   				  	
//					console.log("jsonp.filter:"+json);    
	       				return json;    
	   				},    
					 success:function(json,textStatus){
					 	shef.huoList=json.result;
					 	
//	       				console.log(shef.huoList);
	   },     
	   error:function(XMLHttpRequest,textStatus,errorThrown){  
//	   	  alert('错误');
	       console.log("jsonp.error:"+textStatus);    
	   }    
	});  
			},//init函数结尾	
			
			inits:function(){
				var shef=this;
//				console.log(museId)
				$.ajax({
					type:"post",
					url:link_All.link_Ali+'globalstone/app/public/mallStore/mallGoodsType.do',					
					async:true,
					data:{mstoId:museId},    
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp2",    
	   				
	   				  dataFilter:function(json){  	   				  	
					//console.log("jsonp.filter:"+json);    
	       				return json;    
	   				},    
					 success:function(json,textStatus){
					 	if(json.eeror == undefined){
					 		shef.show = 1;
					 	}
					 	shef.qingList=json;
					 	shef.mgooId = shef.qingList.mgooId
				    },     
				    error:function(XMLHttpRequest,textStatus,errorThrown){  
			//	   	    alert('错误');
				        console.log("jsonp.error:"+textStatus);    
				    }     
				}); 
			},//inits函数结尾	
			initg:function(){
				var shef=this;
				$.ajax({
					type:"post",
					url:link_All.link_Ali+'globalstone/app/public/mall/queryImagesByPositionId.do',					
					async:true,
					data:{positionId:1},    
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp3",    
	   				
	   				  dataFilter:function(json){  	   				  	
					//console.log("jsonp.filter:"+json);    
	       				return json;    
	   				},    
					 success:function(json,textStatus){
//	       				console.log(json.result);
					 	shef.imgList=json.result;
					 	shef.imgurl.push(shef.imgList[1].image)
					 	for(var i=0;i<shef.imgList.length;i++){
							shef.imgurl.push(shef.imgList[i].image)
						}
					 	shef.imgurl.push(shef.imgList[0].image)	
					 	shef.imgurl.push(shef.imgList[1].image)
						lunbo(shef.imgurl);
	       				
				    },     
				    error:function(XMLHttpRequest,textStatus,errorThrown){  
			//	   	   alert('错误');
				       console.log("jsonp.error:"+textStatus);    
				    }    
				});  
			},//initg函数结尾	
			go:function(){
//				console.log(museId)
				localStorage.setItem("mstoId",museId);
				mui.openWindow({
					url:'business.html',
					id:'business.html'
				})
//				window.location.href="business.html"
			},
			gotos:function(id){
				var shef=this;
				if(museId !=null && museId!=undefined && museId != ''){
					localStorage.setItem("mstoId",id);	
					mui.openWindow({
						url:'business.html',
						id:'business.html'
					})
//					window.location.href="business.html"
				}else{
//					console.log(1)
//					$('.bg_tis').css('display','block')
//		   			$('.bg_tis p').text('请先登录！')
//				   	setTimeout(function(){
//				   		$('.bg_tis').css('display','none')
//				   		window.location.href="new_login.html"
//				   	},1000)
                    var btnArray = ['否', '是'];
	                mui.confirm('请先登录！', btnArray, function(e) {
	                    if (e.index == 0) {
	                    	mui.openWindow({
								url:'new_login.html',
								id:'new_login.html'
							})
//	                    	window.location.href = "new_login.html"
//	                        info.innerText = '你刚确认MUI是个好框架';
	                    } else {
	                       
	                    }
	                }) 
				}
			},
			goods:function(){
				var shef=this;
				$.ajax({
				   url:link_All.link_Ali+'globalstone/app/public/mallStore/mallGoodsType.do',
				   type :'post',
				   data:{
				   	mstoId:museId,
				   },
				   dataType:"jsonp",
				   jsonp:"callback",    
				   jsonpCallback:"success_jsonp4", 
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
//				   	console.log(json)
					if(json.eeror == undefined){
//				   		window.location.href="goods.html";
                        mui.openWindow({
							url:'goods.html',
							id:'goods.html'
						})
				   	}else{
				   		shef.err = 1; 
					   	  setTimeout(function(){
					   	  	shef.err = 0; 
					   	  },2000)
				   	}
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	console.log('错误'); 
				   }    
				});  
				
			},
			inith:function(){
				var shef=this;
				$.ajax({
					type:"post",
					url:link_All.link_Ali+'globalstone/app/private/mallStore/encyc/findRecommendForeign.do',					
					async:true,
					data:{museId:1,musePwd:123456,museOnlineTag:1555},    
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp4",    
	   				
	   				  dataFilter:function(json){  	   				  	
					//console.log("jsonp.filter:"+json);    
	       				return json;    
	   				},    
					 success:function(json,textStatus){
					 	console.log(json)
					 	shef.mine = json.result
				    },     
				    error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	    alert('错误');
				        console.log("jsonp.error:"+textStatus);    
				   }    
				});  
			},
			go_stone:function(msfoId){
				var shef=this;
				if(museId !=null && museId!=undefined && museId != ''){
					localStorage.setItem("msfoId",msfoId);
					mui.openWindow({
						url:'proddetail.html',
						id:'proddetail.html'
					})
//					window.location.href="proddetail.html"
				}else{
//					console.log(1)
//					$('.bg_tis').css('display','block')
//		   			$('.bg_tis p').text('请先登录！')
//				   	setTimeout(function(){
//				   		$('.bg_tis').css('display','none')
//				   		window.location.href="new_login.html"
//				   	},1000)
                    var btnArray = ['否', '是'];
	                mui.confirm('请先登录！', btnArray, function(e) {
	                    if (e.index == 0) {
	                    	mui.openWindow({
								url:'new_login.html',
								id:'new_login.html'
							})
//	                    	window.location.href = "new_login.html"
//	                        info.innerText = '你刚确认MUI是个好框架';
	                    } else {
	                       
	                    }
	                }) 
					
				}
			},
		}//methods函数结尾		
	});
	
	
	 var lunbo = function(img){
//	 	console.log(img)
		$('.mui-slider .mui-slider-group').empty();//清楚产品列表原有子元素
		//循环输出产品列表
		
		for(var i=0;i<img.length;i++){
//			console.log(img[i])
			$('.mui-slider .mui-slider-group').append('<div class="mui-slider-item"><img src="'+link_All.link_Ali+'globalstone/common/file/download.do?storeFileName='+img[i]+'" alt="" /></div>');
		}
	}
	 
})

