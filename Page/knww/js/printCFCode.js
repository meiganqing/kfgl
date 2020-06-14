var knbh = window.location.href.getQuery("knbh");
var type = window.location.href.getQuery("type") //2文物 1拓片
$(function() {
    layui.use(['form'], function() {

        //确定子表走向
        var resultMain = postData("wwGetDataList", {
            TblNum: "385",
            T3852: 'EQ' + knbh
        }, null, "", false, "");


        if (type == "2") {

            $(".ww").removeClass("layui-hide")
        } else {

            $(".tp").removeClass("layui-hide")
        }
        //获取二维码
        var resultQRcode = getQRCode(resultMain.data[0]['表对应码'], knbh);
        if (resultQRcode != null && resultQRcode.success) {

            document.getElementById("qrimage" + type + 1).src = resultQRcode.data;
            //			document.getElementById("qrimage" + type + 2).src = resultQRcode.data;
        };

        echoData(resultMain.data[0]['表对应码'], knbh);
        //      setTimeout(function() {
        //          $(".no-print").addClass("layui-hide");
        //          $(".tt").css({
        //              "border": "none"
        //          })
        //          var tata = document.execCommand("print");
        //          if (tata) {
        //              $(".tt").css({
        //                  "border": "1px dashed #000"
        //              })
        //              $(".no-print").removeClass("layui-hide");
        //
        //          }
        //
        //      }, 1000)
        $("#printBtn").click(function() {
            $(".no-print").addClass("layui-hide");
            $(".tt").css({
                "border": "none"
            })
            var tata = document.execCommand("print");
            if (tata) {
                $(".no-print").removeClass("layui-hide");
                $(".tt").css({
                    "border": "1px dashed #000"
                })

            }
        })

    })
})

function echoData(tblNum, knbh) {
    postData("wwGetDataList", {
        TblNum: tblNum,
        QueryType: '文物库内编号',
        QueryKey: knbh
    }, function(data) {

        var type = ""
        if (tblNum == "305") {
            type = "2"
        } else {
            type = "1"
        }
        $("#title" + type + "1").html(knbh)
        $("#title" + type + "2").html(knbh)
        for (var k in data.data[0]) {

            $("#" + k + type + "1").html(data.data[0][k])
            $("#" + k + type + "2").html(data.data[0][k])
        }
        if (data.data[0]['文物级别']) {

            $("#文物级别" + type + "1").html(data.data[0]['文物级别'].match(/\(([^)]*)\)/)[1])
            $("#文物级别" + type + "2").html(data.data[0]['文物级别'].match(/\(([^)]*)\)/)[1])
        }
        if (data.data[0]['文物类别_具体类别']) {
            $("#文物类别_具体类别" + type + "1").html(data.data[0]['文物类别_具体类别'].match(/\(([^)]*)\)/)[1])
            $("#文物类别_具体类别" + type + "2").html(data.data[0]['文物类别_具体类别'].match(/\(([^)]*)\)/)[1])
        }

    })
}