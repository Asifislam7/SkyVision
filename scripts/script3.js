let map;
let isPanning = false;
let targetLatLng;
let sourceLatLng, destLatLng;
let progress = 0;
const animationDuration = 4000;
let animationStartTime;
let key;
let panningInterval;
let weatherInterval;
console.log("script3 page loaded");


document.addEventListener("DOMContentLoaded", function () {
  const sidebarBtn = document.querySelector(".sidebarBtn");
  const sidebar = document.querySelector(".sidebar");

  sidebarBtn.addEventListener("click", function () {
      sidebar.classList.toggle("on");
      sidebarBtn.classList.toggle("toggle");
  });
});


function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 27.0238,
      lng: 74.2179,
    },
    zoom: 16,
    heading: 90,

    tilt: 90,
    mapId: "90f87356969d889c",
    zoomControl: false,
    gestureHandling: "none",
    cache: true,
    maxZoom: 18,
  });


  document.addEventListener("keyup", (event) => {
    event.preventDefault();
    if (!isPanning) {
      const currentLatLng = map.getCenter();
      console.log("key pressed ");
      const latLngDelta = 0.01;
      console.log("event.key ", event.key);
      switch (event.key) {
        case "ArrowRight":
          clearInterval(panningInterval);
          panningInterval = setInterval(() => {
            const targetLatLng = { lat: currentLatLng.lat(), lng: map.getCenter().lng() + latLngDelta };
            console.log("currentLatLng ", currentLatLng);
            map.panTo(targetLatLng);
            console.log("interval happening");
          }
            , 500)
          break;
        case "ArrowLeft":
          clearInterval(panningInterval);
          panningInterval = setInterval(() => {
            const targetLatLng = { lat: currentLatLng.lat(), lng: map.getCenter().lng() - latLngDelta };
            console.log("currentLatLng ", currentLatLng);
            map.panTo(targetLatLng);
            console.log("interval happening");
          }
            , 500)
          break;
        case "ArrowUp":
          clearInterval(panningInterval);
          panningInterval = setInterval(() => {
            const targetLatLng = { lat: map.getCenter().lat() + latLngDelta, lng: currentLatLng.lng() };
            console.log(targetLatLng)
            fetchweather(targetLatLng);
            console.log("currentLatLng ", currentLatLng);
            map.panTo(targetLatLng);
            console.log("interval happening");
          }, 500);

          break;
        case "ArrowDown":
          clearInterval(panningInterval);
          panningInterval = setInterval(() => {
            const targetLatLng = { lat: map.getCenter().lat() - latLngDelta, lng: currentLatLng.lng() };
            console.log("currentLatLng ", currentLatLng);
            map.panTo(targetLatLng);
            console.log("interval happening");
          }
            , 500)
          break;
        case "1":
          let pitchUp = -1;
          adjustMap("pitch", pitchUp);
          break;
        case "2":
          let pitchDown = 1;
          adjustMap("pitch", pitchDown);
          break; 8
        case "3":
          let yawRight = -5;
          adjustMap("yaw", yawRight);
          break;
        case "4":
          let yawLeft = 5;
          adjustMap("yaw", yawLeft);
          break;
        case "5":
          let rollRight = 5;
          adjustMap("roll", rollRight);
          break;
        case "6":
          let rollLeft = -5;
          adjustMap("roll", rollLeft);
          break;
        default:
          clearInterval(panningInterval);
          break;
      }
    }
  });


  document.addEventListener("wheel", (event) => {
    event.preventDefault();
    if (!isPanning) {
      const currentLatLng = map.getCenter();
      console.log("scrolled");
      const latLngDelta = 0.01;

      let y = event.deltaY;

      if (y < 0) {
        clearInterval(panningInterval);
        console.log("move up");
        panningInterval = setInterval(() => {
          const targetLatLng = {
            lat: map.getCenter().lat() + latLngDelta,
            lng: currentLatLng.lng()
          };
          console.log("currentLatLng ", currentLatLng);
          map.panTo(targetLatLng);
          console.log("interval happening");
        }, 500);
      } else if (y > 0) {
        clearInterval(panningInterval);
        console.log("move down");
        panningInterval = setInterval(() => {
          const targetLatLng = {
            lat: map.getCenter().lat() - latLngDelta,
            lng: currentLatLng.lng()
          };
          console.log("currentLatLng ", currentLatLng);
          map.panTo(targetLatLng);
          console.log("interval happening");
        }, 500);
      }

    }
  });

  document.addEventListener("dblclick", (event) => {
    event.preventDefault();
    if (!isPanning) {
      const currentLatLng = map.getCenter();
      console.log("left double clicked");
      clearInterval(panningInterval);
      panningInterval = setInterval(() => {
        console.log("currentLatLng ", currentLatLng);
        map.panBy(-45, 0);
        console.log("left movement");
      }
        , 100)
    }
  });

  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    if (!isPanning) {
      const currentLatLng = map.getCenter();
      console.log("right double clicked");
      //const latLngDelta = 0.01;
      clearInterval(panningInterval);
      panningInterval = setInterval(() => {
        //const targetLatLng = { lat: currentLatLng.lat(), lng: map.getCenter().lng()+latLngDelta };
        console.log("currentLatLng ", currentLatLng);
        map.panBy(48, 0);
        console.log("right movement");
      }
        , 100)
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === "8") {
      clearInterval(panningInterval);
      isPanning = false;
    }
  });


  // const source= document.getElementById("src");
  // source.addEventListener("blur", () => {
  //   console.log("source event triggered");
  //   const loc = source.value;
  //   if(loc.trim() !== ""){
  //     const geocoder= new google.maps.Geocoder();

  //     geocoder.geocode({ address: loc }, (results, status) => {
  //       if (status === google.maps.GeocoderStatus.OK) {
  //         const latitude = results[0].geometry.location.lat();
  //         const longitude = results[0].geometry.location.lng();

  //         sourceLatLng={lat: latitude, lng: longitude};
  //       map.panTo({lat: latitude, lng: longitude});
  //     }
  //     });
  //   }
  // });  

  // const moveButton = document.getElementById("move");
  // moveButton.addEventListener("click", () => {
  //   startMovement();
  // }); 



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

      document.getElementById('weather').innerHTML = `Temp: `+temp + ` deg celsius <br> ` +` Humidity: `+humidity+ `<br> Wind Speed:   `+windspeed
      +`<br> Air Pressure: `+pressure+` <br>   `+coordinates.lat+ `, `+coordinates.lon;
    }
       catch (error) {
      console.error(error);
    }
  }

  // Three.js setup
  // Make sure that the `texttospeech` object has been initialized before you try to access it.





