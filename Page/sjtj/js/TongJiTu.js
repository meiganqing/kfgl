var colorList = ['#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#c4ebad', '#96dee8', '#d87c7c', '#61a0a8', '#ffb980', '#dc69aa', '#f5994e', '#c14089', '#FFA488', '#FFBB00', '#DDAA00', '#FFFFBB', '#FFFF77', '#00DD00', '#BBFFEE', '#77FFCC', '#33FFAA', '#00FF99', '#00DD77', '#AAFFEE', '#77FFEE', '#FF7744', '#FF5511', '#E63F00', '#FFDDAA', '#FFBB66', '#FFAA33', '#FF8800', '#EE7700', '#FFEE99', '#FFDD55', '#FFCC22', '#33FFDD', '#00FFCC', '#00DDAA', '#99FFFF', '#66FFFF', '#33FFFF', '#00FFFF', '#00DDDD', '#CCEEFF', '#77DDFF', '#33CCFF', '#009FCC', '#CCFF99', '#BBFF66', '#99FF33', '#77FF00', '#66DD00', '#99FF99', '#66FF66', '#33FF33', '#00FF00', '#FFFF00', '#EEEE00', '#EEFFBB', '#FFCCCC'];
var typeArry = ['载体一类型', '载体二类型', '年代', '市', '级别', '使用用途', '所有权'];
var carrierType = ['古墓葬', '摩崖石刻', '石窟造像', '古建筑', '单体石刻'];


var myChart;
// var data;
$(document).ready(function () {

  for (let i = 0; i < typeArry.length; i++) {
    // postData('wwGetDataList', {
    // 	TblNum: "386",
    // 	select: 'distinct ' + typeArry[i] + ',count(1)',
    // 	groupby: typeArry[i],
    // 	T38672: "EQ" + getCookieName("mCurrentStorage")
    postData("GetTongJiOfDataTable", {
      tongjiType: typeArry[i],
      mDataTableName: "拓片资料列表",
      whereStr: "库房名='" + getCookieName("mCurrentStorage") + "'"
    }, function (data, that) {
      if (typeArry[i] == "所属公司" || typeArry[i] == "所有权") {
         getChart(typeArry[i], data.data, typeArry[i], "tj")
   
      } else {
        getChart(typeArry[i], data.data, typeArry[i], "tj")

      }

    });
  }

  //获取载体1类型
  for (let k = 0; k < carrierType.length; k++) {
    // postData('wwGetDataList', {
    //   TblNum: "386",
    //   select: 'distinct 载体一类型,count(1)',
    //   groupby: "载体一类型",
    //   T38672: "EQ" + getCookieName("mCurrentStorage"),
    //   T38635: "EQ" + carrierType[k]
    postData("GetTongJiOfDataTable",{
      tongjiType: "载体二类型",
      mDataTableName: "拓片资料列表",
      whereStr: "载体一类型='" + carrierType[k] + "' and 库房名='"+getCookieName("mCurrentStorage")+"'"
    }, function (data, that) {
      getChart(carrierType[k], data.data, "载体一类型", "tj")
      // getChart(carrierType[k], data.data, "载体一类型", "Column1")
    });
  }


});
var colorIndex=0
function getChart(id, data, xtype, ytype) {
  var datas = []; //x轴
  var sss = []; //y轴
  colorIndex++
  if (data.length > 0) {
    for(var i = 0; i < data.length; i++) {
      sss.push(data[i][ytype]);
      if(id=="单体石刻" || id=="古墓葬" || id=="摩崖石刻" || id=="石窟造像" || id=="古建筑"){
        datas.push(data[i].载体二类型);
      }else{
        datas.push(data[i][xtype]);
      }
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
        clickable: true,//并给图表添加单击事件  根据返回值判断点击的是哪里
        interval: 0,
        formatter: function (params, index) {
          if(data.length > 5){
            if (index % 2 != 0) {
              return '\n\n' + params;
            } else {
              return params;
            }
          }else{
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
          color: function (params) {
            return colorList[colorIndex]
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

  var seriesData = []
  var legendData = []
  for (var i = 0; i < data.length; i++) {
    seriesData.push({
      "value": data[i][ytype],
      "name": data[i][xtype]
    })
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

  }
  myChart.setOption(option);
}