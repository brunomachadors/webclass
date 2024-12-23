function changeText() {
  document.getElementById('demo').textContent = 'Texto alterado com sucesso!';
}

function changeBackgroundColor() {
  const currentColor = document.body.style.backgroundColor;
  document.body.style.backgroundColor =
    currentColor === 'rgb(250, 215, 44)' ? '#f5f5f5' : '#fad72c';
}

function addItem() {
  const input = document.getElementById('itemInput');
  const list = document.getElementById('itemList');
  if (input.value.trim() !== '') {
    const li = document.createElement('li');
    li.textContent = input.value;
    list.appendChild(li);
    input.value = '';
  }
}

function startTimer() {
  let timeLeft = 10;
  const display = document.getElementById('timerDisplay');

  display.innerHTML = ''; // Limpa o conteúdo atual
  const span = document.createElement('span');
  span.textContent = timeLeft;
  display.appendChild(span);

  const timer = setInterval(() => {
    span.style.opacity = 0;
    setTimeout(() => {
      timeLeft -= 1;
      if (timeLeft >= 0) {
        span.textContent = timeLeft;
        span.style.opacity = 1;
      } else {
        clearInterval(timer);
        span.textContent = 'END';
        span.style.opacity = 1;
      }
    }, 500);
  }, 1000);
}

function toggleVisibility() {
  const paragraph = document.getElementById('toggleParagraph');
  paragraph.style.display =
    paragraph.style.display === 'none' ? 'block' : 'none';
}
