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
