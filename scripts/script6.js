// const { resolveBaseUrl } = require("vite");
let map;
let isPanning = false;
let panningInterval;
let pitch;
let bearing;
let isNight = false;
let overlay;
let flag = 0;
let flag1 = 0;
let flag2 = 0;
let deltaZoom = 19;
let coordinates1;
let coordinates2;
let coordinates0;
let city;
let country;
let columns;
let airport_name;
let lat;
let long;
let airport_city;
let airport;
let airport_lat;
let airport_lng;
let isSnow = false;



//<-------------------------------------------------------fetching the weather--------------------------------------------------------------->

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
    var wind_direction = JSON.parse(result).wind.deg;
    var name = JSON.parse(result).name;
    //  console.log(coordinates)


    document.getElementById('weather').innerHTML = 'Temerature: ' + temp + `\n\xB0C` + `<br>Humidity: ` + humidity + `<br>Windspeed: ` + windspeed
      + `<br>Wind Direction: ` + wind_direction + ` deg from North` + `<br>Air-Pressure: ` + pressure + `<br>Coordinates: [ ` + coordinates.lat + `, ` + coordinates.lon + ' ]';
  }
  catch (error) {
    console.error(error);
  }
}

// <-------------------------------------Fetch weather completed--------------------->
// function displayOverlay() {
//   document.getElementById('overlay').style.display = 'block';
// }

// window.addEventListener('load', displayOverlay);
// window.addEventListener('load', displayOverlay());

// overlay = document.getElementById("fa-solid fa-globe");
// overlay.addEventListener('click', displayOverlay());

// function submitLocation() {
//   var locationInput = document.getElementById('locationInput').value;
//   //api integrate here to say the name of the city

//   fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${locationInput}.json?access_token=pk.eyJ1Ijoic2FzYWVlZCIsImEiOiJjbG03dnlsN3UwMjVxM3BxcXdxdmx5Y2prIn0.23CWN4iMiXMiosL3VqGUIQ`)
//     .then(response => response.json())
//     .then(data => {
//       if (data.features && data.features.length > 0) {

//         const coordinates = data.features[0].center;

//         map.flyTo({
//           center: coordinates,
//           zoom: 16,
//         });

//         document.getElementById('overlay').style.display = 'none';
//       } else {
//         alert('Location not found. Please enter a valid location.');
//       }
//     })
//     .catch(error => {
//       console.error('Error while geocoding:', error);
//       alert('An error occurred while geocoding. Please try again later.');
//     });

//   document.getElementById('locationInput').value = '';

// }


// <------------------------Asma Code-------------------------->

function displayOverlay2() {
  var gamepad = document.getElementById("fa-solid fa-gamepad");
  gamepad.addEventListener('click', (event) => {
    if (!flag1) {
      document.getElementById("o2").style.display = 'block';
      flag1 = 1;
    } else {
      document.getElementById("o2").style.display = 'none';
      flag1 = 0;
    }
  });
}

function displayOverlay() {
  var overlay = document.getElementById('fa-solid fa-globe');
  overlay.addEventListener('click', (event) => {
    if (!flag2) {
      document.getElementById("overlay").style.display = 'block';
      flag2 = 1;
    } else {
      document.getElementById("overlay").style.display = 'none';
      flag2 = 0;
    }
  });
}

// window.addEventListener('load', (event) => {
//   document.getElementById("overlay").style.display = 'block';
// });

overlay = document.getElementById("fa-solid fa-globe");
overlay.addEventListener('click', fitToZoom());

function fitToZoom() {
  const expand = document.getElementById("map");
  expand.classList.toggle("expanded");
}

