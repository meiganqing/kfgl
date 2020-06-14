var rowid = window.location.href.getQuery("rowid");
var knbh = window.location.href.getQuery("knbh");
var type = window.location.href.getQuery("type");  // rk  ck
var lsh = unescape(window.location.href.getQuery("lsh"));  //记录表流水号
// var wwxx_lsh;   //流水号

layui.use(['element', 'table', 'layer', 'form'], function () {



    //二维码
    var QRCodeImg = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "9000",
        XDLMTID: "9204",
        XDLMSID: "9204003",
        XDLMKFLX: SysConfig.UserInfo.GetCookieName("kflx"),
        XDLM文物库内编号: knbh
    });

    if (typeof (QRCodeImg) == "string") {
        layer.msg(QRCodeImg);
    }


    if ($("body").find("#newRK").attr("id")) {
        $("#qrimage").attr("src", QRCodeImg.data)
        $("#pageTitle3").html(SysConfig.UserInfo.GetCookieName("mCurrentStorage") + "入库登记表")
    } else {
        $("#qrimage").attr("src", QRCodeImg.data)
    }

    echoData();//回显数据

    //拓片与文物打印区分
    // if (SysConfig.UserInfo.GetCookieName("kflx") == "拓片") {
    //     $("#basicDisplay").removeClass("layui-hide")
    //     $("#printBtn").click(function () {
    //         var tata = document.execCommand("print");//打印当前页面
    //     })

    // } else {
    //     $("#printBtn").click(function () {

    //         if (type == "rk") {
    //             outputFile.OutPutGuiKu("是否打印" + listType + "?", knbh, wwxx_lsh, "", "入库单", Callback);

    //         } else if (type == "gk") {
    //             if(wwxx_kczt == "待入库"){
    //                 outputFile.OutPutGuiKu("是否打印" + listType + "?", knbh, wwxx_lsh, "", "出库单", Callback);
    //             }else{
    //                 outputFile.OutPutGuiKu("是否打印" + listType + "?", knbh, wwxx_lsh, "", "归库单", Callback);
    //             }

    //         } else {
    //             outputFile.OutPutGuiKu("是否打印" + listType + "?", knbh, wwxx_lsh, "", "出库单", Callback);
    //         }
    //         //文物入库登记单打印


    //     })

    // }

    $("#basicDisplay").removeClass("layui-hide")
    $("#printBtn").click(function () {
        var tata = document.execCommand("print");//打印当前页面
    })



    $("#dayin").click(function () {
        $("#printBtn").hide()
        $("#dayin").hide()
        $("#mmpd").removeClass('table-content').addClass('content-table');
        $(".hhh>img").addClass('widder')
        $("table tr td ").css("height", "35px")
        window.print(); //打
        $("#printBtn").show()
        $("#dayin").show()
        $("#mmpd").removeClass('content-table').addClass('table-content');
        $(".hhh>img").removeClass('widder')
        $("table tr td ").css("height", "30px")
    })
})





function echoData() { //回显数据
   

    var wwxx = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH201908231246284628202221",
        XDLMU: knbh
    });
    
    //02 列表页通过id获取单条数据，回显赋值
    if (wwxx.success) {
        if(wwxx.rows.length > 0){
            // wwxx_lsh = wwxx.rows[0]['记录表流水号'];
            showPicture(wwxx.rows[0]['图片地址'], "picBodyImportant")//入库单图片回显
            for (var k in wwxx.rows[0]) {
                $("#XDLM" + k).html(wwxx.rows[0][k])
            }
           
        }
    }

   

    // 获取单个记录表流水记录  （20200519因待入库文物的归库单无流水信息修改，后台给的接口）
    let wwxx_jilu = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "9000",
        XDLMTID: "9204",
        XDLMSID: "9204036",
        XDLMKFLX: SysConfig.UserInfo.GetCookieName("kflx"),
        relics_code: knbh,
        logs_code: lsh,
        form_type: '入库单'
      
    });
    if(wwxx_jilu.success){
        if(wwxx_jilu.inside.length > 0){
            for(var k in wwxx_jilu.inside[0]) {
                $("#" + k).html(wwxx_jilu.inside[0][k])
            }
            let wwxx_image1 = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "1001",
                XDLMSID: "DYBH20190823124628462861241",
                XDLMA: wwxx_jilu.inside[0]['归库记录流水号'],
            });
            if(wwxx_image1.success){
                for (var n = 0; n < wwxx_image1.rows.length; n++) {
                    showPicture(wwxx_image1.rows[n]['图片地址'], "picBodyRK") //获取图片
                }
            }
        }

        if(wwxx_jilu.outside.length > 0){
            for(var k in wwxx_jilu.outside[0]) {
                $("#" + k).html(wwxx_jilu.outside[0][k])
            }
            let wwxx_image2 = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "1001",
                XDLMSID: "DYBH20190823124628462861241",
                XDLMA: wwxx_jilu.outside[0]['出库记录流水号'],
            });
            if(wwxx_image2.success){
                for (var n = 0; n < wwxx_image2.rows.length; n++) {
                    showPicture(wwxx_image2.rows[n]['图片地址'], "picBodyCK") //获取图片
                }
            }
        }
    }
    


}

function showPicture(picUrl, id, width, height) { //查看详情显示图片

    var width_ = width ? width : 96;
    var height_ = height ? height : 96;
    if (picUrl) {
        var html = "";
        var imgArry = picUrl ? picUrl.split("|") : [];
        if (imgArry.length > 0) {
            for (var i = 0; i < imgArry.length; i++) {
                if (imgArry[i]) { //float:left;
                    html += `<div class="imgDiv" style="cursor: pointer;">
                                <div class="layadmin-homepage-pad-ver  hhh"  >
                                    <img data-title="查看详情" style="width:100%" onclick="lookPic('${imgArry[i].split(',')[0]}')" class="layadmin-homepage-pad-img" src="${imgArry[i].split(',')[0].replace('ss.', '.')}" >
                                </div>
                            </div>`
                }

            }
        }

        $("#" + id).append(html)
    }
}

function lookPic(imagePath) {
    SysConfig.ToolBox.ShowVideo("查看", imagePath, $(window).width() - 20, $(window).height() - 20);
}

function Callback(){
    var index852 = parent.layer.getFrameIndex(window.name); //获取窗口索引
    if (parent.tableins) {
        parent.tableins.reload("mDataTable");
    }
    parent.layer.close(index852);
}

