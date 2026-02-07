<template>
  <!--
    HeroIllustration — 3D Carousel of waste items

    Three trash items (bottle, cardboard, paper) orbit on an ellipse.
    Horizontal cursor movement rotates the orbit, cycling which item
    sits in front. The front item is large and sharp; the two behind
    are smaller, translucent, and subtly blurred.

    Layer stack:
      0  Ambient blobs       (decorative, near-static)
      1  Scanner beam        (themed scanning laser)
      2  Focus rings         (cursor-tracking reticle)
      3  Carousel items      (3 items on elliptical orbit)
      4  Floating particles  (atmospheric dots)
      5  Recycle watermark   (ultra-subtle center icon)
  -->
  <div class="relative h-[520px] w-full max-lg:h-[400px] max-md:h-[320px] overflow-hidden">

    <!-- ═══════════════════════════════════════════════════════════
         LAYER 1 — Scanner beam
         ═══════════════════════════════════════════════════════════ -->
    <div class="absolute inset-x-[10%] h-px pointer-events-none scan-beam">
      <div class="w-full h-full bg-primary/20 shadow-[0_0_8px_rgba(5,176,132,0.25),0_0_24px_rgba(5,176,132,0.08)]" />
    </div>

    <!-- ═══════════════════════════════════════════════════════════
         LAYER 2 — Focus rings (cursor-tracking)
         ═══════════════════════════════════════════════════════════ -->
    <div
      class="absolute w-[240px] h-[240px] rounded-full border border-primary/[0.08] pointer-events-none transition-opacity duration-700 max-md:w-[160px] max-md:h-[160px]"
      :style="focusRingStyle(0.5)"
    />
    <div
      class="absolute w-[140px] h-[140px] rounded-full border border-dashed border-mint/[0.12] pointer-events-none transition-opacity duration-700 max-md:w-[100px] max-md:h-[100px]"
      :style="focusRingStyle(0.65)"
    />

    <!-- ═══════════════════════════════════════════════════════════
         LAYER 3 — Carousel items
         Three items orbit on an ellipse. Horizontal cursor position
         rotates the orbit so a different item comes to front.
         ═══════════════════════════════════════════════════════════ -->
    <div
      v-for="(item, i) in CAROUSEL_ITEMS"
      :key="item.id"
      class="absolute will-change-transform pointer-events-none"
      :style="getCarouselStyle(item, i)"
    >
      <img
        :src="item.src"
        :alt="item.id"
        class="w-full h-full object-contain drop-shadow-xl"
      />
    </div>

    <!-- ═══════════════════════════════════════════════════════════
         LAYER 4 — Floating particles
         ═══════════════════════════════════════════════════════════ -->
    <div
      v-for="(p, i) in PARTICLES"
      :key="'p' + i"
      class="absolute rounded-full will-change-transform pointer-events-none"
      :class="p.colorClass"
      :style="getParticleStyle(p, i)"
    />

    <!-- ═══════════════════════════════════════════════════════════
         LAYER 5 — Recycle watermark
         ═══════════════════════════════════════════════════════════ -->
    <div
      class="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      :style="blobStyle(0.15, 3, 3)"
    >
      <span class="text-[80px] text-primary/[0.04] recycle-spin">&#9851;</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// ── Types ────────────────────────────────────────────────────────

/** An item that orbits on the 3D carousel */
interface CarouselItem {
  id: string
  src: string        // Path to SVG in public/assets/
  baseAngle: number  // Resting position on orbit (degrees): 0, 120, 240
}

/** A decorative floating dot */
interface Particle {
  x: number
  y: number
  size: number
  depth: number
  colorClass: string
  opacity: number
  floatSpeed: number
  floatAmplitude: number
}

// ── Carousel configuration ───────────────────────────────────────
//
// Three items spaced 120° apart on an elliptical orbit.
// At rest (cursor centered), the bottle faces the viewer.

const CAROUSEL_ITEMS: CarouselItem[] = [
  { id: 'bottle',    src: '/assets/kotakkardus.webp',    baseAngle: 0   },
  { id: 'cardboard', src: '/assets/kertas.webp', baseAngle: 120 },
  { id: 'paper',     src: '/assets/botol.webp',     baseAngle: 240 },
]

// Orbit geometry
const RADIUS_X = 140   // px — horizontal spread of the ellipse
const RADIUS_Y = 25    // px — vertical arc (subtle tilt)
const ITEM_SIZE = 160  // px — base width/height of each item

// ── Particles ────────────────────────────────────────────────────

function makeParticles(count: number): Particle[] {
  const colors = ['bg-primary', 'bg-mint', 'bg-secondary/50']
  return Array.from({ length: count }, (_, i) => ({
    x: ((i * 137.508) % 80) - 40,
    y: ((i * 97.31) % 80) - 40,
    size: 3 + (i % 3) * 1.5,
    depth: 0.15 + (i / count) * 1.4,
    colorClass: colors[i % colors.length],
    opacity: 0.1 + (i % 4) * 0.05,
    floatSpeed: 0.25 + (i % 5) * 0.08,
    floatAmplitude: 4 + (i % 3) * 3,
  }))
}

const PARTICLES = makeParticles(6)