function submitLocation() {
  if (!flag) {
    fitToZoom();
    flag = 1;
  }

  var locationInput = document.getElementById('locationInput').value;

  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${locationInput}.json?access_token=pk.eyJ1Ijoic2FzYWVlZCIsImEiOiJjbG03dnlsN3UwMjVxM3BxcXdxdmx5Y2prIn0.23CWN4iMiXMiosL3VqGUIQ`)
    .then(response => response.json())
    .then(data => {
      if (data.features && data.features.length > 0) {

        coordinates0 = data.features[0].center;

        map.flyTo({
          center: coordinates0,
          zoom: 16,
        });

        document.getElementById('overlay').style.display = 'none';
      } else {
        alert('Location not found. Please enter a valid location.');
      }
    })
    .catch(error => {
      console.error('Error while geocoding:', error);
      alert('An error occurred while geocoding. Please try again later.');
    });

  document.getElementById('locationInput').value = '';

}

//<----------------------------------------------------------------------------------------------------------->



//<---------------------------------------------------Map Integration------------------------------------------->
function initMap() {
  mapboxgl.accessToken = 'pk.eyJ1Ijoic2FzYWVlZCIsImEiOiJjbG03dnlsN3UwMjVxM3BxcXdxdmx5Y2prIn0.23CWN4iMiXMiosL3VqGUIQ';
  map = new mapboxgl.Map({
    container: 'map',
    zoom: 16,
    center: [80.9462, 26.8467],
    pitch: 80,
    bearing: 0,
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    interactive: false
  });


  console.log("Script6 Loaded sucessfully!!");

    const sidebarBtn = document.querySelector(".sidebarBtn");
    const sidebar = document.querySelector(".sidebar");

    sidebarBtn.addEventListener("click", function () {
      sidebar.classList.toggle("on");
      sidebarBtn.classList.toggle("toggle");
    });
  

  // <-------------------------   Music----------------------------------------------------->
  const audio = document.getElementById("backgroundmusic");
  const start = document.getElementById("start");
  const infoBox = document.getElementById("infoBox");
  const location = document.getElementById("location");
  start.addEventListener("click", () => {
    console.log("clicked");
    document.querySelector(".hidden").style.display = "block";
    setTimeout(() => {
      document.querySelector(".hidden").style.transition = "opacity 2s ease-in-out";
      document.querySelector(".hidden").style.opacity = 0;
    }, 7000);
    location.play();
    setTimeout(() => {
      audio.play();
    }, 5000);
  });

  // </----------------------------Music------------------------------------------>

  // <--------------------------------------Robot location music code------------------------------------------->

  const robot = document.getElementById('robot');
  robot.addEventListener('click', () => {
    console.log("clicked");
    const latitude = map.getCenter().lat;
    const longitude = map.getCenter().lng;
    const coordinates = `${latitude},${longitude}`;
    console.log(coordinates)
    const url1 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f73ed61fb07c92119524fb527670a54a`;
    // const url1 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates}.json?access_token=pk.eyJ1Ijoic2FzYWVlZCIsImEiOiJjbG03dnlsN3UwMjVxM3BxcXdxdmx5Y2prIn0.23CWN4iMiXMiosL3VqGUIQ`;

    async function fetchData() {
      try {
        const response1 = await fetch(url1);
        if (!response1.ok) {
          throw new Error('Network response was not ok.');
        }
        const result1 = await response1.text();
        var area = JSON.parse(result1).name;

        const text = `You are flying over ${area}`;
        const msg = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(msg);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  });

  // <-----------------------------------ends here------------------------------------>

  // <-------------------------------------------------------------------->



  map.on('style.load', () => {
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

  function easing(t) {
    return t * (2 - t);
  }


  mapContainer.addEventListener("keyup", (event) => {
    event.preventDefault();
    if (!isPanning) {
      const currentLatLng = map.getCenter();
      console.log("key pressed ");
      const latLngDelta = 0.01;
      console.log("event.key ", event.key);

      let deltaDistance = 100;
      const deltaDegrees = 25;

      document.getElementById("weather-box").style.display = "block";
      document.getElementById("map-info").style.display = 'block';
      switch (event.key) {
        case "ArrowRight":
          clearInterval(panningInterval);
          console.log("cleared");
          panningInterval = setInterval(() => {
            const targetLatLng = { lat: map.getCenter().lat+ latLngDelta, lng: currentLatLng.lng };
            console.log("currentLatLng ", currentLatLng);

            mapinfoFun(currentLatLng, targetLatLng);

            //<--------------------------------------------------->

            fetchweather(targetLatLng);
            map.panBy([+deltaDistance, 0], {
              easing: easing,
              duration: 2000,
              essential: true,
            });
            while (deltaDistance <= 1000) {
              deltaDistance += 100;
              console.log("deltaDistance", deltaDistance);
            }
            console.log("interval happening");
          }
            , 1000);
          break;

        case "ArrowLeft":
          clearInterval(panningInterval);
          console.log("cleared");
          panningInterval = setInterval(() => {
            const targetLatLng = { lat: map.getCenter().lat- latLngDelta, lng: currentLatLng.lng };
  
            console.log("currentLatLng ", currentLatLng);

            mapinfoFun(currentLatLng, targetLatLng);

            //<--------------------------------------------------->

            fetchweather(targetLatLng);
            map.panBy([-deltaDistance, 0], {
              easing: easing,
              duration: 4000,
              essential: true,
            });
            while (deltaDistance <= 1000) {
              deltaDistance += 100;
              console.log("deltaDistance", deltaDistance);
            }
            console.log("interval happening");
          }
            , 1000)

          break;
        case "ArrowUp":
          clearInterval(panningInterval);
          console.log("cleared");
          panningInterval = setInterval(() => {
            const targetLatLng = { lat: currentLatLng.lat, lng: map.getCenter().lng- latLngDelta };
            console.log("currentLatLng ", currentLatLng);
            mapinfoFun(currentLatLng, targetLatLng);
            fetchweather(targetLatLng);
            map.panBy([0, -deltaDistance], {
              easing,
              duration: 2000,
              essential: true,
            });
            while (deltaDistance <= 1000) {
              deltaDistance += 100;
              console.log("deltaDistance", deltaDistance);
            }
          }
            , 1000);
          break;
        case "ArrowDown":
          const backaudio = document.getElementById('backward');
          backaudio.play();


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
          map.easeTo({
            bearing: map.getBearing() - deltaDegrees,
            easing: easing
          });
          break;
        case "4":
          map.easeTo({
            bearing: map.getBearing() + deltaDegrees,
            easing: easing
          });
          break;
        case "5":
          map.easeTo({
            bearing: map.getBearing() - deltaDegrees,
            pitch: map.getPitch() - 1,
            easing: easing
          });
          break;
        case "6":
          map.easeTo({
            bearing: map.getBearing() + deltaDegrees,
            pitch: map.getPitch() + 1,
            easing: easing
          });
          break;
        default:
          clearInterval(panningInterval);
          console.log("wrong key pressed");
          break;
      }
    }
  });



  // mapContainer.addEventListener("wheel", (event) => {

  //   event.preventDefault();
  //   if (!isPanning) {
  //     const currentLatLng = map.getCenter();
  //     console.log("scrolled");
  //     console.log("key pressed ");
  //     const latLngDelta = 0.01;
  //     console.log("event.key ", event.key);

  //     let deltaDistance = 100;
  //     let y = event.deltaY;
  //     let x = event.deltaX;
  //     if (y < 0) {
  //       clearInterval(panningInterval);
  //       console.log("move up");
  //       panningInterval = setInterval(() => {
  //         const targetLatLng = {
  //           lat: map.getCenter().lat + latLngDelta,
  //           lng: currentLatLng.lng
  //         };
  //         fetchweather(targetLatLng);
  //         map.panBy([0, -deltaDistance], {
  //           easing,
  //           duration: 2000,
  //           essential: true,
  //         });
  //         while (deltaDistance <= 1000) {
  //           deltaDistance += 100;
  //           console.log("deltaDistance", deltaDistance);
  //         }
  //         bearing = map.getBearing();
  //         console.log("interval happening", bearing);

  //       }, 1000);
  //     } else if (y > 0) {
  //       clearInterval(panningInterval);
  //       console.log("move down");
  //       panningInterval = setInterval(() => {
  //         const targetLatLng = {
  //           lat: map.getCenter().lat - latLngDelta,
  //           lng: currentLatLng.lng
  //         };
  //         fetchweather(targetLatLng);
  //         map.panBy([0, +deltaDistance], {
  //           easing,
  //           duration: 2000,
  //           essential: true,
  //         });
  //         while (deltaDistance <= 1000) {
  //           deltaDistance += 100;
  //           console.log("deltaDistance", deltaDistance);
  //         }
  //         bearing = map.getBearing();
  //         console.log("interval happening", bearing);
  //       }, 1000);
  //     }
  //     if (x > 0) {
  //       console.log("move right");
  //       clearInterval(panningInterval);
  //       console.log("move up");
  //       panningInterval = setInterval(() => {
  //         const targetLatLng = {
  //           lat: map.getCenter().lat + latLngDelta,
  //           lng: currentLatLng.lng
  //         };
  //         fetchweather(targetLatLng);
  //         map.panBy([+deltaDistance, 0], {
  //           easing,
  //           duration: 2000,
  //           essential: true,
  //         });
  //         while (deltaDistance <= 1000) {
  //           deltaDistance += 100;
  //           console.log("deltaDistance", deltaDistance);
  //         }
  //         bearing = map.getBearing();
  //         console.log("interval happening", bearing);

  //       }, 1000);
  //     }
  //     else if (x < 0) {
  //       console.log("move right");
  //       clearInterval(panningInterval);
  //       console.log("move up");
  //       panningInterval = setInterval(() => {
  //         const targetLatLng = {
  //           lat: map.getCenter().lat + latLngDelta,
  //           lng: currentLatLng.lng
  //         };
  //         fetchweather(targetLatLng);
  //         map.panBy([-deltaDistance, 0], {
  //           easing,
  //           duration: 2000,
  //           essential: true,
  //         });
  //         while (deltaDistance <= 1000) {
  //           deltaDistance += 100;
  //           console.log("deltaDistance", deltaDistance);
  //         }
  //         bearing = map.getBearing();
  //         console.log("interval happening", bearing);

  //       }, 1000);
  //     }
  //   }
  // });

  // mapContainer.addEventListener("dblclick", (event) => {
  //   event.preventDefault();
  //   if (!isPanning) {
  //     const currentLatLng = map.getCenter();
  //     const latLngDelta = 0.01;
  //     console.log("left double clicked");
  //     clearInterval(panningInterval);
  //     panningInterval = setInterval(() => {
  //       const targetLatLng = { lat: currentLatLng.lat, lng: map.getCenter().lng - latLngDelta };
  //       console.log("currentLatLng ", currentLatLng);
  //       map.panTo(targetLatLng);
  //       fetchweather(targetLatLng);
  //       console.log("left movement");
  //     }
  //       , 500)
  //   }
  // });

  // mapContainer.addEventListener("contextmenu", (event) => {
  //   event.preventDefault();
  //   if (!isPanning) {
  //     const currentLatLng = map.getCenter();
  //     console.log("right double clicked");
  //     const latLngDelta = 0.01;
  //     clearInterval(panningInterval);
  //     panningInterval = setInterval(() => {
  //       const targetLatLng = { lat: currentLatLng.lat, lng: map.getCenter().lng + latLngDelta };
  //       console.log("currentLatLng ", currentLatLng);
  //       map.panTo(targetLatLng);
  //       fetchweather(targetLatLng);
  //       console.log("right movement");
  //     }
  //       , 500)
  //   }
  // });

  document.addEventListener("keyup", (event) => {
    if (event.key === "9") {
      clearInterval(panningInterval);
      isPanning = false;
      console.log("cleared, ", event.key);
    }
  });


  // <-------------------------------------------------->

  // <-------------------------------------Including Asma code from here------------------------------>


  function mapinfoFun(currentLatLng, targetLatLng) {
    const elevation = Math.floor(
      map.queryTerrainElevation(currentLatLng, { exaggerated: false })
    );

    console.log('Elevation:', elevation, 'meters');

    bearing = map.getBearing();
    console.log('Bearing: ', bearing);

    const reverseGeocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${targetLatLng.lng},${targetLatLng.lat}.json?access_token=${'pk.eyJ1Ijoic2FzYWVlZCIsImEiOiJjbG03dnlsN3UwMjVxM3BxcXdxdmx5Y2prIn0.23CWN4iMiXMiosL3VqGUIQ'}`;

    fetch(reverseGeocodingUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          city = data.features[0].context.find((item) => item.id.startsWith('place')).text;
          country = data.features[0].context.find((item) => item.id.startsWith('country')).text;
          console.log('City:', city);
          console.log('Country: ', country);
        } else {
          console.log('Location not found.');
        }
      })
      .catch((error) => {
        console.error('Error while reverse geocoding:', error);
      });

    async function processData() {
      const response = await fetch('../airports.csv');
      const data = await response.text();

      //const airports = await csv().fromString(data);
      // console.log(data);

      const table = data.split('\n').slice(1);
      table.forEach(row => {
        columns = row.split(',');
        airport_name = columns[3];
        lat = columns[4];
        long = columns[5];
        airport_city = columns[6];
        //console.log(airport_name, lat, long, city );

        if (airport_city.trim().toLowerCase() === city.trim().toLowerCase()) {
          airport = airport_name;
          airport_lat = lat;
          airport_lng = long;
          console.log(airport_city, lat, long, city);
        }
      });
      // console.log(rows);
    }
    processData();


    document.getElementById("mapInformation").innerHTML = 'Elevation: ' + elevation + '<br>Bearing: ' + bearing + '<br>City: ' + city + '<br>Country: ' + country + '<br>Airport: ' + airport + '<br> Airport Latitude: ' + airport_lat + '<br>Airport Longitude: ' + airport_lng;
  }

  // <----------------------------------------------------------------->

  function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.style.left = `${Math.random() * 100}vw`;
    document.body.appendChild(snowflake);
  }

  function snowfall() {
    setInterval(createSnowflake, 100);
  }

  var snow = document.getElementById("snowflake");
  snow.style.cursor = "pointer";
  let snowaudio = document.getElementById("snow")
  snow.addEventListener("click", () => {
    snowfall();
    snowaudio.play();
  });

  function createRaindrop() {
    const raindrop = document.createElement('div');
    raindrop.className = 'raindrop';
    raindrop.style.left = `${Math.random() * 100}vw`;
    document.body.appendChild(raindrop);
  }

  function rainfall() {
    setInterval(createRaindrop, 100);
  }

  var rain = document.getElementById("rainnight");
  rain.addEventListener("click", () => {
    rainfall();
    // snowaudio.play();
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
    isNight = true;

    let back = document.getElementById('Body');
    back.style.background = "#161B36";

    let heading = document.getElementById('heading');
    heading.style.background = "#161B36";
    heading.style.color = "#ffffff";
    heading.style.opacity = 1;

    const weatherBtns = document.querySelectorAll('.weather-buttons');
    weatherBtns.forEach(function (btn) {
      btn.style.color = '#ffffff';
      heading.style.opacity = 1;
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
    isNight = false;

    let back = document.getElementById('Body');
    back.style.background = "#e6f7ff";

    let heading = document.getElementById('heading');
    heading.style.background = "#e6f7ff";
    heading.style.color = "#000836";

    const weatherBtns = document.querySelectorAll('.weather-buttons');
    weatherBtns.forEach(function (btn) {
      btn.style.color = '#000836';
      heading.style.opacity = 1;
    });
  }

  var nightView = document.getElementById("cloudyMoon");
  const day = document.getElementById('day');
  const night = document.getElementById('night');


  if (nightView) {
    nightView.addEventListener("click", function () {
      if (isNight) {
        day.play();
        changeToDayView();

      }
      else {
        night.play();
        changeToNightView();
      }
    });
  }

  function toggleBox() {
    var element = document.getElementById("map-info");
    if (element.style.display === "block" || element.style.display === "") {
      element.style.display = "none";
    } else {
      element.style.display = "block";
    }
  }

  var triangle = document.getElementById("triangle");
  triangle.addEventListener("click", toggleBox);

 



}


// <-------------------------------------------------->