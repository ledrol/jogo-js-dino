const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;
let pts = 0;

//Manipula tecla pressionada
function handleKeyUp(event) { //O argumento "event" é enviado para a função toda vez que é pressionada uma tecla no navegador
  if (event.keyCode === 32) { //Se Código da tecla pressionada for igual a espaço
    if (!isJumping) { //Se 'isJumping' for 'true'
      jump(); //Chama a função 'jump'
    }
  }
}

//Responsável pelo pulo do dinossauro
function jump() {
  isJumping = true;

  let upInterval = setInterval(() => { //define o intervalo de subida do dinossauro
    if (position >= 150) { //Se a posição for maior ou igual a 150 pixels
      // Descendo
      clearInterval(upInterval); //Limpa o intervalo de subida

      let downInterval = setInterval(() => { //define o intervalo de descida do dinossauro
        if (position <= 0) { //Se a posição for menor ou igual a zero
          clearInterval(downInterval); //Limpa o intervalo de descida
          isJumping = false;
        } else {
          position -= 20; //Toda vez que o intervalo se repetir, vai pegar o valor na variável 'position' e subtrair 20
          dino.style.bottom = position + 'px';
        }
      }, 20); //Código acima executado a cada 20ms
    } else {
      // Subindo
      position += 20; //Toda vez que o intervalo se repetir, vai pegar o valor na variável 'position' e adicionar 20
      dino.style.bottom = position + 'px'; //Seleciona a propriedade bottom do css, que recebe o valor de 'position' somado com a string 'px'
    }
  }, 20); //Código acima executado a cada 20ms
}

//Responsável pela criação dos cactos
function createCactus() {
  const cactus = document.createElement('div'); //Cria uma nova div html
  let cactusPosition = 1000; //Define a posição do cacto
  let randomTime = Math.random() * 6000; //gera números aleatórios para criar cactos

  if (isGameOver) return;

  cactus.classList.add('cactus'); //Adiciona uma classe html
  background.appendChild(cactus); //Acrescenta o background de cacto
  cactus.style.left = cactusPosition + 'px'; //Define a posição da borda esquerda do cacto

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) { //Se a posição do cacto for menor que a sua largura, ou seja, saiu da tela
      // Saiu da tela
      clearInterval(leftTimer); //Limpa o intervalo para a esquerda
      background.removeChild(cactus); //Remove o elemento filho do background cacto
      pontos();
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) { //"cactusPosition > 0" Compara se o cacto não saiu da tela
      //"0 < cactusPosition < 60" Compara se o cacto está ocupando o espaço do dinossauro
      //"position < 60" Compara se a posição do pulo do dinossauro é do mesmo tamanho do cacto
      // Game over
      clearInterval(leftTimer); //Limpa o intervalo para a esquerda
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>'; //Insere uma nova tag html
    } else {
      cactusPosition -= 10; //Velocidade que o cacto se move para a esquerda
      cactus.style.left = cactusPosition + 'px'; //Define a posição da borda esquerda do cacto
    }
  }, 20);

  setTimeout(createCactus, randomTime); //A função está chamando a si mesma depois de um intervalo de tempo em ms
}

//Responsável pelo número de pontos
function pontos(){
  if (position <= 10) { //Se a posição de descida do dinossauro for menor ou igual a 10
    pts++;  //Incrementa o número de pontos
    document.getElementById('pont').innerHTML = "Pontos: " + String(pts); //Coloca o número de pontos na id 'pont'
  }
}

createCactus(); //Chama a função criar cacto
document.addEventListener('keyup', handleKeyUp); //Espera um evento de pressionamento de tecla da função "handleKeyUp"
