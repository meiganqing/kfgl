var rootPath;
var pageNum = 1;
var container;
var loading;
var laypage;
var countNum, form;

var type = window.location.href.getQuery("type");//图片类型数字
var pictureType = ""//图片类型名称

layui.use(['laypage', 'layer', 'table', 'form'], function () {
    var layer = layui.layer;
    laypage = layui.laypage;
    table = layui.table;
    form = layui.form;

    var yearType = "年代"

    if (type == "02") { //一般
        pictureType = "拓片";
   
    } else if (type == "03") { //远景
        pictureType = "远景";

    } else if (type == "04") {
        pictureType = "近景";

    }

  

    // // 拓片图片查询下拉选项
    // // /xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYKFGL&XDLMCID=1001&XDLMSID=DYBH202004201526390390408
    // let reData_tpian = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
    //     XDLMCID: "1001",
    //     XDLMSID: "DYBH202004201526390390408",
    // });

    // if(reData_tpian.success==true){
    //     console.log(reData_tpian)
    //     // ("bkpeople", data, 'mUserName', "mUserID", "全部")
    //     // getSelectTp("cxlb",)

    // }


 
    container = $('.waterfull ul');//图片加载位置
    loading = $('#imloading');
    loading.data("on", true); // 初始化loading状态
    
    initPBL()

    LoadImageListFist(pageNum, 10)//请求分页列表
    LoadImageList(pageNum, 10); //请求图片数据



    $(window).resize(function () {
        tores();
    });
    $(window).scroll(function () {
        updateImgStyle()
    });
    



    /*item hover效果*/
    var rbgB = ['#71D3F5', '#F0C179', '#F28386', '#8BD38B'];
    $('#waterfull').on('mouseover', '.item', function () {
        var random = Math.floor(Math.random() * 4);
        $(this).stop(true).animate({
            'backgroundColor': rbgB[random]
        }, 1000);
    });
    $('#waterfull').on('mouseout', '.item', function () {
        $(this).stop(true).animate({
            'backgroundColor': '#fff'
        }, 1000);
    });

    //查询
    $('#searchData').click(function () {
        find();
    });
});





// 布局
function initPBL() {
    container.imagesLoaded(function () {
        container.masonry({
            columnWidth: 320,
            itemSelector: '.item',
            isFitWidth: true, //是否根据浏览器窗口大小自动适应默认false
            isAnimated: true, //是否采用jquery动画进行重拍版
            isRTL: false, //设置布局的排列方式，即：定位砖块时，是从左向右排列还是从右向左排列。默认值为false，即从左向右
            isResizable: true, //是否自动布局默认true
            animationOptions: {
                duration: 1,
                easing: 'easeInOutBack', //如果你引用了jQeasing这里就可以添加对应的动态动画效果，如果没引用删除这行，默认是匀速变化
                queue: false //是否队列，从一点填充瀑布流
            }
        });
    });
    tores(); /*判断瀑布流最大布局宽度，最大为1280*/
}

function updateImgStyle() {
    if (!loading.data("on")) return;
    // 计算所有瀑布流块中距离顶部最大，进而在滚动条滚动时，来进行ajax请求，方法很多这里只列举最简单一种，最易理解一种
    var itemNum = $('#waterfull').find('.item').length;
    var itemArr = [];
    itemArr[0] = $('#waterfull').find('.item').eq(itemNum - 1).offset().top + $('#waterfull').find('.item').eq(itemNum - 1)[0].offsetHeight;
    itemArr[1] = $('#waterfull').find('.item').eq(itemNum - 2).offset().top + $('#waterfull').find('.item').eq(itemNum - 1)[0].offsetHeight;
    itemArr[2] = $('#waterfull').find('.item').eq(itemNum - 3).offset().top + $('#waterfull').find('.item').eq(itemNum - 1)[0].offsetHeight;
    var maxTop = Math.max.apply(null, itemArr);
    if (maxTop < $(window).height() + $(document).scrollTop()) {
        //加载更多数据
        loading.data("on", false).fadeIn(800);
        (function (sqlJson) {
            /*这里会根据后台返回的数据来判断是否你进行分页或者数据加载完毕这里假设大于30就不在加载数据*/
            if (itemNum > 100) {
                loading.text('就有这么多了！');
            } else {
                pageNum++;
                LoadImageList(pageNum, 10);
            }
        })(sqlJson);
    }
}


// 预加载
function loadImage(url) {
    var img = new Image();
    //创建一个Image对象，实现图片的预下载
    img.src = url;
    if (img.complete) {
        return img.src;
    }
    img.onload = function () {
        return img.src;
    };
};



// 01，加载图片数据
// LoadImageList(pageNum_, pageRowCount)//页面页数，和每页显示的图片数

