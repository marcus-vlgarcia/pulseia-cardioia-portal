# Checklist da entrega — CardioIA / PulseIA

## Requisitos do Ir Além 1

| Requisito | Implementação |
| --- | --- |
| Portal em React + Vite, somente front-end | Aplicação responsiva publicada no GitHub Pages |
| Autenticação simulada | Context API e token JWT fictício no `localStorage` |
| Proteção de rotas | Acesso às páginas internas condicionado ao login |
| Pacientes com dados simulados | Base JSON local carregada por serviço |
| Formulário de agendamento | `useState` e `useReducer` para interação e estado |
| Dashboard | Contagem de pacientes, consultas e perfis prioritários |
| Hooks e Context API | `useState`, `useEffect`, `useContext`, `useReducer` e `useMemo` |
| Componentização | Pastas `src/contexts`, `src/components`, `src/services` e `src/pages` |
| Estilização | CSS Modules e layout adaptado a telas menores |
| Repositório público | [pulseia-cardioia-portal](https://github.com/marcus-vlgarcia/pulseia-cardioia-portal) |
| README | Instruções de instalação, execução e acesso |
| Integrantes | Nomes completos e RMs informados no README |
| Vídeo de até 4 minutos | [Demonstração no YouTube](https://youtu.be/fJxvZkfVXq4), com link no README |

## Recursos adicionais

- Busca e filtro de pacientes por condição e risco.
- Fichas individuais de pacientes e médicos, com dados fictícios.
- Agenda de cada médico com consultas futuras e pacientes vinculados.
- Indicadores do dashboard clicáveis, incluindo atalho para pacientes de risco alto.
- Nomes clicáveis entre agenda, dashboard e fichas.
- Persistência local das consultas, confirmação de status e validação de conflitos de horário.
- Estados de carregamento, erro e lista vazia.

Todos os nomes, contatos e dados clínicos são fictícios. A aplicação não realiza
diagnóstico nem se conecta a um back-end. A agenda é salva apenas no navegador
usado para a demonstração.
