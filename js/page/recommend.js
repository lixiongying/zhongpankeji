$(function(){
	var vm=new Vue({
		el:'#recommend',
		data:{
			proList:{},
			url:'http://120.79.70.221:9281/globalstone/common/file/download.do?storeFileName=',
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
					type:"post",
					url:link_All.link_Ali+"globalstone/app/public/mallStore/queryMallStoreRECList.do",
					async:true,
//					data:{page:1,pageSize:2},    
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp",    
	   				timeout:3000,
	   				  dataFilter:function(json){  	   				  	 
	       				return json;    
	   				},    
					 success:function(json,textStatus){    
						shef.proList=json.result;
	       			console.log(shef.proList);
	   },     
	   error:function(XMLHttpRequest,textStatus,errorThrown){  
	   	  alert('错误');
	       console.log("jsonp.error:"+textStatus);    
	   }    
	});  
			},//init函数结尾
				go:function(id){
				console.log(id)
				localStorage.setItem("mstoId",id);				
				window.location.href="business.html"
			},
			out:function(){
				window.history.go(-1);
			},
		}//methods函数结尾
		
		
	});
})