<template>
  <section ref="sectionRef" class="py-[100px] px-12 relative max-lg:px-6">
    <div class="max-w-[1280px] mx-auto">
      <div
        class="reveal text-xs font-bold uppercase tracking-[3px] text-primary text-center mb-4"
        :class="{ visible: isVisible }"
      >
        Fitur
      </div>
      <h2
        class="reveal stagger-1 text-[40px] font-extrabold text-center text-secondary tracking-tight mb-4"
        :class="{ visible: isVisible }"
      >
        Teknologi di Balik Klasifikasi
      </h2>
      <p
        class="reveal stagger-2 text-center text-secondary/50 text-base max-w-[560px] mx-auto mb-[60px] leading-relaxed"
        :class="{ visible: isVisible }"
      >
        Menggunakan transfer learning dengan arsitektur ResNet18 untuk mengklasifikasikan sampah
        secara akurat dan cepat.
      </p>

      <div class="grid grid-cols-3 gap-6 max-md:grid-cols-1">
        <FeatureCard
          v-for="(feat, idx) in FEATURES"
          :key="feat.title"
          :icon="feat.icon"
          :icon-color="feat.iconColor"
          :title="feat.title"
          :description="feat.description"
          class="reveal"
          :class="[`stagger-${idx + 1}`, { visible: isVisible }]"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'
import { FEATURES } from '@/config/constants'
import FeatureCard from './FeatureCard.vue'

const { isVisible, sectionRef } = useScrollReveal()
</script>
