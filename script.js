  let score = 0;
let energyLimit = 500;
let energyCooldown = 6 * 60 * 60 * 1000; // 6 horas en milisegundos
let energyRemaining = energyLimit; // Energía inicial
let lastTouchTime = Date.now();
let lastEnergyClaimTime = Date.now();
let energyTimerActive = false; // Variable para controlar el estado del temporizador

// Obtén los elementos
const clickableImage = document.getElementById('clickable-image');
const scoreDisplay = document.getElementById('score');
const energyDisplay = document.getElementById('energy');
const timerDisplay = document.getElementById('timer-display');

function updateScore() {
    const currentTime = Date.now();
    
    // Verificar si ha pasado el tiempo de enfriamiento
    if (currentTime - lastTouchTime >= energyCooldown) {
        score = 0; // Reiniciar puntos si ha pasado el tiempo de enfriamiento
        energyRemaining = energyLimit; // Reiniciar la energía restante
        lastEnergyClaimTime = currentTime; // Actualizar el tiempo del último reclamo de energía
        energyTimerActive = false; // Detener el temporizador si se reinicia la energía
        timerDisplay.innerText = "00:00:00"; // Resetear el temporizador
    }

    // Verificar si aún hay energía disponible
    if (score < energyLimit && energyRemaining > 0) {
        score++;
        energyRemaining--; // Disminuir la energía restante
        scoreDisplay.innerText = `Puntos: ${score}`;
        energyDisplay.innerText = `Energía: ${energyRemaining}`;
        animateClick();
        createCoinAnimation(event.clientX, event.clientY);
        lastTouchTime = currentTime; // Actualizar el tiempo del último toque
    } else {
        // Si se agota la energía
        if (!energyTimerActive) {
            startEnergyTimer(); // Iniciar el temporizador
        }
        alert('¡Has alcanzado el límite de toques de energía! Vuelve en 6 horas para más.');
    }
}

// Función para iniciar el temporizador
function startEnergyTimer() {
    energyTimerActive = true; // Marcar el temporizador como activo
    const timerEnd = Date.now() + energyCooldown; // Tiempo final para el temporizador

    function updateTimer() {
        const currentTime = Date.now();
        const remainingTime = timerEnd - currentTime;

        // Si el tiempo se ha agotado, restablecer energía
        if (remainingTime <= 0) {
            energyRemaining = energyLimit; // Restablecer energía
            energyDisplay.innerText = `Energía: ${energyRemaining}`;
            timerDisplay.innerText = "00:00:00"; // Resetear el temporizador
            energyTimerActive = false; // Detener el temporizador
            return; // Salir de la función
        }

        // Calcular horas, minutos y segundos restantes
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);

        // Mostrar el tiempo restante en el temporizador
        timerDisplay.innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Llamar a la función nuevamente cada segundo
        setTimeout(updateTimer, 1000);
    }

    // Iniciar el temporizador
    updateTimer();
}

// Función para animar la imagen al hacer clic
function animateClick() {
    clickableImage.style.transform = 'scale(0.9)';
    clickableImage.style.animation = 'coin-spin 0.5s linear'; // Añadir animación de giro

    setTimeout(() => {
        clickableImage.style.transform = 'scale(1)';
        clickableImage.style.animation = ''; // Restablecer la animación después del clic
    }, 500); // Duración de la animación
}

// Función para crear la animación de la moneda
function createCoinAnimation(x, y) {
    const coin = document.createElement('div');
    coin.className = 'coin';
    coin.style.left = `${x}px`;
    coin.style.top = `${y}px`;
    document.body.appendChild(coin);
    setTimeout(() => {
        coin.remove();
    }, 1000);
}

// Agregar el evento de clic a la imagen clicable
clickableImage.addEventListener('click', (event) => {
    updateScore(); // Actualizar la puntuación al hacer clic
});

  
   //task modal

   
    // Abrir y cerrar el modal de tareas
const taskButton = document.getElementById('task-button');
const taskModal = document.getElementById('task-modal');
const closeTask = document.getElementsByClassName('close-task')[0];

taskButton.onclick = function() {
    taskModal.style.display = 'block';
}

closeTask.onclick = function() {
    taskModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === taskModal) {
        taskModal.style.display = 'none';
    }
}

// Habilitar el botón 'Claim' después de 15 minutos al hacer clic en 'IR'
function enableClaimButton(button) {
    button.disabled = false;
    button.classList.add('enabled');
}

// Ejemplo para habilitar el botón de reclamar después de 15 minutos
const task1Link = document.getElementById('task-1-link');
const claimTask1 = document.getElementById('claim-task-1');

