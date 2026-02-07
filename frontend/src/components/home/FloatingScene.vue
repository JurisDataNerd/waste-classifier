<template>
  <div class="relative h-[500px] flex items-center justify-center perspective-1200 max-lg:h-[380px]">
    <div
      class="relative w-[420px] h-[420px] preserve-3d transition-transform duration-100 ease-out max-lg:w-[340px] max-lg:h-[340px]"
      :style="sceneStyle"
    >
      <!-- Glow rings -->
      <div
        class="absolute w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary opacity-[0.2] animate-ring-pulse"
      ></div>
      <div
        class="absolute w-[380px] h-[380px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-mint opacity-[0.3] animate-ring-pulse [animation-delay:1s]"
      ></div>
      <div
        class="absolute w-[200px] h-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary/30 opacity-[0.2] animate-ring-pulse [animation-delay:2s]"
      ></div>

      <!-- Floating items -->
      <div
        class="absolute w-[140px] h-[140px] top-10 right-5 transition-transform duration-150 ease-out drop-shadow-[0_15px_30px_rgba(1,90,132,0.12)] will-change-transform animate-idle-float-1 max-[480px]:w-[100px] max-[480px]:h-[100px]"
        :style="itemStyle(1.2)"
      >
        <img src="/assets/bottle.svg" alt="Bottle" class="w-full h-full object-contain" />
      </div>

      <div
        class="absolute w-[160px] h-[160px] top-1/2 left-2.5 -translate-y-1/2 transition-transform duration-150 ease-out drop-shadow-[0_15px_30px_rgba(1,90,132,0.12)] will-change-transform animate-idle-float-3 max-[480px]:w-[120px] max-[480px]:h-[120px]"
        :style="itemStyle(0.8)"
      >
        <img src="/assets/cardboard.svg" alt="Cardboard" class="w-full h-full object-contain" />
      </div>

      <div
        class="absolute w-[130px] h-[130px] bottom-10 right-[60px] transition-transform duration-150 ease-out drop-shadow-[0_15px_30px_rgba(1,90,132,0.12)] will-change-transform animate-idle-float-2 max-[480px]:w-[90px] max-[480px]:h-[90px]"
        :style="itemStyle(1.5)"
      >
        <img src="/assets/paper.svg" alt="Paper" class="w-full h-full object-contain" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

defineProps<{
  sceneStyle: CSSProperties
  itemStyle: (depth: number) => CSSProperties
}>()
</script>
