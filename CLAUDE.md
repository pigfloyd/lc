# CLAUDE.md

本文件为 Claude Code（claude.ai/code）在此仓库中工作时提供指导。

## 项目概述

一本面向语言学研究生学习 Python 定量分析的交互式 React 教材。涵盖 11 个单元 + 附录，从 Python 基础到混合效应模型。每个章节是独立的 React 组件（非 markdown）—— 内容力求可视化、动画化和交互式。

## 命令

```bash
npm run dev       # 启动开发服务器（http://localhost:5173）
npm run build     # 类型检查后构建生产版本（输出目录：dist/）
npm run preview   # 本地预览生产构建
```

构建执行 `tsc -b && vite build`。TypeScript 错误会阻止构建。

## 架构

### 内容系统（最需要理解的部分）

内容以 React 组件形式组织在 `src/content/` 中，按单元划分：

```
src/content/
  unit-0/         # 学前准备（3 节）
  unit-1/         # Python 最简生存包（6 节）
  ...
  unit-11/        # 研究设计与伦理（4 节）
  appendix/       # 6 个附录项
```

**章节的渲染流程：**

1. `src/data/contentManifest.ts` — **单一数据源**。`CONTENT_SECTIONS[]` 里每个条目声明一个章节文件，并同时映射到两条导航路径：`researchModule`（研究路径模块，可为 `null` 表示只进工具箱）和 `toolkitCategory`（工具箱分类，必填——保证任何章节都不会成为孤儿）。`buildResearchUnits()` / `buildToolkitUnits()` 由此生成两套单元结构。
2. `src/data/units.ts` — 导航 hooks 与向后兼容层。`useResearchUnits()` / `useToolkitUnits()` 返回本地化后的两条路径；legacy `UNITS[]` **从 manifest 自动派生**（结构来自 `componentPath` 目录，中文标题来自 `zh/units.json`），仅用于兼容旧 `/unit/unit-X/...` URL，**不要手工编辑**。
3. `src/data/registry.ts` — 将 `(unitId, sectionId)` 映射到 `React.lazy(() => import(...))`，另有扁平的 `manifestComponentMap`（章节 id 全局唯一）供任意路径的 URL 解析组件。每个章节是一个独立的代码分割块。
4. `SectionPage`（`src/pages/SectionPage.tsx`）— 读取路由参数，通过 `resolveSectionComponent()` 查找懒加载组件，在 `<Suspense>` 中渲染，加载时显示骨架屏。

**双路径导航：** 侧边栏顶部有"研究路径 / 工具箱"切换（`navMode`，存于 SidebarContext + localStorage）。研究路径按研究问题组织（精选，部分章节合并/省略）；工具箱按工具类型组织（全集）。同一章节在两条路径下的 URL 不同（unitId 分别是模块 id / 分类 id），但都能解析。

**添加新章节内容（编辑已有章节）：**
1. 编辑 `src/content/<unit>/<section-id>.tsx` 文件
2. 完成 — manifest 和导航数据无需更改

**新增/删除/调整章节：**
1. 在 `src/content/<unit>/` 中创建对应的 `.tsx` 文件
2. 在 `src/data/contentManifest.ts` 的 `CONTENT_SECTIONS[]` 中添加条目（含 researchModule / toolkitCategory 映射；章节 id 必须全局唯一）
3. 在 `src/data/registry.ts` 中添加懒加载导入项
4. 向 `zh/units.json` 和 `ja/units.json` 添加标题条目（`unit-X.sections.<id>`）
5. 可选：在 `src/data/taskIndex.ts` 中补充"按任务反查"条目、在 `src/data/quizData.ts` 中补充问卷推荐

`src/data/units.ts` 的 `UNITS[]` 会自动跟随 manifest，无需改动。

### 路由

七条路由，全部包裹在提供侧边栏外壳的 `Layout` 中：

| 路由 | 页面 | 用途 |
|---|---|---|
| `/` | HomePage | 单元卡片网格（随 navMode 切换）及导航/索引/附录入口 |
| `/navigator` | NavigatorPage | 研究问题导航问卷（答题 → 推荐模块） |
| `/lookup` | TaskLookupPage | 按任务反查工具索引（"我要做 X 用什么"，可搜索） |
| `/unit/:unitId` | UnitPage | 单元概览及章节列表 |
| `/unit/:unitId/:sectionId` | SectionPage | 内容（懒加载的章节组件） |
| `/appendix/:appendixId` | AppendixPage | 附录内容 |
| `*` | NotFoundPage | 404 |

