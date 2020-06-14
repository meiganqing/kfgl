
var t = null;
var colorListArry = ["#ac6c43", "#FF9F7F", "#FFDB5C", "#67E0E3", "#E583AA", "#90C6ED", "#6CBFD6", "#E583AA", "#90C6ED"];
var colorListArry2 = ["#f6eedd", "#F5B9A7", "#F2E0A2", "#B2F2F2", "#A2D8F5", "#A2D8F5", "#A2D8F5"]
var chartTypeArry = ["移交", "文物修复", "资料整理", "其他原因", "文物出展", "文物拍照", "调拨"];
var yearChartTypeArry = ["入库", "出库", "待入库", "待出库"];

var myChartchartyearWW,
    myChartchartchartyearTP,
    myChartAllStore,
    chartStatus;

layui.use(["form", "laydate", "element"], function () {

    var form = layui.form,
        laydate = layui.laydate,
        tabx = layui.tabb,
        element = layui.element;

        myChartchartyearWW = echarts.init(document.getElementById("chartyearWW")),
        myChartchartchartyearTP = echarts.init(document.getElementById("chartyearTP")),
        myChartAllStore = echarts.init(document.getElementById("chartAllStore")),
        chartStatus = echarts.init(document.getElementById("chart1"))

    laydate.render({
        elem: '#calendarww',
        type: 'year',
        value: currentYear() * 1 + 1,
        done: function (value, date) {
            getYearDate(value, "文物登记表", myChartchartyearWW)
        }
    });
    laydate.render({
        elem: '#calendartp',
        type: 'year',
        value: currentYear() * 1 + 1,
        done: function (value, date) {
            getYearDate(value, "拓片资料列表", myChartchartchartyearTP);
        }
    });

    if (SysConfig.UserInfo.GetCookieName("kflx") == "文物") {
        $(".tp-display").addClass("layui-hide")
        $(".ww-display").removeClass("layui-hide")
    } else {
        $(".ww-display").addClass("layui-hide")
        $(".tp-display").removeClass("layui-hide")
    }


    	// 出库事由统计图
		var reData_TJ = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
			XDLMCID: "8000",
			XDLMSID: "DYBH2020042214394407995411",
			XDLMTID: "8001",
			XDTJLX:'count',
			XDTJMC:"记录类型",
			XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),

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


  




    //获取库房库存状态统计数据
    var reData_KCZT = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "8000",
        XDLMSID: "DYBH2020041512142504630421",
        XDLMTID: "8001",
        XDTJLX: "sum",
        XDTJMC: "数量",
        XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage")
    });
    if (reData_KCZT.success) {
        getIndexTop(reData_KCZT)
    }



    //校正数据
    SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "9000",
        XDLMTID: "9204",
        XDLMSID: "9204012",
        mCurrentStorage: SysConfig.UserInfo.GetCookieName("mCurrentStorage")

    });

 
   // getStatusList();
    getYearDate(currentYear() * 1 + 1, "拓片资料列表", myChartchartchartyearTP);
    getYearDate(currentYear() * 1 + 1, "文物登记表", myChartchartyearWW);


    
    //获取全库房统计数据
    var reData_qktj = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH2020053017213105701167",
        XDLMA:SysConfig.UserInfo.GetCookieName("kflx")
        // XDLMTID: "8001",
        // XDTJLX: "count",
        // XDTJMC: "库房名",
    });

    if (reData_qktj.success) {
        let namrkf=[]
        let datanum=[]
        for(let i=0;i<reData_qktj.rows.length;i++){
            namrkf.push(reData_qktj.rows[i].库房名)
            datanum.push(reData_qktj.rows[i].数量)
        }
    
        getChartAllStore(myChartAllStore, namrkf, datanum)
    }


})


