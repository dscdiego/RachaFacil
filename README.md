# ArenaHub⚽

## 📌 Sobre o projeto
O **ArenaHub** é uma aplicação web desenvolvida em **React** e **Material UI** para auxiliar proprietários de arenas esportivas na gestão de seus espaços.  
Com ele, é possível cadastrar arenas, controlar horários, acompanhar reservas e visualizar relatórios financeiros de forma simples e eficiente.

## 🚀 Funcionalidades
- Cadastro e edição de arenas
- Controle de horários disponíveis e ocupados
- Gestão de reservas
- Painel financeiro
- Perfil do proprietário

## 🛠️ Tecnologias utilizadas
- [React](https://reactjs.org/)
- [Material UI](https://mui.com/)
- [Node.js](https://nodejs.org/)
- [Vercel](https://vercel.com/) (deploy)

## 📂 Estrutura do projeto

ArenaHub/
 ├── .vercel/                # Configurações de deploy
 ├── node_modules/           # Dependências instaladas
 ├── public/                 # Arquivos públicos (favicon, index.html, etc.)
 └── src/
      ├── components/
      │    ├── ui/           # Navbar, layouts e componentes visuais
      │    └── ProprietarioLayout.jsx
      │
      ├── pages/
      │    └── proprietario/ # Páginas do painel do proprietário
      │         ├── Dashboard.jsx
      │         ├── MinhasArenas.jsx
      │         ├── Horarios.jsx
      │         ├── Financeiro.jsx
      │         ├── ReservaProprietario.jsx
      │         ├── PerfilProprietario.jsx
      │         ├── ArenaDetails.jsx
      │         ├── Login.jsx
      │         └── Payment.jsx
      │
      ├── App.js
      └── index.js

