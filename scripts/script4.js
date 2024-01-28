// Initialize and add the map
// let map;
// let isPanning = false;
// let targetLatLng;
// let sourceLatLng, destLatLng;
// let progress = 0;
// const animationDuration = 4000;
// let animationStartTime;
// let key;
// let panningInterval;
// let weatherInterval;
//  function initMap() {
  // The location of Uluru
//   const position = { lat: -25.344, lng: 131.031 };
  // Request needed libraries.
  //@ts-ignore
//   const { Map } = await google.maps.importLibrary("maps");
//   const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
//   map = new google.maps.Map(document.getElementById("map-container"), {
//     center: {
//       lat: 27.0238,
//       lng: 74.2179,
//     },
//     zoom: 16,
//     heading: 0,

//     tilt: 90,
//     mapId: "90f87356969d889c",
//     zoomControl: false,
//     gestureHandling: "none",
//     cache: true,
//     maxZoom: 18,
//   });
 
document.addEventListener("DOMContentLoaded",()=>{

	const scene = new THREE.Scene();
	const hemisphereLight = new THREE.HemisphereLight(0x87CEEB,0xC0C0C0 , 1); // Sky color, Ground color, Intensity
scene.add(hemisphereLight);
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	
	const renderer = new THREE.WebGLRenderer();
	console.log(renderer);
	renderer.setSize(window.innerWidth, window.innerHeight);
	const container= document.getElementById('skycontainer');
	if(container!==null){
		container.appendChild(renderer.domElement)
		console.log("container found")
	}
	else{
		console.log("not found the container")
	}
	
	
	// Skybox
	const skyGeometry = new THREE.SphereGeometry(1000, 32, 32);
	const skyMaterial = new THREE.MeshBasicMaterial({ color: 0x87CEEB });
	const sky = new THREE.Mesh(skyGeometry, skyMaterial);
	console.log(sky)
	
	scene.add(sky);
	

	
	// Animation loop
	const animate = () => {
		requestAnimationFrame(animate);
		// Render the Three.js scene
		renderer.render(scene, camera);
		// Render the Google Map
	  };
	
	animate();

})

  // Initialize OrbitControls for Three.js camera
 

// document.addEventListener("keyup", (event) => {
//     event.preventDefault();
//     if (!isPanning) {
//       const currentLatLng = map.getCenter();
//       console.log("key pressed ");
//       const latLngDelta = 0.01;
//       console.log("event.key ", event.key);
//       switch (event.key) {
//         case "1":
//           let pitchUp = -1;
//           adjustMap("pitch", pitchUp);
//           break;
//         case "2":
//           let pitchDown = 1;
//           adjustMap("pitch", pitchDown);
//           break; 8
//         case "3":
//           let yawRight = -5;
//           adjustMap("yaw", yawRight);
//           break;
//         case "4":
//           let yawLeft = 5;
//           adjustMap("yaw", yawLeft);
//           break;
//         case "5":
//           let rollRight = 5;
//           adjustMap("roll", rollRight);
//           break;
//         case "6":
//           let rollLeft = -5;
//           adjustMap("roll", rollLeft);
//           break;
//         default:
//           clearInterval(panningInterval);
//           break;
//       }
//     }
//   });

// }








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