//全局统一调用,同步
function postData_header(mActionType, mActionData, callback, _url, async_, type) {
    console.log(11231)

    var url_ = "",
        type_;
    if (_url) {
        url_ = _url;
    } else {
        url_ = ip_url;
    }
    if (type) {
        type_ = "&" + type
    } else {
        type_ = "&sykf=SYKFGL"
    }
    if (mActionType) {
        url_ = url_ + "?XAction=" + mActionType + type_
    }
    var async = true;
    if (async_ == false) {
        async = async_;
    }

    var rv;
    var index33;
    try {
        $.ajax({
            async: async,
            cache: false,
            type: "post",
            url: url_,
            data: mActionData, // $('#mkufang').val() 
            dataType: 'json',
            headers: {
                Authorization: getToken() //登录后返回sytoken
            },
            success: function (returnValue) {

                if (returnValue.success || returnValue.msg) {

                    if (callback) {
                        callback(returnValue, this)
                    }
                    rv = returnValue
                } else {
                    rv = returnValue.message;

                    if (rv == "NOTLOGIN") {

                        var isQcode = window.location.href.getQuery("ewm"); //是否手机打开的

                        if (isQcode) {

                            window.location.href = window.location.origin + basePageUrl + "/login-app.html?nextUrl=" + escape(window.location.href)
                        } else {
                            //							parent.location.href = "/SYKFGL/login.html"
                        }
                    } else {
                        layer.msg(rv)
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                rv = XMLHttpRequest.responseText;
                layer.msg(rv)
            }
        });
    } catch (e) {
        console.log(88888)
        rv = e.message;
    }
    return rv;
}

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
        mCurrentStorage: SysConfig.UserInfo.GetCookieName("mCurrentStorage")

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

function getStatusList() {
    postData("wwGetDataList", {
        TblNum: 178,
        T17810: "EQ入库",
        select: "top 7 *",
        T1782: "EQ" + getCookieName("mCurrentStorage")
    }, function (data) {
        layorderInformation(data.data);
    })
    postData("wwGetDataList", {
        TblNum: 178,
        T17810: "=出库 OR =拒绝出库",
        select: "top 7 *",
        T1782: "EQ" + getCookieName("mCurrentStorage")
    }, function (data) {
        layorderInformationOutside(data);
    })
    postData("wwGetDataList", {
        TblNum: 195,
        T1952: "EQ" + getCookieName("mUserName"),
        select: "top 7 *",
        // T19512: "EQ" + getCookieName("mCurrentStorage")
        orderby: "申请更改时间 DESC"
    }, function (data) {
        modifyInformation(data.data)
    })
}

//页面头部模块
function getIndexTop(data) {

    if (data.success) {
        
        total = 0,
            zknum = 0,
            
            sumNumww = 0, sumNumtp = 0, inStorkeNumww = 0, inStorkeNumtp = 0

    
        for (var i = 0; i < data.category.length; i++) {
       

    
            //}
            switch (data.category[i]) {
                case "在库":
                    $("#inStorkeNumww").html(data.series[0].data[i]);
                    //if (items[i]['统计表区分'] == "文物登记表") {

                    //    $("#inStorkeNumww").html(items[i]['统计值'])
                    //    //						sumNumww = Number(sumNumww) + Number(items[i]['统计值'])
                    //} else if (items[i]['统计表区分'] == "拓片资料列表") {
                    //    $("#inStorkeNumtp").html(items[i]['统计值'])
                    //    //						sumNumtp = Number(sumNumtp) + Number(items[i]['统计值'])
                    //}
                    break;
                case '待入库':
                    $("#insideNumww").html(data.series[0].data[i]);
                    //if (items[i]['统计表区分'] == "文物登记表") {
                    //    $("#insideNumww").html(items[i]['统计值'])

                    //} else if (items[i]['统计表区分'] == "拓片资料列表") {
                    //    $("#insideNumtp").html(items[i]['统计值'])
                    //}
                    break;
                case '待出库':
                    $("#outsideNumww").html(data.series[0].data[i]);
                    //if (items[i]['统计表区分'] == "文物登记表") {
                    //    $("#outsideNumww").html(items[i]['统计值'])
                    //    //						sumNumww = Number(sumNumww) + Number(items[i]['统计值'])
                    //} else if (items[i]['统计表区分'] == "拓片资料列表") {
                    //    //						sumNumtp = Number(sumNumtp) + Number(items[i]['统计值'])
                    //    $("#outsideNumtp").html(items[i]['统计值'])
                    //}
                    break;
                case '修改中':
                    $("#ApprovalPendingNum").html(data.series[0].data[i]);
                    break;
                default:
                   // sumNumww = Number(sumNumww) + Number(data.series[0].data[i])
                    break
            }
            sumNumww = Number(sumNumww) + Number(data.series[0].data[i])
        }
        debugger;
    
        if (SysConfig.UserInfo.GetCookieName("kflx") == "文物") {
            $("#sumNum").html(Number(sumNumtp) + Number(sumNumww))
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


//修改记录展示
function modifyInformation(data) {
    var html = "";
    html += '<li class="layui-layorder">' +
        '<span class="layorder">登记名称</span>' +
        '<span class="layorderGY">文物库内编号</span>' +
        '<span class="layorderDy">申请更改时间 - 当前状态</span>' +
        '</li>'
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {

            html += '<li class="layui-layorder">' +

                '<span class="layorder"><i class="number-list" style="background-color:' + colorListArry[i] + '" >' + (i * 1 + 1) + '</i><b onClick=lookDeatail("' + data[i]['文物库内编号'] + '")>' + data[i]['登记名称'] + '</b></span>' +
                '<span class="layorderGY">' + data[i]['文物库内编号'] + '</span>' +
                '<span class="layorderDy">' + data[i]['申请更改时间'] + ' - ' + data[i]['当前状态'] + '</span>' +
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
    var data = data.data;
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

function getChartAllStore(myChartInit, dataAxis, data) {
    var yMax = 500;
    var dataShadow = [];

    for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
    }
    var option = {
        grid: {
            left: '3%',
            right: '4%',
            bottom: '50px',
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
            data: dataAxis,
            axisLabel: {

                textStyle: {
                    color: '#000'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            z: 10
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#999'
                }
            }
        },
        dataZoom: [{
            type: ''
        }],
        series: [{ // For shadow
            type: 'bar',
            itemStyle: {
                normal: {
                    color: 'rgba(0,0,0,0.05)'
                }
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            data: dataShadow,
            animation: false
        },
        {
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1, [{
                            offset: 0,
                            color: '#EAC979'
                        },
                        {
                            offset: 0.5,
                            color: '#F0DEAD'
                        },
                        {
                            offset: 1,
                            color: '#F7EFDD'
                        }
                    ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1, [{
                            offset: 0,
                            color: '#2378f7'
                        },
                        {
                            offset: 0.7,
                            color: '#2378f7'
                        },
                        {
                            offset: 1,
                            color: '#83bff6'
                        }
                    ]
                    )
                }
            },
            data: data
        }
        ]
    };
    console.log(myChartInit)
    // Enable data zoom when user click bar.
    var zoomSize = 10;
    myChartInit.on('click', function (params) {
        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        myChartInit.dispatchAction({
            type: 'dataZoom',
            startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        });
    });

    myChartInit.setOption(option);
}

function getChartxx(myChartInit, datax, datay, charttype, type) {

    var colorList = ['#ac6c43', '#AFD548'];
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

function lookDeatail(knbh) {

    postData("wwGetDataList", {
        TblNum: "385",
        T3852: "EQ" + knbh
    }, function (retrunData) { //区分拓片表和文物列表
        if (retrunData.data[0]['表对应码'] == "305") {
            openWindow(2, './Page/knww/page/wwjcxx.html?TblNum=' + retrunData.data[0]['表对应码'] + '&knbh=' + knbh, "详情", $(window).width(), $(window).height());

        } else if (retrunData.data[0]['表对应码'] == "386") {
            openWindow(2, './Page/knww/page/carrierDetail.html?TblNum=' + retrunData.data[0]['表对应码'] + '&knbh=' + knbh, "详情", $(window).width(), $(window).height());

        }

    })

}
function currentYear() {
    var d = new Date(),
        str = '';
    str += d.getFullYear() - 1;
    return str;
}

// function newTab(url, tit) {
// 	if(top.layui.index) {
// 		top.layui.index.openTabsPage(url, tit)
// 	} else {
// 		window.open(url)
// 	}
// }