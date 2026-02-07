import { ref, onMounted, onUnmounted } from 'vue'

const API_URL = import.meta.env.VITE_API_URL || ''

export function useApiHealth() {
  const isConnected = ref(false)
  const statusText = ref('Memeriksa koneksi...')
  let intervalId: number | null = null

  async function checkAPI() {
    try {
      const r = await fetch(`${API_URL}/`)
      if (r.ok) {
        isConnected.value = true
        statusText.value = 'API terhubung \u2014 Siap klasifikasi'
      }
    } catch {
      isConnected.value = false
      statusText.value = 'API tidak terhubung \u2014 Jalankan backend terlebih dahulu'
    }
  }

  onMounted(() => {
    checkAPI()
    intervalId = window.setInterval(checkAPI, 10000)
  })

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
  })

  return { isConnected, statusText }
}
