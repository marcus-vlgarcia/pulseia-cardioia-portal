# Roteiro de vídeo — CardioIA / PulseIA

Meta: aproximadamente 3 minutos e 50 segundos, com limite de 4 minutos.

## Preparação

1. Abra https://marcus-vlgarcia.github.io/pulseia-cardioia-portal/.
2. Use uma janela privada para começar uma demonstração limpa, sem modificar
   a agenda já salva na sua janela habitual.
3. Deixe o repositório aberto em outra aba para mostrar README e pastas.
4. Prepare uma consulta para amanhã: Ana Martins, Dra. Marina Alves, 10:30,
   Retorno, observação “Demonstração do Ir Além 1”.
5. Ensaie uma vez, feche a janela privada de ensaio e abra uma nova para gravar.
6. Ative Não Perturbe e confira o microfone.

## Demonstração e fala

| Tempo | O que mostrar/executar | Sugestão de fala |
| --- | --- | --- |
| 0:00–0:15 | Tela de login | “Este é o CardioIA, do grupo PulseIA, para o Ir Além 1 da FIAP. É um portal em React e Vite, exclusivamente front-end, com dados fictícios.” |
| 0:15–0:40 | Antes de entrar, acesse a URL terminada em #/pacientes. Ela volta ao login. Entre com admin@cardioia.com e cardio123. | “As rotas são protegidas pelo AuthContext. O login é simulado e armazena um JWT fictício no navegador.” |
| 0:40–1:00 | Visão geral: contagem de pacientes, consultas e riscos | “O dashboard utiliza os dados simulados e a agenda compartilhada pelo Context para apresentar os indicadores.” |
| 1:00–1:30 | Pacientes: busque Ana, abra a ficha, volte e demonstre filtro de risco | “Os pacientes são carregados de JSON local por um serviço. Temos busca, filtro e, como complemento, fichas individuais com dados fictícios e acompanhamento.” |
| 1:30–1:55 | Médicos: abra Dra. Marina Alves e mostre especialidade e horários | “Acrescentamos fichas de médicos com especialidade, contatos e horários demonstrativos.” |
| 1:55–2:45 | Agendamentos: cadastre a consulta preparada, veja a mensagem, confirme status e clique nos nomes | “O formulário usa useReducer para os campos e useState para as mensagens. A agenda usa Context API, valida datas e conflitos, e permite alterar o status. Os nomes abrem as fichas.” |
| 2:45–3:05 | Atualize a página, mostre a consulta mantida, volte ao dashboard | “A consulta permanece após atualizar porque a agenda é salva no localStorage. O contador do dashboard reflete o novo registro.” |
| 3:05–3:20 | Reduza a largura da janela e abra o menu móvel | “O layout adapta a navegação e o conteúdo para telas menores.” |
| 3:20–3:40 | Repositório: mostre README, integrantes/RMs e src com quatro pastas obrigatórias | “O código está organizado em contexts, components, services e pages. Utilizamos CSS Modules e os Hooks useState, useEffect, useContext, useReducer e useMemo.” |
| 3:40–3:50 | Volte ao portal e saia | “A entrega está publicada gratuitamente no GitHub Pages. Todos os dados são simulados. Ao sair, os dados protegidos deixam de ser exibidos.” |

Não precisa instalar dependências nem executar comandos durante o vídeo.
Priorize a demonstração funcional; mostre código apenas rapidamente.

## Gravação no Mac

Pressione Shift + Command + 5, escolha gravar uma parte da tela e selecione o
microfone em Opções. Faça uma gravação de 10 segundos antes para conferir som e
leitura. Pare a gravação pelo botão de parada da barra de menus.

Guia oficial: https://support.apple.com/en-gb/102618

## Publicação e conclusão da entrega

No YouTube Studio, envie o vídeo e selecione visibilidade “Não listado”.
Use o título “CardioIA — PulseIA | Ir Além 1 — FIAP”.
Confira a duração e reproduza o link em uma janela privada. Depois substitua
“Link do vídeo: pendente” no README pelo endereço real.

Guia oficial: https://support.google.com/youtube/answer/157177
