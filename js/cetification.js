window.onload = function() { 
	var museId = localStorage.getItem("museId"); 
//	var museId = 1
	var musePwd = localStorage.getItem("musePwd"); 
//	var musePwd = 123456
	var museOnlineTag = localStorage.getItem("museOnlineTag"); 
//	var museOnlineTag = 1555
	var oimpId = localStorage.getItem("oimpId"); 
//	var oimpId = 19
	var GoodsType = localStorage.getItem("GoodsType"); 
	var vn=new Vue({
		el:'#myadd',
		data:{
			url:link_All.link_Ali+'globalstone/common/file/download.do?storeFileName=',
			Arr:[],
			oicoLoadTime:'',
			oicoLoadImage:'',
			oicoLoadBill:[],
			oicoOrderInfo:'',
			oicoOrderInfo_show:0,
			oicoLoadImage_show:0,
			img_c_show:0,
		},
		mounted(){
		},
		//初始函数
		created:function(){
			this.order_type();
		},
		methods:{
			init_one:function(){
				var shef=this;
				$.ajax({    
//				   url:link_All.link_Ali+'globalstone/app/private/order/queryOrderImportList.do',
				   url:link_All.link_Ali+'globalstone/app/private/order/queryContainerCertificationImport.do',
				   type :'post',
				   data:{
				   		museId:museId,
				   		musePwd:musePwd,
				   		museOnlineTag:museOnlineTag,
				   		oimpId:oimpId,
				   },
				   dataType:"jsonp",
				   jsonp:"callback",    
				   jsonpCallback:"success_jsonp", 
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
//				   	console.log(json.result.oicoLoadImage)
				   	shef.Arr=json.result;
				   	shef.oicoLoadTime = shef.Arr.oicoLoadTime
				   	if(shef.Arr.oicoLoadImage !=undefined && shef.Arr.oicoLoadImage != null && shef.Arr.oicoLoadImage != ""){
				   		shef.oicoLoadImage = shef.url+shef.Arr.oicoLoadImage//装柜图片
				   		shef.oicoLoadImage_show = 1
				   	}
				   	if(shef.Arr.oicoOrderInfo !=undefined && shef.Arr.oicoOrderInfo != null && shef.Arr.oicoOrderInfo != ""){
				   		shef.oicoOrderInfo =shef.url+shef.Arr.oicoOrderInfo//装箱单
				   		shef.oicoOrderInfo_show = 1
				   	}
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			init_two:function(){
				var shef=this;
				$.ajax({    
//				   url:link_All.link_Ali+'globalstone/app/private/order/queryOrderImportList.do',
				   url:link_All.link_Ali+'globalstone/app/private/order/queryContainerCertification.do',
				   type :'post',
				   data:{
				   		museId:museId,
				   		musePwd:musePwd,
				   		museOnlineTag:museOnlineTag,
				   		oexpId:oimpId,
				   },
				   dataType:"jsonp",
				   jsonp:"callback",    
				   jsonpCallback:"success_jsonp", 
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
//				   	console.log(shef.Arr.oecoImage != undefined && shef.Arr.oecoImage != null && shef.Arr.oecoImage != "")
				   	shef.Arr=json.result;
				   	shef.oicoLoadTime = shef.Arr.oecoCreateTime//装柜时间
				   	if(shef.Arr.oecoImage != undefined && shef.Arr.oecoImage != null && shef.Arr.oecoImage != ""){
				   		shef.oicoLoadImage_show = 1
				   		shef.oicoLoadImage = shef.url+shef.Arr.oecoImage//装柜图片
//				   		console.log(1)
				   	}
				   	if(shef.Arr.oecoAttach != undefined &&  shef.Arr.oecoAttch != null && shef.Arr.oecoAttach != ""){
				   		shef.oicoOrderInfo_show = 1
				   		shef.oicoOrderInfo =shef.url+shef.Arr.oecoAttach//装箱单
				   	}
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			order_type:function(){
				var shef=this;
//				console.log(GoodsType)
				if(GoodsType == 2){
//					console.log(2)
					shef.init_one();
				}else if(GoodsType == 1){
//					console.log(1)
					shef.init_two();
				}
			},
			img_show:function(index,url){
				var shef=this
//				console.log(url)
				$('.img_look img').attr('src',url)
				if(index == 0){
					shef.img_c_show=index
				}else{
					shef.img_c_show=index
				}
			},
			out:function(){
				window.history.go(-1);
			},
		}//methods函数结尾
	});
	$('#out').on('tap',function(){
		window.history.go(-1);
	})
}
