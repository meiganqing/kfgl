/*
 * @陕西唐远
 * @文件名:login.js 
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-10-14 11:25:23
 * @描述: 登录页js 
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录: 1. 10/14 zlb 更换登录接口
 */
/*
 * @陕西唐远
 * @文件名: 
 * @作者: 马娜
 * @Git: 马娜
 * @Date: 2019 10 19
 * @描述: 登录页样式调整
 * @版本: 1.00
 * @修改历史纪录: （）
 * @记录: 1. 10/14 马娜 更换登录接口
 */
//TODO：登陆那里调整成用户密码手机验证码，用户密码，手机验证码，三种模式可后台控制切换
//1.用户登录请求获得当前登录配置的方式
//2.根据配置的方式组合input 
//3.后台添加页面配置当前登录方式
//
//所用的数据库表：陕院用户系统库  表 xdUserLogin 对应TableNum 7017
//所用的接口：wwGetDataList ，wwModifyDataById   登录接口无改变
var loginType = ""
var xt = 'gr';
var phoneUrl = window.location.href.getQuery("pUrl"); //手机链接打开的页面
$(document).ready(function() {

    //获取配置登录图片
    //获取配置登录图片
    postData("wwGetDataList", {
        TblNum: 175
    }, function(data) {
        for (var i = 0; i < data.data.length; i++) {
            if (data.data[i]['sysname'] == "loginBg") {
                console.log(data.data[i].sysvalue)
                    //					$("#container").css({"backgroundColor":"red"})
                $("#container").css({
                    "backgroundImage": "url(" + data.data[i].sysvalue + ")"
                })
            }
            if (data.data[i]['sysname'] == "logo") {
                $("#systemName").attr({
                    "src": data.data[i].sysvalue
                })

            }
            if (data.data[i]['sysname'] == "用户名称") {
                localStorage.setItem("yhname", data.data[i].sysvalue)

            }
            if (data.data[i]['sysname'] == "技术支持") {
                $("#copyright_name_value").html(data.data[i].sysvalue)

            }
            if (data.data[i]['sysname'] == "使用单位") {
                $("#support_name_value").html(data.data[i].sysvalue)

            }

        }
    })

    //1）获取登录方式
    var loginTypeData = PostDataPublicLogin("/xdData/xdDataManage.ashx", "GetDataInterface", {
        //          XKLX: 'SYBGGL',
        //          TblNum: 8057,
        //          T503: 'EQlogin'
        XKLX: "SYYHGL",
        XDLMCID: "1001",
        XDLMSID: "DYBH20190907161048104889231",
        XDLMA: "login",
        XKLX_APPID: "92837277"
    })

    //	3联合登录,使用手机，验证码，密码登录
    //	2手机登录,使用手机，验证码登录
    //	1普通登录,使用账户名，密码登录

    if (loginTypeData.success) {
        for (var i = 0; i < loginTypeData.rows.length; i++) {
            if (loginTypeData.rows[i].state == "1") {
                loginType = loginTypeData.rows[i].name
            }
        }

        //2)控制标签的显示
        if (loginType == "联合登录") {
            $("#nameDiv").removeClass("layui-hide")
            $("#sjdiv").removeClass("layui-hide")
            $("#yzmdiv").removeClass("layui-hide")
            $("#psddiv").removeClass("layui-hide")
        } else if (loginType == "手机登录") {
            $("#sjdiv").removeClass("layui-hide")
            $("#yzmdiv").removeClass("layui-hide")
        } else {
            $("#nameDiv").removeClass("layui-hide")
            $("#psddiv").removeClass("layui-hide")
        }
    }
    layui.use(['layer', 'form'], function() {
        var layer = layui.layer,
            form = layui.form;
        $('.dltab a').click(function() {
            $(this).addClass('cur').siblings('.cur').removeClass('cur');
        });
        //登录
        $('#login_btn_yhm').on("click", function() {
                login();
            })
            //登录获取验证码
        $('#getyzm').click(function() {
            var time = 60;
            var countdown = 60;

            function settime(obj) {
                if (countdown == 0) {
                    obj.removeAttribute("disabled");
                    obj.value = "获取验证码";
                    countdown = 60;
                    return;
                } else {
                    obj.setAttribute("disabled", true);
                    obj.value = "重新发送(" + countdown + ")";
                    countdown--;
                }
                setTimeout(function() {
                    settime($(this))
                }, 1000)
            }
            verifyPhone($("#phone"), $(this))
        });
        //忘记密码
        $("#forget-btn").click(function() {
                if ($("#forget-btn").html().indexOf("忘记") !== -1) {
                    $("#forget_div").removeClass("layui-hide")
                    $("#login_div").addClass("layui-hide")
                    $("#forget-btn").html("直接登录")
                } else {
                    $("#login_div").removeClass("layui-hide")
                    $("#forget_div").addClass("layui-hide")
                    $("#forget-btn").html("忘记密码？")
                }
            })
            //忘记密码获取验证码
        $('#getyzm_forget').click(function() {
            verifyPhone($("#phone_forget"), $(this))

        });
        $("#login_btn_isyz").click(function() { //验证验证码	
            var isyzFlag = true;
            isyzFlag = isyzFlag && vertify($('#phone_forget'), "请先输入手机号码！")
            isyzFlag = isyzFlag && vertify($('#yzm_forget'), "请先获取验证码")
            if (isyzFlag) {
                var dataReturn = verifyEnd("VerifyCaptcha", {
                        "wPhoneNum": $("#phone_forget").val(),
                        "wCaptcha": $("#yzm_forget").val(),
                        "XKLX": "SYYHGL"
                    },
                    "验证通过", "验证失败"
                )
                if (dataReturn) {
                    $("#verify_div").addClass("layui-hide")
                    $("#psd_div").removeClass("layui-hide")

                }
            }

        })
        $("#btn_surePsd").click(function() { //修改密码
            var verifyflag = true;
            verifyflag = verifyflag && vertify($("#newPsd"), "请输入新密码");
            verifyflag = verifyflag && vertify($("#againPsd"), "请再次输入密码");
            if (verifyflag) {
                if ($("#newPsd").val() != $("#againPsd").val()) {
                    layer.alert("两次密码不一致，请重新输入", {
                        title: '提示框',
                        icon: 0
                    }, function(index) {
                        $("#againPsd").val("")
                        $("#againPsd").focus();
                        layer.close(index);
                    });
                } else {
                    var changeSuccess = verifyEnd("ResetPassword", {
                            "wPhoneNum": $("#phone_forget").val(),
                            "wCaptcha": $("#yzm_forget").val(),
                            "wPassword": $("#againPsd").val(),
                            "XKLX": "SYYHGL"
                        },
                        "修改成功", "修改失败"
                    )
                    if (changeSuccess) {
                        $("#login_div").removeClass("layui-hide")
                        $("#forget_div").addClass("layui-hide")
                        $("#psd_div").addClass("layui-hide")
                        $("#verify_div").removeClass("layui-hide")
                        $("#forget-btn").html("忘记密码？")
                        $("#forget_div").find("input").val("")
                        $("#psd_div").find("input").val("")
                    }
                }
            }
        })
        $(".eyeicon").click(function() {
            if ($(this).siblings("input").attr("type") == "password") {
                $(this).siblings("input").attr("type", "text")
                $(this).removeClass("fa-eye-slash").addClass("fa-eye")
            } else {
                $(this).siblings("input").attr("type", "password")
                $(this).removeClass("fa-eye").addClass("fa-eye-slash")
            }
        })

    });

});

