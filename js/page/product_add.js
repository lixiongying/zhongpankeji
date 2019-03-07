$(function(){
	var museOnlineTag = localStorage.getItem("museOnlineTag")
	var museId = localStorage.getItem("museId")
	var musePwd = localStorage.getItem("musePwd")
	var vm=new Vue({
		el:'#myadd',
		data:{
			show_fen:0,
			mgooId:[],
			name:'',
			err:0,
			Id:'',
			tetter:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
			tetter_All:[
					{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
			],
			color:'',
			color_All:['黄','橙','红','粉','灰', '白','黑','棕','绿','蓝','紫'],
			type_c_show:0,
			other:0,
		},
		mounted(){
		},
	//初始函数
		created:function(){
			this.one_for();
		},
		methods:{
			fen:function(){
				var shef=this;
				shef.show_fen = shef.show_fen ? 0 :1;
			},
			one_for:function(){
				var shef=this
				for(var i = 0 ;i<shef.tetter.length;i++){
					var text = shef.tetter[i]
					shef.init_one(i)
				}
			},
			init_one:function(i){
				var shef=this;
				var gradeSecond = shef.tetter[i]
				$.ajax({
					type:"post",
					url:link_All.link_Ali+"globalstone/app/private/mallGoods/queryMallGoodsType.do",
					async:false,
					data:{
						museId:museId,musePwd:musePwd,museOnlineTag:museOnlineTag,gradeFirst:2,gradeSecond:gradeSecond,
					},
	   				dataType:"jsonp",    
	   				jsonp:"callback",    
	   				  dataFilter:function(json){  	   				  	 
	       				return json;    
	   				},    
					success:function(json,textStatus){    
//						console.log(json)
						shef.tetter_All[i] = json.result
//						console.log(shef.tetter_All)
				    },     
				    error:function(XMLHttpRequest,textStatus,errorThrown){  
//				   	  alert('错误');
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
						},
		   				dataType:"jsonp",    
		   				jsonp:"callback",    
		   				jsonpCallback:"success_jsonp2",    
		   				
		   				  dataFilter:function(json){  	   				  	 
		       				return json;    
		   				},    
						success:function(json,textStatus){    
							console.log(json)
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
				if(id!=-1){
					shef.Id = id
					shef.name = index
				}else{
					shef.Id = ''
					shef.name = ''
					shef.other = 1
				}
				shef.show_fen=0;
			},
			//收起下拉框
			bg:function(){
				var shef=this;
				shef.show_fen=0;
			},
			out:function(){
				window.history.go(-1);
			},
			type_bottom:function(){
				var shef=this
				shef.type_c_show=1
				$('.type_list').css('left','100%')
			},
			type_show:function(){
				var shef = this
				shef.type_c_show=1
				$('.type_list_top').css('height','15rem')
				$('.type_list').css('left','0%')
			},
			type_c:function(index){
				var shef = this;
				console.log(index)
				shef.color = shef.color_All[index]
			},
		}//methods函数结尾
	});
})