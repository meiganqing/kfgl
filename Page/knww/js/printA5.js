var form;
var knbh = window.location.href.getQuery("knbh");
$(function() {
	layui.use(["form"], function() {
		form = layui.form;
		echoData(knbh)
		setTimeout(function() {
			var tata = document.execCommand("print");
			if(tata) {
				window.history.go(-1);

			}
		}, 1500)
	})
})

function echoData(knbh) {
	//1)根据库内编号获取数据，判断是拓片表还是文物登记表
	postData("wwGetDataList", {
		TblNum: "385",
		T3852: "EQ" + knbh
	}, function(retrunData) {
		if(retrunData.data[0]['表对应码'] == "305") { //拓片表
			$(".tp").attr("id", "")
			$("#tp").addClass("layui-hide")
			postData("wwGetDataList", {
				TblNum: "305",
				T3056: "EQ" + knbh
			}, function(data) {

				for(var k in data.data[0]) {
					$("#ww" + k).html(data.data[0][k])
				}
				$("#wwPicture").attr("src", data.data[0]['图片地址'])

			})
			postData("wwGetDataList", {
				TblNum: "178",
				T17812: "EQ" + knbh,
				orderby: "记录时间 desc"
			}, function(data) {
				for(var k in data.data[0]) {
					$("#ww" + k).html(data.data[0][k])
				}

			})
			SetQRurl(knbh, "detail")
			//			获取图片

		} else if(retrunData.data[0]['表对应码'] == "386") { //文物列表
			$(".ww").attr("id", "");
			$("#ww").addClass("layui-hide")
			postData("wwGetDataList", {
				TblNum: "386",
				T3862: "EQ" + knbh
			}, function(data) {
				for(var k in data.data[0]) {
					$("#tp" + k).html(data.data[0][k])
				}
			})
			postData("wwGetDataList", {
				TblNum: "178",
				T17812: "EQ" + knbh,
				orderby: "记录时间 desc"
			}, function(data) {
				for(var k in data.data[0]) {
					$("#tp" + k).html(data.data[0][k])
				}

			})
			//获取现状和拓片的图片
			var carrierType = ['现状', '拓片'];
			for(let m = 0; m < carrierType.length; m++) {
				postData("wwGetDataList", {
					TblNum: "104",
					T1042: "EQ" + knbh,
					T10441: "EQ" + carrierType[m]
				}, function(data) {
					$("#" + carrierType[m]).attr("src", data.data[0]['图片地址'].split(",")[0])
				})
			}
			SetQRurl(knbh, "detail")
		}

	})

}