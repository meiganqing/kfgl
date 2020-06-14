var tableins;

$(document).ready(function () {
   
    layui.use(['table', 'form'], function () {
        table = layui.table;
        element = layui.element,
        layer = layui.layer;
        tableins = layui.table;

        //  权限设置
        qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("三维列表展示");
        console.log(qx)
        //添加
        if (!qx[0].Limit.isBJ) {
            $("#add").addClass("layui-hide")

        }



        //、点击按钮添加
        $("#add").click(function () {
            SysConfig.ToolBox.openWindow('add_swlx.html', "添加三维", 800, 360)
        })



        //监听删除事件
        table.on('tool(grid_table)', function (obj) {
            var data = obj.data;
            getRowColor(obj)
            switch (obj.event) {
                // 编辑
                case "edit":
                    SysConfig.ToolBox.openWindow( 'add_swlx.html?rowid=' + data.id, "修改三维", 800, 450)

                    break;
                case "del":
                    // 删除
                    SysConfig.SubSystemData.SYKFGL.PLSC([{ id: data.id }], '4000', 'DYBH201908231246284628167194', Callback);
                        
                    break;
                case "open":
                    httpOrFlv(data['文件地址'], data.id)
                    break;

            }


        })

        //列表

        let where = {
            XDLMCID: "1001",
            XDLMSID: "DYBH201908231246284628101191",

        };
        let cols = [
            [{
                checkbox: true,
                LAY_CHECKED: false,

            }, {
                title: '序号',
                type: 'numbers',


            },

            {
                field: '三维名称',
                title: '三维名称',
                align: 'center',
              
            },
            {
                field: '库房名',
                title: '库房名',

                align: 'center',
               
            },
            {
                field: '文物库内编号',
                title: '现登记号',

                align: 'center',
              
            },
            {
                field: '登记名称',
                title: '登记名称',

                align: 'center',
              
            },

            {
                title: '操作',
                width: '16%',
                fixed: "right",
                align: 'center',
                templet: function (d) {
                    let tt = "";

                    tt += ' <a class="layui-btn layui-btn-xs layui-btn-normal" lay-event="open">查看三维</a>';
                    if (qx[0].Limit.isBJ) {

                        tt += '<a class="layui-btn layui-btn-xs own-btn-orange" lay-event="edit" id="edit">编辑</a>';
                    }


                    //删除


                    if (qx[0].Limit.isSC) {
                        tt += '<a class="layui-btn  layui-btn-danger layui-btn-xs" lay-event="del" id="del">删除</a>';
                    }



                    return tt;
                }
            }

            ]
        ];
        tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '三维列表展示', cols, where, 10);



    });
})



//如果三维文件是网址那么是以http开头，判断前4位如果是http那么就打开连接
function httpOrFlv(add, uid) {
    if (add.trim().slice(0, 4) == 'http') {

        openSWhref(add);
    			
    } else {
        $('#filePathSW').val(add);
        SW = $('#filePathSW').val();
        openSWById(uid);
    }
}

//链接地址
function openSWhref(href) {
    var index = layer.open({
        type: 2,
        content: href,
        area: ['900px', '590px'],
        title: '三维',
        maxmin: true
    });
}


//打开三维视图窗口//.swf格式
function openSWById(uuid) {
    var index = layer.open({
        type: 2,
        content: '/xdPage/OpenWindow/window_SW.html',
        area: ['900px', '590px'],
        title: '三维',
        maxmin: true
    });
}

//点击对应的行颜色变化
function getRowColor(obj) {
    $(obj.tr).css({
        background: "#DCEEFE"
    })
}
// 单行删除


    function Callback() {
        tableins.reload("mDataTable", {
            page: {
                curr: 1
            }
        });
    }