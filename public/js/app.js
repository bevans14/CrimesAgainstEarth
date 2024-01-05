var  map  =  new  google.maps.Map(document.getElementById('map'),  {  
    center:  new  google.maps.LatLng(35.7596,  -79.0193),  
    mapTypeId:  google.maps.MapTypeId.ROADMAP,  
    zoom:  7
});  

var  t  =  new  Date().getTime();  
var  waqiMapOverlay  =  new  google.maps.ImageMapType({  
    getTileUrl:  function  (coord,  zoom)  {  
          return  'https://tiles.aqicn.org/tiles/usepa-aqi/'  +  zoom  +  "/"  +  coord.x  +  "/"  +  coord.y  +  ".png?token=_TOKEN_ID_";  
    },  
    name:  "Air  Quality",  
});  

map.overlayMapTypes.insertAt(0,  waqiMapOverlay);  