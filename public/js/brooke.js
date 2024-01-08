
const form = document.getElementById("cityForm")
const input = document.getElementById("cityInput")
let message = document.getElementById("message")

//slides functionality

let slideIndex = 0;
const slides = document.querySelectorAll('.slides');

function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
    slides[i].classList.remove('fade');
  }
  
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  
  slides[slideIndex - 1].style.display = 'block';
  slides[slideIndex - 1].classList.add('fade');
  setTimeout(showSlides, 6000);
}

showSlides();





form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const location = input.value;
    fetch(`http://localhost:3000/search?location=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                message.textContent = data.error;
            } else {
                const AQI = data[0].air_quality_us;
                const mainPollutant = data[0].main_pollutant;
                if (AQI > 100) {
                    message.textContent = `Oh no! The air quality index of your city is ${AQI}. That's not good! The main pollutant is ${mainPollutant}. See how you can help here.`;
                } else {
                    message.textContent = `The air quality index of your city is ${AQI}. The main pollutant is ${mainPollutant}. Not bad.`;
                }
            }
        })
    })
})

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

window.onload = function() {
    const questionElement = document.getElementById('question');
    questionElement.classList.add('active');
  };

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
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

const questions = [
  {
    question: 'What common household item emits more pollutants than a busy intersection?',
    answers: [
      { text: 'Cooking stove', correct: true },
      { text: 'Hair spray', correct: false },
      { text: 'Vacuum cleaner', correct: false },
      { text: ' Laundry detergent', correct: false }
    ]
  },
  {
    question: 'Which city has the highest recorded air pollution in the world?',
    answers: [
        { text: 'Delhi, India', correct: true },
        { text: 'Beijing, China', correct: false },
        { text: 'Los Angeles, USA', correct: false },
        { text: 'Mexico City, Mexico', correct: false }
    ]
  },
  {
    question: 'What unusual item was once used as an air pollution indicator in London during the 19th century?',
    answers: [
        { text: 'Weather vanes', correct: false },
      { text: 'Streetlights', correct: false },
      { text: 'Color-changing scarves', correct: false },
      { text: 'Pigeons', correct: true }
    ]
  },
  {
    question: "There's more carbon dioxide in our atmosphere than at any time in human history",
    answers: [
      { text: 'True', correct: true },
      { text: 'False', correct: false },
    ]
  },
  {
    question: 'What is a primary source of plastic pollution in the oceans?',
    answers: [
        { text: 'Industrial waste', correct: false },
        { text: 'Recycled plastics', correct: false },
        { text: 'Single-use plastics', correct: true },
        { text: 'Biodegradable materials', correct: false }
    ]
  },
  {
    question: 'What can be used as a natural air purifier due to its air-filtering properties?',
    answers: [
        { text: 'Venus Flytrap', correct: false },
        { text: 'Spider plant', correct: true },
        { text: 'Cactus', correct: false },
        { text: 'Aloe Vera plant', correct: false }
    ]
  },
  {
    question: 'Which country has implemented a "smog tax" on drivers to combat air pollution?',
    answers: [
        { text: 'Norway', correct: false },
        { text: 'Japan', correct: false },
        { text: 'Sweden', correct: false },
        { text: 'Netherlands', correct: true }
    ]
  },
  {
    question: 'Which ocean is known for containing a massive garbage patch primarily made of plastics?',
    answers: [
        { text: 'Pacific Ocean', correct: true },
        { text: 'Atlantic Ocean', correct: false },
        { text: 'Indian Ocean', correct: false },
        { text: 'Arctic Ocean', correct: false }
    ]
  },
  {
    question: 'What innovative material has been developed to absorb pollution from the air?',
    answers: [
      { text: 'Algae-infused concrete', correct: false },
      { text: 'Pollution-absorbing paint', correct: true },
      { text: 'Carbon-neutral bricks', correct: false },
      { text: 'Recycled plastic panels', correct: false }
    ]
  },
  {
    question: 'How does deforestation impact greenhouse gas emissions?',
    answers: [
      { text: 'Decreases carbon dioxide levels', correct: false },
      { text: 'Releases stored carbon and reduces tree count', correct: true },
      { text: 'Increases oxygen production', correct: false },
      { text: 'Traps excess carbon dioxide', correct: false }
    ]
  }
]