task1Link.onclick = function() {
    setTimeout(() => {
        enableClaimButton(claimtask1);
    }, 9000); // 15 minutos = 900000 ms
}
//obs2

function startTask(buttonId) {
    let button = document.getElementById(buttonId);
    let timerElement = document.getElementById(buttonId.replace("button", "timer"));
// Inicializar el puntaje
let totalScore = 0;

// Función para actualizar el puntaje
function updateScore(points) {
    totalScore += points;
    document.getElementById('score').textContent = `Puntos: ${totalScore}`;
}

// Asegúrate de que este código esté dentro de la función que habilita el botón "Claim"
document.getElementById(`claim-${taskId}`).style.backgroundColor = 'green'; // Cambia el color a verde
updateScore(50); // Sumar 50 puntos al puntaje

    // Deshabilitar el botón y cambiar el texto a "Realizando..."
    button.disabled = true;
    button.innerText = "Realizando...";

    // Establecer un temporizador de 15 minutos (900000 ms = 15 minutos)
    let countdownTime = 0* 10 * 1000; 
    let endTime = new Date().getTime() + countdownTime;

    // Actualizar el temporizador cada segundo
    let interval = setInterval(function() {
        let currentTime = new Date().getTime();
        let timeLeft = endTime - currentTime;

        // Calcular minutos y segundos restantes
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Mostrar el temporizador
        timerElement.innerText = `Tiempo restante: ${minutes}m ${seconds}s`;

        // Si el tiempo se agota, cambiar el botón a "Claim"
        if (timeLeft < 0) {
            clearInterval(interval);
            timerElement.innerText = "";
            button.disabled = false;
            button.innerText = "Claim";
            button.onclick = function() {
                claimReward(claim-task-1);
            };
        }
    }, 1000);
}

function claimReward(buttonId) {
    // Lógica para reclamar la recompensa
    alert("Recompensa reclamada!");
    let button = document.getElementById(claim-task-1);
    button.innerText = "IR"; // Resetear el botón
    button.onclick = function() {
        startTask(buttonId);
    };
}
document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar todas las tareas y botones Claim
    const tasks = document.querySelectorAll("[id^='task-']");
    const claimButtons = document.querySelectorAll("[id^='claim-task-']");
    const timers = {};

    tasks.forEach((taskLink) => {
        let taskId = taskLink.id.split("-")[1]; // Obtener el número de la tarea

        let taskLinkElement = document.getElementById(`task-${taskId}-link`);
        let claimButtonElement = document.getElementById(`claim-task-${taskId}`);

        // Al hacer clic en "IR"
        taskLinkElement.addEventListener("click", function () {
            // Cambiar el texto a "Realizando..." y deshabilitar el enlace
            taskLinkElement.textContent = "Realizando...";
            taskLinkElement.style.pointerEvents = "none"; // Deshabilitar clic
            taskLinkElement.style.opacity = "0.5"; // Indicar que está deshabilitado

            // Temporizador de 1 minuto para pruebas
            let countdownTime = 0* 10 * 1000; // Puedes cambiar a 15 minutos = 15 * 60 * 1000
            let endTime = new Date().getTime() + countdownTime;
            
            timers[taskId] = setInterval(function () {
                let now = new Date().getTime();
                let distance = endTime - now;

                if (distance <= 0) {
                    clearInterval(timers[taskId]);
                    
                    // Habilitar el botón "Claim" después de que pase el tiempo
                    claimButtonElement.disabled = false;
                    claimButtonElement.style.backgroundColor = "green";
                    
                    // Al hacer clic en "Claim"
                    claimButtonElement.addEventListener("click", function () {
                        alert(`Recompensa obtenidas ${taskId}`);
                        claimButtonElement.disabled = true;
                        taskLinkElement.textContent = "IR";
                        taskLinkElement.style.pointerEvents = "auto"; // Habilitar nuevamente
                        taskLinkElement.style.opacity = "1"; // Restaurar visibilidad del enlace
                        claimButtonElement.style.backgroundColor = "gray";

                        // Sumar puntos a tu marcador de energía
                        sumarPuntos(50);
                    });
                }
            }, 1000);
        });
    });

    // Función para sumar puntos al marcador de energía
    function sumarPuntos(puntos) {
        let scoreElement = document.getElementById("score"); // Ajusta el ID según tu marcador de energía
        let currentScore = parseInt(scoreElement.textContent);
        scoreElement.textContent = currentScore + puntos;
    }
});
document.addEventListener("DOMContentLoaded", function () {
    // Obtener todos los enlaces de tareas y botones claim
    const tasks = document.querySelectorAll("[id^='task-']");
    const claimButtons = document.querySelectorAll("[id^='claim-task-']");
    const timers = {};

    tasks.forEach((taskLink, index) => {
        let taskId = index + 1;
        let taskLinkElement = document.getElementById(`task-${taskId}-link`);
        let claimButtonElement = document.getElementById(`claim-task-${taskId}`);

        taskLinkElement.addEventListener("click", function () {
            // Establecer el texto en "Realizando"
            taskLinkElement.textContent = "Realizando...";
            taskLinkElement.disabled = true;

            // Temporizador de 15 minutos
            let countdownTime = 0 * 10 * 1000; // Para pruebas, 1 minuto
            let endTime = new Date().getTime() + countdownTime;
            timers[taskId] = setInterval(function () {
                let now = new Date().getTime();
                let distance = endTime - now;

                if (distance <= 0) {
                    clearInterval(timers[taskId]);
                    // Habilitar el botón Claim y cambiar su color
                    claimButtonElement.disabled = false;
                    claimButtonElement.style.backgroundColor = "green";
                    claimButtonElement.addEventListener("click", function () {
                        alert(`puntos claim ${taskId}`);
                        claimButtonElement.disabled = true;
                        taskLinkElement.textContent = "IR";
                        claimButtonElement.style.backgroundColor = "gray";

                        // Aquí puedes agregar la lógica para sumar puntos
                        sumarPuntos(50);
                    });
                }
            }, 1000);
        });
    });

    // Función para sumar puntos al balance del usuario
    function sumarPuntos(puntos) {
        let score = document.getElementById("total-puntaje")

        let puntosActuales = parseInt(score.textContent);
        score.textContent = puntosActuales + puntos;
    }
});

