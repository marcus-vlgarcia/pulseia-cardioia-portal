# FIAP - Faculdade de Informática e Administração Paulista

<p align="center">
  <a href="https://www.fiap.com.br/"><img src="https://raw.githubusercontent.com/marcus-vlgarcia/cardioia-fase1/main/assets/logo-fiap.png" alt="FIAP - Faculdade de Informática e Administração Paulista" border="0" width="40%" height="40%"></a>
</p>

# CardioIA — PulseIA

## Ir Além 1 — Criando a interface do CardioIA

Este repositório contém a interface responsiva do **CardioIA**, desenvolvida em
React com Vite para simular a rotina visual de um portal de cardiologia. A
aplicação reúne autenticação fictícia, visualização de pacientes, agendamento de
consultas e um dashboard com indicadores simples.

O projeto utiliza somente dados simulados e não possui integração com back-end,
prontuários, pacientes reais ou modelos clínicos. Seu uso é exclusivamente
acadêmico e não realiza diagnóstico médico.

| Entregável | Implementação |
| --- | --- |
| Autenticação simulada | Context API e JWT fictício armazenado no `localStorage` |
| Proteção de rotas | `AuthContext`, `ProtectedRoute` e React Router |
| Listagem e fichas de pacientes | Serviço que consome a base JSON local simulada |
| Corpo clínico | Lista de médicos fictícios, fichas e horários demonstrativos |
| Formulário de consultas | Estado controlado com `useReducer` e `useState` |
| Dashboard | Contagem de pacientes, consultas e perfis prioritários com indicadores clicáveis |
| Estilização | CSS Modules, design responsivo e componentes reutilizáveis |
| Instruções de execução | Documentadas neste README |
| Vídeo de demonstração | Publicação não listada no YouTube pendente |

## Grupo - PulseIA

## 👨‍🎓 Integrantes

