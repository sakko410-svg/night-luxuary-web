let currentIndex = 0;
const scores = {};

const questionEl = document.getElementById('question');
const questionNum = document.getElementById('questionNumber');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const card = document.querySelector('.question-card');

function pad(n){ return n < 10 ? '0'+n : ''+n; }

function showQuestion(){
  questionEl.textContent = questions[currentIndex].text;
  questionNum.textContent = 'Question ' + pad(currentIndex+1);
  const pct = (currentIndex / questions.length) * 100;
  progressFill.style.width = pct + '%';
  progressText.textContent = currentIndex + ' / ' + questions.length;
}

function handleAnswer(value){
  const type = questions[currentIndex].type;
  if(!scores[type]) scores[type] = 0;
  scores[type] += value;

  currentIndex++;

  if(currentIndex < questions.length){
    // transition
    card.classList.add('q-exit');
    setTimeout(()=>{
      card.classList.remove('q-exit');
      showQuestion();
      card.classList.add('q-enter');
      setTimeout(()=> card.classList.remove('q-enter'), 350);
    }, 220);
    const pct = (currentIndex / questions.length) * 100;
    progressFill.style.width = pct + '%';
    progressText.textContent = currentIndex + ' / ' + questions.length;
  } else {
    progressFill.style.width = '100%';
    progressText.textContent = questions.length + ' / ' + questions.length;
    localStorage.setItem('nightTypeScores', JSON.stringify(scores));
    setTimeout(()=> window.location.href = 'result.html', 400);
  }
}

yesBtn.addEventListener('click', ()=> handleAnswer(1));
noBtn.addEventListener('click',  ()=> handleAnswer(0));

showQuestion();
