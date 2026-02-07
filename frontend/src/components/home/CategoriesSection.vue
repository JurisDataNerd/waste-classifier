<template>
  <section ref="sectionRef" class="py-20 pb-[100px] px-12 max-lg:px-6">
    <div class="max-w-[1280px] mx-auto">
      <div
        class="reveal text-xs font-bold uppercase tracking-[3px] text-primary text-center mb-4"
        :class="{ visible: isVisible }"
      >
        Kategori
      </div>
      <h2
        class="reveal stagger-1 text-[40px] font-extrabold text-center text-secondary tracking-tight mb-4"
        :class="{ visible: isVisible }"
      >
        6 Jenis Sampah yang Dikenali
      </h2>
      <p
        class="reveal stagger-2 text-center text-secondary/50 text-base max-w-[560px] mx-auto mb-[60px] leading-relaxed"
        :class="{ visible: isVisible }"
      >
        Model dilatih untuk mengenali kategori sampah berikut.
      </p>

      <div class="grid grid-cols-6 gap-4 max-md:grid-cols-3 max-[480px]:grid-cols-2">
        <CategoryCard
          v-for="(cat, idx) in CATEGORIES"
          :key="cat.id"
          :category-id="cat.id"
          :label="cat.label"
          class="reveal"
          :class="[`stagger-${idx + 1}`, { visible: isVisible }]"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'
import { CATEGORIES } from '@/config/constants'
import CategoryCard from './CategoryCard.vue'

const { isVisible, sectionRef } = useScrollReveal()
</script>
