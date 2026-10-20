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
