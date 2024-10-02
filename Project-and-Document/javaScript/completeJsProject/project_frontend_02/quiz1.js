const questionContainer = document.querySelector('.Box .tag');
const optionsContainer = document.querySelectorAll('.block .option');
const clickNext = document.querySelector('.click');
const timeContaine = document.querySelector('.Time');
const quespartContaine = document.querySelector('.quesPart');
const voiceFunction = document.querySelector('.back-leftlayer img');
const clickSound = document.getElementById('click-sound');
const backBefore = document.querySelector('.backQus');

let second = 30;
let interval;
let currentQuestionIndex = 0;

const Questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<js>", "<scripting>", "<javascript>", "<script>"],
        correctAnswer: 3
    },
    {
        question: "Which type of JavaScript language is ___?",
        options: ["a. Object-Oriented", "b. Object-Based", "c. Assembly-Language", "d. High-Level"],
        correctAnswer: 1
    },
    {
        question: "Which one of the following also known as Conditional Expression___?",
        options: ["a. Alternative to if-else", "b. Switch statement", "c. If-then-else statement", "d. immediate if"],
        correctAnswer: 3
    },
    {
        question: "When interpreter encounters an empty statements, what it will do: ___?",
        options: ["a. Object-Oriented", "b. Object-Based", "c. Assembly-Language", "d. High-Level"],
        correctAnswer: 1
    },
    {
      question: "When interpreter encounters an empty statements, what it will do___?",
      options: ["a. Shows a warning", "b. Prompts to complete the statement", "c. Throws an error", "d. Ignores the statements"],
      correctAnswer: 3
    },
    {
      question: "The 'function' and 'var' are known as___?",
      options: ["a. Keywords", "b. Data types", "c. Declaration statements", "d. Prototypes"],
      correctAnswer: 3
    },
    {
      question: "var count =0;  while (count <10){  console.log(count);  count++;  }",
      options: ["a. An error is displayed", "b. An exception is thrown", "c. Stored in a particular location or storage", "d. None of these"],
      correctAnswer: 2
    },
    {
      question: "The syntax of switch statement, the Expression is compared with labels using operators_?",
      options: ["a. ===", "b. equal's", "c. ==", "d. equals"],
      correctAnswer: 0
    },
    {
      question: "Which of the following variables takes precedence over if the names are the same__?",
      options: ["a.Global variable", "b. The local element", "c. The two of the above", "d. None of the above"],
      correctAnswer: 1
    },
    {
      question: "Which one of the following is the correct way for calling the JavaScript code___?",
      options: ["a. Preprocessor", "b. Triggering Event", "c. RMI", "d. Function/Method"],
      correctAnswer: 3
    },
    {
      question: "Which of the following type of a variable is volatile___?",
      options: ["a. Mutable variable", "b. Dynamic variable", "c. Volatile variable", "d. Immutable variable"],
      correctAnswer: 0
    },
    {
      question: "Which of the following option is used as hexadecimal literal beginning___?",
      options: ["a. 00", "b. 0x", "c. 0X", "d. Both 0x and 0X"],
      correctAnswer: 3
    },
    {
      question: "There is an indefinite an arithmetic computation in a program, then JavaScript prints__?",
      options: ["a.Prints an exception error", "b. Prints an overflow error", "c. Displays Infinity", "d. Prints the value as such"],
      correctAnswer: 2
    },
    {
      question: " In the JavaScript, which one of the following is not considered as an error:___?",
      options: ["a.Syntax error", "b. Missing of semicolons", "c. Division by zero", "d. Missing of Bracket"],
      correctAnswer: 2
    },
    {
      question: " Which of the following number object function returns the value of the number___?",
      options: ["a.toString()", "b. valueOf()", "c. toLocaleString()", "d. toPrecision()"],
      correctAnswer: 1
    },
];
const secretKey = "@AnkitKumar9692";  // Use a strong, unique key.
const encryptedQuestions = CryptoJS.AES.encrypt(JSON.stringify(Questions), secretKey).toString();

// Store encrypted questions in local storage.
localStorage.setItem("quizQuestions", encryptedQuestions);
const encryptedData = localStorage.getItem("quizQuestions");
if (encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedQuestions = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    console.log(decryptedQuestions);
    // decrypted Questions in your application.
} else {
    console.log("No quiz questions found in local storage.");
}

