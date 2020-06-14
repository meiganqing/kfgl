var limit = 20;
var t = null;
var colorListArry = ["#46A7ED", "#37BDC3", "#B6D858", "#96C025", "#E583AA", "#90C6ED", "#6CBFD6", "#E583AA", "#90C6ED"];
var chartTypeArry = ["移交", "文物修复", "资料整理", "其他原因", "文物出展", "文物拍照"];
var yearChartTypeArry = ["入库", "出库", "待入库", "待出库"];
var myChartchartyearWW = echarts.init(document.getElementById("chartyearWW")),
	myChartchartchartyearTP = echarts.init(document.getElementById("chartyearTP")),
	chartStatus = echarts.init(document.getElementById("chart1"))
$(function() {

	layui.use(["form", "laydate", "element"], function() {
		var form = layui.form,
			laydate = layui.laydate,
			tabx = layui.tabb,
			element = layui.element;

		laydate.render({
			elem: '#calendarww',
			type: 'year',
			value: currentYear() * 1 + 1,
			done: function(value, date) {
				getYearDate(value, "文物登记表", myChartchartyearWW)
			}
		});
		laydate.render({
			elem: '#calendartp',
			type: 'year',
			value: currentYear() * 1 + 1,
			done: function(value, date) {
				getYearDate(value, "拓片资料列表", myChartchartchartyearTP);
			}
		});
		postData('GetIndexStatistics', {
			"storage": getCookieName("mCurrentStorage")
		}, function(data) {
			getIndexTop(data)

		}, "", true);
		postData("ReviseStatistics", {
				mCurrentStorage:getCookieName("mCurrentStorage")
		})
		getStatusList();
		getYearDate(currentYear() * 1 + 1, "拓片资料列表", myChartchartchartyearTP);
		getYearDate(currentYear() * 1 + 1, "文物登记表", myChartchartyearWW);

	})

})

function newTab(url, tit) {
	if(top.layui.index) {
		top.layui.index.openTabsPage(url, tit)
	} else {
		window.open(url)
	}
}

function getYearDate(year, name, id) { //获取拓片月份统计表
	var datark = [],
		datack = [],
		datadrk = [],
		datadck = [],
		datax = []
	postData("GetMonthStatistics", {
		"year": year,
		"tongjiFlg": name,
		"storage": getCookieName("mCurrentStorage"),
		mCurrentStorage:getCookieName("mCurrentStorage")
	}, function(data) {

		for(var i = 0; i < data.data.length; i++) {
			datark.push(data.data[i]['入库']);
			datack.push(data.data[i]['出库']);
			datadrk.push(data.data[i]['待入库']);
			datadck.push(data.data[i]['待出库']);
			datax.push(data.data[i]['月份'])
		}
		getChartxx(id, datax, [datark, datack, datadrk, datadck], yearChartTypeArry, 'line')
	}, "", false)
}

function getStatusList() {
	postData("wwGetDataList", {
		TblNum: 178,
		T17810: "EQ入库",
		select: "top 7 *",
		T1782: "EQ" + getCookieName("mCurrentStorage")
	}, function(data) {
		layorderInformation(data.data);
	})
	postData("wwGetDataList", {
		TblNum: 178,
		T17810: "=出库 OR =拒绝出库",
		select: "top 7 *",
		T1782: "EQ" + getCookieName("mCurrentStorage")
	}, function(data) {
		layorderInformationOutside(data);
	})
	postData("wwGetDataList", {
		TblNum: 195,
		T1952: "EQ" + getCookieName("mUserName"),
		select: "top 8 *",
		T19512:"EQ"+ getCookieName("mUserName")
	}, function(data) {
		modifyInformation(data.data)
	})
}

