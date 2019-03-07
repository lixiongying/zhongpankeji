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
			portName:'',
			oiarArriveTime:'',
			oiarLeaveTime:'',
			oiarFreeBeginTime:'',
			passStatus:'',
		},
		mounted(){
		},
		//初始函数
		created:function(){
			this.order_type();
		},
		methods:{
			init_one:function(){
//				oiarArriveTime	抵达时间
//				oiarFreeBeginTime	面仓柜期起始时间
//				oiarId	Id
//				oiarLeaveTime	放行时间
//				oiarOrderId	订单id
//				portName	码头名称
//				passStatus	通关状态
//				oiarUserName	经/收 人
//				oiarStorageDuration	仓期(Integer 单位天)
//				oiarDrawerDuration	柜期(Integer 单位天)
				var shef=this;
				$.ajax({    
//				   url:link_All.link_Ali+'globalstone/app/private/order/queryOrderImportList.do',
				   url:link_All.link_Ali+'globalstone/app/private/order/queryOrderImportArriveDetail.do',
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
				   	shef.portName=shef.Arr.portName;
				   	shef.oiarArriveTime=shef.Arr.ImportArrive.oiarArriveTime;
				   	shef.oiarLeaveTime=shef.Arr.ImportArrive.oiarLeaveTime;
				   	shef.oiarFreeBeginTime=shef.Arr.ImportArrive.oiarFreeBeginTime;
				   	if(shef.Arr.passStatus == 6){
				   		shef.passStatus = "已通关";
				   	}else if(shef.Arr.passStatus == 5){
				   		shef.passStatus = "待通关";
				   	}
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			init_two:function(){
//				oiarArriveTime	抵达时间
//				oiarFreeBeginTime	面仓柜期起始时间
//				oiarId	Id
//				oiarLeaveTime	放行时间
//				oiarOrderId	订单id
//				portName	码头名称
//				passStatus	通关状态
//				oiarUserName	经/收 人
//				oiarStorageDuration	仓期(Integer 单位天)
//				oiarDrawerDuration	柜期(Integer 单位天)
				var shef=this;
				$.ajax({    
//				   url:link_All.link_Ali+'globalstone/app/private/order/queryOrderImportList.do',
				   url:link_All.link_Ali+'globalstone/app/private/order/queryOrderImportArriveDetail.do',
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
				   	shef.portName=shef.Arr.portName;
				   	shef.oiarArriveTime=shef.Arr.ImportArrive.oiarArriveTime;
				   	shef.oiarLeaveTime=shef.Arr.ImportArrive.oiarLeaveTime;
				   	shef.oiarFreeBeginTime=shef.Arr.ImportArrive.oiarFreeBeginTime;
				   	if(shef.Arr.passStatus == 6){
				   		shef.passStatus = "已通关";
				   	}else if(shef.Arr.passStatus == 5){
				   		shef.passStatus = "待通关";
				   	}
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
