<template>
  <div
    class="bg-white border-2 border-dashed border-secondary/15 rounded-[20px] min-h-[380px] flex flex-col items-center justify-center cursor-pointer transition-all duration-[400ms] p-8 relative overflow-hidden hover:border-primary hover:bg-mint/10"
    :class="{
      '!border-solid !border-primary !p-3': previewUrl,
      '!border-primary scale-[1.01] !bg-mint/20': isDragging,
    }"
    :style="{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }"
    @click="fileInput?.click()"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="onDrop"
  >
    <Transition name="fade" mode="out-in">
      <div v-if="!previewUrl" key="placeholder" class="text-center">
        <div class="text-[64px] mb-4 animate-bob">&#128247;</div>
        <div class="text-base text-secondary/50 mb-1.5">Klik atau seret gambar ke sini</div>
        <div class="text-xs text-secondary/30">Format: JPEG, PNG</div>
      </div>
      <img
        v-else
        key="preview"
        :src="previewUrl"
        class="max-w-full max-h-[350px] rounded-xl object-contain"
        alt="Preview"
      />
    </Transition>

    <input
      ref="fileInput"
      type="file"
      class="hidden"
      accept="image/jpeg,image/png"
      @change="onFileSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  fileSelected: [file: File]
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(null)
const isDragging = ref(false)

function handleFile(f: File | undefined) {
  if (!f) return
  emit('fileSelected', f)
  const reader = new FileReader()
  reader.onload = (e) => {
    previewUrl.value = e.target?.result as string
  }
  reader.readAsDataURL(f)
}

function onFileSelect(e: Event) {
  const input = e.target as HTMLInputElement
  handleFile(input.files?.[0])
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  const f = e.dataTransfer?.files[0]
  if (f && f.type.startsWith('image/')) handleFile(f)
}

async function loadFromUrl(url: string) {
  const res = await fetch(url)
  const blob = await res.blob()
  const ext = url.split('.').pop() || 'webp'
  const file = new File([blob], `sample.${ext}`, { type: blob.type })
  handleFile(file)
}

function reset() {
  previewUrl.value = null
  if (fileInput.value) fileInput.value.value = ''
}

defineExpose({ reset, previewUrl, loadFromUrl })
</script>