// Wait for the `textToSpeech` object to initialize before accessing it.



  
// Create a new TextToSpeech object
//  const textToSpeech = new google.cloud.texttospeech.v1.TextToSpeechClient();
// // Create a new synthesis request
// const synthesisRequest = {
//   input: { text: 'This is the text that you want to convert to speech' },
//   voice: { name: 'en-US-Wavenet-A' },
//   audioConfig: { audioEncoding: 'LINEAR16' },
// };

// // Send the synthesis request to the API
// const response =  textToSpeech.synthesizeSpeech(synthesisRequest);

// // Get the audio response
// const audio = response.audioContent;

// audio.play();

// Stream the audio to your website visitors


const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');
// Creates a client
const client = new textToSpeech.TextToSpeechClient();
async function quickStart() {
  // The text to synthesize
  const text = 'hello, world!';

  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
}
quickStart();ss


}






const adjustMap = function (mode, amount) {
  switch (mode) {
    case "roll":      //one wing upar and wing down       //make this to turn left right!!!!
      const currentTilt = map.getTilt();
      const currentHeading = map.getHeading();
      map.setTilt(currentTilt + (amount));
      map.setHeading(currentHeading + (amount));
      break;
    case "pitch":
      map.setZoom(map.getZoom() + (amount));      //correct!!!!
      break;
    case "yaw":                                  //correct!!!!
      map.setHeading(map.getHeading() + amount);
      break;
  }
}