function countDown(that) {
    var countdown = 60;
    var that = that
    var timer = setInterval(function() {

        if (countdown == 0) {
            $(that).attr("disabled", false);
            $(that).val("获取验证码")
            countdown = 60;
            clearInterval(timer)
            return;
        } else {
            $(that).attr("disabled", true);
            $(that).val("重新发送(" + countdown + ")");
            countdown--;
        }
    }, 1000)
}

function verifyEnd(action, where, tip1, tip2) {
    var returnValue = PostDataPublic("/xdData/UserHandler.ashx", action, where);
    if (returnValue.msg || returnValue.success) {
        layer.msg(tip1, {
            title: '提示框',
            icon: 1,
            time: 800
        }, function(alertindex) {
            if ($('.dltab a.cur').html() == '个人系统') { //个人

            } else { //yz
            }
            layer.close(alertindex);
        });

    } else {
        layer.msg(tip2 + returnValue + '', {
            icon: 2,
            time: 1000
        }, function(alertindex) {
            layer.close(alertindex);
        });
    }
    return returnValue.msg
}

function verifyPhone(phone, that) {
    if ($(phone).val() == "") {

        layer.alert("请先输入手机号码！", {
            title: '提示框',
            icon: 0,

        }, function(index) {

            $(phone).focus();
            layer.close(index);

        });
    } else {
        //验证手机号码是否正确
        var sMobile = $(phone).val();
        if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(sMobile))) {
            layer.alert("不是完整的11位手机号或者正确的手机号前七位！", {
                title: '提示框',
                icon: 0,

            }, function(index) {

                $(phone).focus();
                layer.close(index);

            });
        } else {
            countDown(that)
                //获取验证码
            getYZM($(phone).val());
        }
    }
}
//获取验证码
function getYZM(pnum) {
    var returnData = PostDataPublicLogin("/xdData/UserHandler.ashx", "GetSMS", {
        XKLX: 'SYYHGL',
        wPhone: pnum
    });
    if ((typeof returnData) == "string") {
        layer.alert(returnData, {
            title: '系统提示',
            icon: 2
        });
    } else {
        if (returnData.msg) {
            console.log(returnData);
            layer.msg('发送成功', {
                icon: 1,
                time: 800
            });
        }
    }
}

