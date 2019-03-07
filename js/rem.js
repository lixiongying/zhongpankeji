var html = document.getElementsByTagName('html')[0];
var W = html.clientWidth;
html.style.fontSize = W / 20 + "px";
//窗口改变监听
window.onresize = function(){
	var html = document.getElementsByTagName('html')[0];
	var W = html.clientWidth;
	html.style.fontSize = W / 20 + "px";
}