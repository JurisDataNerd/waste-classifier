<template>
  <div
    class="bg-white border border-secondary/10 rounded-[20px] min-h-[380px] flex flex-col items-center justify-center p-8 px-6 relative overflow-hidden"
  >
    <!-- Live badge -->
    <div
      v-if="isLive"
      class="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-red-600/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg"
    >
      <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
      LIVE
    </div>

    <Transition :name="isLive ? 'none' : 'slide'" mode="out-in">
      <!-- Idle -->
      <div v-if="state === 'idle' && !isLive" key="idle" class="text-center">
        <div class="text-[64px] opacity-20 mb-4">&#128270;</div>
        <p class="text-secondary/30 text-sm">Hasil klasifikasi akan muncul di sini</p>
      </div>

      <!-- Live waiting for first result -->
      <div v-else-if="state === 'idle' && isLive" key="live-waiting" class="text-center">
        <div class="spinner mx-auto mb-5"></div>
        <div class="text-secondary/40 text-sm">Menunggu hasil klasifikasi...</div>
      </div>

      <!-- Loading with rotating messages (manual mode only) -->
      <div v-else-if="state === 'loading' && !isLive" key="loading" class="text-center">
        <div class="spinner mx-auto mb-5"></div>
        <div class="text-secondary/40 text-sm animate-fade-pulse">{{ loadingText }}</div>
      </div>

      <!-- Result -->
      <div v-else-if="state === 'result'" key="result" class="w-full">
        <div>
          <!-- Uploaded image thumbnail (manual mode only) -->
          <div v-if="previewUrl && !isLive" class="flex justify-center mb-4">
            <img
              :src="previewUrl"
              alt="Uploaded"
              class="w-20 h-20 object-cover rounded-xl border border-secondary/10"
            />
          </div>

          <div class="text-[11px] uppercase tracking-[2px] text-secondary/40 mb-3 text-center">
            Terdeteksi sebagai
          </div>

          <!-- Category SVG icon -->
          <div class="flex justify-center mb-2 text-primary">
            <CategoryIcon
              v-if="predictedClass"
              :category-id="predictedClass"
              class="!w-14 !h-14 transition-all duration-500"
            />
          </div>

          <!-- Indonesian label -->
          <div class="text-[24px] font-extrabold text-primary text-center mb-1 transition-all duration-500">
            {{ resultLabel }}
          </div>
          <div class="text-xs text-secondary/30 text-center mb-6 font-mono transition-all duration-500">
            {{ predictedClass }}
          </div>
        </div>

        <!-- Confidence meter + interpretation badge -->
        <ConfidenceMeter :confidence="confidence" />
        <div class="text-center mt-2.5">
          <span
            class="text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all duration-300"
            :class="confidenceBadgeClass"
          >{{ confidenceLabel }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import type { AppState } from '@/types/classifier'
import { LABELS } from '@/config/constants'
import ConfidenceMeter from './ConfidenceMeter.vue'
import CategoryIcon from '@/components/home/CategoryIcon.vue'

const props = withDefaults(defineProps<{
  state: AppState
  predictedClass: string | null
  confidence: number
  previewUrl?: string | null
  isLive?: boolean
}>(), {
  isLive: false,
})

const resultLabel = computed(() =>
  props.predictedClass ? LABELS[props.predictedClass] ?? props.predictedClass : '',
)

// Rotating loading messages
const loadingMessages = [
  'Menganalisis gambar...',
  'Mendeteksi jenis sampah...',
  'Menghitung confidence...',
]
const loadingIndex = ref(0)
let loadingInterval: ReturnType<typeof setInterval> | null = null

const loadingText = computed(() => loadingMessages[loadingIndex.value % loadingMessages.length])

onMounted(() => {
  loadingInterval = setInterval(() => {
    loadingIndex.value++
  }, 2000)
})

onUnmounted(() => {
  if (loadingInterval) clearInterval(loadingInterval)
})

// Confidence interpretation
const confidenceLabel = computed(() => {
  const pct = props.confidence * 100
  if (pct >= 80) return 'Confidence Tinggi'
  if (pct >= 50) return 'Confidence Sedang'
  return 'Confidence Rendah'
})

const confidenceBadgeClass = computed(() => {
  const pct = props.confidence * 100
  if (pct >= 80) return 'bg-primary/10 text-primary'
  if (pct >= 50) return 'bg-yellow-100 text-yellow-700'
  return 'bg-red-50 text-red-500'
})
</script>
