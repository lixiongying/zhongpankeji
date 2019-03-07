window.onload = function(){
	console.log(localStorage.getItem("museOnlineTag"))
	console.log(localStorage.getItem("museId"))
	console.log(localStorage.getItem("musePwd"))
	var vn=new Vue({
		el:'#myadd',
		data:{
			museId:'',
			musePwd:'',
			museOnlineTag:"null",
			museNickName:'',
			museImage:null,
			mstoIsCert:1,
			museAddress:'',
			musePhone:'',
			exit_num:[],
			exit_ok:[],
			imported_num:[],
			imported_ok:[],
			museTrueName:'',
			museCompanyName:'',
			err:0,
			mstoId:'',
			url:link_All.link_Ali+'globalstone/common/file/download.do?storeFileName=',
		},
		mounted(){
		},
		//初始函数
		created:function(){
			this.ou();
		},
		methods:{
			//个人信息查询
			init_one:function(){
				var shef=this;
				console.log(shef.museId)
				
				console.log(shef.musePwd)
				console.log(shef.museOnlineTag)
				$.ajax({
				   url:link_All.link_Ali+'globalstone/app/private/system/queryMemberInfoById.do',
				   type :'post',
				   data:{
				   	museId:shef.museId,
				   	musePwd:shef.musePwd,
				   	museOnlineTag:shef.museOnlineTag,
				   },
				   dataType:"jsonp",
				   jsonp:"callback",    
				   jsonpCallback:"success_jsonp0", 
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
//				   		alert(json)
				   		shef.museNickName = json.result.museNickName
				   		shef.museAddress = json.result.museAddress
				   		shef.musePhone = json.result.musePhone
				   		shef.museImage=json.result.museImage;
				   		shef.museCompanyName=json.result.museCompanyName
				   		shef.museTrueName=json.result.museTrueName;
				   		
				   		console.log(shef.museImage)
				   		if(shef.mstoIsCert == "2"){
				   			shef.init_two();
				   			shef.init_three();
				   		}
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			//判断是否登录
			ou:function(){
				var shef=this;
				shef.museId = localStorage.getItem("museId"); 
//				alert(shef.museId)
		   		shef.musePwd = localStorage.getItem("musePwd"); 
		   		shef.mstoId = localStorage.getItem("mstoId"); 
		   		shef.museOnlineTag = localStorage.getItem("museOnlineTag");
		   		shef.mstoIsCert = localStorage.getItem("mstoIsCert");
		   		if(localStorage.getItem("museOnlineTag") != 'null'){		
		   			this.init_one();
		   		}else{	   			
		   			$('.main_AF div').attr('data-url','new_login.html')
		   			$('.main_BF div').attr('data-url','new_login.html')
		   		}
			},
			goInfo:function(){
				var shef = this;
				if(shef.museId){
					mui.openWindow({
						url:'information.html',
						id:'information.html'
					})
					
				}else{
					mui.openWindow({
						url:'new_login.html',
						id:'new_login.html'
					})
				}
			},
			goCollect:function(){
				var shef = this;
				if(shef.museId){
					mui.openWindow({
						url:'collect.html',
						id:'collect.html'
					})
					
				}else{
					mui.openWindow({
						url:'new_login.html',
						id:'new_login.html'
					})
				}
			},
			//出口订单查询
			init_two:function(){
				var shef=this;
				$.ajax({
				   url:link_All.link_Ali+'globalstone/app/private/order/queryOrderExportList.do',
				   type :'post',
				   data:{
				   	museId:shef.museId,
				   	musePwd:shef.musePwd,
				   	museOnlineTag:shef.museOnlineTag,
				   },
				   dataType:"jsonp",
				   jsonp:"callback",    
				   jsonpCallback:"success_jsonp2", 
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
//				   	console.log(json)
				   		for(var i=0;i<json.result.list.length;i++){
				   			if(json.result.list[i].orderType == 1){
				   				shef.exit_num.push(json.result.list[i])
				   				if(json.result.list[i].orderStatus == 5){
				   					shef.exit_ok.push(json.result.list[i])
				   				}
				   			}else if(json.result.list[i].orderType == 2){
				   				shef.imported_num.push(json.result.list[i])
				   				if(json.result.list[i].orderStatus == 5){
				   					shef.imported_ok.push(json.result.list[i])
				   				}
				   			}
				   		}
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			//进口
			init_three:function(){
				var shef=this;
				$.ajax({
				   url:link_All.link_Ali+'globalstone/app/private/order/queryOrderImportList.do',
				   type :'post',
				   data:{
				   	museId:shef.museId,
				   	musePwd:shef.musePwd,
				   	museOnlineTag:shef.museOnlineTag,
				   },
				   dataType:"jsonp",
				   jsonp:"callback",    
				   jsonpCallback:"success_jsonp3", 
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
				   	console.log(json)
				   		for(var i=0;i<json.result.list.length;i++){
				   			if(json.result.list[i].orderType == 1){
				   				shef.exit_num.push(json.result.list[i])
				   				if(json.result.list[i].orderStatus == 8){
				   					shef.exit_ok.push(json.result.list[i])
				   				}
				   			}else if(json.result.list[i].orderType == 2){
				   				shef.imported_num.push(json.result.list[i])
				   				if(json.result.list[i].orderStatus == 8){
				   					shef.imported_ok.push(json.result.list[i])
				   				}
				   			}
				   		}
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	console.log('错误'); 
				   }    
				}); 
			},//init函数结尾
			product:function(){
				var shef = this;
				if(shef.museId){
					if(shef.mstoIsCert == 2){
						mui.openWindow({
							url:'product.html',
							id:'product.html'
						})
					}else{
						$('.bg_tis p').text('暂未开放！')
						shef.err = 1; 
					   	  setTimeout(function(){
					   	  	shef.err = 0; 
					   	  },2000)
					}
				}else{
					mui.openWindow({
						url:'new_login.html',
						id:'new_login.html'
					})
				}
				
			},
			inSure:function(){
				var shef=this;
				if(!shef.museId){
					mui.openWindow({
						url:'new_login.html',
						id:'new_login.html'
					})
					
				}else{
					if(shef.mstoIsCert == 1){
						mui.openWindow({
							url:'information.html',
							id:'information.html'
						})
					}else{
						
					}
					
				}
			},
			gologin:function(){
				var shef=this;			
				if(shef.museId){
					mui.openWindow({
						url:'information.html',
						id:'information.html'
					})
				}else{
					mui.openWindow({
						url:'new_login.html',
						id:'new_login.html'
					})
				}
			},	
			//查询清货信息
			goods:function(){
				var shef=this;
				if(localStorage.getItem("museOnlineTag") != 'null'){
					$.ajax({
					   url:link_All.link_Ali+'globalstone/app/public/mallStore/mallGoodsType.do',
					   type :'post',
					   data:{
					   	mstoId:shef.mstoId,
					   },
					   dataType:"jsonp",
					   jsonp:"callback",    
					   jsonpCallback:"success_jsonp5", 
					   dataFilter:function(json){ 
					       return json;    
					   },    
					   success:function(json,textStatus){
					   	console.log(json)
					   	if(json.eeror == undefined){
					   		mui.openWindow({
								url:'goods.html',
								id:'goods.html'
							})
	//				   		window.location.href="goods.html";
					   	}else{
					   		$('.bg_tis p').text('无清货信息！')
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
				}else{
					mui.openWindow({
						url:'new_login.html',
						id:'new_login.html'
					})
				}
			},
		}//methods函数结尾
	});
	$('.long').on('tap',function(){
		window.location.href="stone_street.html";
	})
	$('.sha').on('tap',function(){
		window.location.href="sand_table.html";
	})
	$('.index').on('tap',function(){
		window.location.href="encyclopedias.html";
	})
	
	
	
	$('#go1').on('tap',function(){
		console.log(1)
		window.location.href="supply.html";
	})
	
}
