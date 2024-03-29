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
        this.gano = ["Jugador1", { gano: false }];
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
        this.gano = ["jugador1", this.comprobarSiGana(this.jugadasJugador)];;
        this.turnoJugador = false;
        return [true, this.gano];
    }

    jugador2(movida) {
        let cuadro = document.querySelector("#" + movida);
        let cuadroId = cuadro.getAttribute("id");

        this.jugadasComputador.push(parseInt(cuadroId.slice(cuadroId.length - 1, cuadroId.length)));
        this.turnoJugador = true;
        this.gano = ["jugador2", this.comprobarSiGana(this.jugadasComputador)];
        return [false, this.gano];
    }

    computador() {
        if (!this.turnoJugador) {
            if(this.jugando){
            while (true && this.jugando==true) {
                let posicion = this.loopComputador();


                if (posicion > 0 || posicion <= 9) {

                    if (!this.jugadasJugador.includes(posicion) && (!this.jugadasComputador.includes(posicion))) {

                        return [this.jugador2("cuadro" + posicion), "cuadro" + posicion];

                    }

                }
            }
        }else{
            return this.gano;
        }
    }
}

    loopComputador() {
        let posicion;

        do {
            posicion = Math.round(Math.random() * 9);

        } while (posicion == 0);

        return posicion;
    }




    comprobarSiGana(array) {
        if (array.includes(5)) {
            for (let i = 0; i < 2; i++) {
                let x = i == 0 ? 1 : -1;
                if (array.includes(2 - x) && array.includes(8 + x)) {
                    return { gano: true, linea: [2 - x, 5, 8 + x] };
                }
            }
        }

        for (let i = 0; i < 3; i++) {
            let results = { h: 0, v: 0, hA: [], vA: [] };
            for (let j = 0; j < 3; j++) {
                results.h += array.includes(j + i * 3 + 1) ? 1 : 0;
                results.hA.push(j + i * 3 + 1);
                results.v += array.includes(i + j * 3 + 1) ? 1 : 0;
                results.vA.push(i + j * 3 + 1);
            }
            if (results.h == 3 || results.v == 3) {
                return { gano: true, linea: results.h == 3 ? results.hA : results.vA };
            }
        }
        return { gano: false };
    }

    /* comprobarSiGana(array, jugador) {
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
    } */
}