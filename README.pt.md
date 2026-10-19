# Simulador do Campeonato do Mundo 2026 (não oficial)

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · **Português** · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Versão:** 7.6.0 · **Última atualização:** 2026-10-19

Idiomas da interface: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**

Simulador fictício do Campeonato do Mundo de 2026 (48 seleções, 104 jogos) num único ficheiro HTML, sem servidor e sem conta. **Não é afiliado à FIFA, não contém resultados reais e não é um prognóstico.**

**Aplicação online:** https://chiuta.github.io/Cupa-Mondiala-2026/

![Captura de ecrã](screenshot.pt.png)

## O que é

Um jogo/experiência de simulação: a aplicação gera aleatoriamente um torneio completo (grupos, terceiros classificados, 16-avos de final, oitavos, quartos, meias-finais, jogo do terceiro lugar e final), com resultados, marcadores com o minuto, cartões, suspensões e estatísticas de jogo. O formato (12 grupos de 4, os dois primeiros mais os 8 melhores terceiros, 32 seleções na fase a eliminar) e os grupos seguem o torneio real de 11 de junho a 19 de julho de 2026; **os resultados são inventados por um modelo simples** (forças subjetivas de 1 a 5 para cada seleção, golos segundo a distribuição de Poisson, semente). O torneio real terminou; nada na aplicação reflete o que realmente aconteceu em campo.

## Funcionalidades

Verificadas no código e no navegador (Chromium sem interface):
- Simulação completa com um clique (botão «Executar» ou tecla R), com a semente apresentada; «Replay» a partir do histórico refaz a mesma simulação (mesma semente e mesmas forças).
- «Forçar»: escolhe uma seleção que tem obrigatoriamente de ganhar o torneio simulado (recebe um bónus de força, e os seus resultados na fase a eliminar são arranjados). É um cenário do tipo «e se», sem valor estatístico.
- Resumo da simulação atual (campeã, finalista, terceiro lugar, melhor marcador) no banner de «Grupos» e «Finais», com o botão «📋 Copiar o resumo»: copia um texto simples que indica que a simulação é fictícia (o endereço da página só é acrescentado quando a página é servida por http/https).
- Grupos com classificações e critérios de desempate (pontos, confrontos diretos, diferença de golos, golos, fair play a partir dos cartões simulados, depois sorteio com a semente), classificação dos terceiros, quadro a eliminar com a numeração oficial dos jogos (M73–M104) e diagrama SVG.
- Atribuição dos terceiros nos 16-avos de final segundo a tabela de 495 combinações (Anexo C do regulamento), transcrita de fontes públicas (ver «Limites»).
- Marcadores com o minuto (incluindo prolongamento, grande penalidade, livre, autogolo), cartões amarelos/vermelhos, suspensões (2 amarelos = 1 jogo; vermelho = 1 jogo; os amarelos são limpos após os grupos e após os quartos), classificação de marcadores.
- Probabilidades apresentadas nos jogos a eliminar: calculadas a partir do mesmo modelo de Poisson usado pela simulação (não são prognósticos).
- Histórico (máximo de 50 simulações, no navegador) com filtragem, etiquetas, comparação de 2–4 simulações, estatísticas agregadas, estatísticas por seleção e frente a frente, estatísticas por estádio.
- Batch: 50 / 200 / 500 / 1000 simulações; mostra as frequências do modelo (não probabilidades reais do torneio).
- Editor de forças (1–5 para cada seleção) com predefinições e predefinições próprias guardadas localmente.
- Exportação / importação JSON do histórico; ligação de partilha `#s=…` (a simulação comprimida no endereço).
- Horas dos jogos em ET e em hora da Roménia (ET + 7 horas), modo compacto, conquistas, impressão, atalhos de teclado (podem ser desativados a partir do guia).

## Como se utiliza

