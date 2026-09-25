<script setup lang="ts">
import { ref, computed } from 'vue'
import { MorphIcon } from 'morphicons/vue'
import { 
  MessageSquare, Sparkles, Database, Workflow,
  Paperclip, BookOpen, Image as ImageIcon, Globe, Search, Edit3, 
  LayoutTemplate, GitBranch, Cpu, Dna, FileText, Code,
  Plus, Bot, GraduationCap, Wrench, Compass, Plug, Clock, Check
} from 'lucide'

const activeTab = ref<'chat' | 'creative' | 'knowledge' | 'workflow'>('chat')

const tabs = [
  { id: 'chat', label: '智能对话', icon: MessageSquare, tag: 'Reasoning' },
  { id: 'creative', label: '多模态创作', icon: Sparkles, tag: 'Studio' },
  { id: 'knowledge', label: '向量知识库', icon: Database, tag: 'RAG 2.0' },
  { id: 'workflow', label: '自动化工作流', icon: Workflow, tag: 'NodeFlow' },
] as const

const currentIcon = computed(() => {
  const current = tabs.find(t => t.id === activeTab.value)
  return current ? current.icon : MessageSquare
})

const promptInput = ref('')

// Top sidebar navigation items drawing inspiration from modern AI workspace layout
const topNavItems = [
  { id: 'new-task', label: '新建任务', icon: Plus, isPrimary: true },
  { id: 'agent', label: '智能 Agent', icon: Bot },
  { id: 'skill', label: 'Skill 工坊', icon: Wrench },
  { id: 'explore', label: '应用探索', icon: Compass },
  { id: 'connector', label: '数据连接器', icon: Plug },
  { id: 'automation', label: '自动化流', icon: Clock }
]

const activeTopItem = ref('new-task')

// Task items (conversations) matching user requested topics
const taskList = ref([
  {
    id: 'task-1',
    title: '全栈 AI Portal 快速搭建',
    userMsg: '用 Vue3 + Nuxt3 帮我生成一个支持 AI 知识库搜索与图表展示的企业级 Portal',
    thinkingTime: '用时 2.5秒',
    thinkingText: '正在分析用户提问“全栈 AI Portal 快速搭建”。调用 DinQor CodeGen & Component Library 架构，自动解析企业级 Dashboard 的布局规范、CSS 主题 Token 以及数据图表组件...',
    cmdTitle: '加载框架与模版依赖',
    cmdContent: '加载模版：Nuxt3 SSR Template, ECharts Vue, Tailwind Tokens, RAG Search API\n校验依赖：全套生产级 TypeScript 类型支持',
    fileTitle: 'AppPortal_Dashboard.vue',
    fileContent: '• AppPortal_Dashboard.vue\n• ChartWidget.vue\n• nuxt.config.ts',
    aiTextHtml: `已为您成功生成 <strong>企业级全栈 AI Portal 应用</strong> 完整模版！<br><br>
    • <strong>核心架构</strong>：Nuxt3 服务端渲染 (SSR) + ECharts 实时数据大屏分析。<br>
    • <strong>知识库整合</strong>：内置向量检索 Search Bar 组件，支持一键调取向量数据库切片。<br>
    • <strong>快捷导出</strong>：您可以在右侧【创作中心】实时预览或下载源码压缩包。`
  },
  {
    id: 'task-2',
    title: '智能财报分析与风险预警',
    userMsg: '对 2026 第一季度科技企业财报数据进行 KPI 提取并生成风险预警评估',
    thinkingTime: '用时 3.8秒',
    thinkingText: '正在调取 Financial LLM Skill 与 SEC 财报解析器，提取 EBITDA、自由现金流以及研发投入比等核心指标...',
    cmdTitle: '执行数据提取与风险回归模型',
    cmdContent: '执行分析流：PDF Document OCR -> Financial Metric Parsing -> Anomaly Detection Model\n处理数据量：42 页 PDF 财报白皮书',
    fileTitle: 'Financial_Q1_Analysis_Report.pdf',
    fileContent: '• Financial_Q1_Analysis_Report.pdf\n• Risk_Assessment_Matrix.csv',
    aiTextHtml: `✅ <strong>2026 Q1 财报分析与风险评估结论如下：</strong><br><br>
    • <strong>核心指标 (KPI)</strong>：研发费用同比增加 32.4%，经营性现金流保持稳健 (增长 18.2%)。<br>
    • <strong>风险预警</strong>：供应链短期应付款项周转天数略有拉长，已自动触发 Level-2 预警提醒。<br>
    • <strong>结论建议</strong>：建议优化短期流动资金配置，持续加码 Agent 核心研发。`
  },
  {
    id: 'task-3',
    title: '自动化工作流节点配置',
    userMsg: '设计一个从 Webhook 接收邮件通知、经 AI 总结后自动分发至 Slack 和 Jira 的工作流',
    thinkingTime: '用时 1.8秒',
    thinkingText: '正在调用 AutoFlow 可视化工作流引擎，构建触发器 (Trigger) -> AI 决策节点 (Agent) -> 多通道输出 (Actions) 的事件流...',
    cmdTitle: '构建分布式 Flow 事件链',
    cmdContent: '构建工作流节点图：Mail Webhook -> DinQor Summarizer Node -> Jira Task Creator & Slack Notification\n链路延迟：< 120ms',
    fileTitle: 'Email_To_Jira_Workflow.json',
    fileContent: '• Email_To_Jira_Workflow.json\n• Webhook_Parser_Config.yaml',
    aiTextHtml: `🚀 <strong>自动化工作流已配置完毕并成功发布！</strong><br><br>
    • <strong>事件触发源</strong>：新邮件到达 (Incoming Webhook)<br>
    • <strong>AI 处理节点</strong>：DinQor 智能总结器（提取紧急程度、责任人与行动项）<br>
    • <strong>闭环动作</strong>：秒级自动创建 Jira Issue 并在团队 Slack 频道推送简报。`
  }
])

