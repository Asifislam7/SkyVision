let map;
let isPanning=false;
let panningInterval;
let pitch;
let bearing;

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
        zoom: 16,
        center: [80.9462, 26.8467], 
        pitch: 80,
        bearing: 0,
        style: 'mapbox://styles/mapbox/satellite-streets-v12'
    });

    map.on('style.load', () => {
        map.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
        });
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
        map.scrollZoom.disable();
    });

    const mapContainer = document.getElementById('map');
    mapContainer.focus();

    mapContainer.addEventListener("keyup", (event) => {
      // event.preventDefault();
      if (!isPanning) {
        const currentLatLng = map.getCenter(); 
          console.log("key pressed ");
        const latLngDelta = 0.01;
          console.log("event.key ", event.key);
        switch (event.key) {
          case "ArrowRight":
            clearInterval(panningInterval);
              console.log("cleared");
            panningInterval = setInterval( ()=>{
              const targetLatLng = { lat: currentLatLng.lat, lng: map.getCenter().lng+latLngDelta };
                console.log("currentLatLng ", currentLatLng);
            fetchweather(targetLatLng);
              map.panTo(targetLatLng);
                console.log("interval happening");
          }
          , 500) 
          // isPanning = true;
            break;
          case "ArrowLeft":
            clearInterval(panningInterval);
              console.log("cleared");
            panningInterval = setInterval( ()=>{
              const targetLatLng = { lat: currentLatLng.lat, lng: map.getCenter().lng-latLngDelta };
                console.log("currentLatLng ", currentLatLng);
            fetchweather(targetLatLng);
            map.panTo(targetLatLng);
                console.log("interval happening");
            }
            ,500)
            // isPanning = true; 
            break;
          case "ArrowUp":
            clearInterval(panningInterval);
              console.log("cleared");
            panningInterval = setInterval( ()=>{
            const targetLatLng = { lat: map.getCenter().lat + latLngDelta, lng: currentLatLng.lng };
              console.log("currentLatLng ", currentLatLng);
            fetchweather(targetLatLng);
            map.panTo(targetLatLng);
              console.log("interval happening");
          }
          , 500);
          // isPanning = true;
            break;
          case "ArrowDown":
            clearInterval(panningInterval);
              console.log("cleared");
            panningInterval = setInterval( ()=>{
            const targetLatLng = { lat: map.getCenter().lat - latLngDelta, lng: currentLatLng.lng };
              console.log("currentLatLng ", currentLatLng);
            fetchweather(targetLatLng);
            map.panTo(targetLatLng);
              console.log("interval happening");
          }
          , 500) 
          // isPanning = true;
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
              map.resetNorth({duration: 10000});

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
          const latLngDelta = 0.01;
          
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
              map.panTo(targetLatLng);      
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
              map.panTo(targetLatLng);
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
          const latLngDelta = 0.01;
          console.log("left double clicked");
          clearInterval(panningInterval);
          panningInterval = setInterval( ()=>{
            const targetLatLng = { lat: currentLatLng.lat, lng: map.getCenter().lng - latLngDelta };
            console.log("currentLatLng ", currentLatLng);
            map.panTo(targetLatLng);
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
          const latLngDelta = 0.01;
          clearInterval(panningInterval);
          panningInterval = setInterval( ()=>{
            const targetLatLng = { lat: currentLatLng.lat, lng: map.getCenter().lng + latLngDelta };
            console.log("currentLatLng ", currentLatLng);
            map.panTo(targetLatLng);
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
