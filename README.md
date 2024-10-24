# Portfólio Dinâmico com Autenticação e Animações

Este é um projeto de portfólio dinâmico que permite adicionar, editar e excluir projetos via um painel de admin protegido por autenticação. O frontend é desenvolvido com **React**, **Next.js**, **Apollo Client** e **Tailwind CSS**, enquanto o backend utiliza **Node.js**, **Express**, **MongoDB**, **Apollo Server** e **GraphQL**.

## Funcionalidades

- Autenticação simples com **JWT**.
- Adicionar, editar e excluir projetos no painel de admin.
- Listagem dinâmica de projetos.
- Animações utilizando **Framer Motion**.
- Uso de **Apollo Client** para a comunicação com o backend via **GraphQL**.
- Backend com **Node.js**, **Express** e **MongoDB** para gerenciar os projetos.

## Tecnologias Utilizadas

### Frontend:
- **React**
- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Apollo Client**

### Backend:
- **Node.js**
- **Express**
- **MongoDB** e **Mongoose**
- **Apollo Server**
- **GraphQL**
- **JWT (JSON Web Tokens)** para autenticação

## Como Rodar o Projeto

### Pré-requisitos:

- **Node.js** e **npm** instalados.
- **MongoDB** rodando localmente ou em um serviço como **MongoDB Atlas**.

### Instalação:

1. Clone o repositório:
   ```bash
   git clone https://github.com/Rhulys/ProjetoPortifolio/
   
2. Navegue até a pasta do projeto
   cd portfolio-dinamico
   
## Backend:
1. Instale as dependências do backend:
   cd backend
   npm install
2. Inicie o MongoDB localmente (ou configure seu MongoDB Atlas no arquivo de conexão mongoose.connect).
3. Inicie o servidor backend:
   npm run start
   O servidor estará rodando em http://localhost:3001.

## Frontend:
1. Instale as dependências do frontend:
   cd frontend 
   npm install
2. Inicie o servidor de desenvolvimento do frontend:
   npm run dev
   O frontend estará disponível em http://localhost:3000.

### Variáveis de Ambiente
Configure uma chave secreta para JWT no backend. Crie um arquivo .env na pasta backend e adicione a chave:
   - SECRET_KEY=supersecretkey      
Certifique-se de configurar também a URL do banco de dados MongoDB.

### Funcionalidades do Painel de Admin
## Login: Acesse o painel de admin utilizando as credenciais configuradas.
  Username: admin <br/>
  Senha: password123

## Gerenciamento de Projetos:
  Adicionar novos projetos. <br/>
  Editar projetos existentes. <br/>
  Excluir projetos. <br/>

### Estrutura de Pastas
portfolio-dinamico/ <br/>
├── backend/        # Código do backend (Node.js, Express, Apollo Server) <br/>
│   ├── src/ <br/>
│   ├── package.json <br/>
│   └── server.js <br/>
├── frontend/     # Código do frontend (React, Next.js, Apollo Client) <br/>
│   ├── app/ <br/>
│   ├── components/ <br/>
│   ├── pages/ <br/>
│   ├── public/ <br/>
│   ├── styles/ <br/>
│   └── package.json <br/>
└── README.md        # Este arquivo

### Melhorias Futuras
  - Implementar um sistema de roles e permissões.
  - Adicionar paginação e filtros na listagem de projetos.
  - Melhorar o design da UI e UX.

### Licença
Este projeto está licenciado sob a [licença MIT](LICENSE). Sinta-se à vontade para utilizar e modificar o projeto.


