<template>
  <section ref="sectionRef" class="px-12 pb-[100px] max-lg:px-6">
    <div
      class="reveal max-w-[900px] mx-auto bg-secondary border border-secondary/80 rounded-3xl p-[60px] text-center relative overflow-hidden max-md:p-10 max-md:px-6"
      :class="{ visible: isVisible }"
    >
      <h2 class="text-[32px] font-extrabold text-white mb-3 relative">Siap Mengklasifikasi?</h2>
      <p class="text-mint text-base mb-8 relative opacity-90">
        Upload foto sampah dan biarkan AI melakukan sisanya.
      </p>
      <RouterLink
        to="/app"
        class="inline-flex items-center gap-2.5 px-10 py-4 bg-white text-secondary rounded-[14px] text-base font-bold transition-all duration-300 relative hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(1,90,132,0.15)]"
      >
        Mulai Sekarang
        <span>&#8594;</span>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { isVisible, sectionRef } = useScrollReveal()
</script>