const activeTaskId = ref('task-1')

const currentTask = computed(() => {
  return taskList.value.find(t => t.id === activeTaskId.value) || taskList.value[0]
})

const selectTask = (taskId: string) => {
  activeTaskId.value = taskId
  activeTab.value = 'chat'
}

const handleTopItemClick = (itemId: string) => {
  activeTopItem.value = itemId
  if (itemId === 'new-task') {
    const newId = `task-${Date.now()}`
    const newTaskObj = {
      id: newId,
      title: '新建 AI 智能对话',
      userMsg: '你好！请协助我处理新的工作任务。',
      thinkingTime: '用时 1秒',
      thinkingText: '已为您开启全新推理会话，正在初始化上下文与工具链...',
      cmdTitle: '初始化 Agent 运行环境',
      cmdContent: '加载默认 Skill: Deep Reasoning, Web Search, Code Generator',
      fileTitle: 'New_Session_Context.json',
      fileContent: '• New_Session_Context.json',
      aiTextHtml: '您好！我是 DinQorAI 助手。请问今天有什么可以帮您处理的任务？'
    }
    taskList.value.unshift(newTaskObj)
    activeTaskId.value = newId
    activeTab.value = 'chat'
    promptInput.value = ''
  }
}

// Collapsible Thinking Process States
const isThinkingExpanded = ref(true)
const isCommandsExpanded = ref(false)
const isFilesExpanded = ref(false)

// Input Plus Menu & Model Selector States
const isPlusMenuOpen = ref(false)
const selectedModel = ref('高')
const isModelDropdownOpen = ref(false)

const models = ['高', '标准', '快速', 'Ultra 4.5']

const togglePlusMenu = () => {
  isPlusMenuOpen.value = !isPlusMenuOpen.value
}

const selectPluginAction = (name: string) => {
  promptInput.value = `[使用 ${name}] `
  isPlusMenuOpen.value = false
}

const pluginList = [
  { icon: Paperclip, name: '添加照片和文件', desc: '从电脑上传' },
  { icon: BookOpen, name: '从资料库添加', desc: '浏览和搜索你的文件' },
  { icon: ImageIcon, name: '创建图像', desc: '可视化呈现任何内容' },
  { icon: Globe, name: '网页搜索', desc: '查找实时新闻和信息' },
  { icon: Search, name: '深度研究', desc: '获取详细报告' },
  { icon: Edit3, name: '绘图', desc: '绘制并附加图像' },
  { icon: LayoutTemplate, name: 'Figma', desc: 'Create designs, ship to code' },
  { icon: GitBranch, name: 'GitHub', desc: 'Triage PRs, issues, CI, and publish flows' },
  { icon: Cpu, name: 'OpenAI Platform', desc: 'Manage OpenAI API keys and view organization billing and API usage.' }
]

const quickTags = [
  { label: '深度推理', icon: Dna },
  { label: '联网搜索', icon: Globe },
  { label: '文件分析', icon: FileText },
  { label: '代码生成', icon: Code }
]

const samplePrompt = (text: string) => {
  promptInput.value = text
}
</script>

