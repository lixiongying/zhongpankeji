window.onload = function() {
	var mcgoGoodsId=localStorage.getItem("mcgoGoodsId");
	var mgooId = mcgoGoodsId;
	var museId = localStorage.getItem("museId"); 
	var musePwd = localStorage.getItem("musePwd"); 
	var museOnlineTag = localStorage.getItem("museOnlineTag");
	var vn=new Vue({
		el:'#myadd',
		data:{
			url:link_All.link_Ali+'globalstone/common/file/download.do?storeFileName=',
			mgooImage:'',
			name:'',
			alias:'',
			colorSystem:'',
			mgooType:'',
			origin:'',
			mine:'',
			baseColor:'',
			figure:'',
			special:'',
			useFor:'',
			specPrice:'',
			stoneGoodAndBad:'',
			likeMallGoodsArray:'',
			decorationArray:'',
			storeName:'',
			recommend:[],
			num:[],
			num_new:'',
			collection_goos:'0',
			link_url:'',
//			museId:'',
//			musePwd:'',
//			museOnlineTag:'',
			err:0,
			img_c_show:0,
		},
		mounted(){
		},
		//初始函数
		created:function(){
			this.init_one();
			this.init_two();
			this.init_three();
		},
		methods:{
			init_one:function(id){
				var shef=this;
				if(id){
					mgooId=id
				}				
				$.ajax({    
				   url:link_All.link_Ali+'globalstone/app/private/mallGoods/encyc/findMallGoodsDetail.do',
				   type :'post',
				   data:{
				   		museId:1,
				   		musePwd:123456,
				   		museOnlineTag:1555,
				   		mgooId:mgooId,
				   },
				   dataType:"jsonp",
				   jsonp:"callback",    
				   jsonpCallback:"success_jsonp1", 
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
//				   	alert(JSON.stringify(json))
//				   	console.log(json.result.likeMallGoodsArray)
				   	shef.mgooImage = shef.url+json.result.mgooImage//商品图
				   	shef.name = json.result.name//商品名
				   	shef.alias = json.result.alias//别名
				   	shef.colorSystem = json.result.colorSystem//色系
				   	shef.mgooType = json.result.mgooType//类别
				   	shef.origin = json.result.origin//产地
				   	shef.mine = json.result.mine//矿口
				   	shef.baseColor = json.result.baseColor//底色
				   	shef.figure = json.result.figure//花纹
				   	shef.special = json.result.special//特色
				   	shef.useFor = json.result.useFor//用途
				   	shef.specPrice = json.result.specPrice//价格
				   	shef.likeMallGoodsArray = json.result.likeMallGoodsArray//相似
				   	$('.ul06 div').css('width',json.result.likeMallGoodsArray.length*1*122)
				   	shef.stoneGoodAndBad = json.result.stoneGoodAndBad//优劣判定
				   	shef.decorationArray = json.result.decorationArray//多图
				   	shef.storeName = json.result.storeName//感谢
				   	shef.link_url = window.location.href
//				   	shef.init_two();
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			//推荐企业的获取
			init_two:function(){
				var shef=this;
				$.ajax({    
				   url:link_All.link_Ali+'globalstone/app/public/mallStore/queryMallStoreRECList.do',
				   type :'post',
				   data:{
				   },
				   dataType:"jsonp",
				   jsonp:"callback",    
				   jsonpCallback:"success_jsonp2", 
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
				   	shef.recommend.push(json.result.stores[0])
				   	shef.recommend.push(json.result.stores[1])
				   	shef.recommend.push(json.result.stores[2])
//				   	alert(JSON.stringify(json.result))
//				   	shef.init_three();
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			//查询收藏列表
			init_three:function(){
				var shef=this;
				console.log(museId)
				console.log(musePwd)
				console.log(museOnlineTag)
				$.ajax({    
				   url:link_All.link_Ali+'globalstone/app/private/mallGoods/myMallCollectGoodsList.do',
				   type :'post',
				   data:{
				   		museId:museId,
				   		musePwd:musePwd,
				   		museOnlineTag:museOnlineTag,
				   },
				   dataType:"jsonp",
				   jsonp:"callback",    
				   jsonpCallback:"success_jsonp3", 
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
				   	console.log(json)
				   	for(var i=0;i<json.result.rows.length;i++){
				   		if(json.result.rows[i].mcgoGoodsId == mgooId){
				   			shef.collection_goos = "1";
				   		}
				   	}
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			//添加收藏的方法
			init_add:function(){
				var shef=this;
				$.ajax({    
				   url:link_All.link_Ali+'globalstone/app/private/mallGoods/mallCollectGoods.do',
				   type :'post',
				   data:{
				   		museId:museId,
				   		musePwd:musePwd,
				   		museOnlineTag:museOnlineTag,
				   		mgooId:mgooId,
				   },
				   dataType:"jsonp",
				   jsonp:"callback",    
				   jsonpCallback:"success_jsonp4", 
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
				   	console.log(museId)
				   	console.log(musePwd)
				   	console.log(museOnlineTag)
				   	console.log(mgooId)
				   	console.log(json)
				   	shef.collection_goos = "1"
				   	shef.init_three()
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			//取消收藏的方法
			init_reduce:function(){
				var shef=this;
				$.ajax({   
				   url:link_All.link_Ali+'globalstone/app/private/mallGoods/canleMallCollectGoods.do',
				   type :'post',
				   data:{
				   		museId:museId,
				   		musePwd:musePwd,
				   		museOnlineTag:museOnlineTag,
				   		mgooId:mgooId,
				   },
				   dataType:"jsonp",
				   jsonp:"callback",    
				   jsonpCallback:"success_jsonp5", 
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
				   	shef.collection_goos = "0"
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			collection:function(){
				var shef = this
				if(museId != ""){
					if(shef.collection_goos == "0"){
						shef.init_add();
						$('.bg_tis p').text('收藏成功')
				   		shef.err = 1; 
					   	setTimeout(function(){
					   		shef.err = 0; 
					   	},2000)
					}else{
						shef.init_reduce()
						$('.bg_tis p').text('取消收藏成功')
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
			go:function(Id){
				console.log(Id)
				localStorage.setItem("mstoId",Id);	
				mui.openWindow({
					url:'business.html',
					id:'business.html'
				})
				setTimeout(function(){
					plus.webview.currentWebview().close('none')
				},1000)
			},
			out:function(){
				mui.back()
			},
			similar:function(id){
				var shef=this;	
				window.scrollTo(0,0)
				shef.recommend=[]
				this.init_one(id);
			    this.init_two();
			},
			img_show:function(index,url){
				var shef=this
				$('.img_look img').attr('src',url)
				if(index == 0){
					shef.img_c_show=index
				}else{
					shef.img_c_show=index
				}
			},
			decoration_show:function(index,url){
				var shef=this
				console.log(index)
				console.log(url)
				$('.img_look img').attr('src',url)
				if(index == 0){
					shef.img_c_show=index
				}else{
					shef.img_c_show=index
				}
			},
		}//methods函数结尾
	});
//	$('#out').on('tap',function(){
//		console.log(1)
//		window.history.go(-1);
//	})
}
