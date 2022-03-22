class Memotec {
  constructor(cartas) {
    this.cartas = cartas.concat(cartas);
    this.totalCartas = this.cartas.length;
    this.aciertos = 0;
    this.contadorClicks = 0;
    this.ultimosClicks = [];
  }

  start(){
      this.ordenarCartasAleatoriamente();
      this.cargarCartas();
  }

  ordenarCartasAleatoriamente() {
    this.cartas.sort(() => {
      const numeroAleatorio = Math.random();
      if (numeroAleatorio > 0.5) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  cargarCartas() {
    const divCartas = document.getElementById("divCartas");
    for (let i = 0; i < this.totalCartas; i++) {
      divCartas.children[i].src = "reverso.png";
      divCartas.children[i].className = this.cartas[i];
      divCartas.children[i].addEventListener(
        "click",
        this.comprobarCartasIguales.bind(this)
      );
    }
  }
  comprobarCartasIguales(e) {
    this.contadorClicks++;
    const clase = e.target.className;

    const comprobarClases = e.target.className.split("");
    if(comprobarClases.some((elemento) => elemento == "acierto")){
        return;
    }

    e.target.src = clase + ".png";
    if (this.contadorClicks % 2 != 0) {
      this.ultimosClicks[0] = e.target;
    } else if (this.contadorClicks % 2 == 0) {
      this.ultimosClicks[1] = e.target;
      if (this.ultimosClicks[0].className == this.ultimosClicks[1].className) {
        this.aciertos++;
        this.ultimosClicks[0].className = this.ultimosClicks[0] + "acierto";
        this.ultimosClicks[1].className = this.ultimosClicks[1] + "acierto";
        if (this.aciertos == this.totalCartas / 2) {
          alert("has ganado");
        }
      } else {
        setTimeout(() => {
          this.ultimosClicks[0].src = "reverso.png";
          this.ultimosClicks[1].src = "reverso.png";
        }, 1500);
      }
    }
  }
}

const pokemons = [
  "ho-oh",
  "leafeon",
  "manectric",
  "pikachu",
  "rayquaza",
  "reshiram",
  "suicune",
  "vaporeon",
];

const juego = new Memotec(pokemons);
juego.start();
