# CardioIA Portal — PulseIA

Interface responsiva desenvolvida para a atividade **Ir Além 1 — Criando a interface do CardioIA**. O portal simula a rotina visual de uma equipe de cardiologia, com autenticação local, dashboard, pacientes e agendamentos.

> Projeto acadêmico com dados inteiramente simulados. Não realiza diagnóstico e não deve ser utilizado em atendimento médico.

## Funcionalidades

- autenticação simulada com `AuthContext` e JWT fictício no `localStorage`;
- proteção das rotas internas com redirecionamento para o login;
- dashboard com contagem de pacientes, consultas e perfis prioritários;
- listagem de pacientes consumida por um serviço que lê uma API JSON local;
- busca por nome ou condição e filtro por nível de risco;
- formulário de agendamento controlado com `useReducer`;
- agenda compartilhada por Context API e persistida no navegador;
- alteração do status das consultas entre pendente e confirmada;
- estados de carregamento, erro e lista vazia;
- layout adaptável a computadores, tablets e celulares;
- estilos organizados com CSS Modules.

## Tecnologias e Hooks

- React 18
- Vite
- React Router
- Context API
- `useState`, `useEffect`, `useContext`, `useMemo` e `useReducer`
- CSS Modules
- Lucide React

## Estrutura do projeto

```text
pulseia-cardioia-portal/
├── public/
│   └── data/patients.json
├── src/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   ├── services/
│   └── styles/
├── index.html
├── package.json
└── vite.config.js
```

## Como executar

É necessário ter o Node.js instalado. No terminal, dentro da pasta do projeto:

```bash
npm install
npm run dev
```

Abra o endereço indicado pelo Vite no navegador.

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Acesso de demonstração

- **E-mail:** `admin@cardioia.com`
- **Senha:** `cardio123`

A autenticação é propositalmente fictícia. O token salvo no navegador apenas simula o fluxo de login e não oferece segurança real.

## Dados simulados

Os pacientes estão em `public/data/patients.json`. Nomes, telefones, condições, níveis de risco e agendamentos são fictícios e foram criados somente para demonstrar o funcionamento da interface. Nenhuma informação de paciente real é utilizada.

## Integrantes — Grupo PulseIA

| Integrante | RM |
| --- | --- |
| Erik Criscuolo | RMXXXXXX |
| Marcus Vinícius Loureiro Garcia | RM567283 |
| Sidney William de Paula Dias | RMXXXXXX |

## Vídeo de demonstração

O vídeo de até 4 minutos será gravado posteriormente e publicado no YouTube como **não listado**.

**Link:** pendente.

## Continuidade do CardioIA

O visual e o conteúdo mantêm a continuidade das fases anteriores do CardioIA, desenvolvido pelo grupo PulseIA. Esta entrega é independente do classificador e do extrator da Fase 2: não existe integração real com back-end ou modelo de IA, conforme o escopo do enunciado do Ir Além 1.
