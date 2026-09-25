<script setup lang="ts">
import { ref } from 'vue'

const mockupWrapperRef = ref<HTMLElement | null>(null)
const mouseX = ref(0)
const mouseY = ref(0)

const handleMouseMove = (e: MouseEvent) => {
  if (!mockupWrapperRef.value) return
  const rect = mockupWrapperRef.value.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  mouseX.value = x
  mouseY.value = y
}

const handleMouseLeave = () => {
  mouseX.value = 0
  mouseY.value = 0
}
</script>

<template>
  <section class="hero-section">
    <!-- Opening Light-Themed Fluid Energy Spark Overlay -->
    <HomeFluidEnergySpark />

    <!-- Flowing Light WebGL Background -->
    <HomeFluidBackground />

    <div class="container hero-content">
      <div class="badge hero-anim-stagger-1">
        <span class="icon">✦</span>
        <span>AI Native Workspace</span>
      </div>

      <h1 class="headline">
        <span class="headline-line line-1">让 <span class="gradient-text text-ai">AI</span> 从回答问题，</span><br />
        <span class="headline-line line-2">到真正<span class="gradient-text text-finish">完成</span>工作。</span>
      </h1>

      <p class="description hero-anim-stagger-3">
        DinQorAI 将 AI 对话、内容创作、图片生成、知识管理与自动化工作流，<br />
        整合进一个统一的智能工作空间。
      </p>

      <div class="button-group hero-anim-stagger-4">
        <button class="btn btn-primary">免费开始 &rarr;</button>
        <button class="btn btn-outline">探索 DinQorAI &rarr;</button>
      </div>

      <!-- 3D Tilted Entrance Wrapper for Browser Mockup -->
      <div 
        ref="mockupWrapperRef"
        class="mockup-3d-stage"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
        :style="{
          transform: `perspective(1200px) rotateX(${8 - mouseY * 12}deg) rotateY(${mouseX * 12}deg)`
        }"
      >
        <home-computed/>
      </div>

    </div>
  </section>
</template>

<style scoped lang="scss">
.hero-section {
  position: relative;
  min-height: 100vh;
  padding-top: 150px;
  overflow: hidden;
  background-color: #f8fafc;
}

/* --- Content --- */
.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 20px;
  font-size: 13px;
  color: #4b5563;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
  
  .icon {
    color: #6366f1;
    font-size: 12px;
  }
}

.headline {
  font-size: 56px;
  line-height: 1.25;
  font-weight: 700;
  color: #111827;
  margin: 0 0 24px;
  letter-spacing: -0.02em;

  .gradient-text {
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .text-ai {
    background-image: linear-gradient(135deg, #3b82f6, #6366f1);
  }

  .text-finish {
    background-image: linear-gradient(135deg, #2563eb, #8b5cf6);
  }
}

/* Headline Left-to-Right Wipe Reveal Animation */
.headline-line {
  display: inline-block;
  opacity: 0;
  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  
  &.line-1 {
    animation: textLeftWipe 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 2.3s;
  }
  
  &.line-2 {
    animation: textLeftWipe 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 2.5s;
  }
}

.description {
  font-size: 18px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 40px;
  max-width: 700px;
}

.button-group {
  display: flex;
  gap: 16px;
  margin-bottom: 60px;

  .btn {
    padding: 12px 28px;
    border-radius: 24px;
    font-size: 15px;
    font-weight: 500;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .btn-primary {
    background-color: #3b76f6;
    color: #fff;
    box-shadow: 0 4px 14px rgba(59, 118, 246, 0.3);
    
    &:hover {
      background-color: #2563eb;
      box-shadow: 0 6px 20px rgba(59, 118, 246, 0.4);
    }
  }

  .btn-outline {
    background-color: rgba(255, 255, 255, 0.8);
    color: #4b5563;
    border: 1px solid #e5e7eb;
    
    &:hover {
      background-color: #fff;
      border-color: #d1d5db;
    }
  }
}

/* Staggered Animations */
.hero-anim-stagger-1 {
  opacity: 0;
  animation: fadeInDown 0.8s ease forwards;
  animation-delay: 2.1s;
}

.hero-anim-stagger-3 {
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
  animation-delay: 2.7s;
}

.hero-anim-stagger-4 {
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
  animation-delay: 2.9s;
}

/* 3D Tilted Mockup Entrance Stage */
.mockup-3d-stage {
  width: 100%;
  perspective: 1200px;
  transform-style: preserve-3d;
  opacity: 0;
  animation: mockup3DEnter 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 2.7s;
  transition: transform 0.25s cubic-bezier(0.2, 0, 0, 1);
}

@keyframes textLeftWipe {
  0% {
    opacity: 0;
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
    transform: translateX(-15px);
  }
  100% {
    opacity: 1;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    transform: translateX(0);
  }
}

@keyframes mockup3DEnter {
  0% {
    opacity: 0;
    transform: perspective(1200px) rotateX(24deg) translateY(140px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: perspective(1200px) rotateX(8deg) translateY(0) scale(1);
  }
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
