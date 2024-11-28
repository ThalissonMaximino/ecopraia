const alertCount = {
  blue: 0,
  yellow: 0,
  red: 0,
};

function updateReport() {
  const reportElement = document.getElementById("report");
  reportElement.innerHTML = `
    <p>Relatório de Alertas:</p>
    <p>Azul: Baixo</p>
    <p>Amarelo: Médio</p>
    <p>Vermelho: Alto</p>
    <ul>
      <li>Baixo: ${alertCount.blue}</li>
      <li>Médio: ${alertCount.yellow}</li>
      <li>Alto: ${alertCount.red}</li>
    </ul>
  `;
}

function createDashboard(dashboardId, onComplete) {
  const progressBar = document.getElementById(`progress-bar-${dashboardId}`);
  const progressText = document.getElementById(`progress-text-${dashboardId}`);
  const alertButton = document.getElementById(`alert-button-${dashboardId}`);

  let progress = 0;
  let progressInterval;
  let isPaused = false; 
  let stopThreshold = dashboardId === 3 ? 100 : getRandomThreshold(); 

  function getRandomThreshold() {
    const thresholds = [30, 70, 100];
    return thresholds[Math.floor(Math.random() * thresholds.length)];
  }

  function updateProgress() {
    if (isPaused) return; 

    progress += 1;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;

    if (progress === stopThreshold) {
      stopProgress();
      triggerAlert();
    }
  }

  function stopProgress() {
    clearInterval(progressInterval);
  }

  function startProgress() {
    progress = 0;
    stopThreshold = dashboardId === 3 ? 100 : getRandomThreshold();
    progressBar.style.width = "0%";
    progressText.textContent = "0%";
    progressInterval = setInterval(updateProgress, 100);
  }

  function triggerAlert() {
    let alertColor;
    if (stopThreshold === 30) alertColor = "blue";
    if (stopThreshold === 70) alertColor = "yellow";
    if (stopThreshold === 100) alertColor = "red";

    if (dashboardId === 1 || dashboardId === 2) {
      alertCount[alertColor]++;
      updateReport();
    }

    alertButton.style.visibility = "visible";
    alertButton.style.animation = "blink 1s infinite";
    alertButton.style.backgroundColor = alertColor;

    setTimeout(() => {
      alertButton.style.animation = "none";
      alertButton.style.visibility = "hidden";
      if (onComplete) {
        onComplete(dashboardId);
      }
    }, 3000); 
  }

  return {
    start: startProgress,
    stop: stopProgress,
    pause: function () {
      isPaused = true; 
    },
    resume: function () {
      isPaused = false;
    },
  };
}

const dashboard1 = createDashboard(1, checkDependencies);
const dashboard2 = createDashboard(2, checkDependencies);
const dashboard3 = createDashboard(3, () => {
  addMessage("Limpeza Feita"); 
  dashboard1.start();
  dashboard2.start();
});

let dashboard1Complete = false;
let dashboard2Complete = false;

function checkDependencies(dashboardId) {
  if (dashboardId === 1) {
    dashboard1Complete = true;
  } else if (dashboardId === 2) {
    dashboard2Complete = true;
  }

  if (dashboard1Complete && dashboard2Complete) {
    dashboard1Complete = false;
    dashboard2Complete = false;

    dashboard3.start();
  }
}

const messageList = document.getElementById("message-list");
let messageCount = 0;

function addMessage(text) {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  const dateString = now.toLocaleDateString();

  const message = document.createElement("li");
  message.textContent = `${text} - ${dateString} ${timeString}`;

  messageList.prepend(message);
  messageCount++;

  if (messageCount > 5) {
    messageList.removeChild(messageList.lastChild);
    messageCount--;
  }
}

dashboard1.start();
dashboard2.start();

const pauseControl = document.getElementById("pause-control");

pauseControl.addEventListener("change", (event) => {
  const value = event.target.value;

  if (value === "pause") {
    dashboard1.pause();
    dashboard2.pause();
    dashboard3.pause();
  } else if (value === "continue") {
    dashboard1.resume();
    dashboard2.resume();
    dashboard3.resume();
  }
});
