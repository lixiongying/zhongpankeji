window.onload = function(){
	var museOnlineTag = localStorage.getItem("museOnlineTag")
	var museId = localStorage.getItem("museId")
	var musePwd = localStorage.getItem("musePwd")
	var vn=new Vue({
		el:'#myadd',
		data:{
			content:'',
			phone:'',
			email:'',
			name:'',
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
				if(shef.content !='' && shef.phone !='' && shef.email !='' && shef.name !=''){
					$.ajax({
					   url:link_All.link_Ali+'globalstone/app/public/mall/userFeedbackinfo.do',
					   type :'post',
					   data:{
					   		content:shef.content,
					   		phone:shef.phone,
					   		email:shef.email,
					   		name:shef.name,
					   		member:museId,
					   },
					   dataType:"jsonp",
					   jsonp:"callback",    
					   jsonpCallback:"success_jsonp", 
					   dataFilter:function(json){ 
					       return json;    
					   },    
					   success:function(json,textStatus){
					   		console.log(json)
					   		$('.bg_tis p').text(json.msg)
							shef.err = 1; 
						   	  setTimeout(function(){
						   	  	shef.err = 0; 
						   	  	window.location.href="my_page.html"
						   	  },2000)
					   		
					   },    
					   error:function(XMLHttpRequest,textStatus,errorThrown){  
					   	  console.log('错误');
					   }    
					});  
				}else{
					shef.err = 1; 
				   	  setTimeout(function(){
				   	  	shef.err = 0; 
				   	  },2000)
				}
				
			},//init函数结尾
		}//methods函数结尾
	});
	
}