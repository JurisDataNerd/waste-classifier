import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useScrollReveal(threshold = 0.2): {
  isVisible: Ref<boolean>
  sectionRef: Ref<HTMLElement | null>
} {
  const isVisible = ref(false)
  const sectionRef = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold },
    )

    if (sectionRef.value) {
      observer.observe(sectionRef.value)
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { isVisible, sectionRef }
}