function login() {
    var flag = true
    var where = "";
    var action = 'SuperLogin'
    if (loginType == "3") {
        flag = flag && vertify($('#phone'), "请先输入手机号码！")
        flag = flag && vertify($('#upsd'), "密码不能为空！")
        flag = flag && vertify($('#yzm'), "请先获取验证码！")
        where = {
            wPhone: $('#phone').val(),
            wPassword: $("#upsd").val(),
            wUserName: $("#uname").val(),
            wCaptcha: $('#yzm').val(),
            XKLX: 'SYYHGL',
        }

        action = 'SuperLogin'
    } else if (loginType == "2") {
        flag = flag && vertify($('#phone'), "请先输入手机号码！")
        flag = flag && vertify($('#yzm'), "请先获取验证码！")
        where = {
                wPhone: $('#phone').val(),
                wCaptcha: $('#yzm').val(),
                XKLX: 'SYYHGL',

            }
            //					var rv1 = PostDatasyyh("CaptchaLogin", {
            //						wPhone: $('#phone').val(),
            //						wCaptcha: $('#yzm').val()
            //					});
        action = 'CaptchaLogin';
    } else {
        flag = flag && vertify($('#uname'), "用户名不能为空！")
        flag = flag && vertify($('#upsd'), "密码不能为空！")

        where = {
                XDLMCID: "7000",
                XDLMSID: "DYBH2019100817082905540958",
                XDLMTID: "7001",
                XDLMmLoginName: $("#uname").val(),
                XDLMPassword: $("#upsd").val(),
                XKLX: 'SYYHGL',
                XKLX_APPID: "92837277"
            }
            //      where = {
            //          XDLMUserName: $("#uname").val(),
            //          XDLMPassword: $("#upsd").val(),
            //          XKLX: 'SYYHGL',
            //
            //      }
        action = 'GetDataInterface';
    }

    if (flag) {
        UserLogin(action, where);
    }
}
//全局统一调用
function PostDataPublic(_url, mActionType, mActionData) {
    var url_ = ""
    if (_url) {
        url_ = _url
    } else {
        url_ = "/wwSYGR/wwData/wwDataManageGR.ashx"
    }
    var rv;
    var index33;

    try {
        $.ajax({
            async: false,
            cache: false,
            type: "post",
            url: url_ + "?XAction=" + mActionType,
            data: mActionData, // $('#mkufang').val() 
            dataType: 'json',
            headers: {
                Authorization: getToken() //登录后返回sytoken
            },
            success: function(returnValue) {
                //              console.log(returnValue);
                if (returnValue.msg || returnValue.success) {
                    //                  layer.close(index33);
                    rv = returnValue

                } else {
                    rv = returnValue.message;

                }
                if (rv == "NOTLOGIN") {
                    window.parent.location.href = projectFileName + "/login.html" + getphoneUrl();
                }

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                rv = XMLHttpRequest.responseText;
                // rv = XMLHttpRequest.status + "," + XMLHttpRequest.readyState + "," + textStatus;
                //alert(XMLHttpRequest.status);
                //alert(XMLHttpRequest.readyState);
                //alert(textStatus);
            }

        });
    } catch (e) {
        rv = e.message;
    }

    return rv;
}

