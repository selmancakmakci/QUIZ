const quizData = [
  {
    question: "Ieri notte Fabiana ________________ molto tardi a casa.",
    answers: [
      { text: "è tornata", isCorrect: true },
      { text: "ha tornato", isCorrect: false },
      { text: "ha tornata", isCorrect: false },
      { text: "sono tornato", isCorrect: false },
    ],
  },
  {
    question: "Valentina e Marco ___________ la pizza a cena.",
    answers: [
      { text: "hanno mangiati", isCorrect: false },
      { text: "sono mangiati", isCorrect: false },
      { text: "hanno mangiato", isCorrect: true },
      { text: "sono mangiate", isCorrect: false },
    ],
  },
  {
    question: "Io e mia madre ____________ il pollo arrosto per pranzo",
    answers: [
      { text: "siamo preparate", isCorrect: false },
      { text: "avete preparato", isCorrect: false },
      { text: "abbiamo preparato", isCorrect: true },
      { text: "siete preparate", isCorrect: false },
    ],
  },
  {
    question: "Maria Elena _________ via mezz'ora fa.",
    answers: [
      { text: "sono andata", isCorrect: false },
      { text: "ha andato", isCorrect: false },
      { text: "hai andati", isCorrect: false },
      { text: "è andata", isCorrect: true },
    ],
  },
  {
    question: "Non _________ che non voglio uscire con te stasera.",
    answers: [
      { text: "sono detto", isCorrect: false },
      { text: "siamo detto", isCorrect: false },
      { text: "ho dito", isCorrect: false },
      { text: "ho detto", isCorrect: true },
    ],
  },
  {
    question:
      "Tu e tua figlia ___________ un corso d'inglese nella scuola di mio marito.",
    answers: [
      { text: "avete fatti", isCorrect: false },
      { text: "siete fatte", isCorrect: false },
      { text: "hanno fatto", isCorrect: false },
      { text: "avete fatto", isCorrect: true },
    ],
  },
  {
    question: "Luana ___________ a Roma il 20 aprile 1990.",
    answers: [
      { text: "è nata", isCorrect: true },
      { text: "ha nato", isCorrect: false },
      { text: "ho nato", isCorrect: false },
      { text: "è nasciuta", isCorrect: false },
    ],
  },
  {
    question: "Cosa ti é sucesso? ________ l'autobus",
    answers: [
      { text: "Sono perduto", isCorrect: false },
      { text: "Ho perso", isCorrect: true },
      { text: "Ho preduto", isCorrect: false },
      { text: "Sono perso", isCorrect: false },
    ],
  },
  {
    question: "_________ mio fratello?",
    answers: [
      { text: "Avete vista", isCorrect: false },
      { text: "Avete visto", isCorrect: true },
      { text: "Siamo Veduto", isCorrect: false },
      { text: "Siete veduto", isCorrect: false },
    ],
  },
  {
    question: "Ieri notte al pub ________ come spugne!",
    answers: [
      { text: "siamo bevuti", isCorrect: false },
      { text: "avete bevono", isCorrect: false },
      { text: "siamo bevuto", isCorrect: false },
      { text: "abbiamo bevuto", isCorrect: true },
    ],
  },
];

let activeQuestionIndex = 0;

document.getElementById("startButton").addEventListener("click", function () {
  // Quiz'i göster
  document.getElementById("quizContainer").style.display = "";
  document.getElementById("header").style.display = "";
  document.getElementById("buttons").style.display = "";
  document.getElementById("quizApp").style.backgroundImage = "none";

  // Başlangıç butonunu gizle
  this.style.display = "none";

  // Quiz'i başlat
  loadQuestion();
});

