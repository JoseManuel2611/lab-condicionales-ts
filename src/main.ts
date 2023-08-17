import "./style.css";

const botonDameCarta = document.getElementById("dame_carta");
const botonMePlanto = document.getElementById("me_planto");
const botonReanudar = document.getElementById("reanudar");

type Estado =
    | "CONSERVADOR"
    | "MIEDO"
    | "CASI"
    | "CLAVADO"
    | "GAME_OVER"
    | "NUEVA_PARTIDA";

let puntuacion: number = 0;

const muestraPuntuacion = () => {
    const elementoPuntuacion = document.getElementById("puntuacion");
    if (elementoPuntuacion) {
        elementoPuntuacion.innerHTML = `Puntos: <span>${puntuacion}</span>`
    } else {
        console.error("muestraPuntuacion: no se ha encontrado el elemento con id puntuacion.");
    }
};

document.addEventListener("DOMContentLoaded", muestraPuntuacion);

let cartaRandom: number = 0;

const dameCarta = () => {
    cartaRandom = Math.floor(Math.random() * 10) + 1;
    if (cartaRandom >= 8) {
        cartaRandom = cartaRandom + 2;
    }
    return cartaRandom;
};

const cartaPrincipal = (document.getElementById("carta") as HTMLImageElement);

const mostrarCarta = (carta: number): void => {

    let url = "";

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
    if (cartaRandom == carta) {
        cartaPrincipal.src = url;
    }

};


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


const elementoMensaje =  (document.getElementById("mensaje") as HTMLElement);

const compruebaMensaje = (estado: Estado) => {
    let mensaje : string = "";

    switch(estado) {
        case "CONSERVADOR":
            mensaje = "Has sido muy conservador";
            break;
        case "MIEDO":
            mensaje = "Te ha entrado el canguelo eh?";
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
            mensaje = "No sé que ha psado, pero no deberías estar aquí";
            break;
    }
    if (elementoMensaje) {
        elementoMensaje.innerHTML = mensaje;
    } else {
        console.error("muestraMensaje: no se ha encontrado el elemento con id mensaje.");
    }
    
};

const gameOver = () => {

    if (botonDameCarta && botonDameCarta instanceof HTMLButtonElement) {
        botonDameCarta.disabled = true;
    } else {
        console.error("gameOver: no se ha encontrado el elemento con id dame_carta.");
    }
}

const handleDameCarta = () => {

    let carta: number = dameCarta();
    mostrarCarta(carta);

    if (carta >= 10) {
        carta = 0.5;
    }
    puntuacion = puntuacion + carta;

    const estado: Estado = comprobarPuntuacion(puntuacion);
    if(estado === "GAME_OVER") {
        gameOver();
        compruebaMensaje(estado);
    }

    muestraPuntuacion();

};

const handleMePlanto = () => {
    const estado: Estado = comprobarPuntuacion(puntuacion);
    compruebaMensaje(estado);
    gameOver();
};

const nuevaPartida = () => {

    if (botonDameCarta && botonDameCarta instanceof HTMLButtonElement) {
        puntuacion = 0;
        botonDameCarta.disabled = false;
    }
    elementoMensaje.innerHTML = "";
    cartaPrincipal.src = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
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
