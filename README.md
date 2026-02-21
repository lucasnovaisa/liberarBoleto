<h1 align="center"> Sistema de Liberação de Acesso — Teleaula </h1>

<p align="center">
Este projeto foi desenvolvido como uma solução para um problema operacional recorrente no ambiente de trabalho.
A plataforma de teleaula apresentava uma falha na identificação de pagamentos de boletos no banco de dados, impedindo a liberação automática do acesso do aluno após o pagamento.

Para resolver esse gargalo, foi criado um sistema independente — simples, rápido e funcional — que permitia validar o pagamento e liberar o acesso do aluno de forma segura.
</p>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>

<br>

## 🚀 Tecnologias

Este projeto foi desenvolvido utilizando:

- <strong>HTML</strong> — estrutura da interface
- <strong>CSS</strong> — estilização e layout responsivo
- <strong>JavaScript (JS)</strong> — lógica, manipulação da interface e comunicação com APIs

Essas tecnologias foram escolhidas para garantir um sistema leve, de fácil manutenção e compatível com qualquer navegador.

## 💻 Projeto

Esta seção descreve os aspectos técnicos do sistema, incluindo lógica interna, comunicação com APIs, validação de dados e comportamento da interface.

## 🔐 1. Fluxo de Autenticação via API

O sistema realiza autenticação utilizando uma requisição HTTP `POST`
para o endpoint de login da plataforma.

-   Endpoint utilizado:

        /agendamentoonline/api/v1/auth/login

-   O corpo da requisição contém `username` e `password` em JSON.

-   Se a autenticação for bem-sucedida, a API retorna um
    **access_token** (JWT).

-   Esse token é armazenado globalmente em:

    ``` js
    window.access_token
    ```

-   Todas as requisições subsequentes utilizam o token no header:

        Authorization: Bearer {token}

Esse processo permite que o usuário se autentique apenas uma vez por
sessão.

------------------------------------------------------------------------

## 🌐 2. Comunicação com Múltiplas APIs

O sistema pode liberar o acesso do aluno em duas plataformas diferentes.
A escolha depende da opção selecionada pelo operador.

### Plataformas e Endpoints

-   **Portal BA**

        /agendamentoonline/api/v1/candidatosituacaofinanceira/paid/{cpf}

-   **Virtual**

        /agendamento/api/v1/candidatosituacaofinanceira/paid/{cpf}

Ambos exigem:

    POST
    Content-Type: application/json
    Authorization: Bearer {token}

A URL é montada dinamicamente com o CPF armazenado no sistema.

------------------------------------------------------------------------

## 🧮 3. Validação Completa de CPF

A validação de CPF é feita seguindo o algoritmo oficial dos dígitos
verificadores:

1.  Remoção de caracteres não numéricos.
2.  Rejeição de CPFs com números repetidos (ex.: "11111111111").
3.  Cálculo manual dos dois dígitos verificadores usando regra de módulo
    11.
4.  Retorno booleano indicando validade.

Esta validação evita chamadas desnecessárias à API e previne erros de
digitação.

------------------------------------------------------------------------

## 🧠 4. Armazenamento Temporário de Dados Globais

Alguns dados são armazenados no objeto global `window`, sendo mantidos
apenas durante a sessão:

-   `window.access_token` → Token de autenticação\
-   `window.cpf` → CPF válido informado pelo operador

Isso simplifica o fluxo e dispensa a necessidade de backend ou banco de
dados local.

------------------------------------------------------------------------

## 📡 5. Uso de `fetch()` com `async/await`

As requisições HTTP utilizam a API `fetch()` combinada com `async/await`
para um fluxo assíncrono claro e moderno.

Características principais:

-   `try/catch` para tratamento de erros
-   Uso de `response.ok` para verificar o sucesso
-   Conversão da resposta para JSON com `response.json()`

Exemplo:

``` js
const response = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body)
});
```

------------------------------------------------------------------------

## 🧩 6. Organização Modular das Funções

O código é dividido em funções independentes, cada uma com
responsabilidade específica:

-   `autenticar()` → realiza login\
-   `exibirMensagem()` → atualiza mensagens da interface\
-   `validarCPF()` → valida o CPF informado\
-   `armazenarCPF()` → salva o CPF após validação\
-   `liberarPlataforma()` → envia requisição para liberar acesso

Essa separação facilita a manutenção e a evolução do projeto.

------------------------------------------------------------------------

## 🔁 7. Arquitetura 100% Client-Side

O sistema roda **exclusivamente no navegador**, sem backend
intermediário.

Benefícios:

-   Simplicidade arquitetural\
-   Zero dependências externas\
-   Fácil portabilidade\
-   Sem necessidade de instalação de servidores

Ele funciona abrindo o arquivo HTML diretamente no navegador.

------------------------------------------------------------------------

## 🛡️ 8. Tratamento de Erros e Feedback ao Usuário

O código inclui tratamento para cenários como:

-   Falha na autenticação\
-   Erro de rede\
-   CPF inválido\
-   Plataforma não selecionada\
-   Falha na liberação da plataforma

Mensagens claras são exibidas para orientar o operador, garantindo uma
boa experiência de uso.

## 🔖 Layout

Você pode visualizar o projeto através [DESSE LINK](<https://liberar-boleto.vercel.app>)

## :memo: Licença

Esse projeto está sob a licença MIT.