<template>
  <div class="browser-mockup-wrapper">
    <!-- Ambient Tech Glow Behind Browser -->
    <div class="ambient-glow glow-1"></div>
    <div class="ambient-glow glow-2"></div>

    <div class="browser-window chrome-style">
      <!-- Google Chrome Tab Strip -->
      <div class="chrome-tab-strip">
        <!-- Active Chrome Tab -->
        <div class="chrome-tab active">
          <div class="tab-favicon">
            <img src="@/assets/favicon.ico" alt="dinqor">
          </div>
          <span class="tab-title">DinQor AI Workspace</span>
          <button class="tab-close-btn">&times;</button>
        </div>

        <!-- Add New Tab Button -->
        <button class="chrome-new-tab-btn" title="新建标签页">+</button>

        <!-- Chrome Right Window Controls -->
        <div class="chrome-window-controls">
          <button class="win-btn minimize" title="最小化">&#8212;</button>
          <button class="win-btn maximize" title="最大化">&#9633;</button>
          <button class="win-btn close" title="关闭">&#10005;</button>
        </div>
      </div>

      <!-- Google Chrome Toolbar (Omnibox & Navigation) -->
      <div class="chrome-toolbar">
        <div class="chrome-nav-buttons">
          <button class="nav-btn" title="后退">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>
          <button class="nav-btn disabled" title="前进">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
          <button class="nav-btn" title="重新加载此页">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
          </button>
        </div>

        <!-- Chrome Omnibox Address Bar -->
        <div class="chrome-omnibox">
          <div class="omnibox-security">
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
              <path d="M10 5H9.33333V3.66667C9.33333 1.82572 7.84095 0.333336 6 0.333336C4.15905 0.333336 2.66667 1.82572 2.66667 3.66667V5H2C0.89543 5 0 5.89543 0 7V12C0 13.1046 0.89543 14 2 14H10C11.1046 14 12 13.1046 12 12V7C12 5.89543 11.1046 5 10 5ZM4 3.66667C4 2.5621 4.89543 1.66667 6 1.66667C7.10457 1.66667 8 2.5621 8 3.66667V5H4V3.66667Z" fill="#10B981"/>
            </svg>
          </div>
          <span class="url-protocol">https://</span>
          <span class="url-domain">dinqor.cn</span>
          <span class="url-path">/workspace</span>
          
          <div class="omnibox-actions">
            <span class="star-icon" title="将此页加入书签">★</span>
          </div>
        </div>

        <!-- Chrome Profile & Extension Tools -->
        <div class="chrome-profile-tools">
          <div class="profile-avatar" title="Google 账号">Dai</div>
        </div>
      </div>

      <!-- Main Web App Window Container -->
      <div class="app-container">
        <!-- Sidebar Navigation -->
        <aside class="app-sidebar">
          <!-- Top Menu Items -->
          <nav class="sidebar-top-nav">
            <button 
              v-for="item in topNavItems" 
              :key="item.id"
              class="sidebar-nav-item"
              :class="{ active: activeTopItem === item.id }"
              @click="handleTopItemClick(item.id)"
            >
              <MorphIcon :icon="item.icon" :size="16" class="nav-icon" />
              <span class="item-label">{{ item.label }}</span>
            </button>
          </nav>

          <!-- Task/Conversation Section -->
          <div class="sidebar-section">
            <div class="section-title">近期对话</div>
            <div class="task-list">
              <button 
                v-for="task in taskList" 
                :key="task.id"
                class="task-item"
                :class="{ active: activeTaskId === task.id }"
                @click="selectTask(task.id)"
              >
                <MorphIcon :icon="Check" :size="14" class="check-icon" />
                <span class="task-title-text">{{ task.title }}</span>
              </button>
            </div>
          </div>

          <!-- Footer User Profile Card -->
          <div class="sidebar-footer">
            <div class="user-profile-card">
              <div class="user-avatar">Dai</div>
              <span class="user-name">Dai</span>
            </div>
          </div>
        </aside>

        <!-- Main Exhibition Stage Area -->
        <main class="app-main-stage">

          <!-- TAB 1: 智能对话 展示 -->
          <div v-if="activeTab === 'chat'" class="tab-content chat-view">
            <!-- Simulated Chat History -->
            <div class="chat-thread">
              <!-- User Message -->
              <div class="chat-row user-row">
                <div class="chat-bubble user-bubble">
                  {{ currentTask.userMsg }}
                </div>
              </div>

              <!-- AI Assistant Message -->
              <div class="chat-row ai-row">
                <div class="chat-bubble ai-bubble">
                  <!-- AI Thinking Process Card -->
                  <div class="thinking-process-card">
                    <div class="thinking-toggle-header" @click="isThinkingExpanded = !isThinkingExpanded">
                      <span class="thinking-time">{{ currentTask.thinkingTime }}</span>
                      <svg class="toggle-arrow" :class="{ rotated: isThinkingExpanded }" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>

                    <div v-if="isThinkingExpanded" class="thinking-body">
                      <p class="thinking-text">
                        {{ currentTask.thinkingText }}
                      </p>

                      <!-- Sub Collapsible 1: Commands -->
                      <div class="sub-collapse">
                        <div class="sub-collapse-header" @click="isCommandsExpanded = !isCommandsExpanded">
                          <MorphIcon :icon="Search" :size="14" class="sub-icon" />
                          <span class="sub-title">{{ currentTask.cmdTitle }}</span>
                          <svg class="toggle-arrow" :class="{ rotated: isCommandsExpanded }" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                        <div v-if="isCommandsExpanded" class="sub-collapse-content" style="white-space: pre-line;">
                          {{ currentTask.cmdContent }}
                        </div>
                      </div>

                      <!-- Sub Collapsible 2: Files -->
                      <div class="sub-collapse">
                        <div class="sub-collapse-header" @click="isFilesExpanded = !isFilesExpanded">
                          <MorphIcon :icon="FileText" :size="14" class="sub-icon" />
                          <span class="sub-title">{{ currentTask.fileTitle }}</span>
                          <svg class="toggle-arrow" :class="{ rotated: isFilesExpanded }" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                        <div v-if="isFilesExpanded" class="sub-collapse-content" style="white-space: pre-line;">
                          {{ currentTask.fileContent }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="ai-text" v-html="currentTask.aiTextHtml"></div>
                </div>
              </div>
            </div>

            <!-- Bottom Sticky Chat Input Bar -->
            <div class="chat-input-sticky">
              <!-- Plus Function Popover Menu -->
              <Transition name="popover-fade">
                <div v-if="isPlusMenuOpen" class="plus-menu-popover">
                  <div class="plus-menu-list">
                    <div 
                      v-for="(plugin, index) in pluginList" 
                      :key="index" 
                      class="plus-menu-item"
                      @click="selectPluginAction(plugin.name)"
                    >
                      <span class="plugin-icon">
                        <MorphIcon :icon="plugin.icon" :size="18" />
                      </span>
                      <div class="plugin-info">
                        <span class="plugin-name">{{ plugin.name }}</span>
                        <span class="plugin-desc">{{ plugin.desc }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="plus-menu-footer">
                    输入以搜索插件、文件、文件夹和技能
                  </div>
                </div>
              </Transition>

              <!-- Pill Input Bar -->
              <div class="input-pill-bar">
                <!-- Plus Button -->
                <button class="btn-plus" :class="{ active: isPlusMenuOpen }" @click="togglePlusMenu" title="功能菜单">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>

                <!-- Input Text Field -->
                <input 
                  v-model="promptInput" 
                  type="text" 
                  class="input-pill-field" 
                  placeholder="发送消息..."
                />

                <!-- Right Actions -->
                <div class="input-right-actions">
                  <!-- Model Selector Dropdown -->
                  <div class="model-select-badge" @click="isModelDropdownOpen = !isModelDropdownOpen">
                    <span>{{ selectedModel }}</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    
                    <div v-if="isModelDropdownOpen" class="model-dropdown">
                      <div 
                        v-for="m in models" 
                        :key="m" 
                        class="model-option"
                        :class="{ active: selectedModel === m }"
                        @click.stop="selectedModel = m; isModelDropdownOpen = false"
                      >
                        {{ m }}
                      </div>
                    </div>
                  </div>

                  <!-- Microphone Button -->
                  <button class="btn-icon btn-mic" title="语音输入">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                  </button>

                  <!-- Send Circle Button -->
                  <button class="btn-send-circle" title="发送">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 2: 多模态创作 展示 -->
          <div v-else-if="activeTab === 'creative'" class="tab-content creative-view">
            <div class="creative-grid">
              <div class="creative-card">
                <div class="card-tag">智能图文排版</div>
                <h3 class="card-title">全自动营销长文与配图</h3>
                <p class="card-desc">输入一句主题，自动完成逻辑提纲、高质量文案撰写，并由内置 AI 绘画模块配套高精插图。</p>
                <div class="preview-mini-canvas">
                  <div class="mini-art-box">
                    <div class="art-gradient"></div>
                    <span class="art-label">AI Art Engine 4.0</span>
                  </div>
                  <div class="mini-text-lines">
                    <div class="line l-80"></div>
                    <div class="line l-100"></div>
                    <div class="line l-60"></div>
                  </div>
                </div>
              </div>

              <div class="creative-card highlight">
                <div class="card-tag">代码与UI原型</div>
                <h3 class="card-title">自然语言直接渲染组件</h3>
                <p class="card-desc">直接通过对话生成 Vue3 / React 响应式 UI 组件，实时预览并支持一键导出生产级代码。</p>
                <div class="preview-mini-code">
                  <div class="code-badge">&lt;Template Showcase /&gt;</div>
                  <div class="code-lines">
                    <div class="line-blue">const agent = useDinQorEngine()</div>
                    <div class="line-purple">await agent.compileUI()</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 3: 向量知识库 展示 -->
          <div v-else-if="activeTab === 'knowledge'" class="tab-content knowledge-view">
            <div class="rag-visualizer shadow-card">
              <div class="rag-header">
                <div class="rag-title">
                  <span class="pulse-icon">●</span> 企业专有向量检索阵列 (Multi-Modal Hybrid RAG)
                </div>
                <div class="rag-stats">
                  <span class="stat-pill">已切片: 1,420,800 块</span>
                  <span class="stat-pill accent">向量维度: 1536d</span>
                </div>
              </div>

              <div class="rag-nodes-grid">
                <div class="node-card active-node">
                  <div class="node-icon">📚</div>
                  <div class="node-info">
                    <div class="node-name">产品文档 & API Specification</div>
                    <div class="node-meta">同步状态: 实时更新 • 匹配度 99.1%</div>
                  </div>
                </div>
                <div class="node-card">
                  <div class="node-icon">💼</div>
                  <div class="node-info">
                    <div class="node-name">客户沟通记录 & CRM 知识网</div>
                    <div class="node-meta">已关联 12,400 份对话数据</div>
                  </div>
                </div>
                <div class="node-card">
                  <div class="node-icon">📊</div>
                  <div class="node-info">
                    <div class="node-name">财务与法务规章数据库</div>
                    <div class="node-meta">加密隔离等级: Enterprise L4</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 4: 自动化工作流 展示 -->
          <div v-else-if="activeTab === 'workflow'" class="tab-content workflow-view">
            <div class="flow-canvas shadow-card">
              <div class="flow-nodes-wrapper">
                <div class="flow-node node-trigger">
                  <div class="node-badge">触发源 (Trigger)</div>
                  <div class="node-title">⚡ 收到新需求邮件/消息</div>
                </div>

                <div class="flow-arrow">&rarr;</div>

                <div class="flow-node node-agent">
                  <div class="node-badge">AI Agent 处理节点</div>
                  <div class="node-title">🧠 DinQor 自动提取与意图识别</div>
                </div>

                <div class="flow-arrow">&rarr;</div>

                <div class="flow-node node-action">
                  <div class="node-badge">响应动作 (Action)</div>
                  <div class="node-title">🚀 分发至 Jira 并通知团队</div>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.browser-mockup-wrapper {
  position: relative;
  width: 100%;
  max-width: 1140px;
  height: 720px;
  margin: 40px auto 0;
  padding: 0 16px;
}

/* Background Ambient Glows */
.ambient-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  z-index: 0;
  pointer-events: none;
  opacity: 0.7;

  &.glow-1 {
    top: -40px;
    left: 15%;
    width: 450px;
    height: 450px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(59, 130, 246, 0) 70%);
  }

  &.glow-2 {
    bottom: -40px;
    right: 15%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0) 70%);
  }
}

