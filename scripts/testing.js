// // Create a new TextToSpeech object
// const client = new window.TextToSpeech.TextToSpeechClient();

// async function convertTextToMp3() {
//     const request = {
//         input: { text: 'Hello, world!' },
//         voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
//         audioConfig: { audioEncoding: 'MP3' }
//     }

//     const [response] = await client.synthesizeSpeech(request);
//     console.log('Received audio content:', response.audioContent);

//     // For web browsers, you may need to create a Blob object from the audio content
//     const blob = new Blob([response.audioContent], { type: 'audio/mp3' });

//     // Create an object URL for the blob
//     const url = URL.createObjectURL(blob);

//     // Create an audio element and set its source to the object URL
//     const audio = new Audio(url);

//     // Play the audio
//     audio.play().then(() => {
//         console.log('Audio playback started');
//     }).catch((error) => {
//         console.error('Error playing audio:', error);
//     });

//     console.log('Happy coding');
// }

// convertTextToMp3();


const listenBtn = document.getElementById("myvoice");

document.addEventListener('DOMContentLoaded', () => {
  listenBtn.addEventListener("click", () => {
   
    console.log("clicked")
    const msg = new SpeechSynthesisUtterance(
      "Hello, hope my code is helpful"
    );
    window.speechSynthesis.speak(msg);
  });
});

