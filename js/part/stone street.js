window.onload =function(){
	
	var vn=new Vue({
		el:'#myadd',
		data:{
			url:link_All.link_Ali+'globalstone/common/file/download.do?storeFileName=',
			Arr:[],
			img_Arr:[],
			img:'',
			mstoContent:[],
		},
		mounted(){
		},
		//初始函数
		created:function(){
			this.init_one();
		},
		methods:{
			go:function(id){
//				console.log(1)
				localStorage.setItem("mstoId",id);
				mui.openWindow({
					url:'business.html',
					id:'business.html'
				})
//				window.location.href="business.html"
			},
			init_one:function(){
				var shef=this;
				$.ajax({    
					//http://120.79.70.221:9281/globalstone/app/private/mallStore/queryMallStoreList.do?
				   url:link_All.link_Ali+'globalstone/app/private/mallStore/queryMallStoreList.do',
				   type :'post', 
				   //museId=1&museOnlineTag=1555&musePwd=123456&mstoName=%E5%AF%BF%E5%8E%BF
				   data:{
				   		museId:1,
				   		musePwd:123456,
				   		museOnlineTag:1555,
				   },
				   dataType:"jsonp",
				   jsonp:"callback",    
				   jsonpCallback:"success_jsonp", 
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
//				   		console.log(json.result)
				   		shef.Arr = json.result.stores
				   		for(var i=0;i<shef.Arr.length;i++){
				   			(function(){
				   			shef.img_Arr.push({})
				   			shef.init_two(shef.Arr[i].mstoId,i)
				   			console.log(i)
				   			})(i)
				   		}
				   		lists()
				   },     
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			init_two:function(id,i){
				var shef=this;
				$.ajax({    
					//http://120.79.70.221:9281/globalstone/app/private/mallStore/queryMallStoreList.do?
				   url:link_All.link_Ali+'globalstone/app/public/mallStore/mallStoreDetails.do',
				   type :'post', 
				   //museId=1&museOnlineTag=1555&musePwd=123456&mstoName=%E5%AF%BF%E5%8E%BF
				   data:{
				   		mstoId:id,
				   },
				   dataType:"jsonp",
				   jsonp:"callback",    
//				   jsonpCallback:"success_jsonp2", 
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
//				   		console.log(json)
				   		shef.img_Arr[i] = json.imageFiles
				   		shef.img = json.imageFiles[0]
				   		shef.mstoContent[i]=(json.mstoContent)
//				   		console.log(shef.mstoContent)
				   },     
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
		}//methods函数结尾
	});
	
	
	
	
	
	var lists = function(data){
//		var data =[
//					{name:'长寿县东盈石材厂',
//					phone:'15842411546',
//					address:'长寿县下东街北区路144号',
//					details:'莎安娜、黄金米黄、银白龙、莎安娜、黄金米黄、银白龙、',
//					head_img:'./img/stone street/enterprise1.png',
//					img:['./img/stone street/product1.png',
//						 './img/stone street/product2.png',
//						 './img/stone street/product3.png']
//				},
//					{name:'长寿县东盈石材厂',
//					phone:'15842411546',
//					address:'长寿县下东街北区路144号',
//					details:'莎安娜、黄金米黄、银白龙、莎安娜、黄金米黄、银白龙、',
//					head_img:'./img/stone street/enterprise2.png',
//					img:['./img/stone street/product4.png',
//						 './img/stone street/product5.png',
//						 './img/stone street/product6.png']
//					}
//				  ]
//		var data=[];
//		for(var i=0; i<3;i++){
//			data.push(data[0]);
//			data.push(data[1]);
//		}
//		var html='';
		
//		console.log()
//		var list = function(data){
//			for(var i=0;i<data.length;i++){
//					<div class="main" id=+data[i].mstoId+>
//						<div class="main_top">
//							<div class="main_top_left">
//								<img src="+url+data[i].mstoImage+" alt="" />
//							</div>
//							<div class="main_top_right">
//								<p><a href="business.html">+data[i].mstoName+</a></p>
//								<p>+data[i].mstoPhone+</p>
//								<p>+data[i].mstoAddress+</p>
//							</div>
//						</div>
//						<div class="main_bottom">
//							<div class="main_bottom_top">
//								<p>+data[i].mstoName+</p>
//							</div>
//							<div class="main_bottom_bottom">
//								<img src="+data[i].mstoName+" alt="" />
//								<img src="+data[i].mstoName+" alt="" />
//								<img src="+data[i].mstoName+" alt="" />
//							</div>
//						</div>
//					</div>
//				$('.main_all').append(html);
//				html='';
//			}
//		}
//		list(data);
		
		$(window).scroll(function(){
			if($(window).scrollTop() >= 200){
				$(".top").fadeIn(1000); // 开始淡入
			} else{
				$(".top").stop(true,true).fadeOut(1000); // 如果小于等于 200 淡出
			}
		});
		$(".top").click(function(){  
	        $('body,html').animate({scrollTop:0},1000); //点击按钮让其回到页面顶部  
	    });
	}
}
