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

      <!-- Mockup Placeholder -->
      <div class="dashboard-mockup">
        <div class="mockup-header">
          <div class="mockup-logo"><strong>DinQor</strong>AI</div>
          <div class="mockup-new-chat">新建对话</div>
        </div>
        <div class="mockup-body">
          <div class="mockup-sidebar">
            <div class="sidebar-item active">对话</div>
            <div class="sidebar-item">创作</div>
            <div class="sidebar-item">图片</div>
            <div class="sidebar-item">知识库</div>
            <div class="sidebar-item">工作流</div>
          </div>
          <div class="mockup-main">
            <div class="greeting">上午好，欢迎回来 ✦</div>
            <div class="input-box">
              <span class="placeholder">你想要我帮你实现什么？</span>
              <div class="input-actions">
                <span class="action-btn">深度研究</span>
                <span class="action-btn">联网研究</span>
                <span class="action-btn">上传文件</span>
                <div class="send-btn">&uarr;</div>
              </div>
            </div>
          </div>
        </div>
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

/* --- Dashboard Mockup Placeholder --- */
.dashboard-mockup {
  width: 100%;
  max-width: 1000px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px 20px 0 0;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05), 
              0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 500px; /* Placeholder height */
}

.mockup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(0,0,0,0.05);

  .mockup-logo {
    font-size: 16px;
    color: #1a1a2e;
    strong { font-weight: 700; }
  }

  .mockup-new-chat {
    font-size: 13px;
    color: #4b5563;
    background: #f3f4f6;
    padding: 6px 12px;
    border-radius: 12px;
  }
}

.mockup-body {
  display: flex;
  flex: 1;
}

.mockup-sidebar {
  width: 200px;
  border-right: 1px solid rgba(0,0,0,0.05);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .sidebar-item {
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 14px;
    color: #6b7280;
    cursor: pointer;

    &.active {
      background: #eff6ff;
      color: #3b82f6;
      font-weight: 500;
    }
  }
}

.mockup-main {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  .greeting {
    font-size: 18px;
    color: #374151;
    font-weight: 500;
  }

  .input-box {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
    display: flex;
    flex-direction: column;
    gap: 40px;

    .placeholder {
      color: #9ca3af;
      font-size: 15px;
    }

    .input-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      
      .action-btn {
        font-size: 13px;
        color: #4b5563;
        background: #f9fafb;
        border: 1px solid #f3f4f6;
        padding: 6px 12px;
        border-radius: 12px;
      }

      .send-btn {
        margin-left: auto;
        width: 32px;
        height: 32px;
        background: #3b82f6;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
      }
    }
  }
}
</style>