// Muestra el modal al hacer clic en el botón de "Invita Amigos"
document.getElementById("referencias-button").onclick = function() {
    document.getElementById('invite-modal').style.display = 'block';
}

// Cierra el modal
document.getElementById('close-invite').onclick = function() {
    document.getElementById('invite-modal').style.display = 'none';
}

// Función para copiar el enlace
document.getElementById('copy-invite-link').onclick = function() {
    const inviteLink = document.getElementById('invite-link');
    inviteLink.select();
    document.execCommand('copy');
    alert('Enlace copiado: ' + inviteLink.value);
}

// Aquí podrías agregar la lógica para llenar la lista de personas invitadas
function addInvitee(name) {
    const list = document.getElementById('invited-list');
    const listItem = document.createElement('li');
    listItem.textContent = name; // Puedes modificar esto según la información que tengas
    list.appendChild(listItem);
}

// Ejemplo de uso: agrega un invitado (esto puede ser dinámico)
addInvitee('@aneudys'); // Reemplaza 'Usuario Ejemplo' por el nombre real del invitado

// Obtener el modal
const battleModal = document.getElementById("battle-modal");

// Obtener el botón que abre el modal (asegúrate de tener un botón con este ID)
const battleBtn = document.getElementById("battle-button");

// Obtener el elemento <span> que cierra el modal
const closeBattleSpan = document.getElementsByClassName("close-battle")[0];

// Cuando el usuario hace clic en el botón, se abre el modal
battleBtn.onclick = function() {
    battleModal.style.display = "block";
}

// Cuando el usuario hace clic en <span> (x), se cierra el modal
closeBattleSpan.onclick = function() {
    battleModal.style.display = "none";
}

// Cuando el usuario hace clic fuera del modal, también se cierra
window.onclick = function(event) {
    if (event.target === battleModal) {
        battleModal.style.display = "none";
    }
}
//bs9

// Inicializa el score en 0
let currentScore = 0;

// Función para acumular puntos en el score
function acumularPuntos(puntos) {
    currentScore += puntos; // Suma los puntos al score actual
    document.getElementById("score").textContent = `Puntos: ${currentScore}`; // Actualiza el score en pantalla

    // Verifica si el score llega a 500 o más para mostrar el botón de claim
    if (currentScore >= 500) {
        document.getElementById('claim-button').style.display = 'block'; // Muestra el botón de claim
    }
}

// Función para hacer claim y sumar los puntos al total-puntaje
function hacerClaim() {
    if (currentScore >= 500) {
        let totalPuntajeElement = document.getElementById("total-puntaje"); 
        let totalPuntaje = parseInt(totalPuntajeElement.textContent); // Obtiene el puntaje total actual

        totalPuntaje += currentScore; // Suma el score al total-puntaje
        totalPuntajeElement.textContent = totalPuntaje; // Actualiza el total-puntaje en pantalla

        // Resetea el score a 0 y oculta el botón de claim
        currentScore = 0; 
        document.getElementById("score").textContent = "Puntos: 0"; 
        document.getElementById('claim-button').style.display = 'none'; 
    }
}

