# DeepSeek Harness 介绍站

介绍 [DeepSeek Harness（dsh）](https://github.com/deepseek-ai)——DeepSeek 开源的智能体运行框架（MIT）的**多页面介绍网站**。

**核心命题：Agent = Model + Harness**
**形态：Vite + React 工程 · 8 页卖点式多页面 · Canvas 影绘长转场（4.6s）· 38 枚动效插件全部上岗**

## 运行

```bash
npm install
npm run dev      # 开发（5173）
npm run build    # 构建 → dist/
npm run preview  # 预览构建产物
```

## 页面结构（8 页 · hash 路由 #p1~#p8）

| 页 | 卖点 | 核心交互 |
|----|------|---------|
| P1 封面 | Agent = Model + Harness | Dot Grid 点阵 · 章节导航 7 枚 |
| P2 问题 | 纯模型的困境 | 三痛点卡 + Text Type 双终端对比 |
| P3 骨架 | Agent = Model + Harness 的含义 | 四枚可拔插件芯片（Agent 实时劣化）+ 执行循环 + Split Flap 状态板 |
| P4 六大决定 | 长期运行的六个设计决定 | bento 内嵌 CallChip / Counter / HoldButton 现场演示 |
| P5 一切皆插件 | 六类插槽契约 | GlideSelect 换脑 / CallChip / Counter / HoldButton / LatticeLoader / PixelCard 六行交互 |
| P6 案例陈列 | 33 枚动效插件现场演示 | PillNav 分类 + demo 网格（文字/光标/卡片/微交互/背景五类） |
| P7 生态 | dsh-superagent 值班 | Card Swap 汇报轮播 + Counter 在线秒数 |
| P8 上手与开源 | 三步上手 + MIT | 上手三步卡 + Split Flap 完播 + Dock 页尾导航 + CTA |

**转场**：翻页先播 4.6s Canvas 影绘动画（点阵波浪 → 主词点阵 → 黑白块翻转波 → 回弹放大冲出 → 白场收束衔接浅色页面），另有穿越擦除 2.4s / 闪帧故障 1.5s 两种模式（右上角 GlideSelect 切换，默认自动轮播）。

## 结构

```
src/
├── rb/            # 38 个 React Bits 组件（jsx + css，来自本地 Skill 索引）
├── pages/         # 8 个卖点页
├── engine.jsx     # 转场引擎（影绘 Canvas + 分镜 DOM + chrome/pager）
├── icons.jsx      # 共享线性图标
├── App.jsx        # 页面注册 + 舞台装配
└── styles/global.css  # 全局令牌与页面样式
```

## 踩坑记录

1. **移植组件必须 JSX+CSS 成对搬**——漏 `.shiny-text` 的 `background-clip: text` 会让光带文字变实心色块
2. **stage 塌缩**：自动高度父级里 `flex: 1` + 纯绝对定位子元素 → min-content 为 0
3. React 18 UMD 对 `inert={false}` 会渲染 `inert="false"`，须写 `inert={cond ? '' : undefined}`
4. 转场 busy 锁用布尔+定时器会被 clearTimers 误清，用时间戳 `busyUntil`
5. **Vite 迁移必补 import**：单文件版的 `React.xxx`/`gsap`/`window.SplitText` 全局引用全部要显式 import；插件名与组件名冲突用 `as` 别名
6. **App 漏 `import React` 时 React.Fragment 静默失败**——树卸载、root 空、无 overlay，需靠 onUncaughtError 钩子 + console.error 劫持定位
7. bash 内联 python -c 写含模板串/反引号的代码会被 shell 转义搞坏——一律 Write 落文件

## 声明

- 社区宣传页，与 DeepSeek 官方无关
- React Bits 组件遵循上游 MIT + Commons Clause
