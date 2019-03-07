$(function(){
	var Id = localStorage.getItem("museId"); 
	var Pwd = localStorage.getItem("musePwd"); 
	var Tag = localStorage.getItem("museOnlineTag"); 
	console.log(Id)
	var vm=new Vue({
		el:'#myadd',
		data:{
			url:link_All.link_Ali+'globalstone/common/file/download.do?storeFileName=',
			order:[],
			order_ing:[],
			order_ok:[],
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
					url:link_All.link_Ali+"globalstone/app/private/order/queryOrderImportList.do",
					async:true,
					data:{
						museId:Id,
						musePwd:Pwd,
						museOnlineTag:Tag,
					},
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp",    
	   				timeout:3000,
	   				  dataFilter:function(json){  	   				  	 
	       				return json;    
	   				},    
					success:function(json,textStatus){
						console.log(json)
						console.log(Id)
						console.log(Pwd)
						console.log(Tag)
	       				shef.order = json.result.list
	       				for(var i=0;i<json.result.list.length;i++){
	       					if(json.result.list[i].orderStatus == 8){
	       						shef.order_ok.push(json.result.list[i])
		       				}else{
		       					shef.order_ing.push(json.result.list[i])
		       				}
	       				}
				    },     
				    error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误');
				       console.log("jsonp.error:"+textStatus);    
				    }    
				});  
			},//init函数结尾
			out:function(){
				window.history.go(-1);
			},
			order_l:function(id){
				localStorage.setItem("oimpId",id);
				localStorage.setItem("GoodsType",2);
				window.location.href="exportdetail.html"
			},
			order_r:function(id){
				localStorage.setItem("oimpId",id);
				localStorage.setItem("GoodsType",2);
				window.location.href="supply.html"
			},
		}//methods函数结尾
	});
})