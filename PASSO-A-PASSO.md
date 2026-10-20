# Passo a passo: base do portfólio estilo Xbox 360

Guia para montar a primeira versão testável do portfólio: painéis horizontais (as "blades" do Xbox), carrossel 3D de projetos e um avatar 3D animado.

Stack: **Vite + React + TypeScript + Motion + React Three Fiber + drei**.

Marque cada etapa conforme for concluindo. Todos os comandos são para rodar no terminal **Git Bash** do VS Code, **na raiz do projeto** (`matheus-russio-portfolio`). A ideia é criar pastas e arquivos pelo terminal, com comandos de Linux, para ir treinando.

---

## Comandos de Linux usados neste guia

| Comando | O que faz | Exemplo |
| --- | --- | --- |
| `pwd` | Mostra em que pasta você está (**p**rint **w**orking **d**irectory) | `pwd` |
| `ls` | Lista o conteúdo de uma pasta | `ls src` |
| `ls -a` | Lista incluindo arquivos ocultos (que começam com `.`) | `ls -a` |
| `ls -R` | Lista a pasta e todas as subpastas (**R**ecursivo) | `ls -R src` |
| `cd` | Entra numa pasta (`cd ..` volta uma) | `cd src` |
| `mkdir -p` | Cria pastas (o `-p` cria as intermediárias e não reclama se já existir) | `mkdir -p public/models` |
| `touch` | Cria um arquivo vazio | `touch src/App.tsx` |
| `rm` | Apaga um arquivo (**sem lixeira**) | `rm src/App.css` |
| `rm -r` | Apaga uma pasta e tudo dentro dela | `rm -r src/assets` |
| `cat` | Mostra o conteúdo de um arquivo | `cat package.json` |
| `head -n 5` | Mostra só as primeiras 5 linhas | `head -n 5 src/index.css` |
| `curl -L -o` | Baixa um arquivo da internet | ver passo 4 |
| `code` | Abre um arquivo no VS Code | `code src/App.tsx` |

**Dicas:**
- `Tab` completa nomes de pastas e arquivos. Digite `src/comp` + `Tab` e ele completa `src/components/`.
- `↑` repete os comandos anteriores.
- `clear` (ou `Ctrl + L`) limpa a tela.
- `Ctrl + C` interrompe um comando, por exemplo para parar o `npm run dev`.
- Cuidado com `rm`: no terminal não existe lixeira. Antes de apagar, use `ls` para conferir o que vai sair.

---

## ☑ 0. Pré-requisitos

