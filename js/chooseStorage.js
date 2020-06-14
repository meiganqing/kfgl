var form, $, butclose;
layui.use(['form', 'jquery'], function () {
    form = layui.form;
    $ = layui.jquery;
    butclose = window.location.href.getQuery("butclose")
    //获取库房项目列表
    if (butclose) {
        $("#closeOpenWindow").removeClass("layui-hide")
    }
    $("#closeOpenWindow").click(function () {
        var index852 = parent.layer.getFrameIndex(window.name); //获取窗口索引
        parent.layer.close(index852);
    })
    //	【XDLMA==用户唯一编码】【XDLMB==系统角色类型区分】

    var returnData = SysConfig.SubSystemData.SYYHGL.PostData("GetDataInterface", {
        XDLMCID: "7000",
        XDLMSID: "DYBH2020031120324905158571",
        XDLMTID: "7021",
        XDLMUserID: SysConfig.UserInfo.GetUserOnlynum(),
        XDLMitemlm: "库房",
        XDLMxmbh: "sykf"
    });
 
    if (returnData.success) {
        var html = "";
        for (var i = 0; i < returnData.qx.length; i++) {
            if (returnData.qx[i].mDataStrValue.substring(1, 2) == "1") {
                html += "<li>" + returnData.qx[i].mDataName + "</li>"
            }

        }
        $("#storagesList").append(html)
    }



    $(document).on("click", "#storagesList li", function () {
        // console.log($(this).text())
        var mCurrentStorage = $(this).text()
        var returnData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
            XDLMCID: "1001",
            XDLMSID: "DYBH201908231246284628130151",
            XDLMB: mCurrentStorage
        });

        SysConfig.UserInfo.SetCookie("kflx", returnData.rows[0].分类, "d1");
        SysConfig.UserInfo.SetCookie("mCurrentStorage", mCurrentStorage, "d1");
        layer.msg('正在加载' + mCurrentStorage + "数据...", {
            icon: 1,
            time: 500 //2秒关闭（如果不配置，默认是3秒）
        }, function () {

            parent.location.href = "./index.html"
            
        });
    })
})