- Erik Criscuolo — `RM566484`
- [Marcus Vinícius Loureiro Garcia](https://www.linkedin.com/in/marcusvlgarcia/) — `RM567283`
- [Sidney William de Paula Dias](https://www.linkedin.com/in/sidneywilliamdepaula/) — `RM568142`

## 👩‍🏫 Professores

### Tutor

- [Leonardo Ruiz Orabona](https://www.linkedin.com/in/leonardoorabona/)

### Coordenador

- [André Godoi Chiovato](https://www.linkedin.com/in/andregodoichiovato/)

## 📜 Descrição

O CardioIA é um projeto acadêmico do curso de Inteligência Artificial da FIAP.
Nesta atividade complementar, o grupo assume o desenvolvimento da camada de
Front-End do portal, aplicando conceitos de componentização, navegação,
autenticação simulada e manipulação de estado com Hooks avançados.

A interface possui quatro áreas protegidas:

- **Visão geral:** apresenta métricas da base simulada e as próximas consultas;
- **Pacientes:** exibe registros fictícios com busca e filtro por nível de risco;
- **Médicos:** apresenta profissionais fictícios, especialidades, contatos e horários demonstrativos;
- **Agendamentos:** permite cadastrar consultas, alterar o status e manter os
  dados no navegador.

## ✅ Funcionalidades

- login simulado com token JWT fictício no `localStorage`;
- redirecionamento de visitantes não autenticados para a tela de acesso;
- dashboard com indicadores atualizados a partir do estado da aplicação e atalhos para pacientes, agenda e perfis prioritários;
- carregamento assíncrono dos pacientes com `useEffect`;
- busca por nome ou condição acompanhada;
- filtro de pacientes por risco baixo, moderado ou alto;
- fichas individuais de pacientes com dados cadastrais e histórico simulado;
- fichas profissionais com horários, especialidades e tipos de atendimento simulados;
- agenda por profissional, com próximas consultas e pacientes vinculados no navegador;
- formulário de agendamento controlado com `useReducer`;
- agenda compartilhada por Context API;
- persistência local dos agendamentos;
- alteração do status entre pendente e confirmada;
- tratamento de carregamento, erro e lista vazia;
- navegação e layout adaptados a computadores, tablets e celulares;
- componentes e estilos separados por responsabilidade.

## 🧰 Tecnologias e Hooks

| Tecnologia | Aplicação no projeto |
| --- | --- |
| React 18 | Componentização e renderização da interface |
| Vite | Ambiente de desenvolvimento e build de produção |
| React Router | Navegação e proteção das rotas |
| Context API | Sessão do usuário e agenda compartilhada |
| `useState` | Campos, filtros, busca e estados visuais |
| `useEffect` | Consumo assíncrono da base simulada |
| `useContext` | Acesso aos contextos de autenticação e agenda |
| `useReducer` | Controle do formulário e dos agendamentos |
| `useMemo` | Cálculos e filtragens derivados do estado |
| CSS Modules | Isolamento dos estilos por componente |
| Lucide React | Ícones da interface |

## 📁 Estrutura de pastas

As pastas foram organizadas conforme o padrão solicitado no enunciado. Os
contextos concentram estados compartilhados, os componentes reúnem elementos
reutilizáveis, as páginas representam as rotas e os serviços isolam o acesso à
autenticação e aos dados simulados.

```text
pulseia-cardioia-portal/
├── public/
│   ├── data/
│   │   ├── patients.json        # Base local de pacientes fictícios
│   │   └── doctors.json         # Base local de médicos fictícios
│   └── favicon.svg
├── src/
│   ├── components/              # Layout, cards, formulário e componentes comuns
│   ├── contexts/                # AuthContext e AppointmentContext
│   ├── pages/                   # Login, dashboard, fichas, pacientes, médicos e agenda
│   ├── services/                # Autenticação fake e consumo do JSON
│   ├── styles/                  # Estilos globais
│   ├── App.jsx                  # Definição das rotas
│   └── main.jsx                 # Inicialização da aplicação
├── index.html
├── package.json
├── pnpm-lock.yaml
└── vite.config.js
```

## 🔐 Autenticação simulada

O login aceita um e-mail válido e uma senha com pelo menos quatro caracteres. O
serviço cria um token fictício com prazo de validade e o armazena no navegador.
Esse mecanismo apenas demonstra o fluxo de autenticação exigido pela atividade:
ele não substitui uma API, um servidor de identidade ou medidas reais de
segurança.

### Acesso de demonstração

- **E-mail:** `admin@cardioia.com`
- **Senha:** `cardio123`

## 🔧 Como executar o projeto

É necessário ter o [Node.js](https://nodejs.org/) 20 ou superior e pnpm 10 instalado. Clone o repositório,
acesse sua pasta e instale as dependências:

```bash
git clone https://github.com/marcus-vlgarcia/pulseia-cardioia-portal.git
cd pulseia-cardioia-portal
pnpm install --frozen-lockfile
```

Inicie o ambiente de desenvolvimento:

```bash
pnpm dev
```

Abra no navegador o endereço indicado pelo Vite. Para gerar e conferir a versão
de produção:

```bash
pnpm test
pnpm build
pnpm preview
```

## 🌐 Links da entrega

- [Repositório público no GitHub](https://github.com/marcus-vlgarcia/pulseia-cardioia-portal)
- [Demonstração no GitHub Pages](https://marcus-vlgarcia.github.io/pulseia-cardioia-portal/)

O GitHub Pages é o endereço principal da entrega e publica automaticamente a
branch `main`. A navegação usa URLs com `#` para permitir atualização da página
e acesso direto às fichas. Os serviços usam a base do Vite para carregar os JSONs
corretamente em subdiretórios. A configuração de produção usa a base do
repositório no GitHub Actions e a raiz nos demais ambientes.

## 🎥 Vídeo de demonstração

**Vídeo de demonstração:** [assistir no YouTube](https://youtu.be/fJxvZkfVXq4)

Veja o [relatório de revisão](docs/REVISAO.md).

## 🔒 Dados, privacidade e limitações

Os nomes, contatos, condições, níveis de risco e consultas exibidos no portal são
fictícios. A base `public/data/patients.json` foi criada somente para demonstrar
o funcionamento da interface, sem dados pessoais, prontuários ou informações de
pacientes reais.

Os níveis de risco não resultam de avaliação clínica ou inferência de IA. Eles
funcionam apenas como exemplos visuais. A agenda é gravada exclusivamente no
`localStorage` do navegador utilizado e não é enviada a um servidor.

Esta atividade não integra o classificador textual nem o extrator de sintomas da
Fase 2. Essa separação segue o escopo do Ir Além 1, que solicita somente uma
interface com dados e autenticação simulados.

## 🗃 Histórico de lançamentos

- `1.0.0` — 16/09/2026: criação da interface responsiva, autenticação simulada,
  rotas protegidas, pacientes, agendamentos, dashboard e documentação da entrega.
- `1.1.0` — 06/10/2026: revisão do GitHub Pages, sessão, persistência,
  datas, conflitos de agenda, fichas e documentação de demonstração.
- `1.2.0` — 07/10/2026: agenda nas fichas de médicos e indicadores clicáveis
  no dashboard.

## 📋 Licença

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt="Creative Commons"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt="Attribution">

[MODELO GIT FIAP](https://github.com/agodoi/template) por [FIAP](https://fiap.com.br/)
está licenciado sob a licença
[Attribution 4.0 International](http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1).
