# AGENTS.md

本文件为 Codex（Codex.ai/code）在此仓库中工作时提供指导。

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

1. `src/data/units.ts` — 静态导航数据。`UNITS[]` 数组定义每个单元的 id、标题、描述和有序章节列表。辅助函数 `getUnitById()`、`getSectionMeta()`、`getAdjacentSection()`、`getPrevSection()` 驱动所有导航。
2. `src/data/registry.ts` — 将 `(unitId, sectionId)` 映射到 `React.lazy(() => import(...))`。每个章节是一个独立的代码分割块。
3. `SectionPage`（`src/pages/SectionPage.tsx`）— 读取路由参数，通过 `getSectionComponent()` 查找懒加载组件，在 `<Suspense>` 中渲染，加载时显示骨架屏。

**添加新章节内容：**
1. 编辑 `src/content/<unit>/<section-id>.tsx` 文件
2. 完成 — 注册表和导航数据无需更改

**添加/删除/调整章节顺序：**
1. 更新 `src/data/units.ts` 中的 `UNITS[]`（或附录的 `APPENDIX_SECTIONS[]`）
2. 在 `src/content/<unit>/` 中创建对应的 `.tsx` 文件
3. 在 `src/data/registry.ts` 中添加/更新懒加载导入项

### 路由

五条路由，全部包裹在提供侧边栏外壳的 `Layout` 中：

| 路由 | 页面 | 用途 |
|---|---|---|
| `/` | HomePage | 单元卡片网格及附录链接 |
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
            ├── Sidebar             ← 读取 units.ts，使用 SidebarContext
            │   ├── UnitNavItem     ← 可折叠，在 SidebarContext 中切换
            │   └── SectionNavItem  ← NavLink，高亮活跃路由
            └── <Outlet />          ← 页面内容（HomePage/UnitPage/SectionPage/...）
                ├── Breadcrumb      ← 从 units.ts 读取标题
                ├── [SectionComponent]  ← 从 registry.ts 懒加载
                └── SectionFooter   ← 使用 getPrevSection/getAdjacentSection 的上一页/下一页链接
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

### 依赖

- `framer-motion` — 可用于章节组件中的动画
- `react-router-dom` v7 — 路由
- `i18next` + `react-i18next` — 国际化
- 无状态管理库 — `SidebarContext` 是唯一的共享状态
