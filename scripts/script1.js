let map;
let isPanning = false;
let targetLatLng;
let sourceLatLng, destLatLng;
let progress = 0;
const animationDuration = 4000; // Animation duration in milliseconds
let animationStartTime;
let key;

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
      // mapType: google.maps.MapType.TERRAIN,
    });
  
    
    document.addEventListener("keydown", (event) => {
      if (!isPanning) {
        const currentLatLng = map.getCenter(); 

        const latLngDelta = 0.01;
    
        switch (event.key) {
          case "ArrowRight":
            targetLatLng = { lat: currentLatLng.lat(), lng: currentLatLng.lng() + latLngDelta };
            startSmoothPanning();
            break;
          case "ArrowLeft":
            targetLatLng = { lat: currentLatLng.lat(), lng: currentLatLng.lng() - latLngDelta };
            startSmoothPanning();
            break;
          case "ArrowUp":
            targetLatLng = { lat: currentLatLng.lat() + latLngDelta, lng: currentLatLng.lng() };
            startSmoothPanning();
            break;
          case "ArrowDown":
            targetLatLng = { lat: currentLatLng.lat() - latLngDelta, lng: currentLatLng.lng() };
            startSmoothPanning();
            break;
            case "1":
              let pitchUp = -1;
              adjustMap("pitch", pitchUp);
              break;
            case "2":
              let pitchDown = 1;
              adjustMap("pitch", pitchDown);
              break;
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
              adjustMap("roll", rollRight);       //yaw right
              break;
            case "6":
              let rollLeft = -5;
              adjustMap("roll", rollLeft);
              break;
          }
        }
      });

      const source= document.getElementById("src");
      source.addEventListener("blur", () => {
        console.log("source event triggered");
        const loc = source.value;
        if(loc.trim() !== ""){
          const geocoder= new google.maps.Geocoder();
          
          geocoder.geocode({ address: loc }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
              const latitude = results[0].geometry.location.lat();
              const longitude = results[0].geometry.location.lng();
              
              sourceLatLng={lat: latitude, lng: longitude};
            map.panTo({lat: latitude, lng: longitude});
          }
          });
        }
      });  

      const moveButton = document.getElementById("move");
      moveButton.addEventListener("click", () => {
        startMovement();
      });       
}


function displayMap(mapData) {
  console.log("mapData ", mapData)
  map = new google.maps.Map(document.getElementById("map"), {
    center: mapData,
    zoom: 16,
    heading: 90,
    tilt: 45,
    mapId: "90f87356969d889c",
    zoomControl: false,
    gestureHandling: "none",
    cache: true,
    maxZoom: 18,
    //mapType: google.maps.MapType.TERRAIN,
  });
  // animationStartTime = performance.now();
  // animateMovement();
}



function generateStorageKey(destination) {
return destination;
}  




function startMovement() {
  const geocoder = new google.maps.Geocoder();
  const sourceValue = document.getElementById("src").value;
  const destValue = document.getElementById("des").value;
  
   key=generateStorageKey(destValue);

  const storedData= localStorage.getItem(key);
  if(storedData){
    
    console.log(`data found for ${key} is ${storedData}` );
    // displayMap(JSON.parse(storedData));
    destLatLng = JSON.parse(storedData);
    
  }
  else{
    let match=false;
    //load normally from the api using geocoder
    if (sourceValue.trim() !== "" && destValue.trim() !== "") {
      geocoder.geocode({ address: sourceValue }, (sourceResults, sourceStatus) => {
        if (sourceStatus === google.maps.GeocoderStatus.OK) {
          sourceLatLng = sourceResults[0].geometry.location;
          console.log("destValue ", destValue)
          geocoder.geocode({ address: destValue }, (destResults, destStatus) => {
            console.log("destResults ", destResults)
            if (destStatus === google.maps.GeocoderStatus.OK) {
              destLatLng = destResults[0].geometry.location;
              animationStartTime = performance.now();
            }
          });
        }
        else{
          console.log("not fetching")
        }
      });
    }
    console.log("destLatLng ", destLatLng);
    for(let i=0;i<localStorage.length;i++){
  const curr_keyvalue= localStorage.key(i);
  const storedval = JSON.parse(localStorage.getItem(curr_keyvalue));
  if (
    storedval &&
    storedval.lat === destLatLng.lat &&
    storedval.lng === destLatLng.lng
  ) {
    match = true;
    break; // No need to continue checking if there's a match
  }
}

    if(destLatLng !== undefined && !match){
    const JSondata= localStorage.setItem(key, JSON.stringify(destLatLng));
    console.log(JSondata);
  }
}
animateMovement();

}


  
function animateMovement() {
  const currentTime = performance.now();
  const elapsedTime = currentTime - animationStartTime;
  const progress = Math.min(1, elapsedTime / animationDuration);
  const easedProgress=easeInOutCubix(progress)

  // const easedProgress = easeInOutQuad(progress); // Apply easing function
console.log(sourceLatLng, " ", destLatLng);
  const intermediateLatLng = google.maps.geometry.spherical.interpolate(
    sourceLatLng,
    destLatLng,
    easedProgress
  );

  map.panTo(intermediateLatLng);
  // localStorage.removeItem(key);
  
  if (progress < 1) {
    requestAnimationFrame(animateMovement);
  }

}

function easeInOutCubix(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

}

function startSmoothPanning() {
  if (!isPanning && targetLatLng) {
    isPanning = true;
    smoothPanStep(map.getCenter(), targetLatLng, 2000); 
  }
}

function startAnimation() {
  animationStartTime = performance.now();
  animateMovement();
}

function smoothPanStep(startLatLng, endLatLng, duration) {
  const startTime = performance.now();
  const animate = (currentTime) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(1, elapsedTime / duration);

    const newLatLng = google.maps.geometry.spherical.interpolate(
      startLatLng,
      endLatLng,
      progress
    );

    map.panTo(newLatLng);
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isPanning = false;
    }
  };

  requestAnimationFrame(animate);
}

const adjustMap = function (mode, amount) {
  switch (mode) {
    case "roll":      //one wing upar and wing down       //make this to turn left right!!!!
       const currentTilt = map.getTilt();
       const currentHeading = map.getHeading();
      map.setTilt(currentTilt+ (amount));
       map.setHeading(currentHeading + (amount)); 
      //const currentHeading = map.getHeading();
      //map.setHeading(currentHeading + amount);
      break;
    case "pitch":
      map.setZoom(map.getZoom() + (amount));      //correct!!!!
      break;
    case "yaw":                                  //correct!!!!
      map.setHeading(map.getHeading() + amount);
      break;
  }
}










window.initMap = initMap;