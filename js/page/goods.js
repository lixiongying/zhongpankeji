$(function(){
	var mstoId = localStorage.getItem("mstoId"); 
	console.log(mstoId)
	var vm=new Vue({
		el:'#goods',
		data:{
			qingList:{},
			show_bg:0,
			out_id:'',
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
					type:"post",
					url:link_All.link_Ali+"globalstone/app/public/mallStore/mallGoodsType.do",
					async:true,
					data:{mstoId:mstoId},    
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp",    
	   				
	   				  dataFilter:function(json){  	   				  	 
	       				return json;    
	   				},    
					success:function(json,textStatus){    
						shef.qingList=json;
						shef.mgooId=json.mgooId;
	       				console.log(shef.qingList);
				    },     
				    error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误');
				       console.log("jsonp.error:"+textStatus);    
				    }    
				});  
			},//init函数结尾
			//发布
			release:function(){
				console.log(1)
				localStorage.setItem("type_goos",-1);
				window.location.href="publish.html"
			},
			//编辑
			edit:function(id){
				localStorage.setItem("type_goos",id);
				window.location.href="publish.html"
			},
			init_one:function(id){
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
						shef.qingList=json;
						shef.init();
				    },     
				    error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误');
				       console.log("jsonp.error:"+textStatus);    
				    }    
				});  
			},//init函数结尾
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

		}//methods函数结尾
	});
})