window.onload = function(){
//	console.log(localStorage.getItem("museOnlineTag"))
//	console.log(localStorage.getItem("museId"))
//	console.log(localStorage.getItem("musePwd"))
	url=link_All.link_Ali+'globalstone/common/file/download.do?storeFileName='
	var vn=new Vue({
		el:'#myadd',
		data:{
			sex:0,
			name:'',
			line_Phone:'',
			mobilePhone:'',
			Phone:'',
			company:'',
			type:'',
			type_num:0,
			city:'',
			address:'',
			museImage:'',
			museMobilePhone:'',
			type_arr:['矿山老板','国内石材老板','保理/金融人员','工程公司','设计师','建材零售商','系统管理员','管理层','商务组','操作组','财务组','石材工程组'],
			img_show:0,
			sexx:'',
			type_c_show:0,
			sex_c_show:0,
			err:0,
			museType:''
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
				   url:link_All.link_Ali+'globalstone/app/private/system/queryMemberInfoById.do',
				   type :'post',
				   data:{
				   		museId:museId,
				   		musePwd:musePwd,
				   		museOnlineTag:museOnlineTag,
				   },
				   dataType:"jsonp",
				   jsonp:"callback",    
				   jsonpCallback:"success_jsonp", 
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
//				   	alert(JSON.stringify(json))
				   	shef.name = json.result.museTrueName
				   	name = json.result.museTrueName
				   	shef.line_Phone = json.result.musePhone
				   	shef.Phone = json.result.musePhone
				   	shef.museMobilePhone = json.result.museMobilePhone
				   	Phone=json.result.musePhone
//				   	console.log(json.result.museCompanyName)
				   	shef.company = json.result.museCompanyName
//				   	console.log(json.result.museType)
				   	shef.type = shef.type_arr[json.result.museType-1];
				   	shef.museType=json.result.museType;
//				   	alert(json.result.museType)
				   	shef.type_num =json.result.museType
				   	if(json.result.museImage == null){
//				   		console.log(json.result.museImage)
                        shef.museImage='../../img/information/portrait.png'
				   		shef.img_show=0
				   	}else{
				   		shef.museImage=url+json.result.museImage;
//				   		alert(shef.museImage)
				   		shef.img_show=1
				   	}
				   	shef.city=json.result.region;
				   	city = json.result.region;
				   	shef.address = json.result.museAddress
				   	if(json.result.museSex != null){
				   		shef.sex = json.result.museSex
				   		sex = json.result.museSex
				   		if(shef.sex == '0'){
				   			shef.sexx = '女'
				   		}else{
				   			shef.sexx = '男'
				   			console.log(shef.sexx)
				   		}
				   	}else{
				   		if(shef.sex == '0'){
				   			shef.sexx = '女'
				   		}else{
				   			shef.sexx = '男'
				   		}
				   	}
				   	list();
				   },    
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			updata:function(){
				var shef=this;
				var Phone_test = shef.Phone
				var Phone_tests = shef.museMobilePhone
//				alert(museImage)
				function isPoneAvailable(str) {
		            var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
		            if (!myreg.test(str)) {
		                return false;
		            } else {
		                return true;
		            }
		        }
				function isPoneAvailables(str) {
		            var myreg=/^(0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8})|(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?$/;
		            if (!myreg.test(str)) {
		                return false;
		            } else {
		                return true;
		            }
		        }
				if((isPoneAvailable(Phone_test)||Phone_test.length==0)&&(isPoneAvailables(Phone_tests)||Phone_tests.length==0)){
					$.ajax({    
					   url:link_All.link_Ali+'globalstone/app/private/system/updateMember.do',
					   type :'post',
					   data:{
					   		museId:museId,
					   		musePwd:musePwd,
					   		museOnlineTag:museOnlineTag,
					   		museSex:shef.sex,//性别
					   		museImage:museImage,//头像
							museTrueName:shef.name,//真名
							musePhone:shef.Phone,//手机
							mobilePhone:shef.museMobilePhone,//固话
							museCompanyName:shef.company,//公司名
							region:shef.city,//地址
							museType:shef.type_num,
							museAddress:shef.address//详细体质,
//							mallStoreImages:
					   },
					   dataType:"jsonp",
					   jsonp:"callback",    
					   jsonpCallback:"success_jsonp", 
					   dataFilter:function(json){ 
					       return json;    
					   },    
					   success:function(json,textStatus){
//					   	console.log(json)
					   	$('.preservation').css('background','#0095dd');
					   	$('.bg_tis p').text('保存成功')
					   		shef.err = 1; 
                            
						   	setTimeout(function(){
						   		shef.err = 0; 
						   		plus.webview.getWebviewById('my_page.html').evalJS("shuaxin()");
					   		    mui.back();
						   	},1000)
					   },    
					   error:function(XMLHttpRequest,textStatus,errorThrown){  
					   	  console.log('错误'); 
					   }    
					}); 
				}else{
					if(isPoneAvailables(Phone_tests) == false){
						$('.bg_tis p').text('请输入正确电话！')
				   		shef.err = 1; 
					   	setTimeout(function(){
					   		shef.err = 0; 
					   	},1000)
					}
					if(isPoneAvailable(Phone_test) == false){
						$('.bg_tis p').text('请输入正确手机号！')
				   		shef.err = 1; 
					   	setTimeout(function(){
					   		shef.err = 0; 
					   	},1000)
					}
				}
//				window.location.href='my_page_aut.html';
			}, 
			type_c:function(index){
				var shef = this;
				shef.type = shef.type_arr[index]
				shef.type_num=index+1;
//				console.log(shef.type_num)
				index += 1;
				shef.type_c_show=0
				$('.type_list').css('left','100%')
			},
			sex_c:function(index){
				var shef = this;
				shef.sex_c_show=0
				shef.sex = index
				
				if(shef.sex == '0'){
		   			shef.sexx = '女'
		   		}else{
		   			shef.sexx = '男'
		   		}
				console.log(shef.sex)
				
				$('.type_list').css('left','100%')
			},
			type_show:function(){
				var shef = this
				shef.type_c_show=1
				$('.type_list_top').css('height','15rem')
				$('.type_list').css('left','0%')
			},
			sex_show:function(){
				var shef = this
				shef.sex_c_show=1;
				$('.type_list_top').css('height','6rem');
				
				$('.type_list').css('left','0%')
			},
			type_bottom:function(){
				var shef=this
				shef.type_c_show=1
				shef.sex_c_show=0
				$('.type_list').css('left','100%')
			},
		}//methods函数结尾
	});
	
	var list = function(){
//		$('.preservation').on('tap',function(){
//			
//		})
		
		//点击定位
//		$('.position em').on('tap',function(){
//			var u = navigator.userAgent;
//			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
//			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//			
//			function is_weixn(){  
//			    var ua = navigator.userAgent.toLowerCase();  
//			    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
//			        return true;  
//			    } else {  
//			        return false;  
//			    }  
//			}  
//			var cip = returnCitySN["cip"];
//			var cname = returnCitySN["cname"];
//	//		console.log(cip,cname);
//	//		var sheng = cname.substr(0,3);
//	//		var shi = cname.substr(3,3);
//	//		console.log(sheng,shi);
//			$('.position input').val(cname)
//			$('.position input').css('color','#656565');
//		})
		
		
		
		
	
	}
	
	
}

