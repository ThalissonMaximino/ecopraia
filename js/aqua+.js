const logsContainer = document.getElementById("logs");

        function log(message) {
            const timestamp = new Date().toLocaleTimeString();
            const logItem = document.createElement("li");
            logItem.textContent = `[${timestamp}] ${message}`;
            logsContainer.prepend(logItem);
        }

        function updateProgress(id, value) {
            const progressBar = document.getElementById(`nivel-agua-${id}`);
            const progressText = document.getElementById(`nivel-agua-text-${id}`);
            progressBar.style.width = `${value}%`;
            progressText.textContent = `${value}%`;
        }

        async function checkReservatorio1() {
            let nivelAgua1 = 0;

            const interval = setInterval(() => {
                nivelAgua1 += 1;
                updateProgress(1, nivelAgua1);

                if (nivelAgua1 >= 80) {
                    clearInterval(interval);
                    log("Reservatório 1 chegou a 80%. Emitindo alerta.");
                    const atuadoresButton = document.getElementById("atuadores-1");
                    atuadoresButton.classList.remove("hidden");
                    atuadoresButton.classList.add("glow");
                    document.getElementById("status-ph-1").textContent = "Níveis acima da média, limpeza necessária";
                    document.getElementById("status-turbidez-1").textContent = "Níveis acima da média, limpeza necessária";
                }
            }, 100);
        }

        async function checkReservatorio2() {
            let nivelAgua2 = 0;
            let nivelAgua1 = 80;

            const interval = setInterval(() => {
                nivelAgua2 += 1;
                nivelAgua1 -= 1;
                updateProgress(2, nivelAgua2);
                updateProgress(1, nivelAgua1);

                if (nivelAgua2 >= 80) {
                    clearInterval(interval);
                    log("Reservatório 2 chegou a 80%. Emitindo alerta.");
                    const atuadoresButton = document.getElementById("atuadores-2");
                    atuadoresButton.classList.remove("hidden");
                    atuadoresButton.classList.add("glow");
                    document.getElementById("status-ph-2").textContent = "Níveis acima da média, limpeza necessária";
                    document.getElementById("status-turbidez-2").textContent = "Níveis acima da média, limpeza necessária";
                }
            }, 100);
        }

        document.getElementById("atuadores-1").addEventListener("click", () => {
            log("Atuadores ativados no Reservatório 1. Iniciando limpeza...");
            const atuadoresButton = document.getElementById("atuadores-1");
            atuadoresButton.classList.remove("glow");
            const limpezaBar = document.getElementById("limpeza-bar-1");
            const limpezaText = document.getElementById("limpeza-text-1");
            let limpezaProgress = 0;

            document.getElementById("limpeza-indicador-1").classList.remove("hidden");
            const limpezaInterval = setInterval(() => {
                limpezaProgress += 5;
                limpezaBar.style.width = `${limpezaProgress}%`;
                limpezaText.textContent = `${limpezaProgress}%`;

                if (limpezaProgress >= 100) {
                    clearInterval(limpezaInterval);
                    log("Limpeza concluída no Reservatório 1.");
                    document.getElementById("limpeza-indicador-1").classList.add("hidden");
                    document.getElementById("status-ph-1").textContent = "Água limpa com sucesso";
                    document.getElementById("status-turbidez-1").textContent = "Água limpa com sucesso";
                    document.getElementById("liberar-agua-1").classList.remove("hidden");
                    document.getElementById("liberar-agua-1").classList.add("glow");
                }
            }, 100);
        });

        document.getElementById("liberar-agua-1").addEventListener("click", () => {
            log("Água liberada para o Reservatório 2.");
            document.getElementById("liberar-agua-1").classList.remove("glow");
            updateProgress(1, 0); 
            checkReservatorio2();
        });

        document.getElementById("atuadores-2").addEventListener("click", () => {
            log("Atuadores ativados no Reservatório 2. Iniciando limpeza...");
            const atuadoresButton = document.getElementById("atuadores-2");
            atuadoresButton.classList.remove("glow");
            const limpezaBar = document.getElementById("limpeza-bar-2");
            const limpezaText = document.getElementById("limpeza-text-2");
            let limpezaProgress = 0;

            document.getElementById("limpeza-indicador-2").classList.remove("hidden");
            const limpezaInterval = setInterval(() => {
                limpezaProgress += 5;
                limpezaBar.style.width = `${limpezaProgress}%`;
                limpezaText.textContent = `${limpezaProgress}%`;

                if (limpezaProgress >= 100) {
                    clearInterval(limpezaInterval);
                    log("Limpeza concluída no Reservatório 2.");
                    document.getElementById("limpeza-indicador-2").classList.add("hidden");
                    document.getElementById("status-ph-2").textContent = "Água limpa com sucesso";
                    document.getElementById("status-turbidez-2").textContent = "Água limpa com sucesso";
                    document.getElementById("liberar-agua-2").classList.remove("hidden");
                    document.getElementById("liberar-agua-2").classList.add("glow");
                }
            }, 100);
        });

        document.getElementById("liberar-agua-2").addEventListener("click", () => {
            log("Água liberada para os Centros de Distribuição.");
            document.getElementById("liberar-agua-2").classList.remove("glow");
            updateProgress(2, 0); 
        });

        checkReservatorio1();