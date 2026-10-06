# Revisão do Ir Além 1 — CardioIA / PulseIA

Data: 06/10/2026.

## Checklist do enunciado

| Solicitação | Situação |
| --- | --- |
| Aplicação React + Vite, somente front-end | Concluído |
| Autenticação simulada por Context API e JWT fake no localStorage | Concluído |
| Proteção das rotas com AuthContext | Concluído, inclusive fichas individuais |
| Pacientes via base simulada | Concluído; 12 registros em JSON local |
| Agendamento com useState e useReducer | Concluído |
| Dashboard com pacientes e consultas | Concluído |
| Hooks useState, useEffect e useContext | Concluído |
| Componentização e pastas contexts, components, services, pages | Concluído em src/ |
| CSS Modules e layout responsivo | Concluído |
| Repositório público nome-do-grupo-cardioia-portal | Concluído: pulseia-cardioia-portal |
| README com instalação e execução | Concluído, com padrão FIAP |
| Nome completo e RM dos integrantes | Concluído |
| Vídeo de até 4 minutos no YouTube, não listado, com link no README | Pendente: gravação, publicação e inclusão do link |

## Complementos concluídos

- Busca por nome ou condição e filtro de risco.
- Fichas de pacientes com identificação, contatos fictícios, contexto de acompanhamento e consultas cadastradas.
- Área de médicos com três perfis fictícios, especialidades, contatos, tipos de consulta e horários demonstrativos.
- Nomes clicáveis na listagem de pacientes, no dashboard, na listagem de médicos e na agenda.
- Persistência da agenda no navegador e alteração de status pendente/confirmada.
- Publicação gratuita pelo GitHub Pages e atualização automática pela branch main.
- Estados de erro/carregamento, página de rota inexistente e indicadores de risco simulados.
- Ferramenta opcional WebMCP para agendamentos quando suportada pelo navegador.

## Correções desta revisão

- Corrigidos caminhos dos JSONs: respeitam o subdiretório do GitHub Pages.
- Base de produção condicionada ao GitHub Actions, preservando execução na raiz em outros ambientes.
- Removidos mês fixo e referências a consultas passadas como próximas.
- Datas iniciais demonstrativas relativas ao momento da primeira utilização.
- Validação de data real, horário, passado e conflitos de paciente ou médico no mesmo horário.
- Reducer da agenda sem gravações: persistência feita em useEffect.
- Recuperação segura de sessão/agenda com armazenamento inválido.
- JWT fictício com segmentos base64url e expiração em segundos; logout automático por expiração.
- Sincronização de sessão entre abas e ao retornar ao portal.
- Fichas reinicializadas ao mudar de registro e histórico listado por paciente.
- Melhoradas mensagens, nome clicável dos médicos, rótulo acessível da busca e quebra de linha da agenda.
- Testes automatizados para autenticação e regras da agenda, também executados na publicação.
- README atualizado e roteiro de demonstração adicionado.

## Limitações intencionais

Os dados e perfis são fictícios. Não há back-end, autenticação de produção,
diagnóstico, modelo de IA, prontuário real ou armazenamento compartilhado entre
dispositivos. Os horários dos médicos são informativos; não constituem regra de
disponibilidade do formulário. O histórico de consultas é demonstrativo e o
status confirma o agendamento, não a realização de um atendimento.

Dados salvos anteriormente são preservados quando válidos. Se uma agenda antiga
contém somente consultas passadas, o dashboard informa que não há consultas
futuras; é possível cadastrar uma nova.

O link principal de entrega é
https://marcus-vlgarcia.github.io/pulseia-cardioia-portal/.
A revisão de 06/10 foi destinada ao GitHub Pages. A publicação anterior em Sites
é uma versão histórica e não deve ser usada para apresentar esta revisão.
