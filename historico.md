# Histórico

Anotações, decisões e pendências do projeto. Entradas mais recentes no topo.

---

## 2026-10-20: base do portfólio concluída

### Feito (PASSO-A-PASSO.md)
- **Passo 6** (feito manualmente): `src/data/projetos.ts`.
- **Passos 7–12**: `src/hooks/useTeclado.ts`, `src/components/{Avatar,Carrossel,Painel,Dashboard}.tsx` e `src/App.tsx` substituído. Removido `public/icons.svg` (`public/favicon.svg` continua).
- Verificado: `npm run build` e `npm run lint` sem erros; `npm run dev` sobe e entrega a página, o código e o `avatar.glb`. Único aviso do build: bundle > 500 kB (esperado por causa do Three.js).
- **Passo 14**: commits criados localmente. Falta o `git push`.

### Pendências
- [ ] Passo 13: testar no navegador (robô, `Enter` acenando, setas no carrossel, `Q`/`E` entre painéis) e ajustar o enquadramento do avatar se precisar.
- [ ] `git push`.

---

## 2026-10-19 (noite): início da implementação

### Feito (PASSO-A-PASSO.md)
- **Passos 0–2** (feitos manualmente): Node instalado; projeto Vite criado na raiz (template `react-ts`, linter **Oxlint**); `README.md` original preservado; dependências instaladas (`three`, `@react-three/fiber`, `@react-three/drei`, `motion`, `@types/three`).
- **Passo 3**: removidos `src/App.css` e `src/assets/`; criadas as pastas `src/components`, `src/data`, `src/hooks` e `public/models`.
- **Passo 4**: modelo de teste `RobotExpressive.glb` baixado em `public/models/avatar.glb`.
- **Passo 5**: `src/index.css` substituído pelo visual do portfólio (paleta, trilho, painel, carrossel).

---

## 2026-10-19

### Feito
- Repositório `matheus-russio-portfolio` criado.
- Descrição do GitHub definida:
  > 🎮 Portfólio de Matheus Russio no estilo da dashboard do Xbox 360. Navegação horizontal, projetos em carrossel e um avatar animado que te recebe no Menu inicial.
- Criados `CLAUDE.md` e `historico.md`.
- Criado `PASSO-A-PASSO.md` com o guia para montar a base (código testado: `npm run build` passou).

### Decisões
- Estética do Xbox 360 com navegação **horizontal** (pedido do Matheus).
- O avatar do Matheus será **animado**.
- Stack: Vite + React + TypeScript + Motion + React Three Fiber/drei. Avatar em 3D (`.glb`).
- Modelo de teste: robô `RobotExpressive.glb` do Three.js, até chegar o modelo do Matheus.

### Pendências
- [x] Seguir o PASSO-A-PASSO.md (passos 0–12 e 14 concluídos; teste no navegador pendente, ver 2026-10-20).
- [ ] Conseguir o avatar do Matheus em 3D (`.glb`, ou `.fbx`/`.blend` para converter).
- [ ] Receber os assets: avatar, logo, imagens dos projetos.
- [ ] Listar as seções/abas e os projetos (o print mostra "1 de 8").
