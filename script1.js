document.addEventListener('DOMContentLoaded', wrapper);

function wrapper() {
  const startButton = document.getElementById('start-btn');
  const nextButton = document.getElementById('next-btn');
  const questionContainerElement = document.getElementById('question-container');
  const questionElement = document.getElementById('question');
  const answerButtonsElement = document.getElementById('answer-buttons');
  const shellElement = document.getElementById('shell');
  const checkbox = document.querySelector("#checkbox");
  const scorebox = document.getElementById('score');

  let score;
  let shuffledQuestions;
  let currentQuestionIndex;
  
  checkbox.addEventListener("change", switcher);
  startButton.addEventListener('click', startGame);
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
  })

  function startGame() {
    scorebox.classList.add('hide')
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    score = 0
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
  }
  
  function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
  
  function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('btn');
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button);
    })
  }
  
  function resetState() {
    clearStatusClass(shellElement)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (correct) {
      score++
    }
    setStatusClass(shellElement, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide')
    } else {
      scorebox.innerText = 'Score: ' + score + '/5'
      scorebox.classList.remove('hide')
      startButton.innerText = 'Restart'
      startButton.classList.remove('hide')
    }
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
      element.classList.add('correct')
    } else {
      element.classList.add('wrong')
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
  }
}

function switcher() {
  document.body.classList.toggle("dark");
}

const questions = [
  {
    question: 'What is the name of the thin and long country that spans more than half of the western coast of South America?',
    answers: [
      { text: 'Peru', correct: false },
      { text: 'Chile', correct: true },
      { text: 'Argentina', correct: false },
      { text: 'Brazil', correct: false }
    ]
  },
  {
    question: 'Which two countries share the longest international border?',
    answers: [
      { text: 'Argentina and Chile', correct: false },
      { text: 'China and Mongolia', correct: false },
      { text: 'Russia and Kazakhstan', correct: false },
      { text: 'Canada and USA', correct: true }
    ]
  },
  {
    question: 'What is the name of the longest river in the world?',
    answers: [
      { text: 'Amazon', correct: false },
      { text: 'The Nile', correct: true },
      { text: 'Yellow River', correct: false },
      { text: 'Yangtze River', correct: false }
    ]
  },
  {
    question: 'What is the smallest country in the world?',
    answers: [
      { text: 'Vatican City', correct: true },
      { text: 'Monaco', correct: false },
      { text: 'Nauru', correct: false },
      { text: 'Tuvalu', correct: false }
    ]
  },
  {
    question: 'Machu Picchu is one of the 7 wonders of the world. Where is it located?',
    answers: [
      { text: 'Brazil', correct: false },
      { text: 'Ecuador', correct: false },
      { text: 'Peru', correct: true },
      { text: 'Colombia', correct: false }
    ]
  }
]
