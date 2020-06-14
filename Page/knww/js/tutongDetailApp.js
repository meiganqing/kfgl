//var tableins = "";
var limit = 5,
	layer;
var ttbh = window.location.href.getQuery("tuTongBh")
var where = {
	TblNum: "386",
	T38672: "EQ" + getCookieName("mCurrentStorage"),
	orderby: "id desc",
	QueryType: "图筒",
	QueryKey: ttbh,
	limit: limit
}
var kf = window.location.href.getQuery("kf")


var page = 1;
var finished = 0;
var sover = 0;
var setdefult

$(function() {
	//先判断是否是当前库房
	var bcode = new Base64();
var qcodeKf = bcode.decode(kf)


	layui.use(['layer'], function() {
		layer = layui.layer;
		if(qcodeKf == getCookieName("mCurrentStorage")) {
			//如果屏幕未到整屏自动加载下一页补满
			initData()
		} else {
			$("#prolist").append('<li><div style="text-align: center;"><img src="../../images/nothing.png" alt="" style="margin-top:70px" /></div></li>')
			layer.msg("二维码对应库房为"+qcodeKf+",请重新登录", {
				time: 2500
			}, function() {
				window.location.href = window.location.origin + "/SYKFGL/login-app.html?nextUrl=" + escape(window.location.href)
			});

		}
	})

})

function initData() {
	setdefult = setInterval(function() {
		if(sover == 1)
			clearInterval(setdefult);
		else if($(".prolist").height() < $(window).height())
			loadmore($(window));
		else
			clearInterval(setdefult);
	}, 500);
}
//加载完
function loadover() {
	if(sover == 1) {
		var overtext = "Duang～到底了";
		$(".loadmore").remove();
		if($(".loadover").length > 0) {
			$(".loadover span").eq(0).html(overtext);
		} else {
			var txt = '<div class="loadover"><span>' + overtext + '</span></div>'
			$("body").append(txt);
		}
	}
}

//加载更多
var vid = 0;

function loadmore(obj) {

	if(finished == 0 && sover == 0) {
		var scrollTop = $(obj).scrollTop();
		var scrollHeight = $(document).height();
		var windowHeight = $(obj).height();
		if($(".loadmore").length == 0) {
			var txt = '<div class="loadmore"><span class="loading"></span>加载中..</div>'
			$("body").append(txt);
		}
		if(scrollTop + windowHeight - scrollHeight <= 50) {
			//此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
			//防止未加载完再次执行
			finished = 1;
			var result = "";
			where.page = page
			postData("wwGetDataList", where, function(data) {
				if(data == "") {
					sover = 1;
					loadover();
					if(page == 1) {
						$("#no_msg").removeClass("hidden");
						$(".loadover").remove();
					}
				} else {
					var result = '';
					for(var i = 0; i < data.data.length; i++) {

						result += '	<li>' +
							'<div class="card demo-card-header-pic">' +
							'<div valign="bottom" class="card-header color-white no-border no-padding">' +
							'<img class="card-cover" src="' + data.data[i].图片地址 + '" alt="">' +
							'</div>' +
							'<div class="card-content">' +
							'<div class="card-content-inner">' +
							'<a class="listDetail" href="../../qrCode/detailApp.html?ewm=true&type=detail&knbh=' + data.data[i].文物库内编号+'&kf='+kf+ '"><p>详情</p></a>' +
							'<p class="color-gray">名称: ' + data.data[i].登记名称 + '</p>' +
							'<p>新编号:' + data.data[i].编号 + '</p>' +
							'<p>原编号:' + data.data[i].原始编号 + '</p>' +
							'<p>时代:' + data.data[i].年代 + '</p>' +
							'<p>地点:' + data.data[i].省+  data.data[i].市+ data.data[i].县+ data.data[i].乡+ '</p>' +
							//							'<p>库内编号:'+data.data[i].文物库内编号+'</p>' +
							'</div>' +
							'</div>' +
							'</li>'
					}
					$(".loadmore").remove();
					$('.prolist').append(result);
					page += 1;
					finished = 0;
					if(page > Math.ceil(data.count / limit)) { //最后一页
						sover = 1;
						loadover();
					}
				}
			})
		}
	}
}
//页面滚动执行事件
$(window).scroll(function() {
	loadmore($(this));
});