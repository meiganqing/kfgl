var limit = 20;
var t = null;
//var colorListArry = ["#6CBFD6", "#E583AA", "#90C6ED", "#6CBFD6", "#E583AA", "#90C6ED", "#6CBFD6", "#E583AA", "#90C6ED"];
var colorListArry = ["#46A7ED", "#FF9F7F", "#FFDB5C", "#67E0E3", "#E583AA", "#90C6ED", "#6CBFD6", "#E583AA", "#90C6ED"];
var colorListArry2 = ["#A2D8F5", "#F5B9A7", "#F2E0A2", "#B2F2F2", "#A2D8F5", "#A2D8F5", "#A2D8F5"]
var chartTypeArry = ["移交", "文物修复", "资料整理", "其他原因", "文物出展", "文物拍照"];
var yearChartTypeArry = ["入库", "出库", "待入库", "待出库"];

var myChartchartyearWW = echarts.init(document.getElementById("chartyearWW")),
	myChartchartchartyearTP = echarts.init(document.getElementById("chartyearTP")),
	chartStatus = echarts.init(document.getElementById("chart1"))

$(function () {

	layui.use(["form", "laydate", "element"], function () {
		var form = layui.form,
			laydate = layui.laydate,
			tabx = layui.tabb,
			element = layui.element;

		//校正数据
		SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
			XDLMCID: "9000",
			XDLMTID: "9204",
			XDLMSID: "9204012",
			mCurrentStorage: SysConfig.UserInfo.GetCookieName("mCurrentStorage")
		});


		// 文物登记表日期
		laydate.render({
			elem: '#calendarww',
			type: 'year',
			value: currentYear() * 1 + 1,
			done: function (value, date) {
				getYearDate(value, "文物登记表", myChartchartyearWW)
			}
		});


		// 拓片资料表日期
		laydate.render({
			elem: '#calendartp',
			type: 'year',
			value: currentYear() * 1 + 1,
			done: function (value, date) {
				getYearDate(value, "拓片资料列表", myChartchartchartyearTP);
			}
		});

		// 判断当前库房是文物还是拓片
		if (SysConfig.UserInfo.GetCookieName("kflx") == "文物") {
			$(".tp-display").addClass("layui-hide")
			$(".ww-display").removeClass("layui-hide")
		} else {
			$(".ww-display").addClass("layui-hide")
			$(".tp-display").removeClass("layui-hide")
		}
		//

		//头部数据获取库房库存状态统计数据
		var reData_KCZT = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
			XDLMCID: "8000",
			XDLMSID: "DYBH2020041512142504630421",
			XDLMTID: "8001",
			XDTJLX: "sum",
			XDTJMC: "数量",
		});
		if (reData_KCZT.success) {
			getIndexTop(reData_KCZT)
		}

		// 第二个统计图
		// 获取库房库存状态统计数据
		var reData_TJ = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
			XDLMCID: "8000",
			XDLMSID: "DYBH2020042214394407995411",
			XDLMTID: "8001",
			XDTJLX:'count',
			XDTJMC:"记录类型",
			// XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),

		});
		if (reData_TJ.success) {
			console.log(reData_TJ)
			let	chart1DataX = [];//文物
			let	chart1DataY = [];//文物
			
			let xname=reData_TJ.category;
			let yname=reData_TJ.series[0];
			for (var k = 0; k < reData_TJ.category.length; k++) {
				
					chart1DataX.push(xname[k])
					chart1DataY.push(yname.data[k])
			
				

				}
			
			    // 统计
			    if ($(".tp-display").hasClass("layui-hide")) { //文物
			        getChartxx(chartStatus, chart1DataX, [chart1DataY], ["文物登记表"], "bar")
			    } else { //拓片
			        getChartxx(chartStatus, chart1DataX, [chart1DataY], ["拓片资料列表"], "bar")
				}	

		}

		//

		//入库流水记录，出库流水记录
		getStatusList();
		//拓片 统计 图
		getYearDate(currentYear() * 1 + 1, "拓片资料列表", myChartchartchartyearTP);
		//文物 统计 图
		getYearDate(currentYear() * 1 + 1, "文物登记表", myChartchartyearWW);




	})

})



function newTab(url, tit) {
	if (top.layui.index) {
		top.layui.index.openTabsPage(url, tit)
	} else {
		window.open(url)
	}
}

//拓片统计

function getYearDate(year, name, id) { //获取拓片月份统计表
	var datark = [],
		datack = [],
		datadrk = [],
		datadck = [],
		datax = []

	var tongji = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
		XDLMCID: "9000",
		XDLMTID: "9204",
		XDLMSID: "9204011",
		"year": year,
		"tongjiFlg": name,

	});
	if (tongji.success) {
		for (var i = 0; i < tongji.rows.length; i++) {
			datark.push(tongji.rows[i]['入库']);
			datack.push(tongji.rows[i]['出库']);
			datadrk.push(tongji.rows[i]['待入库']);
			datadck.push(tongji.rows[i]['待出库']);
			datax.push(tongji.rows[i]['月份'] + "月份")
		}
		debugger;
		getChartxx(id, datax, [datark, datack, datadrk, datadck], yearChartTypeArry, 'line')
	}




}