### 侧边栏行为

- `SidebarContext`（`src/context/SidebarContext.tsx`）维护哪些单元已展开以及移动端侧边栏是否打开。
- 桌面端（≥1024px）：侧边栏固定 18rem 宽度，始终可见。
- 移动端（<1024px）：侧边栏以浮层方式滑入，带遮罩背景。
- 导航到某个章节时通过 `expandUnit()` 自动展开其父级单元。
- 当前活跃章节以蓝色左边框高亮。

### 关键组件关系

```
App
└── SidebarProvider
    └── Routes
        └── Layout                  ← flex 容器：Sidebar + 内容区域
            ├── Sidebar             ← 读取 units.ts 的双路径 hooks，使用 SidebarContext
            │   ├── UnitNavItem     ← 可折叠，在 SidebarContext 中切换
            │   └── SectionNavItem  ← NavLink，高亮活跃路由
            └── <Outlet />          ← 页面内容（HomePage/UnitPage/SectionPage/...）
                ├── Breadcrumb      ← 通过 useAnyUnit 读取标题（当前路径 → 另一路径 → legacy 依次解析）
                ├── [SectionComponent]  ← 从 registry.ts 懒加载
                └── SectionFooter   ← 使用 getPrevSectionForMode/getAdjacentSectionForMode 的上一页/下一页链接
```

### 样式

通过 `@tailwindcss/vite` 插件使用 Tailwind CSS v4。`src/index.css` 中的自定义 `.content-prose` 类提供教科书级别的排版（标题、代码块、表格、引用块），无需依赖 typography 插件。各章节组件可使用这些类或完全自定义的布局。

### 国际化（中文 / 日文）

由 `i18next` + `react-i18next` 管理（`src/i18n/index.ts`）。语言偏好保存在 localStorage 中。

- **翻译文件**：`src/i18n/locales/{zh,ja}/common.json`（界面字符串）和 `units.json`（所有单元/章节/附录标题及描述）
- **`useLocalizedUnits()` / `useLocalizedAppendix()`** hooks 位于 `src/data/units.ts` — 返回翻译为当前语言的 `UNITS[]` / `APPENDIX_SECTIONS[]` 数据。若翻译键缺失则回退到中文。
- **`LanguageSwitcher`** 组件（`src/components/shared/LanguageSwitcher.tsx`）渲染 中/日 切换按钮，放置在侧边栏头部。
- 组件使用 `useTranslation('common')` 获取界面字符串，使用 `useLocalizedUnits()` 获取导航数据。原始的 `UNITS[]` / `getUnitById()` 等仍可用于纯数据查询（非显示文本）。
- 添加新单元/章节内容时，需同时向 `zh/units.json` 和 `ja/units.json` 添加对应条目。

### 写作指南

AI 生成的教程内容必须尽可能简单易懂。使用动画、交互、可视化、图表及任何其他手段降低难度门槛 — 目标是即使技术背景最少的读者也能直观理解复杂的定量概念。宁可展示，不要说教。日文内容先不生成，只生成中文的。

## 教程制作提示词

以下是制作每个章节时应遵循的核心原则和具体方法。

### 核心理念：让弱智也能理解

写每个章节时，假设读者是**完全零基础的小学生**。用故事、动画、游戏化的方式解释概念，而不是教科书式的定义。每个抽象概念都要有一个**具体的、可视化的隐喻**。

### 章节结构模板

每个章节应遵循以下节奏：

1. **开场故事/动画** — 用一个生动的比喻或小故事引入概念。不用定义开头，用场景开头。
   - 例：讲循环 → 小兔子拔萝卜（一个一个拔，拔完为止）
   - 例：讲变量 → 贴标签的盒子
   - 例：讲条件判断 → 红绿灯路口