function setLoginCookie(data) {
    //	mDepart					
    //mUserID				
    //mUserLevel				
    //mUserLevelNum			
    //mUserName				
    //mUserOnlyNum				
    //realName
    //
    // 人事原本cookie存储
    setCookie("rsgl_userid", data.id, "d7") 
    setCookie("rsgl_name", data.mLoginName, "d7")
    setCookie('rsgl_level', data.mUserLevel, 'h8');
    setCookie('rsgl_onlynum', data.onlynum, 'h8'); 
    //
    setCookie("mUserID", data.mUserID, "d1")
    setCookie("mDepart", data.mDepart, "d1")
    setCookie("mUserLevel", data.mUserLevel, "d1")
    setCookie("mUserName", data.mUserName, "d1")
    setCookie("mUserOnlyNum", data.onlynum, "d1")

    setCookie("UserId", data.userid, "d7")
    setCookie("mUserId", data.id, "d7")
    localStorage.setItem("mUserName", data.mLoginName);

    //mUserID	user_1051	192.168.28.251	/	2019-10-08T18:09:36.474Z	16				
    //mUserLevel	%e5%9f%ba%e5%9c%b0%e4%b8%bb%e4%bb%bb	192.168.28.251	/	2019-10-08T18:09:36.474Z	46				
    //mUserName
}

function UserLogin(action, where) {
    var returnValue = PostDataPublicLogin("/xdData/xdDataManage.ashx", action, where);

    if (returnValue.msg || returnValue.success) {
        // 陕院
        // new
        // PostDataSystem(returnValue.sytoken, {
        //     XDLMCID: "1001",
        //     XDLMSID: "DYBH20191210095138513834261",
        //     XDLMA: "sykf",
        //     XDLMB: returnValue.data[0].onlynum,
        //     XDLMC: "是"
        // }, function(Systendata) {
        //     if (Systendata.success && Systendata.rows && Systendata.rows.length > 0) {

        //存值
        setLoginCookie(returnValue.data[0])
        localStorage.setItem("sytoken", returnValue.sytoken);
        layer.msg('登陆成功，正在打开首页！', {
            title: '提示框',
            icon: 1,
            time: 800
        }, function(alertindex) {
            //使用cookie读取useronlynum 
            store.set("ueserOnlynum", getCookieName("mUserOnlyNum"));
            if (phoneUrl) {
                window.location.href = phoneUrl;
            } else {
                //				window.location.href = './finance_index.html?t=7';
                //				window.parent.location.href =  "./chooseStorage.html" 

                openWindowbtnclose(2, './chooseStorage.html?butclose=0', "", 628, 377);
            }
            //          if ($('.dltab a.cur').html() == '个人系统') { //个人
            //          	if(phoneUrl){
            //          		window.location.href = phoneUrl;
            //          	}else {
            //              	window.location.href = 'index_gr.html?t=3';
            //          		
            //          	}
            //
            //
            //          } else { //yz
            //              window.location.href = 'index.html?t=1';
            //          }
            layer.close(alertindex);
        });
        //     } else {
        //         layer.msg("您没有访问该系统权限");
        //     }
        // })

    } else {
        layer.msg('登陆失败,' + returnValue + '', {
            icon: 2,
            time: 1000
        }, function(alertindex) {
            layer.close(alertindex);
        });
    }

}
//登录的ajax，需要存值
function PostDataPublicLogin(_url, mActionType, mActionData) {
    var url_ = ""
    if (_url) {
        url_ = _url
    } else {
        url_ = "/wwSYGR/wwData/wwDataManageGR.ashx";
    }
    console.log("88888")
    var rv;
    var index33;

    try {
        $.ajax({
            async: false,
            cache: false,
            type: "post",
            url: url_ + "?XAction=" + mActionType,
            data: mActionData, // $('#mkufang').val() 
            dataType: 'json',
            success: function(returnValue) {
                //              console.log(returnValue);
                if (returnValue.msg || returnValue.success) {
                    //                  layer.close(index33);
                    rv = returnValue

                } else {
                    rv = returnValue.message;

                }
                if (rv == "NOTLOGIN") {
                    window.parent.location.href = "/login.html" + getphoneUrl();
                }

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                rv = XMLHttpRequest.responseText;
                // rv = XMLHttpRequest.status + "," + XMLHttpRequest.readyState + "," + textStatus;
                //alert(XMLHttpRequest.status);
                //alert(XMLHttpRequest.readyState);
                //alert(textStatus);
            }

        });
    } catch (e) {
        console.log(e)
        rv = e.message;
    }

    return rv;
}
$(document).keypress(function(e) {
    // 回车键事件  
    if (e.which == 13) {

        login();
    }
});

