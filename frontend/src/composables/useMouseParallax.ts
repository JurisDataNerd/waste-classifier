import { ref, computed } from 'vue'

export function useMouseParallax() {
  const mouseX = ref(0)
  const mouseY = ref(0)

  function onMouseMove(e: MouseEvent) {
    mouseX.value = (e.clientX / window.innerWidth - 0.5) * 2
    mouseY.value = (e.clientY / window.innerHeight - 0.5) * 2
  }

  const sceneStyle = computed(() => ({
    transform: `rotateY(${mouseX.value * 12}deg) rotateX(${mouseY.value * -8}deg)`,
  }))

  function itemStyle(depth: number) {
    const tx = mouseX.value * 20 * depth
    const ty = mouseY.value * 15 * depth
    return {
      transform: `translate(${tx}px, ${ty}px)`,
    }
  }

  return { mouseX, mouseY, onMouseMove, sceneStyle, itemStyle }
}
