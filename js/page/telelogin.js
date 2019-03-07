$(function() {
	var num = Math.floor(Math.random() * 1000000)
	var museTrueName = '用户' + num;
	var chack_num = 60;
	var vm = new Vue({
		el: '#myadd',
		data: {
			Phone: '',
			code: '',
			err: 0,
			chack_show: 1,
			content: '',
		},
		mounted() {

		},
		//初始函数
		created: function() {},
		methods: {
			init_one: function() {
				var shef = this;
				$.ajax({
					type: "post",
					url: link_All.link_Ali + "globalstone/app/public/system/registerCode.do",
					async: false,
					data: {
						phone: shef.Phone
					},
					dataType: "jsonp",
					jsonp: "callback",
					jsonpCallback: "success_jsonp1",
					timeout: 3000,
					dataFilter: function(json) {
						return json;
					},
					success: function(json, textStatus) {
						console.log(json)
						if(json.flag == 0) {
							shef.err = 1;
							$('.bg_tis p').text(json.msg)
							setTimeout(function() {
								shef.err = 0;
								$('.bg_tis p').text('错误！请重试！！')
							}, 2000)
						} else {
							shef.err = 1;
							$('.bg_tis p').text(json.msg)
							setTimeout(function() {
								shef.err = 0;
								$('.bg_tis p').text('错误！请重试！！')
							}, 2000)
						}
						shef.chack();
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						console.log('错误');
						console.log("jsonp.error:" + textStatus);
					}
				});
			}, //init函数结尾
			init_two: function() {
				var shef = this;
				$.ajax({
					type: "post",
					url: link_All.link_Ali + "globalstone/app/public/system/appLoginByPhoneCode.do",
					async: false,
					data: {
						phone: shef.Phone,
						code: shef.code,
					},
					dataType: "jsonp",
					jsonp: "callback",
					jsonpCallback: "success_jsonp",
					timeout: 3000,
					dataFilter: function(json) {
						return json;
					},
					success: function(json, textStatus) {
						console.log(json.flag == 0)
						console.log(json)

						//				   		localStorage.setItem("mstoIsCert",json.result.mstoIsCert);
						//						shef.init_three();

						if(json.flag == 0) {
							shef.err = 1;
							$('.bg_tis p').text(json.msg)
							setTimeout(function() {
								shef.err = 0;
								$('.bg_tis p').text('错误！请重试！！')
							}, 2000)
						} else {
							shef.err = 1;
							$('.bg_tis p').text(json.msg)
							setTimeout(function() {
								shef.err = 0;
								$('.bg_tis p').text('错误！请重试！！')
								localStorage.setItem("museOnlineTag", json.result.museOnlineTag);
								localStorage.setItem("museId", json.result.museId);
								localStorage.setItem("mstoIsCert", json.result.mstoIsCert);
								plus.webview.getWebviewById('index.html').evalJS("shuaxin()");
								plus.webview.getWebviewById('stone_street.html').evalJS("shuaxin()");
								plus.webview.getWebviewById('sand_table.html').evalJS("shuaxin()");
								plus.webview.getWebviewById('my_page.html').evalJS("shuaxin()");
								mui.back();
								//						   	  	window.location.href="index.html"
							}, 1000)
						}
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						console.log('错误');
						console.log("jsonp.error:" + textStatus);
					}
				});
			}, //init函数结尾
			chack: function() {
				var shef = this
				let clock = window.setInterval(() => {
					shef.content = chack_num + 's后重新发送'
					chack_num--
					shef.chack_show = 0
					if(chack_num < 0) {
						window.clearInterval(clock)
						shef.content = '重新发送验证码'
						chack_num = 60
						shef.chack_show = 1
						shef.canClick = true //这里重新开启
					}
				}, 1000);
			},
			//			init_three:function(){
			//				var shef=this;
			//				$.ajax({
			//				   url:link_All.link_Ali+"globalstone/app/public/mall/userLogin.do",
			//				   type :'post',
			//				   data:{
			//				   	museUserName:shef.Phone,
			//				   	musePwd:123456
			//				   },
			//				   dataType:"jsonp",
			//				   jsonp:"callback",    
			//				   jsonpCallback:"success_jsonp", 
			//				   dataFilter:function(json){ 
			//				       return json;    
			//				   },    
			//				   success:function(json,textStatus){
			//				   		console.log(json)
			//				   		
			//				   		localStorage.setItem("museOnlineTag",json.result.museOnlineTag);
			//				   		localStorage.setItem("musePwd",'123456');
			//				   		localStorage.setItem("museId",json.result.museId);
			//				   		localStorage.setItem("mstoIsCert",json.result.mstoIsCert);
			//				   		shef.museId= localStorage.getItem("museId"); 
			//				   		shef.err = 1; 
			//						$('.bg_tis p').text(json.msg)
			//					   	setTimeout(function(){
			//					   	  	shef.err = 0; 
			//					   	  	$('.bg_tis p').text('错误！请重试！！')
			//					   	  	window.location.href="index.html"
			//					   	},2000)
			//				   		
			//				   },    
			//				   error:function(XMLHttpRequest,textStatus,errorThrown){  
			//				   	  console.log('错误'); 
			//				   }    
			//				});  
			//			},//init函数结尾
		} //methods函数结尾
	});
   
})