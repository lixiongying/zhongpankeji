window.onload = function() {
	console.log(link_All.link_Ali)
	var num = Math.floor(Math.random() * 1000000)
	var museTrueName = '用户' + num;
	var chack_num = 60;
	var vn = new Vue({
		el: '#myadd',
		data: {
			museUserName: '',
			musePwd: '',
			museId: '',
			mstoIsCert: '',
			err: 0,
			
			chack_show: 1,			
			code: '',
			Phone: '',
			content: '',
			showflag:1
		},
		mounted() {},
		//初始函数
		created: function() {		
		},
		methods: {
			phoneLogin:function(){
				this.showflag=1
			},
			psdLogin:function(){
				this.showflag=0
			},
			init_one: function() {

				var shef = this;
				console.log(shef.museUserName)
				console.log(shef.musePwd)
				$.ajax({
					url: link_All.link_Ali + 'globalstone/app/public/mall/userLogin.do',
					type: 'post',
					data: {
						museUserName: shef.museUserName,
						musePwd: shef.musePwd
					},
					dataType: "jsonp",
					jsonp: "callback",
					jsonpCallback: "success_jsonp",
					dataFilter: function(json) {
						return json;
					},
					success: function(json, textStatus) {
						console.log(json)
						if(json.flag == 0) {
							$('.bg_tis p').text(json.msg)
							shef.err = 1;
							setTimeout(function() {
								shef.err = 0;
							}, 2000)
						} else {

							localStorage.setItem("museOnlineTag", json.result.museOnlineTag);
							localStorage.setItem("musePwd", shef.musePwd);
							localStorage.setItem("museId", json.result.museId);
							localStorage.setItem("mstoIsCert", json.result.mstoIsCert);
							shef.museId = localStorage.getItem("museId");
							shef.musePwd = localStorage.getItem("musePwd");
							shef.museOnlineTag = localStorage.getItem("museOnlineTag");
							shef.condId()

						}

					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						console.log('错误');
						shef.err = 1;
						setTimeout(function() {
							shef.err = 0;
						}, 2000)
					}
				});
			}, //init函数结尾
			condId: function() {
				var shef = this
				$.ajax({
					type: "post",
					url: link_All.link_Ali + "globalstone/app/private/mallStore/queryMallStoreByUserId.do",
					async: true,
					data: {
						museId: shef.museId,
						musePwd: shef.musePwd,
						museOnlineTag: shef.museOnlineTag
					},
					dataType: "jsonp",
					jsonp: "callback",
					jsonpCallback: "success_jsonp6",
					//	   				timeout:3000,
					dataFilter: function(json) {
						return json;
					},
					success: function(json, textStatus) {
						console.log(json)
						localStorage.setItem("mstoId", json.id);
						$('.bg_tis p').text('登录成功')
						$('.sub-le').css('background', '#0095dd')
						shef.err = 1;
						setTimeout(function() {
							shef.err = 0;
//							plus.webview.getWebviewById('index.html').evalJS("shuaxin()");
//							plus.webview.getWebviewById('stone_street.html').evalJS("shuaxin()");
//							plus.webview.getWebviewById('sand_table.html').evalJS("shuaxin()");
//							plus.webview.getWebviewById('my_page.html').evalJS("shuaxin()");
							plus.webview.getWebviewById('index.html').reload(true);
					   		plus.webview.getWebviewById('stone_street.html').reload(true);
					   		plus.webview.getWebviewById('sand_table.html').reload(true);
					   		plus.webview.getWebviewById('my_page.html').reload(true);
		//						   		window.location.href="my_page.html"
						}, 1000)
						setTimeout(function() {
							mui.back();
						}, 1200)
						
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						alert('错误');
						console.log("jsonp.error:" + textStatus);
					}
				});
			},
			on: function() {
				var shef = this;
				this.init_one();
				//				console.log(shef.museUserName)
			},
			
			//手机登陆方法
			init_ones: function() {
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
						
//						console.log(json)
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
						shef.chacks();
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
			chacks: function() {				
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
			
		} //methods函数结尾

	});
	
	
}