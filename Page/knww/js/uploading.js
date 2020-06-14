var uploadImg = "", UploadTable;
var $, form, typelb = "";
// $(function () {


layui.use(['element', 'table', 'layer', 'form', 'upload'],function () {
    element = layui.element,
        admin = layui.admin;
    table = layui.table;
    form = layui.form;
    laydate = layui.laydate;
    $ = layui.$;
    UploadTable = layui.table;
    upload = layui.upload;
    

    if (SysConfig.UserInfo.GetCookieName("kflx") == "文物") { //文物
        typelb = "文物"
       
    } else { //拓片
        typelb = "拓片"

    }


    // 导出模板
    $("#localwenjian").click(function () {
        if(SysConfig.UserInfo.GetCookieName("kflx") == "文物"){
            window.open("../../../Widget/文物信息批量导入_模板.xls", '_self')
        }else{
            window.open("../../../Widget/拓片信息批量导入_模板.xls", '_self')
        }
        return true;
    })

    SetAddUpload()//上传文件

    //确定关闭窗口刷新父列表
    $("#TrainManageAddBtn").click(function () {
        var index543 = parent.layer.getFrameIndex(window.name); //获取窗口索引
        parent.layer.close(index543);
        window.parent.location.reload();//刷新父页面

    })


})


// });

function SetAddUpload() {
    //第一步 初始化上传控件，按各个系统
    SysConfig.SubSystemData.SYKFGL.UploadFile('#changefileFJ', upload, element, chooseCallback, doneCallback, allDoneCallback, errCallback);

}





//上传预加载，可自定义
function chooseCallback(obj) {


}

//所有上传完成，多文件上传返回
function allDoneCallback(obj) {


}

//单个文件上传放回
function doneCallback(res, index, upload) {
    $("#datamsg").html("")

    if (res.success == true) {
        let returnData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
            XDLMCID: "9000",
            XDLMTID: '9204',
            XDLMSID: "9204035",
            XDLMKFLX: typelb,
            FilePath: res.filepath
        });

        if (returnData.success == true) {

            let htmlli = '<div style="font-size: 26px;text-align: center;color:green;font-weight: 700;">' +"文件"+ res.filename+",上传"+returnData.message + '</div>'
            $("#datamsg").append(htmlli)

            SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "9000",
                XDLMTID: "9204",
                XDLMSID: "9204012",
                mCurrentStorage: SysConfig.UserInfo.GetCookieName("mCurrentStorage")
        
            });


        } else {
            let htmlli = ' <div style="font-size: 26px;text-align: center;color: red;font-weight: 700;">' +"文件"+res.filename+",上传"+returnData + '</div>'

            $("#datamsg").append(htmlli)
              //校正数据
 

        }
    }


}

function errCallback(index, upload) {

    //获取上传错误列表使用table显示调用这个
    for (var i in UploadTableData) {
        if (UploadTableData[i].id == index) {
            UploadTableData[i].状态 = "上传失败";
        }
    }
}


// 关闭窗口寻找索引
function callBack() {

    var index543 = parent.layer.getFrameIndex(window.name); //获取窗口索引
    parent.layer.close(index543);

    // window.parent.location.reload();//刷新父页面
}

//关闭窗口
function closethis() {
    callBack()
}