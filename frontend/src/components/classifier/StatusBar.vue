<template>
  <div
    class="flex items-center justify-center gap-2.5 mb-8 px-5 py-2.5 bg-white rounded-full border border-secondary/10 w-fit mx-auto"
  >
    <div
      class="w-2.5 h-2.5 rounded-full transition-all duration-500"
      :class="isConnected ? 'bg-primary shadow-[0_0_12px_rgba(5,176,132,0.6)] animate-pulse-glow' : 'bg-red-500'"
    ></div>
    <span class="text-secondary/50 text-[13px] font-medium">{{ statusText }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isConnected: boolean
  statusText: string
}>()
</script>
