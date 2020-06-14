var tableins = "";
var editwhere = "";
var limit = 18,
    where = {
        TblNum: 7000,
    },
    form,
    layerPage01, selectValue;
$(function() {
        layui.use(["form", "table", 'element', 'layer', ], function() {
            var table = layui.table,
                element = layui.element,
                layer = layui.layer;
            form = layui.form;

            //获取搜索下拉
            postDataSYYH("wwGetDataList", {
                    "TblNum": "7012",
                    "T85": "EQ7000",
                    "orderby": "xh asc"
                }, function(data) {
                    selectValue = data.data;
                    getSelect("cxlb", data.data, "display", "chsx");
                    form.render("select")
                })
                //搜索
            $('#searchData').click(function() {
                for (var i = 0; i < selectValue.length; i++) {
                    if ($("#cxlb").val() == selectValue[i].display) {
                        where.QueryType = selectValue[i].chsx
                    }
                }
                where.QueryKey = $("#keyWords").val();
                tableins.reload({
                    where: where,
                    page: {
                        curr: 1
                    }
                });
            });
            getTable('demo', where);

            if (!limitConfig("applyLimt", 2)) {
                $("#add").addClass("layui-hide")
            }
            //table操作事件
            table.on('tool(demo)', function(obj) {
                    var data = obj.data;
                    getRowColor(obj)
                    switch (obj.event) {
                        case "edit":
                            // if(limitConfig("storeLimt", 2)) {
                            layerPage01 = openWindow(2, '../sysSetting/addUser.html?id=' + data.id, "编辑用户", 600, 670);
                            // } else {
                            // 	layer.msg("您没有编辑权限")
                            // }

                            break;
                        case "del":
                            // if(limitConfig("storeLimt", 3)) {
                            delDataSYYH(data.id, where.TblNum, function() {
                                    layer.msg('删除成功！', {
                                        title: '提示框',
                                        icon: 1,
                                        time: 800
                                    }, function(alertindex) {
                                        tableins.reload();
                                    });
                                })
                                // } else {
                                // 	layer.msg("您没有权限删除")
                                // }

                            break;
                        case "setting":
                            // if(limitConfig("storeLimt", 2)) {
                            layerPage01 = openWindow(2, "../sysSetting/qx/xdUserRole.html?onlynum=" + data.onlynum, "编辑用户", 600, 700);
                            // } else {
                            // 	layer.msg("您没有编辑权限")
                            // }

                            break;
                    }

                })
                //添加管理员
            $("#add").click(function() {
                layerPage01 = openWindow(2, '../sysSetting/addUser.html', "编辑用户", 600, 670);
                form.render("select")

            })
            form.on('submit(addsubmit)', function(data) {

                addInformation();
                return false;
            })
        })
    })
    //添加信息
function addInformation() {

    if ($("#addsubmit").html() == "添加") {
        var addwhere = {
            TblNum: 43,
            XDLMmUserName: $("#nameNew").val(),
            XDLM密码: $("#passwordNew").val(),

            XDLM: $("#realNameNew").val()

        }

        //获取唯一编码：
        postData("wwAddNewRow", addwhere, function(data) {
            tipMsg(data, function() {
                layer.close(layerPage01)
                tableins.reload();
            })
        })

    } else if ($("#addsubmit").html() == "修改") {

        editwhere.XDLM用户名 = $("#nameNew").val(),
            editwhere.XDLM密码 = $("#passwordNew").val(),

            editwhere.XDLM用户级别 = $("#jibie").val()
        postData("wwModifyDataById", editwhere, function(data) {
            tipMsg(data, function() {
                tableins.reload();
                layer.close(layerPage01)
            })
        })

    }
}

function getTable(id, where, type, action, height) {
    var height_ = $(document).height() - 125;
    if (height == "") {
        height_ = ""
    }
    layui.use(["table"], function() {
        var table = layui.table
        var cols = kfJson.colsName["T" + where.TblNum]
        var xAction = "wwGetDataList"
        if (type) {
            cols = kfJson.colsName["T" + where.TblNum][type]
        }
        if (action) {
            xAction = action;
            cols = kfJson.colsName[action];
        }
        tableins = table.render({
            elem: '#' + id,
            url: ip_url + "?sykf=syyh&XKLX=syyh&xmbh=sykf&XAction=" + xAction,
            where: where,
            method: 'post',
            cols: cols,
            skin: 'row', //表格风格
            even: true,
            size: 'sm',
            //			toolbar: true, //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
            //			width: $(window).width() - 40,
            height: height_,
            loading: true,
            cellMinWidth: 30,
            //				height: 'full-70',
            page: true, //是否显示分页
            limits: [limit, 50, 100, 200, 500, 1000],
            limit: limit, //每页默认显示的数量
            id: "tableLayui",
            done: function(res, curr, count) {

            },
            error: function() {
                console.log("错误")
            }
        });

    })

}