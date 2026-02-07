<template>
  <div class="flex items-center justify-center gap-0 mb-8">
    <div
      v-for="(step, i) in steps"
      :key="i"
      class="flex items-center"
    >
      <!-- Step circle + label -->
      <div class="flex flex-col items-center gap-1.5">
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 border-2"
          :class="stepCircleClass(i)"
        >
          <span v-if="i < currentStep">&#10003;</span>
          <span v-else>{{ i + 1 }}</span>
        </div>
        <span
          class="text-[11px] font-semibold transition-colors duration-300"
          :class="i <= currentStep ? 'text-primary' : 'text-secondary/30'"
        >{{ step }}</span>
      </div>
      <!-- Connector line -->
      <div
        v-if="i < steps.length - 1"
        class="w-16 h-0.5 mx-3 mb-5 rounded transition-colors duration-500 max-[480px]:w-8"
        :class="i < currentStep ? 'bg-primary' : 'bg-secondary/10'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AppState } from '@/types/classifier'

const props = defineProps<{
  state: AppState
}>()

const steps = ['Upload', 'Analisis', 'Hasil']

const currentStep = computed(() => {
  if (props.state === 'result') return 2
  if (props.state === 'loading') return 1
  return 0
})

function stepCircleClass(index: number) {
  if (index < currentStep.value) return 'bg-primary border-primary text-white'
  if (index === currentStep.value) return 'border-primary text-primary bg-primary/10'
  return 'border-secondary/15 text-secondary/30 bg-white'
}
</script>
