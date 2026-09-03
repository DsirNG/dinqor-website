<script setup lang="ts">
import { ref } from 'vue'

const menuItems = ref([
  { name: '首页', path: '/', active: true },
  { name: '产品', path: '/products', active: false },
  { name: '能力', path: '/capabilities', active: false },
  { name: '场景', path: '/scenarios', active: false },
  { name: '资源', path: '/resources', active: false },
])
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <div class="logo">
        <strong>DinQor</strong>AI
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
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1400px;
  height: 64px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 32px;
  padding: 0 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.logo {
  font-size: 20px;
  font-weight: 500;
  color: #1a1a2e;
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
