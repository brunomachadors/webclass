// Evento de Clique
document.getElementById('botaoClique').addEventListener('click', () => {
  document.getElementById('mensagemClique').textContent = 'Botão clicado!';
});

// Efeitos com Mouse
const hoverBox = document.getElementById('hoverBox');
hoverBox.addEventListener('mouseover', () => {
  hoverBox.style.backgroundColor = '#fad72c';
  hoverBox.style.color = '#45474b';
});
hoverBox.addEventListener('mouseout', () => {
  hoverBox.style.backgroundColor = '#45474b';
  hoverBox.style.color = '#fad72c';
});

// Evento de Teclado
document.getElementById('tecladoInput').addEventListener('keydown', (e) => {
  document.getElementById(
    'mensagemTeclado'
  ).textContent = `Tecla pressionada: ${e.key}`;
});

// Controle de Movimento com Limite
const quadrado = document.getElementById('quadradoMovel');
const movimentoArea = document.getElementById('movimentoArea');

let posX = 0;
let posY = 0;

// Dimensões da área e do quadrado
const areaWidth = movimentoArea.clientWidth;
const areaHeight = movimentoArea.clientHeight;
const quadradoSize = quadrado.offsetWidth;

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (posY > 0) posY -= 10; // Limita para não sair pelo topo
      break;
    case 'ArrowDown':
      if (posY < areaHeight - quadradoSize) posY += 10; // Limita para não sair pela base
      break;
    case 'ArrowLeft':
      if (posX > 0) posX -= 10; // Limita para não sair pela esquerda
      break;
    case 'ArrowRight':
      if (posX < areaWidth - quadradoSize) posX += 10; // Limita para não sair pela direita
      break;
  }
  quadrado.style.transform = `translate(${posX}px, ${posY}px)`;
});
