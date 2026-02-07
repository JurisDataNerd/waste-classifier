<template>
  <div>
    <Navbar variant="app" />

    <div class="max-w-[1000px] mx-auto px-6 pt-24 pb-12">
      <StatusBar :is-connected="isConnected" :status-text="statusText" />

      <StepIndicator :state="state" />

      <!-- Input mode tab bar -->
      <div class="flex justify-center mb-5">
        <div class="inline-flex bg-white rounded-full border border-secondary/10 p-1">
          <button
            class="px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 inline-flex items-center gap-1.5"
            :class="inputMode === 'upload'
              ? 'bg-primary text-white shadow-sm'
              : 'text-secondary/50 hover:text-secondary/80'"
            @click="onSwitchMode('upload')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            Upload
          </button>
          <button
            class="px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 inline-flex items-center gap-1.5"
            :class="inputMode === 'camera'
              ? 'bg-primary text-white shadow-sm'
              : 'text-secondary/50 hover:text-secondary/80'"
            @click="onSwitchMode('camera')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
            </svg>
            Kamera
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6 mb-7 max-md:grid-cols-1">
        <UploadBox
          v-if="inputMode === 'upload'"
          ref="uploadBoxRef"
          @file-selected="onFileSelected"
        />
        <CameraBox
          v-else
          ref="cameraBoxRef"
          :active="inputMode === 'camera'"
          @file-selected="onFileSelected"
        />
        <ResultBox
          :state="state"
          :predicted-class="predictedClass"
          :confidence="confidence"
          :preview-url="previewUrl"
        />
      </div>

      <div class="flex gap-3.5 justify-center">
        <button
          class="px-9 py-3.5 rounded-[14px] text-[15px] font-bold border-none cursor-pointer transition-all duration-300 bg-primary text-white shadow-[0_4px_20px_rgba(5,176,132,0.25)] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(5,176,132,0.35)] active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:!transform-none disabled:!shadow-none"
          :style="{ transitionTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)' }"
          :disabled="!selectedFile || state === 'loading'"
          @click="onPredict"
        >
          <span v-if="state === 'loading'">Menganalisis...</span>
          <span v-else>Klasifikasi</span>
        </button>
        <button
          class="px-9 py-3.5 rounded-[14px] text-[15px] font-bold cursor-pointer transition-all duration-300 bg-white text-secondary/60 border border-secondary/15 hover:bg-mint/20 hover:text-secondary hover:-translate-y-0.5"
          :style="{ transitionTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)' }"
          @click="onReset"
        >
          Reset
        </button>
      </div>

      <!-- Sample images (only in upload mode) -->
      <div v-if="inputMode === 'upload'" class="mt-8 text-center">
        <div class="text-xs text-secondary/35 uppercase tracking-[2px] font-semibold mb-3">
          Atau coba contoh
        </div>
        <div class="flex justify-center gap-3">
          <button
            v-for="sample in SAMPLES"
            :key="sample.label"
            class="group flex flex-col items-center gap-1.5 cursor-pointer bg-transparent border-none p-0"
            :disabled="state === 'loading'"
            @click="onSampleClick(sample.src)"
          >
            <img
              :src="sample.src"
              :alt="sample.label"
              class="w-14 h-14 object-cover rounded-xl border-2 border-secondary/10 transition-all duration-300 group-hover:border-primary group-hover:scale-105 group-disabled:opacity-40"
            />
            <span class="text-[10px] text-secondary/40 group-hover:text-primary transition-colors">
              {{ sample.label }}
            </span>
          </button>
        </div>
      </div>

      <Transition name="fade">
        <div
          v-if="errorMsg"
          class="bg-red-50 border border-red-200 text-red-600 px-6 py-3.5 rounded-xl text-[13px] text-center mt-5"
        >
          {{ errorMsg }}
        </div>
      </Transition>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import StatusBar from '@/components/classifier/StatusBar.vue'
import StepIndicator from '@/components/classifier/StepIndicator.vue'
import UploadBox from '@/components/classifier/UploadBox.vue'
import CameraBox from '@/components/classifier/CameraBox.vue'
import ResultBox from '@/components/classifier/ResultBox.vue'
import { useApiHealth } from '@/composables/useApiHealth'
import { useClassifier } from '@/composables/useClassifier'

const { isConnected, statusText } = useApiHealth()
const { state, predictedClass, confidence, errorMsg, predict, reset } = useClassifier()

const selectedFile = ref<File | null>(null)
const uploadBoxRef = ref<InstanceType<typeof UploadBox> | null>(null)
const cameraBoxRef = ref<InstanceType<typeof CameraBox> | null>(null)
const inputMode = ref<'upload' | 'camera'>('upload')

const previewUrl = computed(() => {
  if (inputMode.value === 'camera') {
    return cameraBoxRef.value?.previewUrl ?? null
  }
  return uploadBoxRef.value?.previewUrl ?? null
})

const SAMPLES = [
  { src: '/assets/botol.webp', label: 'Botol' },
  { src: '/assets/kotakkardus.webp', label: 'Kardus' },
  { src: '/assets/kertas.webp', label: 'Kertas' },
]

function onFileSelected(file: File) {
  selectedFile.value = file
  errorMsg.value = null
}

function onSwitchMode(mode: 'upload' | 'camera') {
  if (mode === inputMode.value) return
  onReset()
  inputMode.value = mode
}

async function onSampleClick(src: string) {
  errorMsg.value = null
  await uploadBoxRef.value?.loadFromUrl(src)
}

async function onPredict() {
  if (selectedFile.value) {
    await predict(selectedFile.value)
  }
}

function onReset() {
  selectedFile.value = null
  reset()
  if (inputMode.value === 'upload') {
    uploadBoxRef.value?.reset()
  } else {
    cameraBoxRef.value?.reset()
  }
}
</script>
