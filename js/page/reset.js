window.onload = function(){
	var museId = localStorage.getItem("museId"); 
	var musePwd = localStorage.getItem("musePwd"); 
	var museOnlineTag = localStorage.getItem("museOnlineTag");
	var vn=new Vue({
		el:'#myadd',
		data:{
			phone:'',
			err:0,
			newPwd:'',
			newPwd_:'',
			code:'',
		},
		mounted(){
		},
		//初始函数
		created:function(){
		},
		methods:{
			init_one:function(){
				var shef=this;
				if(shef.phone != "" && shef.phone.length == 11){
					$.ajax({
					   url:link_All.link_Ali+'globalstone/app/public/system/forgetPwdCode.do',
					   type :'post',
					   data:{
					   	phone:shef.phone,
					   },
					   dataType:"jsonp",
					   jsonp:"callback",    
					   jsonpCallback:"success_jsonp1", 
					   dataFilter:function(json){ 
					       return json;    
					   },    
					   success:function(json,textStatus){
					   		console.log(json)
//					   		if(json.flag ==0){
					   			$('.bg_tis p').text(json.msg)
					   			shef.err = 1; 
							   	  setTimeout(function(){
							   	  	shef.err = 0; 
							   	  },2000)
//					   		}
					   },    
					   error:function(XMLHttpRequest,textStatus,errorThrown){  
					   	  console.log('错误');
					   }    
					});  
				}else{
					$('.bg_tis p').text('请输入正确手机号码！')
		   			shef.err = 1; 
				   	  setTimeout(function(){
				   	  	shef.err = 0; 
				   	  },2000)
				}
				
			},//init函数结尾
			init_two:function(){
				var shef = this;
				console.log(shef.phone)
		   		console.log(shef.newPwd)
		   		console.log(shef.code)
				if(shef.newPwd == shef.newPwd_){
					if(shef.newPwd.length>=6){
						$.ajax({
						   url:link_All.link_Ali+'globalstone/app/public/mall/resetPassword.do',
						   type :'post',
						   data:{
						   	userName:shef.phone,
						   	newPwd:shef.newPwd,
						   	code:shef.code,
						   },
						   dataType:"jsonp",
						   jsonp:"callback",    
						   jsonpCallback:"success_jsonp2", 
						   dataFilter:function(json){ 
						       return json;    
						   },    
						   success:function(json,textStatus){
						   		console.log(json)
					   			$('.bg_tis p').text(json.msg)
					   			shef.err = 1; 
							   	  setTimeout(function(){
							   	  	shef.err = 0; 
							   	  	if(json.flag == 1){
							   	  		$.ajax({
										   url:link_All.link_Ali+'globalstone/app/public/mall/userLogin.do',
										   type :'post',
										   data:{
										   	museUserName:shef.phone,
										   	musePwd:shef.newPwd
										   },
										   dataType:"jsonp",
										   jsonp:"callback",    
										   jsonpCallback:"success_jsonp", 
										   dataFilter:function(json){ 
										       return json;    
										   },    
										   success:function(json,textStatus){
	//									   		console.log(json)
										   		localStorage.setItem("museOnlineTag",json.result.museOnlineTag);
										   		localStorage.setItem("musePwd",shef.newPwd);
										   		localStorage.setItem("museId",json.result.museId);
										   		localStorage.setItem("mstoIsCert",json.result.mstoIsCert);
										   		shef.err = 1; 
											   	setTimeout(function(){
											   		shef.err = 0; 
											   		$('.bg_tis p').text('错误！请重试!！')
											   	},2000)
											   	window.location.href="my_page.html";
										   },    
										   error:function(XMLHttpRequest,textStatus,errorThrown){  
										   	  console.log('错误');
										   	  shef.err = 1; 
										   	  setTimeout(function(){
										   	  	shef.err = 0; 
										   	  },2000)
										   }    
										});
							   	  		
							   	  	}
							   	  },2000)
						   		
						   },    
						   error:function(XMLHttpRequest,textStatus,errorThrown){  
						   	  console.log('错误'+textStatus);
						   	  $('.bg_tis p').text('修改失败！请重试！')
					   			shef.err = 1; 
							   	  setTimeout(function(){
							   	  	shef.err = 0; 
							   	  },2000)
						   }    
						}); 
					}else{
						$('.bg_tis p').text('密码长度必须大于6位！')
			   			shef.err = 1; 
					   	  setTimeout(function(){
					   	  	shef.err = 0; 
					   	  },2000)
					}
				}else{
					$('.bg_tis p').text('两次密码输入不一致！')
			   			shef.err = 1; 
					   	  setTimeout(function(){
					   	  	shef.err = 0; 
					   	  },2000)
				}
			},
		}//methods函数结尾
	});
}