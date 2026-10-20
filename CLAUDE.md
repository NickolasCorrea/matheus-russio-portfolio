# CLAUDE.md

Guia para o Claude Code trabalhar neste repositório.

## Projeto

Portfólio de **Matheus Russio** (Direção de Arte / Design de Produto) inspirado na dashboard do **Xbox 360**.

- **Navegação horizontal**, não vertical: o site anda para os lados, como as abas ("blades") da dashboard.
- **Avatar animado** do Matheus no "Menu inicial", no estilo avatar 3D do Xbox.
- **Carrossel de projetos**: cards em perspectiva, com o card em foco maior e os demais diminuindo para o fundo.

## Referência visual (prints enviados pelo Matheus)

- Paleta: gradiente vermelho (vermelho escuro → rosa claro), "chão" cinza/rosado, moldura creme ao redor da tela.
- Cabeçalho: categorias empilhadas ("Direção de Arte", "Design de Produto", "Meus projetos") com o item ativo em destaque ("● Menu inicial").
- Canto superior: perfil do usuário (foto + "Us3r 666 Ⓜ"), no estilo gamertag.
- Rodapé: dicas de botão do controle ("● Selecione", "● Voltar") e contador ("1 de 8").
- Painéis vizinhos aparecem parcialmente nas laterais, indicando que dá para navegar para os lados.
- Controles flutuantes em estilo pílula com vidro (voltar, seletor "LIFE / VISUAIS", chat, menu "...").
- Logo recorrente nos cards: máscara de demônio/oni em branco e vermelho.

## Stack

- **Vite + React + TypeScript**
- **Motion** (`motion/react`): animações de interface (carrossel, transições)
- **CSS 3D**: perspectiva dos cards e trilho horizontal dos painéis
- **React Three Fiber + drei** (Three.js): avatar 3D animado a partir de `public/models/avatar.glb`
- Deploy previsto: Vercel

A montagem da base está descrita em [PASSO-A-PASSO.md](PASSO-A-PASSO.md).

## Convenções

- Idioma do conteúdo do site: português (pt-BR).
- Registrar decisões, pendências e mudanças importantes em [historico.md](historico.md).
