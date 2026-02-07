<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 transition-all duration-[400ms]"
    :class="{
      'bg-cream/90 backdrop-blur-xl border-b border-secondary/10 !py-3.5': scrolled || variant === 'app',
    }"
  >
    <RouterLink to="/" class="flex items-center gap-3 text-secondary no-underline">
      <div
        class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-xl text-white shadow-[0_4px_15px_rgba(5,176,132,0.25)]"
      >
        &#9851;
      </div>
      <span class="text-lg font-bold tracking-tight">Waste Classifier</span>
    </RouterLink>

    <RouterLink
      v-if="variant === 'home'"
      to="/app"
      class="inline-flex items-center gap-2 px-6 py-2.5 bg-primary/10 border border-primary/30 text-primary rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-primary/20 hover:border-primary hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(5,176,132,0.15)]"
    >
      Classify Now
      <span>&#8594;</span>
    </RouterLink>

    <RouterLink
      v-else
      to="/"
      class="inline-flex items-center gap-1.5 px-5 py-2 text-secondary/60 text-[13px] font-semibold border border-secondary/20 rounded-[10px] transition-all duration-300 hover:text-secondary hover:border-secondary/40 hover:bg-mint/30"
    >
      <span>&#8592;</span> Beranda
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

withDefaults(
  defineProps<{
    scrolled?: boolean
    variant?: 'home' | 'app'
  }>(),
  {
    scrolled: false,
    variant: 'home',
  },
)
</script>
