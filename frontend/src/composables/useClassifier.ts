import { ref } from 'vue'
import type { AppState } from '@/types/classifier'
import type { PredictResponse } from '@/types/api'

const API_URL = import.meta.env.VITE_API_URL || ''

export function useClassifier() {
  const state = ref<AppState>('idle')
  const predictedClass = ref<string | null>(null)
  const confidence = ref(0)
  const errorMsg = ref<string | null>(null)

  async function predict(file: File) {
    state.value = 'loading'
    errorMsg.value = null
    predictedClass.value = null

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
    } catch (err) {
      errorMsg.value = err instanceof Error ? err.message : 'Terjadi kesalahan'
      state.value = 'idle'
    }
  }

  function reset() {
    state.value = 'idle'
    predictedClass.value = null
    confidence.value = 0
    errorMsg.value = null
  }

  return { state, predictedClass, confidence, errorMsg, predict, reset }
}
