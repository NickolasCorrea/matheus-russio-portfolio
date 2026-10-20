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