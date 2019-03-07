window.onload = function() { 
	console.log(link_All.link_Ali)
	var vn=new Vue({
		el:'#myadd',
		data:{
			museUserName:'',
			musePwd:'',
			museId:'',
			mstoIsCert:'',
			err:0,
		},
		mounted(){
		},
		//初始函数
		created:function(){
		},
		methods:{
			init_one:function(){
				
				var shef=this;
				console.log(shef.museUserName)
				console.log(shef.musePwd)
				$.ajax({
				   url:link_All.link_Ali+'globalstone/app/public/mall/userLogin.do',
				   type :'post',
				   data:{
				   	museUserName:shef.museUserName,
				   	musePwd:shef.musePwd
				   },
				   dataType:"jsonp",
				   jsonp:"callback",    
				   jsonpCallback:"success_jsonp", 
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
				   		console.log(json)
				   		if(json.flag==0){
				   			$('.bg_tis p').text(json.msg)
					   		shef.err = 1; 
						   	setTimeout(function(){
						   		shef.err = 0; 
						   	},2000)
				   		}else{
				   			localStorage.setItem("museOnlineTag",json.result.museOnlineTag);
					   		localStorage.setItem("musePwd",shef.musePwd);
					   		localStorage.setItem("museId",json.result.museId);
					   		localStorage.setItem("mstoIsCert",json.result.mstoIsCert);
				   			shef.museId= localStorage.getItem("museId"); 
				   			$('.bg_tis p').text('登录成功')
					   		shef.err = 1; 
						   	setTimeout(function(){
						   		shef.err = 0; 
						   	},2000)
					   		window.location.href="my_page.html"
				   		}
				   		
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误');
				   	  shef.err = 1; 
				   	  setTimeout(function(){
				   	  	shef.err = 0; 
				   	  },2000)
				   }    
				});  
			},//init函数结尾
			on:function(){
				var shef=this;
				this.init_one();
//				console.log(shef.museUserName)
			},
		out:function(){
				window.history.go(-1);
			},
		}//methods函数结尾
		
	});
	$('#out').on('tap',function(){
		window.history.go(-1);
	})
}
