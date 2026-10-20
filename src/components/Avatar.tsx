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
