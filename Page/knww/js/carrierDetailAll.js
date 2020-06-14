var knbh = window.location.href.getQuery("knbh"),
	type = window.location.href.getQuery("type"),   //inner是文物单个出库弹出的登记表下方链接到此页面
	newrk = window.location.href.getQuery('newrk'),
	check = window.location.href.getQuery("check");
var $,from, laytpl
layui.use(["jquery", "form", "laytpl"], function() {
	laytpl = layui.laytpl, form = layui.form, $ = layui.jquery;

	echoData() //根据库内编号获取数据

	$("#printBtn").click(function() {
		$(".no-print").addClass("layui-hide")
		var tata = document.execCommand("print");
		if(tata) {
			$(".no-print").removeClass("layui-hide")

		}
	})
	$("#printBtnA5").click(function() {
		self.window.location.href = "./printA5.html?knbh=" + knbh
	})

	setTimeout(function() {
		if(type == "print") {
			$(".no-print").addClass("layui-hide");
			var tata = document.execCommand("print");
			if(tata) {
				QXALL()
				parent.QXALL()
			}
		}
	}, 2000)

})



function echoData(){
	if(type == "inner") { //嵌入式
		$(".detail-content").removeClass("layui-fluid")
		$(".inner-no-show").addClass("layui-hide");

	}
	if (knbh) {
		var tpdata = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
            XDLMCID: "1001",
            XDLMSID: "DYBH201908231246284628202221",
            // XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
            XDLMU: knbh
		});
		
		if(tpdata.success){
			for(var k in tpdata.rows[0]) {
				$("#" + k).html(tpdata.rows[0][k])
			}
			if(type == "inner") {
				parent.$("#jllsh").html(tpdata.rows[0]['记录表流水号'])
			}

			// 获取二维码
			var QRCodeImg = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
				XDLMCID: "9000",
				XDLMTID: "9204",
				XDLMSID: "9204003",
				// XDLMKFLX: SysConfig.UserInfo.GetCookieName("kflx"),
				XDLM文物库内编号: knbh
				// WWDJBID: knbh
			});
			if (typeof (QRCodeImg) == "string") {
				layer.msg(QRCodeImg);
			}

			if(newrk == "newrk") {
				$("#newrkDisplay").removeClass("layui-hide")
				//SetQRurl(data.data[0]['文物库内编号'], "detail", "qrcode2", "qrimage2")
				$("#qrimage2").attr("src", QRCodeImg.data)
	
			} else {
				$("#basicDisplay").removeClass("layui-hide")
				//SetQRurl(data.data[0]['文物库内编号'], "detail")
				$("#qrimage").attr("src", QRCodeImg.data)
			}

			// 获取附件
			var imageData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
				XDLMCID: "1001",
				XDLMSID: "DYBH20190823124628462851271",
				XDLMC: knbh,
			});
			if(imageData.success){
				for(let i in imageData.rows){
					switch(imageData.rows[i].分类){
						case "远景":
							showPicture([imageData.rows[i]], "picBody2") //获取图片
							break;
						case "近景":
							showPicture([imageData.rows[i]], "picBody3") //获取图片
							break;
						case "拓片":
							showTPPicture([imageData.rows[i]], "picBody1") //获取图片
							break;
					}
				}
			}

			// 获取柜架位置
			var positionData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "9000",
                XDLMTID: "9204",
                XDLMSID: "9204005",
                mCurrentStorage: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
			});
			console.log(positionData);
			if(positionData.success){
				for(var i = 0; i < positionData.data.length; i++) {
					positionData.data[i]['分层集合'].reverse();
					positionData.data[i].currentgj = tpdata.rows[0]['柜架号']
					positionData.data[i].currentch = tpdata.rows[0]['层号']
					positionData.data[i].currentfq = tpdata.rows[0]['分区号']
					if(positionData.data[i]['柜架号'] == tpdata.rows[0]['柜架号']) {
	
						showTpl(positionData.data[i])
					}
				}
			}

			// 获取出入库流水记录
			let tpxx_jilu = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
				XDLMCID: "1001",
				XDLMSID: "DYBH2020042016161605625408",
				// XDLMC: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
				// XDLMD: SysConfig.UserInfo.GetCookieName("kflx"),
				XDLMF: knbh
			});
			if(tpxx_jilu.success){
				var html = "";
				for(var i = 0; i < tpxx_jilu.rows.length; i++) {
					if(tpxx_jilu.rows[i]['记录类型'] == "新入库" || tpxx_jilu.rows[i]['记录类型'] == "移库") {
						for(var k in tpxx_jilu.rows[i]) {
							$("#rk" + k).html(tpxx_jilu.rows[i][k])
						}
	
					}
					html += `<tr id="${tpxx_jilu.rows[i].id}">
								<td ><img class="img-list" id="${tpxx_jilu.rows[i]['记录表流水号'].replace(/\(/g,"").replace(/\)/g,"")}" onclick=lookPic("${tpxx_jilu.rows[i]['记录图']}") src="${tpxx_jilu.rows[i]['记录图'].split(",")[0]}") alt="" /></td>
								<td id="库房名">${tpxx_jilu.rows[i]['库房名']}</td>
								<td id="记录时间">${tpxx_jilu.rows[i]['记录时间']}</td>
								<td id="记录类型">${tpxx_jilu.rows[i]['记录类型']}</td>
								<td>${tpxx_jilu.rows[i]['出库去向']}</td>
								<td>${tpxx_jilu.rows[i]['录入人']}</td>
								<td id="监督人">${tpxx_jilu.rows[i]['监督人']}</td>
								<td id="移交人">${tpxx_jilu.rows[i]['移交人']}</td>
								<td>${tpxx_jilu.rows[i]['接收人']}</td>
								<td>${tpxx_jilu.rows[i]['审核状态']}</td>
							</tr>`;
				}
				$("#recordList").append(html);
				
				
			}

		}
	}
}