//入库流水记录
function getStatusList() {

	let reData_jlrk = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
		XDLMCID: "1001",
		XDLMSID: "DYBH20190823124628462810231",
		// XDLMB: "新入库,归还入库",//记录类型
		XDLMD: "入库",//操作类型

	});
	if (reData_jlrk.success) {

		layorderInformation(reData_jlrk.rows);
	}





	let reData_jlck = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
		XDLMCID: "1001",
		XDLMSID: "DYBH20190823124628462810231",
		// XDLMB: "移交,移库,其他原因",//记录类型
		XDLMD: "出库,拒绝出库",//操作类型
	});
	if (reData_jlck.success) {
		layorderInformationOutside(reData_jlck.rows);
	}

}

//页面头部模块
function getIndexTop(data) {

	if (data.success) {

		total = 0,
			zknum = 0,

			sumNumww = 0, sumNumtp = 0, inStorkeNumww = 0, inStorkeNumtp = 0


		for (var i = 0; i < data.category.length; i++) {
			switch (data.category[i]) {
				case "在库":
					$("#inStorkeNumww").html(data.series[0].data[i]);

					break;
				case '待入库':
					$("#insideNumww").html(data.series[0].data[i]);

					break;
				case '待出库':
					$("#outsideNumww").html(data.series[0].data[i]);

					break;
				case '修改中':
					$("#ApprovalPendingNum").html(data.series[0].data[i]);
					break;
				default:

					break
			}
			sumNumww = Number(sumNumww) + Number(data.series[0].data[i])
		}
		debugger;
	
        if (SysConfig.UserInfo.GetCookieName("kflx") == "文物") {
            $("#sumNum").html(Number(sumNumtp) + Number(sumNumww))//数据库总数
            $("#inStorkeNum").html(Number($("#inStorkeNumww").html()) + Number($("#inStorkeNumtp").html()))//在库总数
            $("#outsideNum").html(Number($("#outsideNumww").html()) + Number($("#outsideNumtp").html()))
            $("#insideNum").html(Number($("#insideNumww").html()) + Number($("#insideNumtp").html()))
            $("#sumNumtp").html(sumNumtp);
            $("#sumNumww").html(sumNumww);

        }else{
            $("#sumNumtp").html(Number(sumNumtp) + Number(sumNumww))//数据库总数
            $("#inStorkeNumtp").html(Number($("#inStorkeNumww").html()) + Number($("#inStorkeNumtp").html()))//在库总数
            $("#outsideNumtp").html(Number($("#outsideNumww").html()) + Number($("#outsideNumtp").html()))
            $("#insideNumtp").html(Number($("#insideNumww").html()) + Number($("#insideNumtp").html()))
            
            // $("#sumNumww").html(sumNumww);//文物库房文物总数

        }

	}

}

//修改记录展示  暂时无展示
function modifyInformation(data) {
	var html = "";
	html += '<li class="layui-layorder">' +
		'<span class="layorder">登记名称</span>' +
		'<span class="layorderGY">文物库内编号</span>' +
		'<span class="layorderDy">当前状态</span>' +
		'</li>'
	if (data.length > 0) {
		for (var i = 0; i < data.length; i++) {

			html += '<li class="layui-layorder">' +

				'<span class="layorder"><i class="number-list" style="background-color:' + colorListArry[i] + '" >' + (i * 1 + 1) + '</i><b onClick=lookDeatail("' + data[i]['文物库内编号'] + '")>' + data[i]['登记名称'] + '</b></span>' +
				'<span class="layorderGY">' + data[i]['文物库内编号'] + '</span>' +
				'<span class="layorderDy">' + data[i]['当前状态'] + '</span>' +
				'</li>'
		}
	} else {
		html += '<li><div style="text-align: center;"><img src="./images/nothing.png" alt="" style="margin-top:70px" /></div></li>'
	}

	$("#amendmentRecord").html(html);
}

