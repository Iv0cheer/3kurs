const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioContext.createGain();

gainNode.connect(audioContext.destination);

const sounds = {
    kick: 'sounds/kick.wav',
    snare: 'sounds/snare.wav',
    hihat: 'sounds/hi-hat.wav',
    music: 'sounds/music.mp3'
};

let currentSource = null;

function loadSound(url) {
    return fetch(url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer));
}

function changeVolume(event) {
    const volume = event.target.value;
    gainNode.gain.value = volume;
}

function stopSound() {
    if (currentSource) {
        currentSource.stop();
        currentSource = null;
    }
}

const soundPromises = Object.keys(sounds).map(key => {
    return loadSound(sounds[key]).then(buffer => {
        sounds[key] = buffer;
    });
});

document.getElementById('kick-btn').addEventListener('click', () => playbit('kick'));
document.getElementById('snare-btn').addEventListener('click', () => playbit('snare'));
document.getElementById('hihat-btn').addEventListener('click', () => playbit('hihat'));
document.getElementById('play').addEventListener('click', () => playSound('music'));
document.getElementById('stop').addEventListener('click', stopSound);

function playSound(sound) {
    stopSound();
    const source = audioContext.createBufferSource();
    source.buffer = sounds[sound];
    source.connect(gainNode);
    source.start(0);

    currentSource = source;
}

function playbit(sound) {
    const source = audioContext.createBufferSource();
    source.buffer = sounds[sound];
    source.connect(gainNode);
    source.start(0);
}

document.getElementById('volume').addEventListener('input', changeVolume);