//window.onload = function() {
$(function(){
	var mstoId=localStorage.getItem("mstoId"); 
	console.log(mstoId)
	var Id = localStorage.getItem("museId"); 
	var Pwd = localStorage.getItem("musePwd"); 
	var Tag = localStorage.getItem("museOnlineTag"); 
	//底部信息显示
	var vm=new Vue({
		el:'#myadd',
		data:{
			name:"",
			addr:"",
			Phone:"",
			product:{},
			index_goods:0,
			url:link_All.link_Ali+'globalstone/common/file/download.do?storeFileName=',
			clear_goods:[],
			product_show:0,
			clear_show:0,
			num:1,
		},
		mounted(){
		},
		//初始函数
		created:function(){
			this.init_four();
			this.init_five();
		},
		methods:{
			init_four:function(){
				var shef_four=this;
				$.ajax({    
					//http://120.79.70.221:9281/globalstone/app/public/mallStore/mallGoodsDetails.do
				   url:link_All.link_Ali+'globalstone/app/public/mallStore/mallGoodsDetails.do',
				   type : 'post',
				   data:{mstoId:mstoId}, 
				   dataType:"jsonp",    
				   jsonp:"callback",  
				   dataFilter:function(json){   
				       return json;    
				   },    
				   success:function(json,textStatus){
//				   		console.log(json)
				   		if(json.eeror != undefined){
//				   			console.log(json.eeror)
				   		}else{
				   			shef_four.product = json;
				   			shef_four.product_show=1;
				   		}
//				   		console.log(shef_four.product_show)
				   },     
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				}); 
			},//init_two函数结尾
			init_five:function(){
				var shef_four=this;
				$.ajax({    
					//http://120.79.70.221:9281/app/public/mallStore/mallGoodsType.do
				   url:link_All.link_Ali+'globalstone/app/public/mallStore/mallGoodsType.do',
				   type : 'post',
				   data:{mstoId:mstoId}, 
				   dataType:"jsonp",    
				   jsonp:"callback",  
				   dataFilter:function(json){   
				       return json;    
				   },    
				   success:function(json,textStatus){
//				   	    console.log(json)
				   	    shef_four.clear_goods = json;
				   	    if(json.eeror != undefined){
//				   			console.log(json.eeror)
				   		}else{
				   			shef_four.clear_goods = json;
				   			shef_four.clear_show=1;
				   		}
//				   	    console.log(shef_four.clear_show)
				   },     
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				}); 
			},//init_two函数结尾
			stone:function(id){
//				console.log(id)
				localStorage.setItem("mcgoGoodsId",id);	
				mui.openWindow({
					url:'prodetail.html',
					id:'prodetail.html'
				})
				setTimeout(function(){
					plus.webview.currentWebview().close('none')
				},1000)
				
//				window.location.href = 'prodetail.html'; 
			},
			goodss:function(index){
				var shef= this
				if(index == 0){
					shef.index_goods = 0;
					$('.footer_top div').removeClass('click');
					$('.footer_top div:eq('+index+')').addClass('click');
				}else{
					shef.index_goods = 1;  
					$('.footer_top div').removeClass('click');
					$('.footer_top div:eq('+index+')').addClass('click');
				}
			},
		}//methods函数结尾
	});
	//商户信息显示
	var vn=new Vue({
		el:'#myapp',
		data:{
			name:"",
			addr:"",
			Phone:"",
			url:link_All.link_Ali+'globalstone/common/file/download.do?storeFileName=',
			clear_goods:[],
			num:0,
		},
		mounted(){
		},
		//初始函数
		created:function(){
			this.init_one();
//			this.init_two();
		},
		methods:{
			init_one:function(){
//				console.log(mstoId)
				var shef=this;
				$.ajax({    
				   url:link_All.link_Ali+'globalstone/app/public/mallStore/mallStoreDetails.do',
				   type : 'post',
				   data:{mstoId:mstoId}, 
				   dataType:"jsonp",    
				   jsonp:"callback",    
				   jsonpCallback:"success_jsonp",    
				   timeout:3000,    
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
				   		shef.name = json.mstoName;
				   		shef.addr = json.mstoAddress;
				   		shef.Phone = json.mstoPhone;
//				   		console.log(json)
				   		if(json.eeror==undefined){
				   			list(json);
				   		}
				      	
//				      	shef.init_two();
				   },     
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			
//			init_two:function(){
//				var shef_two=this;
//				$.ajax({    
//				   url:link_All.link_Ali+'globalstone/app/public/mallStore/mallGoodsType.do',
//				   type : 'post',
//				   data:{mstoId:Id}, 
//				   dataType:"jsonp",    
//				   jsonp:"callback",  
//				   jsonpCallback:"success_jsonp2",  
//				   dataFilter:function(json){    
//			//	       console.log("jsonp.filter:"+json);    
//				       return json;    
//				   },    
//				   success:function(json,textStatus){
////				   	    console.log(json)
//				   },     
//				   error:function(XMLHttpRequest,textStatus,errorThrown){  
//				   	  console.log('错误'); 
//				   }    
//				}); 
//			},//init_two函数结尾
		}//methods函数结尾
	});
	//收藏按钮
	var vb=new Vue({
		el:'#myadp',
		data:{
			err:0,
		},
		mounted(){
		},
		//初始函数
		created:function(){
//			this.collection();
			this.yncollection();
		},
		methods:{
			init_three:function(url){
				var shef_three=this;
				
					$.ajax({    
					//http://ip:port/globalstone/app/private/mallStore/mallCollectStore.do
					   url:link_All.link_Ali+'globalstone/app/'+url+'.do',
					   type : 'post',
					   data:{
					   			museId:Id,
					   			musePwd:Pwd,
					   			museOnlineTag:Tag,
					   			mstoId:mstoId
					   },
					   dataType:"jsonp",    
					   jsonp:"callback",  
					   dataFilter:function(json){  
					       return json;    
					   },    
					   success:function(json,textStatus){
						   	if(json.result!=null){
						   		if(json.result.rows.length!=0){
						   			for(var i=0;i<json.result.rows.length;i++){
						   				if(json.result.rows[i].mallStore.mstoId == mstoId){
								   	  		shef_three.num=1;
	//							   	  		shef_three.collection();
											var src = $('#collection img').attr('src').replace("0","1"); 
											$('#collection img').attr('src',src);
							   			}
						   			}
							   	}
						   	}
					   },     
					   error:function(XMLHttpRequest,textStatus,errorThrown){  
					   	  console.log('错误'); 
					   }    
					});
				
			},//init_two函数结尾
			//收藏标志的显示
			collection:function(){
				var shef=this;
				if(Id != ""){
					$('.bg_tis p').text('收藏成功')
			   		shef.err = 1; 
				   	setTimeout(function(){
				   		shef.err = 0; 
				   	},2000)
	//				var src = $('#collection img').attr('src').replace("0","1"); 
	//				$('#collection img').attr('src',src);
					if(shef.num == 1){
						var src = $('#collection img').attr('src').replace("1","0"); 
						$('#collection img').attr('src',src);
						var url = 'private/mallStore/canleMallCollectStore';
						shef.init_three(url);
						shef.num = 0;
						$('.bg_tis p').text('取消收藏成功')
				   		shef.err = 1; 
					   	setTimeout(function(){
					   		shef.err = 0; 
					   	},2000)
					}else{
						var src = $('#collection img').attr('src').replace("0","1"); 
						$('#collection img').attr('src',src);
						var url = 'private/mallStore/mallCollectStore';
						shef.init_three(url);
						shef.num = 1;
						$('.bg_tis p').text('收藏成功')
				   		shef.err = 1; 
					   	setTimeout(function(){
					   		shef.err = 0; 
					   	},2000)
					}
				}else{
					$('.bg_tis p').text('请先登录!!')
		   			shef.err = 1; 
				   	  setTimeout(function(){
				   	  	shef.err = 0; 
				   	  	window.location.href = 'login.html'; 
				   	  },2000)
				}
			},
			yncollection:function(){
				var shef=this;
				var url = 'private/mallStore/myMallCollectStoreList';
				shef.init_three(url);
			},
		}//methods函数结尾
	});
})
	var list= function(json){
		var Id = localStorage.getItem("mstoId");
		$('.social-share').attr('data-url',window.location.href)
		$('.social-share').attr('data-title',json.mstoName)
		$('.header_lunbo .mui-slider-group').empty();//清楚产品列表原有子元素
//		console.log(json)
		//循环输出产品列表
//		console.log(json.imageFiles)
		if(json.imageFiles.length!=0){
			for(var i=0;i<json.imageFiles.length;i++){
				$('.header_lunbo .mui-slider-group').append('<div class="mui-slider-item"><img onclick="img_show('+(i*1+1)+')" src="'+link_All.link_Ali+'globalstone/common/file/download.do?storeFileName='+json.imageFiles[i]+'" alt="" /></div>');
			}
			for(var k = 0;k<json.imageFiles.length;k++){
				$('.header_lunbo_o').append('<div></div>')
			}
		}
		//产品列表和清货信息的显示选择
//		$('.footer_top div').on('tap',function(){
//			var index = $('.footer_top div').index(this);
//			$('.footer_top div').removeClass('click');
//			$('.footer_top div:eq('+index+')').addClass('click');
//			switch (index){
//				case 0:
//					$('.footer_bottom_left').css('display','block');
//					$('.footer_bottom_right').css('display','none');
//				break;
//				case 1:
//					$('.footer_bottom_left').css('display','none');
//					$('.footer_bottom_right').css('display','block');
//				break;
//			}
//		})
		//轮播图的下标圆点显示
		document.querySelector('.mui-slider').addEventListener('slide', function(event) {
		  //注意slideNumber是从0开始的；
		  $('.header_lunbo_o div').css('background','#9ea9ad');
		  $('.header_lunbo_o div:eq('+event.detail.slideNumber+')').css('background','#cf6f08');
		});
		
		//返回上一页
		
		
		
		
		//全文显示
		var text_all="";
		if(json.mstoContent != null){
			text_all= json.mstoContent;
		}
//		console.log(text_all)
		var text_ban;
		if(text_all.length>=100){
			text_ban = text_all.substring(0,100);
			$('.ellipsis').text(text_ban);
		}else{
			$('#all').css('display','none')
			$('.ellipsis').text(text_all);
		}
		
		//全文显示的按钮
		var on_num =0
		$('#all').on('tap',function(){
			if(on_num == 0 ){
				$('.ellipsis').text(text_all);
				$('#all').text('收起');
				on_num = 1;
			}else{
				$('.ellipsis').text(text_ban);
				$('#all').html('<i>......</i>全文</span>')
				on_num = 0;
			}
		})
		//电话跳转
		$('.header_int_bottom').on('tap',function(){
			window.location.href="tel:"+json.mstoPhone+"";
		})
		
//		
		//跳转到沙盘地址
		$('.header_int_top').on('tap',function(){
			var url = "sand_table.html?lan="+Id;
			window.location.href = url; 
		})
	}
	
//}