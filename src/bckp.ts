import "./style.css";

const botonDameCarta = document.getElementById("dame_carta");
const botonMePlanto = document.getElementById("me_planto");
const botonReanudar = document.getElementById("reanudar");
const botonSeguir = document.getElementById("seguir");

const cartaPrincipal = document.getElementById("carta");
const elementoPuntuacion = document.getElementById("puntuacion");
const elementoMensaje =  document.getElementById("mensaje");

type Estado =
    | "CONSERVADOR"
    | "MIEDO"
    | "CASI"
    | "CLAVADO"
    | "GAME_OVER"
    | "NUEVA_PARTIDA";


const generaNumeroAleatorio = () => {
    let numeroAleatorio: number = 0;
    numeroAleatorio = Math.floor(Math.random() * 10) + 1;
    return numeroAleatorio;
}

const generaCarta = () => {
    let cartaRandom: number = 0;
    cartaRandom = generaNumeroAleatorio();
    if (cartaRandom >= 8) {
        cartaRandom = cartaRandom + 2;
    }
    return cartaRandom;

}

let url = "";
const urlCarta = (carta: number): void => {
    switch (carta) {
        case 1:
            url = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
            break;
        case 2:
            url = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
            break;
        case 3:
            url = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
            break;
        case 4:
            url = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
            break;
        case 5:
            url = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
            break;
        case 6:
            url = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
            break;
        case 7:
            url = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
            break;
        case 10:
            url = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
            break;
        case 11:
            url = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
            break;
        case 12:
            url = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
            break;
        default:
            url = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
            break;
    }
};

const muestraCarta = () => {
    if (cartaPrincipal) {
        (cartaPrincipal as HTMLImageElement).src = url; 
    } else {
        console.error("muestraCarta: no se ha encontrado el elemento con id carta.");
    }
}

let puntuacion: number = 0;
const obtenerPuntuacion = (carta: number) => {
    if (carta >= 10) {
        carta = 0.5;
    }
    puntuacion = puntuacion + carta;
}

const comprobarPuntuacion = (puntuacion: number) => {

    if (puntuacion <= 4) {
        return "CONSERVADOR";
    }
    if (puntuacion > 4 && puntuacion <= 6) {
        return "MIEDO";

    }
    if (puntuacion > 6 && puntuacion <= 7) {
        return "CASI";

    }
    if (puntuacion === 7.5) {
        return "CLAVADO";
    }

    return (puntuacion > 7.5) ? "GAME_OVER" : "NUEVA_PARTIDA";

};
const muestraPuntuacion = () => {
    if (elementoPuntuacion) {
        elementoPuntuacion.innerHTML = `Puntos: <span>${puntuacion}</span>`
    } else {
        console.error("muestraPuntuacion: no se ha encontrado el elemento con id puntuacion.");
    }
};

const bloquearPartida = () => {
    if (botonDameCarta && botonDameCarta instanceof HTMLButtonElement) {
        botonDameCarta.disabled = true;
    } else {
        console.error("bloquearPartida: no se ha encontrado el elemento con id dame_carta.");
    }
    if (botonMePlanto && botonMePlanto instanceof HTMLButtonElement) {
        botonMePlanto.disabled = true;
    } else {
        console.error("bloquearPartida: no se ha encontrado el elemento con id me_planto.");
    }
    if (botonSeguir && botonSeguir instanceof HTMLButtonElement) {
        botonSeguir.disabled = true;
    } else {
        console.error("bloquearPartida: no se ha encontrado el elemento con id seguir.");
    }
};


let mensaje : string = "";
const compruebaMensaje = (estado: Estado) => {

    switch(estado) {
        case "CONSERVADOR":
            mensaje = "Has sido muy conservador";
            break;
        case "MIEDO":
            mensaje = "Te ha entrado canguelo eh?";
            break;
        case "CASI":
            mensaje = "Casi casí...";
            break;
        case "CLAVADO":
            mensaje = "¡Lo has clavado! ¡Enhorabuena!";
            break;
        case "GAME_OVER":
            mensaje = "Game over: has superado el número máximo";
            break;
        default:
            mensaje = "No sé que ha pasado, pero no deberías estar aquí";
            break;
    }
};

const muestraMensaje = (estado: Estado) => {
    compruebaMensaje(estado);
    if (elementoMensaje) {
        elementoMensaje.innerHTML = mensaje;
    } else {
        console.error("muestraMensaje: no se ha encontrado el elemento con id mensaje.");
    }
};

const gameOver = (estado: Estado) => {
    if(estado === "GAME_OVER" || estado === "CLAVADO") {
        bloquearPartida();
        muestraMensaje(estado);
    }
    if (elementoMensaje) {
        if(estado === "GAME_OVER") {
            elementoMensaje.classList.add("gameOver");
            elementoMensaje.classList.remove("winner");
        }
        if(estado === "CLAVADO") {
            elementoMensaje.classList.remove("gameOver");
            elementoMensaje.classList.add("winner");
        }
    }
};


const handleDameCarta = () => {
    let carta: number = generaCarta();
    urlCarta(carta);
    muestraCarta();
    obtenerPuntuacion(carta);
    muestraPuntuacion();
    const estado: Estado = comprobarPuntuacion(puntuacion);
    gameOver(estado);
}

const handleMePlanto = () => {
    bloquearPartida();
    const estado: Estado = comprobarPuntuacion(puntuacion);
    muestraMensaje(estado);

    if (botonSeguir && botonSeguir instanceof HTMLButtonElement) {
        botonSeguir.style.display = 'block';
        botonSeguir.disabled = false;
    }
}
const seguirPartida = () => {
    let carta: number = generaCarta();
    urlCarta(carta);
    muestraCarta();
    obtenerPuntuacion(carta);
    muestraPuntuacion();
    const estado: Estado = comprobarPuntuacion(puntuacion);
    gameOver(estado);
};

const nuevaPartida = () => {
    if (botonDameCarta && botonDameCarta instanceof HTMLButtonElement) {
        puntuacion = 0;
        botonDameCarta.disabled = false;
    }
    if (botonMePlanto && botonMePlanto instanceof HTMLButtonElement) {
        puntuacion = 0;
        botonMePlanto.disabled = false;
    }
    if (botonSeguir && botonSeguir instanceof HTMLButtonElement) {
        botonSeguir.style.display = 'none';
    }
    if (elementoMensaje) {
        elementoMensaje.innerHTML = "";
        elementoMensaje.classList.remove("gameOver", "winner");
    }
    (cartaPrincipal as HTMLImageElement).src = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
    
    muestraPuntuacion();
};

if (botonDameCarta && botonDameCarta instanceof HTMLButtonElement) {
    botonDameCarta.addEventListener("click", handleDameCarta);
}
if (botonMePlanto && botonMePlanto instanceof HTMLButtonElement) {
    botonMePlanto.addEventListener("click", handleMePlanto);
};

if (botonReanudar && botonReanudar instanceof HTMLButtonElement) {
    botonReanudar.addEventListener("click", nuevaPartida);
};

if (botonSeguir && botonSeguir instanceof HTMLButtonElement) {
    botonSeguir.addEventListener("click", seguirPartida);
};