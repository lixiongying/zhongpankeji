window.onload = function (){
	var oimpId = 13;
	var vn=new Vue({
		el:'#myadd',
		data:{
			url:link_All.link_Ali+'globalstone/common/file/download.do?storeFileName=',
			Arr:[],
			oistAgencyTime:'',
			oistCreateTime:'',
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
				   url:link_All.link_Ali+'globalstone/app/private/order/queryOrderImportSettleDetail.do',
				   type :'post',
				   data:{
				   		museId:1,
				   		musePwd:123456,
				   		museOnlineTag:1555,
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
				   	shef.oistAgencyTime=shef.Arr.ImportSettle.oistAgencyTime;
				   	shef.oistCreateTime=shef.Arr.ImportSettle.oistCreateTime;
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
