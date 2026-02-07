<template>
  <div>
    <Navbar variant="home" :scrolled="isScrolled" />
    <HeroSection />
    <FeaturesSection />
    <CategoriesSection />
    <CTABanner />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import FeaturesSection from '@/components/home/FeaturesSection.vue'
import CategoriesSection from '@/components/home/CategoriesSection.vue'
import CTABanner from '@/components/home/CTABanner.vue'

const isScrolled = ref(false)

function onScroll() {
  isScrolled.value = window.scrollY > 40
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
