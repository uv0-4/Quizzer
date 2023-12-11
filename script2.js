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
    currentQuestionIndex = 0;
    score = 0
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
    question: 'Which animal can be seen on the Porsche logo?', 
    answers: [
      { text: 'Horse', correct: true },
      { text: 'There is no animal', correct: false },
      { text: 'Bull', correct: false },
      { text: 'Eagle', correct: false }
    ]
  },
  {
    question: 'Which company owns Bugatti, Lamborghini. Audi, Porsche, and Ducati?', 
    answers: [
      { text: 'General Motors', correct: false },
      { text: 'Stellantis', correct: false },
      { text: 'Volkswagen', correct: true },
      { text: 'BMW Group', correct: false }
    ]
  },
  {
    question: 'What does BMW stand for in English?', 
    answers: [
      { text: 'British Motor Works', correct: false },
      { text: 'Bavarian Motor Works', correct: true },
      { text: 'Belgian Manufacturing Works', correct: false },
      { text: 'Business Management and Wealth', correct: false }
    ]
  },
  {
    question: 'What or who is the Ford Mustang named after?', 
    answers: [
      { text: 'A Native American tribe', correct: false },
      { text: 'A horse breed', correct: false },
      { text: 'A famous cowboy', correct: false },
      { text: 'A fighter plane from WWII', correct: true }
    ]
  },
  {
    question: 'How many parts (screws and bolts included) does the average car have?', 
    answers: [
      { text: '20,000', correct: false },
      { text: '3,000', correct: false },
      { text: '10,000', correct: false },
      { text: '30,000', correct: true }
    ]
  }
]
