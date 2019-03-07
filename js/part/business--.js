//window.onload = function() {
$(function(){
	var mstoId=localStorage.getItem("mstoId"); ;
	//底部信息显示
	var vm=new Vue({
		el:'#myadd',
		data:{
			name:"",
			addr:"",
			Phone:"",
			product:[],
			url:'http://120.79.70.221:9281/globalstone/common/file/download.do?storeFileName=',
			clear_goods:[],
			num:0,
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
				   url:'http://120.79.70.221:9281/globalstone/app/public/mallStore/mallGoodsDetails.do',
				   type : 'post',
				   data:{mstoId:21}, 
				   dataType:"jsonp",    
				   jsonp:"callback",  
				   dataFilter:function(json){   
				       return json;    
				   },    
				   success:function(json,textStatus){
				   	    shef_four.product = json;
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
				   url:'http://120.79.70.221:9281/globalstone/app/public/mallStore/mallGoodsType.do',
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
//				   	    console.log(shef_four.clear_goods)
				   },     
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				}); 
			},//init_two函数结尾
		}//methods函数结尾
	});
	//商户信息显示
	var vn=new Vue({
		el:'#myapp',
		data:{
			name:"",
			addr:"",
			Phone:"",
			product:[],
			url:'http://120.79.70.221:9281/globalstone/common/file/download.do?storeFileName=',
			clear_goods:[],
			num:0,
		},
		mounted(){
		},
		//初始函数
		created:function(){
			this.init_one();
		},
		methods:{
			init_one:function(){
				var shef=this;
				$.ajax({    
				   url:'http://120.79.70.221:9281/globalstone/app/public/mallStore/mallStoreDetails.do',
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
				   		console.log(json)
				      	list(json);
				      	shef.init_two();
				   },     
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			init_two:function(){
				var shef_two=this;
				$.ajax({    
				   url:'http://120.79.70.221:9281/globalstone/app/public/mallStore/mallGoodsType.do',
				   type : 'post',
				   data:{mstoId:21}, 
				   dataType:"jsonp",    
				   jsonp:"callback",  
				   dataFilter:function(json){    
			//	       console.log("jsonp.filter:"+json);    
				       return json;    
				   },    
				   success:function(json,textStatus){
//				   	    console.log(json)
				   },     
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				}); 
			},//init_two函数结尾
		}//methods函数结尾
	});
	//收藏按钮
	var vb=new Vue({
		el:'#myadp',
		data:{
		},
		mounted(){
		},
		//初始函数
		created:function(){
			this.collection();
			this.yncollection();
		},
		methods:{
			init_three:function(url){
				var shef_three=this;
				$.ajax({    
					//http://ip:port/globalstone/app/private/mallStore/mallCollectStore.do
				   url:'http://120.79.70.221:9281/globalstone/app/'+url+'.do',
				   type : 'post',
				   data:{
				   			museId:1,
				   			musePwd:123456,
				   			museOnlineTag:1555,
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
					   				if(json.result.rows[i].mcstId){
							   	  		num=0;
							   	  		shef_three.collection();
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
				if(shef.num == 1){
					var src = $('#collection img').attr('src').replace("1","0"); 
					$('#collection img').attr('src',src);
					var url = 'private/mallStore/canleMallCollectStore';
					shef.init_three(url);
					shef.num = 0;
				}else{
					var src = $('#collection img').attr('src').replace("0","1"); 
					$('#collection img').attr('src',src);
					var url = 'private/mallStore/mallCollectStore';
					shef.init_three(url);
					shef.num = 1;
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
		$('.social-share').attr('data-url',window.location.href)
		$('.social-share').attr('data-title',json.mstoName)
		$('.header_lunbo .mui-slider-group').empty();//清楚产品列表原有子元素
		console.log(json)
		//循环输出产品列表
		for(var i=0;i<json.imageFiles.length;i++){
			$('.header_lunbo .mui-slider-group').append('<div class="mui-slider-item"><img src="http://120.79.70.221:9281/globalstone/common/file/download.do?storeFileName='+json.imageFiles[i]+'" alt="" /></div>');
		}
		for(var k = 0;k<json.imageFiles.length;k++){
			$('.header_lunbo_o').append('<div></div>')
		}
		//产品列表和清货信息的显示选择
		$('.footer_top div').on('tap',function(){
			var index = $('.footer_top div').index(this);
			$('.footer_top div').removeClass('click');
			$('.footer_top div:eq('+index+')').addClass('click');
			switch (index){
				case 0:
					$('.footer_bottom_left').css('display','block');
					$('.footer_bottom_right').css('display','none');
				break;
				case 1:
					$('.footer_bottom_left').css('display','none');
					$('.footer_bottom_right').css('display','block');
				break;
			}
		})
		//轮播图的下标圆点显示
		document.querySelector('.mui-slider').addEventListener('slide', function(event) {
		  //注意slideNumber是从0开始的；
		  $('.header_lunbo_o div').css('background','#9ea9ad');
		  $('.header_lunbo_o div:eq('+event.detail.slideNumber+')').css('background','#cf6f08');
		});
		
		//返回上一页
		
		
		
		
		//全文显示
		var text_all = json.mstoContent;
		var text_ban;
		if(text_all.length>=100){
			text_ban = text_all.substring(0,100);
			$('.ellipsis').text(text_ban);
		}else{
			$('.ellipsis').text(text_all);
			$('#all').remove();
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
		var Id = 21;
//		
		//跳转到沙盘地址
		$('.header_int_top').on('tap',function(){
			var url = "sand_table.html?lan="+Id;
			window.location.href = url; 
		})
	}
	
//}