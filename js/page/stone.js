$(function(){
	
	var vm=new Vue({
		el:'#myadd',
		data:{
			url:link_All.link_Ali+'globalstone/common/file/download.do?storeFileName=',
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
					type:"post",
					url:link_All.link_Ali+"globalstone/app/public/mall/queryStoreForeignType.do",
					async:true,
					data:{
					},
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp1",    
	   				timeout:3000,
	   				  dataFilter:function(json){  	   				  	 
	       				return json;    
	   				},    
					success:function(json,textStatus){
//						console.log(json)
						for(var i=0 ;i<json.result.length;i++){
							shef.init_two(json.result[i].mstyId)
						}
						
				    },     
				    error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误');
				       console.log("jsonp.error:"+textStatus);    
				    }    
				});  
			},//init函数结尾
			init_two:function(type){
//				console.log(type)
				var shef=this;
				$.ajax({
					type:"post",
					url:link_All.link_Ali+"globalstone/app/public/mall/queryStoreForeign.do",
					async:true,
					data:{
						msfoTypeId:type,
					},
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
//	   				jsonpCallback:"success_jsonp",    
	   				timeout:3000,
	   				  dataFilter:function(json){  	   				  	 
	       				return json;    
	   				},    
					success:function(json,textStatus){
						console.log(json.result.rows)
						$('#item'+type+'mobile .ul01').empty()
						for(var i=0;i<json.result.rows.length;i++){
							$('#item'+type+'mobile .ul01').append('<li class="mui-table-view-cell li-01" onclick="go('+json.result.rows[i].msfoId+')"><a><img src="'+ shef.url+json.result.rows[i].mstoImage +'"/><p>'+json.result.rows[i].msfoName+'</p><p>'+json.result.rows[i].msfoDescription+'</p></a></li>')
						}
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