const defaultBackgroundColor = document.body.style.backgroundColor;
const defaultTimeContainerBackground = timeContaine.style.backgroundColor;
const defaultButtonColor = clickNext.style.color;
const defaultBackBeforeColor = backBefore.style.color;

// Store questions array in local storage
localStorage.setItem('quizQuestions', JSON.stringify(Questions));

// Retrieve the questions array from local storage
let storedQuestions = localStorage.getItem('quizQuestions');
let questions = storedQuestions ? JSON.parse(storedQuestions) : [];

function startTimer() {
  second = 30; // Reset the timer
  timeContaine.innerText = second < 10 ? `00:0${second}` : `00:${second}`;
  
  clearInterval(interval);
  interval = setInterval(() => {
      second--;
      timeContaine.innerText = second < 10 ? `00:0${second}` : `00:${second}`;
      
      // Change background color based on remaining time
      if (second <= 5) {
          document.body.style.backgroundColor = '#DBADAD';
          timeContaine.style.backgroundColor = '#f83030';
          clickNext.style.color = '#f83030';
          backBefore.style.color = '#f83030';
      } else if (second <= 15) {
          document.body.style.backgroundColor = '#D4D69F';
          timeContaine.style.backgroundColor = '#f5fb47';
          clickNext.style.color = '#f5fb47';
          backBefore.style.color = '#f5fb47';
      } else {
        document.body.style.backgroundColor = defaultBackgroundColor; // Reset to default
        timeContaine.style.backgroundColor = defaultTimeContainerBackground;
        clickNext.style.color = defaultButtonColor; 
        backBefore.style.color = defaultBackBeforeColor;
      }
      
      // If time runs out, move to the next question
      if (second === 0) {
          clearInterval(interval);
          nextQuestion();
      }
  }, 1000);
}

let isOptionSelect = false;

function displayQuestion(index) {
  isOptionSelect = false;
  quespartContaine.innerText = `${(index + 1).toString().padStart(2, '0')}/${questions.length}`;

  // Set the question
  questionContainer.innerText = (index + 1) + ". " + questions[index].question;
  
  // Set the options
  optionsContainer.forEach((option, i) => {
   // Create correct and incorrect icons
        const correctIcon = document.createElement('img');
        correctIcon.src = 'Vector 1.svg'; // Replace with your correct icon path
        correctIcon.classList.add('ellipes'); // Add the class for styling
    
        const incorrectIcon = document.createElement('img');
        incorrectIcon.src = 'wrong.svg'; // Replace with your incorrect icon path
        incorrectIcon.classList.add('Rellipes'); // Add the class for styling
    
    // Set the option text and append icons
        option.innerText = questions[index].options[i];
        option.appendChild(correctIcon);
        option.appendChild(incorrectIcon);

   // Reset border
        option.parentElement.style.border = "2px solid #ccc";
  });
  startTimer();
};

backBefore.addEventListener('click', function(){
  if(currentQuestionIndex > 0){
    currentQuestionIndex--;
    displayQuestion(currentQuestionIndex);
  }
});

  function nextQuestion() {
    if(isOptionSelect){
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    } else {
        alert("Quiz Finished!");
        // window.location.href = 'quiz.html';
        window.location.href = 'result.html'; 
     }
  }else{
    alert("please select an option before proceeding.");
  }
}
    
  // Correct option logic
      optionsContainer.forEach((option, i) => {
        option.parentElement.onclick = function() {
          if(!isOptionSelect){
            isOptionSelect = true;
            clearInterval(interval);
            clickSound.play();

            // Disable further clicks on all options
            // optionsContainer.forEach(opt => opt.parentElement.style.pointerEvents = 'none');

            if (i === questions[currentQuestionIndex].correctAnswer) {
              option.parentElement.style.border = "2px solid green";
              option.querySelector('.ellipes').style.display = 'block'; // Show the correct icon
              option.querySelector('.Rellipes').style.display = 'none'; // Hide the incorrect icon
            } else {
               option.parentElement.style.border = "2px solid red";
               option.querySelector('.ellipes').style.display = 'none'; // Hide the correct icon
               option.querySelector('.Rellipes').style.display = 'block'; // Show the incorrect icon
              }
          };
        }
      }, 3000);

      voiceFunction.addEventListener('click', function(){
        clickSound.play();
      });

      document.querySelector('.click').addEventListener('click', function() {
        nextQuestion();
    });
// let currentQuestionIndex = 0;
displayQuestion(currentQuestionIndex);
