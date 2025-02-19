📊 Front-End - API de Investimentos
Interface gráfica para gerenciar investimentos, desenvolvida com React, Next.js e Tailwind CSS.
Este projeto consome a API do back-end e exibe gráficos e tabelas com os investimentos cadastrados.

🚀 Tecnologias Utilizadas
React 18 (com Next.js)
Next.js 14
TypeScript
Tailwind CSS
Axios (para comunicação com a API)
Recharts (para gráficos)
⚙️ Pré-requisitos
Antes de rodar a aplicação, certifique-se de ter instalado:

Node.js (versão 18 ou superior)
Yarn (opcional, mas recomendado)
⚠️ Importante: O servidor da API precisa estar rodando antes de iniciar o front-end.

🛠️ Como Rodar o Projeto
🔹 1. Clone o Repositório:
sh
Copiar
Editar
git clone https://github.com/GabrielDBri/investimentos-frontend.git
cd investimentos-frontend
🔹 2. Instale as Dependências:
Se estiver usando Yarn:

sh
Copiar
Editar
yarn install
Se estiver usando npm:

sh
Copiar
Editar
npm install
🔹 3. Configure as Variáveis de Ambiente:
Crie um arquivo .env.local na raiz do projeto e adicione:

ini
Copiar
Editar
NEXT_PUBLIC_API_URL=http://localhost:8080
Altere a URL caso o backend esteja rodando em outro endereço.

🔹 4. Rode o Projeto em Ambiente de Desenvolvimento:
Se estiver usando Yarn:

sh
Copiar
Editar
yarn dev
Se estiver usando npm:

sh
Copiar
Editar
npm run dev
Acesse a aplicação no navega
