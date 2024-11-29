const tempoInput = document.getElementById('tempo');
const playButton = document.getElementById('play');
const stopButton = document.getElementById('stop');
const steps = document.querySelectorAll('.step');
const instruments = document.querySelectorAll('.instrument');

let isPlaying = false;
let currentStep = 0;
let stepToEdit = 0;
let intervalId = null;
let pattern = Array.from({ length: 8 }, () => ({ kick: false, snare: false, hihat: false }));

const sounds = {
    kick: 'sounds/kick.wav',
    snare: 'sounds/snare.wav',
    hihat: 'sounds/hi-hat.wav',
};

instruments.forEach(instrument => {
    instrument.addEventListener('click', () => {
        const sound = instrument.dataset.sound;
        pattern[stepToEdit][sound] = !pattern[stepToEdit][sound];
        updateStep(stepToEdit);
    });
});

steps.forEach((step, index) => {
    step.addEventListener('click', () => {
        stepToEdit = index;
        steps.forEach(s => s.classList.remove('active'));
        step.classList.add('active');
    });
});

function updateStep(stepIndex) {
    steps[stepIndex].classList.remove('kick', 'snare', 'hihat');

    if (pattern[stepIndex].kick) {
        steps[stepIndex].classList.add('kick');
    }
    if (pattern[stepIndex].snare) {
        steps[stepIndex].classList.add('snare');
    }
    if (pattern[stepIndex].hihat) {
        steps[stepIndex].classList.add('hihat');
    }
}

function playSound(sound) {
    const audio = new Audio(sounds[sound]);
    audio.play();
}

function startPlaying() {
    if (isPlaying) return;

    const bpm = tempoInput.value;

    if (bpm > 180 || bpm < 60) {
        alert('BPM может быть только от 60 до 180');
        return;
    }

    isPlaying = true;
    const interval = 60000 / bpm / 4;

    intervalId = setInterval(() => {
        const currentPattern = pattern[currentStep];
        if (currentPattern.kick) {
            playSound('kick');
        }
        if (currentPattern.snare) {
            playSound('snare');
        }
        if (currentPattern.hihat) {
            playSound('hihat');
        }
        
        currentStep = (currentStep + 1) % 8;
    }, interval);
}

function stopPlaying() {
    isPlaying = false;
    clearInterval(intervalId);
    currentStep = 0;
    steps.forEach(step => {
        step.classList.remove('active', 'kick', 'snare', 'hihat');
    });
}

playButton.addEventListener('click', startPlaying);
stopButton.addEventListener('click', stopPlaying);