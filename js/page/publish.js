$(function(){
	var Id=localStorage.getItem("museId");
	var museOnlineTag = localStorage.getItem("museOnlineTag")
	var museId = localStorage.getItem("museId")
	var musePwd = localStorage.getItem("musePwd")
	var vm=new Vue({
		el:'#myadd',
		data:{
			show_fen:0,
			mgooId:[],
			mgooImage:[],
			mgooName:[],
			Id:'',
			name:'',
			mgooMaximumPrice:2.24,
			mgooMinimumPrice:2.24,
			mgooMaxThickness:224,
			mgooClearExplain:'',
			numId:'',
			err:0,
		},
		mounted(){
			
		},
	//初始函数
		created:function(){
			this.type_goos();
		},
		methods:{
			fen:function(){
				var shef=this;
				shef.show_fen = shef.show_fen ? 0 :1;
			},
			//获取商家石材
			init_one:function(id){
				var shef=this;
				console.log(Id)
				$.ajax({
					type:"post",
					url:link_All.link_Ali+"globalstone/app/public/mallStore/mallGoodsDetails.do",
					async:false,
					data:{mstoId:id},    
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp1",    
	   				dataFilter:function(json){  	   				  	 
	       				return json;    
	   				},    
					success:function(json,textStatus){
						console.log(json)
						shef.mgooId=json.mgooId
						shef.mgooImage=json.mgooImage
						shef.mgooName=json.mgooName
				    },     
				    error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	    alert('错误');
				        console.log("jsonp.error:"+textStatus);    
				    }    
				});  
			},//init函数结尾
			//发布
			init_two:function(){
				var shef=this;
				if(shef.Id != undefined&&shef.Id!=null&&shef.Id!=''){
					$.ajax({
						type:"post",
						url:link_All.link_Ali+"globalstone/app/public/mallStore/mallGoodsRelease.do",
						async:false,
						data:{
							mgooId:shef.Id,
							mgooMaximumPrice:shef.mgooMaximumPrice,
							mgooMinimumPrice:shef.mgooMinimumPrice,
							mgooMaxThickness:shef.mgooMaxThickness,
							mgooClearExplain:shef.mgooClearExplain,
						},
		   				dataType:"jsonp",    
		   				jsonp:"callback",    
		   				jsonpCallback:"success_jsonp2",    
		   				
		   				  dataFilter:function(json){  	   				  	 
		       				return json;    
		   				},    
						success:function(json,textStatus){    
							console.log(json)
							console.log(shef.Id)
	//						console.log(shef.mgooMaximumPrice)
	//						console.log(shef.mgooMinimumPrice)
	//						console.log(shef.mgooMaxThickness)
	//						console.log(shef.mgooClearExplain)
	//						console.log(shef.Id)
							localStorage.setItem("type_goos",-1);
							console.log(localStorage.getItem("type_goos"))
							window.location.href="goods.html"
					    },     
					    error:function(XMLHttpRequest,textStatus,errorThrown){  
					   	  alert('错误');
					       console.log("jsonp.error:"+textStatus);    
					    }    
					
					}); 
				}else{
					$('.bg_tis p').text('请添加石材！')
				   		shef.err = 1; 
					   	setTimeout(function(){
					   		shef.err = 0; 
					   	},2000)
				}
			},//init函数结尾
			//点击选择石材
			cha:function(id,index){
				var shef=this;
				shef.Id = id
				shef.name = shef.mgooName[index]
				console.log(id)
				shef.show_fen=0;
			},
			//弹出下拉框
			bg:function(id,index){
				var shef=this;
				shef.show_fen=0;
			},
			//编辑已有石材清货信息
			init_three:function(){
				var shef=this;
				$.ajax({
					type:"post",
					url:link_All.link_Ali+"globalstone/app/public/mallStore/mallGoodsCompile.do",
					async:false,
					data:{
						mgooId:shef.numId
					},
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				jsonpCallback:"success_jsonp3",    
	   				
	   				  dataFilter:function(json){  	   				  	 
	       				return json;    
	   				},    
					success:function(json,textStatus){
						shef.name=json.mgooName
						shef.mgooMaximumPrice=json.mgooMaximumPrice
						shef.mgooMinimumPrice=json.mgooMinimumPrice
						shef.mgooMaxThickness=json.mgooMaxThickness
						shef.mgooClearExplain=json.mgooClearExplain
				    },     
				    error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  alert('错误');
				       console.log("jsonp.error:"+textStatus);    
				    }    
				});  
			},//init函数结尾
			//判断是否为编辑或为新建石材清货
			type_goos:function(){
				var shef=this;
				if(localStorage.getItem("type_goos")==-1){
					$.ajax({
						type:"post",
						url:link_All.link_Ali+"globalstone/app/private/mallStore/queryMallStoreByUserId.do",
						async:true,
						data:{museId:museId,musePwd:musePwd,museOnlineTag:museOnlineTag},    
		   				dataType:"jsonp",    
		   				jsonp:"callback",    
		   				jsonpCallback:"success_jsonp",    
	//	   				timeout:3000,
		   				dataFilter:function(json){  	   				  	 
		       				return json;    
		   				},    
						success:function(json,textStatus){    
						 	console.log(json)
							shef.init_one(json.id);
							localStorage.setItem("mstoId",json.id);
							console.log(localStorage.getItem("mstoId"))
					    },     
					    error:function(XMLHttpRequest,textStatus,errorThrown){  
					   	   alert('错误');
					       console.log("jsonp.error:"+textStatus);    
					    }    
					});  
				}else{
					shef.numId=localStorage.getItem("type_goos");
					shef.Id=localStorage.getItem("type_goos");
					shef.init_three();
				}
			},
			out:function(){
				window.history.go(-1);
			},
		}//methods函数结尾
	});
})