const quizData = [
    {
        question: "Какой язык программирования используется для веб-разработки в поле script?",
        options: ["Python", "Java", "JavaScript", "C#"],
        answer: "JavaScript",
        type: "multiple"
    },
    {
        question: "Выберите все языки программирования:",
        options: ["HTML", "Python", "JavaScript", "Markdown"],
        answer: ["HTML", "Python", "JavaScript"],
        type: "multiple-select"
    },
    {
        question: "Какой язык используется для описания стилей веб-страниц?",
        answer: "CSS",
        type: "text"
    },
    {
        question: "Летело два лебедя, один на кавказ, другой направо, сколько лет ежу, если асфальт клали три года назад?",
        options: ["CSS", "8 лет", "1 год", "310А"],
        answer: "1 год",
        type: "multiple"
    }
];

function loadQ() {
    const quizContainer = document.getElementById('quiz');
    quizData.forEach((item, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `<h3>${item.question}</h3>`;

        if (item.type === "multiple") {
            item.options.forEach(option => {
                questionElement.innerHTML += `
                    <label>
                        <input type="radio" name="question${index}" value="${option}">
                        ${option}
                    </label>
                `;
            });
        } else if (item.type === "multiple-select") {
            item.options.forEach(option => {
                questionElement.innerHTML += `
                    <label>
                        <input type="checkbox" name="question${index}" value="${option}">
                        ${option}
                    </label>
                `;
            });
        } else if (item.type === "text") {
            questionElement.innerHTML += `
                <input type="text" name="question${index}" placeholder="Введите ответ">
            `;
        }

        quizContainer.appendChild(questionElement);
    });
}

function checkAnswers() {
    let score = 0;
    quizData.forEach((item, index) => {
        const userAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        const userTextAnswer = document.querySelector(`input[name="question${index}"]`);

        if (item.type === "multiple") {
            if (userAnswer && userAnswer.value === item.answer) {
                score++;
            }
        } else if (item.type === "multiple-select") {
            const selectedOptions = Array.from(document.querySelectorAll(`input[name="question${index}"]:checked`)).map(input => input.value);
            if (JSON.stringify(selectedOptions) === JSON.stringify(item.answer)) {
                score++;
            }
        } else if (item.type === "text") {
            if (userTextAnswer && userTextAnswer.value.trim().toLowerCase() === item.answer.toLowerCase()) {
                score++;
            }
        }
    });

    const resultElement = document.getElementById('result');
    if (score / quizData.length <= 0.5) {
        resultElement.textContent = `Вы набрали ${score} из ${quizData.length} баллов. Попробуй еще раз.`;
    } else {
        resultElement.textContent = `Вы набрали ${score} из ${quizData.length} баллов. УРАААРУРАУРАРУАРУУ,ТЫ МОЛОДЕЦ!!!!`;
    }
}

loadQ();

document.getElementById('submit').addEventListener('click', checkAnswers);