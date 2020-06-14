var tuTongBh = window.location.href.getQuery("bh");
var knbh = window.location.href.getQuery("knbh");
var where = {
	TblNum: "386",
	T3862: "EQ" + knbh
}

$(function() {
	layui.use(['form'], function() {
		SetQRurl_("qrcode1", "tuTongBh", "detail", "qrimage1")
		SetQRurl_("qrcode2", "tuTongBh", "detail", "qrimage2")

		echoData(tuTongBh)
		setTimeout(function() {
			$(".no-print").addClass("layui-hide");
			$(".tt").css({
				"border": "none"
			})
			var tata = document.execCommand("print");
			if(tata) {
				$(".tt").css({
					"border": "1px dashed #000"
				})
				$(".no-print").removeClass("layui-hide");

			}

		}, 1000)
		$("#printBtn").click(function() {
			$(".no-print").addClass("layui-hide");
			$(".tt").css({
				"border": "none"
			})
			var tata = document.execCommand("print");
			if(tata) {
				$(".no-print").removeClass("layui-hide");
				$(".tt").css({
					"border": "1px dashed #000"
				})

			}
		})

	})
})

function SetQRurl_(id, knbh, type, imgID) {
	var b = new Base64();
	var curKf = b.encode(getCookieName("mCurrentStorage"))
	var a = window.location.origin + "/SYKFGL/Page/knww/page/tutongDetailApp.html?ewm=true&tuTongBh=" + tuTongBh + "&kf=" + curKf;
	//  a=a.replace("xdWenWuInfo", "xdWenWuInfo2")

	//	var a = window.location.origin + "/SYKFGL/Page/qrCode/detailApp.html?ewm=true&knbh=" + knbh + "&kf=" + curKf + "&type=" + type + str;

	$("#" + id).qrcode({
		width: 64,
		height: 64,
		text: a,
		correctLevel: 0,
		render: "canvas",
	});
	$("canvas").attr("id", "erw");
	var b = document.getElementById('erw');
	var c = b.getContext('2d');
	var d = new Image();
	var e = b.toDataURL("image/png");
	document.getElementById(imgID).src = e

}

function echoData(id) {
	if(id) {
		postData("wwGetDataList", where, function(data) {
			$("#ttbh1").html(tuTongBh)
			$("#ttbh2").html(tuTongBh)
			$("#登记名称1").html(data.data[0]['登记名称'])
			$("#登记名称2").html(data.data[0]['登记名称'])
			$("#库房名1").html(data.data[0]['库房名'])
			$("#柜架号1").html(data.data[0]['柜架号'])
			$("#层号1").html(data.data[0]['层号'])
			$("#库房名2").html(data.data[0]['库房名'])
			$("#柜架号2").html(data.data[0]['柜架号'])
			$("#层号2").html(data.data[0]['层号'])
			//			$("#新编号").html(data.data[0]['新编号'])
			//			$("#年代").html(data.data[0]['年代'])
			//			$("#address").html(data.data[0]['省'] + data.data[0]['市'] + data.data[0]['县'] + data.data[0]['乡'] + data.data[0]['小地方'])
		})
	}
}