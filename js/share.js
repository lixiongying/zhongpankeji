var shares = null,
				bhref = false;
			var Intent = null,
				File = null,
				Uri = null,
				main = null;
			// H5 plus事件处理
			function plusReady() {
				updateSerivces();
				if(plus.os.name == "Android") {
					Intent = plus.android.importClass("android.content.Intent");
					File = plus.android.importClass("java.io.File");
					Uri = plus.android.importClass("android.net.Uri");
					main = plus.android.runtimeMainActivity();
				}
			}
			if(window.plus) {
				plusReady();
			} else {
				document.addEventListener("plusready", plusReady, false);
			}
			/**
			 * 更新分享服务
			 */
			function updateSerivces() {
				plus.share.getServices(function(s) {
					shares = {};
					for(var i in s) {
						var t = s[i];
						shares[t.id] = t;
					}
				}, function(e) {
					outSet("获取分享服务列表失败：" + e.message);
				});
			}
			/**
			 * 调用系统分享
			 * 调用
			 */
			function shareSystem() {
				if(plus.os.name !== "Android") {
					plus.nativeUI.alert("此平台暂不支持系统分享功能!");
					return;
				}
				var intent = new Intent(Intent.ACTION_SEND);
				var p = "";
				if(pic && pic.realUrl) {
					p = pic.realUrl;
					if(p.substr(0, 7) === "file://") {
						p = p.substr(7);
					} else if(p.sub(0) !== "/") {
						p = plus.io.convertLocalFileSystemURL(p);
					}
				}
				var f = new File(p);
				var uri = Uri.fromFile(f);
				if(f.exists() && f.isFile()) {
					console.log("image/*");
					intent.setType("image/*");
					intent.putExtra(Intent.EXTRA_STREAM, uri);
				} else {
					console.log("text/plain");
					intent.setType("text/plain");
				}
				intent.putExtra(Intent.EXTRA_SUBJECT, "HBuilder");
				intent.putExtra(Intent.EXTRA_TEXT, sharecontent.value);
				intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
				main.startActivity(Intent.createChooser(intent, "系统分享"));
			}
			/**
			 * 分享操作
			 * @param {String} id
			 */
			function shareAction(id, ex) {
				var s = null;
				//	outSet( "分享操作：" );

				if(!id || !(s = shares[id])) {
					outLine("无效的分享服务！");

					return;
				}
				if(s.authenticated) {
					//		outLine( "---已授权---" );

					shareMessage(s, ex);
				} else {
					//		outLine( "---未授权---" );

					s.authorize(function() {
						shareMessage(s, ex);
					}, function(e) {
						//	outLine( "认证授权失败："+e.code+" - "+e.message );
					});
				}
			}
			/**
			 * 发送分享消息
			 * @param {plus.share.ShareService} s
			 */
			function shareMessage(s, ex) {
				var msg = {
					content: sharecontent.value,
					extra: {
						scene: ex
					}
				};
				if(bhref) {
					msg.href = sharehref.value;
					if(sharehrefTitle && sharehrefTitle.value != "") {
						msg.title = sharehrefTitle.value;
					}
					if(sharehrefDes && sharehrefDes.value != "") {
						msg.content = sharehrefDes.value;
					}
					msg.thumbs = ["_www/logo.png"];
					msg.pictures = ["_www/logo.png"];
				} else {
					if(pic && pic.realUrl) {
						msg.pictures = [pic.realUrl];
					}
				}
				//outLine(JSON.stringify(msg));
				s.send(msg, function() {
					//outLine( "分享到\""+s.description+"\"成功！ " );
				}, function(e) {
					//outLine( "分享到\""+s.description+"\"失败: "+e.code+" - "+e.message );
				});
			}
			/**
			 * 解除所有分享服务的授权
			 */
			function cancelAuth() {
				try {
					//outSet( "解除授权：" );
					for(var i in shares) {
						var s = shares[i];
						if(s.authenticated) {
							//outLine( "取消\""+s.description+"\"");
						}
						s.forbid();
					}
					// 取消授权后需要更新服务列表
					updateSerivces();
					outLine("操作成功！");
				} catch(e) {
					alert(e);
				}
			}

			// 分析链接
			function shareHref() {
				bhref = true;
				var ids = [{
						id: "weixin",
						ex: "WXSceneSession"
					}, {
						id: "weixin",
						ex: "WXSceneTimeline"
					},{
						id: "qq",
						ex: ""
					}, ],
					bts = [{
						title: "发送给微信好友"
					}, {
						title: "分享到微信朋友圈"
					}, {
						title: "分享到qq"
					}];
				plus.nativeUI.actionSheet({
						cancel: "取消",
						buttons: bts
					},
					function(e) {
						var i = e.index;
						if(i > 0) {
							shareAction(ids[i - 1].id, ids[i - 1].ex);
						}
					}
				);
			}