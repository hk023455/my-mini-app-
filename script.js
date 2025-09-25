// Quiz Questions
const quizQuestions = [
    {
        question: "HTML ka full form kya hai?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language", 
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "JavaScript kis company ne banayi?",
        options: [
            "Microsoft",
            "Google",
            "Netscape",
            "Apple"
        ],
        correct: 2
    },
    {
        question: "CSS mein color change karne ke liye kaunsa property use hota hai?",
        options: [
            "text-color",
            "font-color", 
            "color",
            "background-color"
        ],
        correct: 2
    },
    {
        question: "GitHub kis company ka product hai?",
        options: [
            "Google",
            "Microsoft",
            "Amazon", 
            "Facebook"
        ],
        correct: 1
    },
    {
        question: "Website ko mobile friendly kaise banate hain?",
        options: [
            "JavaScript se",
            "CSS Media Queries se",
            "HTML Tables se",
            "PHP se"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('quizScreen').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const question = quizQuestions[currentQuestion];
    document.getElementById('question').textContent = question.question;
    document.getElementById('currentQ').textContent = currentQuestion + 1;
    
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option-btn';
        button.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const question = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.option-btn');
    
    // Disable all buttons
    options.forEach(btn => btn.onclick = null);
    
    // Show correct/wrong answers
    options.forEach((btn, index) => {
        if (index === question.correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && index !== question.correct) {
            btn.classList.add('wrong');
        }
    });
    
    // Check if answer is correct
    if (selectedIndex === question.correct) {
        score++;
        document.getElementById('score').textContent = score;
    }
    
    // Next question after delay
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    document.getElementById('quizScreen').style.display = 'none';
    document.getElementById('resultScreen').style.display = 'block';
    document.getElementById('finalScore').textContent = score;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('resultScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'block';
}

// Initialize
console.log('Quiz Game Loaded!');
