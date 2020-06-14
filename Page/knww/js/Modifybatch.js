/*
 * @陕西唐远
 * @文件名: 
 * @作者: 李浩源
 * @Git: e
 * @Date: 2019-12-05 20:31:27
 * @描述: 
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:  
 */
$(function() {
    var $, form;
    layui.use(['element', 'table', 'layer', 'form'],

        function() {

            admin = layui.admin;
            table = layui.table;
            form = layui.form;
            laydate = layui.laydate;
            $ = layui.$;

            // 下拉选择
            GetRequest().ids
            console.log(GetRequest().ids) //接受修改的id
            console.log(getCookie("mUserName")) //当前修改人


            PostData_new('/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYKFGL&XDLMCID=1001&XDLMSID=DYBH2019120516215905052392', "", function(data) {
                if (data.success && data.rows[0].sysvalue.length > 0) {
                    let datas = data.rows[0].sysvalue.split(",");
                    // 转换成数组
                    var TemplateXg = '<option value="">全部</option>';
                    for (var i = 0; i < datas.length; i++) {
                        if (datas[i] == null) {} else {
                            TemplateXg += '<option value="' + datas[i] + '" id="' + datas[i] + '" attrData="' + '">' + datas[i] + '</option>'
                        }
                    }

                    $("#alter").append(TemplateXg)
                    form.render("select")
                }

                //
            })

            $("#TrainManageAddBtn").click(function() {
                addList()
                return false
            })



        })



});


// 批量修改接口
// 【ids=文物id】多个英文逗号拼接

// 【column==更新列】下拉选项选择

// 【input==更新值】

// 【user==操作人】当前登录人名
function addList() {
    console.log($("#alter").val())
    console.log($("#lienumb").val())
    let addata = {
        "ids": GetRequest().ids,
        "column": $("#alter").val(), //列名
        "input": $("#lienumb").val(), //列值
        "user": getCookie("mUserName") //
    }
    PostData_new('/xdData/xdDataManage.ashx?XAction=ExtFC&XDLMCID=BatchSetRelics&XKLX=SYKFGL', addata, function(data) {
        if (data.success == true) {
            layer.msg('操作成功', {
                icon: 1,
                time: 1000
            }, function() {
                callBack()
            });
        } else {
            layer.msg(data.message);
        }
        //
    })

}




//关闭窗口寻找索引
function callBack() {
    var index543 = parent.layer.getFrameIndex(window.name); //获取窗口索引
    // parent.dataTable.reload('mDataTable', {
    // 	page: {
    // 		curr: 1 //重新从第 1 页开始
    // 	}
    // });

    parent.tableins.reload({
        // where: where,
        page: {
            curr: 1
        }
    });
    parent.layer.close(index543);
    window.parent.location.reload(); //刷新父页面

}