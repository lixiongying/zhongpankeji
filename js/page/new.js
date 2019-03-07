$(function() {
	var vm = new Vue({
		el: '#new',
		data: {
			newList: {},
			newLists: {},
			url: link_All.link_Ali + 'globalstone/common/file/download.do?storeFileName=',
		},
		mounted() {

		},
		//初始函数
		created: function() {
			this.init();
			this.inits();
		},
		methods: {
			init: function() {
				var shef = this;
				$.ajax({
					type: "post",
					url: link_All.link_Ali + "globalstone/app/public/mall/queryArticleList.do",
					async: true,
					data: {
						categoryId: 1
					},
					dataType: "jsonp",
					jsonp: "callback",
					jsonpCallback: "success_jsonp1",
					timeout: 3000,
					dataFilter: function(json) {
						return json;
					},
					success: function(json, textStatus) {
						shef.newList = json.result;
						//	       			console.log(shef.newList);
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						alert('错误');
						console.log("jsonp.error:" + textStatus);
					}
				});
			}, //init函数结尾

			inits: function() {
				var shef = this;
				$.ajax({
					type: "post",
					url: link_All.link_Ali + "globalstone/app/public/mall/queryArticleList.do",
					async: true,
					data: {
						categoryId: 12
					},
					dataType: "jsonp",
					jsonp: "callback",
					jsonpCallback: "success_jsonp2",
					timeout: 3000,
					dataFilter: function(json) {
						return json;
					},
					success: function(json, textStatus) {
						shef.newLists = json.result;
						console.log(shef.newLists);
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						alert('错误');
						console.log("jsonp.error:" + textStatus);
					}
				});
			}, //inits函数结尾
			go: function(id) {
				//				console.log(id)
				localStorage.setItem("Aid", id);
				mui.openWindow({
					url:'newde.html',
					id:'newde.html'
				})
//				window.location.href = "newde.html"
			},
			gotos: function(id) {
				console.log(id)
				localStorage.setItem("Aid", id);
				mui.openWindow({
					url:'newdetail.html',
					id:'newdetail.html'
				})
//				window.location.href = "newdetail.html"
			},
			out: function() {
				window.history.go(-1);
			},
		} //methods函数结尾
	});
})