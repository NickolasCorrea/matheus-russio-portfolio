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
