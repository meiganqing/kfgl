String.prototype.getQuery = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = this.substr(this.indexOf("?") + 1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
var m_Scale = 1.0;
//var indexPath=window.location.href.getQuery("path").lastIndexOf("/");
//var path_=window.location.href.getQuery("path").substr(0,indexPath+1)
var path_ = window.location.href.getQuery("path").split(".")[0]
var width_ = window.location.href.getQuery("w");
var height_ = window.location.href.getQuery("h");
var iconClassScale = "noValue"; //有值时的图标
var type = "test"
var map = L.map('photo', {
	crs: L.CRS.Simple, //Set a flat projection, as we are projecting an image
	attributionControl: false,
	zoomControl: false
});
//var map = L.map('map', {
//    center: [29.749817, -95.080757],
//    zoom: 16,
//    measureControl: true
//});

//获取数据库 的比列
postData("wwGetDataList", {
	TblNum: 104,
	T1043: "EQ" + window.location.href.getQuery("path")
	//		T1043: "EQ/kf/Upload/Images//20181217134812622/Image20181221110436018386278270_sss.jpg" 

}, function(returnData) {
	if(returnData.success && returnData.data.length > 0) {

		m_Scale = returnData.data[0]['比例'] ? returnData.data[0]['比例'] : 1.0;
		//存值，存图片的信息值
		store.set("pictureMsg", returnData.data[0])
	} else {
		if(type == "test") {
			store.set("pictureMsg", {
				id: "22317",
				分类: "现状",
				图片地址: "/kf/Upload/Images//20181217134812622/Image20181221110436018386278270_sss.jpg",
				图片类型: "系统上传",
				备注: "",
				尺寸: "",
				数量: "",
				文图名称: "timg12.jpg",
				文物入库编号: "KF00192393",
				比例: "1.0",
				表对应码: "386",
			})
		}
	}

	if(m_Scale != 1.0) {
		iconClassScale = 'haveValue';
	}
	console.log(m_Scale)
}, "", false)

//要传的页面路径，可从页面地址中传参数过来，要设置的页面的宽度高度

var layer = L.tileLayer.zoomify(path_ + '/{g}/{z}-{x}-{y}.jpg', {
	width: width_,
	height: height_,
	tolerance: 0.8,
	attribution: 'title'
}).addTo(map);
//var layer = L.tileLayer.zoomify('TP0000002/TP0000002/{g}/{z}-{x}-{y}.jpg', {
//	width: 10000,
//	height: 10000,
//	tolerance: 0.8,
//	attribution: 'title'
//}).addTo(map);

//        var bottomLeft = new L.LatLng(-85, -180),

//topRight = new L.LatLng(85, 180),

//bounds = new L.LatLngBounds(bottomLeft, topRight);

//        map.setMaxBounds(bounds);

map.fitBounds(layer.getBounds());

var DRAWLAYERS = new L.featureGroup([]);
map.addLayer(DRAWLAYERS);
map.on('fullscreenchange', function() {
	if(map.isFullscreen()) {
		console.log('entered fullscreen');
	} else {
		console.log('exited fullscreen');
	}
});
console.log(L.control)
L.control.custom({
		position: 'topleft',
		content: '<button type="button" class="" >' +
			'    <i class="" id="fullScreen"></i>' +
			'</button>' +
			'<button type="button" class="' + iconClassScale + '" >' +
			'<i id="scaleMeasure"></i>' +
			'</button>' +
			'<button type="button" class="" >' +
			'    <i class="" id="polygon"></i>' +
			'</button>' +
			'<button type="button" class="" >' +
			'    <i class="" id="polyline"></i>' +
			'</button>' +
			'<button type="button" class=""  >' +
			'    <i class="" id="eraser"></i>' +
			'</button>' +
			'<button type="button" class=""  >' +
			'    <i class="" id="print"></i>' +
			'</button>',
		classes: 'btn-group-vertical btn-group-sm',
		style: {
			margin: '10px',
			padding: '0px 0 0 0',
			cursor: 'pointer'
		},
		datas: {
			'foo': 'bar',
		},
		events: {
			click: function(data) {

				console.log('wrapper div element clicked');
				console.log(data);
				console.log(data.target._leaflet_id)
				//			
				console.log(data.target.id)
				switch(data.target.id) {
					case "fullScreen":

						map.toggleFullscreen();
						console.log(map.toggleFullscreen)
						break;
					case "scaleMeasure":
						scaleMeasure.init()


						break;
					case "polygon":
						if(store.get("value_measure")) {
							m_Scale = store.get("value_measure");
						}

						lineMeasure.init(m_Scale)
						break;
					case "polyline":
					if(store.get("value_measure")) {
							m_Scale = store.get("value_measure");
						}
						areaMeasure.init(m_Scale)
						break;
					case "eraser":
						cleanLayer()
						break;
					case "print":
						manualPrint () 
						break;
				}

			},
			dblclick: function(data) {
				console.log('wrapper div element dblclicked');
				console.log(data);
			},
			contextmenu: function(data) {
				console.log('wrapper div element contextmenu');
				console.log(data);
			},
		}
	})
	.addTo(map);
//打印


	var printer = L.easyPrint({
//    		tileLayer: tiles,
      		sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
//    		filename: 'myMap',
      		exportOnly: true,
      		hideControlContainer: true
		}).addTo(map);

		function manualPrint () {
			printer.printMap('CurrentSize', 'MyManualPrint')
		}




function cleanLayer() {
	DRAWLAYERS.clearLayers();
	//map.eachLayer(function (layer)
	//{
	//    console.log(layer);
	//    if (layer.options.attribution != 'title')
	//    {
	//        map.removeLayer(layer);
	//    }
	//})
}