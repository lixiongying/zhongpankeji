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
			oitrPortName:'',
			oitrTranTimePlan:'',
			oitrTranArriTimePlan:'',
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
//				   url:link_All.link_Ali+'globalstone/app/private/order/queryOrderImportList.do',
				   url:link_All.link_Ali+'globalstone/app/private/order/queryOrderImportTransferDetail.do',
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
				   	shef.oitrPortName=shef.Arr.ImportTransfer.oitrPortName;
				   	shef.oitrTranTimePlan=shef.Arr.ImportTransfer.oitrTranTimePlan;
				   	shef.oitrTranArriTimePlan=shef.Arr.ImportTransfer.oitrTranArriTimePlan;
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
		}//methods函数结尾
	});
	$('#out').on('tap',function(){
		window.history.go(-1);
	})
}
