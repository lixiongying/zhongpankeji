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
	var url=link_All.link_Ali+'globalstone/common/file/download.do?storeFileName=';
	var vn=new Vue({
		el:'#myadd',
		data:{
			oimaPiNo:'',
		},
		mounted(){
		},
		//初始函数
		created:function(){
			this.order_type();
		},
		methods:{
			order_type:function(){
				var shef=this;
				if(GoodsType == 2){
//					console.log(2)
					shef.init_six();
				}else if(GoodsType == 1){
//					console.log(1)
					shef.inits_six();
				}
			},
			//进口方法开始
//			init_six:function(){
//				var shef=this;
//				$.ajax({
//				   url:'http://120.79.70.221:9281/globalstone/app/private/order/queryOrderImportTruckDetail.do',
//				   type :'post',
//				   data:{
//				   		museId:museId,
//				   		musePwd:musePwd,
//				   		museOnlineTag:museOnlineTag,
//				   		oimpId:oimpId,
//				   },
//				   dataType:"jsonp",
//				   jsonp:"callback",    
//				   jsonpCallback:"success_jsonp", 
//				   dataFilter:function(json){ 
//				       return json;    
//				   },    
//				   success:function(json,textStatus){
//				   	var OrderStatus;
//				   	if(json.result.OrderStatus == 3){
//				   		OrderStatus = "已交货"
//				   	}else if(json.result.OrderStatus == 2){
//				   		OrderStatus = "待交货"
//				   	}
//				   	var addr= json.result.adress;
//					$('.main_link').prepend('<div><em><span></span></em><div><p>['+json.result.adress+']'+OrderStatus+'</p><p>司机名称：'+json.result.ImportTruck.oiruName+',车牌号码：'+json.result.ImportTruck.oiruCarNo+',联系电话：'+json.result.ImportTruck.oiruPhone+'</p><p><span>'+json.result.ImportTruck.oiruSendTimePlan+'</span></p></div><i></i></div>')
//				   	list();
//				   	shef.init_seven(addr);
//				   },    
//				   error:function(XMLHttpRequest,textStatus,errorThrown){  
//				   	  console.log('错误'); 
//				   }    
//				});  
//			},//init函数结尾
			init_six:function(){
				var shef=this;
				$.ajax({
//				   url:'http://120.79.70.221:9281/globalstone/app/private/order/queryOrderImportTruckDetail.do',
				   url:link_All.link_Ali+'globalstone/app/private/order/queryOrderImportStatusDetail.do',
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
//				   	console.log(json)
//				   	console.log(museId)
//				   	console.log(musePwd)
//				   	console.log(museOnlineTag)
//				   	console.log(oimpId)
//				   	var addr= json.result.adress;
					shef.oimaPiNo = json.result.oimpSysNo
					var Status= 0;
					for(var i = 0;i<json.result.OrderImportStatusList.length;i++){
						var passStatus
						if(json.result.OrderImportStatusList[i].oistDesc == '待上船' && json.result.OrderImportStatusList[json.result.OrderImportStatusList.length-1].oistStatus>3){
							passStatus = '已上船'
						}else if(json.result.OrderImportStatusList[i].oistDesc == '海运中' && json.result.OrderImportStatusList[json.result.OrderImportStatusList.length-1].oistStatus>4){
							passStatus = '已海运'
						}else if(json.result.OrderImportStatusList[i].oistDesc == '待托运' && json.result.OrderImportStatusList[json.result.OrderImportStatusList.length-1].oistStatus>6){
							passStatus = '已托运'
						}else if(json.result.OrderImportStatusList[i].oistDesc == '待收货' && json.result.OrderImportStatusList[json.result.OrderImportStatusList.length-1].oistStatus>7){
							passStatus = '已收货'
						}else{
//							console.log(json.result.OrderImportStatusList[json.result.OrderImportStatusList.length-1].oistStatus)
							passStatus = json.result.OrderImportStatusList[i].oistDesc
						}
					   	var oistCreateTime = json.result.OrderImportStatusList[i].oistCreateTime
					   	if(Status != json.result.OrderImportStatusList[i].oistStatus){
					   		Status = json.result.OrderImportStatusList[i].oistStatus
					   		if(Status == 8){
								$('.main_link').prepend('<div><em><span><a>收</a></span></em><div><p>['+json.result.ImportLnglat[i*1+1][2]+']'+passStatus+'</p><p>状态：'+passStatus+',抵达时间：'+oistCreateTime+'</p><p><span>'+oistCreateTime+'</span></p></div><i></i></div>')
					   		}else{
								$('.main_link').prepend('<div><em><span></span></em><div><p>['+json.result.ImportLnglat[i*1+1][2]+']'+passStatus+'</p><p>状态：'+passStatus+',抵达时间：'+oistCreateTime+'</p><p><span>'+oistCreateTime+'</span></p></div><i></i></div>')	
					   		}
					   }
					}
				   	list();
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			//进口方法结束
//========================================================================================================================================================================================================================================================
			//出口方法
			//出口进行中通关中供应链详情
			inits_six:function(){
				var shef=this;
				$.ajax({
//				   url:'http://120.79.70.221:9281/globalstone/app/private/order/queryOrderImportTruckDetail.do',
				   url:link_All.link_Ali+'globalstone/app/private/order/queryOrderExportStatusDetail.do',
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
//				   	console.log(json)
//				   	var addr= json.result.adress;
					shef.oimaPiNo = json.result.oexpSysNo
					var Status= 0;
					for(var i = 0;i<json.result.ExportStatusList.length;i++){
						var passStatus
						if(json.result.ExportStatusList[i].oestDesc == '待上船' && json.result.ExportStatusList[json.result.ExportStatusList.length-1].oestStatus>3){
							passStatus = '已上船'
						}else if(json.result.ExportStatusList[i].oestDesc == '拖运中' && json.result.ExportStatusList[json.result.ExportStatusList.length-1].oestStatus>2){
							passStatus = '已拖运'
						}else if(json.result.ExportStatusList[i].oestDesc == '海运中' && json.result.ExportStatusList[json.result.ExportStatusList.length-1].oestStatus!=6){
							passStatus = '已海运'
						}else{
							passStatus = json.result.ExportStatusList[i].oestDesc
						}
					   	var oestCreateTime = json.result.ExportStatusList[i].oestCreateTime
					   	var oestCreateTime = json.result.ExportStatusList[i].oestCreateTime
//					   	console.log(json.result.ExportLnglat)
					   	if(Status != json.result.ExportStatusList[i].oestStatus){
					   		Status = json.result.ExportStatusList[i].oestStatus
					   		if(Status == 5){
//								$('.main_link').prepend('<div><em><span><a>收</a></span></em><div><p>['+json.result.ExportLnglat[i][2]+']'+passStatus+'</p><p>状态：'+passStatus+',抵达时间：'+oestCreateTime+'</p><p><span>'+oestCreateTime+'</span></p></div><i></i></div>')
								if(json.result.ExportLnglat[i] == undefined ||json.result.ExportLnglat[i] == null ||json.result.ExportLnglat[i] ==''){
//					   				console.log(json.result.ExportLnglat[i])
					   				$('.main_link').prepend('<div><em><span><a>收</a></span></em><div><p>'+passStatus+'</p><p>状态：'+passStatus+',抵达时间：'+oestCreateTime+'</p><p><span>'+oestCreateTime+'</span></p></div><i></i></div>')
					   			}else{
//					   				console.log(json.result.ExportLnglat[i][2])
					   				$('.main_link').prepend('<div><em><span></span></em><div><p>['+json.result.ExportLnglat[i][2]+']'+passStatus+'</p><p>状态：'+passStatus+',抵达时间：'+oestCreateTime+'</p><p><span>'+oestCreateTime+'</span></p></div><i></i></div>')			
					   			}
					   		}else{
					   			if(json.result.ExportLnglat[i] == undefined ||json.result.ExportLnglat[i] == null ||json.result.ExportLnglat[i] ==''){
//					   				console.log(json.result.ExportLnglat[i])
					   				$('.main_link').prepend('<div><em><span></span></em><div><p>'+passStatus+'</p><p>状态：'+passStatus+',抵达时间：'+oestCreateTime+'</p><p><span>'+oestCreateTime+'</span></p></div><i></i></div>')
					   			}else{
//					   				console.log(json.result.ExportLnglat[i][2])
					   				$('.main_link').prepend('<div><em><span></span></em><div><p>['+json.result.ExportLnglat[i][2]+']'+passStatus+'</p><p>状态：'+passStatus+',抵达时间：'+oestCreateTime+'</p><p><span>'+oestCreateTime+'</span></p></div><i></i></div>')			
					   			}
					   		}
					   	}
					}
				   	list();
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			//出口方法结束
			goex:function(){
//				console.log(1)
				window.location.href="exportdetail.html";
			},
		}//methods函数结尾
	});
	
	
	$('#out').on('tap',function(){
		window.history.go(-1);
	})
	var list= function(){
		$('.main_link>div').on('tap',function(){     
			var index =$('.main_link>div').index(this);
			var text = $('.main_link>div:eq('+index+') p:eq(0)').text();
//			console.log(text)
			var num;
			
			var goods = RegExp(/拖运/);
			var goods2 = RegExp(/托运/);
			var barge = RegExp(/驳船/);
			var ocean_shipping = RegExp(/海运/);
			var port = RegExp(/结算/);
			var settlement = RegExp(/通关/);
			var completed = RegExp(/中转港/);
			var cetification = RegExp(/上船/);
			var exportdetail2 = RegExp(/生成订单/);
			var exportdetail = RegExp(/装货资料/);
			var exportdetail1 = RegExp(/提单/);
			if(text.match(goods) || text.match(goods2)){
				num=1
			}else if(text.match(barge)){
				num=2
			}else if(text.match(ocean_shipping)){
				num=3
			}else if(text.match(port)){
				num=4
			}else if(text.match(settlement)){
				num=5
			}else if(text.match(completed)){
				num=6
			}else if(text.match(cetification)){
				num=7
			}else if(text.match(exportdetail)){
				num=8
			}else if(text.match(exportdetail1)){
				num=8
			}else if(text.match(exportdetail2)){
				num=8
			}
			
			switch(num){
				case 1:
					window.location.href="good.html";
				break;
				case 2:
					window.location.href="barge.html";
				break;
				case 3:
					window.location.href="ocean_shipping.html";
				break;
				case 4:
					window.location.href="port.html";
				break;
				case 5:
				if(GoodsType == 2){
					window.location.href="settlement.html";
				}
				break;
				case 6:
					window.location.href="barge.html";
				break;
				case 7:
					window.location.href="cetification.html";
				break;
				case 8:
					window.location.href="exportdetail.html";
				break;
			}
		})
	}
}
