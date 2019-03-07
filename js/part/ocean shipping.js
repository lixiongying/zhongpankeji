window.onload = function(){
	var museId = localStorage.getItem("museId"); 
//	var museId = 1
	var musePwd = localStorage.getItem("musePwd"); 
//	var musePwd = 123456
	var museOnlineTag = localStorage.getItem("museOnlineTag"); 
//	var museOnlineTag = 1555
	var oimpId = localStorage.getItem("oimpId"); 
//	var oimpId = 19
	var GoodsType = localStorage.getItem("GoodsType"); 
	console.log(GoodsType)
	var vn=new Vue({
		el:'#myadd',
		data:{
			url:link_All.link_Ali+'globalstone/common/file/download.do?storeFileName=',
			Arr:[],
			oiseAboardTime:'',
			oisePeriod:'',
			oiseContainerNum:'',
			oiseWeight:'',
			adress:'',
			oiseArriveTimePlan:'',
		},
		mounted(){
		},
		//初始函数
		created:function(){
			this.order_type();
		},
		methods:{
			init_two:function(){
			//adress	当前位置
			//DateTime	船期
			//oiseAboardTime	开船日期
			//oiseArriveTimePlan	预计到港时间
			//oiseContainerNum	柜量
			//oiseBillNo	提单号
			//oiseContent	船只介绍
			//oiseId	Id
			//oiseName	船只名称
			//oiseOrderId	订单id
			//oisePeriod	船期
			//oiseWeight	提单重量
			//oilnLat	纬度
			//oilnLng	经度
			//oilnCreateTime	位置更新时间
				var shef=this;
				$.ajax({    
//				   url:link_All.link_Ali+'globalstone/app/private/order/queryOrderImportList.do',
				   url:link_All.link_Ali+'globalstone/app/private/order/queryOrderImportSeaDetail.do',
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
				   	console.log(json.result)
				   	shef.Arr=json.result;
				   	shef.oiseAboardTime=shef.Arr.ImportSea.oiseAboardTime;
				   	shef.oisePeriod=shef.Arr.ImportSea.oisePeriod;
				   	shef.oiseContainerNum=shef.Arr.ImportSea.oiseContainerNum;
				   	shef.oiseWeight=shef.Arr.ImportSea.oiseWeight;
				   	shef.adress=shef.Arr.adress;
				   	shef.oiseArriveTimePlan=shef.Arr.ImportSea.oiseArriveTimePlan;
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			init_one:function(){
				//leaveTime	开船时间
				//dateTime	船期
				//containerNum	柜量
				//weight	重量
				//adress	当前地址（不是address,撸错单词了）
				//arriTimePlan	预计到港时间
				//oelnLng	经度
				//oelnLat	纬度
				//oelnCreateTime	地址更新时间
				var shef=this;
				$.ajax({    
//				   url:link_All.link_Ali+'globalstone/app/private/order/queryOrderImportList.do',
				   url:link_All.link_Ali+'globalstone/app/private/order/queryOrderExportSeaDetail.do',
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
				   	console.log(json.result)
				   	shef.Arr=json.result;
				   	shef.oiseAboardTime=shef.Arr.leaveTime;
				   	shef.oisePeriod=shef.Arr.dateTime;
				   	shef.oiseContainerNum=shef.Arr.containerNum;
				   	shef.oiseWeight=shef.Arr.weight;
				   	shef.adress=shef.Arr.adress;
				   	shef.oiseArriveTimePlan=shef.Arr.arriTimePlan;
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			order_type:function(){
				var shef=this;
				if(GoodsType == 2){
					console.log(2)
					shef.init_two();
				}else if(GoodsType == 1){
					console.log(1)
					shef.init_one();
				}
			},
		}//methods函数结尾
	});
	$('#out').on('tap',function(){
		window.history.go(-1);
	})
}
