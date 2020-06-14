// 面积测量方法
var areaMeasure = {
    showArea: false,
    points: [],
    color: "red",
    layers: DRAWLAYERS,
    polygon: null,
mScale:1,
    init: function (mScale)
    {
    	areaMeasure.mScale=mScale;
        areaMeasure.points = [];
        areaMeasure.polygon = null;
        map.on('click', areaMeasure.click).on('dblclick', areaMeasure.dblclick);
    },
    close: function ()
    {
        var lab = rectangleMeasure.tips.getLabel();
        var tt = document.createTextNode(rectangleMeasure.tips.getLabel()._content);
        lab._container.innerHTML = "";
        lab._container.appendChild(tt);
        var span = document.createElement("span");
        span.innerHTML = "【关闭】";
        span.style.color = "#00ff40";
     
        lab._container.appendChild(span);
        L.DomEvent.addListener(span, "click", function ()
        {
            rectangleMeasure.destory();
        });
    },
    click: function (e)
    {
        // map.doubleClickZoom.disable();
        // 添加点信息
        areaMeasure.points.push(e.latlng);
        // 添加面
        map.on('mousemove', areaMeasure.mousemove);
    },
    mousemove: function (e)
    {
        areaMeasure.points.push(e.latlng);
        if (areaMeasure.polygon)
            map.removeLayer(areaMeasure.polygon);
        areaMeasure.polygon = L.polygon(areaMeasure.points, { showMeasurements: true, color: 'red' });
        //areaMeasure.polygon.addTo(map);
        areaMeasure.polygon.addTo(areaMeasure.layers);
        areaMeasure.layers.addTo(map);
        areaMeasure.points.pop();
    },
    getMeasurementString: function ()
    {
        //var pointsCount = areaMeasure.points.length,
        //Marea = 0.0,
        //d2r = Math.PI / 180,
        //p1, p2;
        //if (pointsCount > 2) {
        //    for (var i = 0; i < pointsCount; i++) {
        //        p1 = areaMeasure.points[i];
        //        p2 = areaMeasure.points[(i + 1) % pointsCount];
        //        Marea += ((p2.lng - p1.lng) * d2r) * (2 + Math.sin(p1.lat * d2r) + Math.sin(p2.lat * d2r));
        //    }
        //    Marea = Marea * 6378137.0 * 6378137.0 / 2.0;
        //}

        //Marea = Math.abs(Marea);

        var pointsCount = areaMeasure.points.length,
       Marea = 0.0, p1, p2;

        if (pointsCount > 3)
        {
            for (var i = 0; i < pointsCount; i++)
            {
                Marea += areaMeasure.points[i].lng * (areaMeasure.points[i].lat - areaMeasure.points[(i + 1) % pointsCount].lat)
            }
        }
        else
        {
            Marea = 0;
        }
        Marea = Math.abs(Marea) / areaMeasure.mScale;
console.log(areaMeasure.mScale)
        // area = turf.area(areaMeasure.polygon.toGeoJSON());

        //if (area >= 1000000) {
        //    areaStr = L.GeometryUtil.formattedNumber(area * 0.000001, precision['m']) + ' m²';
        //} else {
        //    areaStr = L.GeometryUtil.formattedNumber(area, precision['cm']) + ' cm²';
        //}


        return "面积：" + Marea.toFixed(2)+"c㎡";
    },
    dblclick: function (e)
    { // 双击结束
        var cicon = L.divIcon({
            className: ' ',
            html: '<span  style="color:yellow;display:inline-block;min-width:500px; font-style: 宋体 ;font-weight:nomal;font-size:12px;">' + "" + areaMeasure.getMeasurementString() + '</span>'
        });

        var point = areaMeasure.polygon.getBounds().getCenter();
        var latlng3 = L.latLng(point.lat, point.lng);

        L.marker(point, { icon: cicon, clickable: true, riseOnHover: true, type:"mj" }).addTo(areaMeasure.layers);

        areaMeasure.polygon.addTo(areaMeasure.layers);
        // areaMeasure.polygon.enableEdit();
        map.on('editable:vertex:drag editable:vertex:deleted', areaMeasure.polygon.updateMeasurements, areaMeasure.polygon);
        map.off('click', areaMeasure.click).off('mousemove', areaMeasure.mousemove).off('dblclick', areaMeasure.dblclick);
    },
    destory: function ()
    {

    }
}