<template>
  <!--
    CategoryIcon — Custom SVG icon for each waste category.
    Uses currentColor so the parent can tint it via Tailwind text-* classes.
  -->
  <svg
    :viewBox="viewBox"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="w-10 h-10"
    aria-hidden="true"
  >
    <!-- Plastic Bottle -->
    <template v-if="categoryId === 'plastic_bottle'">
      <rect x="15" y="2" width="10" height="6" rx="2" fill="currentColor" opacity="0.5" />
      <path d="M16 8 L16 12 Q16 14 14 15 L14 15 Q12 16 12 18 L12 36 Q12 38 14 38 L26 38 Q28 38 28 36 L28 18 Q28 16 26 15 L26 15 Q24 14 24 12 L24 8Z" fill="currentColor" />
      <rect x="14" y="20" width="12" height="12" rx="2" fill="currentColor" opacity="0.3" />
      <rect x="15" y="14" width="3" height="20" rx="1.5" fill="white" opacity="0.2" />
    </template>

    <!-- Carton Brick -->
    <template v-else-if="categoryId === 'carton_brick'">
      <rect x="8" y="6" width="24" height="32" rx="3" fill="currentColor" />
      <rect x="8" y="6" width="24" height="10" rx="3" fill="currentColor" opacity="0.6" />
      <rect x="11" y="20" width="18" height="8" rx="2" fill="white" opacity="0.15" />
      <circle cx="20" cy="24" r="2" fill="white" opacity="0.2" />
      <rect x="18" y="2" width="4" height="8" rx="2" fill="currentColor" opacity="0.4" />
    </template>

    <!-- Metal Packaging -->
    <template v-else-if="categoryId === 'metal_packaging'">
      <rect x="10" y="10" width="20" height="26" rx="3" fill="currentColor" />
      <ellipse cx="20" cy="10" rx="10" ry="4" fill="currentColor" opacity="0.6" />
      <ellipse cx="20" cy="36" rx="10" ry="4" fill="currentColor" opacity="0.4" />
      <rect x="13" y="18" width="14" height="8" rx="1.5" fill="white" opacity="0.15" />
      <ellipse cx="20" cy="10" rx="4" ry="1.5" fill="currentColor" opacity="0.8" />
      <rect x="13" y="12" width="2" height="20" rx="1" fill="white" opacity="0.1" />
    </template>

    <!-- Household Waste -->
    <template v-else-if="categoryId === 'household_waste'">
      <path d="M10 14 Q8 36 12 38 L28 38 Q32 36 30 14Z" fill="currentColor" />
      <path d="M14 14 Q14 8 17 6 L23 6 Q26 8 26 14" stroke="currentColor" stroke-width="2.5" fill="none" opacity="0.6" />
      <path d="M13 18 Q12 32 14 36" stroke="white" stroke-width="1.5" fill="none" opacity="0.2" stroke-linecap="round" />
      <path d="M20 16 L20 34" stroke="white" stroke-width="1" fill="none" opacity="0.1" stroke-linecap="round" />
    </template>

    <!-- Paper / Cardboard -->
    <template v-else-if="categoryId === 'paper_cardboard'">
      <rect x="8" y="4" width="22" height="30" rx="2" fill="currentColor" opacity="0.35" transform="rotate(3 19 19)" />
      <rect x="6" y="6" width="22" height="30" rx="2" fill="currentColor" />
      <path d="M22 6 L28 6 L28 12Z" fill="white" opacity="0.2" />
      <rect x="10" y="14" width="14" height="2" rx="1" fill="white" opacity="0.2" />
      <rect x="10" y="19" width="11" height="2" rx="1" fill="white" opacity="0.15" />
      <rect x="10" y="24" width="13" height="2" rx="1" fill="white" opacity="0.2" />
      <rect x="10" y="29" width="9" height="2" rx="1" fill="white" opacity="0.12" />
    </template>

    <!-- Glass -->
    <template v-else-if="categoryId === 'glass'">
      <path d="M14 4 Q13 18 11 20 L11 30 Q11 32 13 32 L27 32 Q29 32 29 30 L29 20 Q27 18 26 4Z" fill="currentColor" opacity="0.6" />
      <path d="M14 4 Q13 18 11 20 Q20 23 29 20 Q27 18 26 4Z" fill="currentColor" opacity="0.2" />
      <rect x="17" y="32" width="6" height="3" rx="1" fill="currentColor" opacity="0.5" />
      <ellipse cx="20" cy="37" rx="8" ry="2" fill="currentColor" opacity="0.25" />
      <path d="M17 6 Q16 16 14 19" stroke="white" stroke-width="1.5" fill="none" opacity="0.3" stroke-linecap="round" />
    </template>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  categoryId: string
}>()

const viewBox = '0 0 40 40'
</script>
