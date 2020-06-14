var tableins, cols, where, laydate;
$(document).ready(function () {
    layui.use(['element', 'table', 'layer', 'form', 'laydate'], function () {
        var form = layui.form,
            $ = layui.jquery;
        laydate = layui.laydate,
            layer = layui.layer;
        tableins = layui.table;

        // 权限设置
        qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("同步拓片");
        //
        // 同步拓片
        // 编辑权限
        if (!qx[0].Limit.isBJ) {
            $("#syncData").addClass("layui-hide")

        }


        where = {
            XDLMCID: "9000",
            XDLMTID: '9204',
            XDLMSID: "9204032",
            XDLMmethod: 'GetRubbingData',
            is_sync: "否",
            year: "",
            position_name: ""

        };

        cols = [
            [{
                checkbox: true,
                LAY_CHECKED: false
            }, {
                title: '序号',
                type: 'numbers',

            },

            {
                field: '库内编号',
                title: '库内编号',
                align: 'center',

            },
            {
                field: '编号',
                title: '编号',
                align: 'center',

            },
            {
                field: '名称',
                title: '名称',

                align: 'center',

            },
            {
                field: '拓片年度',
                title: '拓片年度',

                align: 'center',
                templet: function (d) {
                    return SysConfig.ToolBox.QueryKeyColor($("#position_name").val(), d.拓片年度);
                }
            },
            {
                field: '文物点名称',
                title: '文物点名称',
                align: 'center',
                templet: function (d) {
                    return SysConfig.ToolBox.QueryKeyColor($("#position_name").val(), d.文物点名称);
                }
                
            },
            {
                field: '年代',
                title: '年代',
                width: '4%',
                align: 'center',


            }, {
                field: '载体一类型',
                title: '类型一',
                width: '8%',
                align: 'center',

            },

            {
                field: '载体二类型',
                title: '类型二',
                width: '6%',
                align: 'center',

            },
            {
                field: '具体位置',
                title: '位置',

                align: 'center',

            },
            {
                field: '是否入库',
                title: '是否入库',
                width: '4%',
                align: 'center',

            }
                ,
            {
                field: '载体用途',
                title: '用途',
                width: '6%',
                align: 'center',

            },
            {
                field: '是否已拓',
                title: '是否已拓',
                width: '4%',
                align: 'center',

            }
                ,
            {
                field: '级别',
                title: '级别',
                width: '8%',
                align: 'center',

            },
            {
                field: '调查人',
                title: '调查人',
                width: '6%',
                align: 'center',

            },



            ]
        ];
        tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '同步列表', cols, where, 15);

        // 点击已经同步还是未同步
        $(".nav-btn").click(function () {
            $(".nav-btn").removeClass("layui-this")
            $(this).addClass("layui-this")

            console.log($(this).attr("asyncType"))

            where.is_sync = $(this).attr("asyncType")
            tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '同步列表', cols, where, 15);
        })

        //年选择
        laydate.render({
            elem: '#year'
            , type: 'year'
            , done: function (value, date, endDate) {
                console.log(value); //得到日期生成的值，如：2017-08-18
                where.year = value
                callback()


            }

        });
        // 文物点名称查询
        $("#searchData").click(function () {
            where.position_name = $("#position_name").val()
            callback()

        })

        //一键同步
        $("#syncData").click(function () {
            var ids = [];
            var checkStatus = tableins.checkStatus('mDataTable'),
                data = checkStatus.data;
                console.log(data)
            for (var i = 0; i < data.length; i++) {
                ids.push(data[i].id);
            }
            console.log(ids)
            asyncTp(ids) //一键同步


        })


        //、点击按钮添加
        // $("#syncData").click(function() {
        //     var ids = [];
        //     layui.use('table', function() {
        //         var table = layui.table;
        //         var checkStatus = table.checkStatus('tableLayui'),
        //             data = checkStatus.data;
        //         for (var i = 0; i < data.length; i++) {
        //             ids.push(data[i].id);
        //         }
        //     });
        //     //			e.preventDefault();
        //     asyncTp(ids);
        // })

        //监听删除事件
        // table.on('tool(swlb)', function(obj) {
        //     var data = obj.data;
        //     getRowColor(obj)
        //     switch (obj.event) {
        //         case "detail":
        //             openWindow(2, 'carrierDetail.html?knbh=' + data.库内编号, "未同步拓片详情", $(window).width(), $(window).height())

        //             break;

        //     }

        // })

    });
})


// 一键同步
function asyncTp(ids) {
    if (ids.length == 0) {
        layer.msg('请先选中行！', {
            title: '提示框',
            icon: 0,
            time: 800
        });
    } else {

        var index002 = layer.confirm('确定要同步吗？', {
            btn: ['确定', '再想想'] //按钮
        }, function () {
            var index3 = layer.msg('正在同步,请稍等...', {
                time: 0,
                shade: 0.3,
                //content: '测试回调',
                success: function (index, layero) {

                    let returnData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                        XDLMCID: "9000",
                        XDLMTID: '9204',
                        XDLMSID: "9204032",
                        XDLMmethod: 'SyncRubbing',
                        ids: ids.toString(),
                        mCurrentStorage: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                        mUserName: SysConfig.UserInfo.GetCookieName("mUserName")

                    });
                    if (returnData.success == true) {
                       
                    
                        layer.msg(returnData.message, {
                            icon: 1,
                            time: 2000 //2秒关闭（如果不配置，默认是3秒）
                          }, function(){
                            tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '同步列表', cols, where, 15);
                            layer.close(index3);
                           
                          }); 
                    } else {
                        layer.msg(returnData, {
                            icon: 2,
                            time: 2000 
                          }, function(){
                            layer.close(index3);
                          }); 

                    }
                }
            });

        }, function () {
            layer.close(index002);
        });

    }
}

function callback() {
    tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '同步列表', cols, where, 15);
}