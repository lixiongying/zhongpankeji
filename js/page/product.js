$(function(){
	var museOnlineTag = localStorage.getItem("museOnlineTag")
	var museId = localStorage.getItem("museId")
	var musePwd = localStorage.getItem("musePwd")
	var vm=new Vue({
		el:'#product',
		data:{
			proList:{},
			url:link_All.link_Ali+'globalstone/common/file/download.do?storeFileName=',
			mstoId:'',
			show_bg:0,
		},
		mounted(){
			
		},
	//初始函数
		created:function(){
			this.init_one();
		},
		methods:{
			init_two:function(){
				var shef=this;
				$.ajax({
					type:"post",
					url:link_All.link_Ali+"globalstone/app/private/mallGoods/queryMallGoodsList.do",
					async:true,
					data:{museId:museId,musePwd:musePwd,museOnlineTag:museOnlineTag,mstoId:shef.mstoId},    
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp1",    
	   				
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

			init_one:function(){
				var shef=this;
				$.ajax({
					type:"post",
					url:link_All.link_Ali+"globalstone/app/private/mallStore/queryMallStoreByUserId.do",
					async:true,
					data:{museId:museId,musePwd:musePwd,museOnlineTag:museOnlineTag},    
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp",    
//	   				
	   				dataFilter:function(json){  	   				  	 
	       				return json;    
	   				},    
					success:function(json,textStatus){    
					 	console.log(json)
						shef.mstoId = json.id
						shef.init_two();
				    },     
				    error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	   alert('错误');
				       console.log("jsonp.error:"+textStatus);    
				    }    
				});  
			},//init函数结尾
			publish:function(id){
				console.log(id)
				localStorage.setItem("type_goos",id);
				window.location.href="publish.html"
			},
			out_show:function(id){
				var shef =this;
				console.log(id)
				shef.out_id= id
				shef.show_bg=1
			},
			show_none:function(){
				var shef =this;
				shef.show_bg=0;
			},
			init_three:function(id){
				var shef=this;
				$.ajax({
					type:"post",
					url:link_All.link_Ali+"globalstone/app/public/mallStore/mallGoodsUpdate.do",
					async:true,
					data:{mgooId:id},    
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp",    
	   				
	   				  dataFilter:function(json){  	   				  	 
	       				return json;    
	   				},    
					success:function(json,textStatus){   
						console.log(json)
						window.location.href="product.html"
						
				    },     
				    error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误');
				       console.log("jsonp.error:"+textStatus);    
				    }    
				});  
			},//init函数结尾
		}//methods函数结尾
		
		
	});
})