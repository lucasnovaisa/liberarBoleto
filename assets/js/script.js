// Função para fazer a requisição de autenticação
async function autenticar() {
    const url = "https://cfcvirtual.startbio.com.br/agendamentoonline/api/v1/auth/login";
    const body = {
        username: "83676805534",
        password: "83676805534"
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            const data = await response.json();
            const accessToken = data.access_token;

            // Salvar o accessToken em uma variável global para uso posterior
            window.access_token = accessToken;

            exibirMensagem("Autenticado com sucesso!");
        } else {
            exibirMensagem("Falha na autenticação.");
        }
    } catch (error) {
        exibirMensagem("Ocorreu um erro na autenticação.");
    }
}

// Função para exibir a mensagem na tela
function exibirMensagem(mensagem) {
    const messageDisplay = document.getElementById("messageDisplay");
    messageDisplay.textContent = mensagem;

    const messageBox = document.getElementById("messageBox");
    messageBox.style.display = "block";
}

// Associar o evento de clique ao botão de autenticação
const authButton = document.getElementById("authButton");
authButton.addEventListener("click", autenticar);


// Função para validar o CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) return false; // Verifica o comprimento e sequência repetida
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = soma % 11;
    if (resto === 1 || resto === 0) {
        if (parseInt(cpf.charAt(9)) !== 0) return false;
    } else {
        if (parseInt(cpf.charAt(9)) !== 11 - resto) return false;
    }
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    if (resto === 1 || resto === 0) {
        if (parseInt(cpf.charAt(10)) !== 0) return false;
    } else {
        if (parseInt(cpf.charAt(10)) !== 11 - resto) return false;
    }
    return true;
}

// Função para armazenar o CPF e exibir mensagem de sucesso
function armazenarCPF() {
    const cpfInput = document.getElementById("cpf");
    const cpf = cpfInput.value.trim();

    if (validarCPF(cpf)) {
        window.cpf = cpf;
        exibirMensagem("CPF válido. CPF armazenado com sucesso!");
    } else {
        exibirMensagem("CPF inválido.");
    }
}
document.getElementById('cpf').addEventListener('change', armazenarCPF);


// Função para liberar a plataforma selecionada
async function liberarPlataforma(event) {
    event.preventDefault(); // Impede o envio do formulário

    const cpf = window.cpf;
    const plataformaSelecionada = document.querySelector('input[name="plataforma"]:checked').value;
    let apiUrl = "";

    if (plataformaSelecionada === "portalba") {
        apiUrl = `https://cfcvirtual.startbio.com.br/agendamentoonline/api/v1/candidatosituacaofinanceira/paid/${cpf}`;
    } else if (plataformaSelecionada === "virtual") {
        apiUrl = `https://cfcvirtual.startbio.com.br/agendamento/api/v1/candidatosituacaofinanceira/paid/${cpf}`;
    } else {
        exibirMensagem("Selecione uma plataforma.");
        return;
    }

    const accessToken = window.access_token;

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            
        });

        if (response.ok) {
            const data = await response.json();
            exibirMensagem(data.message);
        } else {
            exibirMensagem("Falha ao liberar a plataforma.");
        }
    } catch (error) {
        exibirMensagem("Ocorreu um erro ao liberar a plataforma.");
    }
}

// Associar o evento de clique ao botão de liberação
const liberarButton = document.getElementById("liberar");
liberarButton.addEventListener("click", liberarPlataforma);

console.log(access_token);