let map;
let isPanning = false;
let targetLatLng;
let sourceLatLng, destLatLng;
let progress = 0;
const animationDuration = 4000; // Animation duration in milliseconds
let animationStartTime;
let key;
let panningInterval;

console.log("script2 page loaded");

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


    document.addEventListener("keyup", (event) => {
        event.preventDefault();
        if (!isPanning) {
            const currentLatLng = map.getCenter();
            console.log("key pressed ");
            const latLngDelta = 0.01;
            console.log("event.key ", event.key);
            switch (event.key) {
                case "ArrowRight":
                    //   targetLatLng = { lat: currentLatLng.lat(), lng: currentLatLng.lng() + 0.005};
                    //   startSmoothPanning();
                    panningInterval = setInterval(() => {
                        const targetLatLng = { lat: currentLatLng.lat(), lng: map.getCenter().lng() + 0.05 };
                        // currentLatLng.lat()=currentLatLng.lat()+latLngDelta;
                        console.log("currentLatLng ", currentLatLng);
                        map.panTo(targetLatLng);
                        console.log("interval happening");
                    }
                        , 500)
                    break;
                case "ArrowLeft":
                    //   targetLatLng = { lat: currentLatLng.lat(), lng: currentLatLng.lng() - 0.005 };
                    //   startSmoothPanning();
                    panningInterval = setInterval(() => {
                        const targetLatLng = { lat: currentLatLng.lat(), lng: map.getCenter().lng() - 0.05 };
                        // currentLatLng.lat()=currentLatLng.lat()+latLngDelta;
                        console.log("currentLatLng ", currentLatLng);
                        map.panTo(targetLatLng);
                        console.log("interval happening");
                    }
                        , 500)
                    break;
                case "ArrowUp":
                    targetLatLng = { lat: currentLatLng.lat() + latLngDelta, lng: currentLatLng.lng() };
                    panningInterval = setInterval(() => {
                        const targetLatLng = { lat: map.getCenter().lat() + latLngDelta, lng: currentLatLng.lng() };
                        // currentLatLng.lat()=currentLatLng.lat()+latLngDelta;
                        console.log("currentLatLng ", currentLatLng);
                        map.panTo(targetLatLng);
                        console.log("interval happening");
                        // startSmoothPanning(targetLatLng);        
                    }
                        , 500)
                    break;
                case "ArrowDown":
                    targetLatLng = { lat: currentLatLng.lat() - latLngDelta, lng: currentLatLng.lng() };
                    //   startSmoothPanning();
                    panningInterval = setInterval(() => {
                        const targetLatLng = { lat: map.getCenter().lat() - latLngDelta, lng: currentLatLng.lng() };
                        // currentLatLng.lat()=currentLatLng.lat()+latLngDelta;
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
                    adjustMap("roll", rollRight);       //yaw right
                    break;
                case "6":
                    let rollLeft = -5;
                    adjustMap("roll", rollLeft);
                    break;
            }
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "8") {
            clearInterval(panningInterval);
            isPanning = false;
        }
    });



    const source = document.getElementById("src");
    source.addEventListener("blur", () => {
        console.log("source event triggered");
        const loc = source.value;
        if (loc.trim() !== "") {
            const geocoder = new google.maps.Geocoder();

            geocoder.geocode({ address: loc }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    const latitude = results[0].geometry.location.lat();
                    const longitude = results[0].geometry.location.lng();

                    sourceLatLng = { lat: latitude, lng: longitude };
                    map.panTo({ lat: latitude, lng: longitude });
                }
            });
        }
    });

    const moveButton = document.getElementById("move");
    moveButton.addEventListener("click", () => {
        startMovement();
    });
}



document.addEventListener("wheel", (event) => {

    event.preventDefault();
    if (!isPanning) {
        const currentLatLng = map.getCenter();
        console.log("key pressed ");
        const latLngDelta = 0.01;

        if (checkScrollDirectionIsUp) {

            //code to move the map upwards 
            panningInterval = setInterval(() => {
                const targetLatLng = { lat: map.getCenter().lat() + latLngDelta, lng: currentLatLng.lng() };
                // currentLatLng.lat()=currentLatLng.lat()+latLngDelta;
                console.log("currentLatLng ", currentLatLng);
                map.panTo(targetLatLng);
                console.log("interval happening");
                // startSmoothPanning(targetLatLng);        
            }
                , 500)

        }

        else {





            //code to move the map downwards
        }






    }

})


function checkScrollDirectionIsUp(event) {
    if (event.wheelDelta) {
        return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
}



const adjustMap = function (mode, amount) {
    switch (mode) {
        case "roll":      //one wing upar and wing down       //make this to turn left right!!!!
            const currentTilt = map.getTilt();
            const currentHeading = map.getHeading();
            map.setTilt(currentTilt + (amount));
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


function startSmoothPanning(targetLatLng) {
    console.log("targetLatLng ", targetLatLng);
    if (!isPanning && targetLatLng) {
        isPanning = true;
        smoothPanStep(map.getCenter(), targetLatLng, 2000);
    }
}

function smoothPanStep(startLatLng, endLatLng, duration) {
    console.log("startLatLng ", startLatLng, "endLatLng ", endLatLng, "duration ", duration);

    const startTime = performance.now();
    const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(1, elapsedTime / duration);
        console.log("progress ", progress);
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
