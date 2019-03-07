window.onload = function (){
	var museId = localStorage.getItem("museId"); 
//	var museId = 1
	var musePwd = localStorage.getItem("musePwd"); 
//	var musePwd = 123456
	var museOnlineTag = localStorage.getItem("museOnlineTag"); 
//	var museOnlineTag = 1555
//	var goodName = localStorage.getItem("goodName"); 
	var vn=new Vue({
		el:'#myadd',
		data:{
			tetter:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
			url:link_All.link_Ali+'globalstone/common/file/download.do?storeFileName=',
			tetter_All:[
					[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
			],
			Arr:[],
			err:0,
			goodName:'',
		},
		mounted(){
		},
		//初始函数
		created:function(){
//			this.init_one();
		},
		methods:{
			init_one:function(){
				var shef=this;
				shef.Arr=[]
		   		for(var k=0;k<shef.tetter_All.length;k++){
	   				shef.tetter_All[k] = []
		   		}
		   		console.log(shef.tetter_All)
				$.ajax({    
				   url:link_All.link_Ali+'globalstone/app/private/mallGoods/queryMallGoodsByName.do',
				   type :'post',
				   data:{
				   		museId:museId,
				   		musePwd:musePwd,
				   		museOnlineTag:museOnlineTag,
				   		goodName:shef.goodName,
				   },
				   dataType:"jsonp",
				   jsonp:"callback",    
				   jsonpCallback:"success_jsonp", 
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
				   	console.log(json.result)
				   	if(json.result !=null&&json.result !=undefined&&json.result !=""){
				   		shef.Arr = json.result 
					   	for(var i=0;i<shef.Arr.length;i++){
					   		for(var k=0;k<shef.tetter_All.length;k++){
					   			if(json.result[i].goodNameFirstLetter == shef.tetter[k]){
					   				shef.tetter_All[k].push(json.result[i])
					   			}
					   		}
					   	}
					   	$('.bg_tis p').text('搜索到'+json.result.length+'条信息')
					   	$('.header_bottom').css('display','none')
						shef.err = 1; 
					   	  setTimeout(function(){
					   	  	shef.err = 0; 
					   	  },2000)
				   	}else{
				   		$('.bg_tis p').text('暂无该石材！')
						shef.err = 1; 
					   	  setTimeout(function(){
					   	  	shef.err = 0; 
					   	  },2000)
				   	}
				   	console.log(shef.tetter_All[7])
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			go_goods:function(id){
				localStorage.setItem("mcgoGoodsId",id);	
				mui.openWindow({
					url:'prodetail.html',
					id:'prodetail.html'
				})
//				window.location.href="prodetail.html"
			},
			out:function(){
				mui.bakc()
//				window.history.go(-1);
			},
		}//methods函数结尾
	});
	
//	$('#out').on('tap',function(){
//		window.history.go(-1);
//	})
}
