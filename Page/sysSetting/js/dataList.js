var tableins = "";
var limit = 17,
    where = {
        TblNum: 7013,
        X91: "-1",
        T93: "EQsykf"
    },
    layerPage01,
    type = window.location.href.getQuery('type'),
    selectValue = ""
$(function() {
    layui.use(["form", "table"], function() {
        var form = layui.form,
            table = layui.table;
        //查询类别
        postDataSYYH("wwGetDataList", {
            TblNum: 7012,
            T85: "EQ7013",
            orderby: "xh asc"
        }, function(data) {
            selectValue = data.data;
            getSelect("cxlb", data.data, "display", "chsx")

        })


        //		postData("wwGetDataList", mActionData, callback, _url, async, type)

        getTable_("demo", where, "")

        if (!limitConfig("applyLimt", 2)) {
            $("#addData").addClass("layui-hide")
        }
        if (!limitConfig("applyLimt", 3)) {
            $("#deleteData").addClass("layui-hide")
        }
        table.on('tool(demo)', function(obj) {
            getRowColor(obj)
            var data = obj.data;
            switch (obj.event) {
                case "edit":
                    // if (limitConfig("storeLimt", 2)) {
                    layerPage01 = openWindow(2, 'qx/add_rolesList.html?id=' + data.id, "编辑", 500, 240);

                    // } else {
                    //     layer.msg("您没有编辑权限")
                    // }
                    break;
                case "setting":
                    // if (limitConfig("storeLimt", 2)) {
                    layerPage01 = openWindow(2, 'qx/config_xdItemList.html?id=' + data.id + '&onlynum=' + data.roleNum + '&rolename=' + escape(data.rolename) + '&miaoshu=' + escape(data.miaoshu), "配置信息", $(window).width() - 100, $(window).height() - 100);

                    // } else {
                    //     layer.msg("您没有编辑权限")
                    // }
                    break;
                case "del":
                    // if (limitConfig("storeLimt", 3)) {
                    delDataSYYH(data.id, "7013", function() {
                            tableins.reload();
                        })
                        // } else {
                        //     layer.msg("您没有删除权限")
                        // }
                    break;
            }
        })

        form.render("select")

        //搜索
        $('#searchData').click(function() {
            //			var strFilter = $("#keyWords").val();
            //			var querytype = $("#querytype").val();
            where.QueryJllx = $("#store").val();

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
        //新增
        $("#addData").click(function() {

                if (type == "role") {
                    layerPage01 = openWindow(2, 'qx/add_rolesList.html', "详细信息", 500, 240);

                }

            })
            //删除
        $("#deleteData").click(function() {
            var checkStatus = table.checkStatus('tableLayui');
            PLSC(checkStatus)
        })

    });
})

function getTable_(id, where, type, action, height) {
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
            url: "/api/kf/data?sykf=syyh&XKLX=syyh&XAction=" + xAction,
            where: where,
            method: 'post',
            cols: cols,
            skin: 'row', //表格风格
            even: true,
            size: 'sm',
            toolbar: true, //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
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

            }
        });

    })

}

function PLSC(ids) {
    if (ids.data.length == 0) {
        var index111 = layer.msg('请先选中行！', {
            title: '提示框',
            icon: 2,
            time: 800
        }, function(alertindex) {
            layer.close(index111);
        });
    } else {

        indexPrompt = layer.prompt({
                title: '警告！系统关键操作，必须输入确认密码',
                formType: 1
            }, //prompt风格，支持0-2},
            function(pass) {

                if (pass == '3.1415') {

                    layer.msg('正在删除,请稍等...', {
                        time: 0,
                        shade: 0.3,
                        //content: '测试回调',
                        success: function(index, layero) {

                            for (var i = 0; i < ids.data.length; i++) {
                                var rvs = postDataSYYH("wwDelDataById", {
                                    TblNum: "7013",
                                    XDLMID: ids.data[i].id
                                });


                            };
                            layer.msg('删除完成！', {
                                title: '提示框',
                                icon: 1,
                                time: 500
                            }, function() {
                                tableins.reload();
                                layer.close(indexPrompt);

                            });

                        }
                    });
                } else {
                    layer.msg('密码错误,请重新输入', {
                        icon: 0,
                        time: 800
                    });
                }
            });
    }
}