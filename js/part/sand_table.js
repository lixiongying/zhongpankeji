window.onload = function() { 
	var vn=new Vue({
		el:'#myadd',
		data:{
			url:link_All.link_Ali+'globalstone/common/file/download.do?storeFileName=',
			num:0,
		},
		mounted(){
		},
		//初始函数
		created:function(){
			this.init_three();
			this.num_in();
		},
		methods:{
			init_three:function(stoneType){
				var shef=this;
				$.ajax({    
				   url:link_All.link_Ali+'globalstone/app/public/mallStore/appPortName.do',
				   type : 'post',
				   data:{stoneType:stoneType}, 
				   dataType:"jsonp",    
				   jsonp:"callback",   
//				   timeout:3000,    
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
				   		list(json,shef);
						data = json.mstoName;
						id = json.mstoId;
						$(".header_show .mui-slider-group").empty();
						$(".header_show_o").empty();
						var data_length = Math.ceil(data.length/18);
						for(var k=0 ;k<data_length;k++){
							$(".header_show .mui-slider-group").append("<div class='mui-slider-item'></div>");
							$(".header_show_o").append("<div></div>");
							$(".header_show_o div:eq(0)").addClass("click");
							for(var i=k*18;i<k*18+18;i++){
								if(data[i] == undefined){
									break;
								}else{
									$(".header_show .mui-slider-item:eq("+k+")").append("<p id="+id[i]+">"+data[i]+"</p>");
								}
							}
						}
						$('.mui-slider p').on('tap',function(){
							var index = $('.mui-slider p').index(this);
							var text = $('.mui-slider p:eq('+index+')').text();
							var id = $('.mui-slider p:eq('+index+')').attr('id')
							shef.num_check(text);
							$('.header_show').css('display','none');
						})
				   },     
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			num_in:function(){
				var shef=this;
				$.ajax({    
				   url:link_All.link_Ali+'globalstone/app/public/mallStore/appPortType.do',
				   type : 'post',
				   data:{}, 
				   dataType:"jsonp",    
				   jsonp:"callback",   
//				   timeout:3000,    
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
				   		var acount = [];
				   		acount.push(json.acount);
				   		acount.push(json.acount1);
				   		acount.push(json.acount2);
				   		acount.push(json.acount3);
				   		acount.push(json.acount4);
				   		acount.push(json.acount5);
				   		for(var i=0;i<acount.length;i++){
				   			$('.header_bottom i:eq('+i+')').text(acount[i]);
				   		}
				   },     
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			num_check:function(text){
				var shef=this;
				$.ajax({    
				   url:link_All.link_Ali+'globalstone/app/public/mallStore/appPort.do',
				   type : 'post',
				   data:{sys_name:text}, 
				   dataType:"jsonp",    
				   jsonp:"callback",   
//				   timeout:3000,    
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
				   	console.log(json)
				   	localStorage.setItem("mstoId",json.mstoId);
				   	var main_text;
				   	if(json.mgoname != undefined && json.mgoname != null){
				   		main_text = json.mgoname
				   	}else{
				   		main_text = " ";
				   	}
				   	var phone = json.mstoPhone !=null ?  json.mstoPhone : '';
				   	var address = json.mstoAddress !=null ? json.mstoAddress : '' ;
//				   	console.log(json)
			   		information = {
			   			name:json.mastoName,
			   			type:json.stoneName,
			   			phone:phone,
			   			address:address,
			   			main:main_text,
			   		}
						map_in(json,information);
//						console.log(json)
				   },     
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
		}//methods函数结尾
	});
	
	var list = function(json,shef){
		var data=json.mstoName;
		$('.footer_top div').on('tap',function(){
			var index = $('.footer_top div').index(this);
			var num;
			$('.footer_top div').removeClass('click');
			$('.footer_top div:eq('+index+')').addClass('click');
	//		$('.footer_top div:eq('+index+') img').attr('src','./img/sand table/home2.png');
			for(var i=0 ;i<$('.footer_top div img').length;i++){
				num = $('.footer_top div:eq('+i+') img').attr('src').replace("2","1");
				$('.footer_top div:eq('+i+') img').attr('src',num);
			}
			var src = $('.footer_top div:eq('+index+') img').attr('src').replace("1","2"); 
			$('.footer_top div:eq('+index+') img').attr('src',src);
		});
		var onindex = 'x'; 
		//点击选项弹出框
		$('.header_bottom div').on('tap',function(){
			var em_left = '';
			var em_top = '';
			var div_left = '';
			var div_top = '';
			var bg_left = '';
			var bg_top = '';
			var o_top='';
			var indexx = $('.header_bottom div').index(this);
			if(indexx == onindex){
				$('.header_show').css('display','none');
				onindex = 'x';
				return;
			}else{
				onindex = indexx;
			}
			switch (indexx){
				case 0:
					stoneType = indexx;
					shef.init_three(stoneType);
					em_top='-2.2rem';
					em_left='1.7rem';
					div_top='-0.6rem';
					bg_top='6.75rem';
					o_top='21.5rem';
					
				break;
				case 1:
					stoneType = indexx;
					shef.init_three(stoneType);
					em_top='-2.2rem';
					em_left='60%';
					div_top='-0.6rem';
					bg_top='6.75rem';
					o_top='21.5rem';
				break;
				case 2:
					stoneType = indexx;
					shef.init_three(stoneType);
					em_top='0.3rem';
					em_left='1.7rem';
					div_top='1.9rem';
					bg_top='9.25rem';
					o_top='24rem';
				break;
				case 3:
					stoneType = indexx;
					shef.init_three(stoneType);
					em_top='0.3rem';
					em_left='60%';
					div_top='1.9rem';
					bg_top='9.25rem';
					o_top='24rem';
				break;
				case 4:
					stoneType = indexx;
					shef.init_three(stoneType);
					em_top='2.8rem';
					em_left='1.7rem';
					div_top='4.5rem';
					bg_top='11.9rem';
					o_top='26.5rem';
				break;
				case 5:
					stoneType = indexx;
					shef.init_three(stoneType);
					em_top='2.8rem';
					em_left='60%';
					div_top='4.5rem';
					bg_top='11.9rem';
					o_top='26.5rem';
				break;
			}
			//改变样式位置
			$('.header_show').css('display','none');
			$('.header_show em').css('left',em_left);
			$('.header_show em').css('top',em_top);
			$('.header_show .show').css('top',div_top);
			$('.header_show_o').css('top',o_top);
			$('.header_show .header_show_bg').css('top',bg_top);
			//渲染元素
			$('.header_show').css('display','block');
		})
		$('.header_show_bg').on('tap',function(){
			$('.header_show').css('display','none');
		})
		
		
		
		document.querySelector('.mui-slider').addEventListener('slide', function(event) {
		  //注意slideNumber是从0开始的；
	//	  console.log(event.detail.slideNumber);
		  $('.header_show .header_show_o div').removeClass('click');
		  $('.header_show .header_show_o div:eq('+event.detail.slideNumber+')').addClass('click');
		});
	
	}
	//跳转
	$('.long').on('tap',function(){
		window.location.href="stone_street.html";
	})
	$('.index').on('tap',function(){
		window.location.href="encyclopedias.html";
	})
	$('.my').on('tap',function(){
		window.location.href="my_page.html";
	})
	
	
	
	
	var mstoId;
//	地图的制作
	var map_in = function(name,information){
		console.log(information)
		mstoId = name.mstoId
		
		var geo = new qq.maps.Geocoder()
	        geo.getLocation('中国,云浮,'+name.mastoName+'')//地址
	        geo.setComplete(function(res){
//	          console.log(res,res.detail.location)//得到经纬度
//	          console.log(name)
	            var map = new qq.maps.Map(document.getElementById('mymap'),{
	                center: res.detail.location,//将经纬度加到center属性上
	                zoom: 15,//缩放   
	                draggable: true,//是否可拖拽
	                scrollwheel: true,//是否可滚动缩放
	                disableDoubleClickZoom: false
	            })
	            var marker = new qq.maps.Marker({
	                position: res.detail.location,//标记的经纬度
//	              animation: qq.maps.MarkerAnimation.BOUNCE,//标记的动画
	                map: map//标记的地图
	            })
				var anchor = new qq.maps.Point(0, 39),
			          size = new qq.maps.Size(42, 68),
			          origin = new qq.maps.Point(0, 0),
			          
				      markerIcon = new qq.maps.MarkerImage(
				      "./img/sand_table/coordinate"+information.type+".png",
				      size, 
				      origin,
				      anchor
			    	);
			    	marker.setIcon(markerIcon);
			    	addClickHandler(res.detail.location,marker,information)
					//添加到提示窗
				    var info = new qq.maps.InfoWindow({
				        map: map
				    });
				   function addClickHandler(content,marker,information){
				    	qq.maps.event.addListener(marker, 'click', function(e) {
				    		$('#mymap>div>div:nth-of-type(1)>div>div:nth-of-type(3)>div:nth-of-type(4)').css('display','block');
					        openInfo(content,e,information)
					    });
					}
					function openInfo(content,e,information){
				        info.setContent('<div class="info" >'+
				        					'<p><a href="business.html">'+information.name+'</a></p>'+
				        					'<p>'+information.name+'主营大理石种类：'+information.main+'</p>'+
				        					'<p>电话：'+information.phone+'</p>'+
				        					'<p>地址：'+information.address+'</p>'+
				        					'</div>'
				        );
				        localStorage.setItem("mstoId",mstoId);
	        			console.log(mstoId)
				        info.setPosition(content); 
				        info.open(); 
					}
					
					qq.maps.event.addListener(map, 'click', function() {
			        	$('#mymap>div>div:nth-of-type(1)>div>div:nth-of-type(3)>div:nth-of-type(4)').css('display','none')
			        	$('#mymap>div>div:nth-of-type(1)>div>div:nth-of-type(3)>div:nth-of-type(1)>div').css('display','none')
			    });
	        })
	        
	  }
	
	
	var init = function(name) {
		var info;
	    var map = new qq.maps.Map(document.getElementById('mymap'),{
	        zoom: 11
	    });
	    var Arr= name.mstoName;
	    var IdArr = name.mstoId;
	    var check_phone;
    	var check_address;
    	var check_main;
	    for(var i=0;i<Arr.length;i++){
	    	(function(){
	    	var name = Arr[i];
	    	var id = IdArr[i];
	    	
	    	$.ajax({    
			   url:link_All.link_Ali+'globalstone/app/private/mallStore/queryMallStoreDetail.do',
			   type : 'post',
			   data:{   museId:1,
					   	musePwd:123456,
					   	museOnlineTag:1555,
				   		mstoId:id,
			   },
			   dataType:"jsonp",    
			   jsonp:"callback",   
//			   timeout:3000,    
			   dataFilter:function(json){ 
			       return json;    
			   },    
			   success:function(json,textStatus){
//			   		console.log(json.result)
			   		check_phone = json.result.store.mstoPhone!=null ? json.result.store.mstoPhone : '';
			   		check_address = json.result.store.mstoAddress!=null ? json.result.store.mstoAddress : '';
			   		check_main = json.result.store.mstoContent!=null ? json.result.store.mstoContent : '';
			   		cl_map(json)
			   },     
			   error:function(XMLHttpRequest,textStatus,errorThrown){  
			   	  console.log('错误'); 
			   }    
			});  
			var cl_map=function(json){
				var geo = new qq.maps.Geocoder()
			    geo.getLocation('中国,云浮,'+name+'');
			    	geo.setComplete(function(res){
		//		   		console.log(typeof res.detail.location.lat);
				   		var addr_lat = res.detail.location.lat;
				   		var addr_lng = res.detail.location.lng;
				   		mapp(addr_lat,addr_lng);
			   		})
	//		    console.log(addr_lat);
	//		   	console.log(addr_lng);
				var mapp = function(addr_lat,addr_lng){
					information = {
					   			name:name,
					   			type:json.result.stoneName,
					   			Id:id,
					   			phone:json.result.store.mstoPhone,
					   			address:json.result.store.mstoAddress,
					   			main:json.result.store.mstoContent,
					   }
			    	var center = new qq.maps.LatLng(addr_lat,addr_lng);
			    	//创建marker(标点)
				    var marker = new qq.maps.Marker({
				    	//标点所在位置
				        position: center,
				        //创建地图
				        map: map,
				    });
			
				    var anchor = new qq.maps.Point(0, 39),
			          size = new qq.maps.Size(42, 68),
			          origin = new qq.maps.Point(0, 0),
			          
				      markerIcon = new qq.maps.MarkerImage(
				      "./img/sand_table/coordinate"+json.result.stoneName+".png",
				      size, 
				      origin,
				      anchor
			    	)
			    	marker.setIcon(markerIcon);
			    	addClickHandler(center,marker,information)
	//		    	console.log(information);
			    	
					//添加到提示窗
				    info = new qq.maps.InfoWindow({
				        map: map
				    });
				    //获取标记的点击事件
			    }
			}
	    	
			})(i)
	    }
	    function addClickHandler(content,marker,information){
//	    	console.log(information);
	    	qq.maps.event.addListener(marker, 'click', function(e) {
	    		$('#mymap>div>div:nth-of-type(1)>div>div:nth-of-type(3)>div:nth-of-type(4)').css('display','block');
		        openInfo(content,e,information)
		    });
		}
		function openInfo(content,e,information){
	        info.setContent('<div class="info">'+
	        					'<p><a href="business.html">'+information.name+'</a></p>'+
	        					'<p>'+information.name+information.main+'</p>'+
	        					'<p>电话：'+information.phone+'</p>'+
	        					'<p>地址：'+information.address+'</p>'+
	        					'</div>'
	        );
	        localStorage.setItem("mstoId",information.Id);
//	        console.log(id)
	        info.setPosition(content); 
	        info.open(); 
		}
	    
    	map.panTo(new qq.maps.LatLng(22.9200491,112.20764968));
    	
    	var map_click = function(i,e){
    		$('.header_show').css('display','none');
    		$('#mymap>div>div:nth-of-type(1)>div>div:nth-of-type(3)>div:nth-of-type(4)').css('display','block');
    		var centert = new qq.maps.LatLng(dataall[i].point_lat,dataall[i].point_lng);
    		console.log(centert)
    		var information = dataall[i];
    		openInfo(centert,e,information)
		}
    	
    	qq.maps.event.addListener(map, 'click', function() {
        	$('#mymap>div>div:nth-of-type(1)>div>div:nth-of-type(3)>div:nth-of-type(4)').css('display','none')
        	$('#mymap>div>div:nth-of-type(1)>div>div:nth-of-type(3)>div:nth-of-type(1)>div').css('display','none')
    	});
	}
	
	//跳转后转到的页面
	var map_position = function(id){
		var href = window.location.href.split('=')[1];
		
		if(id!=undefined){
			var mstoId = id;
		}else{
			var mstoId = href;
		}
		console.log(mstoId);
		//商户信息显示
	var vn=new Vue({
		el:'#myadd',
		data:{
			name:"",
			addr:"",
			Phone:"",
			product:[],
			url:link_All.link_Ali+'globalstone/common/file/download.do?storeFileName=',
			clear_goods:[],
			num:0,
		},
		mounted(){
		},
		//初始函数
		created:function(){
			this.init_one();
		},
		methods:{
			init_one:function(){
				var shef_one=this;
				$.ajax({    
				   url:link_All.link_Ali+'globalstone/app/public/mallStore/mallStoreDetails.do',
				   type : 'post',
				   data:{mstoId:mstoId}, 
				   dataType:"jsonp",    
				   jsonp:"callback",    
				   jsonpCallback:"success_jsonp",    
//				   timeout:3000,    
				   dataFilter:function(json){ 
				       return json;    
				   },    
				   success:function(json,textStatus){
				   		shef_one.init_one_on(json,shef_one);
				   },     
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误'); 
				   }    
				});  
			},//init函数结尾
			init_one_on:function(json,shef_one){
				shef_one.name = json.mstoName;
//		   		console.log(json)
		   		var main_text;
			   	if(json.mgoname != undefined && json.mgoname != null){
			   		main_text = json.mgoname
			   	}else{
			   		main_text = " ";
			   	}
			   	var phone = json.mstoPhone !=null ? json.mstoPhone : '';
			   	var address = json.mstoAddress !=null ? json.mstoAddress : '';
			   	console.log(json)
			   	console.log(phone)
			   	console.log(address)
			   	console.log(main_text)
		   		information = {
		   			name:json.mstoName,
		   			type:0,
		   			phone:phone,
		   			address:address,
		   			main:main_text,
		   		}
		   		map_in(json,information);
			},
		}//methods函数结尾
	});
	}
	//判断是否有坐标传输过来
	var str = window.location.href;
//		console.log(str)
	var dis  = 0
	var reg = RegExp(/lan/);
	
	
	if(reg.test(str)){
		if(dis==0){
			map_position();
			dis=1;
		}
	}else{
		var vn=new Vue({
			el:'#myadd',
			data:{
				name:"",
				addr:"",
				Phone:"",
				product:[],
				url:link_All.link_Ali+'globalstone/common/file/download.do?storeFileName=',
				clear_goods:[],
				num:0,
			},
			mounted(){
			},
			//初始函数
			created:function(){
				this.init_two();
			},
			methods:{
				init_two:function(){
					var shef=this;
					$.ajax({    
					   url:link_All.link_Ali+'globalstone/app/public/mallStore/appPortName.do',
					   type : 'post',
					   data:{stoneType:0}, 
					   dataType:"jsonp",    
					   jsonp:"callback",    
					   jsonpCallback:"success_jsonp",    
//					   timeout:3000,    
					   dataFilter:function(json){ 
					       return json;    
					   },    
					   success:function(json,textStatus){
//					   		console.log(json)
							init(json);
					   },     
					   error:function(XMLHttpRequest,textStatus,errorThrown){  
					   	  console.log('错误'); 
					   }    
					});  
				},//init函数结尾
			}//methods函数结尾
	});
	}
	
}
