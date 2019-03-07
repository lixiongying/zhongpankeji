$(function(){
	var msfoId=localStorage.getItem("msfoId");
	var museId=localStorage.getItem("museId");
	var musePwd=localStorage.getItem("musePwd");
	console.log(musePwd)
	var museOnlineTag=localStorage.getItem("museOnlineTag");
	var c_num=0;
	
//	console.log(msfoId);
	var vm=new Vue({
		el:'#proddetail',
		data:{
			proList:{},
			prList:{},
			comList:{},
			imgList:{},
			imgurl:[],
			url:link_All.link_Ali+'globalstone/common/file/download.do?storeFileName=',
			show:1,
			suo:'',
			img_c_show:0,
			mgooImage:'',
		},
		mounted(){
		},
	//初始函数
		created:function(){
			this.init_login();
		},
		methods:{
			init:function(){
				var shef=this;
				$.ajax({
					type:"post",
					url:link_All.link_Ali+"globalstone/app/private/mall/queryStoreForeignDetail.do",
					async:true,
					data:{museId:museId,
						musePwd:musePwd,
						museOnlineTag:museOnlineTag,
						msfoId:msfoId},
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp1",    
	   				timeout:3000,
	   				  dataFilter:function(json){  	   				  	 
	       				return json;    
	   				},    
					 success:function(json,textStatus){    
						shef.proList=json.result.store;
						var text = json.result.store.msfoContent;	
						shef.suo = text.slice(0,100)
//	       			console.log(shef.proList);
	   },     
	   error:function(XMLHttpRequest,textStatus,errorThrown){  
//	   	  alert('错误');
	       console.log("jsonp.error:"+textStatus);    
	   }    
	});  
			},//init函数结尾
			
			inits:function(){
				var shef=this;
				$.ajax({
					type:"post",
					url:link_All.link_Ali+"globalstone/app/private/mall/queryStoreForeignMore.do",
					async:true,
					data:{museId:museId,musePwd:musePwd,museOnlineTag:museOnlineTag,msfoId:msfoId},    
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp2",    
	   				timeout:3000,
	   				  dataFilter:function(json){  	   				  	 
	       				return json;    
	   				},    
					 success:function(json,textStatus){    
						shef.prList=json.result;
//	       			console.log(shef.prList);
	   },     
	   error:function(XMLHttpRequest,textStatus,errorThrown){  
//	   	  alert('错误');
	       console.log("jsonp.error:"+textStatus);    
	   }    
	});  
			},//inits函数结尾
			initg:function(){
				var shef=this;
				$.ajax({
					type:"post",
					url:link_All.link_Ali+"globalstone/app/public/mallStore/queryMallStoreRECList.do",
					async:true,
//					data:{museId:15,musePwd:123456,museOnlineTag:1555,msfoId:17},    
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp3",    
	   				timeout:3000,
	   				  dataFilter:function(json){  	   				  	 
	       				return json;    
	   				},    
					 success:function(json,textStatus){    
						shef.comList=json.result;
//	       			console.log(shef.comList);
	   },     
	   error:function(XMLHttpRequest,textStatus,errorThrown){  
//	   	  alert('错误');
	       console.log("jsonp.error:"+textStatus);    
	   }    
	});  
			},//initg函数结尾
			
			inith:function(){
				var shef=this;
				$.ajax({
					type:"post",
					url:link_All.link_Ali+"globalstone/app/public/mall/queryStoreForeignImage.do",
					async:true,
					data:{msfoId:msfoId},    
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp4",    
	   				timeout:3000,
	   				  dataFilter:function(json){  	   				  	 
	       				return json;    
	   				},    
					 success:function(json,textStatus){    
						shef.imgList=json.result;
						console.log(shef.imgList)
//						$('.mui-slider-loop div').empty()
						for(var i=0;i<shef.imgList.length;i++){
							shef.imgurl.push(shef.imgList[i].msfiImage)
							shef.imgurl.push(shef.imgurl[0])
						}
//						shef.imgurl.push(shef.imgurl[0])
						lunbo(shef.imgurl);
											
						
	       			console.log(shef.imgurl);
	   },     
	   error:function(XMLHttpRequest,textStatus,errorThrown){  
//	   	  alert('错误');
	       console.log("jsonp.error:"+textStatus);    
	   }    
	});  
			},//inith函数结尾
		all:function(){
			var shef=this
			if(shef.show == 0){
				shef.show = 1
			}else{
				shef.show = 0
			}
			
		},
		enterprise:function(id){
				var shef=this;
				localStorage.setItem("mstoId",id);
				mui.openWindow({
					url:'business.html',
					id:'business.html'
				})
				setTimeout(function(){
					plus.webview.currentWebview().close('none')
				},1000)
//				window.location.href="business.html"
			},
		init_login:function(){
			console.log(museId=='')
			var shef=this;
			if(museId !=null && museId!=undefined && museId != ''){
				shef.init();
				shef.inits();
				shef.initg();
				shef.inith(); 
			}else{
				console.log(1)
				$('.bg_tis').css('display','block')
	   			$('.bg_tis p').text('请先登录！')
			   	setTimeout(function(){
			   		$('.bg_tis').css('display','none')
			   		window.location.href="new_login.html"
			   	},2000)
				
			}
			
		},
		tel:function(){
				var shef=this
				window.location.href="tel:"+shef.prList.msfePhone+"";
			}
		}//methods函数结尾
		
		
		
	});
	
	var lunbo = function(img){
//	 	console.log(img)
		$('.mui-slider .mui-slider-group').empty();//清楚产品列表原有子元素
		$('.mui-slider .mui-slider-indicator').empty();//清楚产品列表原有子元素
		//循环输出产品列表
		for(var i=0;i<img.length;i++){
			$('.mui-slider .mui-slider-group').append('<div class="mui-slider-item" ><img onclick="img_show('+(i*1+1)+')" src="'+link_All.link_Ali+'globalstone/common/file/download.do?storeFileName='+img[i]+'" alt="" /></div>');
			$('.mui-slider .mui-slider-indicator').append('<div class="mui-indicator"></div>');
		}
		$('.mui-slider .mui-slider-indicator .mui-indicator:eq('+(img.length*1-1)+')').remove()
		$('.mui-slider .mui-slider-indicator .mui-indicator:eq('+(img.length*1-2)+')').remove()
	}
	
	var vn=new Vue({
		el:'#myadd',
		data:{
			num:0,
		},
		mounted(){
		},
		//初始函数
		created:function(){
			this.check_collection();
		},
		methods:{
			collection:function(){
				var shef=this;
				if(museId != ""){
					$.ajax({
					   url:link_All.link_Ali+'globalstone/app/private/mall/saveUpdateCollectStatus.do',
					   type :'post',
					   data:{
					   	museId:museId,
					   	musePwd:musePwd,
					   	museOnlineTag:museOnlineTag,
					   	msfoId:msfoId,
					   	stauts:c_num
					   },
					   dataType:"jsonp",
					   jsonp:"callback",    
					   jsonpCallback:"success_jsonp2", 
					   dataFilter:function(json){ 
					       return json;    
					   },    
					   success:function(json,textStatus){
					   		console.log(json)
					   		if(c_num == 0){
					   			c_num = 1;
					   			$('.bg_tis').css('display','block')
					   			$('.bg_tis p').text('收藏成功')
							   	setTimeout(function(){
							   		$('.bg_tis').css('display','none')
							   	},2000)
					   		}else if(c_num == 1){
					   			c_num = 0;
					   			$('.bg_tis').css('display','block')
					   			$('.bg_tis p').text('取消收藏成功')
							   	setTimeout(function(){
							   		$('.bg_tis').css('display','none')
							   	},2000)
					   		}
					   		shef.num = c_num;
					   },    
					   error:function(XMLHttpRequest,textStatus,errorThrown){  
					   	  console.log('错误'); 
					   }    
					});  
				}else{
					$('.bg_tis p').text('请先登录!!')
					$('.bg_tis').css('display','block')
				   	  setTimeout(function(){
				   	  	$('.bg_tis').css('display','none')
				   	  	window.location.href = 'new_login.html'; 
				   	  },2000)
				}
			},//init函数结尾
			check_collection:function(){
				var shef=this;
				$.ajax({
//					192.168.0.115:8080/globalstone
				   url:link_All.link_Ali+'globalstone/app/private/mall/queryCollectStoreForeignList.do',
				   type :'post',
				   data:{
				   	museId:museId,
				   	musePwd:musePwd,
				   	museOnlineTag:museOnlineTag,
				   },
				   dataType:"jsonp",
				   jsonp:"callback",    
				   jsonpCallback:"success_jsonp9", 
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
				   		console.log(json.result.rows)
				   		for(var i=0;i<json.result.rows.length;i++){
				   			if(json.result.rows[i].mallStoreForeign.msfoId == msfoId){
				   				c_num = 1;
				   				shef.num = c_num;
				   			}
				   		}
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},
//			img_show:function(index,url){
//				var shef=this
////				console.log(url)
//				$('.img_look img').attr('src',url)
//				if(index == 0){
//					shef.img_c_show=index
//				}else{
//					shef.img_c_show=index
//				}
//			},
			
		}//methods函数结尾
});
	
})

