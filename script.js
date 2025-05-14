// Som de inicialização hacker
const audioStartup = new Audio("https://assets.mixkit.co/active_storage/sfx/222/222-preview.mp3");

// Som de digitação
const audioDigitar = new Audio("https://www.soundjay.com/button/beep-07.wav");
audioDigitar.volume = 0.3;

// Toca som de inicialização ao carregar a página
window.onload = function () {
    audioStartup.play();
};

// Função para verificar se o ano é bissexto
function ehAnoBissexto(ano) {
    return (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0);
}

// Função para validar o dia do mês
function validarDiaMes(dia, mes, ano) {
    const mesesCom31Dias = [1, 3, 5, 7, 8, 10, 12];
    const mesesCom30Dias = [4, 6, 9, 11];

    if (mesesCom31Dias.includes(mes) && dia > 31) return false;
    if (mesesCom30Dias.includes(mes) && dia > 30) return false;
    if (mes === 2) {
        return ehAnoBissexto(ano) ? dia <= 29 : dia <= 28;
    }
    return true;
}

// Geração do nome hacker com efeito de digitação
function gerarNomeDev() {
    let nome = document.getElementById("nomeInput").value.trim();
    let dia = parseInt(document.getElementById("diaInput").value);
    let mes = parseInt(document.getElementById("mesInput").value);
    let ano = parseInt(document.getElementById("anoInput").value);
    let resultadoDiv = document.getElementById("resultado");

    // Validações
    if (!nome) {
        resultadoDiv.innerHTML = "<span class='text-red-500 glitch'>⚠️ ALERTA: Nenhuma identidade registrada no sistema! Digite seu nome, hacker 👾</span>";
        return;
    }
    if (!ano || ano < 1925 || ano > 2025) {
        resultadoDiv.innerHTML = "<span class='text-red-500 glitch'>⚠️ ERRO: Ano inválido! Apenas entre 1925 e 2025! 🛠️</span>";
        return;
    }
    if (!mes || mes < 1 || mes > 12) {
        resultadoDiv.innerHTML = "<span class='text-red-500 glitch'>⚠️ ATENÇÃO: Mês inválido! 🌐</span>";
        return;
    }
    if (!dia || dia < 1 || !validarDiaMes(dia, mes, ano)) {
        resultadoDiv.innerHTML = "<span class='text-red-500 glitch'>⚠️ ERRO: Dia inválido para o mês e ano escolhidos! 🛠️</span>";
        return;
    }

    let nomeDev = "";
    let ultimoDigito = dia % 10;

    if (ultimoDigito === 1 || ultimoDigito === 2) {
        nomeDev = "Desenvolvedor(a)";
    } else if (ultimoDigito === 3 || ultimoDigito === 4 || ultimoDigito === 5) {
        nomeDev = "Programador(a)";
    } else if (ultimoDigito === 6 || ultimoDigito === 7 || ultimoDigito === 8) {
        nomeDev = "Estagiário(a)";
    } else if (ultimoDigito === 9 || ultimoDigito === 0) {
        nomeDev = "Senior";
    }

    let complemento = "";
    switch (mes) {
        case 1: complemento = "Bugado(a) 🛠️"; break;
        case 2: complemento = "do CTRL, CTRL V ⚡"; break;
        case 3: complemento = "das Gambiarras 🔥"; break;
        case 4: complemento = "que culpa o Cache 🔄"; break;
        case 5: complemento = "que esquece o que faz 🤯"; break;
        case 6: complemento = "do Git Vazio 📂"; break;
        case 7: complemento = "das Try/Catch vazia 😵"; break;
        case 8: complemento = "Famosinho do LinkedIn 👨‍💻"; break;
        case 9: complemento = "Caçador de Bugs 🐛"; break;
        case 10: complemento = "do Windows Pirata 💀"; break;
        case 11: complemento = "do Update sem WHERE 🔥"; break;
        case 12: complemento = "do Commit Bugado 🚀"; break;
    }

    resultadoDiv.innerHTML = "";
    let textoFinal = `🔓 Acesso concedido... <br><br>
                      <span class="text-yellow-300">${nome}</span>, seu nome dev hacker é: <br>
                      <span class="text-red-400">${nomeDev}</span> <span class="text-blue-300">${complemento}</span>! 🔥🎮`;

    resultadoDiv.classList.add("fade-in");

    // Efeito de digitação
    let i = 0;
    function digitarTexto() {
        if (i < textoFinal.length) {
            resultadoDiv.innerHTML = textoFinal.substring(0, i);
            
            if (i % 3 === 0) {
                audioDigitar.currentTime = 0;
                audioDigitar.play();
            }

            i++;
            setTimeout(digitarTexto, 50);
        }
    }

    digitarTexto();
}

// Resetar sistema
function limparCampos() {
    document.getElementById("nomeInput").value = "";
    document.getElementById("diaInput").value = "";
    document.getElementById("mesInput").value = "";
    document.getElementById("anoInput").value = "";
    document.getElementById("resultado").innerHTML = "";
}

// Adicionando animação de fade-in e efeito glitch
const style = document.createElement("style");
style.innerHTML = `
    .fade-in {
        opacity: 0;
        animation: fadeIn 1s forwards;
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    .glitch {
        animation: glitch 0.5s infinite;
    }

    @keyframes glitch {
        0% { text-shadow: 2px 2px red; }
        25% { text-shadow: -2px -2px blue; }
        50% { text-shadow: 2px -2px green; }
        75% { text-shadow: -2px 2px yellow; }
        100% { text-shadow: 2px 2px red; }
    }
`;
document.head.appendChild(style);

// Efeito Matrix - Números 0 e 1 caindo
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.id = "matrixCanvas";
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "-1";

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff00";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops.fill(1);
});
