// ==========================================
// OPERATION: TE AMO ❤️
// Para Giovani Tapia
// Con amor, Saya
// ==========================================
let escalaLogo = 1;
// ---------- ELEMENTOS ----------
const texto = document.getElementById("texto");
const linea = document.getElementById("linea");
const intro = document.getElementById("intro");
const dedicatoria = document.getElementById("dedicatoria");

// ---------- FRASES ----------
const frases = [
    "Hola, Mi pimpollo... ❤️",
    "Hay algo que quiero decirte...",
    "No importa cuántas partidas juguemos...",
    "Siempre elegiría jugar la vida contigo. ❤️"
];

let indice = 0;

// ==========================================
// EFECTO MÁQUINA DE ESCRIBIR
// ==========================================

function escribir(frase, callback){

    texto.innerHTML = "";

    let i = 0;

    const efecto = setInterval(()=>{

        texto.innerHTML += frase.charAt(i);

        i++;

        if(i >= frase.length){

            clearInterval(efecto);

            setTimeout(callback,1500);

        }

    },70);

}

// ==========================================
// INTRO
// ==========================================

function iniciar(){

    if(indice < frases.length){

        escribir(frases[indice],()=>{

            indice++;

            iniciar();

        });

    }else{

        linea.style.width="260px";

        setTimeout(mostrarDedicatoria,1800);

    }

}

// ==========================================
// DEDICATORIA
// ==========================================

function mostrarDedicatoria(){

    intro.style.opacity = "0";

    setTimeout(()=>{

        intro.style.display = "none";

        dedicatoria.classList.add("mostrar");

        // La dedicatoria permanece 5 segundos
        setTimeout(()=>{

            dedicatoria.style.opacity = "0";

            setTimeout(()=>{

                dedicatoria.style.display = "none";

                iniciarLogo();

            },1500);

        },5000);

    },1000);

}
// ==========================================
// PREPARAR LOGO
// ==========================================

const logoContainer = document.getElementById("logoContainer");

const canvas = document.getElementById("logoCanvas");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;

canvas.height = window.innerHeight;

const imagen = new Image();

imagen.src = "img/logo.png";
// ==========================================
// PARTÍCULAS
// ==========================================

const particulas = [];

class Particula{

    constructor(x,y){

    // Elegimos un borde al azar
    const lado = Math.floor(Math.random()*4);

    if(lado===0){

        // Izquierda
        this.x=-100;
        this.y=Math.random()*canvas.height;

    }else if(lado===1){

        // Derecha
        this.x=canvas.width+100;
        this.y=Math.random()*canvas.height;

    }else if(lado===2){

        // Arriba
        this.x=Math.random()*canvas.width;
        this.y=-100;

    }else{

        // Abajo
        this.x=Math.random()*canvas.width;
        this.y=canvas.height+100;

    }

    this.destinoX=x;
    this.destinoY=y;

    const letras=["T","E","A","M","O"];

    this.letra=letras[Math.floor(Math.random()*letras.length)];

    this.tamano = 8;

   this.velocidad = Math.random()*0.025 + 0.015;


}

    actualizar(){

        this.x += (this.destinoX - this.x) * this.velocidad;

        this.y += (this.destinoY - this.y) * this.velocidad;

    }
dibujar(){

    ctx.shadowColor="#ff0000";

    ctx.shadowBlur=15;

    ctx.fillStyle="#d10000";

    ctx.font=this.tamano+"px Arial";

    ctx.fillText(this.letra,this.x,this.y);

    ctx.shadowBlur=0;

}
}
function crearLogo(){

    particulas.length = 0;

    const temp = document.createElement("canvas");

    temp.width = imagen.width;
    temp.height = imagen.height;

    const tctx = temp.getContext("2d");

    tctx.drawImage(imagen,0,0);

    const datos = tctx.getImageData(
        0,
        0,
        temp.width,
        temp.height
    ).data;

    for(let y=0; y<temp.height; y+=2){

        for(let x=0; x<temp.width; x+=2){

            const indice = (y*temp.width+x)*4;

            if(datos[indice+3] > 120){

                particulas.push(

                    new Particula(

                        x + canvas.width/2 - temp.width/2,

                        y + canvas.height/2 - temp.height/2

                    )

                );

            }

        }

    }

     // Comienza la formación del logo
    animar();

    // Tiempo para que termine de formarse
    setTimeout(()=>{

        // El logo permanece visible
        // antes de mostrar la carta
        setTimeout(()=>{

            mostrarCarta();

        },8000);

    },10000);
}

function animar(){

ctx.clearRect(0,0,canvas.width,canvas.height);

escalaLogo = 1 + Math.sin(Date.now()/500)*0.02;

ctx.save();

ctx.translate(canvas.width/2,canvas.height/2);

ctx.scale(escalaLogo,escalaLogo);

ctx.translate(-canvas.width/2,-canvas.height/2);
   
for(const p of particulas){

        p.actualizar();

        p.dibujar();

    }
ctx.restore();
    requestAnimationFrame(animar);

}
function iniciarLogo(){

    logoContainer.classList.add("mostrar");

    if(imagen.complete){

        crearLogo();

    }else{

        imagen.onload = crearLogo;

    }
}


// ==========================================
// INICIO
// ==========================================

iniciar();

const mensajeCarta = document.getElementById("mensajeCarta");

const textoCarta = `

💌 Mi querido Ing Giovani ❤️

Si llegaste hasta aquí...

Quería hacer algo diferente para decirte cuánto te amo.

Gracias por cada momento, por cada sonrisa y por acompañarme siempre.

No importa cuántas batallas enfrentemos...

Siempre elegiré caminar a tu lado.

Eres mi lugar seguro.

Mi persona favorita.

Y el amor de mi vida.

Te amo muchísimo.

Con todo mi corazón...

❤️ Con amor, Saya ❤️

`;

function mostrarCarta(){

    logoContainer.classList.remove("mostrar");

    carta.classList.add("mostrar");

    let i=0;

    mensajeCarta.innerHTML="";

    const escribir=setInterval(()=>{

        mensajeCarta.innerHTML+=textoCarta.charAt(i);

        i++;

        if(i>=textoCarta.length){

            clearInterval(escribir);

        }

    },12);

}