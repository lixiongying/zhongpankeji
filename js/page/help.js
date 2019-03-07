$(function(){
	var vm=new Vue({
		el:'#help',
		data:{
			helpList:{},
			url:link_All.link_Ali+'globalstone/common/file/download.do?storeFileName=',
		},
		mounted(){
			
		},
	//初始函数
		created:function(){
			this.init();
		},
		methods:{
			init:function(){
				var shef=this;
				$.ajax({
					type:"get",
					url:link_All.link_Ali+"globalstone/app/public/system/queryProjectFaq.do",
					async:true,
//					data:{museId:1,musePwd:123456,museOnlineTag:1555,mstoId:18,page:2,pageSize:2},    
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp",    
	   				timeout:3000,
	   				  dataFilter:function(json){  	   				  	 
	       				return json;    
	   				},    
					 success:function(json,textStatus){    
						shef.helpList=json.result;
	       			console.log(shef.helpList);//店铺轮播图
	   },     
	   error:function(XMLHttpRequest,textStatus,errorThrown){  
	   	  alert('错误');
	       console.log("jsonp.error:"+textStatus);    
	   }    
	});  
			},//init函数结尾
			out:function(){
				window.history.go(-1);
			},
			
			
		}//methods函数结尾
		
		
	});
})