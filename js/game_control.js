const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')

class Juego {
  constructor() {
    this.inicializar()
    this.generarSecuencia()
    this.nextLevel()
  }

  inicializar() {
    btnEmpezar.classList.add('hide');
    this.level = 7;
    this.colors = {
      celeste: celeste,   //saying this is equal to...
      violeta,            //... saying this (cause the variables(or const) are already created up there ^)
      naranja,
      verde
    }
  }

  numsToColors (num) {
    switch (num){
      case 0:
        return 'celeste';
      case 1:
        return 'violeta';
      case 2:
        return 'naranja';
      case 3:
        return 'verde';
    }
  }

  generarSecuencia(){
    this.secuence = new Array(10).fill(0).map(i => randomIntGen(0, 3));
  }

  highlightColor( color ){
    this.colors[color].classList.add('light');
    setTimeout(() => this.lightOff(color), 350);
  }
  
  lightOff( color ) {
    this.colors[color].classList.remove('light');
  }

  nextLevel(){
    this.showSecuence();
  }

  showSecuence() {
    for (let i = 0; i <this.level; i++){
      let color = this.numsToColors(this.secuence[i]);
      setTimeout(() => this.highlightColor(color), 1000 * i);
    }
  }
}

function empezarJuego() {
  window.juego = new Juego()
}

function randomIntGen(min, max) {
  return Math.floor(Math.random() * (max - min + 1) -min);
}