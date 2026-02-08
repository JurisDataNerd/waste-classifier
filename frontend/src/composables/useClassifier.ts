import { ref, onUnmounted } from 'vue'
import type { AppState } from '@/types/classifier'
import type { PredictResponse } from '@/types/api'

const API_URL = import.meta.env.VITE_API_URL || ''

export function useClassifier() {
  const state = ref<AppState>('idle')
  const predictedClass = ref<string | null>(null)
  const confidence = ref(0)
  const errorMsg = ref<string | null>(null)

  const isLive = ref(false)
  let liveIntervalId: ReturnType<typeof setInterval> | null = null
  let isPredicting = false
  let consecutiveErrors = 0

  async function predict(file: File) {
    if (!isLive.value) {
      state.value = 'loading'
      predictedClass.value = null
    }
    errorMsg.value = null
    isPredicting = true

    const formData = new FormData()
    formData.append('file', file)

    try {
      const r = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
      })

      if (!r.ok) {
        const err = await r.json()
        throw new Error(err.detail || 'Gagal melakukan prediksi')
      }

      const data: PredictResponse = await r.json()
      predictedClass.value = data.class
      confidence.value = data.confidence
      state.value = 'result'
      consecutiveErrors = 0
    } catch (err) {
      if (isLive.value) {
        consecutiveErrors++
        if (consecutiveErrors >= 3) {
          errorMsg.value = 'Koneksi ke server terputus. Live mode dihentikan.'
          stopLive()
        }
      } else {
        errorMsg.value = err instanceof Error ? err.message : 'Terjadi kesalahan'
        state.value = 'idle'
      }
    } finally {
      isPredicting = false
    }
  }

  function startLive(captureFrameFn: () => Promise<File | null>) {
    if (isLive.value) return
    isLive.value = true
    consecutiveErrors = 0
    state.value = 'idle'
    predictedClass.value = null
    confidence.value = 0

    liveIntervalId = setInterval(async () => {
      if (isPredicting || !isLive.value) return
      const file = await captureFrameFn()
      if (file && isLive.value) {
        await predict(file)
      }
    }, 1500)
  }

  function stopLive() {
    if (liveIntervalId) {
      clearInterval(liveIntervalId)
      liveIntervalId = null
    }
    isLive.value = false
    isPredicting = false
    consecutiveErrors = 0
  }

  function reset() {
    stopLive()
    state.value = 'idle'
    predictedClass.value = null
    confidence.value = 0
    errorMsg.value = null
  }

  onUnmounted(() => {
    stopLive()
  })

  return { state, predictedClass, confidence, errorMsg, isLive, predict, startLive, stopLive, reset }
}
