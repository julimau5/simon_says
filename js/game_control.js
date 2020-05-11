const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');
const LAST_LEVEL = 10;

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this);
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.nextLevel, 500);
  }

  inicializar() {
    this.nextLevel = this.nextLevel.bind(this);       // porque esta fucion se ejecutará asincronamente por el setTimeout y el this entonces será el window, para que sea el que necesitamos (el new game crado) ponemos el bind.
    this.chooseColor = this.chooseColor.bind(this);  //el bind "ata" al this con el juego
    this.toogleBtnStart();
    this.level = 1;
    this.colors = {
      celeste: celeste,   //saying that is equal to...
      violeta,            //... saying that (cause the variables(or const) are already created up there ^)
      naranja,
      verde
    }
  }

  toogleBtnStart(){
    if (btnEmpezar.classList.contains("hide")){
      btnEmpezar.classList.remove('hide');
    } else {
      btnEmpezar.classList.add('hide');
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
  colorsToNums (color) {
    switch (color){
      case 'celeste':
        return 0;
      case 'violeta':
        return 1;
      case 'naranja':
        return 2;
      case 'verde':
        return 3;
    }
  }

  generarSecuencia(){
    this.secuence = new Array(LAST_LEVEL).fill(0).map(i => randomIntGen(0, 3));
  }

  highlightColor( color ){
    this.colors[color].classList.add('light');
    setTimeout(() => this.lightOff(color), 350);
  }
  
  lightOff( color ) {
    this.colors[color].classList.remove('light');
  }

  nextLevel(){
    this.subLevel = 0;
    this.showSecuence();
    this.addClickEvents();
  }

  showSecuence() {
    for (let i = 0; i <this.level; i++){
      let color = this.numsToColors(this.secuence[i]);
      setTimeout(() => this.highlightColor(color), 1000 * i);
    }
  }
  addClickEvents(){
    this.colors.celeste.addEventListener('click', this.chooseColor)
    this.colors.violeta.addEventListener('click', this.chooseColor)
    this.colors.naranja.addEventListener('click', this.chooseColor)
    this.colors.verde.addEventListener('click', this.chooseColor)
  }

  deleteClickEvents(){
    this.colors.celeste.removeEventListener('click', this.chooseColor)
    this.colors.violeta.removeEventListener('click', this.chooseColor)
    this.colors.naranja.removeEventListener('click', this.chooseColor)
    this.colors.verde.removeEventListener('click', this.chooseColor)
  }

  chooseColor(ev){
    const colorName = ev.target.dataset.color;
    const numColor = this.colorsToNums(colorName);
    this.highlightColor(colorName);
    if (numColor === this.secuence[this.subLevel]) {
      this.subLevel++;
      if (this.subLevel === this.level){
        this.level++
        this.deleteClickEvents();
        if (this.level === (LAST_LEVEL + 1)) {
          this.winnerBitch();
        }
        else {
          setTimeout(this.nextLevel, 1500);
        }

      }
    }
    else {
      this.loserBitch();
    }
  }

  winnerBitch(){
    swal({
      title: "Ganaste Perrito :3",
      text: "das war's Digga",
      icon: "success",
      button: "Aww yiss!",
    })
      .then(this.inicializar)    
  }

  loserBitch(){
    swal({
      title: "Perdidas Perrito :'3",
      text: "noch mal oder was?",
      icon: "error",
      button: "Aww yiss!",
    })
      .then(() =>{
        this.deleteClickEvents()
        this.inicializar()
      })    
  }


}

function empezarJuego() {
  window.juego = new Juego()
}

function randomIntGen(min, max) {
  return Math.floor(Math.random() * (max - min + 1) -min);
}