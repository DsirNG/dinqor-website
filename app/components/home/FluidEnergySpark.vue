<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animId = 0
const isFading = ref(false)

interface LightRay {
  x: number
  y: number
  targetX: number
  targetY: number
  length: number
  speed: number
  width: number
  color: string
  progress: number
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const centerX = canvas.width / 2
  const centerY = canvas.height * 0.45

  const rays: LightRay[] = []
  const colors = [
    'rgba(59, 130, 246, 0.4)',
    'rgba(99, 102, 241, 0.35)',
    'rgba(6, 182, 212, 0.35)',
    'rgba(139, 92, 246, 0.3)'
  ]

  for (let i = 0; i < 20; i++) {
    const angle = Math.random() * Math.PI * 2
    const dist = Math.random() * 400 + 300
    rays.push({
      x: centerX + Math.cos(angle) * dist,
      y: centerY + Math.sin(angle) * dist,
      targetX: centerX,
      targetY: centerY,
      length: Math.random() * 80 + 50,
      speed: Math.random() * 0.015 + 0.008,
      width: Math.random() * 2 + 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      progress: 0
    })
  }

  const startTime = Date.now()

  const render = () => {
    const elapsed = Date.now() - startTime
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Render converging light fluid rays
    for (const r of rays) {
      r.progress += r.speed
      if (r.progress > 1) r.progress = 1

      const curX = r.x + (r.targetX - r.x) * r.progress
      const curY = r.y + (r.targetY - r.y) * r.progress

      const dx = r.targetX - r.x
      const dy = r.targetY - r.y
      const angle = Math.atan2(dy, dx)

      const tailX = curX - Math.cos(angle) * r.length * (1 - r.progress * 0.5)
      const tailY = curY - Math.sin(angle) * r.length * (1 - r.progress * 0.5)

      const grad = ctx.createLinearGradient(curX, curY, tailX, tailY)
      grad.addColorStop(0, r.color)
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)')

      ctx.beginPath()
      ctx.moveTo(curX, curY)
      ctx.lineTo(tailX, tailY)
      ctx.strokeStyle = grad
      ctx.lineWidth = r.width
      ctx.lineCap = 'round'
      ctx.stroke()
    }

    if (elapsed > 2000) {
      isFading.value = true
    }

    if (elapsed < 3200) {
      animId = requestAnimationFrame(render)
    }
  }

  render()

  onBeforeUnmount(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', resize)
  })
})
</script>

<template>
  <div class="fluid-spark-wrapper" :class="{ 'fade-out': isFading }">
    <canvas ref="canvasRef" class="spark-canvas"></canvas>
  </div>
</template>

<style scoped>
.fluid-spark-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 95;
  pointer-events: none;
  transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.fluid-spark-wrapper.fade-out {
  opacity: 0;
}

.spark-canvas {
  width: 100%;
  height: 100%;
}
</style>