//页面头部模块
function getIndexTop(data) {

	if(data.success) {
		var items = data.data;
		total = 0,
			zknum = 0,
			chart1Data = [],
			chart2Data = [],
			sumNumww = 0, sumNumtp = 0, inStorkeNumww = 0, inStorkeNumtp = 0

		for(var k = 0; k < chartTypeArry.length; k++) {

			var dataObj1 = {
				"xdata": chartTypeArry[k],
				"ydata": 0
			}
			var dataObj2 = {
				"xdata": chartTypeArry[k],
				"ydata": 0
			}
			chart1Data.push(dataObj1)
			chart2Data.push(dataObj2)
		}
		for(var i = 0; i < items.length; i++) {
			if(items[i]['统计表区分'] == "文物登记表") {
				chart1Data.filter(function(key, val) {

					if(key.xdata == items[i].统计区分) {

						chart1Data[val].ydata = items[i]['统计值']
					}

				})

			} else if(items[i]['统计表区分'] == "拓片资料列表") {

				chart2Data.filter(function(key, val) {
					if(key.xdata == items[i].统计区分) {

						chart2Data[val].ydata = items[i]['统计值']
					}

				})
			}
			switch(items[i]['统计区分']) {
				case "在库":
					if(items[i]['统计表区分'] == "文物登记表") {

						$("#inStorkeNumww").html(items[i]['统计值'])
						sumNumww = Number(sumNumww) + Number(items[i]['统计值'])
					} else if(items[i]['统计表区分'] == "拓片资料列表") {
						$("#inStorkeNumtp").html(items[i]['统计值'])
						sumNumtp = Number(sumNumtp) + Number(items[i]['统计值'])
					}
					break;
				case '待入库':
					if(items[i]['统计表区分'] == "文物登记表") {
						$("#insideNumww").html(items[i]['统计值'])

					} else if(items[i]['统计表区分'] == "拓片资料列表") {
						$("#insideNumtp").html(items[i]['统计值'])
					}
					break;
				case '待出库':
					if(items[i]['统计表区分'] == "文物登记表") {
						$("#outsideNumww").html(items[i]['统计值'])
						sumNumww = Number(sumNumww) + Number(items[i]['统计值'])
					} else if(items[i]['统计表区分'] == "拓片资料列表") {
						sumNumtp = Number(sumNumtp) + Number(items[i]['统计值'])
						$("#outsideNumtp").html(items[i]['统计值'])
					}
					break;
			}
		}
		$("#sumNum").html(Number(sumNumtp) + Number(sumNumww))
		$("#inStorkeNum").html(Number($("#inStorkeNumww").html()) + Number($("#inStorkeNumtp").html()))
		$("#outsideNum").html(Number($("#outsideNumww").html()) + Number($("#outsideNumtp").html()))
		$("#insideNum").html(Number($("#insideNumww").html()) + Number($("#insideNumtp").html()))
		$("#sumNumtp").html(sumNumtp);
		$("#sumNumww").html(sumNumww);

		var datay1 = [],
			datay2 = [];
		for(var i = 0; i < chart1Data.length; i++) {
			datay1.push(chart1Data[i].ydata)
			datay2.push(chart2Data[i].ydata)
		}
		getChartxx(chartStatus, chartTypeArry, [datay1, datay2], ["文物登记表", "拓片资料列表"], "bar")
	}

}
//修改记录展示
function modifyInformation(data) {
	var html = "";
	html += '<li class="layui-layorder">' +
		'<span class="layorder">登记名称</span>' +
		'<span class="layorderGY">文物库内编号</span>' +
		'<span class="layorderDy">当前状态</span>' +
		'</li>'
		if(data.length>0){
			for(var i = 0; i < data.length; i++) {

		html += '<li class="layui-layorder">' +

			'<span class="layorder"><i class="number-list" style="background-color:' + colorListArry[i] + '" >' + (i * 1 + 1) + '</i><b onClick=lookDeatail("'+data[i]['文物库内编号']+'")>' + data[i]['登记名称'] + '</b></span>' +
			'<span class="layorderGY">' + data[i]['文物库内编号'] + '</span>' +
			'<span class="layorderDy">' + data[i]['当前状态'] + '</span>' +
			'</li>'
	}
		}else {
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
	if(data.length>0){
		for(var i = 0; i < data.length; i++) {

		html += '<li class="layui-layorder">' +

			'<span class="layorder"><i class="number-list" style="background-color:' + colorListArry[i] + '" >' + (i * 1 + 1) + '</i><b onClick=lookDeatail("'+data[i]['文物库内编号']+'")>' + data[i]['记录表流水号'] + '</b></span>' +
			'<span class="layorderGY">' + data[i]['记录时间'] + '</span>' +
			'<span class="layorderDy">' + data[i]['记录类型'] + '</span>' +
			'</li>'
	}
	}else {
			html += '<li><div style="text-align: center;"><img src="./images/nothing.png" alt="" style="margin-top:70px"/></div></li>'
	}

	$("#layorderUl").html(html);
}
//出库最新记录信息展示
function layorderInformationOutside(data) {
	var data = data.data;
	var html = "";
	html += '<li class="layui-layorder">' +
		'<span class="layorder" >记录表流水号</span>' +
		'<span class="layorderGY">记录时间</span>' +
		'<span class="layorderDy">记录类型</span>' +
		'</li>'
	if(data.length>0){
		for(var i = 0; i < data.length; i++) {
		html += '<li class="layui-layorder">' +

			'<span class="layorder"><i class="number-list" style="background-color:' + colorListArry[i] + '" >' + (i * 1 + 1) + '</i><b onClick=lookDeatail("'+data[i]['文物库内编号']+'")>' + data[i]['记录表流水号'] + '</b></span>' +
			'<span class="layorderGY">' + data[i]['记录时间'] + '</span>' +
			'<span class="layorderDy">' + data[i]['记录类型'] + '</span>' +
			'</li>'
	}
	}else {
			html += '<li><div style="text-align: center;"><img src="./images/nothing.png" alt="" style="margin-top:70px"/></div></li>'
	}

	$("#layorderUlOutside").html(html);
}

function getChartxx(myChartInit, datax, datay, charttype, type) {

	var colorList = ['#46A7ED', '#AFD548'];
	var yDdata = [];
	var datax = datax; //x轴
	for(var i = 0; i < datay.length; i++) {
		yDdata.push({
			name: charttype[i],
			type: type,
			data: datay[i],
			itemStyle: {
				normal: {
					barBorderRadius: 5,
					color: colorList[i]
				}
			},
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
		title: {
			text: '统计图'
		},
		tooltip: {},
		legend: {
			data: charttype
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

function lookDeatail(knbh) {

	postData("wwGetDataList", {
		TblNum: "385",
		T3852: "EQ" + knbh
	}, function(retrunData) { //区分拓片表和文物列表
		if(retrunData.data[0]['表对应码'] == "305") {
			openWindow(2, './Page/knww/page/wwjcxx.html?TblNum=' + retrunData.data[0]['表对应码'] + '&knbh=' + knbh, "详情", $(window).width(), $(window).height());

		} else if(retrunData.data[0]['表对应码'] == "386") {
			openWindow(2, './Page/knww/page/carrierDetail.html?TblNum=' + retrunData.data[0]['表对应码'] + '&knbh=' + knbh, "详情", $(window).width(), $(window).height());

		}

	})

}