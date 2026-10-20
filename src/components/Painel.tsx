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
