

// Jogo Pong em JavaScript - usando função de biblioteca
// Versão multiplayer


// variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro/2;

// velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// variveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

// placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// sons do jogo
let raquetada;
let ponto;
let trilha;

// erro da raquete do oponente
let chanceDeErrar = 0;


function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3")
}


function setup() {
  createCanvas(600, 400);
  trilha.loop();
  
}

function draw() {
  background("black");
  mostraBolinha();
  movimentaBolinha();
  verificaColisao();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  
  // verificaColisaoRaquete(); 
  // subtituida pela verificaColisaoRaqueteBiblioteca(xRaquete, yRaquete);
  verificaColisaoRaqueteBiblioteca(xRaquete, yRaquete);
  mostraRaquete( xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha() {
  circle(xBolinha,yBolinha,diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisao() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  } 
}

function mostraRaquete( x, y ){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

// se usar o modo multiplayer, usar esta função de movimento
// function movimentaRaqueteOponente(){
//   if (keyIsDown(87)) {
//     yRaqueteOponente -= 10;
//   }
//   if (keyIsDown(83)){
//     yRaqueteOponente += 10;
//   }
// }

// modo contra o computador

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}


function verificaColisaoRaquete() {
  if(xBolinha + raio < xRaquete && 
     yBolinha - raio < yRaquete + raqueteAltura && 
     yBolinha + raio > yRaquete) {
     velocidadeXBolinha *= -1;
     raquetada.play();
  }
}


/*

  GITHUB
  
  usando o help / reference / library
  https://p5js.org/libraries/   traz a lib do github  bmorem / p5.collide2D
  https://github.com/bmoren/p5.collide2D
  ARQUIVO BAIXADO = p5.collide2D-master.zip
  file uploaded = p5.collide2d.js  =>  que deve ser referenciado no script
                                       do arquivo HTML
*/

function verificaColisaoRaqueteBiblioteca(x,y){
  // lib: collideRectCircle(200, 200, 100, 150, mouseX, mouseY, 100);
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function incluiPlacar(){
  stroke("white");
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(150,10,40,20);
  fill("white");
  text(meusPontos, 170, 26);
  fill(color(255,140,0));
  rect(450,10,40,20);
  fill("white");
  text(pontosDoOponente, 470, 26);
}

function marcaPonto(){
  if (xBolinha > 590) {
    meusPontos ++;
    ponto.play();
  }
  if (xBolinha < 10) {
    pontosDoOponente ++;
    ponto.play();
  }
}

function calculaChanceDeErrar(){
    if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}
