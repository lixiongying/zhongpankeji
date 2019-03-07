window.onload = function() { 
	var vn=new Vue({
		el:'#myadd',
		data:{
			phone:'',
			password:'',
			code:'',
			err:0,
			go_show:0,
		},
		mounted(){
		},
		//初始函数
		created:function(){
			
		},
		methods:{
			init_one:function(){
				var shef=this;
				$.ajax({
				   url:link_All.link_Ali+'globalstone/app/public/system/registerCode.do',
				   type :'post',
				   data:{
				   	phone:shef.phone,
				   },
				   dataType:"jsonp",
				   jsonp:"callback",    
				   jsonpCallback:"success_jsonp", 
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
				   		console.log(json)
				   		if(json.flag == 0){
				   			shef.err = 1; 
							$('.bg_tis p').text(json.msg)
						   	setTimeout(function(){
						   	  	shef.err = 0; 
						   	  	$('.bg_tis p').text('错误！请重试！！')
						   	},2000)
				   		}else if(json.flag == 1){
				   			shef.err = 1; 
				   			shef.go_show=1
							$('.bg_tis p').text(json.msg)
						   	setTimeout(function(){
						   	  	shef.err = 0; 
						   	  	$('.bg_tis p').text('错误！请重试！！')
						   	},2000)
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
			updata:function(){
				var shef=this
				if(shef.phone.length == 11){
					shef.init_one()
				}else{
					shef.err = 1; 
					$('.bg_tis p').text('手机号码错误！')
				   	setTimeout(function(){
				   	  	shef.err = 0; 
				   	  	$('.bg_tis p').text('错误！请重试!！')
				   	},2000)
				}
				
			},
			go:function(){
				var shef=this;
//				$('.bg_tis p').text('注册成功') 
				$.ajax({
				   url:link_All.link_Ali+'globalstone/app/public/system/appUserRegister.do',
				   type :'post',
				   data:{
				   	userName:shef.phone,
				   	password:shef.password,
				   	code:shef.code,
				   },
				   dataType:"jsonp",
				   jsonp:"callback",    
				   jsonpCallback:"success_jsonp", 
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
				   		console.log(json)
				   		if(json.flag == 0){
				   			shef.err = 1; 
							$('.bg_tis p').text(json.msg)
						   	setTimeout(function(){
						   	  	shef.err = 0; 
						   	  	$('.bg_tis p').text('错误！请重试!！')
						   	},2000)
				   		}else if(json.flag == 1){
				   			$('.bg_tis p').text(json.msg)
					   		shef.err = 1; 
						   	setTimeout(function(){
						   		shef.err = 0; 
						   		//直接登录
								$.ajax({
								   url:link_All.link_Ali+"globalstone/app/public/mall/userLogin.do",
								   type :'post',
								   data:{
								   	museUserName:shef.phone,
								   	musePwd:shef.password
								   },
								   dataType:"jsonp",
								   jsonp:"callback",    
								   jsonpCallback:"success_jsonp", 
								   dataFilter:function(json){ 
								       return json;    
								   },    
								   success:function(json,textStatus){
								   		console.log(json)
								   		localStorage.setItem("museOnlineTag",json.result.museOnlineTag);
								   		localStorage.setItem("musePwd",shef.password);
								   		localStorage.setItem("museId",json.result.museId);
								   		localStorage.setItem("mstoIsCert",json.result.mstoIsCert);
								   		shef.err = 1; 
									   	setTimeout(function(){
									   		shef.err = 0; 
									   		$('.bg_tis p').text('错误！请重试!！')
									   	},2000)
								   		window.location.href="index.html"
								   },    
								   error:function(XMLHttpRequest,textStatus,errorThrown){  
								   	  console.log('错误');
								   	  shef.err = 1; 
								   	  setTimeout(function(){
								   	  	shef.err = 0; 
								   	  },2000)
								   }    
								});
						   		
						   	},2000)
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
			out:function(){
				window.history.go(-1);
			},
			go_c_show:function(){
				var shef= this
				shef.err = 1; 
				$('.bg_tis p').text('未获取认证码或认证码错误！')
			   	setTimeout(function(){
			   	  	shef.err = 0; 
			   	  	$('.bg_tis p').text('错误！请重试!！')
			   	},2000)
			},
		}//methods函数结尾
	});
	$('#out').on('tap',function(){
		window.history.go(-1);
	})
}
