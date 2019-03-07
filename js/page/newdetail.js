$(function(){
	var Aid = localStorage.getItem("Aid"); 
	var vm=new Vue({
		el:'#newdetail',
		data:{
			newList:{},
			url:link_All.link_Ali+'globalstone/common/file/download.do?storeFileName=',
			ATitle:{},
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
					url:link_All.link_Ali+"globalstone/app/private/mall/queryArticleDetailByIdApp.do",
					async:false,
					type:"Post",
					data:{museId:15,musePwd:123456,museOnlineTag:1555,AId:Aid},    
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp",    
	   				timeout:3000,
	   				dataFilter:function(json){  	   				  	 
	       				return json; 
	   				},    
					 success:function(json,textStatus){  
//					 	alert('ddas');
					shef.newList=json.result.article;
	       			console.log(shef.newList);//店铺轮播图
	   },     
	   error:function(XMLHttpRequest,textStatus,errorThrown){  
	   	  	alert('错误');
	       console.log("jsonp.error:"+ XMLHttpRequest);    
	   }    
	});  
			},//init函数结尾
		out:function(){
			window.history.go(-1);
		},
			
			
		}//methods函数结尾
		
		
	});
})