// ── Mouse tracking with inertial smoothing ───────────────────────
//
// Raw cursor position snaps instantly; we lerp toward it each frame
// so the carousel rotation feels weighted and organic.

const targetX = ref(0)     // Normalised cursor: -1 (left) → +1 (right)
const targetY = ref(0)
const smoothX = ref(0)     // Lerped output — drives carousel rotation
const smoothY = ref(0)
const isHovering = ref(false)
const time = ref(0)        // Elapsed seconds — drives idle bob

const LERP_FACTOR = 0.055

let rafId: number | null = null

function onMouseMove(e: MouseEvent) {
  targetX.value = (e.clientX / window.innerWidth - 0.5) * 2
  targetY.value = (e.clientY / window.innerHeight - 0.5) * 2
  isHovering.value = true
}

function onMouseLeave() {
  targetX.value = 0
  targetY.value = 0
  isHovering.value = false
}

function tick() {
  smoothX.value += (targetX.value - smoothX.value) * LERP_FACTOR
  smoothY.value += (targetY.value - smoothY.value) * LERP_FACTOR
  time.value = performance.now() / 1000
  rafId = requestAnimationFrame(tick)
}

// ── Carousel style calculator ────────────────────────────────────
//
// Each item's orbit angle = baseAngle + rotation offset from cursor.
// From the angle we derive X (sin), Z depth (cos), Y arc, then map
// Z to scale, opacity, blur, and z-index.

function getCarouselStyle(item: CarouselItem, index: number) {
  // Cursor drives rotation: 120° per unit of smoothX
  // Full left→right sweep cycles through all 3 items
  const angleDeg = item.baseAngle + smoothX.value * 120
  const angleRad = (angleDeg * Math.PI) / 180

  // Position on elliptical orbit
  const x = Math.sin(angleRad) * RADIUS_X
  const z = Math.cos(angleRad)                  // -1 (back) … +1 (front)
  const y = -Math.sin(angleRad) * RADIUS_Y      // subtle vertical arc

  // Idle bob — sine wave with per-item phase offset
  const phase = index * 2.1
  const bobY = Math.sin(time.value * 0.5 + phase) * 12
  const bobRotate = Math.sin(time.value * 0.35 + phase) * 3

  // Map Z depth to visual properties
  const normalZ = (z + 1) / 2                   // 0 at back … 1 at front
  const scale = 0.55 + normalZ * 0.45           // 0.55 → 1.0
  const opacity = 0.45 + normalZ * 0.55         // 0.45 → 1.0
  const blur = Math.max(0, (1 - z) * 0.8)       // 0 at front, ~1.6 at back

  return {
    left: '50%',
    top: '50%',
    width: ITEM_SIZE + 'px',
    height: ITEM_SIZE + 'px',
    transform: [
      'translate(-50%, -50%)',
      `translate(${x}px, ${y + bobY}px)`,
      `scale(${scale.toFixed(3)})`,
      `rotate(${bobRotate.toFixed(1)}deg)`,
    ].join(' '),
    opacity: +opacity.toFixed(2),
    filter: blur > 0.1 ? `blur(${blur.toFixed(1)}px)` : undefined,
    zIndex: Math.round(normalZ * 10),
  }
}

// ── Ambient style helpers ────────────────────────────────────────

function blobStyle(depth: number, baseX: number, baseY: number) {
  const px = smoothX.value * 15 * depth
  const py = smoothY.value * 10 * depth
  return {
    left: (50 + baseX) + '%',
    top: (50 + baseY) + '%',
    transform: `translate(-50%, -50%) translate(${px}px, ${py}px)`,
  }
}

function focusRingStyle(depth: number) {
  const rx = smoothX.value * 22 * depth
  const ry = smoothY.value * 16 * depth
  return {
    left: '50%',
    top: '50%',
    transform: `translate(-50%, -50%) translate(${rx}px, ${ry}px)`,
    opacity: isHovering.value ? 1 : 0,
  }
}

function getParticleStyle(p: Particle, index: number) {
  const px = smoothX.value * 28 * p.depth
  const py = smoothY.value * 18 * p.depth
  const phase = index * 2.3
  const drift = Math.sin(time.value * p.floatSpeed * Math.PI * 2 + phase) * p.floatAmplitude
  return {
    left: (50 + p.x) + '%',
    top: (50 + p.y) + '%',
    width: p.size + 'px',
    height: p.size + 'px',
    transform: `translate(-50%, -50%) translate(${px}px, ${py + drift}px)`,
    opacity: p.opacity,
  }
}

// ── Lifecycle ────────────────────────────────────────────────────

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  document.documentElement.addEventListener('mouseleave', onMouseLeave)
  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  document.documentElement.removeEventListener('mouseleave', onMouseLeave)
  if (rafId !== null) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
/* Scanner beam — sweeps top→bottom in a slow loop */
.scan-beam {
  top: 15%;
  animation: scanDown 7s ease-in-out infinite;
}

@keyframes scanDown {
  0%   { top: 10%; opacity: 0; }
  6%   { opacity: 0.5; }
  94%  { opacity: 0.5; }
  100% { top: 90%; opacity: 0; }
}

/* Ultra-slow rotation for the background recycle icon */
.recycle-spin {
  animation: spin 80s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
