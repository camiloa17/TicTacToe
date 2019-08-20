class JuegoTriqui {
    constructor() {
        //ver si es el turno del jugador o la maquina
        this.turnoJugador = true;
        //almacena las jugadas del jugador.
        this.jugadasJugador = [];
        //almacena las jugadas de la computadora.
        this.jugadasComputador = [];
        //Para ver si ya inicio el juego o no.
        this.jugando = false;
        //ver quien gano y con que jugadas.
        this.gano = ["jugador", [], false];
    }

    movimiento(movida) {
        if (this.turnoJugador === true) {
            return this.jugador(movida);
        } else {
            return this.jugador2(movida);
        }
    }

    jugador(movida) {
        let cuadro = document.querySelector("#" + movida);
        let cuadroId = cuadro.getAttribute("id");

        this.jugadasJugador.push(parseInt(cuadroId.slice(cuadroId.length - 1, cuadroId.length)));
        this.comprobarSiGana(this.jugadasJugador, "Jugador1");
        this.turnoJugador = false;
        return [true, this.gano];

    }

    jugador2(movida) {
        let cuadro = document.querySelector("#" + movida);
        let cuadroId = cuadro.getAttribute("id");

        this.jugadasComputador.push(parseInt(cuadroId.slice(cuadroId.length - 1, cuadroId.length)));
        this.turnoJugador = true;
        this.comprobarSiGana(this.jugadasComputador, "Jugador2");
        return [false, this.gano];

    }

    comprobarSiGana(array, jugador) {
        let posicionesGanadoras = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 5, 9], [1, 5, 9], [3, 5, 7]];
        //Loop de los arrays de las posiciones que son ganadoras
        for (let ganador of posicionesGanadoras) {
            //Variable para almacenar las comparaciones, si las tres son true gana.
            let posibilidadesGanar = [];
            //Compara por grupo de posibilidades cada numero con los movimientos del jugador o pc.
            for (let posicion of ganador) {
                //Agrego a las posbilidades el resultado de la comparacion
                posibilidadesGanar.push(array.includes(posicion));
                //Si la posibilidad ya tiene tres resultados almacenados filtro estos tres valores para ver si todos son true
                if (posibilidadesGanar.length == 3) {
                    //asigno los resultados filtrados a posibilidad para ganar solo con true.
                    posibilidadesGanar = posibilidadesGanar.filter(value => value === true);
                    //si quedan de nuevo 3 resultados dentro del array signifca que gano
                    if (posibilidadesGanar.length == 3) {
                        //guardo en una variable el jugador que gano, movida ganadora y el estado true para saber que gano.
                        this.gano = [jugador, ganador, true];
                        //termino el juego con un false para evitar mas movimientos.
                        this.jugando = false;
                        return
                    }
                }
            }
        } if (this.gano[2] == false) {
            this.gano = [jugador, [], false]
            
        }
    }
}