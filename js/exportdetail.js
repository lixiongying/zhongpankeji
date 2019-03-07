window.onload = function() { 
	var oimpId = localStorage.getItem("oimpId"); 
	var museId= localStorage.getItem("museId"); 
	var musePwd= localStorage.getItem("musePwd"); 
	var museOnlineTag= localStorage.getItem("museOnlineTag"); 
	var GoodsType = localStorage.getItem("GoodsType"); 
	console.log(oimpId)
	var url=link_All.link_Ali+'globalstone/common/file/downloadOrig.do?storeFileName=';
	var vn=new Vue({
		el:'#myadd',
		data:{
			Arr:[],
			oexpNo:'',
			oimaGoodsType:'',
			PortType:'',
			address:'',
			oimaName:'',
			oimaGoodsWeight:'',
			oimaBeginPort:'',
			oimaEndPort:'',
			oimaGoodsInfo:'',
			oexpStatus:'',
			leaveTime:'',
			oiimBill:'',
			oiimUrl:'',
			oipaCreditImage:'',
			oiboName:'',
			oiboDueTime:'',
			oiboNum:'',
			oiboForwardFore:'',
			oiboPrice:'',
			oipaCreditImage_show:0,
			oiimBill_show:0,
			oiimUrl_show:0,
			Im_show:0,
			leaveTime_show:0,
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
//				   url:link_All.link_Ali+'globalstone/app/private/order/doqueryOrderImportDetail.do',
				   url:link_All.link_Ali+'globalstone/app/private/order/queryOrderImportDetail.do',
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
				   		shef.Arr=json.result;
				   	  	console.log(json.result); 
			   	  		shef.oexpNo=shef.Arr.order.oimpNo//订单号
			   	  		if(shef.Arr.order.oimpPayStatus == 1){
			   	  			shef.oexpStatus = "未支付"
			   	  		}else if(shef.Arr.order.oimpPayStatus == 2){
			   	  			shef.oexpStatus = "支付定金"
			   	  		}else if(shef.Arr.order.oimpPayStatus == 3){
			   	  			shef.oexpStatus = "全额支付"
			   	  		}
				   	  	shef.PortType = shef.Arr.PortType//进出口类型
				   	  	shef.address=shef.Arr.orderImportLnglatList[shef.Arr.orderImportLnglatList.length*1-1][2]//地址
				   	  	shef.oimaGoodsType=shef.Arr.ImportMain.oimaGoodsType//货物名
				   	  	shef.oimaName=shef.Arr.ImportMain.oimaName//客户名
				   	  	shef.oimaGoodsWeight=shef.Arr.ImportMain.oimaGoodsWeight//货物重量
				   	  	shef.oimaBeginPort=shef.Arr.ImportMain.oimaBeginPort//起运港
				   	  	shef.oimaEndPort=shef.Arr.ImportMain.oimaEndPort//目的港
				   	  	shef.oimaGoodsInfo=shef.Arr.ImportMain.oimaGoodsInfo//参考价值
				   	  	if(shef.Arr.oilnCreateTime!=undefined&&shef.Arr.oilnCreateTime!=null&&shef.Arr.oilnCreateTime!=""){
				   	  		shef.leaveTime=shef.Arr.oilnCreateTime//计划开出日期
				   	  		shef.leaveTime_show = 1 
				   	  	}else{
				   	  		shef.leaveTime_show = 0 
				   	  	}
						if(shef.Arr.ImportPayment.oipaCreditImage != null){
							shef.oipaCreditImage=url+shef.Arr.ImportPayment.oipaCreditImage//信用证副本
							shef.oipaCreditImage_show=1;
						}
						shef.oiboDueTime=shef.Arr.ImportBookboard.oiboDueTime//截关时间
						shef.oiboName=shef.Arr.ImportBookboard.oiboName//航运公司名称
						shef.oiboNum=shef.Arr.ImportBookboard.oiboNum//柜量
				   	  	shef.oiboForwardFore=shef.Arr.ImportBookboard.oiboForwardFore//货代公司
				   	  	shef.oiboPrice=shef.Arr.ImportBookboard.oiboPrice//海运价
			   	  		//码单附件
			   	  		if(shef.Arr.ImportImage.oiimBill!=null){
			   	  			shef.oiimBill=url+shef.Arr.ImportImage.oiimBill
			   	  			shef.oiimBill_show=1;
			   	  		}
			   	  		//PI附件
			   	  		if(shef.Arr.ImportImage.oiimBill!=null){
			   	  			shef.oiimUrl=url+shef.Arr.ImportImage.oiimUrl
			   	  			shef.oiimUrl_show=1;
			   	  		}
				   	  		
				   	  		
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			inits_one:function(){
				var shef=this;
				$.ajax({    
//				   url:link_All.link_Ali+'globalstone/app/private/order/doqueryOrderImportDetail.do',
				   url:link_All.link_Ali+'globalstone/app/private/order/queryOrderExportDetail.do',
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
				   		shef.Arr=json.result;
				   	  	console.log(json.result); 
				   	  	if(shef.Arr!= null){
				   	  		shef.oexpNo=shef.Arr.oexpNo//订单号
				   	  		if(shef.Arr.oexpStatus == 5){
				   	  			shef.oexpStatus = "已支付"
				   	  		}else if(shef.Arr.oexpStatus < 5){
				   	  			shef.oexpStatus = "未支付"
				   	  		}
				   	  	}
				   	  	shef.PortType = shef.Arr.PortType//进出口类型
				   	  	shef.address=shef.Arr.address//地址
				   	  	if(shef.Arr != null){
					   	  	shef.oimaGoodsType=shef.Arr.oexpName//货物名
//					   	  	shef.oimaName=shef.Arr.ImportMain.oimaName//客户名
//					   	  	shef.oimaGoodsWeight=shef.Arr.ImportMain.oimaGoodsWeight//货物重量
//					   	  	shef.oimaBeginPort=shef.Arr.ImportMain.oimaBeginPort//起运港
//					   	  	shef.oimaEndPort=shef.Arr.ImportMain.oimaEndPort//目的港
//					   	  	shef.oimaGoodsInfo=shef.Arr.ImportMain.oimaGoodsInfo//参考价值
				   	  	}
				   	  	
				   	  	if(shef.Arr != null){
							shef.leaveTime=shef.Arr.leaveTime//计划开出日期
							console.log(shef.leaveTime)
//							shef.oipaCreditImage=url+shef.Arr.ImportPayment.oipaCreditImage//信用证副本
				   	  	}
				   	  	if(shef.Arr != null){
							shef.oiboDueTime=shef.Arr.passCloseTime//截关时间
							shef.oiboName=shef.Arr.companyName//航运公司名称
							shef.oiboNum=shef.Arr.containerNum//柜量
//					   	  	shef.oiboForwardFore=shef.Arr.ImportBookboard.oiboForwardFore//货代公司
//					   	  	shef.oiboPrice=shef.Arr.ImportBookboard.oiboPrice//海运价
				   	  	}
				   	  	if(shef.Arr != null){
//				   	  		shef.oiimBill=url+shef.Arr.ImportImage.oiimBill//码单附件
//				   	  		shef.oiimUrl=url+shef.Arr.ImportImage.oiimUrl//PI附件
				   	  	}
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			out:function(){
				window.history.go(-1);
			},
			order_type:function(){
				var shef=this;
				if(GoodsType == 2){
					shef.init_one();
					shef.Im_show =1;
				}else if(GoodsType == 1){
					shef.inits_one();
				}
				
			},
		}//methods函数结尾
	});
	$('#out').on('tap',function(){
		window.history.go(-1);
	})
}
