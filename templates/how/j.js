// Slide through images every 20 minutes
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide() {
  slides.forEach(slide => (slide.style.display = 'none'));
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].style.display = 'block';
}

setInterval(showSlide, 10000); // 20 minutes

// Dynamic question display
// JavaScript to control the quiz

document.addEventListener('DOMContentLoaded', function () {
  const questions = document.querySelectorAll('.question');
  let currentQuestion = 0;
  let correctAnswers = 0;

  function showQuestion(index) {
    questions.forEach(question => question.style.display = 'none');
    questions[index].style.display = 'block';
  }

  function validateAnswers() {
    const userAnswers = [];

    for (let i = 0; i < questions.length; i++) {
      const radios = questions[i].querySelectorAll('input[type="radio"]');
      let answered = false;

      radios.forEach(radio => {
        if (radio.checked) {
          answered = true;
          userAnswers.push(radio.value);
          if (radio.value === getCorrectAnswer(i)) {
            correctAnswers++;
          }
        }
        radio.disabled = true;
      });

      if (!answered) {
        userAnswers.push(null);
      }
    }

    return userAnswers;
  }

  function getCorrectAnswer(questionIndex) {
    const correctAnswersMap = {
      0: 'c',
      1: 'b',
      2: 'c',
      3: 'c',
      4: 'c'
    };
    return correctAnswersMap[questionIndex];
  }

  function showResultPage() {
    const userAnswers = validateAnswers();
    if (correctAnswers === questions.length) {
      alert('Congratulations! You answered all questions correctly!');
      
      window.location.href = '/main/how/how.html'; // Redirect to the success page
    } else {
      alert('Oops! You did not answer all questions correctly. Please retake the quiz.');
      currentQuestion = 0;
      correctAnswers = 0;
      showQuestion(currentQuestion);
    }
  }

  document.querySelectorAll('.next').forEach(button => {
    button.addEventListener('click', function () {
      if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
      }
    });
  });

  document.querySelectorAll('.prev').forEach(button => {
    button.addEventListener('click', function () {
      if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
      }
    });
  });

  document.getElementById('quizForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission behavior
    showResultPage();
  });

  showQuestion(currentQuestion);
});
