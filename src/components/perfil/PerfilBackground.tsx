import { useCallback } from "react"
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import type { Container, Engine } from "tsparticles-engine"

export default function PerfilBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log(container)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: { enable: false },
            onHover: { enable: true, mode: "repulse" },
            resize: true,
          },
          modes: {
            repulse: { distance: 80, duration: 0.4 },
          },
        },
        particles: {
          color: { value: ["#2E4A2F", "#D6BCFA"] },
          links: { enable: false },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: false,
            speed: 0.3,
            straight: false,
          },
          number: { density: { enable: true, area: 800 }, value: 12 },
          opacity: { value: 0.08 },
          shape: { type: ["star", "circle"] },
          size: { value: { min: 1, max: 2 } },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 z-0"
    />
  )
}
