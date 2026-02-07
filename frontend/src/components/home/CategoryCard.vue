<template>
  <div
    class="bg-white border border-secondary/10 rounded-2xl py-6 px-3 text-center transition-all duration-[400ms] hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_12px_30px_rgba(1,90,132,0.08)]"
    :style="{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }"
  >
    <div class="flex justify-center mb-3 text-primary">
      <CategoryIcon :category-id="categoryId" />
    </div>
    <div class="text-xs font-semibold text-secondary/50 uppercase tracking-wide">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
import CategoryIcon from './CategoryIcon.vue'

defineProps<{
  categoryId: string
  label: string
}>()
</script>