function loadQuestion() {
  const currentQuestion = quizData[activeQuestionIndex];
  const questionElement = document.getElementById("questionContainer");
  const answerListElement = document.getElementById("answersList");
  const questionNumberElement = document.getElementById("questionNumber");

  questionNumberElement.textContent =
    activeQuestionIndex + 1 + "/" + quizData.length;

  questionElement.textContent = "";
  answerListElement.innerHTML = "";

  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach((answer, index) => {
    const li = document.createElement("li");
    li.textContent = answer.text;

    li.onclick = () => {
      checkAnswer(answer.isCorrect, index);

      goToNextQuestion();
    };

    answerListElement.appendChild(li);
  });
}

function goToNextQuestion() {
  if (activeQuestionIndex < quizData.length - 1) {
    activeQuestionIndex++;
    loadQuestion();
  } else {
    document.getElementById("quizContainer").innerHTML = "";
    const resultButton = document.createElement("p");
    resultButton.textContent = `"CLICK FOR RESULT"`;
    resultButton.id = "showResultsButton";
    resultButton.onclick = showResultsCard;
    document.getElementById("quizContainer").appendChild(resultButton);
  }
}
function showResultsCard() {
  const card = document.createElement("div");
  card.className = "result-card";

  const resultText = document.createElement("p");
  let correctCount = calculateCorrectAnswers();
  resultText.textContent = correctCount + "/" + quizData.length;
  card.appendChild(resultText);

  let backgroundImageUrl;
  if (correctCount >= 7) {
    backgroundImageUrl =
      "url('https://img.freepik.com/free-vector/people-celebrating-together-illustration_23-2148406618.jpg?w=2000')";
  } else if (correctCount >= 5) {
    backgroundImageUrl =
      "url('https://img.freepik.com/free-vector/personal-memories-concept-illustration_52683-32120.jpg?w=2000')";
  } else {
    backgroundImageUrl =
      "url('https://img.freepik.com/free-vector/couple-conflicts-illustration-collection_52683-42369.jpg?w=2000')";
  }
  card.style.backgroundImage = backgroundImageUrl;
  card.style.backgroundSize = "cover";
  card.style.backgroundPosition = "center";

  document.getElementById("quizContainer").appendChild(card);

  const resultButton = document.getElementById("showResultsButton");
  if (resultButton) {
    resultButton.style.display = "none";
    document.getElementById("nextButton").style.display = "none";
    document.getElementById("previousButton").style.display = "none";
  }
}

function calculateCorrectAnswers() {
  let correctCount = 0;
  userAnswers.forEach((answer) => {
    if (answer && answer.isCorrect) {
      correctCount++;
    }
  });
  return correctCount;
}

loadQuestion();

document.getElementById("nextButton").addEventListener("click", () => {
  if (activeQuestionIndex < quizData.length - 1) {
    activeQuestionIndex++;

    loadQuestion();
  }
});

document.getElementById("previousButton").addEventListener("click", () => {
  if (activeQuestionIndex > 0) {
    activeQuestionIndex--;

    loadQuestion();
  }
});

function updateButtonVisibility() {
  if (activeQuestionIndex >= quizData.length) {
    document.getElementById("nextButton").style.display = "none";
  } else {
    document.getElementById("nextButton").style.display = "";
  }

  if (activeQuestionIndex <= 0) {
    document.getElementById("previousButton").style.display = "none";
  } else {
    document.getElementById("previousButton").style.display = "";
  }
}

window.onload = function () {
  activeQuestionIndex = 0;
  updateButtonVisibility();
  //loadQuestion();
};

let userAnswers = new Array(quizData.length).fill(-1);

function selectAnswer(questionIndex, selectedAnswerIndex) {
  userAnswers[questionIndex] = selectedAnswerIndex;
}

function checkAnswer(isCorrect, answerIndex) {
  userAnswers[activeQuestionIndex] = {
    selectedAnswer: answerIndex,
    isCorrect: isCorrect,
  };
}

window.onload = function () {
  document.getElementById("resetButton").addEventListener("click", function () {
    window.location.reload();
  });
};
