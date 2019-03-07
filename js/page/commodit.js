$(function(){
	var Id=localStorage.getItem("museId");
	var vm=new Vue({
		el:'#commodit',
		data:{
			qingList:{},
			url:link_All.link_Ali+'globalstone/common/file/download.do?storeFileName=',
			mgooId:''
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
					url:link_All.link_Ali+"globalstone/app/public/mallStore/mallGoodsType.do",
					async:true,
					data:{mstoId:Id},    
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp",    
	   				timeout:3000,
	   				  dataFilter:function(json){  	   				  	 
	       				return json;    
	   				},    
					 success:function(json,textStatus){    
						shef.qingList=json;
						shef.mgooId =  shef.qingList.mgooId 
	       			console.log(shef.qingList);//店铺轮播图
	   },     
	   error:function(XMLHttpRequest,textStatus,errorThrown){  
	   	  alert('错误');
	       console.log("jsonp.error:"+textStatus);    
	   }    
	});  
			},//init函数结尾
			
		go:function(){
	//		console.log(id)
			localStorage.setItem("mstoId",Id);				
			window.location.href="business.html"
		},
		out:function(){
				window.history.go(-1);
			},
			
		}//methods函数结尾
		
		
	});
})