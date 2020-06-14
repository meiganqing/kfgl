var container;
var loading;
$(function() {
	layui.use(['laypage', 'layer', 'table'], function() {
		var laypage = layui.laypage,
			layer = layui.layer;
			table = layui.table;
			
		container = $('.waterfull ul');
		loading = $('#imloading');
		loading.data("on", true); // 初始化loading状态
		//初始化瀑布流，装瀑布流的div的class命名为.waterfull,加载分页的div命名为demo0
		var showgetWaterfall = new getWaterfall({
			ele: container,
			postUrl: "/api/kf/data?XAction=wwGetDataList",
			postData: {
				TblNum: '104',
				limit: 10
			},
			imgKey: "图片地址",
			imgTitleKey: "文物入库编号"
		});
		showgetWaterfall.initPBL();
		laypage.render({//分页处理
			elem: 'demolaypage',
			count: 50,
			jump: function(obj, first) {
				pageNum = obj.curr
				showgetWaterfall.loadImageList(obj.curr, 20); //请求图片数据
				//首次不执行
				if(first) {
					//do something
				}
			}
		});
		
		/*item hover效果*/
		var rbgB = ['#71D3F5', '#F0C179', '#F28386', '#8BD38B'];
		$('#waterfull').on('mouseover', '.item', function() {
			var random = Math.floor(Math.random() * 4);
			$(this).stop(true).animate({
				'backgroundColor': rbgB[random]
			}, 1000);
		});
		$('#waterfull').on('mouseout', '.item', function() {
			$(this).stop(true).animate({
				'backgroundColor': '#fff'
			}, 1000);
		});
		$(window).resize(function() {
			showgetWaterfall.tores();
		});
		$(window).scroll(function() {
			showgetWaterfall.updateImgStyle()
		});

	});
})

//TODO:参数格式：{
//	ele:"" 命名为li上边的ul, 
//	url:"" 请求后台的地址,
//	data:"" 请求后台的数据,
//	imgKey:"" 后台图片的路径的key,
//	"imgTitleKey":"" 图片的名称的key}
var getWaterfall = function(options) {
	this.options = options;

}
getWaterfall.prototype = {
	initPBL: function() { //初始化瀑布流
		var that = this;
		that.options.ele.imagesLoaded(function() {
			that.options.ele.masonry({
				columnWidth: 320,
				itemSelector: '.item',
				isFitWidth: true, //是否根据浏览器窗口大小自动适应默认false
				isAnimated: true, //是否采用jquery动画进行重拍版
				isRTL: false, //设置布局的排列方式，即：定位砖块时，是从左向右排列还是从右向左排列。默认值为false，即从左向右
				isResizable: true, //是否自动布局默认true
				animationOptions: {
					duration: 1800,
					easing: 'easeInOutBack', //如果你引用了jQeasing这里就可以添加对应的动态动画效果，如果没引用删除这行，默认是匀速变化
					queue: false //是否队列，从一点填充瀑布流
				}
			});
		});
		this.tores();
	},
	tores: function() { //判断页面的宽度
		var tmpWid = $(window).width();
		if(tmpWid > 1280) {
			tmpWid = 1280;
		} else {
			var column = Math.floor(tmpWid / 320);
			tmpWid = column * 320;
		}
		$('.waterfull').width(tmpWid);
		console.log(tmpWid)
	},
	loadImageList: function(pageNum, pageRowCount) { //请求图片信息
		var that = this;
		that.options.postData.page = pageNum;
		$.ajax({
			async: false,
			url: that.options.postUrl,
			type: "post",
			data: that.options.postData,
			dataType: 'json',
			error: function(request, msg) {
				layer.msg("请求数据失败")
			},
			success: function(data) {
				if(data.msg) {
					that.getTemplate(data.data)
				}
			}
		});
	},
	getTemplate: function(data) {//模板格式可以自定义修改
		var html = "";
		var returnValue = data;
		var that = this;
		console.log(returnValue)
		for(var i in returnValue) {
			html += `<li class="item" style="opacity: 1;top: 112px;position: absolute;left: 400px;">
		<a href="#" class="a-img"  onclick="lookPic('${returnValue[i][that.options.imgKey]}')">
		<img src="${returnValue[i][that.options.imgKey]}"></a>
		<div class="formation">
			<h5 class="li-title" >${returnValue[i][that.options.imgTitleKey]}</h5>
			<button class="layui-btn insideBtn" onclick="clickInformation('${that.options.imgTitleKey}')" style="">详情</button>
		</div>
	</li>`
		}
		/*模拟ajax请求数据时延时800毫秒*/
		var time = setTimeout(function() {
			$(html).find('img').each(function(index) {
				that.loadImage($(this).attr('src'));
			})
			var $newElems = $(html).css({
				opacity: 0
			})
			that.options.ele.html($newElems);
			that.initPBL()
			$newElems.imagesLoaded(function() {
				$newElems.animate({
					opacity: 1
				}, 200);
				that.options.ele.masonry('appended', $newElems, true);
				loading.data("on", true).fadeOut();
				clearTimeout(time);
			});
		}, 200)
		that.loadImage('images/one.jpg');
	},
	loadImage: function(url) {
		var img = new Image();
		//创建一个Image对象，实现图片的预下载
		img.src = url;
		if(img.complete) {
			return img.src;
		}
		img.onload = function() {
			return img.src;
		};
	},
	updateImgStyle: function(loading) {
		if(!loading.data("on")) return;
		// 计算所有瀑布流块中距离顶部最大，进而在滚动条滚动时，来进行ajax请求，方法很多这里只列举最简单一种，最易理解一种
		var itemNum = $('#waterfull').find('.item').length;
		var itemArr = [];
		itemArr[0] = $('#waterfull').find('.item').eq(itemNum - 1).offset().top + $('#waterfull').find('.item').eq(itemNum - 1)[0].offsetHeight;
		itemArr[1] = $('#waterfull').find('.item').eq(itemNum - 2).offset().top + $('#waterfull').find('.item').eq(itemNum - 1)[0].offsetHeight;
		itemArr[2] = $('#waterfull').find('.item').eq(itemNum - 3).offset().top + $('#waterfull').find('.item').eq(itemNum - 1)[0].offsetHeight;
		var maxTop = Math.max.apply(null, itemArr);
		if(maxTop < $(window).height() + $(document).scrollTop()) {
			//加载更多数据
			loading.data("on", false).fadeIn(800);
			(function(sqlJson) {
				/*这里会根据后台返回的数据来判断是否你进行分页或者数据加载完毕这里假设大于30就不在加载数据*/
				if(itemNum > 100) {
					loading.text('就有这么多了！');
				} else {
					pageNum++;
					LoadImageList(pageNum, 20);
				}
			})(sqlJson);
		}
	}

}

//调用文物详情信息页面
function clickInformation(obj) {
	//调用文物详情弹窗页
	layerPage02 = openWindow(2, 'wwjcxx.html?knbh=' + obj, "详细信息", $(window).width(), $(window).height());
}