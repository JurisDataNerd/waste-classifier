<template>
  <section
    class="min-h-screen flex items-center px-12 pt-[120px] pb-20 relative overflow-hidden max-lg:px-6 max-lg:pt-[100px] max-lg:pb-[60px]"
  >
    <div class="max-w-[1280px] mx-auto w-full grid grid-cols-2 gap-20 items-center max-lg:grid-cols-1 max-lg:gap-10">
      <!-- Left -->
      <div class="relative z-[2]">
        <div
          class="reveal inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary mb-7 tracking-wide uppercase"
          :class="{ visible: mounted }"
        >
          <span class="w-1.5 h-1.5 bg-primary rounded-full animate-blink"></span>
          Deep Learning Powered
        </div>

        <h1
          class="reveal stagger-1 text-[64px] font-black leading-[1.05] tracking-[-2px] mb-6 text-secondary max-lg:text-5xl max-md:text-[38px] max-[480px]:text-[30px] max-[480px]:tracking-[-1px]"
          :class="{ visible: mounted }"
        >
          <span class="text-primary">Waste</span><br />Classifier
        </h1>

        <p
          class="reveal stagger-2 text-lg leading-relaxed text-secondary/60 mb-10 max-w-[480px]"
          :class="{ visible: mounted }"
        >
          Sistem klasifikasi sampah cerdas menggunakan deep learning. Upload foto sampah dan
          dapatkan hasil klasifikasi secara real-time ke dalam 6 kategori berbeda.
        </p>

        <RouterLink
          to="/app"
          class="reveal stagger-3 inline-flex items-center gap-2.5 px-9 py-4 bg-primary text-white rounded-2xl text-base font-bold transition-all duration-[400ms] shadow-[0_4px_25px_rgba(5,176,132,0.25)] relative overflow-hidden hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(5,176,132,0.3)] active:translate-y-0 active:scale-[0.98]"
          :class="{ visible: mounted }"
        >
          Mulai Klasifikasi
          <span class="transition-transform duration-300">&#8594;</span>
        </RouterLink>
      </div>

      <!-- Right — interactive parallax illustration -->
      <HeroIllustration />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import HeroIllustration from './HeroIllustration.vue'

const mounted = ref(false)

onMounted(() => {
  setTimeout(() => {
    mounted.value = true
  }, 100)
})
</script>
