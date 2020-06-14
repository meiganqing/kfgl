$(function() {
	layui.use(['element', 'table', 'layer', 'form'], function() {
		echoData()
	})
})

function echoData() { //回显数据
	var editId = window.location.href.getQuery("id")

	if(editId) {

		$("#ckxq").html("查看详情")
		//请求数据
		postData("wwGetDataList", {
			TblNum: "305",
			T3056: "EQ" + editId,
			//			T3052:"EQ测试库"
		}, function(data) {
			for(var k in data.data[0]) {
				if(data.data[0][k] == "NULL") {
					$("#XDLM" + k).html("")

				} else {
					$("#XDLM" + k).html(data.data[0][k])

				}

			}
			SetQRurl(data.data[0]['文物库内编号'],"detail");
			showPicture(data.data[0]['图片地址'], "picBody") //获取图片
			//文物入库表，文物入库流水记录
			//获取出入库记录数据
			postData("wwGetDataList", {
				TblNum: "178",
				T17812: "EQ" + data.data[0]['文物库内编号'],
				orderby: '记录时间 desc'
			}, function(data) {
				var dataJL = data.data;
				var html = "";
				var liushuiNumArry = []
				for(var i = 0; i < data.data.length; i++) {
					html += `<tr id="${data.data[i].id}">
								<td ><img id="${data.data[i]['记录表流水号'].replace(/\(/g,"").replace(/\)/g,"")}" src="" alt="" /></td>
								<td id="库房名">${data.data[i]['库房名']}</td>
								<td id="记录时间">${data.data[i]['记录时间']}</td>
								<td id="记录类型">${data.data[i]['记录类型']}</td>
								<td id="监督人">${data.data[i]['监督人']}</td>
								<td id="移交人">${data.data[i]['移交人']}</td>
							</tr>`;
					liushuiNumArry.push(data.data[i]['记录表流水号'])
				}
				$("#recordList").append(html)
				//请求缩略图的数据
					postData("wwGetDataList", {
					TblNum: "119",
					T1193: "in(" + liushuiNumArry.join(",") + ")"
				}, function(dataPic) {

					if(dataPic.success) {

						if(dataPic.data.length > 0) {

							for(var i = 0; i < dataPic.data.length; i++) {
								
								$("#"+data.data[i]['记录表流水号'].replace(/\(/g,"").replace(/\)/g,"")).attr("src", dataPic.data[i]['图片地址'].split(",")[0])
							}
						}
					}
				})

			})
			//位置
			postData("GetStorageInfo", {
				mCurrentStorage:getCookieName("mCurrentStorage")
			}, function(dataPosition) {
				for(var i = 0; i < dataPosition.data.length; i++) {
					dataPosition.data[i]['分层集合'].reverse();

					dataPosition.data[i].currentgj = data.data[0]['柜架号']
					dataPosition.data[i].currentch = data.data[0]['层号']
					dataPosition.data[i].currentfq = data.data[0]['分区号']


					if(dataPosition.data[i]['柜架号'] == data.data[0]['柜架号']) {

						showTpl(dataPosition.data[i])
					}

				}
			})

		})
	
				
	}
}

function showTpl(data) {
	layui.use("laytpl", function() {
		var laytpl = layui.laytpl;
		var getTpl = tpldemo.innerHTML
		laytpl(getTpl).render(data, function(html) {
			$("#scanPosition").append(html)
		});
	})

}
function setKrColor(d, gj, ch, fq) {
	var color_ = ""
	if(d.currentgj == gj && d.currentch == ch && d.currentfq == fq) {

		color_ = "#62B4AD"
	}
	return color_
}