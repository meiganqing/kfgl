var myChart;
// var chartTypeArry = []
// var where = {
// 	showfieldname: "统计内容简名",
// 	tglb: "保存状态"
// }
var colorList = ['#62B9B9', '#E5D386', '#C467A2', '#AD55AD', '#DB5F5F', '#556FB2', '#99DD00', '#FF8888', '#FF3333', '#FF0000', '#CC0000', '#FFC8B4', '#FFA488', '#FFBB00', '#DDAA00', '#FFFFBB', '#FFFF77', '#00DD00', '#BBFFEE', '#77FFCC', '#33FFAA', '#00FF99', '#00DD77', '#AAFFEE', '#77FFEE', '#FF7744', '#FF5511', '#E63F00', '#FFDDAA', '#FFBB66', '#FFAA33', '#FF8800', '#EE7700', '#FFEE99', '#FFDD55', '#FFCC22', '#33FFDD', '#00FFCC', '#00DDAA', '#99FFFF', '#66FFFF', '#33FFFF', '#00FFFF', '#00DDDD', '#CCEEFF', '#77DDFF', '#33CCFF', '#009FCC', '#CCFF99', '#BBFF66', '#99FF33', '#77FF00', '#66DD00', '#99FF99', '#66FF66', '#33FF33', '#00FF00', '#FFFF00', '#EEEE00', '#EEFFBB', '#FFCCCC'];
var typeArry = ['保存状态', '年代_纪年选项A', '年代_纪年选项B', '质量_范围', '入藏时间_范围', '完残程度', '文物级别', '文物来源', "文物类别_范围", "文物类别_具体类别", "质地类别", "质地类别_单一质地_有机质", "质地类别_单一质地_无机质"];
$(document).ready(function() {
    layui.use(['table', 'form'], function() {
        var form = layui.form,
            table = layui.table;


        for (let i = 0; i < typeArry.length; i++) {
            postData("GetTongJiOfDataTable", {
                tongjiType: typeArry[i],
                mDataTableName: "文物登记表",
                whereStr: "库房名='" + getCookieName("mCurrentStorage") + "'"
            }, function(data) {

                if (typeArry[i] == '质量_范围' || typeArry[i] == '完残程度' || typeArry[i] == '文物级别') {
                    getChartBar(typeArry[i], data.data, typeArry[i], "tj");
                } else {
                    getChart(typeArry[i], data.data, typeArry[i], "tj");
                }

            })
        }


        //获取统计类型
        // postData("GetStatisticsType", {TblNum: "305",}, function (data) {
        //   getSelect("tglb", data.data, "统计项目")
        //   form.render("select")
        // });
        // postData("GetStatusStatistics", {
        //   TblNum: "305",
        // }, function (data) {
        //
        //   delete data.code
        //   delete data.success
        //   console.log(data)
        //   for (var k in data) {
        //
        //     console.log(k)
        //     switch (k) {
        //       case "文物级别":
        //       case "完残程度":
        //       case "质量_范围":
        //         getChartBar(k, data[k]);
        //         break;
        //       case "保存状态":
        //         getChartLinex(k, data[k], "line");
        //         break;
        //       default:
        //         getChartLinex(k, data[k]);
        //         break;
        //
        //     }
        //
        //   }
        //
        // })


    });
});

function getChart(id, data, xtype, ytype) {
    var datas = []; //x轴
    var sss = []; //y轴
    if (data.length > 0) {

        for (var i = 0; i < data.length; i++) {
            sss.push(data[i][ytype]);
            datas.push(data[i][xtype]);
        }
    }

    var myChart = echarts.init(document.getElementById(id));

    var optionBar = {
        title: {
            text: id
        },
        tooltip: {},
        legend: {
            data: ['']
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
            data: datas,
            axisLabel: {
                clickable: true, //并给图表添加单击事件  根据返回值判断点击的是哪里
                interval: 0,
                formatter: function(params, index) {
                        if (data.length > 5) {
                            if (index % 2 != 0) {
                                return '\n\n' + params;
                            } else {
                                return params;
                            }
                        } else {
                            return params;
                        }

                    }
                    // interval:0,
                    // rotate:40
            }
        },
        yAxis: {},
        series: [{
            name: '',
            type: 'bar',
            data: sss,
            itemStyle: {
                normal: {
                    barBorderRadius: 5,
                    color: function(params) {
                        return colorList[params.dataIndex]
                    }
                }
            },
            label: {
                symbol: 'pin',
                normal: {
                    show: true,
                    position: 'top'
                }
            }
        }]

    };

    myChart.setOption(optionBar);

}

function getChartBar(id, data, xtype, ytype) {
    var myChart = echarts.init(document.getElementById(id));

    var seriesData = [];
    var legendData = [];
    for (var i = 0; i < data.length; i++) {
        seriesData.push({
            "value": data[i][ytype],
            "name": data[i][xtype]
        });

        legendData.push(data[i][xtype])
    }

    var option = {
        title: {
            text: id,

            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: legendData
        },
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: seriesData,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]

    };
    myChart.setOption(option);
}