// Añade un evento al clic en la imagen
document.getElementById('clickable-image').onclick = function() {
    acumularPuntos(50); // Cambia el valor de 50 si necesitas otro valor por clic
};


//obs13
// Función para abrir el modal de minería
document.getElementById("mining-button").onclick = function() {
    document.getElementById("mining-modal").style.display = "block";
};

// Función para cerrar el modal
function cerrarModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Función para activar la minería Free
function activarMineria(tipo) {
    if (tipo === 'free') {
        document.getElementById('free-start-button').style.display = 'none';
        document.getElementById('free-timer').style.display = 'block';
        iniciarTemporizador('free', 30); // 1 hora
    }
}

// Iniciar temporizador
function iniciarTemporizador(tipo, duracion) {
    let tiempoRestante = duracion; // tiempo en segundos
    let intervalo = setInterval(function() {
        tiempoRestante--;
        document.getElementById(tipo + '-time').textContent = tiempoRestante;
        
        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            document.getElementById('claim-' + tipo).style.display = 'block';
            document.getElementById(tipo + '-timer').style.display = 'block';
        }
    }, 1000);
}
function startMiningFree() {
  document.getElementById('free-button').style.display = 'none';
  document.getElementById('timer').style.display = 'block';
  timerInterval = setInterval(updateTimer, 1000);
}
// Función para verificar NFT (lógica a implementar)
function verificarNFT(tipo) {
    // Aquí puedes implementar la lógica para verificar si el NFT está en la billetera
    alert('muy pronto: ' + tipo);
    // Activar la minería en base a la verificación
    document.getElementById(tipo + '-timer').style.display = 'block';
    iniciarTemporizador(tipo, tipo === 'legendario' ? 2700 : tipo === 'epico' ? 1800 : 3600);
}

let timers = {
    free: {
        duration: 60, // 1 hora en segundos
        interval: null,
        remainingTime: 60
    }
};

function iniciarMinado(tipo) {
    if (timers[tipo].interval) {
        clearInterval(timers[tipo].interval); // Reiniciar el temporizador si ya está corriendo
    }

    document.getElementById(tipo + "-start-button").style.display = "none"; // Ocultar el botón 'Iniciar Minería Free'
    document.getElementById(tipo + "-timer").style.display = "block"; // Mostrar el temporizador

    let endTime = Date.now() + timers[tipo].remainingTime * 1000; // Guardar el tiempo de finalización

    timers[tipo].interval = setInterval(() => {
        let now = Date.now();
        let remaining = Math.max(0, Math.floor((endTime - now) / 1000));

        let minutes = Math.floor(remaining / 60);
        let seconds = remaining % 60;
        document.getElementById(tipo + "-time").textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (remaining <= 0) {
            clearInterval(timers[tipo].interval);
            document.getElementById(tipo + "-claim-button").style.display = "block"; // Mostrar el botón 'Claim'
        }
    }, 1000);
}

function reclamarPuntos(tipo) {
    alert("Has reclamado los puntos de " + tipo + " minería.");
    // Aquí puedes añadir la lógica para sumar los puntos al usuario

    // Reiniciar la minería
    document.getElementById(tipo + "-timer").style.display = "none"; // Ocultar el temporizador
    document.getElementById(tipo + "-claim-button").style.display = "none"; // Ocultar el botón 'Claim'
    document.getElementById(tipo + "-start-button").style.display = "block"; // Volver a mostrar el botón 'Iniciar'
    
    timers[tipo].remainingTime = 60; // Reiniciar el tiempo restante
}
//
function reclamarPuntos(tipo) {
    let puntos = 0;
    
    // Asignar puntos según el tipo de minería
    switch (tipo) {
        case 'free':
            puntos = 500; // Puntos para minería Free
            break;
        case 'common':
            puntos = 1500; // Puntos para NFT Común
            break;
        case 'rare':
            puntos = 3500; // Puntos para NFT RARE
            break;
        case 'legendary':
            puntos = 6000; // Puntos para NFT Legendario
            break;
        case 'epic':
            puntos = 10000; // Puntos para NFT Épico
            break;
    }

    // Obtener el balance total actual de la pantalla y convertirlo a número
    let balanceActual = parseInt(document.getElementById("total-puntaje").innerText) || 0;

    // Sumar los puntos actuales al balance total
    balanceActual += puntos;

    // Actualizar el balance total en la pantalla
    document.getElementById("total-puntaje").innerText = balanceActual;

    // Ocultar el botón de claim y volver a mostrar el temporizador
    document.getElementById(tipo + "-claim-button").style.display = "none";
    document.getElementById(tipo + "-timer").style.display = "block";

    // Reiniciar el temporizador
    iniciarMinado(tipo);
}


