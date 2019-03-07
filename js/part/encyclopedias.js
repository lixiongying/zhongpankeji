window.onload = function(){
	
	
	var vn=new Vue({
		el:'#myadd',
		data:{
			url:link_All.link_Ali+'globalstone/common/file/download.do?storeFileName=',
			tetter:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
			recommendArr:[],
			tetter_All:[
					{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
			],
			class_All:['全部','大理石','花岗石','人造石/岗石','板岩', '砂岩','染板/电解板','玉石/奢石','山水画','其他材质'],
			color_All:['黄','橙','红','粉','灰', '白','黑','棕','绿','蓝','紫','其他'],
			show_class:0,
			show_li_class:0,
			show_div:[],
			type:0, 
			str:'',
			err:0,
		},
		mounted(){
		},
		//初始函数
		created:function(){
			this.two_for()
//			this.list()
			this.init_one()
		},
		methods:{
			list:function(){
				var shef = this
					$('.one p:eq(0)').addClass('click');
				},//init函数结尾
			//推荐产品
			init_one:function(){
				var shef=this
				$.ajax({    
				   url:link_All.link_Ali+'globalstone/app/private/mallGoods/queryMallGoodsType.do',
				   type : 'post',
				   data:{museId:1,musePwd:123456,museOnlineTag:1555,gradeFirst:0,gradeSecond:0},
				   dataType:"jsonp",    
				   jsonp:"callback",
				   dataFilter:function(json){   
				       return json;    
				   },    
				   success:function(json,textStatus){
					   	for(var i=0;i<6;i++){
					   		shef.recommendArr.push(json.result[i])
						}
					   	shef.list()
				   },     
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误');  
				   }    
				}); 
			},
			//
			init_two:function(i){
				var shef =this
				var gradeSecond = shef.tetter[i]
				var gradeFirst = 2;
				$.ajax({    
				   url:link_All.link_Ali+'globalstone/app/private/mallGoods/queryMallGoodsType.do',
				   type : 'post',
				   data:{museId:1,musePwd:123456,museOnlineTag:1555,gradeFirst:gradeFirst,gradeSecond:gradeSecond},
				   dataType:"jsonp",    
				   jsonp:"callback", 
				   dataFilter:function(json){   
				       return json;    
				   },
				   success:function(json,textStatus){
//				   		console.log(json.result)
				   		shef.tetter_All[i] = json.result
//						shef.list()
				   },     
				   error:function(XMLHttpRequest,textStatus,errorThrown){  
				   	  console.log('错误');
				   }    
				}); 
			},
			//循环TWO
			two_for:function(){
				var shef=this
				for(var i = 0 ;i<shef.tetter.length;i++){
					var text = shef.tetter[i]
					shef.init_two(i)
				}
			},
			//类型选择
			class_one:function(index){
				var shef=this
				$('.one p').removeClass('click')
				$('.one p:eq('+index+')').addClass('click');
				$('.two p').removeClass('click')
				$('.two p:eq(0)').addClass('click');
				$('.three p').removeClass('click')
				$('.three p:eq(0)').addClass('click');
				shef.show_class = 0
				shef.type = index;
				$('.detailed_img>div').css('display','none')
				for(var i= 0 ;i<$('.detailed_img>div').length;i++){
					if($('.detailed_img>div:eq('+i+')').attr('type') == shef.type || shef.type == 0){
						shef.show_div.push(i)
					}
				}
//				console.log(shef.show_div)
				for(var k = 0;k<shef.show_div.length;k++){
					$('.detailed_img>div:eq('+shef.show_div[k]+')').css('display','inline-block')
				}
				shef.show_div=[]
				for(var i=0;i<$('.detailed_img').length;i++){
					if($('.detailed_img:eq('+i+')>div').css('display') == 'inline-block'){
						$('#'+shef.tetter[i]+'').css('display','block')
					}else{
						$('#'+shef.tetter[i]+'').css('display','none')
					}
				}
			},
			class_two:function(index){
				var shef=this
				var num = index*1+1
				//清楚click
				$('.two p').removeClass('click')
				$('.two p:eq(0)').addClass('click');
				//框架高度的设置
				$('.detailed div').css('display','inline-block')
				for(var i=0;i<$('.detailed_img').length;i++){
					if($('.detailed_img:eq('+i+')>div').css('display') == 'inline-block'){
						$('#'+shef.tetter[i]+'').css('display','block')
					}else{
						$('#'+shef.tetter[i]+'').css('display','none')
					}
				}
				$('.one p').removeClass('click')
				$('.one p:eq(0)').addClass('click');
				$('.three p').removeClass('click')
				$('.three p:eq(0)').addClass('click');
				//框架高度的设置
				window.scrollTo(0,$('#'+shef.tetter[index]+'').offset().top-30)
				if(shef.tetter_All[index].length == 0){
					$('.bg_tis p').text('该字母无产品信息！')
			   		shef.err = 1; 
				   	setTimeout(function(){
				   		shef.err = 0; 
				   	},2000)
				}
				shef.show_class=0
			},
			class_two_all:function(){
				var shef=this
				//清楚click
				$('.one p').removeClass('click')
				$('.one p:eq(0)').addClass('click');
				$('.two p').removeClass('click')
				$('.two p:eq(0)').addClass('click');
				$('.three p').removeClass('click')
				$('.three p:eq(0)').addClass('click');
				//框架高度的设置
				$('.detailed div').css('display','inline-block')
				for(var i=0;i<$('.detailed_img').length;i++){
					if($('.detailed_img:eq('+i+')>div').css('display') == 'inline-block'){
						$('#'+shef.tetter[i]+'').css('display','block')
					}else{
						$('#'+shef.tetter[i]+'').css('display','none')
					}
				}
				
				window.scrollTo(0,0)
				shef.show_class=0
			},
			class_three:function(index){
				var shef = this
				var num = index*1+1
				if(num == 0){
					console.log(num)
					$('.one p').removeClass('click')
					$('.one p:eq(0)').addClass('click');
					$('.two p').removeClass('click')
					$('.two p:eq(0)').addClass('click');
					$('.three p').removeClass('click')
					$('.three p:eq('+num+')').addClass('click');
					$('.detailed>div').css('display','block')
					$('.detailed_img>div').css('display','inline-block')
					shef.show_class=0
					//判断是否还有数据若无数据就不显示
					for(var i=0;i<$('.detailed_img').length;i++){
						if($('.detailed_img:eq('+i+')>div').css('display') == 'inline-block'){
							$('#'+shef.tetter[i]+'').css('display','block')
						}else{
							$('#'+shef.tetter[i]+'').css('display','none')
						}
					}
				}else{
					shef.str = shef.color_All[index]
					$('.three p').removeClass('click')
					$('.three p:eq('+num+')').addClass('click');
					$('.detailed_img>div').css('display','none')
					for(var i= 0 ;i<$('.detailed_img>div').length;i++){
						if($('.detailed_img>div:eq('+i+')').attr('color').includes(shef.str)){
//							console.log($('.detailed_img>div:eq('+i+')').attr('color'))
							shef.show_div.push(i)
						}
					}
					for(var k = 0;k<shef.show_div.length;k++){
						$('.detailed_img>div:eq('+shef.show_div[k]+')').css('display','inline-block')
					}
					shef.show_div=[]
					shef.show_class=0
					//判断是否还有数据若无数据就不显示
					for(var i=0;i<$('.detailed_img').length;i++){
						if($('.detailed_img:eq('+i+')>div').css('display') == 'inline-block'){
							$('#'+shef.tetter[i]+'').css('display','block')
						}else{
							$('#'+shef.tetter[i]+'').css('display','none')
						}
					}
				}
			},
			class_ul:function(index){
				var shef=this
				var num = index==shef.show_class ? 0 : index;
				shef.show_class=num
			},
			go:function(id){
				localStorage.setItem("mcgoGoodsId",id);
//				window.location.href= 'prodetail.html'
                mui.openWindow({
					url:'prodetail.html',
					id:'prodetail.html'
				})
			},
		}//methods函数结尾
	});
	
	$(window).scroll(function(){
		var $wei = $(window).scrollTop();
		if($wei >= 57){
			$('.header_title').css('position','fixed');
			$('.header_title').css('top','0');
			$('.detailed_tui').css('padding','2.5rem  0 0 0 ');
		}else{
			$('.header_title').css('position','relative');
			$('.detailed_tui').css('padding','0 0 0 0 ');
		}
	});
	
	
//	$('.header_top_out').on('tap',function(){
//		window.history.go(-1);
//	})
}