function showTPPicture(imgArry, id, width, height) { //查看详情显示图片
	var width_ = width ? width : 96;
	var height_ = height ? height : 96;
	if(imgArry) {
		var html = "";
		if(imgArry.length > 0) {

			for(var i = 0; i < imgArry.length; i++) {
				html += `<div class="imgDiv" style="cursor: pointer;">
												<div class="layadmin-homepage-pad-ver  tp-div tp-img"  onclick=lookPic("${imgArry[i].图片地址}","${imgArry[i].图片类型}")>
													<img data-title="查看详情" class="layadmin-homepage-pad-img" src="${imgArry[i].图片地址}" style="max-width:${width_}px;max-height:${height_}px">
												</div>
												<div class="tp-div tp-word">
												<a href="${imgArry[i].图片地址}" id="downLoad" class="download" download="${imgArry[i].图片地址}"/>
												<a href="javascript:;" id="ttPrint" class="tt-print" onclick=printTutongBH('${imgArry[i]['图筒']}','${imgArry[i]['文物入库编号']}')></a>
														<p>图筒编号：${imgArry[i]['图筒']}</p>
														<p>拓片名称：${imgArry[i]['文图名称']}</p>
														<p>拓片编号：${imgArry[i]['图片编号']}</p>
														<p>长：${imgArry[i]['长']}</p>
														<p>宽：${imgArry[i]['宽']}</p>
													</div>
											</div>`
			}
		}
		$("#" + id).append(html)
	}
}

