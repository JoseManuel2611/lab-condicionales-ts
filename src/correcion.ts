// let puntuacion: number = 0;

// const generaNumeroAleatorio = (): number => Math.floor(Math.random() * 10) + 1;

// const generaCarta = (cartaRandom: number): number => cartaRandom < 7 ? cartaRandom : cartaRandom + 2;

// const urlCarta = (carta: number): string => {
//   let url = "";
//     switch (carta) {
//         case 1:
//             url = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
//             break;
//         case 2:
//             url = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
//             break;
//         case 3:
//             url = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
//             break;
//         case 4:
//             url = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
//             break;
//         case 5:
//             url = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
//             break;
//         case 6:
//             url = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
//             break;
//         case 7:
//             url = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
//             break;
//         case 10:
//             url = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
//             break;
//         case 11:
//             url = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
//             break;
//         case 12:
//             url = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
//             break;
//         default:
//             url = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
//             break;
//     }
//   return url;
// };

// const muestraCarta = (url: string): void => {
//   const cartaPrincipal = document.getElementById("carta");
//   if (cartaPrincipal && instanceof HTMLImageElement) {
//       cartaPrincipal.src = url; 
//   } else {
//       console.error("muestraCarta: no se ha encontrado el elemento con id carta.");
//   }
// }

// const muestraPuntuacion = () => {
//   const elementoPuntuacion = document.getElementById("puntuacion");
//   if (elementoPuntuacion && instanceof HTMLSpanElement) {
//       elementoPuntuacion.innerHTML = `Puntos: <span>${puntuacion}</span>`
//   } else {
//       console.error("muestraPuntuacion: no se ha encontrado el elemento con id puntuacion.");
//   }
// };


// const obtenerPuntuacion = (numero: number): number => numero <= 7 ? numero : 0.5;

// const nuevaCarta = (): void => {
//   const numeroAleatorio = generaNumeroAleatorio();

//   // lógica
//   const obtenPuntuacion = obtenerPuntuacion(numeroAleatorio);
//   puntuacion += obtenPuntuacion;

//   // modificar la ui 
//   const valorCarta = generaCarta(numeroAleatorio);
//   const urlImagen = urlCarta(valorCarta);
//   muestraCarta(urlImagen);
//   muestraPuntuacion(puntuacion);
// }


// const eventos = () => {
//   const botonDameCarta = document.getElementById("dame_carta");
//   const botonMePlanto = document.getElementById("me_planto");
//   const botonReanudar = document.getElementById("reanudar");
//   const botonSeguir = document.getElementById("seguir");

//   if (botonDameCarta && botonDameCarta instanceof HTMLButtonElement) {
//     botonDameCarta.addEventListener("click", nuevaCarta);
//   }
//   if (botonMePlanto && botonMePlanto instanceof HTMLButtonElement) {
//     botonMePlanto.addEventListener("click", handleMePlanto);
//   };

//   if (botonReanudar && botonReanudar instanceof HTMLButtonElement) {
//     botonReanudar.addEventListener("click", nuevaPartida);
//   };

//   if (botonSeguir && botonSeguir instanceof HTMLButtonElement) {
//     botonSeguir.addEventListener("click", seguirPartida);
//   };
// }

// document.addEventListener("DOMContentLoaded", () => {
//   muestraPuntuacion(puntuacion);
//   eventos();
// });