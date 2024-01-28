let map;
let isPanning=false;
let panningInterval=null;
let pitch;
let bearing;
let isNight=false;

document.addEventListener("DOMContentLoaded", function () {
  const sidebarBtn = document.querySelector(".sidebarBtn");
  const sidebar = document.querySelector(".sidebar");

  sidebarBtn.addEventListener("click", function () {
      sidebar.classList.toggle("on");
      sidebarBtn.classList.toggle("toggle");
  });
});

function initMap() {
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FzYWVlZCIsImEiOiJjbG03dnlsN3UwMjVxM3BxcXdxdmx5Y2prIn0.23CWN4iMiXMiosL3VqGUIQ';
        map = new mapboxgl.Map({
        container: 'map',
        zoom: 10,
        center: [80.9462, 26.8467], 
        pitch: 80,
        bearing: 0,
        style: 'mapbox://styles/mapbox/satellite-streets-v12'
    });

    map.on('style.load', () => {
        // Add 3D terrain
        map.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
        });
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
        map.scrollZoom.disable();
        changeToNightView();
    });

    const mapContainer = document.getElementById('map');
    mapContainer.focus();

    mapContainer.addEventListener("keyup", (event) => {
      // event.preventDefault();
      if (!isPanning) {
        const currentLatLng = map.getCenter(); 
          console.log("key pressed ");
        const latLngDelta = 0.001;
          console.log("event.key ", event.key);
        switch (event.key) {
          case "ArrowRight":
            clearInterval(panningInterval);
            panningInterval = setInterval( ()=>{
              const targetLatLng = { lat: currentLatLng.lat, lng: map.getCenter().lng+latLngDelta };
                console.log("currentLatLng ", currentLatLng);
            fetchweather(targetLatLng);
              //map.panTo(targetLatLng);
              map.flyTo({
                center: targetLatLng,
                zoom: map.getZoom(), 
                bearing: map.getBearing(), 
                speed: 0.15, 
                curve: Math.pow(6, 0.3), 
                easing(t) {
                  return t;
                  }
              });
                console.log("interval happening");
          }
          , 90) 
          
            break;
          case "ArrowLeft":
            clearInterval(panningInterval);
            panningInterval = setInterval( ()=>{
              const targetLatLng = { lat: currentLatLng.lat, lng: map.getCenter().lng-latLngDelta };
                console.log("currentLatLng ", currentLatLng);
            fetchweather(targetLatLng);
            //map.panTo(targetLatLng);
            map.flyTo({
              center: targetLatLng,
              zoom: map.getZoom(), 
              bearing: map.getBearing(), 
              speed: 1,
              curve: 1, 
              easing(t) {
                return t;
                }
            });
                console.log("interval happening");
            }
            ,90)
           
            break;
          case "ArrowUp":
            clearInterval(panningInterval);
            panningInterval = setInterval( ()=>{
            const targetLatLng = { lat: map.getCenter().lat + latLngDelta, lng: currentLatLng.lng };
              console.log("currentLatLng ", currentLatLng);
            fetchweather(targetLatLng);
            //map.panTo(targetLatLng);
            map.flyTo({
              center: targetLatLng,
              zoom: map.getZoom(), 
              bearing: map.getBearing(), 
              speed: 0.2, 
              curve: Math.pow(6, 0.3), 
              easing(t) {
                return t;
                }
            });  
              console.log("interval happening");
          }
          , 95)
          
            break;
          case "ArrowDown":
            clearInterval(panningInterval);
            panningInterval = setInterval( ()=>{
            const targetLatLng = { lat: map.getCenter().lat - latLngDelta, lng: currentLatLng.lng };
              console.log("currentLatLng ", currentLatLng);
            fetchweather(targetLatLng);
            //map.panTo(targetLatLng);
            map.flyTo({
              center: targetLatLng,
              zoom: map.getZoom(), 
              bearing: map.getBearing(), 
              speed: 0.2, 
              curve: Math.pow(6, 0.3), 
              easing(t) {
                return t;
                }
            });
              console.log("interval happening");
          }
          , 95) 
          
            break;
            case "1":
              pitch = map.getPitch();
              map.setPitch(pitch + 1);
              break;
            case "2":
              pitch = map.getPitch();
              map.setPitch(pitch - 1);
              break;
            case "3":
              bearing = map.getBearing();
              map.setBearing(bearing - 5);
              break;
            case "4":
              bearing = map.getBearing();
              map.setBearing(bearing + 5);
              break;
            case "5":
              pitch = map.getPitch();
              bearing = map.getBearing();
              map.setBearing(bearing - 5);
              map.setPitch(pitch - 1);     
              break;
            case "6":
              pitch = map.getPitch();
              bearing = map.getBearing();
              map.setBearing(bearing + 5);
              map.setPitch(pitch + 1);  
              break;
            default:
              clearInterval(panningInterval);
              break;
          }
        }
      });


      mapContainer.addEventListener("wheel", (event) => {
        event.preventDefault();
        if (!isPanning) {
          const currentLatLng = map.getCenter();
          console.log("scrolled");
          const latLngDelta = 0.001;
          
          let y=event.deltaY; 
      
          if (y < 0) {
            clearInterval(panningInterval); 
            console.log("move up");
            panningInterval = setInterval(() => {
              const targetLatLng = {
                lat: map.getCenter().lat + latLngDelta,
                lng: currentLatLng.lng
              };
              console.log("currentLatLng ", currentLatLng);
              //map.panTo(targetLatLng);      
              map.flyTo({
                center: targetLatLng,
                zoom: map.getZoom(), 
                bearing: map.getBearing(), 
                speed: 0.2, 
                curve: Math.pow(6, 0.3), 
                easing(t) {
                  return t;
                  }
              }); 
              fetchweather(targetLatLng);
              console.log("interval happening");
            }, 500);
          } else if(y > 0) {
            clearInterval(panningInterval); 
            console.log("move down");
            panningInterval = setInterval(() => {
              const targetLatLng = {
                lat: map.getCenter().lat - latLngDelta,
                lng: currentLatLng.lng 
              };
              console.log("currentLatLng ", currentLatLng);
              //map.panTo(targetLatLng);
              map.flyTo({
                center: targetLatLng,
                zoom: map.getZoom(), 
                bearing: map.getBearing(), 
                speed: 0.2, 
                curve: Math.pow(6, 0.3), 
                easing(t) {
                  return t;
                  }
              }); 
              fetchweather(targetLatLng);
              console.log("interval happening");
            }, 500);
          }
          
        }
      });
  
      mapContainer.addEventListener("dblclick", (event) => {
        event.preventDefault();
        if (!isPanning) {
          const currentLatLng = map.getCenter();
          const latLngDelta = 0.001;
          console.log("left double clicked");
          clearInterval(panningInterval);
          panningInterval = setInterval( ()=>{
            const targetLatLng = { lat: currentLatLng.lat, lng: map.getCenter().lng - latLngDelta };
            console.log("currentLatLng ", currentLatLng);
            //map.panTo(targetLatLng);
            map.flyTo({
              center: targetLatLng,
              zoom: map.getZoom(), 
              bearing: map.getBearing(), 
              speed: 0.2, 
              curve: Math.pow(6, 0.3), 
              easing(t) {
                return t;
                }
            }); 
            fetchweather(targetLatLng);
              console.log("left movement");
          }
          , 500) 
        }
      });
          
      mapContainer.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        if (!isPanning) {
          const currentLatLng = map.getCenter();
          console.log("right double clicked");
          const latLngDelta = 0.001;
          clearInterval(panningInterval);
          panningInterval = setInterval( ()=>{
            const targetLatLng = { lat: currentLatLng.lat, lng: map.getCenter().lng + latLngDelta };
            console.log("currentLatLng ", currentLatLng);
            //map.panTo(targetLatLng);
            map.flyTo({
              center: targetLatLng,
              zoom: map.getZoom(), 
              bearing: map.getBearing(), 
              speed: 0.2, 
              curve: Math.pow(6, 0.3), 
              easing(t) {
                return t;
                }
            }); 
            fetchweather(targetLatLng);
              console.log("right movement");
          }
          , 500) 
        }
      });

    document.addEventListener("keyup", (event) => {
      if (event.key === "9") {
        clearInterval(panningInterval);
        isPanning = false;
        console.log("cleared, ", event.key);
      }
    });

      function changeToNightView() {
        // night fog styling
        map.setFog({
          'range': [-1, 3],
          'horizon-blend': 0.2,
          'color': '#242B4B',
          'high-color': '#161B36',
          'space-color': '#0B1026',
          'star-intensity': 0.9
          });
        isNight=true;

        let back= document.getElementById('Body');
        back.style.background="#161B36";

        let heading= document.getElementById('heading');
        heading.style.background="#161B36";
        heading.style.color="#ffffff";
        heading.style.opacity=1;

        const weatherBtns = document.querySelectorAll('.weather-buttons');
        weatherBtns.forEach(function (btn) {
          btn.style.color = '#ffffff';
          heading.style.opacity=1;
        });

      }

      function changeToDayView() {
        // day fog styling
        map.setFog({
          'range': [-1, 3],
          'horizon-blend': 0.2,
          'color': 'white',
          'high-color': '#add8e6',
          'space-color': '#d8f2ff',
          'star-intensity': 0.0
          });
        isNight=false;

        let back= document.getElementById('Body');
        back.style.background="#e6f7ff";

        let heading= document.getElementById('heading');
        heading.style.background="#e6f7ff";
        heading.style.color="#000836";

        const weatherBtns = document.querySelectorAll('.weather-buttons');
        weatherBtns.forEach(function (btn) {
          btn.style.color = '#000836';
          heading.style.opacity=1;
        });
      }
  
      var nightView = document.getElementById("cloudyMoon");

      if (nightView) {
          nightView.addEventListener("click", function(){
            if(isNight){
              changeToDayView();
            }
            else{
              changeToNightView();
            }
          });
      }
  

}

const fetchweather = async (latlngval) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlngval.lat}&lon=${latlngval.lng}&appid=f73ed61fb07c92119524fb527670a54a`;
  try {
    const response = await fetch(url);
    const result = await response.text();
    console.log('result', JSON.parse(result));
    var temp = Math.round((JSON.parse(result).main.temp - 273) * 10) / 10;
    var humidity = JSON.parse(result).main.humidity;
    var windspeed = JSON.parse(result).wind.speed * 6 / 5 + 'kmh';
    var pressure = JSON.parse(result).main.pressure;
    var feels_like = (Math.round(((JSON.parse(result).main.feels_like - 273)) * 10)) / 1;
    var icon = JSON.parse(result).weather[0].icon;
    var coordinates = JSON.parse(result).coord;
     console.log(coordinates)

    document.getElementById('weather').innerHTML = temp + ` deg celsius,` + ` Humidity: `+humidity+ `, Windspeed: `+windspeed
    +`, Air-Pressure: `+pressure+`, Coordinates `+coordinates.lat+ `, `+coordinates.lon;
  }
     catch (error) {
    console.error(error);
  }
}
