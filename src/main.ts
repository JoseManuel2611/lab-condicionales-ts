let puntuacion: number = 0;

type Estado =
    | "CONSERVADOR"
    | "MIEDO"
    | "CASI"
    | "CLAVADO"
    | "GAME_OVER"
    | "NUEVA_PARTIDA";

const generaNumeroAleatorio = (): number => Math.floor(Math.random() * 10) + 1;

const generaCarta = (cartaRandom: number): number => cartaRandom <= 7 ? cartaRandom : cartaRandom + 2;

const urlCarta = (carta: number): string => {
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
  return url;
};

const obtenerPuntuacion = (numero: number): number => numero <= 7 ? numero : 0.5;

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

const compruebaMensaje = (estado: Estado) => {
    let mensaje : string = "";
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
    return mensaje;
};

const muestraCarta = (url: string): void => {
    const cartaPrincipal = document.getElementById("carta");
    if (cartaPrincipal && cartaPrincipal instanceof HTMLImageElement) {
        cartaPrincipal.src = url; 
    } else {
        console.error("muestraCarta: no se ha encontrado el elemento con id carta.");
    }
};

const muestraPuntuacion = () => {
    const elementoPuntuacion = document.getElementById("puntuacion");
    if (elementoPuntuacion && elementoPuntuacion instanceof HTMLSpanElement) {
        elementoPuntuacion.innerText = `${puntuacion}`;
    } else {
        console.error("muestraPuntuacion: no se ha encontrado el elemento con id puntuacion.");
    }
};

const muestraMensaje = (mensaje: string): void => {
    const elementoMensaje =  document.getElementById("mensaje");
    if (elementoMensaje && elementoMensaje instanceof HTMLElement) {
        elementoMensaje.innerText = mensaje;
        if (mensaje === "") elementoMensaje.setAttribute("class", "");
        cambiaClase(elementoMensaje);
       
    } else {
        console.error("muestraMensaje: no se ha encontrado el elemento con id mensaje.");
    }
};



const cambiaClase = (elemento: Element) => {
    const estado: Estado = comprobarPuntuacion(puntuacion);
    if(estado === "GAME_OVER") {
        elemento.classList.add("gameOver");
        elemento.classList.remove("winner");
    }
    if(estado === "CLAVADO") {
        elemento.classList.remove("gameOver");
        elemento.classList.add("winner");
    }

};

const bloquearPartida = (estado: Estado) => {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => { 
        button.id === "reanudar" || button.id === "seguir" ? button.disabled = false : button.disabled = true;
        if (button.id === "seguir") button.style.display = "block";
        if (estado === "GAME_OVER" || estado === "CLAVADO") {
            if (button.id === "seguir") button.style.display = "none";
        }
    });
};

const reanudarPartida = () => {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.disabled = false;
        if (button.id === "seguir") button.style.display = "none";
    });
};

const finDePartida = (estado: Estado) => {
    if(estado === "GAME_OVER" || estado === "CLAVADO") {
        const mensajeFin = compruebaMensaje(estado);
        muestraMensaje(mensajeFin);
        bloquearPartida(estado);
    }
};

const nuevaCarta = () => {
    
    // lógica
    const numeroAleatorio = generaNumeroAleatorio();
    const obtenPuntuacion = obtenerPuntuacion(numeroAleatorio);
    puntuacion += obtenPuntuacion;
    const estado: Estado = comprobarPuntuacion(puntuacion);
    const valorCarta = generaCarta(numeroAleatorio);

    // UI
    const urlImagen = urlCarta(valorCarta);
    muestraCarta(urlImagen);
    muestraPuntuacion();
    finDePartida(estado);

}

const mePlanto = () => {
    const estado: Estado = comprobarPuntuacion(puntuacion);
    const mensajeMePlanto = compruebaMensaje(estado);
    muestraMensaje(mensajeMePlanto);
    bloquearPartida(estado);

}

const seguirPartida = () => {
    const estado: Estado = comprobarPuntuacion(puntuacion);
    nuevaCarta();
    finDePartida(estado);
};

const nuevaPartida = () => {
    puntuacion = 0;
    const mensaje = "";
    const cartaBack = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";

    muestraPuntuacion();
    muestraMensaje(mensaje);
    muestraCarta(cartaBack);
    reanudarPartida();

};


const eventos = () => {
    const botonDameCarta = document.getElementById("dame_carta");
    const botonMePlanto = document.getElementById("me_planto");
    const botonReanudar = document.getElementById("reanudar");
    const botonSeguir = document.getElementById("seguir");

    if (botonDameCarta && botonDameCarta instanceof HTMLButtonElement) {
        botonDameCarta.addEventListener("click", nuevaCarta);
    }
    if (botonMePlanto && botonMePlanto instanceof HTMLButtonElement) {
        botonMePlanto.addEventListener("click", mePlanto);
    };
    if (botonReanudar && botonReanudar instanceof HTMLButtonElement) {
        botonReanudar.addEventListener("click", nuevaPartida);
    };
    if (botonSeguir && botonSeguir instanceof HTMLButtonElement) {
        botonSeguir.addEventListener("click", seguirPartida);
    };
}


document.addEventListener("DOMContentLoaded", () => {
    muestraPuntuacion();
    eventos();
});