//入库最新记录信息展示
function layorderInformation(data) {
	var html = "";
	html += '<li class="layui-layorder">' +
		'<span class="layorder">记录表流水号</span>' +
		'<span class="layorderGY">记录时间</span>' +
		'<span class="layorderDy">记录类型</span>' +
		'</li>'
	if (data.length > 0) {
		for (var i = 0; i < data.length; i++) {

			html += '<li class="layui-layorder">' +

				'<span class="layorder"><i class="number-list" style="background-color:' + colorListArry[i] + '" >' + (i * 1 + 1) + '</i><b onClick=lookDeatail("' + data[i]['文物库内编号'] + '")>' + data[i]['记录表流水号'] + '</b></span>' +
				'<span class="layorderGY">' + data[i]['记录时间'] + '</span>' +
				'<span class="layorderDy">' + data[i]['记录类型'] + '</span>' +
				'</li>'
		}
	} else {
		html += '<li><div style="text-align: center;"><img src="./images/nothing.png" alt="" style="margin-top:70px"/></div></li>'
	}

	$("#layorderUl").html(html);
}


//出库最新记录信息展示
function layorderInformationOutside(data) {
	// var data = data.data;
	var html = "";
	html += '<li class="layui-layorder">' +
		'<span class="layorder" >记录表流水号</span>' +
		'<span class="layorderGY">记录时间</span>' +
		'<span class="layorderDy">记录类型</span>' +
		'</li>'
	if (data.length > 0) {
		for (var i = 0; i < data.length; i++) {
			html += '<li class="layui-layorder">' +

				'<span class="layorder"><i class="number-list" style="background-color:' + colorListArry[i] + '" >' + (i * 1 + 1) + '</i><b onClick=lookDeatail("' + data[i]['文物库内编号'] + '")>' + data[i]['记录表流水号'] + '</b></span>' +
				'<span class="layorderGY">' + data[i]['记录时间'] + '</span>' +
				'<span class="layorderDy">' + data[i]['记录类型'] + '</span>' +
				'</li>'
		}
	} else {
		html += '<li><div style="text-align: center;"><img src="./images/nothing.png" alt="" style="margin-top:70px"/></div></li>'
	}

	$("#layorderUlOutside").html(html);
}


// 图表折线，柱状统计
function getChartxx(myChartInit, datax, datay, charttype, type) {

	var colorList = ['#46A7ED', '#AFD548'];
	var yDdata = [];
	var datax = datax; //x轴
	for (var i = 0; i < datay.length; i++) {
		yDdata.push({
			name: charttype[i],
			type: type,
			data: datay[i],
			itemStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: colorListArry[i]
					}, {
						offset: 1,
						color: colorListArry2[i]
					}])
				}
			},

			areaStyle: {},
			smooth: true,
			label: {
				symbol: 'pin',
				normal: {
					show: true,
					position: 'top'
				}
			}
		})
	}
	var optionBar = {

		tooltip: {},
		legend: {
			data: charttype
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		toolbox: {
			show: true,
			feature: {
				dataZoom: {
					yAxisIndex: 'none'
				},
				dataView: {
					show: true,
					readOnly: false
				},
				magicType: {
					type: ['line', 'bar']
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		xAxis: {
			data: datax,
		},
		yAxis: {},
		series: yDdata
	};

	myChartInit.setOption(optionBar);
}

// 记录点击查看
function lookDeatail(knbh) {
	// postData("wwGetDataList", {
	// 	TblNum: "385",
	// 	T3852: "EQ" + knbh
	// }, function (retrunData) { //区分拓片表和文物列表
	// 	if (retrunData.data[0]['表对应码'] == "305") {
		if (SysConfig.UserInfo.GetCookieName("kflx") == "文物") {
			openWindow(2, '../knww/page/wwjcxx.html?&knbh=' + knbh, "详情", $(window).width(), $(window).height());

		}else{
			openWindow(2, '../knww/page/carrierDetail.html?knbh=' + knbh, "详情", $(window).width(), $(window).height());

		}

			

		// } else if (retrunData.data[0]['表对应码'] == "386") {
		
		// }

	// })

}

function currentYear() {
    var d = new Date(),
        str = '';
    str += d.getFullYear() - 1;
    return str;
}

//弹出窗口新页面
function openWindow(type, url, title, w, h, anim) {
    let maxmin = true;
    if (title == null || title == '') {
        title = false;
        maxmin = false;
    };
    if (url == null || url == '') {
        url = "/404.html";
    };
    if (w == null || w == '') {
        w = ($(window).width() - 200);
    };
    if (h == null || h == '') {
        h = ($(window).height() - 100);
    };
    if (anim == null || anim == "") {
        anim = 5
    }
    var layerPage = layer.open({
        type: type * 1,
        area: [w + 'px', h + 'px'],
        fix: false, //不固定
        maxmin: maxmin,
        shade: 0.4,
        title: title,
        content: url,
        anim: anim,
        success: function(layero, index) {
            $(window).resize(function() {
                let layerInitWidth = $("#layui-layer-iframe" + index).width()
                var docWidth = $(document).width();
                var minWidth = layerInitWidth > docWidth ? docWidth : layerInitWidth;
                layer.style(index, {
                    top: 0,
                    width: minWidth,

                });
            });
        },
        end: function() {}

    });
    return layerPage
}
