var myChart,returnData;
var colorList = ['#62B9B9', '#E5D386', '#C467A2', '#AD55AD', '#DB5F5F', '#556FB2', '#99DD00', '#FF8888', '#FF3333', '#FF0000', '#CC0000', '#FFC8B4', '#FFA488', '#FFBB00', '#DDAA00', '#FFFFBB', '#FFFF77', '#00DD00', '#BBFFEE', '#77FFCC', '#33FFAA', '#00FF99', '#00DD77', '#AAFFEE', '#77FFEE', '#FF7744', '#FF5511', '#E63F00', '#FFDDAA', '#FFBB66', '#FFAA33', '#FF8800', '#EE7700', '#FFEE99', '#FFDD55', '#FFCC22', '#33FFDD', '#00FFCC', '#00DDAA', '#99FFFF', '#66FFFF', '#33FFFF', '#00FFFF', '#00DDDD', '#CCEEFF', '#77DDFF', '#33CCFF', '#009FCC', '#CCFF99', '#BBFF66', '#99FF33', '#77FF00', '#66DD00', '#99FF99', '#66FF66', '#33FF33', '#00FF00', '#FFFF00', '#EEEE00', '#EEFFBB', '#FFCCCC'];
var typeArry = ['保存状态', '年代_纪年选项A', '年代_纪年选项B', '入藏时间_范围', '完残程度', 
'文物级别', '文物来源', "文物类别_范围", "文物类别_具体类别", "质地类别_单一质地_无机质", "质地类别_单一质地_有机质",'质量_范围'];
$(document).ready(function () {
  layui.use(['table', 'form'], function () {
    var form = layui.form,
      table = layui.table;
    var  type = window.location.href.getQuery('type');
      console.log(type)

    for(let i = 0; i < typeArry.length; i++){

  

      if(type){
         returnData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
          XDLMCID: "1001",
          XDLMSID: "DYBH202004221526090452897",
          XDLMA: "文物登记表",
          XDLMB:SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
          XDLMC:typeArry[i]
     
        }); 

      }else{
       returnData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
          XDLMCID: "1001",
          // XDLMSID: "DYBH202004221526090452897",
          // XDLMA: "文物登记表",
          // XDLMC:typeArry[i]
          XDLMSID:'DYBH2020052011295202176966',
          XDLMA:"文物登记表",
          XDLMB:typeArry[i]//统计项目
        }); 
      }

      
      if (returnData.success) {
     
        if( typeArry[i] == '完残程度' || typeArry[i] == '文物级别'){
          getChartBar(typeArry[i], returnData.rows, '统计内容', "统计值");
        }else if(typeArry[i] == '文物类别_具体类别'|| typeArry[i] == '质地类别_单一质地_有机质'|| typeArry[i] == '年代_纪年选项A'|| typeArry[i] == '年代_纪年选项B'){
          getChartHua(typeArry[i], returnData.rows, '统计内容', "统计值")
        }else if(typeArry[i] == '入藏时间_范围'){
          getChartHuaB(typeArry[i], returnData.rows, '统计内容', "统计值")
        }
        else{
          getChart(typeArry[i], returnData.rows, '统计内容', "统计值");
        }

    }
   
    }

  });
});




function getChart(id, data, xtype, ytype) {
  var datas = []; //x轴
  var sss = []; //y轴
  if(data.length > 0) {

    for(var i = 0; i < data.length; i++) {
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
    xAxis:[{
      type: 'category',
      data: datas,
      axisLabel: {
        clickable:true,//并给图表添加单击事件  根据返回值判断点击的是哪里
        interval : 0,
        formatter : function(params,index){
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
    }] ,


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
  for(var i = 0; i < data.length; i++) {
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

// 带头滑动的柱状图
function getChartHua(id, data, xtype, ytype) {
  var datas = []; //x轴
  var sss = []; //y轴
  if(data.length > 0) {

    for(var i = 0; i < data.length; i++) {
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

    xAxis:[{
      type: 'category',
      data: datas,
      //倾斜
    //   axisLabel : {//坐标轴刻度标签的相关设置。
    //     interval:0,
    //     rotate:0
    // }
      // 换行
      axisLabel: {
        formatter : function(params){
          var newParamsName = "";// 最终拼接成的字符串
                   var paramsNameNumber = params.length;// 实际标签的个数
                   var provideNumber = 4;// 每行能显示的字的个数
                   var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                   /**
                    * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                    */
                   // 条件等同于rowNumber>1
                   if (paramsNameNumber > provideNumber) {
                       /** 循环每一行,p表示行 */
                       for (var p = 0; p < rowNumber; p++) {
                           var tempStr = "";// 表示每一次截取的字符串
                           var start = p * provideNumber;// 开始截取的位置
                           var end = start + provideNumber;// 结束截取的位置
                           // 此处特殊处理最后一行的索引值
                           if (p == rowNumber - 1) {
                               // 最后一次不换行
                               tempStr = params.substring(start, paramsNameNumber);
                           } else {
                               // 每一次拼接字符串并换行
                               tempStr = params.substring(start, end) + "\n";
                           }
                           newParamsName += tempStr;// 最终拼成的字符串
                       }

                   } else {
                       // 将旧标签的值赋给新标签
                       newParamsName = params;
                   }
                   //将最终的字符串返回
                   return newParamsName
       }

    
      }
    }] ,

    dataZoom: [{
      type: 'slider',
      show: true, //flase直接隐藏图形
      xAxisIndex: [0],
      left: '9%', //滚动条靠左侧的百分比
      bottom: -5,
      start: 0,//滚动条的起始位置
      end: 20 //滚动条的截止位置（按比例分割你的柱状图x轴长度）
    }],

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
// 带头滑动的柱状图不倾斜
function getChartHuaB(id, data, xtype, ytype) {
  var datas = []; //x轴
  var sss = []; //y轴
  if(data.length > 0) {

    for(var i = 0; i < data.length; i++) {
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

    xAxis:[{
      type: 'category',
      data: datas,
      //倾斜
      axisLabel : {//坐标轴刻度标签的相关设置。
        interval:0,
        rotate:0
    }
      // 换行
    
    }] ,

    dataZoom: [{
      type: 'slider',
      show: true, //flase直接隐藏图形
      xAxisIndex: [0],
      left: '9%', //滚动条靠左侧的百分比
      bottom: -5,
      start: 0,//滚动条的起始位置
      end: 20 //滚动条的截止位置（按比例分割你的柱状图x轴长度）
    }],

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