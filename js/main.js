link_All = {
	link_Ali:'http://120.79.71.155:8080/',//阿里云 
//	link_Ali:'http://192.168.0.110:8080/',//阿里云
	link_local:'http://192.168.0.110:8080/'//本地
}

function url(obj){	
	var url = $(obj).attr('data-url');
	mui.openWindow({
		url:url,
		id:url,
	})
}

function shuaxin(){
	location.reload();
} 
function out(){
	mui.back()
}
