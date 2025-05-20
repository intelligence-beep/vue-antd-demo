<template>
  <div class="bg-white min-h-[1024px]">
    <nav class="fixed top-0 w-full bg-white shadow-sm z-50 transition-all duration-300" :class="{ 'shadow-lg': isScrolled }">
      <div class="max-w-[1440px] mx-auto px-8 h-16 flex items-center justify-between">
        <div class="flex items-center space-x-8">
          <a href="#" class="text-2xl font-['Pacifico'] text-primary hover:scale-110 transition-transform duration-300">logo</a>
          <div class="flex space-x-6">
            <a v-for="(item, index) in navItems" 
               :key="index" 
               :href="item.href" 
               class="text-gray-600 hover:text-primary transition-colors duration-300 relative group"
               :class="{ 'text-primary': item.active }">
              {{ item.text }}
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="relative group">
            <input type="text" placeholder="搜索文章..." class="w-64 h-10 pl-10 pr-4 text-sm bg-gray-100 border-none !rounded-button transition-all duration-300 focus:w-72 focus:ring-2 focus:ring-primary focus:ring-opacity-50">
            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors duration-300"></i>
          </div>
          <button class="w-10 h-10 flex items-center justify-center bg-gray-100 !rounded-button hover:bg-gray-200 transition-colors duration-300" @click="toggleTheme">
            <i class="fas fa-moon text-gray-600 hover:rotate-45 transition-transform duration-300"></i>
          </button>
        </div>
      </div>
    </nav>

    <section class="mt-16 relative h-[600px] overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center transform transition-transform duration-10000 hover:scale-110" :style="{ backgroundImage: `url('${heroImage}')` }"></div>
      <div class="relative h-full max-w-[1440px] mx-auto px-8 flex items-center">
        <div class="hero-bg w-1/2 p-12 rounded-lg animate-fade-in">
          <h1 class="text-5xl font-bold mb-6 animate-slide-up">探索 AI 与芯片技术的前沿</h1>
          <p class="text-xl text-gray-600 mb-8 animate-slide-up animation-delay-200">分享来自英伟达工程师的技术洞察、行业趋势分析与实践经验</p>
          <button @click="showHeroDetails = !showHeroDetails" class="bg-primary text-white px-8 py-3 !rounded-button hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300 animate-slide-up animation-delay-400">
            {{ showHeroDetails ? '收起详情' : '了解更多' }}
          </button>
          <div v-if="showHeroDetails" class="mt-6 animate-slide-up">
            <div class="grid grid-cols-2 gap-4">
              <div v-for="(stat, index) in heroStats" :key="index" class="bg-white bg-opacity-90 p-4 rounded-lg transform hover:scale-105 transition-all duration-300">
                <div class="text-2xl font-bold text-primary mb-1">{{ stat.value }}</div>
                <div class="text-sm text-gray-600">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-[1440px] mx-auto px-8 py-16">
      <h2 class="text-3xl font-bold mb-12 animate-fade-in">技术领域</h2>
      <div class="grid grid-cols-4 gap-8">
        <div v-for="(domain, index) in techDomains" 
             :key="index" 
             class="relative h-64 group overflow-hidden rounded-lg animate-fade-in cursor-pointer"
             :style="{ animationDelay: `${index * 200}ms` }"
             @click="selectedDomain = domain">
          <img :src="domain.image" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
          <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <div class="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h3 class="text-xl font-bold mb-2">{{ domain.title }}</h3>
              <p class="text-sm">{{ domain.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 领域详情弹窗 -->
      <div v-if="selectedDomain" 
           class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in"
           @click="selectedDomain = null">
        <div class="bg-white rounded-lg max-w-2xl w-full mx-4 p-8 transform transition-all duration-300"
             @click.stop>
          <div class="flex justify-between items-start mb-6">
            <h3 class="text-2xl font-bold">{{ selectedDomain.title }}</h3>
            <button @click="selectedDomain = null" class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <img :src="selectedDomain.image" class="w-full h-64 object-cover rounded-lg mb-6">
          <p class="text-gray-600 mb-6">{{ selectedDomain.description }}</p>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="(feature, index) in selectedDomain.features" :key="index" class="bg-gray-50 p-4 rounded-lg">
              <i :class="['fas', feature.icon, 'text-primary mb-2']"></i>
              <h4 class="font-bold mb-2">{{ feature.title }}</h4>
              <p class="text-sm text-gray-600">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-[1440px] mx-auto px-8 py-16">
      <div class="flex justify-between items-center mb-12">
        <h2 class="text-3xl font-bold animate-fade-in">技术文章</h2>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <select v-model="selectedCategory" class="h-10 pl-4 pr-8 text-sm bg-gray-100 border-none !rounded-button appearance-none">
              <option value="">全部分类</option>
              <option value="芯片设计">芯片设计</option>
              <option value="AI 技术">AI 技术</option>
              <option value="开发实践">开发实践</option>
              <option value="行业趋势">行业趋势</option>
            </select>
            <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          </div>
          <button class="text-primary hover:underline whitespace-nowrap transform hover:scale-105 transition-transform duration-300">查看全部</button>
        </div>
      </div>

      <!-- 文章列表 -->
      <div class="grid grid-cols-3 gap-8 mb-8">
        <article v-for="(article, index) in displayedArticles" 
                 :key="index" 
                 class="bg-white rounded-lg shadow-sm overflow-hidden animate-fade-in hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                 :style="{ animationDelay: `${index * 100}ms` }"
                 @click="selectedArticle = article">
          <img :src="article.image" class="w-full h-56 object-cover transition-transform duration-500 hover:scale-110">
          <div class="p-6">
            <div class="flex items-center space-x-2 mb-4">
              <span class="px-3 py-1 text-xs bg-primary bg-opacity-10 text-primary rounded-full">{{ article.category }}</span>
              <span class="text-sm text-gray-500">{{ article.date }}</span>
            </div>
            <h3 class="text-xl font-bold mb-3">{{ article.title }}</h3>
            <p class="text-gray-600 mb-4">{{ article.description }}</p>
            <button class="text-primary hover:underline transform hover:scale-105 transition-transform duration-300">阅读全文</button>
          </div>
        </article>
      </div>

      <!-- 分页控件 -->
      <div class="flex justify-center items-center space-x-4">
        <button 
          @click="currentPage--" 
          :disabled="currentPage === 1"
          class="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          <i class="fas fa-chevron-left mr-2"></i>上一页
        </button>
        <span class="text-gray-600">第 {{ currentPage }} 页，共 {{ totalPages }} 页</span>
        <button 
          @click="currentPage++" 
          :disabled="currentPage === totalPages"
          class="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          下一页<i class="fas fa-chevron-right ml-2"></i>
        </button>
      </div>

      <!-- 文章详情弹窗 -->
      <div v-if="selectedArticle" 
           class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in"
           @click="selectedArticle = null">
        <div class="bg-white rounded-lg max-w-4xl w-full mx-4 p-8 transform transition-all duration-300 max-h-[90vh] overflow-y-auto"
             @click.stop>
          <div class="flex justify-between items-start mb-6">
            <h3 class="text-2xl font-bold">{{ selectedArticle.title }}</h3>
            <button @click="selectedArticle = null" class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <img :src="selectedArticle.image" class="w-full h-96 object-cover rounded-lg mb-6">
          <div class="prose max-w-none">
            <p class="text-gray-600 mb-6">{{ selectedArticle.description }}</p>
            <div class="bg-gray-50 p-6 rounded-lg mb-6">
              <h4 class="font-bold mb-4">文章要点</h4>
              <ul class="list-disc list-inside space-y-2">
                <li v-for="(point, index) in selectedArticle.keyPoints" :key="index" class="text-gray-600">
                  {{ point }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gray-50 py-16">
      <div class="max-w-[1440px] mx-auto px-8">
        <h2 class="text-3xl font-bold mb-12 text-center">技术资源</h2>
        <div class="grid grid-cols-4 gap-8">
          <div v-for="(resource, index) in techResources" :key="index" class="bg-white p-8 rounded-lg text-center">
            <i :class="['text-4xl text-primary mb-6', resource.icon]"></i>
            <h3 class="text-xl font-bold mb-4">{{ resource.title }}</h3>
            <p class="text-gray-600 mb-6">{{ resource.description }}</p>
            <button class="bg-primary text-white px-6 py-2 !rounded-button hover:bg-opacity-90">{{ resource.buttonText }}</button>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-[1440px] mx-auto px-8 py-16">
      <div class="bg-gray-50 rounded-2xl p-12 flex items-center justify-between">
        <div class="max-w-xl">
          <h2 class="text-3xl font-bold mb-4">订阅技术周刊</h2>
          <p class="text-gray-600 mb-8">及时获取最新的技术动态、深度文章与行业洞察</p>
          <div class="flex space-x-4">
            <input v-model="email" type="email" placeholder="请输入您的邮箱" class="flex-1 h-12 px-4 bg-white border-none !rounded-button">
            <button class="bg-primary text-white px-8 h-12 !rounded-button hover:bg-opacity-90 whitespace-nowrap" @click="subscribe">立即订阅</button>
          </div>
        </div>
        <img :src="newsletterImage" class="w-96 h-72 object-cover rounded-lg">
      </div>
    </section>

    <footer class="bg-gray-900 text-white py-16">
      <div class="max-w-[1440px] mx-auto px-8">
        <div class="grid grid-cols-4 gap-8 mb-12">
          <div v-for="(section, index) in footerSections" :key="index">
            <h3 class="text-xl font-bold mb-6">{{ section.title }}</h3>
            <template v-if="section.content">
              <p class="text-gray-400">{{ section.content }}</p>
            </template>
            <template v-else>
              <ul class="space-y-3 text-gray-400">
                <li v-for="(item, itemIndex) in section.items" :key="itemIndex">{{ item }}</li>
              </ul>
            </template>
          </div>
        </div>
        <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© 2024 NVIDIA 技术博客. 本博客内容仅代表个人观点，与雇主立场无关。</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

const email = ref('');
const isDarkMode = ref(false);
const isScrolled = ref(false);

const heroImage = 'https://ai-public.mastergo.com/ai/img_res/d87e0a74e32826713ff2fb8d958b4412.jpg';

const showHeroDetails = ref(false);
const selectedDomain = ref(null);
const selectedArticle = ref(null);

const heroStats = [
  { value: '100+', label: '技术文章' },
  { value: '50+', label: '实战案例' },
  { value: '10+', label: '技术领域' },
  { value: '1000+', label: '读者订阅' }
];

const techDomains = [
  {
    title: '芯片设计',
    description: 'GPU 架构、并行计算、芯片制造工艺',
    image: 'https://ai-public.mastergo.com/ai/img_res/a16a1b5beb1937121fb14eea36d948cc.jpg',
    features: [
      {
        icon: 'fa-microchip',
        title: '架构创新',
        description: '探索新一代 GPU 架构设计与优化方案'
      },
      {
        icon: 'fa-cogs',
        title: '性能优化',
        description: '深入分析芯片性能瓶颈与优化策略'
      }
    ]
  },
  {
    title: 'AI 技术',
    description: '深度学习、计算机视觉、自然语言处理',
    image: 'https://ai-public.mastergo.com/ai/img_res/8f0ee0eb84fe4d8331b0e0508e26d372.jpg',
    features: [
      {
        icon: 'fa-brain',
        title: '深度学习',
        description: '前沿深度学习算法与应用实践'
      },
      {
        icon: 'fa-eye',
        title: '计算机视觉',
        description: '视觉算法优化与部署方案'
      }
    ]
  },
  {
    title: '行业趋势',
    description: '市场分析、技术演进、未来展望',
    image: 'https://ai-public.mastergo.com/ai/img_res/578aba96e4e4abcdc1fa9fc27471395c.jpg',
    features: [
      {
        icon: 'fa-chart-line',
        title: '市场分析',
        description: 'AI 芯片市场格局与发展趋势'
      },
      {
        icon: 'fa-lightbulb',
        title: '创新方向',
        description: '技术创新与未来发展方向'
      }
    ]
  },
  {
    title: '技术生态',
    description: 'CUDA、TensorRT、开发工具',
    image: 'https://ai-public.mastergo.com/ai/img_res/e77ef2a3639566fad5a3c4e91fe24025.jpg',
    features: [
      {
        icon: 'fa-code',
        title: '开发工具',
        description: 'CUDA 与 TensorRT 开发实践'
      },
      {
        icon: 'fa-tools',
        title: '优化方案',
        description: '性能优化与部署最佳实践'
      }
    ]
  }
];

const latestArticles = [
  {
    title: 'Hopper 架构深度解析：计算能力的新突破',
    description: '探讨 NVIDIA 最新 Hopper 架构的创新设计，包括 Transformer Engine 的工作原理与性能提升分析...',
    category: '芯片设计',
    date: '2024-02-20',
    image: 'https://ai-public.mastergo.com/ai/img_res/980ca2524a11f7b0338a518bd3ce220a.jpg',
    keyPoints: [
      'Hopper 架构的核心创新点分析',
      'Transformer Engine 的工作原理详解',
      '性能提升数据与优化策略',
      '实际应用场景与部署方案'
    ],
    content: `
      NVIDIA Hopper 架构代表了 GPU 计算领域的一次重大突破，特别是在 AI 和高性能计算方面。本文将深入分析 Hopper 架构的创新设计，探讨其如何重新定义计算性能的边界。

      ## 架构创新

      Hopper 架构最引人注目的创新是 Transformer Engine，这是专门为处理 Transformer 模型而设计的硬件加速器。Transformer Engine 通过动态混合精度计算，在保持精度的同时显著提升了计算效率。具体来说，它可以在 FP8 和 FP16 精度之间动态切换，根据计算需求自动选择最优精度，从而在性能和精度之间取得最佳平衡。

      在内存层次结构方面，Hopper 采用了第四代 Tensor Core 和更大的 L2 缓存，显著提升了数据访问效率。每个 SM（流处理器）现在配备了 256KB 的 L1 缓存，相比上一代增加了 33%。同时，L2 缓存容量提升至 50MB，为大规模 AI 模型提供了更好的数据局部性支持。

      ## 性能提升

      在实际应用中，Hopper 架构展现出了惊人的性能提升。以 GPT-3 175B 模型为例，在 Hopper 架构上运行时，相比上一代架构，推理性能提升了 3 倍，同时功耗效率提升了 2.5 倍。这些提升主要来自以下几个方面：

      1. 动态混合精度计算：通过智能选择计算精度，在保持模型精度的同时减少计算量
      2. 优化的内存访问：更大的缓存和更智能的预取机制减少了内存访问延迟
      3. 改进的并行处理：新的线程调度机制提高了计算资源利用率

      ## 应用场景

      Hopper 架构特别适合以下应用场景：

      ### 大规模语言模型
      - GPT-3、BERT 等 Transformer 模型的训练和推理
      - 实时对话系统
      - 多语言翻译服务

      ### 计算机视觉
      - 高分辨率图像处理
      - 实时视频分析
      - 3D 场景重建

      ### 科学计算
      - 分子动力学模拟
      - 气候模型计算
      - 流体动力学分析

      ## 部署建议

      为了充分发挥 Hopper 架构的性能，建议在部署时注意以下几点：

      1. 软件优化
      - 使用最新的 CUDA 12.0 或更高版本
      - 启用 TensorRT 8.0 的优化功能
      - 合理设置批处理大小，平衡吞吐量和延迟

      2. 系统配置
      - 确保 PCIe 4.0 或更高版本的支持
      - 配置足够的内存带宽
      - 优化散热方案，确保持续高性能运行

      3. 应用调优
      - 根据具体应用场景选择合适的精度
      - 优化数据布局，提高缓存命中率
      - 合理设置线程块大小，最大化并行效率

      ## 未来展望

      Hopper 架构的成功为未来的 GPU 发展指明了方向。我们可以预见：

      1. 更智能的精度管理：未来的架构可能会支持更细粒度的精度控制
      2. 更强的内存层次：可能会引入新的内存类型和访问机制
      3. 更灵活的并行处理：支持更多样化的并行计算模式

      总的来说，Hopper 架构不仅是一次技术突破，更是 AI 计算领域的重要里程碑。它通过创新的设计，为大规模 AI 应用提供了强大的计算支持，同时也为未来的 GPU 发展指明了方向。
    `
  },
  {
    title: '大语言模型推理优化实践指南',
    description: '基于实际项目经验，详细介绍 LLM 在 NVIDIA GPU 上的推理性能优化方法与最佳实践...',
    category: 'AI 技术',
    date: '2024-02-18',
    image: 'https://ai-public.mastergo.com/ai/img_res/af99efbc2b89d47f0551c2beff69ecda.jpg',
    keyPoints: [
      'LLM 推理性能瓶颈分析',
      'TensorRT 优化策略详解',
      '量化与模型压缩技术',
      '部署架构与最佳实践'
    ]
  },
  {
    title: '2024 AI 芯片市场趋势分析',
    description: '深入分析 AI 芯片市场格局、技术演进方向，以及未来发展机遇与挑战...',
    category: '行业趋势',
    date: '2024-02-15',
    image: 'https://ai-public.mastergo.com/ai/img_res/21d19c2b33f03dec4c77d9fb79a2e0e9.jpg',
    keyPoints: [
      '全球 AI 芯片市场格局分析',
      '技术演进路线图预测',
      '主要玩家竞争策略分析',
      '未来发展趋势与机遇'
    ]
  },
  {
    title: 'CUDA 编程最佳实践：从入门到精通',
    description: '系统介绍 CUDA 编程的核心概念、优化技巧和实战案例，帮助开发者快速掌握 GPU 并行计算...',
    category: '开发实践',
    date: '2024-02-12',
    image: 'https://ai-public.mastergo.com/ai/img_res/8f0ee0eb84fe4d8331b0e0508e26d372.jpg',
    keyPoints: [
      'CUDA 核心概念与编程模型',
      '内存访问优化策略',
      '并行算法设计模式',
      '性能分析与调优技巧'
    ]
  },
  {
    title: '计算机视觉算法在边缘设备上的优化部署',
    description: '探讨如何在资源受限的边缘设备上高效部署计算机视觉算法，包括模型压缩、推理优化等关键技术...',
    category: 'AI 技术',
    date: '2024-02-10',
    image: 'https://ai-public.mastergo.com/ai/img_res/a16a1b5beb1937121fb14eea36d948cc.jpg',
    keyPoints: [
      '边缘计算架构设计',
      '模型量化与剪枝技术',
      'TensorRT 部署优化',
      '实际应用案例分析'
    ]
  },
  {
    title: 'GPU 架构演进：从 Turing 到 Ada Lovelace',
    description: '深入分析 NVIDIA GPU 架构的演进历程，探讨各代架构的创新点与性能提升...',
    category: '芯片设计',
    date: '2024-02-08',
    image: 'https://ai-public.mastergo.com/ai/img_res/e77ef2a3639566fad5a3c4e91fe24025.jpg',
    keyPoints: [
      'Turing 架构创新回顾',
      'Ampere 架构突破分析',
      'Ada Lovelace 新特性详解',
      '架构演进趋势展望'
    ]
  },
  {
    title: '深度学习框架性能对比与优化指南',
    description: '全面对比主流深度学习框架在 NVIDIA GPU 上的性能表现，提供针对性的优化建议...',
    category: '开发实践',
    date: '2024-02-05',
    image: 'https://ai-public.mastergo.com/ai/img_res/578aba96e4e4abcdc1fa9fc27471395c.jpg',
    keyPoints: [
      '主流框架性能基准测试',
      '框架选择与优化策略',
      '混合精度训练实践',
      '分布式训练优化方案'
    ]
  },
  {
    title: 'AI 芯片设计中的功耗优化技术',
    description: '探讨 AI 芯片设计中的功耗优化策略，包括架构设计、工艺选择和电路优化等多个层面...',
    category: '芯片设计',
    date: '2024-02-03',
    image: 'https://ai-public.mastergo.com/ai/img_res/bf92e24923a00166aa5693a120d3248b.jpg',
    keyPoints: [
      '功耗分析模型与方法',
      '架构级优化策略',
      '电路级优化技术',
      '实际案例与效果分析'
    ]
  },
  {
    title: 'NVIDIA Omniverse 平台开发实践',
    description: '介绍 NVIDIA Omniverse 平台的核心功能、开发工具和实际应用案例，助力开发者构建下一代 3D 应用...',
    category: '开发实践',
    date: '2024-02-01',
    image: 'https://ai-public.mastergo.com/ai/img_res/d87e0a74e32826713ff2fb8d958b4412.jpg',
    keyPoints: [
      'Omniverse 平台架构解析',
      '开发工具与 SDK 使用',
      '实时渲染与物理模拟',
      '实际项目开发经验'
    ]
  },
  {
    title: 'TensorRT 8.0 新特性详解与性能优化',
    description: '深入解析 TensorRT 8.0 版本的新特性和性能优化策略，帮助开发者充分利用 GPU 加速能力...',
    category: '开发实践',
    date: '2024-01-28',
    image: 'https://ai-public.mastergo.com/ai/img_res/8f0ee0eb84fe4d8331b0e0508e26d372.jpg',
    keyPoints: [
      'TensorRT 8.0 核心功能更新',
      '量化与优化策略改进',
      '动态形状支持增强',
      '实际性能对比分析'
    ]
  },
  {
    title: 'GPU 加速的实时视频处理技术',
    description: '探讨如何利用 GPU 加速技术实现高质量实时视频处理，包括超分辨率、降噪和色彩增强等应用...',
    category: 'AI 技术',
    date: '2024-01-25',
    image: 'https://ai-public.mastergo.com/ai/img_res/a16a1b5beb1937121fb14eea36d948cc.jpg',
    keyPoints: [
      '视频处理算法优化',
      'CUDA 流处理技术',
      '实时性能调优方法',
      '实际应用案例分析'
    ]
  },
  {
    title: 'NVIDIA BlueField DPU 技术解析',
    description: '深入分析 NVIDIA BlueField DPU 的架构特点、应用场景和性能优势，探讨数据中心网络加速新方案...',
    category: '芯片设计',
    date: '2024-01-22',
    image: 'https://ai-public.mastergo.com/ai/img_res/e77ef2a3639566fad5a3c4e91fe24025.jpg',
    keyPoints: [
      'DPU 架构设计特点',
      '网络加速技术详解',
      '安全与隔离机制',
      '实际部署案例分析'
    ]
  },
  {
    title: 'AI 芯片测试与验证最佳实践',
    description: '系统介绍 AI 芯片测试验证的方法论、工具链和最佳实践，确保芯片质量和性能...',
    category: '芯片设计',
    date: '2024-01-20',
    image: 'https://ai-public.mastergo.com/ai/img_res/578aba96e4e4abcdc1fa9fc27471395c.jpg',
    keyPoints: [
      '测试验证流程设计',
      '自动化测试框架',
      '性能与功耗测试',
      '质量保证体系'
    ]
  },
  {
    title: 'NVIDIA Jetson 平台开发指南',
    description: '全面介绍 NVIDIA Jetson 系列开发套件的使用方法、优化技巧和实际应用案例...',
    category: '开发实践',
    date: '2024-01-18',
    image: 'https://ai-public.mastergo.com/ai/img_res/bf92e24923a00166aa5693a120d3248b.jpg',
    keyPoints: [
      'Jetson 平台架构解析',
      '开发环境搭建指南',
      '性能优化技巧',
      '实际项目开发经验'
    ]
  },
  {
    title: 'AI 芯片安全架构设计',
    description: '探讨 AI 芯片安全架构的设计原则、实现方法和最佳实践，保障芯片和系统安全...',
    category: '芯片设计',
    date: '2024-01-15',
    image: 'https://ai-public.mastergo.com/ai/img_res/980ca2524a11f7b0338a518bd3ce220a.jpg',
    keyPoints: [
      '安全威胁模型分析',
      '硬件安全机制设计',
      '安全启动与认证',
      '安全测试与验证'
    ]
  },
  {
    title: 'NVIDIA DOCA 开发框架实践',
    description: '详细介绍 NVIDIA DOCA 开发框架的使用方法、应用场景和最佳实践，助力 DPU 应用开发...',
    category: '开发实践',
    date: '2024-01-12',
    image: 'https://ai-public.mastergo.com/ai/img_res/af99efbc2b89d47f0551c2beff69ecda.jpg',
    keyPoints: [
      'DOCA 框架架构解析',
      '开发工具与 API 使用',
      '应用开发最佳实践',
      '性能优化技巧'
    ]
  },
  {
    title: 'AI 芯片散热设计优化',
    description: '深入探讨 AI 芯片散热设计的关键技术、优化方法和实际案例，确保芯片稳定运行...',
    category: '芯片设计',
    date: '2024-01-10',
    image: 'https://ai-public.mastergo.com/ai/img_res/21d19c2b33f03dec4c77d9fb79a2e0e9.jpg',
    keyPoints: [
      '散热设计原则',
      '热管理技术方案',
      '散热系统优化',
      '实际案例分析'
    ]
  }
];

const techResources = [
  {
    icon: 'fas fa-code',
    title: '示例代码',
    description: 'CUDA 优化、深度学习框架集成等实用代码示例',
    buttonText: '获取代码'
  },
  {
    icon: 'fas fa-book',
    title: '技术文档',
    description: '深入浅出的技术白皮书与最佳实践指南',
    buttonText: '查看文档'
  },
  {
    icon: 'fas fa-video',
    title: '视频教程',
    description: '专业的技术培训视频与实战案例讲解',
    buttonText: '观看视频'
  },
  {
    icon: 'fas fa-users',
    title: '技术社区',
    description: '加入开发者社区，分享交流技术心得',
    buttonText: '立即加入'
  }
];

const newsletterImage = 'https://ai-public.mastergo.com/ai/img_res/bf92e24923a00166aa5693a120d3248b.jpg';

const footerSections = [
  {
    title: '关于作者',
    content: '英伟达高级工程师，专注于 AI 芯片架构设计与深度学习优化'
  },
  {
    title: '技术专栏',
    items: ['GPU 架构设计', '深度学习优化', '并行计算', 'AI 芯片发展']
  },
  {
    title: '资源链接',
    items: ['技术文档', '示例代码', '视频教程', '开发者社区']
  },
  {
    title: '联系方式',
    items: ['Email: contact@example.com', 'GitHub: @nvidia-engineer', 'Twitter: @nvidia-tech']
  }
];

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
};

const subscribe = () => {
  if (email.value) {
    alert('订阅成功！');
    email.value = '';
  }
};

// 导航项
const navItems = [
  { text: '首页', href: '#', active: true },
  { text: '文章', href: '#', active: false },
  { text: '演示', href: '#', active: false },
  { text: '资源', href: '#', active: false },
  { text: '关于', href: '#', active: false }
];

// 监听滚动事件
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// 分页相关
const currentPage = ref(1);
const pageSize = 9;
const selectedCategory = ref('');

// 计算属性：根据分类筛选文章
const filteredArticles = computed(() => {
  if (!selectedCategory.value) {
    return latestArticles;
  }
  return latestArticles.filter(article => article.category === selectedCategory.value);
});

// 计算属性：当前页显示的文章
const displayedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return filteredArticles.value.slice(start, end);
});

// 计算属性：总页数
const totalPages = computed(() => {
  return Math.ceil(filteredArticles.value.length / pageSize);
});

// 监听分类变化，重置页码
watch(selectedCategory, () => {
  currentPage.value = 1;
});
</script>

<style scoped>
.hero-bg {
  background: linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0) 100%);
}

/* 动画类 */
.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

.animation-delay-400 {
  animation-delay: 400ms;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 添加平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 添加弹窗动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* 添加滚动条样式 */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 添加新的样式 */
.prose {
  max-width: 65ch;
  color: #374151;
}

.prose h4 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.75em;
}

.prose ul {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}

.prose li {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
</style> 