function LoadImageList(pageNum_, pageRowCount) {
                where = {
                    XDLMCID: "1001",
                    XDLMSID: "DYBH2020042011113304346002",
                    XDLMA:SysConfig.UserInfo.GetCookieName("mCurrentStorage"),//库房名字
                    XDLMB:pictureType,//类型
                    page:pageNum_,//页数
                    rows:pageRowCount,
                    QueryType: $("#cxlb").val(),
                    QueryKey: $('#queryK').val()
               
                };
       

   SysConfig.SubSystemData.SYKFGL.PostDataAsync("GetDataInterface", where,function(wwxx_image){

        if (wwxx_image.success) {
            if (wwxx_image.rows.length > 0) {
                countNum = wwxx_image.rows.length;
                getTemplate(wwxx_image.rows)//第二步
            } else {
                $(".masonry").empty()
                // layer.msg("啊哦，没有数据")
            }
        }
    });
 
 
}


// 02，第二步图片数据赋值
function getTemplate(data) {
    var html = "";
    var returnValue = data

    for (var i in returnValue) {
        var imgSrc = "",
            imgName = "",
            wwName = "";
 
        html += `<li class="item" style="">
		<a href="#" class="a-img"  onclick="lookPic('${returnValue[i]["图片地址"]}')">
		<img src="${returnValue[i]['图片地址'].replace("_sss.", "_s.")}"></a>
		<div class="formation">
            <h5  class="li-title" >${SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), returnValue[i]['文图名称'])}</h5>
            <h5  class="li-title" >${SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), returnValue[i]['登记名称'])}</h5>
			 <button " class="detail-btn layui-btn layui-btn-primary layui-btn-sm " onclick="kfshManage.ShowXQ('${returnValue[i]["id"]}','${returnValue[i]["文物入库编号"]}')"> 
			    <span >详情</span>
			  </button>

		</div>
	</li>`
    }
    /*模拟ajax请求数据时延时800毫秒*/
    var time = setTimeout(function () {
        $(html).find('img').each(function (index) {
            loadImage($(this).attr('src'));
        })
        var $newElems = $(html).css({
            opacity: 0
        })
        container.html($newElems);
        initPBL()
        $newElems.imagesLoaded(function () {
            $newElems.animate({
                opacity: 1
            }, 200);
            container.masonry('appended', $newElems, true);
            loading.data("on", true).fadeOut();
            clearTimeout(time);
        });
    }, 200)

    loadImage('images/one.jpg');
}

function tores() {
    var tmpWid = $(window).width() - 10;
    if (tmpWid > 1280) {
        tmpWid = tmpWid - 10;
    } else {
        var column = Math.floor(tmpWid / 320);
        tmpWid = column * 320;
    }
    $('.waterfull').width(tmpWid);
}
 





//查询
function find() {
    container.empty();
    initPBL();
    LoadImageList(1, 10);
    //	loadpage();
}

function changeSearchType(value) {
    $(".search-type").addClass("layui-hide")
    if (value == "XDLMP") { //分组
        $("#XDLMPDiv").removeClass("layui-hide");
        $("#queryK").val("")
    } else if (value == "warehouse") { //存放位置
        $("#warehouseDiv").removeClass("layui-hide");
        $("#queryK").val("")
    } else { //正常
        $("#keyworDiv").removeClass("layui-hide");
    }
}


function LoadImageListFist(pageNum_, pageRowCount) {
    where = {
        XDLMCID: "1001",
        XDLMSID: "DYBH2020042011113304346002",
        XDLMA:SysConfig.UserInfo.GetCookieName("mCurrentStorage"),//库房名字
        XDLMB:pictureType,//类型
        QueryType: $("#cxlb").val(),
        QueryKey: $('#queryK').val()
   
    };


SysConfig.SubSystemData.SYKFGL.PostDataAsync("GetDataInterface", where,function(wwxx_image){

if (wwxx_image.success) {
if (wwxx_image.rows.length > 0) {
    countNum = wwxx_image.rows.length;
    fenye(countNum)
    // getTemplate(wwxx_image.rows)//第二步
} else {
    $(".masonry").empty()
    layer.msg("啊哦，没有数据")
}
}
});


}
   //分页加载
   function fenye(countNum){
    laypage.render({
        elem: 'demo0',
        count: countNum, //数据总数
        limit: 15,
        jump: function (obj, first) {
            if (!first) {
                LoadImageList(obj.curr, 10); //请求图片数据
            }
        }
    });

   }




   // 下拉选择
function getSelectTp(id, data, key, attr, attrValue, defaultValue) { //获取下拉框形式的模板
    var select = key
    if (attrValue) {
        select = attrValue
    }
    var xmmcTemplate = "";
 
    $('#' + id).empty()
    //	}
    if (defaultValue) {
        xmmcTemplate += '<option value="" id="" >请选择</option>'
    }

    $('#' + id).find("option:gt(0)").remove();
    if (data.length > 0) {
        //		data.reverse()
        if (attr) {
            for (var i = 0; i < data.length; i++) {

                xmmcTemplate += '<option value="' + data[i][select] + '" id="' + data[i][select] + '" attrData="' + data[i][attr] + '">' + data[i][key] + '</option>'
            }
        } else {
            for (var i = 0; i < data.length; i++) {
                xmmcTemplate += '<option value="' + data[i][select] + '" id="' + data[i][select] + '">' + data[i][key] + '</option>'
            }
        }

    }

    $('#' + id).append(xmmcTemplate)
}

function lookPic(path){
    SysConfig.ToolBox.ShowVideo("查看", path, $(window).width() - 100, $(window).height() - 100);
}