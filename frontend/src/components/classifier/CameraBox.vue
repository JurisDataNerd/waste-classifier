<template>
  <div
    class="bg-white border border-secondary/15 rounded-[20px] min-h-[380px] flex flex-col items-center justify-center relative overflow-hidden"
    :class="{
      '!border-primary p-3': capturedPreviewUrl,
      'p-8': !capturedPreviewUrl,
    }"
  >
    <!-- Error state -->
    <div v-if="cameraError" class="text-center px-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-16 h-16 mx-auto mb-4 text-secondary/20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
        />
        <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
      <p class="text-secondary/50 text-sm mb-3">{{ cameraError }}</p>
      <button
        class="text-sm text-primary font-semibold hover:underline"
        @click="startCamera"
      >
        Coba lagi
      </button>
    </div>

    <!-- Captured preview -->
    <Transition v-else name="fade" mode="out-in">
      <div v-if="capturedPreviewUrl" key="preview" class="w-full">
        <img
          :src="capturedPreviewUrl"
          class="max-w-full max-h-[350px] rounded-xl object-contain mx-auto"
          alt="Hasil tangkapan"
        />
        <div class="absolute bottom-4 left-0 right-0 flex justify-center">
          <button
            class="px-5 py-2 rounded-xl text-[13px] font-semibold bg-white/90 text-secondary/70 border border-secondary/15 hover:bg-mint/20 hover:text-secondary transition-all duration-300"
            @click="onRetake"
          >
            Ulangi
          </button>
        </div>
      </div>

      <!-- Live viewfinder -->
      <div v-else key="viewfinder" class="w-full h-full flex flex-col items-center justify-center">
        <!-- Loading state while camera initializes -->
        <div v-if="!isActive" class="text-center">
          <div class="spinner mx-auto mb-4"></div>
          <p class="text-secondary/40 text-sm">Mengakses kamera...</p>
        </div>

        <!-- Video feed -->
        <div v-show="isActive" class="relative w-full">
          <video
            ref="videoRef"
            class="w-full max-h-[320px] object-cover rounded-xl bg-black"
            autoplay
            playsinline
            muted
          ></video>

          <!-- Viewfinder corner brackets -->
          <div class="absolute inset-4 pointer-events-none">
            <div class="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/60 rounded-tl-md"></div>
            <div class="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white/60 rounded-tr-md"></div>
            <div class="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white/60 rounded-bl-md"></div>
            <div class="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/60 rounded-br-md"></div>
          </div>

          <!-- Control buttons -->
          <div class="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4">
            <!-- Switch camera -->
            <button
              class="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
              title="Ganti kamera"
              @click="onSwitchCamera"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M2.985 19.644l3.181-3.182" />
              </svg>
            </button>

            <!-- Shutter -->
            <button
              class="w-16 h-16 rounded-full bg-white border-4 border-white/50 shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200 flex items-center justify-center"
              title="Ambil foto"
              @click="onCapture"
            >
              <div class="w-12 h-12 rounded-full bg-white border-2 border-secondary/10"></div>
            </button>

            <!-- Spacer for symmetry -->
            <div class="w-10 h-10"></div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useCamera } from '@/composables/useCamera'

const props = defineProps<{
  active: boolean
}>()

const emit = defineEmits<{
  fileSelected: [file: File]
}>()

const videoRef = ref<HTMLVideoElement | null>(null)

const {
  isActive,
  error: cameraError,
  capturedPreviewUrl,
  start,
  stop,
  switchCamera,
  capture,
  resetCapture,
} = useCamera()

const previewUrl = capturedPreviewUrl

async function startCamera() {
  if (videoRef.value) {
    await start(videoRef.value)
  }
}

async function onCapture() {
  if (!videoRef.value) return
  const file = await capture(videoRef.value)
  if (file) {
    stop()
    emit('fileSelected', file)
  }
}

function onRetake() {
  resetCapture()
  startCamera()
}

async function onSwitchCamera() {
  if (videoRef.value) {
    await switchCamera(videoRef.value)
  }
}

function reset() {
  resetCapture()
  stop()
}

watch(
  () => props.active,
  (active) => {
    if (active) {
      setTimeout(() => startCamera(), 50)
    } else {
      stop()
    }
  },
)

onMounted(() => {
  if (props.active) {
    setTimeout(() => startCamera(), 50)
  }
})

onUnmounted(() => {
  stop()
})

defineExpose({ reset, previewUrl })
</script>
