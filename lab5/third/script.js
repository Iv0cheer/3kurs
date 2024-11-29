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

// Обработчик для выбора инструментов
instruments.forEach(instrument => {
    instrument.addEventListener('click', () => {
        const sound = instrument.dataset.sound;
        pattern[stepToEdit][sound] = !pattern[stepToEdit][sound]; // Переключаем состояние шага
        updateStep(stepToEdit);
    });
});

// Добавьте обработчик для шагов
steps.forEach((step, index) => {
    step.addEventListener('click', () => {
        stepToEdit = index; // Устанавливаем шаг для редактирования
        steps.forEach(s => s.classList.remove('active')); // Убираем активный класс со всех шагов
        step.classList.add('active'); // Добавляем активный класс к выбранному шагу
    });
});

function updateStep(stepIndex) {
    // Удаляем все классы инструментов
    steps[stepIndex].classList.remove('kick', 'snare', 'hihat');

    // Добавляем классы в зависимости от активных инструментов
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

// Функция воспроизведения звука
function playSound(sound) {
    const audio = new Audio(sounds[sound]);
    audio.play();
}

// Запуск воспроизведения
function startPlaying() {
    if (isPlaying) return;

    isPlaying = true;
    const bpm = tempoInput.value;
    const interval = 60000 / bpm / 4; // 4 такта в каждом такте

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
        
        currentStep = (currentStep + 1) % 8; // Переход к следующему шагу
    }, interval);
}

// Остановка воспроизведения
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