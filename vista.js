class Vista {
    constructor(juegoTriqui) {
        this.juegoTriqui = juegoTriqui;

        // Agrega un evento para el click y dispara el movimiento del jugador.
        document.querySelector(".area-juego").addEventListener("click", (event) => {
            let elementId = event.target.getAttribute("id");

            if (this.juegoTriqui.jugando == true) {
                if (event.target.innerHTML == "") {

                    let movimiento = this.juegoTriqui.movimiento(elementId);
                    

                    this.agregarMovimiento(movimiento[0], elementId);

                        if (movimiento[1][1].gano==true) {
                            console.log(movimiento[1][1].linea);
                            this.ganador(movimiento[1][0]);
                        
                    }
                }
            }
        });

        //Cambia el estado del juego a jugando
        document.querySelector("body").addEventListener("keydown", () => {
            if (this.juegoTriqui.jugando == false && this.juegoTriqui.gano[1].gano == false) {
                this.juegoTriqui.jugando = true;
                document.querySelector("h2").innerHTML = "Es el Turno del J1";
            }
        });

    }
    agregarMovimiento(movimiento, element) {
        let cuadro = document.querySelector("#" + element);
        if (movimiento === true) {
            cuadro.innerHTML = "X";
            document.querySelector("h2").innerHTML = "Es el Turno del J2";
        } else if (movimiento === false) {
            cuadro.innerHTML = "O";
            document.querySelector("h2").innerHTML = "Es el Turno del J1";
        }
    }
    ganador(ganador) {
        document.querySelector("h2").innerHTML = `Gano la partida el ${ganador}`
    }


}