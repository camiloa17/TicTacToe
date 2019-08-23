class Vista {
    constructor(juegoTriqui) {
        this.juegoTriqui = juegoTriqui;

        // Agrega un evento para el click y dispara el movimiento del jugador.
        document.querySelector(".area-juego").addEventListener("click", (event) => {
            if(!this.juegoTriqui.turnoJugador){
                return
            }
            let elementId = event.target.getAttribute("id");

            if (this.juegoTriqui.jugando == true) {
                if (event.target.innerHTML == "") {

                    let movimiento = this.juegoTriqui.movimiento(elementId);
                    
                    this.agregarMovimiento(movimiento[0], elementId);

                    setTimeout(()=>{
                        let movimientoPC = this.juegoTriqui.computador();
                        if(this.juegoTriqui.jugando==true){
                            this.agregarMovimiento(movimientoPC[0][0], movimientoPC[1]);
                            this.ganador();
                        }
                        
                        
                    },1000)

                    this.ganador();
                    
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
    ganador() {
        if (this.juegoTriqui.gano[1].gano == true){
            document.querySelector("h2").innerHTML = `Gano la partida el ${this.juegoTriqui.gano[0]}`
            this.juegoTriqui.jugando = false;
        }
        
    }


}