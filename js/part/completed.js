window.onload = function(){
	
	var data=[
		{time:1477808630000,address:'伦敦',state:'已收货'},
		{time:1477808630000,address:'伦敦',state:'拖车'},
		{time:1477808630000,address:'伦敦',state:'结算'},
		{time:1477808630000,address:'伦敦',state:'抵达港口，海关放行'},
		{time:1477808630000,address:'伦敦',state:'到中转港，驳船转运'},
		{time:1477808630000,address:'深圳盐田港区',state:'开船起运'},
		{time:1477808630000,address:'深圳盐田港区',state:'装柜发货'},
		{time:1477808630000,address:'深圳盐田',state:'上传装货资料'}
	]
	
	var odd_numbers = '515215218942001';
	
	var list = function(){
		for(var i = 0 ;i<data.length;i++){
			var times = new Date(data[i].time);
			var timex = times.toLocaleDateString().replace(/\//g, "-") + " " + times.toTimeString().substr(0, 8); 
			$('.main_link').append('<div><em><span><a>收</a></span></em><div><p>['+data[i].address+']'+data[i].state+'</p><p>结算日期31651989498191:'+timex+',代理结算:'+timex+'</p><p><span>'+timex+'</span></p></div><i></i></div>');	
			
		}
		$('.main_ordernum span').text(odd_numbers)

	}
	list();
	$('#out').on('tap',function(){
		window.history.go(-1);
	})
	
	$('.main_link>div').on('tap',function(){     
		var index =$('.main_link>div').index(this);
		var text = $('.main_link>div:eq('+index+') p').text();
		var num;
		
		
		var goods = RegExp(/拖车/);
		var barge = RegExp(/驳船/);
		var ocean_shipping = RegExp(/开船起运/);
		var port = RegExp(/结算/);
		var settlement = RegExp(/海关/);
		var completed = RegExp(/收货/);
		var cetification = RegExp(/装柜/);
		var exportdetail = RegExp(/装货资料/);
		if(text.match(goods)){
			num=1
		}else if(text.match(barge)){
			num=2
		}else if(text.match(ocean_shipping)){
			num=3
		}else if(text.match(port)){
			num=4
		}else if(text.match(settlement)){
			num=5
		}else if(text.match(completed)){
			num=6
		}else if(text.match(cetification)){
			num=7
		}else if(text.match(exportdetail)){
			num=8
		}
		
		switch(num){
			case 1:
				window.location.href="good.html";
			break;
			case 2:
				window.location.href="barge.html";
			break;
			case 3:
				window.location.href="ocean_shipping.html";
			break;
			case 4:
				window.location.href="port.html";
			break;
			case 5:
				window.location.href="settlement.html";
			break;
			case 6:
				window.location.href="completed.html";
			break;
			case 7:
				window.location.href="cetification.html";
			break;
			case 8:
				window.location.href="exportdetail.html";
			break;
		}
	})
}