/* Main Browser Frame Shell (Google Chrome Style) */
.browser-window {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 
    0 20px 50px -10px rgba(15, 23, 42, 0.14),
    0 0 35px rgba(59, 130, 246, 0.12),
    0 0 0 1px rgba(226, 232, 240, 0.9);
  text-align: left;
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    box-shadow: 
      0 28px 60px -10px rgba(15, 23, 42, 0.18),
      0 0 45px rgba(99, 102, 241, 0.15),
      0 0 0 1px rgba(203, 213, 225, 1);
  }
}

/* Chrome Tab Strip Header */
.chrome-tab-strip {
  display: flex;
  align-items: flex-end;
  background: #dee1e6;
  padding: 8px 12px 0;
  gap: 6px;
  position: relative;
  user-select: none;
}

.chrome-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  font-size: 12px;
  max-width: 220px;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  transition: background 0.15s ease;

  .tab-favicon {
    width: 13px;
    height: 13px;
    color: #2563eb;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .tab-title {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #3c4043;
    font-weight: 500;
  }

  .tab-close-btn {
    background: transparent;
    border: none;
    color: #5f6368;
    font-size: 14px;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background: #dadce0;
      color: #202124;
    }
  }

  &.active {
    background: #ffffff;
    box-shadow: 0 -1px 3px rgba(0,0,0,0.05);

    .tab-title {
      color: #1d4ed8;
      font-weight: 600;
    }
  }

  &.inactive {
    background: transparent;

    &:hover {
      background: #d0d3d8;
    }
  }
}