//2bloque de mineria hasta lanzr losNFT

// Variable para controlar si la colección NFT está disponible
const isCollectionLaunched = false; // Cambia a true cuando lances la colección

function verificarNFT(tipo) {
    const comingSoonMessage = document.getElementById(`${tipo}-coming-soon`);
    const timerDiv = document.getElementById(`${tipo}-timer`);
    const claimButton = document.getElementById(`${tipo}-claim-button`);

    // Si la colección no está lanzada
    if (!isCollectionLaunched) {
        // Mostrar el mensaje de "Muy pronto"
        comingSoonMessage.style.display = "block";
        // Asegurarse de que el temporizador y el botón de reclamo estén ocultos
        timerDiv.style.display = "none"; 
        claimButton.style.display = "none"; 
    } else {
        // Aquí puedes activar la minería y mostrar el temporizador
        comingSoonMessage.style.display = "none";
        timerDiv.style.display = "block"; 
        claimButton.style.display = "block"; 

        // Iniciar el temporizador aquí
        iniciarTemporizador(tipo); // Implementa esta función para manejar el temporizador
    }
}

function iniciarTemporizador(tipo) {
    let time = 60; // Temporizador de 1 minuto
    const timerDisplay = document.getElementById(`${tipo}-time`);
    const timerDiv = document.getElementById(`${tipo}-timer`);

    // Muestra el temporizador
    timerDiv.style.display = "block";

    const interval = setInterval(() => {
        if (time <= 0) {
            clearInterval(interval);
            // Mostrar botón de reclamación
            document.getElementById(`${tipo}-claim-button`).style.display = "block";
        } else {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            time--;
        }
    }, 1000);
}

      
    
// Función para abrir el modal Boost
document.getElementById("boost-button").addEventListener("click", function() {
    document.getElementById("boost-modal").style.display = "block";
});

// Función para cerrar el modal Boost
function cerrarModalBoost() {
    document.getElementById("boost-modal").style.display = "none";
}

//boost

let referencias = 25; // Número de referencias del usuario
let minasActivas = 1; // Cantidad de minas activas
const boostActivados = { 1: false, 2: false, 3: false, 4: false }; // Para rastrear qué Boosts ya están activados

function abrirModalBoost() {
    document.getElementById("boost-modal").style.display = "block";
}

function cerrarModalBoost() {
    document.getElementById("boost-modal").style.display = "none";
}

function activarBoost(tipo) {
    let puedeActivar = false;
    switch (tipo) {
        case 1:
            puedeActivar = referencias >= 5;
            break;
        case 2:
            puedeActivar = referencias >= 10;
            break;
        case 3:
            puedeActivar = referencias >= 25;
            break;
        case 4:
            puedeActivar = minasActivas > 2;
            break;
    }

    if (puedeActivar && !boostActivados[tipo]) { // Solo permite activar si cumple con el requisito y aún no está activado
        document.getElementById(`boost-${tipo}-button`).innerText = "Activado";
        document.getElementById(`boost-${tipo}-button`).disabled = true; // Deshabilitar el botón
        boostActivados[tipo] = true; // Marcar el Boost como activado
    } else if (!puedeActivar) {
        alert("Sigue mejorando para activar este Boost.");
    }
}
//funciones bosst
let energiaBase = 100; // Energía estándar al reclamar
let boostEnergiaActivo = false; // Estado inicial del Boost de energía

function reclamarEnergia() {
    let energiaReclamada = energiaBase;
    
    // Si el Boost de energía está activado, dar el doble de energía
    if (boostEnergiaActivo) {
        energiaReclamada *= 2; 
    }
    
    totalEnergia += energiaReclamada; // Sumar la energía al total
    actualizarEnergiaUI(totalEnergia); // Actualizar la interfaz
    console.log(`Has reclamado ${energiaReclamada} de energía.`);
}

// Simulación de activar el Boost de energía
function activarBoostEnergia() {
    if (referencias >= 5) { // Verifica si el usuario tiene 5 referencias
        boostEnergiaActivo = true;
        console.log("Boost de doble energía activado.");
        document.getElementById('boost-energia-button').innerText = "Activado";
    } else {
        alert("Sigue mejorando, necesitas 5 referencias para activar este Boost.");
    }
}