- **Node.js 20 ou superior**. Para conferir: `node -v`. Se não tiver, baixe a versão LTS em https://nodejs.org
- **Git**, já configurado (o repositório já existe).
- Recomendado no VS Code: extensões **ES7+ React snippets** e **Prettier**.
- **Git Bash como terminal padrão do VS Code:** `Ctrl + Shift + P` → **Terminal: Select Default Profile** → **Git Bash**. Depois abra um terminal novo (`` Ctrl + ` ``) e confira onde você está:

```bash
pwd
# deve terminar em /matheus-russio-portfolio
```

---

## ☑ 1. Criar o projeto com Vite

```bash
npm create vite@latest . -- --template react-ts
```

O `.` faz o projeto ser criado na pasta atual. Respostas para as perguntas:

- **"Current directory is not empty"** → escolha **Ignore files and continue** (NÃO escolha "Remove", que apaga os arquivos atuais).
- Se perguntar se quer instalar e iniciar agora → **No** (vamos instalar no passo 2).

O Vite substitui o `README.md` pelo dele. Para recuperar o original:

```bash
git checkout -- README.md
```

---

## ☑ 2. Instalar as dependências

```bash
npm install
npm install three @react-three/fiber @react-three/drei motion
npm install -D @types/three
```

| Pacote | Para que serve |
| --- | --- |
| `three` | Motor 3D (o Three.js) |
| `@react-three/fiber` | Three.js escrito como componentes React |
| `@react-three/drei` | Atalhos prontos: carregar modelo, tocar animações, sombra no chão |
| `motion` | Animações da interface (carrossel, transições) |
| `@types/three` | Tipos do Three.js para o TypeScript |

---

## ☑ 3. Limpar o template

Primeiro, veja o que tem na pasta `src`:

```bash
ls src
```

Apague os arquivos de exemplo do Vite que não vamos usar (o `App.css` e a pasta `assets`):

```bash
rm src/App.css
rm -r src/assets
```

Crie as pastas novas. O `mkdir` aceita várias de uma vez:

```bash
mkdir -p src/components src/data src/hooks public/models
```

Confira o resultado:

```bash
ls src public
```

Estrutura final que vamos montar:

```
src/
├── components/
│   ├── Avatar.tsx      → boneco 3D animado
│   ├── Carrossel.tsx   → cards de projetos em perspectiva
│   ├── Dashboard.tsx   → trilho horizontal com os painéis + controles
│   └── Painel.tsx      → uma "blade": cabeçalho, gamertag, carrossel, rodapé
├── data/
│   └── projetos.ts     → conteúdo (seções e projetos)
├── hooks/
│   └── useTeclado.ts   → navegação pelo teclado
├── App.tsx
├── index.css           → visual (cores, layout)
└── main.tsx            → já vem pronto, não mexer
public/
└── models/
    └── avatar.glb      → modelo 3D
```

---

## ☑ 4. Baixar um modelo 3D de teste

Enquanto o modelo do Matheus não chega, use o robô de exemplo do próprio Three.js. Ele já vem com animações (`Idle`, `Wave`, `Dance`, `Walking`...).

```bash
curl -L -o public/models/avatar.glb https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb
```

- `-L` segue redirecionamentos, se o link apontar para outro endereço.
- `-o` diz onde salvar e com que nome (já renomeia para `avatar.glb`).

Confira se baixou. O `-lh` mostra detalhes e o tamanho em formato legível (deve dar uns 450K):

```bash
ls -lh public/models
```

> No PowerShell, o comando seria `curl.exe` (com `.exe`), porque lá `curl` sozinho é outro comando. No Git Bash, `curl` funciona direto.

Ou baixe pelo navegador nesse link e salve como `public/models/avatar.glb`.

---

## ☑ 5. Visual global: `src/index.css`

Abra o arquivo no VS Code pelo terminal:

```bash
code src/index.css
```

Substitua **todo** o conteúdo do arquivo (`Ctrl + A` e cole) por:

```css
:root {
  --creme: #fbf3c4;
  --vermelho-escuro: #5c0000;
  --vermelho: #c8000a;
  --rosa: #f4a3a3;
  --chao: #4a4446;
  --chao-claro: #c48a90;
  font-family: "Segoe UI", system-ui, sans-serif;
  color: #fff;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body,
#root {
  height: 100%;
}

body {
  background: var(--creme);
  overflow: hidden;
}

/* ---------- Dashboard (trilho horizontal) ---------- */

.dashboard {
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.trilho {
  --largura: 80vw;
  --gap: 4vw;
  display: flex;
  gap: var(--gap);
  padding-inline: calc((100vw - var(--largura)) / 2);
  transform: translateX(calc(var(--ativo) * -1 * (var(--largura) + var(--gap))));
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.trilho__item {
  flex: 0 0 var(--largura);
  height: min(85vh, calc(var(--largura) * 0.56));
  opacity: 0.6;
  cursor: pointer;
  transition: opacity 0.4s;
}

.trilho__item.is-ativo {
  opacity: 1;
  cursor: default;
}

/* ---------- Painel (blade) ---------- */

.painel {
  position: relative;
  height: 100%;
  overflow: hidden;
  border-radius: 4px;
  background:
    linear-gradient(to bottom, transparent 62%, var(--chao) 62%, var(--chao-claro) 100%),
    linear-gradient(110deg, var(--vermelho-escuro), var(--vermelho) 35%, var(--rosa));
}

.painel__topo {
  position: absolute;
  top: 6%;
  left: 6%;
  right: 6%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.painel__titulo {
  font-size: clamp(20px, 2.4vw, 36px);
}

.gamertag {
  display: flex;
  gap: 10px;
  text-align: right;
  font-weight: 600;
}

.gamertag div:first-child {
  display: flex;
  flex-direction: column;
}

.gamertag__foto {
  width: 48px;
  height: 48px;
  background: #ccc;
}

.painel__rodape {
  position: absolute;
  bottom: 6%;
  left: 6%;
  right: 6%;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
}

.botao {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 6px;
  vertical-align: middle;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ff5a5a, #b00000);
}

.painel__avatar {
  position: absolute;
  right: 4%;
  bottom: 8%;
  width: 28%;
  height: 80%;
  pointer-events: none;
}

/* ---------- Carrossel ---------- */

.carrossel {
  position: absolute;
  inset: 28% 0 auto 0;
  height: 220px;
  perspective: 1200px;
  transform-style: preserve-3d;
}

.card {
  position: absolute;
  top: 0;
  left: calc(50% - 80px);
  width: 160px;
  height: 220px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 0;
  border-radius: 6px;
  color: #fff;
  background: linear-gradient(#e0262b, #7a0d10);
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.35);
  cursor: pointer;
}

.card--foco {
  outline: 3px solid rgb(255 255 255 / 0.8);
}

.card__titulo {
  font-size: 11px;
  font-weight: 600;
  text-align: left;
}

.card img,
.card__placeholder {
  flex: 1;
  width: 100%;
  object-fit: cover;
  border-radius: 3px;
  background: rgb(255 255 255 / 0.85);
}
```

**Como funciona o trilho horizontal:** todos os painéis ficam lado a lado numa faixa (`.trilho`). A variável `--ativo` diz qual painel está em foco, e o `translateX` desliza a faixa até ele. Como cada painel ocupa 80% da tela, os vizinhos aparecem cortados nas laterais, igual nos prints.

---

## ☑ 6. Conteúdo: `src/data/projetos.ts`

Por enquanto com projetos de exemplo. Depois é só trocar pelos reais (título + imagem).

Crie o arquivo vazio com `touch` e abra no VS Code com `code`:

```bash
touch src/data/projetos.ts
code src/data/projetos.ts
```

Cole o conteúdo:

```ts
export type Projeto = {
  id: string
  titulo: string
  imagem?: string
}

export type Secao = {
  id: string
  titulo: string
  projetos: Projeto[]
}

// Gera projetos de exemplo enquanto o conteúdo real não chega.
function exemplos(prefixo: string, titulo: string, quantidade: number): Projeto[] {
  return Array.from({ length: quantidade }, (_, i) => ({
    id: `${prefixo}-${i + 1}`,
    titulo,
  }))
}

export const secoes: Secao[] = [
  { id: 'inicio', titulo: 'Menu inicial', projetos: exemplos('tray', 'Open Tray', 8) },
  { id: 'projetos', titulo: 'Meus projetos', projetos: exemplos('eros', 'EROS by Silvério', 8) },
  { id: 'produto', titulo: 'Design de Produto', projetos: exemplos('produto', 'Produto', 5) },
  { id: 'arte', titulo: 'Direção de Arte', projetos: exemplos('arte', 'Campanha', 5) },
]
```

---

## ☑ 7. Navegação pelo teclado: `src/hooks/useTeclado.ts`

```bash
touch src/hooks/useTeclado.ts
code src/hooks/useTeclado.ts
```

```ts
import { useEffect } from 'react'

// Liga teclas a ações. Ex.: useTeclado({ ArrowLeft: () => ..., Enter: () => ... })
export function useTeclado(acoes: Record<string, () => void>) {
  useEffect(() => {
    function aoPressionar(evento: KeyboardEvent) {
      const acao = acoes[evento.key]
      if (acao) {
        evento.preventDefault()
        acao()
      }
    }

    window.addEventListener('keydown', aoPressionar)
    return () => window.removeEventListener('keydown', aoPressionar)
  }, [acoes])
}
```

---

## ☑ 8. Avatar 3D: `src/components/Avatar.tsx`

Os passos 8 a 11 criam os quatro componentes. Dá para criar os quatro arquivos de uma vez: as chaves `{}` fazem o terminal expandir o comando para cada nome da lista.

```bash
touch src/components/{Avatar,Carrossel,Painel,Dashboard}.tsx
ls src/components
```

O `ls` deve mostrar os quatro arquivos. Agora abra o primeiro:

```bash
code src/components/Avatar.tsx
```

```tsx
import { Canvas } from '@react-three/fiber'
import { ContactShadows, useAnimations, useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
import type { Group } from 'three'

// Ajuste estes valores quando trocar pelo modelo do Matheus.
const MODELO = '/models/avatar.glb'
const ESCALA = 1
const POSICAO_Y = -2

type Props = {
  animacao: string
}

function Modelo({ animacao }: Props) {
  const grupo = useRef<Group>(null)
  const { scene, animations } = useGLTF(MODELO)
  const { actions } = useAnimations(animations, grupo)

  useEffect(() => {
    const acao = actions[animacao]
    acao?.reset().fadeIn(0.3).play()
    return () => {
      acao?.fadeOut(0.3)
    }
  }, [actions, animacao])

  return (
    <group ref={grupo} position={[0, POSICAO_Y, 0]} scale={ESCALA}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload(MODELO)

export function Avatar({ animacao }: Props) {
  return (
    <Canvas camera={{ position: [0, 0.5, 9], fov: 35 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[3, 5, 4]} intensity={2} />
      <Suspense fallback={null}>
        <Modelo animacao={animacao} />
      </Suspense>
      <ContactShadows position={[0, POSICAO_Y, 0]} opacity={0.5} blur={2.5} scale={6} />
    </Canvas>
  )
}
```

**O que cada parte faz:**

- `<Canvas>` cria a cena 3D, que tem fundo transparente e por isso o gradiente vermelho do painel aparece atrás.
- `useGLTF` carrega o `.glb`; `useAnimations` dá acesso às animações que vêm dentro dele.
- Quando a prop `animacao` muda (ex.: de `Idle` para `Wave`), a animação antiga sai suavemente (`fadeOut`) e a nova entra (`fadeIn`).
- `ContactShadows` desenha a sombra do boneco no chão.

---

## ☑ 9. Carrossel de projetos: `src/components/Carrossel.tsx`

O arquivo já foi criado no passo 8, então é só abrir:

```bash
code src/components/Carrossel.tsx
```

```tsx
import { motion } from 'motion/react'
import type { Projeto } from '../data/projetos'

type Props = {
  projetos: Projeto[]
  foco: number
  onSelecionar: (indice: number) => void
}

export function Carrossel({ projetos, foco, onSelecionar }: Props) {
  return (
    <div className="carrossel">
      {projetos.map((projeto, i) => {
        const d = i - foco
        const distancia = Math.abs(d)

        return (
          <motion.button
            key={projeto.id}
            className={`card ${d === 0 ? 'card--foco' : ''}`}
            onClick={() => onSelecionar(i)}
            animate={{
              x: d * 150 + Math.sign(d) * 60,
              z: -distancia * 80,
              rotateY: -Math.sign(d) * 20,
              scale: d === 0 ? 1.15 : 1,
              opacity: distancia > 4 ? 0 : 1,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            style={{ zIndex: 100 - distancia }}
          >
            <span className="card__titulo">● {projeto.titulo}</span>
            {projeto.imagem ? <img src={projeto.imagem} alt="" /> : <div className="card__placeholder" />}
          </motion.button>
        )
      })}
    </div>
  )
}
```

**A lógica:** `d` é a distância de cada card até o card em foco. Quanto maior a distância, mais o card vai para o lado (`x`), para trás (`z`) e mais gira (`rotateY`). O card em foco fica de frente e um pouco maior. O `motion` anima a mudança com efeito de mola.

---

## ☑ 10. Painel (blade): `src/components/Painel.tsx`

```bash
code src/components/Painel.tsx
```

```tsx
import type { ReactNode } from 'react'
import type { Secao } from '../data/projetos'
import { Carrossel } from './Carrossel'

type Props = {
  secao: Secao
  foco: number
  onSelecionar: (indice: number) => void
  children?: ReactNode
}

export function Painel({ secao, foco, onSelecionar, children }: Props) {
  return (
    <section className="painel">
      <header className="painel__topo">
        <h1 className="painel__titulo">● {secao.titulo}</h1>
        <div className="gamertag">
          <div>
            <span>Us3r</span>
            <span>666 Ⓜ</span>
          </div>
          <div className="gamertag__foto" />
        </div>
      </header>

      <Carrossel projetos={secao.projetos} foco={foco} onSelecionar={onSelecionar} />

      {children}

      <footer className="painel__rodape">
        <span><i className="botao" />Selecione</span>
        <span>{foco + 1} de {secao.projetos.length}</span>
        <span><i className="botao" />Voltar</span>
      </footer>
    </section>
  )
}
```

---

## ☑ 11. Dashboard (junta tudo): `src/components/Dashboard.tsx`

```bash
code src/components/Dashboard.tsx
```

```tsx
import { useState, type CSSProperties } from 'react'
import { secoes } from '../data/projetos'
import { useTeclado } from '../hooks/useTeclado'
import { Avatar } from './Avatar'
import { Painel } from './Painel'

function limitar(valor: number, min: number, max: number) {
  return Math.min(Math.max(valor, min), max)
}

export function Dashboard() {
  const [ativo, setAtivo] = useState(0)
  const [focos, setFocos] = useState(() => secoes.map(() => 0))
  const [animacao, setAnimacao] = useState('Idle')

  function mudarSecao(delta: number) {
    setAtivo((atual) => limitar(atual + delta, 0, secoes.length - 1))
  }

  function mudarFoco(secao: number, novo: number) {
    const max = secoes[secao].projetos.length - 1
    setFocos((atuais) => atuais.map((foco, i) => (i === secao ? limitar(novo, 0, max) : foco)))
  }

  function acenar() {
    setAnimacao('Wave')
    setTimeout(() => setAnimacao('Idle'), 2000)
  }

  useTeclado({
    ArrowLeft: () => mudarFoco(ativo, focos[ativo] - 1),
    ArrowRight: () => mudarFoco(ativo, focos[ativo] + 1),
    q: () => mudarSecao(-1),
    e: () => mudarSecao(1),
    Enter: acenar,
    Escape: () => setAtivo(0),
  })

  return (
    <main className="dashboard">
      <div className="trilho" style={{ '--ativo': ativo } as CSSProperties}>
        {secoes.map((secao, i) => (
          <div
            key={secao.id}
            className={`trilho__item ${i === ativo ? 'is-ativo' : ''}`}
            onClick={() => i !== ativo && setAtivo(i)}
          >
            <Painel secao={secao} foco={focos[i]} onSelecionar={(n) => mudarFoco(i, n)}>
              {i === 0 && (
                <div className="painel__avatar">
                  <Avatar animacao={animacao} />
                </div>
              )}
            </Painel>
          </div>
        ))}
      </div>
    </main>
  )
}
```

**Estado guardado aqui:**

- `ativo`: qual painel (seção) está em foco.
- `focos`: qual card está em foco **em cada** painel (cada seção lembra a sua posição).
- `animacao`: qual animação o avatar está tocando.

---

## ☑ 12. `src/App.tsx`

Antes, veja o que o App do template tem. Repare nos `import` do topo, que apontam para os arquivos apagados no passo 3:

```bash
head -n 6 src/App.tsx
```

O `public/icons.svg` só era usado por esse App do template, então pode apagar:

```bash
rm public/icons.svg
code src/App.tsx
```

Substitua todo o conteúdo por:

```tsx
import { Dashboard } from './components/Dashboard'

export default function App() {
  return <Dashboard />
}
```

O `src/main.tsx` já vem pronto do Vite e não precisa mudar.

---

## ☐ 13. Rodar e testar

Primeiro, confira se a estrutura bate com a do passo 3:

```bash
ls -R src
```

Depois rode o site:

```bash
npm run dev
```

Para parar o servidor depois: `Ctrl + C` no terminal.

Abra o endereço que aparecer (normalmente http://localhost:5173).

**Controles:**

| Tecla | Ação |
| --- | --- |
| `←` / `→` | Muda o card em foco no carrossel |
| `Q` / `E` | Painel anterior / próximo (como LB / RB no controle) |
| `Enter` | O avatar acena |
| `Esc` | Volta para o Menu inicial |
| Clique | Num card: foca nele. Num painel vizinho: vai até ele |

**Checklist do teste:**

- [ ] O robô aparece no Menu inicial, parado e "respirando" (animação `Idle`).
- [ ] `Enter` faz o robô acenar e voltar ao normal.
- [ ] As setas movem o carrossel com efeito de mola, e o contador "X de 8" acompanha.
- [ ] `Q`/`E` deslizam entre os painéis, e os vizinhos aparecem cortados nas laterais.

Se der erro, confira o terminal e o console do navegador (F12 → Console).

**O boneco ficou cortado, pequeno ou grande demais?** Ajuste `ESCALA` e `POSICAO_Y` no topo do `Avatar.tsx`, ou a `position` da câmera no `<Canvas>`.

---

## ☑ 14. Salvar no Git

```bash
git add .
git commit -m "Base do portfólio: painéis horizontais, carrossel e avatar 3D"
git push
```

O `.gitignore` criado pelo Vite já ignora a `node_modules`.

---

## Próximos passos (depois que a base funcionar)

### Trocar o robô pelo avatar do Matheus

1. O modelo precisa estar em **`.glb`**. No **Blender**: `File → Export → glTF 2.0`, formato **glTF Binary (.glb)**, com **Animation** marcada.
2. Se o modelo não tiver esqueleto/animações: suba no **Mixamo** (https://www.mixamo.com, gratuito), que cria o esqueleto automaticamente e oferece animações prontas (Idle, Waving, etc.). Baixe em FBX, importe no Blender e exporte em `.glb`.
3. Salve como `public/models/avatar.glb` (substituindo o robô).
4. Veja os **nomes das animações** do modelo novo (dá para ver em https://gltf-viewer.donmccurdy.com arrastando o arquivo) e troque `'Idle'` e `'Wave'` no `Dashboard.tsx` pelos nomes certos.
5. Ajuste `ESCALA`, `POSICAO_Y` e a câmera.

### Ideias para evoluir

- [ ] Imagens reais dos projetos (em `public/projetos/` e no campo `imagem` de `projetos.ts`).
- [ ] Página/modal de detalhe ao selecionar um projeto (`Enter` no card).
- [ ] Controle de Xbox de verdade via **Gamepad API**.
- [ ] Sons de navegação.
- [ ] Gamertag com a foto e o nome do Matheus.
- [ ] Controles flutuantes em pílula (voltar, "LIFE / VISUAIS", chat, "...").
- [ ] Versão mobile: arrastar com o dedo e aviso para girar a tela.
- [ ] Deploy na **Vercel** (https://vercel.com → importar o repositório do GitHub; ela detecta o Vite sozinha).
