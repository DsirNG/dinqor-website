<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animId = 0
const isFading = ref(false)

interface Meteor {
  x: number
  y: number
  length: number
  speed: number
  size: number
  color: string
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

  const meteors: Meteor[] = []
  const colors = ['#3b82f6', '#6366f1', '#8b5cf6', '#60a5fa', '#38bdf8', '#a855f7']

  for (let i = 0; i < 35; i++) {
    meteors.push({
      x: Math.random() * canvas.width * 1.5 - canvas.width * 0.25,
      y: Math.random() * canvas.height * 0.6 - canvas.height * 0.3,
      length: Math.random() * 100 + 70,
      speed: Math.random() * 14 + 9,
      size: Math.random() * 2.2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    })
  }

  const startTime = Date.now()

  const render = () => {
    const elapsed = Date.now() - startTime
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw shooting meteors
    for (const m of meteors) {
      const grad = ctx.createLinearGradient(
        m.x, m.y,
        m.x - m.length * 0.7, m.y - m.length * 0.7
      )
      grad.addColorStop(0, m.color)
      grad.addColorStop(0.4, m.color)
      grad.addColorStop(1, 'rgba(0,0,0,0)')

      ctx.beginPath()
      ctx.moveTo(m.x, m.y)
      ctx.lineTo(m.x - m.length * 0.7, m.y - m.length * 0.7)
      ctx.strokeStyle = grad
      ctx.lineWidth = m.size
      ctx.lineCap = 'round'
      ctx.stroke()

      // Meteor head glowing dot
      ctx.beginPath()
      ctx.arc(m.x, m.y, m.size * 1.2, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()

      m.x += m.speed
      m.y += m.speed * 0.7

      if (m.x > canvas.width * 1.3 || m.y > canvas.height * 1.3) {
        m.x = Math.random() * canvas.width * 0.8 - canvas.width * 0.3
        m.y = -60
      }
    }

    if (elapsed > 2400) {
      isFading.value = true
    }

    if (elapsed < 3800) {
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
  <div class="meteor-shower-wrapper" :class="{ 'fade-out': isFading }">
    <canvas ref="canvasRef" class="meteor-canvas"></canvas>
  </div>
</template>

<style scoped>
.meteor-shower-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 95;
  pointer-events: none;
  transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.meteor-shower-wrapper.fade-out {
  opacity: 0;
}

.meteor-canvas {
  width: 100%;
  height: 100%;
}
</style>