.chrome-new-tab-btn {
  background: transparent;
  border: none;
  color: #5f6368;
  font-size: 16px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 4px;

  &:hover {
    background: #d0d3d8;
    color: #202124;
  }
}

.chrome-window-controls {
  margin-left: auto;
  display: flex;
  align-items: center;
  margin-bottom: 6px;

  .win-btn {
    background: transparent;
    border: none;
    color: #5f6368;
    font-size: 12px;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background: #dadce0;

      &.close {
        background: #e81123;
        color: #ffffff;
      }
    }
  }
}

/* Chrome Toolbar (Omnibox) */
.chrome-toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  background: #ffffff;
  border-bottom: 1px solid #e1e3e6;
}

.chrome-nav-buttons {
  display: flex;
  align-items: center;
  gap: 4px;

  .nav-btn {
    background: transparent;
    border: none;
    color: #5f6368;
    padding: 6px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover:not(.disabled) {
      background: #f1f3f4;
      color: #202124;
    }

    &.disabled {
      color: #dadce0;
      cursor: default;
    }
  }
}

.chrome-omnibox {
  flex: 1;
  display: flex;
  align-items: center;
  background: #f1f3f4;
  border: 1px solid transparent;
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 13px;
  transition: all 0.2s ease;

  &:hover {
    background: #e8eaed;
  }

  .omnibox-security {
    display: flex;
    align-items: center;
  }

  .url-protocol { color: #80868b; }
  .url-domain { color: #202124; font-weight: 600; }
  .url-path { color: #5f6368; }

  .omnibox-actions {
    margin-left: auto;
    color: #5f6368;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      color: #fbbc04;
    }
  }
}

.chrome-profile-tools {
  display: flex;
  align-items: center;
  gap: 8px;

  .extension-icon {
    width: 28px;
    height: 28px;
    background: #eff6ff;
    color: #2563eb;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    cursor: pointer;
  }

  .profile-avatar {
    width: 28px;
    height: 28px;
    background: linear-gradient(135deg, #457aed, #caffbb);
    color: #ffffff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }
}

/* Web App Container Layout */
.app-container {
  display: flex;
  flex: 1;
  min-height: 0;
  background: #ffffff;
  overflow: hidden;
}

/* Sidebar Layout */
.app-sidebar {
  width: 230px;
  height: 100%;
  background: #f8fafc;
  border-right: 1px solid #f1f5f9;
  padding: 16px 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-shrink: 0;
  overflow-y: auto;
  user-select: none;
}

.sidebar-top-nav {
  display: flex;
  flex-direction: column;
  gap: 3px;

  .sidebar-nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 8px 12px;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: #374151;
    font-size: 13.5px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;

    .nav-icon {
      color: #4b5563;
      flex-shrink: 0;
    }

    .item-label {
      flex: 1;
      text-align: left;
    }

    &:hover {
      background: #f1f5f9;
      color: #111827;
    }

    &.active {
      background: #e2e8f0;
      color: #0f172a;
      font-weight: 600;

      .nav-icon {
        color: #0f172a;
      }
    }
  }
}

.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 6px;

  .section-title {
    font-size: 12px;
    font-weight: 500;
    color: #9ca3af;
    padding: 4px 12px 2px;
  }

  .task-list {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .task-item {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 8px 10px;
      border-radius: 8px;
      border: none;
      background: transparent;
      color: #374151;
      font-size: 13px;
      font-weight: 400;
      text-align: left;
      cursor: pointer;
      transition: background 0.15s ease, color 0.15s ease;

      .check-icon {
        color: #6b7280;
        flex-shrink: 0;
      }

      .task-title-text {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &:hover {
        background: #f1f5f9;
        color: #111827;
      }

      &.active {
        background: #e5e7eb;
        color: #111827;
        font-weight: 600;

        .check-icon {
          color: #111827;
        }
      }
    }
  }
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 12px;

  .user-profile-card {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 10px;
    background: transparent;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover {
      background: #f1f5f9;
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3b82f6, #6366f1);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
      flex-shrink: 0;
      box-shadow: 0 2px 6px rgba(59, 130, 246, 0.25);
    }

    .user-name {
      font-size: 14px;
      font-weight: 600;
      color: #1f2937;
    }
  }
}

/* Main Stage */
.app-main-stage {
  flex: 1;
  min-width: 0;
  min-height: 0;
  height: 100%;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  background: #fafafa;
  overflow: hidden;
}

.stage-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f5f9;

  .view-title {
    font-size: 20px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 4px;
    display: flex;
    align-items: center;
    gap: 8px;

    .title-icon {
      font-size: 20px;
    }
  }

  .view-subtitle {
    font-size: 13px;
    color: #64748b;
    margin: 0;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 10px;

    .badge-tech {
      font-size: 11px;
      color: #6366f1;
      background: #eef2;
      border: 1px solid #e0e7ff;
      padding: 4px 10px;
      border-radius: 12px;
      font-weight: 600;
    }

    .btn-sm-primary {
      background: linear-gradient(135deg, #2563eb, #4f46e5);
      color: #ffffff;
      border: none;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);
    }
  }
}

/* Tab Content Areas */
.tab-content {
  flex: 1;
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Chat View */
.chat-thread {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 12px;
  overflow-y: auto;
  padding-right: 6px;
}

.chat-row {
  display: flex;
  gap: 12px;

  &.user-row {
    flex-direction: row-reverse;
  }
}

.user-avatar {
  width: 32px;
  height: 32px;
  background: #3b82f6;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
}

.ai-avatar {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

.chat-bubble {
  padding: 14px 18px;
  border-radius: 14px;
  font-size: 13.5px;
  line-height: 1.55;

  &.user-bubble {
    background: #2563eb;
    color: #ffffff;
  }

  &.ai-bubble {
    color: #0d0d0d;
    border-bottom-left-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  }
}

.ai-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;

  .model-name {
    font-weight: 700;
    font-size: 12px;
    color: #4f46e5;
  }

  .thinking-time {
    font-size: 11px;
    color: #94a3b8;
  }
}

/* AI Thinking Process Card (Matching Image 1) */
.thinking-process-card {
  background: transparent;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 16px;
  margin-bottom: 12px;

  .thinking-toggle-header {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #64748b;
    font-weight: 500;
    cursor: pointer;
    user-select: none;
    padding: 4px 8px;
    border-radius: 6px;
    transition: background 0.15s ease;

    &:hover {
      background: #f1f5f9;
      color: #334155;
    }

    .toggle-arrow {
      transition: transform 0.2s ease;
      &.rotated {
        transform: rotate(180deg);
      }
    }
  }

  .thinking-body {
    margin-top: 10px;
    padding-left: 8px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .thinking-text {
      margin: 0;
      font-size: 13.5px;
      color: #334155;
      line-height: 1.6;
    }

    .sub-collapse {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      background: #f8fafc;
      overflow: hidden;

      .sub-collapse-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        font-size: 12.5px;
        color: #475569;
        font-weight: 500;
        cursor: pointer;
        user-select: none;

        &:hover {
          background: #f1f5f9;
        }

        .sub-icon {
          font-size: 14px;
        }

        .sub-title {
          flex: 1;
        }

        .toggle-arrow {
          color: #94a3b8;
          transition: transform 0.2s ease;
          &.rotated {
            transform: rotate(180deg);
          }
        }
      }

      .sub-collapse-content {
        padding: 10px 12px;
        font-size: 12px;
        color: #64748b;
        line-height: 1.5;
        border-top: 1px solid #e2e8f0;
        background: #ffffff;
      }
    }
  }
}

/* Chat Bottom Sticky Input Bar (Matching Image 2 & 3) */
.chat-input-sticky {
  position: relative;
  margin-top: auto;
  padding-top: 8px;
}

/* Plus Popover Menu (Matching Image 3) */
.plus-menu-popover {
  position: absolute;
  bottom: 58px;
  left: 0;
  right: 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 
    0 12px 32px -4px rgba(15, 23, 42, 0.14),
    0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  z-index: 10;
}

.plus-menu-list {
  max-height: 280px;
  overflow-y: auto;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.plus-menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #f1f5f9;
  }

  .plugin-icon {
    font-size: 18px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .plugin-info {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;

    .plugin-name {
      font-size: 13px;
      font-weight: 600;
      color: #0f172a;
    }

    .plugin-desc {
      font-size: 12px;
      color: #94a3b8;
    }
  }
}

.plus-menu-footer {
  padding: 10px 16px;
  background: #f8fafc;
  border-top: 1px solid #f1f5f9;
  font-size: 11.5px;
  color: #94a3b8;
  text-align: left;
}

/* Popover Transition */
.popover-fade-enter-active,
.popover-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.popover-fade-enter-from,
.popover-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Pill Input Bar (Matching Image 2) */
.input-pill-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 24px;
  padding: 6px 8px 6px 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus-within {
    border-color: #3b82f6;
    box-shadow: 0 4px 14px rgba(59, 130, 246, 0.15);
  }

  .btn-plus {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: transparent;
    border: none;
    color: #475569;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.15s ease, transform 0.2s ease;

    &:hover, &.active {
      background: #f1f5f9;
      color: #0f172a;
    }

    &.active {
      transform: rotate(45deg);
    }
  }

  .input-pill-field {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 14px;
    color: #0f172a;
    font-family: inherit;

    &::placeholder {
      color: #94a3b8;
    }
  }

  .input-right-actions {
    display: flex;
    align-items: center;
    gap: 6px;

    .model-select-badge {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: #475569;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 4px 8px;
      border-radius: 12px;
      cursor: pointer;
      user-select: none;
      transition: background 0.15s ease;

      &:hover {
        background: #f1f5f9;
        color: #0f172a;
      }

      .model-dropdown {
        position: absolute;
        bottom: 32px;
        right: 0;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        padding: 4px;
        z-index: 20;
        min-width: 90px;

        .model-option {
          padding: 6px 10px;
          font-size: 12px;
          color: #475569;
          border-radius: 6px;
          cursor: pointer;

          &:hover, &.active {
            background: #eff6ff;
            color: #2563eb;
            font-weight: 600;
          }
        }
      }
    }

    .btn-mic {
      background: transparent;
      border: none;
      color: #475569;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        background: #f1f5f9;
        color: #0f172a;
      }
    }

    .btn-send-circle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #2563eb;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(37, 99, 235, 0.3);
      transition: background 0.15s ease, transform 0.15s ease;

      &:hover {
        background: #1d4ed8;
        transform: scale(1.05);
      }
    }
  }
}