1. Abra a página; no primeiro carregamento é gerada automaticamente uma simulação.
2. Prima «🎲 Executar» (ou R) para uma nova; opcionalmente escolha primeiro uma seleção em «Forçar».
3. Percorra as fases na barra de separadores: Grupos, 3.º lugar, 16-avos, Oitavos, Quartos, Meias-finais, Finais.
4. Em «Histórico» pode ver, refazer (Replay), etiquetar, partilhar (🔗 Share), comparar ou eliminar simulações.
5. Em «Batch» escolha o número de simulações e leia as frequências dos resultados.
6. «🎚️ Strengths» abre o editor de forças; as alterações afetam as simulações futuras.
7. «⬇️ Export» guarda o histórico num ficheiro JSON; «⬆️ Import» volta a carregá-lo.
8. A tecla «?» abre o guia com os atalhos; Esc fecha as janelas.

## Privacidade e rede

- Não há pedidos de rede: não encontrei no código nenhum `fetch`, XHR, WebSocket, script, tipo de letra, imagem ou iframe externo. A página contém uma política CSP (`connect-src 'none'`, `default-src 'none'`) que os bloqueia; o único URL no ficheiro é o espaço de nomes SVG, que não é acedido.
- Anfitriões externos contactados: **nenhum**. Não há telemetria, conta nem cookies.
- Armazenamento local (`localStorage`, chaves com o prefixo `wc2026_`): o histórico de simulações, as forças personalizadas e as predefinições, os separadores visitados, o modo compacto, a definição dos atalhos e algumas marcas de conquistas. Se o `localStorage` estiver bloqueado (por exemplo, em modo privado), a aplicação funciona e o histórico fica apenas na sessão. Se o espaço se esgotar, as simulações mais antigas são eliminadas e é avisado.
- Atenção: no GitHub Pages todas as páginas `chiuta.github.io/...` partilham o mesmo `localStorage` (mesma origem); as chaves desta aplicação têm prefixo, mas outras páginas do mesmo domínio poderiam lê-las ou modificá-las.
- As ligações `#s=…` e os ficheiros JSON importados são tratados como dados não fiáveis: tamanhos limitados (também após a descompressão), JSON validado rigorosamente, campos reconstruídos a partir de valores permitidos e apresentados como texto (proteção contra XSS, «bombas zip» e poluição de protótipos). Uma ligação recebida pede a sua confirmação antes da importação.
- Não pede permissões do navegador (câmara, localização, notificações, etc.). A partilha por ligação utiliza a área de transferência apenas por ação sua.
- A aplicação não é uma PWA instalável: não tem service worker; funciona offline apenas se guardar o ficheiro ou se o navegador o mantiver em cache.

## Limites e avisos

- **Simulação fictícia.** Os resultados, golos, cartões e estatísticas são aleatórios. Não são os resultados reais do torneio e não são prognósticos. Os valores em «Batch» refletem as forças subjetivas escolhidas, não probabilidades reais.
- **Jogadores reais.** Os nomes de jogadores são usados apenas como etiquetas; os golos, cartões e suspensões que lhes são atribuídos são inventados. Os plantéis na aplicação não são os oficiais e não foram verificados.
- **Modelo simplificado.** Desde a v7.4 a média de golos do modelo é ≈2,7 por jogo (medida em 300 simulações: 2,69, incluindo prolongamentos; nos Campeonatos do Mundo recentes ≈2,6–2,8); antes era ≈3,7. As simulações antigas continuam assinaladas na aplicação e o «Replay» reproduz-as exatamente com o seu modelo. Não há lesões, forma nem plantéis reais; as grandes penalidades, os livres, os autogolos e os prolongamentos têm percentagens fixas.
- **Calendário.** Os grupos correspondem ao sorteio real (verificados na página da Wikipédia do torneio). As datas, os estádios e as horas (ET) provêm de calendários públicos de terceiros (um só para os grupos, outro para os 16-avos, outro para os oitavos até à final); as horas dos oitavos em diante são as da versão inicial da aplicação e não foram confirmadas de forma independente. Podem existir erros.
- **Terceiros (Anexo C).** A tabela de 495 combinações foi transcrita da Wikipédia (incluindo um espelho desta) e validada automaticamente: integralidade, grupos elegíveis para cada jogo, concordância com o caso real documentado (linha 67). Não foi comparada linha a linha com o PDF oficial da FIFA.
- **Desempate.** Para o empate total sorteia-se com a semente da simulação; o ranking da FIFA não é utilizado.
- **Semente.** O gerador mulberry32 tem uma semente de 32 bits: reproduzível, mas não criptográfico. Um replay idêntico pressupõe o mesmo motor; as simulações criadas com versões anteriores (assinaladas na aplicação) usaram um quadro a eliminar aproximado e não se reproduzem exatamente.
- Não afiliado à FIFA; «FIFA», «World Cup» e os nomes das seleções, estádios e jogadores pertencem aos respetivos proprietários e são usados apenas de forma descritiva.

