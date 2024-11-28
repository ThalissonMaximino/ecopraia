// const alertCount = {
//     blue: 0,
//     yellow: 0,
//     red: 0,
//   };
  
//   // Atualiza o relatório na tela
//   function updateReport() {
//     const reportElement = document.getElementById("report");
//     reportElement.innerHTML = `
//       <p>Relatório de Alertas:</p>
//       <p>Azul: Baixo</p>
//       <p>Amarelo: Médio</p>
//       <p>Vermelho: Alto</p>
//       <ul>
//         <li>Baixo: ${alertCount.blue}</li>
//         <li>Médio: ${alertCount.yellow}</li>
//         <li>Alto: ${alertCount.red}</li>
//       </ul>
//     `;
//   }
  
//   function createDashboard(dashboardId, onComplete) {
//     const progressBar = document.getElementById(`progress-bar-${dashboardId}`);
//     const progressText = document.getElementById(`progress-text-${dashboardId}`);
//     const alertButton = document.getElementById(`alert-button-${dashboardId}`);
  
//     let progress = 0;
//     let progressInterval;
//     let isPaused = false;
//     let stopThreshold = dashboardId === 3 ? 100 : getRandomThreshold();
  
//     function getRandomThreshold() {
//       // 30%, 70% e 100%
//       const thresholds = [30, 70, 100];
//       return thresholds[Math.floor(Math.random() * thresholds.length)];
//     }
  
//     function updateProgress() {
//       if (isPaused) return; // Pause
  
//       progress += 1;
//       progressBar.style.width = `${progress}%`;
//       progressText.textContent = `${progress}%`;
  
//       if (progress === stopThreshold) {
//         stopProgress();
//         triggerAlert();
//       }
//     }
  
//     function stopProgress() {
//       clearInterval(progressInterval);
//     }
  
//     function startProgress() {
//       progress = 0;
//       stopThreshold = dashboardId === 3 ? 100 : getRandomThreshold(); // Define o próximo limite
//       progressBar.style.width = "0%";
//       progressText.textContent = "0%";
//       progressInterval = setInterval(updateProgress, 100);
//     }
  
//     function triggerAlert() {
//       // Define a cor do alerta com base no limite atingido
//       let alertColor;
//       if (stopThreshold === 30) alertColor = "blue";
//       if (stopThreshold === 70) alertColor = "yellow";
//       if (stopThreshold === 100) alertColor = "red";
  
//       // O 3 nao entra no parquinho 
//       if (dashboardId === 1 || dashboardId === 2) {
//         alertCount[alertColor]++;
//         updateReport();
//       }
  
//       alertButton.style.visibility = "visible";
//       alertButton.style.animation = "blink 1s infinite";
//       alertButton.style.backgroundColor = alertColor;
  
//       setTimeout(() => {
//         alertButton.style.animation = "none";
//         alertButton.style.visibility = "hidden";
//         if (onComplete) {
//           onComplete(dashboardId);
//         }
//       }, 3000); // Pisca pisca do alerta
//     }
  
//     return {
//       start: startProgress,
//       stop: stopProgress,
//       pause: function () {
//         isPaused = true; // Pausa o progresso
//       },
//       resume: function () {
//         isPaused = false; // Retoma o progresso
//       },
//     };
//   }
  
//   // Configuração dos graficos
//   const dashboard1 = createDashboard(1, checkDependencies);
//   const dashboard2 = createDashboard(2, checkDependencies);
//   const dashboard3 = createDashboard(3, () => {
//     addMessage("Limpeza Feita"); // Adiciona mensagem ao final do ciclo
//     dashboard1.start();
//     dashboard2.start();
//   });
  
//   let dashboard1Complete = false;
//   let dashboard2Complete = false;
  
//   function checkDependencies(dashboardId) {
//     if (dashboardId === 1) {
//       dashboard1Complete = true;
//     } else if (dashboardId === 2) {
//       dashboard2Complete = true;
//     }
  
//     if (dashboard1Complete && dashboard2Complete) {
//       dashboard1Complete = false;
//       dashboard2Complete = false;
  
//       dashboard3.start();
//     }
//   }
  
//   // Gerenciamento de mensagens
//   const messageList = document.getElementById("message-list");
//   let messageCount = 0;
  
//   function addMessage(text) {
//     const now = new Date();
//     const timeString = now.toLocaleTimeString();
//     const dateString = now.toLocaleDateString();
  
//     const message = document.createElement("li");
//     message.textContent = `${text} - ${dateString} ${timeString}`;
  
//     // Adiciona a nova mensagem no topo da lista
//     messageList.prepend(message);
//     messageCount++;
  
//     // Remove a mensagem mais antiga se houver mais de 5
//     if (messageCount > 5) {
//       messageList.removeChild(messageList.lastChild);
//       messageCount--;
//     }
//   }
  
//   // Inicia os dashboards 1 e 2 inicialmente
//   dashboard1.start();
//   dashboard2.start();
  
//   const pauseControl = document.getElementById("pause-control");
  
//   pauseControl.addEventListener("change", (event) => {
//     const value = event.target.value;
  
//     if (value === "pause") {
//       dashboard1.pause();
//       dashboard2.pause();
//       dashboard3.pause();
//     } else if (value === "continue") {
//       dashboard1.resume();
//       dashboard2.resume();
//       dashboard3.resume();
//     }
//   });
  