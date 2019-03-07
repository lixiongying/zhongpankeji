$(function() {
	var vm = new Vue({
		el: '#about',
		data: {
			proList: {},
			url: link_All.link_Ali + 'globalstone/common/file/download.do?storeFileName=',
		},
		mounted() {

		},
		//初始函数
		created: function() {
			this.init();
		},
		methods: {
			init: function() {
				var shef = this;
				$.ajax({
					type: "post",
					url: link_All.link_Ali + "globalstone/app/public/mall/aboutAs.do",
					async: true,
					//					data:{museId:1,musePwd:123456,museOnlineTag:1555,mstoId:18,page:2,pageSize:2},    
					dataType: "jsonp",
					jsonp: "callback",
					jsonpCallback: "success_jsonp",
					timeout: 3000,
					dataFilter: function(json) {
						return json;
					},
					success: function(json, textStatus) {
						shef.proList = json.result;
						console.log(shef.proList); //店铺轮播图
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						alert('错误');
						console.log("jsonp.error:" + textStatus);
					}
				});
			}, //init函数结尾

		} //methods函数结尾

	});
})