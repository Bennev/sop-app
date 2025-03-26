# App de Gestão de Despesas - Teste Técnico

Este é o front-end da aplicação Gestão de Despesas, desenvolvido para um teste técnico. Trata-se de uma aplicação **Next.js** que se conecta à API REST desenvolvida em **Spring Boot** para gerenciar despesas (**Expenses**), empenhos (**Commitments**) e pagamentos (**Payments**).

## 📑 Sumário

- [📌 Visão Geral](#-visão-geral)
    - [O Desafio](#o-desafio)
    - [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [🚀 Como Executar o Projeto](#-como-executar-o-projeto)
- [🛠 Funcionalidades da Aplicação](#-funcionalidades-da-aplicação)
- [🔗 Link do Deploy](#-link-do-deploy)
- [👨‍💻 Autor](#-autor)

---

## 📌 Visão Geral

### O Desafio

O objetivo deste projeto foi desenvolver a interface de usuário para um sistema de gestão de despesas, empenhos e pagamentos. A aplicação front-end se comunica com uma API RESTful, utilizando autenticação JWT para acessar os dados e permitindo ao usuário:

✔️ Visualizar, criar e excluir despesas.  
✔️ Visualizar, criar e excluir empenhos relacionados a despesas.  
✔️ Visualizar, criar e excluir pagamentos relacionados a empenhos.

### Tecnologias Utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias:

- **Next.js**
- **React** 
- **Redux**
- **Material UI**
- **Axios**
- **Date-fns**
- **TypeScript**
- **Styled-components**
- **Notistack**

---

## 🚀 Como Executar o Projeto

### ✅ Pré-requisitos

Antes de iniciar, você precisará ter instalado:

- **Node.js** (recomendado: versão 16.x ou superior)

### 🚀 Rodando a aplicação

1. Clone o repositório:
    ```sh
    git clone https://github.com/Bennev/sop-app.git
    ```

2. Acesse o diretório do projeto:
    ```sh
    cd sop-app
    ```

3. Crie um arquivo `.env.local` na raiz do projeto e adicione a URL da API nele. Por exemplo:
    ```sh
    NEXT_PUBLIC_API_URL=http://localhost:8080
    ```

3. Instale as dependências do projeto com o npm:
    ```sh
    npm install
    ```

4. Inicie o servidor de desenvolvimento:
    ```sh
    npm run dev
    ```

5. A aplicação estará disponível em:
    ```sh
    http://localhost:3000
    ```

---

## 🛠 Funcionalidades da Aplicação

- **Autenticação de Usuário**: A aplicação permite o login e o registro de usuários via JWT.
- **Gestão de Despesas**: Visualize, crie e exclua despesas.
- **Gestão de Empenhos**: Crie, visualize e exclua empenhos relacionados às despesas.
- **Gestão de Pagamentos**: Crie, visualize e exclua pagamentos relacionados aos empenhos.

---

## 🔗 Link do Deploy

- **Live Site URL**: [@Render](https://sop-app-lli2.onrender.com)  

> ⚠️ **Aviso:** Recomenda-se rodar a aplicação em ambiente local, visto que os deploys realizados de forma gratuita nessas plataformas costumam possuir muitas limitações e também apresentam lentidão.

---

## 👨‍💻 Autor

- GitHub: [Bennev](https://github.com/Bennev)
- LinkedIn: [Matheus Benevides](http://linkedin.com/in/matheusbenevidesmilitao)

#### 🚀 Feito com 💙 para o teste técnico!