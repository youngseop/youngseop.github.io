window.addEventListener('load', initMap);      //html 문서가 로드되면 호출할 함수 지정
var vmap;          //Vworld Map 객체 변수 선언
var div_vmap;      //html div를 가리킬 객체 변수 선언
function initMap() {
div_vmap = document.getElementById('v_map');         //html 문서의 div를 div_vmap변수에 연결  
vw.ol3.MapOptions = {                               //지도 초기화
        basemapType: vw.ol3.BasemapType.GRAPHIC,
        controlDensity: vw.ol3.DensityType.EMPTY,
        interactionDensity: vw.ol3.DensityType.BASIC,
        controlsAutoArrange: true,
        homePosition: vw.ol3.CameraPosition,
        initPosition: vw.ol3.CameraPosition
        };
        vmap = new vw.ol3.Map(div_vmap, vw.ol3.MapOptions); //html div 영역에 Vworld 객체를
        //지도가 html 문서에 초기화 되었을 때 사용자에게 보이는 중심점
        vmap.getView().setCenter(ol.proj.transform([127.8945727, 36.3505553], "EPSG:4326", "EPSG:3857"));
        vmap.getView().setZoom(8);    //지도가 html 문서에 초기화 되었을 때 사용자에게 보이는 줌 레벨
        createLinePath();              //지도상 Line을 그리기위한 임의 예제 함수
        }

function createLinePath() {
var inputLinePath = [[127.8945727, 36.3505553], [127.1945727, 35.7505553]]; //선이 그려질 좌표
var drawLinePathPoint = []; // "EPSG:3857"형식의 좌표를 "EPSG:4326"로 바꾼 후 저장할 배열
for (let item of inputLinePath) {
drawLinePathPoint.push(ol.proj.transform([Number(item[0]), Number(item[1])],
"EPSG:4326", "EPSG:3857"));
}
var vectorSource = new ol.source.Vector();                       //벡터소스 객체 생성
var vectorLayer = new ol.layer.Vector({ source: vectorSource });    //벡터레이어 객체 생성
addPathLine(vectorSource, drawLinePathPoint.);
vmap.addLayer(vectorLayer);
}

function addPathLine(src, drawLinePathPoint) {
var feature = new ol.Feature({                                 //모형 객체 생성
geometry: new ol.geom.LineString(drawLinePathPoint)        //선 객체 지정
});
var style = new ol.style.Style({                                 //스타일 객체 생성
stroke: new ol.style.Stroke({
color: 'red',
width: 4
})
});
feature.setStyle(style);                                         //도형에 스타일 객체 지정
vectorSource.addFeature(feature);                              //벡터소스에 도형 지정
}
