window.onload = function (){
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
			name:'',
			oiruCarNo:'',
			adress:'',
			oiruPhone:'',
			oiruSendTimePlan:'',
			DateTime:'',
			oiruArriTime:'',
			OrderStatus:'', 
			ImportTruck_show:0,
		},
		mounted(){
		},
		//初始函数
		created:function(){
//			this.init_one();
			this.order_type();
		},
		methods:{
			init_one:function(){
				var shef=this;
				$.ajax({    
//				   url:link_All.link_Ali+'globalstone/app/private/order/queryOrderImportList.do',
				   url:link_All.link_Ali+'globalstone/app/private/order/queryOrderExportTruckDetail.do',
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
				   	shef.ImportTruck_show =1
				   	shef.Arr=json.result;
				   	shef.name=shef.Arr.truck.oetrName//司机名
				   	shef.oiruCarNo=shef.Arr.truck.oetrNo//车牌号码
				   	shef.adress=shef.Arr.adress//车辆位置
				   	shef.oiruPhone=shef.Arr.truck.oetrPhone//联系电话
				   	shef.oiruSendTimePlan=shef.Arr.truck.oetrLoadTimePlan//送货时间
				   	shef.DateTime=shef.Arr.dateTime//预计送货时间
				   	shef.oiruArriTime=shef.Arr.truck.oetrArriveTimePlan//到达时间
				   	//状态
				   	if(shef.Arr.status >=3){
				   		shef.OrderStatus = "已拖运"
				   	}else if(shef.Arr.status < 3){
				   		shef.OrderStatus = "待拖运"
				   	}
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			init_two:function(){
//				OrderStatus	订单状态//1-待订舱（已创建） 2-待装柜（已订舱） 3-待上船（已装柜） 4-海运中（已上船） 5-待通关（已到港） 6-待托运（已通关）  7-待收货（已拖走） 8-交易完成（已交货）
//				oiruArriTime	到达时间
//				oiruCarNo	车牌号
//				oiruCompanyName	拖车公司名称
//				oiruId	Id
//				oiruName	司机名称
//				oiruOrderId	订单id
//				oiruPhone	司机电话
//				oiruSendTimePlan	送货时间
//				DateTime	预计送货时间 天数
//				oilnLat	纬度
//				oilnLng	经度
//				oilnCreateTime	位置更新时间
				var shef=this;
				$.ajax({    
//				   url:link_All.link_Ali+'globalstone/app/private/order/queryOrderImportList.do',
				   url:link_All.link_Ali+'globalstone/app/private/order/queryOrderImportTruckDetail.do',
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
				   	if(json.result.ImportTruck !=null&&json.result.ImportTruck !=undefined&&json.result.ImportTruck !=""){
					   	shef.name=shef.Arr.ImportTruck.oiruName//司机名
					   	shef.oiruCarNo=shef.Arr.ImportTruck.oiruCarNo//车牌号码
					   	shef.oiruPhone=shef.Arr.ImportTruck.oiruPhone//联系电话
					   	shef.oiruSendTimePlan=shef.Arr.ImportTruck.oiruSendTimePlan//送货时间
					   	shef.oiruArriTime=shef.Arr.ImportTruck.oiruArriTime//到达时间
					   	shef.DateTime=shef.Arr.DateTime//预计送货时间
					   	shef.ImportTruck_show =1
				   	}
				   	shef.adress=shef.Arr.adress//车辆位置
				   	
				   	
				   	
				   	
				   	//状态
				   	if(shef.Arr.OrderStatus >= 7){
				   		shef.OrderStatus = "已拖运"
				   	}else if(shef.Arr.OrderStatus <7){
				   		shef.OrderStatus = "待拖运"
				   	}
//				   	
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
			out:function(){
				window.history.go(-1);
			},
		}//methods函数结尾
	});
	
	$('#out').on('tap',function(){
		window.history.go(-1);
	})
}