function showPicture(data, id) { //查看详情显示图片
	if(data) {
		if(data.length > 0) {
			var html = "";
			for(var i = 0; i < data.length; i++) {
				var pictureType = data[i]['图片类型'];
				html += `<div class="imgDiv" style="cursor: pointer;width:128px;
			height:128px;
			display: flex;
			align-items: center;">
						<div class="layadmin-homepage-pad-ver"  onclick="lookPic('${data[i]['图片地址']}','${pictureType}')">
						<img data-title="查看详情" class="layadmin-homepage-pad-img" src="${data[i]['图片地址']}" style="max-width:96px;max-height:96px;">
						</div>
						</div>`
			}
			$("#" + id).append(html)
		}
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

function printTutongBH(tutongBH, knbh) { //打印图筒编号
	SysConfig.ToolBox.openWindow('printTuTong.html?bh=' + tutongBH + '&knbh=' + knbh, "图筒编号打印", 350, 600);

}

function lookPic(doc) {
// function lookPic(doc, index) {
	SysConfig.ToolBox.ShowVideo("查看文件", doc, $(window).width() - 100, $(window).height() - 100);

}

function QXALL() {
    var index852 = parent.layer.getFrameIndex(window.name); //获取窗口索引
    if (parent.tableins) {
        parent.tableins.reload();
    }
    parent.layer.close(index852);
}












// var editId,
// 	knbh = window.location.href.getQuery("knbh"),
// 	type = window.location.href.getQuery("type"),   //inner是文物单个出库弹出的登记表下方链接到此页面
// 	newrk = window.location.href.getQuery('newrk'),
// 	check = window.location.href.getQuery("check");
// var $,from, laytpl
// layui.use(["jqery", "form", "laytpl"], function() {
// 	laytpl = layui.laytpl, form = layui.form, $ = layui.jquery;

// 	if(check == 1) { //所有库房拓片查看详情
// 		$('#outfile').hide();
// 	}

// 	echoData() //根据id获取数据
	
// 	// $("#outfile").click(function() {
// 	// 	postData("RubbingSaveWord", {
// 	// 		ids: editId
// 	// 	}, function(returnData) {
// 	// 		if(returnData.success || returnData.msg) {
// 	// 			layer.msg('导出完成', {
// 	// 				time: 500,
// 	// 				icon: 1
// 	// 			}, function() {
// 	// 				layer.closeAll();
// 	// 				window.location = returnData.FilePath;
// 	// 			});

// 	// 		} else {
// 	// 			layer.msg(returnData, {
// 	// 				icon: 0,
// 	// 				time: 2000
// 	// 			});

// 	// 		}
// 	// 	});
// 	// })

// 		$("#printBtn").click(function() {
// 			$(".no-print").addClass("layui-hide")
// 			var tata = document.execCommand("print");
// 			if(tata) {
// 				$(".no-print").removeClass("layui-hide")

// 			}
// 		})
// 		$("#printBtnA5").click(function() {
// 			self.window.location.href = "./printA5.html?knbh=" + knbh
// 		})
// 		setTimeout(function() {
// 			if(type == "print") {
// 				$(".no-print").addClass("layui-hide");
// 				var tata = document.execCommand("print");
// 				if(tata) {
// 					QXALL()
// 					parent.QXALL()
// 				}
// 			}
// 		}, 2000)

// 	})

// function echoData(uploadImg) { //回显数据
// 	var where = ""
// 	//	if(editId) {
// 	//		where = {
// 	//			TblNum: 386,
// 	//			T3861: "EQ" + editId
// 	//		}
// 	//	} else 
// 	if(knbh) {
// 		where = {
// 			TblNum: 386,
// 			T3862: "EQ" + knbh
// 		}
// 	}

// 	if(type == "inner") { //嵌入式
// 		$(".detail-content").removeClass("layui-fluid")
// 		$(".inner-no-show").addClass("layui-hide");

// 	}
// 	//请求数据
// 	postData("wwGetDataList", where, function(data) {

// 		editId = data.data[0].id;
// 		for(var k in data.data[0]) {
// 			$("#" + k).html(data.data[0][k])
// 		}
// 		if(type == "inner") {
// 			parent.$("#jllsh").html(data.data[0]['记录表流水号'])
// 		}
// 		knbh = data.data[0]['文物库内编号']
// 		//		if(data.data[0]['是否已拓'] == "是") {
// 		//			$("#是否已拓").html("已拓")
// 		//		} else {
// 		//			$("#是否已拓").html("未拓")
// 		//		}

// 		//回显附件

// 		//      postData("wwGetDataList", {
// 		//          TblNum: 104,
// 		//          T1042: "EQ" + data.data[0]['文物库内编号'],
// 		//          T10441: "EQ拓片",
// 		//      }, function(data1) {
// 		//          //			showTPPicture(data1.data, id, width, height)
// 		//          showTPPicture(data1.data, "picBody1") //获取图片
// 		//          if ($(document).find("#picBody4")) {
// 		//              showPicture(data1.data, "picBody4") //获取图片
// 		//          }
// 		//      })
// 		postData("wwGetDataList", {
// 			TblNum: 104,
// 			T1042: "EQ" + data.data[0]['文物库内编号'],
// 			T10441: "EQ拓片扫描件",
// 		}, function(data1) {
// 			//			showTPPicture(data1.data, id, width, height)
// 			showTPPicture(data1.data, "picBody5") //获取图片
// 			if($(document).find("#picBody4")) {
// 				showPicture(data1.data, "picBody4") //获取图片
// 			}
// 		})

// 		postData("wwGetDataList", {
// 			TblNum: 104,
// 			T1042: "EQ" + data.data[0]['文物库内编号'],
// 			T10441: "EQ拓片"
// 		}, function(data1) {
// 			showPicture(data1.data, "picBody1") //获取图片
// 		})
// 		postData("wwGetDataList", {
// 			TblNum: 104,
// 			T1042: "EQ" + data.data[0]['文物库内编号'],
// 			T10441: "EQ近景"
// 		}, function(data1) {
// 			showPicture(data1.data, "picBody3") //获取图片
// 		})
// 		postData("wwGetDataList", {
// 			TblNum: 104,
// 			T1042: "EQ" + data.data[0]['文物库内编号'],
// 			T10441: "EQ现状"
// 		}, function(data1) {
// 			showPicture(data1.data, "picBody2") //获取图片
// 		})

// 		//		postData("wwGetDataList", {
// 		//			TblNum: 104,
// 		//			T1042: "EQ" + data.data[0]['文物库内编号'],
// 		//			T10441: "EQ视频",
// 		//		}, function(data1) {
// 		//			showPicture(data.data, "picBody2") //获取图片
// 		//		})

// 		var QRCodeImg = getQRCode("386", data.data[0]['文物库内编号']);

// 		if(newrk == "newrk") {
// 			$("#newrkDisplay").removeClass("layui-hide")
// 			//SetQRurl(data.data[0]['文物库内编号'], "detail", "qrcode2", "qrimage2")
// 			$("#qrimage2").attr("src", QRCodeImg.data)

// 		} else {
// 			$("#basicDisplay").removeClass("layui-hide")
// 			//SetQRurl(data.data[0]['文物库内编号'], "detail")
// 			$("#qrimage").attr("src", QRCodeImg.data)
// 		}

// 		//获取出入库记录数据
// 		postData("wwGetDataList", {
// 			TblNum: "178",
// 			T17812: "EQ" + data.data[0]['文物库内编号'],
// 			orderby: '记录时间 desc'
// 		}, function(data) {
// 			var html = ""
// 			var liushuiNumArry = []
// 			for(var i = 0; i < data.data.length; i++) {
// 				if(data.data[i]['记录类型'] == "新入库") {
// 					for(var k in data.data[i]) {
// 						$("#rk" + k).html(data.data[i][k])
// 					}

// 				}
// 				html += `<tr id="${data.data[i].id}">
// 								<td ><img class="img-list" id="${data.data[i]['记录表流水号'].replace(/\(/g,"").replace(/\)/g,"")}" onclick=lookPic("${data.data[i]['记录图']}") src="${data.data[i]['记录图'].split(",")[0]}") alt="" /></td>
// 								<td id="库房名">${data.data[i]['库房名']}</td>
// 								<td id="记录时间">${data.data[i]['记录时间']}</td>
// 								<td id="记录类型">${data.data[i]['记录类型']}</td>
// 								<td>${data.data[i]['出库去向']}</td>
// 								<td>${data.data[i]['录入人']}</td>
// 								<td id="监督人">${data.data[i]['监督人']}</td>
// 								<td id="移交人">${data.data[i]['移交人']}</td>
// 								<td>${data.data[i]['接收人']}</td>
// 								<td>${data.data[i]['审核状态']}</td>
// 							</tr>`;
// 				liushuiNumArry.push(data.data[i]['记录表流水号'])
// 			}
// 			$("#recordList").append(html);
// 			if(liushuiNumArry.length > 0) {
// 				//请求缩略图的数据
// 				postData("wwGetDataList", {
// 					TblNum: "119",
// 					T1193: "in(" + liushuiNumArry.join(",") + ")"
// 				}, function(dataPic) {
// 					if(dataPic.success) {
// 						if(dataPic.data.length > 0) {
// 							for(var i = 0; i < dataPic.data.length; i++) {
// 								if(dataPic.data[i]['记录表流水号']) {
// 									$("#" + dataPic.data[i]['记录表流水号'].replace(/\(/g, "").replace(/\)/g, "")).attr("src", dataPic.data[i]['图片地址'].split(",")[0])
// 								}

// 							}
// 						}
// 					}
// 				})
// 			}
// 		})

// 		//位置
// 		postData("GetStorageInfo", {
// 			mCurrentStorage:getCookieName("mCurrentStorage")
// 		}, function(dataPosition) {
// 			for(var i = 0; i < dataPosition.data.length; i++) {
// 				dataPosition.data[i]['分层集合'].reverse();
// 				dataPosition.data[i].currentgj = data.data[0]['柜架号']
// 				dataPosition.data[i].currentch = data.data[0]['层号']
// 				dataPosition.data[i].currentfq = data.data[0]['分区号']
// 				if(dataPosition.data[i]['柜架号'] == data.data[0]['柜架号']) {

// 					showTpl(dataPosition.data[i])
// 				}
// 			}
// 		})

// 	})

// }



// //function lookPic(doc, index) {
// //	if(index) { //新添加的图片的查看，在函数中直接点击会陷入死循环
// //		if(index == "批次导入") {
// //			ShowVideo(false, doc, '90%', '90%', 1, true);
// //		} else if(index == "系统上传") {
// //			ShowVideo(false, doc, '90%', '90%', 1);
// //		} else {
// //			doc = fileend[index]
// //			ShowVideo(false, doc, '90%', '90%', 1);
// //		}
// //	} else {
// //		ShowVideo(false, doc, '90%', '90%', 1);
// //	}
// //
// //}



// //function setKrColor(d, gj, ch, fq) {
// //	var color_ = false
// //	console.log(d, gj, ch, fq)
// //	if(d.currentgj == gj && d.currentch == ch && d.currentfq == fq) {
// //
// //		color_ = true
// //	}
// //	return color_
// //}



