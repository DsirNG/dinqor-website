<script setup lang="ts">
// HeroSection Component
</script>

<template>
  <section class="hero-section">
    <!-- Flowing Light WebGL Background -->
    <HomeFluidBackground />

    <div class="container hero-content">
      <div class="badge">
        <span class="icon">✦</span>
        <span>AI Native Workspace</span>
      </div>

      <h1 class="headline">
        让 <span class="gradient-text text-ai">AI</span> 从回答问题，<br />
        到真正<span class="gradient-text text-finish">完成</span>工作。
      </h1>

      <p class="description">
        DinQorAI 将 AI 对话、内容创作、图片生成、知识管理与自动化工作流，<br />
        整合进一个统一的智能工作空间。
      </p>

      <div class="button-group">
        <button class="btn btn-primary">免费开始 &rarr;</button>
        <button class="btn btn-outline">探索 DinQorAI &rarr;</button>
      </div>

      <home-computed/>

    </div>
  </section>
</template>

<style scoped lang="scss">
.hero-section {
  position: relative;
  min-height: 100vh;
  padding-top: 150px;
  overflow: hidden;
  background-color: #f8fafc; /* Base light background */
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
  line-height: 1.2;
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

</style>
