<script setup lang="ts">
import { ref, onMounted } from 'vue'

const menuItems = ref([
  { name: '首页', path: '/', active: true },
  { name: '产品', path: '/products', active: false },
  { name: '能力', path: '/capabilities', active: false },
  { name: '场景', path: '/scenarios', active: false },
  { name: '资源', path: '/resources', active: false },
])

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})
</script>

<template>
  <header class="app-header" :class="{ 'anim-active': isLoaded }">
    <!-- Morphing Focal Point Glowing Aura -->
    <div class="header-morph-aura"></div>
    
    <div class="header-inner">
      <div class="logo">
        <img src="/logo-512.png" alt="Logo" class="logo-img" />
        <span><strong>DinQor</strong>AI</span>
      </div>
      
      <nav class="main-nav">
        <ul>
          <li v-for="item in menuItems" :key="item.name">
            <a :href="item.path" :class="{ active: item.active }">
              {{ item.name }}
              <span v-if="item.active" class="active-dot"></span>
            </a>
          </li>
        </ul>
      </nav>
      
      <div class="actions">
        <button class="login-btn">登录</button>
        <button class="primary-btn">免费开始</button>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  position: fixed;
  top: 20px;
  left: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  padding: 0 20px;
  pointer-events: none;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1400px;
  height: 64px;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 32px;
  padding: 0 24px;
  box-shadow: 
    0 10px 30px -5px rgba(15, 23, 42, 0.08),
    0 0 20px rgba(59, 130, 246, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.8);
  pointer-events: auto;
  opacity: 0;
  transform: translateY(30vh) scale(0.15);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
}

/* Staggered Content inside Nav Bar */
.logo, .main-nav, .actions {
  opacity: 0;
  transition: opacity 0.5s ease;
}

/* Sequence Animation trigger */
.app-header.anim-active .header-inner {
  animation: navMorphSequence 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 0.6s;
}

.app-header.anim-active .logo,
.app-header.anim-active .main-nav,
.app-header.anim-active .actions {
  animation: navContentFade 0.6s ease forwards;
  animation-delay: 2.6s;
}

@keyframes navMorphSequence {
  0% {
    opacity: 0;
    transform: translateY(32vh) scale(0.2);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    box-shadow: 0 0 50px rgba(59, 130, 246, 0.6), 0 0 100px rgba(147, 197, 253, 0.8);
    background: #ffffff;
  }
  30% {
    opacity: 1;
    transform: translateY(32vh) scale(1.15);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    box-shadow: 0 0 60px rgba(59, 130, 246, 0.7), 0 0 120px rgba(99, 102, 241, 0.5);
    background: linear-gradient(135deg, #ffffff, #dbeafe);
  }
  65% {
    opacity: 1;
    transform: translateY(0) scale(1);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    box-shadow: 0 0 40px rgba(59, 130, 246, 0.3);
    background: #ffffff;
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    width: 100%;
    max-width: 1400px;
    height: 64px;
    border-radius: 32px;
    box-shadow: 
      0 10px 30px -5px rgba(15, 23, 42, 0.08),
      0 0 20px rgba(59, 130, 246, 0.1),
      inset 0 0 0 1px rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.85);
  }
}

@keyframes navContentFade {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 500;
  color: #1a1a2e;
  
  .logo-img {
    width: 28px;
    height: 28px;
    object-fit: contain;
  }
  
  strong {
    font-weight: 700;
  }
}

.main-nav {
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 32px;
  }
  
  a {
    position: relative;
    font-size: 15px;
    color: #4b5563;
    font-weight: 500;
    transition: color 0.3s ease;
    
    &:hover, &.active {
      color: #3b76f6;
    }
  }
  
  .active-dot {
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    background-color: #3b76f6;
    border-radius: 50%;
  }
}

.actions {
  display: flex;
  align-items: center;
  gap: 20px;

  .login-btn {
    font-size: 15px;
    font-weight: 500;
    color: #4b5563;
    transition: color 0.3s;
    &:hover {
      color: #1a1a2e;
    }
  }

  .primary-btn {
    background-color: #3b76f6;
    color: white;
    padding: 8px 20px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.3s;
    &:hover {
      background-color: #2563eb;
    }
  }
}
</style>