2. **概念可视化** — 把抽象概念变成看得见的东西。用 emoji、颜色、动画演示。
3. **代码对照** — 把动画/故事中的每一步，对应到 Python 代码。读者先理解了"做什么"，再看"怎么写"。
4. **交互式演示** — 让读者可以点、拖、调参数，亲眼看到变化。每个重要概念至少有一个可交互的演示。
5. **语言学实战** — 用一个真实的语言学场景，把刚学的概念用起来。
6. **练习** — 3-5 个小练习，从一个简单的开始，逐步增加难度。

### 动画设计原则

- **每个 demo 讲一件事**。不要在一个动画里塞太多概念。
- **用 emoji 代替文字**。🐰🥕🍪 比"变量 x 在循环中被赋值"直观 100 倍。
- **播放/重置按钮**。每个动画都要有 ▶ 播放和 ↺ 重置按钮，让读者可以反复看。
- **分步可点**。除了自动播放，最好还能一步步手动点，方便讲解。
- **高亮当前**。正在处理的那个元素要明显放大/变色，让读者一眼看到"现在到谁了"。
- **过去淡出**。已经处理完的要变淡/变小，帮助读者建立"已处理→正处理→未处理"的空间感。

### 可复用的动画模式

以下模式已在循环章节中验证有效，可直接复用到其他章节：

| 模式 | 适用场景 | 实现要点 |
|---|---|---|
| 逐个处理动画 | for 循环、列表遍历 | setInterval + useState，逐个高亮列表元素 |
| 累积收集动画 | 循环结果收集、数据聚合 | 每步追加到数组，用 motion 动画展示新增 |
| 进度条/水位线 | while 循环、计数、阈值 | 渐变填充 + 数字显示，实时反映进度 |
| 参数滑块 | range()、切片、阈值 | range input 绑定参数，实时重算结果 |
| 柱状图增长 | 词频统计、数据可视化 | 动态 height，渐变色柱体 |
| 对话气泡 | 等待用户操作时提示 | AnimatePresence + 条件渲染 |

### 代码块使用规则

- 代码块中**高亮正在执行的那一行**（用 `highlightLines` 属性），和动画同步
- 先用**纯文字**描述代码在做什么，再展示代码
- 重要的语法要点用**代码注释**标在代码里，不要单独写一段文字
- 对比"笨办法 vs 聪明办法"时，用红/绿双栏并列

### 语言风格

- 用"你"不用"读者"；用"我们"不用"笔者"
- 用口语化表达："搞定"、"太棒了"、"来看看"、"试试看"
- 避免长段落。每个段落最多 3-4 句话。
- 关键概念用 **加粗**，代码用 `code`，不要反过来
- 用感叹号和 emoji 增加亲和力，但不要过度（一个段落最多 1 个感叹号）

### 不要做的事

- ❌ 不要以"XX 是 YY 的一种编程结构"这种教科书定义开头
- ❌ 不要先给语法再给例子——先给例子再给语法
- ❌ 不要写超过 10 行的纯文本段落
- ❌ 不要在动画/可视化之前展示大段代码
- ❌ 不要列举所有可能的用法——只教最常用的 2-3 种
- ❌ 不要用"详见官方文档"逃避解释
- ❌ 不要返回内容为空的组件或无用的状态
- ❌ 不要看旧的章节实现——每个章节独立设计，不受之前风格限制

### 依赖

- `framer-motion` — 可用于章节组件中的动画
- `react-router-dom` v7 — 路由
- `i18next` + `react-i18next` — 国际化
- 无状态管理库 — `SidebarContext` 是唯一的共享状态

<!-- ### 点子

- 教程模式可以参考：https://www.xiaohongshu.com/explore/6a3a767a00000000110184ee?app_platform=ios&app_version=9.34.4&share_from_user_hidden=true&xsec_source=app_share&type=video&xsec_token=CBxdF1QuWbg0CgeQ_Tgo0PVXrwh2YpFd0FrnfB14ISfpk=&author_share=1&xhsshare=WeixinSession&shareRedId=OD84QTc6OTw2NzUyOTgwNjhFOTg9O0xN&apptime=1782303916&share_id=81d526d8f6bd4f47a11704f51249ceb2&wechatWid=105278e7f47eadbc4ad8b5c71c8eaed7&wechatOrigin=menu -->