## Execução local / offline

Descarregue `index.html` e abra-o num navegador; não precisa de servidor nem de internet. As ligações de partilha usam o endereço do ficheiro aberto (em `file://` podem ser longas e inutilizáveis noutros navegadores).

## Licença

MIT — ver o ficheiro `LICENSE`.

## Autor

Alexio — Alexandru-Ionuț Chiuță, contacto: alexio@trom.tf

## Resumo

Um simulador fictício e não oficial do formato do Campeonato do Mundo FIFA 2026 (48 seleções, 104 jogos) num único ficheiro HTML offline. Todos os resultados, marcadores, cartões e estatísticas são saída aleatória de um modelo de Poisson simples com forças subjetivas das seleções; não são resultados reais nem prognósticos, e os nomes dos jogadores são meras etiquetas. Estão implementados os desempates dos grupos, o quadro oficial a eliminar e a atribuição dos terceiros (tabela do Anexo C, transcrita de fontes públicas); as importações e as ligações partilhadas são validadas rigorosamente. Sem pedidos de rede, sem telemetria; os dados ficam no localStorage. Não afiliado à FIFA.

## Histórico / Changelog

### 7.5.0 — 2026-10-14
- Cópia de segurança e etiquetagem de dados (fff-kit).

### 12 de outubro de 2026 (v7.4.1)
- 7.4.1 — 2026-10-12: a versão e a data da última atualização são apresentadas na aplicação

### 11 de outubro de 2026 (v7.4)
- O modelo de golos foi recalibrado: as intensidades de Poisson são escaladas por 0,72, de ≈3,7 para ≈2,7 golos/jogo (as probabilidades apresentadas usam a mesma escala).
- Cada simulação tem agora o campo `gm` (modelo de golos); as criadas antes (`gm` em falta) são apresentadas com uma nota e o «Replay» reproduz-as de forma idêntica com o modelo antigo (verificado: mesma semente, mesmos resultados que na v7.3). A exportação/importação conserva o `gm`.

### 11 de outubro de 2026 (v7.3)
- Resumo copiável da simulação (campeã, finalista, terceiro lugar, melhor marcador) nos banners «Grupos» e «Finais».
- CSP: `script-src` com hash SHA-256, sem `'unsafe-inline'`.

### 11 de outubro de 2026 (v7.2)
- A barra de aviso e o painel de comandos são agora regiões de referência (`section` com nome): axe 0 violações, incluindo `region`.
- A lista «Forçar» está agrupada por grupos (A–L) em vez de um bloco plano de 48 entradas; sem o prefixo «⚡» repetido.
- Em ecrãs ≤520 px o cabeçalho e o aviso são mais compactos, e o painel de comandos é uma única linha deslizável na horizontal (ocupa muito menos do ecrã).
- O diagrama do quadro a eliminar é focável pelo teclado; versão v7.2.
