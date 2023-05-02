const audio = document.querySelector('#stream')
const playPauseButton = document.querySelector('[name="play-pause"]')
const playPauseButtonIcon = playPauseButton.querySelector('i.fas')
const volumeControl = document.querySelector('[name="volume"]')
const currentlyPlaying = document.querySelector('.currently-playing-title')
const volumeButton = document.querySelector('[name="mute"]')
const volumeButtonIcon = volumeButton.querySelector('i.fas')
const stream = document.getElementById('stream');
const backwardButton = document.querySelector('.backward-button');
const forwardButton = document.querySelector('.forward-button');


let isPlaying = false
let fetchInterval = null
let currentVolume = 0.2

audio.volume = currentVolume




/**
 * Fetches the currently playing song from the API
 * @returns {Promise<any>}
 */
// const fetchCurrentlyPlaying = () => {
//     const url = 'https://30-000-radio-stations-and-music-charts.p.rapidapi.com/rapidapi?id=%7Bid%7D';
//     const options = {
//       method: 'GET',
//       headers: {
//         'content-type': 'application/octet-stream',
//         'X-RapidAPI-Key': '67cfa4eef9msh5ff8c4d2ff109c3p1709ecjsnd00f4b663406',
//         'X-RapidAPI-Host': '30-000-radio-stations-and-music-charts.p.rapidapi.com'
//       }
//     };
//   return fetch(url, options)
//     .then(response => response.json())
//     .then(data => {
//       const currentSong = data[0].title;
//       currentlyPlaying.innerText = currentSong;
//     })
//     .catch(error => console.error(error));
// };


/*************api-2-*********************** */
fetch('http://www.radio-browser.info/webservice/json/stations/search', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Radio Station',
  }),
})
  .then((response) => response.json())
  .then(data => {
    const currentSong = data[0].title;
    currentlyPlaying.innerText = currentSong;
  })

  .catch((error) => console.log(error));
 


const adjustVolumeIcon = volume => {
  volumeButtonIcon.classList.remove('fa-volume-off')
  volumeButtonIcon.classList.remove('fa-volume-down')
  volumeButtonIcon.classList.remove('fa-volume-up')
  volumeButtonIcon.classList.remove('fa-volume-mute')

  if (volume >= 0.75) {
    volumeButtonIcon.classList.add('fa-volume-up')
  }

  if (volume < 0.75 && volume >= 0.2) {
    volumeButtonIcon.classList.add('fa-volume-down')
  }

  if (volume < 0.2 && volume > 0) {
    volumeButtonIcon.classList.add('fa-volume-off')
  }

  if (volume === 0) {
    volumeButtonIcon.classList.add('fa-volume-mute')
  }
}


volumeControl.addEventListener('input', () => {
  const volume = parseFloat(volumeControl.value)

  audio.volume = currentVolume = volume
  currentVolume = volume

  adjustVolumeIcon(volume)
})


volumeButton.addEventListener('click', () => {
  if (audio.volume > 0) {
    adjustVolumeIcon(0)
    audio.volume = 0
    volumeControl.value = 0
  } else {
    adjustVolumeIcon(currentVolume)
    audio.volume = currentVolume
    volumeControl.value = currentVolume
  }
})


playPauseButton.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause()

    playPauseButtonIcon.classList.remove('fa-pause')
    playPauseButtonIcon.classList.add('fa-play')

    clearInterval(fetchInterval)
    currentlyPlaying.innerText = 'Listen to Some Radio Station'
  } else {
    audio.play()

    playPauseButtonIcon.classList.remove('fa-play')
    playPauseButtonIcon.classList.add('fa-pause')

    fetchCurrentlyPlaying()
    fetchInterval = setInterval(fetchCurrentlyPlaying, 3000)
  }

  isPlaying = !isPlaying
})

// Set up event listeners for the backward and forward buttons
// Rewind the audio by 10 seconds when the backward button is clicked
backwardButton.addEventListener('click', () => {
  audio.currentTime -= 10
})

// Fast forward the audio by 10 seconds when the forward button is clicked
forwardButton.addEventListener('click', () => {
  audio.currentTime += 10
})











