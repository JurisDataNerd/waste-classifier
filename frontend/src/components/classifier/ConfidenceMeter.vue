<template>
  <div>
    <div class="flex justify-between mb-2">
      <span class="text-[13px] text-secondary/50">Confidence</span>
      <span class="text-[15px] font-extrabold text-primary tabular-nums">{{ confPct }}%</span>
    </div>
    <div class="w-full h-3.5 bg-cream rounded-[7px] overflow-hidden">
      <div
        class="h-full bg-primary rounded-[7px] transition-all duration-1000 relative overflow-hidden"
        :style="{ width: confPct + '%', transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }"
      >
        <div
          class="absolute inset-0 bg-white/20 animate-shimmer"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  confidence: number
}>()

const confPct = computed(() => (props.confidence * 100).toFixed(1))
</script>