.quick-prompts {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  .prompt-chip {
    font-size: 11.5px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    color: #475569;
    padding: 4px 10px;
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: #93c5fd;
      color: #1d4ed8;
      background: #eff6ff;
    }
  }
}

.input-box-wrapper {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);

  .chat-textarea {
    width: 100%;
    border: none;
    outline: none;
    resize: none;
    font-size: 13.5px;
    color: #1e293b;
    font-family: inherit;

    &::placeholder {
      color: #94a3b8;
    }
  }

  .input-bottom-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #f1f5f9;

    .tools-left {
      display: flex;
      gap: 6px;

      .tool-btn {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        padding: 4px 8px;
        font-size: 11.5px;
        color: #64748b;
        cursor: pointer;

        &.active-tool {
          background: #eff6ff;
          border-color: #bfdbfe;
          color: #2563eb;
          font-weight: 500;
        }
      }
    }

    .send-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #2563eb;
      color: #ffffff;
      border: none;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s ease;

      &:hover {
        background: #1d4ed8;
      }
    }
  }
}

/* Creative & Other Tab Views */
.creative-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 10px;
}

.creative-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

  &.highlight {
    border-color: #bfdbfe;
    background: linear-gradient(180deg, #ffffff 0%, #f0f9ff 100%);
  }

  .card-tag {
    font-size: 11px;
    color: #2563eb;
    background: #dbeafe;
    padding: 2px 8px;
    border-radius: 10px;
    display: inline-block;
    margin-bottom: 8px;
    font-weight: 600;
  }

  .card-title {
    font-size: 16px;
    color: #0f172a;
    margin: 0 0 6px;
  }

  .card-desc {
    font-size: 12.5px;
    color: #64748b;
    margin: 0 0 16px;
    line-height: 1.5;
  }

  .preview-mini-canvas {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 12px;

    .art-gradient {
      height: 80px;
      background: linear-gradient(135deg, #a855f7, #3b82f6, #06b6d4);
      border-radius: 6px;
      margin-bottom: 10px;
    }

    .art-label {
      font-size: 10px;
      color: #94a3b8;
    }
  }

  .preview-mini-code {
    background: #0f172a;
    color: #38bdf8;
    border-radius: 8px;
    padding: 12px;
    font-family: monospace;
    font-size: 11px;

    .code-badge {
      color: #f472b6;
      margin-bottom: 8px;
    }
  }
}

/* RAG Visualizer View */
.rag-visualizer {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;

  .rag-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f1f5f9;

    .rag-title {
      font-weight: 700;
      color: #0f172a;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 6px;

      .pulse-icon {
        color: #10b981;
      }
    }

    .stat-pill {
      font-size: 11px;
      background: #f1f5f9;
      color: #475569;
      padding: 4px 8px;
      border-radius: 6px;
      margin-left: 6px;

      &.accent {
        background: #eff6ff;
        color: #2563eb;
        font-weight: 600;
      }
    }
  }

  .rag-nodes-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .node-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;

      &.active-node {
        border-color: #bfdbfe;
        background: #eff6ff;
      }

      .node-icon {
        font-size: 20px;
      }

      .node-name {
        font-weight: 600;
        font-size: 13px;
        color: #1e293b;
      }

      .node-meta {
        font-size: 11px;
        color: #64748b;
      }
    }
  }
}

/* Workflow Canvas View */
.flow-canvas {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 30px;

  .flow-nodes-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    .flow-node {
      flex: 1;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 16px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);

      &.node-trigger { border-left: 4px solid #3b82f6; }
      &.node-agent { border-left: 4px solid #8b5cf6; background: #faf5ff; }
      &.node-action { border-left: 4px solid #10b981; }

      .node-badge {
        font-size: 10px;
        color: #64748b;
        text-transform: uppercase;
        margin-bottom: 6px;
        font-weight: 600;
      }

      .node-title {
        font-size: 13px;
        font-weight: 700;
        color: #0f172a;
      }
    }

    .flow-arrow {
      color: #94a3b8;
      font-size: 18px;
      font-weight: bold;
    }
  }
}

/* Responsive adjustments */
@media (max-width: 900px) {
  .app-container {
    flex-direction: column;
  }

  .app-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
  }

  .creative-grid {
    grid-template-columns: 1fr;
  }

  .flow-nodes-wrapper {
    flex-direction: column;

    .flow-arrow {
      transform: rotate(90deg);
    }
  }
}
</style>