function vertify(value, tip) {
    if ($(value).val() == "") {
        layer.alert(tip, {
            title: '提示框',
            icon: 0
        }, function(index) {

            $(value).focus();
            layer.close(index);

        });
        return false
    } else {

        return true;
    }
}
//var url = "/api/lib/user";
//
//
//var $, form, imgIp = location.origin,
//  where,
//  loginImgSrc;
//$(function() {
//  layui.use(["jquery", "form"], function() {
//      $ = layui.jquery,
//          form = layui.form;
//      // 库房下拉列表
//      // getStore();
//      form.render("select")
//      form.on('submit(LAY-user-login-submit)', function(data) {
//              console.log("kk")
//              data.field.XDLMmLoginName = $("#UserName").val();
//              data.field.XDLMPassword = $("#Password").val();
//              data.field.XDLMCID = '7000',
//                  data.field.XDLMSID = 'DYBH2019100817082905540958',
//                  data.field.XDLMTID = '7001',
//                  data.field.XKLX_APPID = '92837277'
//              userLogin(data.field)
//          })
//
//  })
//})
//
//function getStore() {
//  postDataLogin("wwGetDataList", {
//      TblNum: 162
//  }, function(data) {
//      getSelect("Storage", data.data, "库房名")
//      form.render("select")
//  }, url)
//}
//
//function userLogin(where) {
// 
//  PostDataLogins(where, function(data) {
//      if (data.message == "登陆成功") {
//          setCookiee("mUserId", data.data[0].mUserId, "d7") 
//          setCookiee("mUserOnlyNum", data.data[0].onlynum, "d7")   
//          setCookiee("mUserName", data.data[0].mUserName, "d7")   
//          setCookiee("UserId", data.data[0].userid, "d7")
//          localStorage.setItem("mUserName", data.data[0].mLoginName);
//          localStorage.setItem("sytoken", data.sytoken)
//          layer.msg(data.message);
//          window.location.href = "./index.html";
//      } else {
//          layer.msg(data.message)
//      }
//  })
//}
//
//function PostDataLogins(requestData, callback) {
//  console.log(requestData)
//  let ipUrls = "/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYYHGL";
//
//  var rv = '';
//  try {
//      $.ajax({
//          async: true,
//          cache: false,
//          type: "post",
//          url: ipUrls,
//          data: requestData,
//          dataType: 'json',
//          // headers: {
//          //     "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ4ZCIsImF1ZCI6Im9jdG9iZXIiLCJzdWIiOiJ0eWtnIiwianRpIjoieGQifQ.hBTpg2lDbRawh_BVUOfi8aXbA3wxVMsFbB800N7TFQs"
//          // },
//          success: function(returnData) {
//
//              if (returnData.success || returnData.msg) {
//
//                  if (callback) {
//                      callback(returnData, this)
//                  }
//                  rv = returnData
//              } else {
//                  rv = returnData.message;
//                  if (rv == "NOTLOGIN") {
//
//                      // parent.location.href = baseUrl + "/login.html"
//
//                  } else {
//                      layer.msg(rv)
//                  }
//              }
//          },
//          error: function(XMLHttpRequest, textStatus, errorThrown) {
//              rv = XMLHttpRequest.responseText;
//              layer.msg(rv)
//
//          }
//      });
//  } catch (e) {
//      rv = e.message;
//  }
//}