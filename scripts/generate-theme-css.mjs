/**
 * 生成深色主题调色板 CSS → src/styles/theme-dark.generated.css
 *
 * 原理：Tailwind v4 的工具类都编译为 var(--color-*) 引用，因此在 .dark
 * 作用域下重定义这些变量，即可让全部组件（含 88 个内容章节）自动适配深色，
 * 无需逐个添加 dark: 变体。
 *
 * 映射规则：
 *  - 彩色色阶轴对称反转：50↔950、100↔900、200↔800、300↔700、400→600、700→300；
 *    500 保持不变；600→500（保证 bg-*-600 按钮在深色下依然饱和、白字可读）。
 *  - text-*-600 单独提亮为原 400 值（600 作正文强调色远多于作背景）。
 *  - hover:bg-*-600/700 保持原始饱和值（悬停加深语义不变）。
 *  - slate 采用手调的深蓝灰阶（保证 页面底 < 卡片 < 悬停层 的层次）；white → 卡片面色。
 *  - 「本来就是深色」的面板（终端/代码/结果横幅，bg-slate-600~950、bg-blue-700、
 *    .keep-dark、.content-prose pre）整棵子树恢复原始色板，保持深色外观。
 *
 * 运行：node scripts/generate-theme-css.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const themeCss = readFileSync(resolve(root, 'node_modules/tailwindcss/theme.css'), 'utf8');

const HUES = [
  'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan',
  'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
];
const SHADES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

// 解析 tailwind 默认主题的所有颜色变量
const palette = {};
for (const m of themeCss.matchAll(/--color-([a-z]+)-(\d+):\s*([^;]+);/g)) {
  const [, hue, shade, value] = m;
  (palette[hue] ??= {})[shade] = value.trim();
}
for (const hue of [...HUES, 'slate']) {
  for (const shade of SHADES) {
    if (!palette[hue]?.[shade]) throw new Error(`missing --color-${hue}-${shade} in tailwind theme.css`);
  }
}
const orig = (hue, shade) => palette[hue][shade];

// 彩色色阶的深色映射（500 不变故省略）
const HUE_FLIP = { 50: '950', 100: '900', 200: '800', 300: '700', 400: '600', 600: '500', 700: '300', 800: '200', 900: '100', 950: '50' };

// slate 手调中性黑灰阶：页面底(50) < 卡片(white) < 悬停层(100)，400-950 为由暗到亮的文字色
const SLATE_DARK = {
  white: '#1a1a1a',
  50: '#121212',
  100: '#262626',
  200: '#383838',
  300: '#4d4d4d',
  400: '#808080',
  500: '#a3a3a3',
  600: '#c2c2c2',
  700: '#d4d4d4',
  800: '#e5e5e5',
  900: '#f0f0f0',
  950: '#fafafa',
};

// 深色-by-design 面板：整棵子树冻结为原始色板
const freezeSelectors = [
  '.keep-dark',
  '.content-prose pre',
  ...['bg-slate-6', 'bg-slate-7', 'bg-slate-8', 'bg-slate-9', 'bg-blue-700'].flatMap(
    (p) => [`[class^="${p}"]`, `[class*=" ${p}"]`],
  ),
];
const FREEZE = `:is(${freezeSelectors.join(', ')})`;

const lines = [];
lines.push('/* 由 scripts/generate-theme-css.mjs 自动生成 — 请勿手工编辑 */');
lines.push('/* 重新生成：node scripts/generate-theme-css.mjs */');
lines.push('');

// —— 1. .dark 调色板重映射 ——
lines.push('.dark {');
lines.push('  color-scheme: dark;');
lines.push(`  --color-white: ${SLATE_DARK.white};`);
for (const shade of SHADES) lines.push(`  --color-slate-${shade}: ${SLATE_DARK[shade]};`);
for (const hue of HUES) {
  for (const [from, to] of Object.entries(HUE_FLIP)) {
    lines.push(`  --color-${hue}-${from}: ${orig(hue, to)};`);
  }
}
lines.push('}');
lines.push('');

// —— 2. text-*-600 提亮为原 400 值（深色表面上 600 作文字偏暗）——
for (const hue of HUES) {
  lines.push(`.dark .text-${hue}-600 { color: ${orig(hue, '400')}; }`);
}
lines.push('');

// —— 3. hover:bg-*-600/700 保持原始饱和值（悬停加深语义、白字可读）——
for (const hue of HUES) {
  lines.push(`.dark .hover\\:bg-${hue}-600:hover { background-color: ${orig(hue, '600')}; }`);
  lines.push(`.dark .hover\\:bg-${hue}-700:hover { background-color: ${orig(hue, '700')}; }`);
}
lines.push('');

// —— 4. 深色-by-design 面板冻结：恢复原始色板 ——
lines.push(`.dark ${FREEZE} {`);
lines.push('  --color-white: #fff;');
for (const hue of ['slate', ...HUES]) {
  for (const shade of SHADES) {
    lines.push(`  --color-${hue}-${shade}: ${orig(hue, shade)};`);
  }
}
lines.push('}');
lines.push('');

// 冻结子树内撤销 text-*-600 提亮（var 在冻结作用域内解析回原值）
for (const hue of HUES) {
  lines.push(`.dark ${FREEZE} .text-${hue}-600 { color: var(--color-${hue}-600); }`);
}
lines.push('');

// —— 5. content-prose 细节 ——
lines.push('/* 正文链接：提亮并弱化下划线颜色 */');
lines.push(`.dark .content-prose a { color: ${orig('blue', '400')}; text-decoration-color: ${orig('blue', '800')}; }`);
lines.push(`.dark .content-prose a:hover { text-decoration-color: ${orig('blue', '400')}; }`);
lines.push('');

const out = resolve(root, 'src/styles/theme-dark.generated.css');
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, lines.join('\n'), 'utf8');
console.log(`written: ${out} (${lines.length} lines)`);
