<template>
  <div
    class="bg-white border border-secondary/10 rounded-[20px] p-9 px-7 transition-all duration-[400ms] relative overflow-hidden hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_20px_50px_rgba(1,90,132,0.08)]"
    :style="{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }"
  >
    <div
      class="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-2xl mb-5 relative"
      :class="iconClasses"
    >
      {{ icon }}
    </div>
    <div class="text-lg font-bold text-secondary mb-2.5 relative">{{ title }}</div>
    <div class="text-sm text-secondary/50 leading-relaxed relative">{{ description }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  icon: string
  iconColor: 'green' | 'blue' | 'purple'
  title: string
  description: string
}>()

const iconClasses = computed(() => {
  switch (props.iconColor) {
    case 'green':
      return 'bg-primary/10 border border-primary/20'
    case 'blue':
      return 'bg-secondary/10 border border-secondary/20'
    case 'purple':
      return 'bg-mint/40 border border-mint/60'
  }
})
</script>
