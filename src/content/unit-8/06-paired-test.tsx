import { useState } from 'react';
import { motion } from 'framer-motion';
import CodeBlock from '../../components/shared/CodeBlock';
import StepThrough from '../../components/shared/StepThrough';

// ── Paired Data Visualizer ───────────────────────────────────────
function PairedDataVisualizer() {
  const [shift, setShift] = useState(4);

  const pre = [15, 18, 12, 20, 16, 14, 19, 17, 13, 21];
  const post = pre.map((v) => v + shift + Math.round((Math.random() - 0.3) * 3));
  const diffs = pre.map((v, i) => post[i] - v);
  const meanDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length;
  const maxVal = Math.max(...pre, ...post) + 2;

  return (
    <div className="my-6 p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        配对数据可视化：前后测对比
      </h3>
      <p className="text-sm text-slate-600 mb-4">
        拖动滑块调整前后测的差异大小，观察配对连线和平均变化量如何变化。
      </p>

      <div className="mb-4">
        <label className="text-sm font-medium text-blue-700">
          前后测差异: <span className="font-mono font-bold">{shift}</span> 分
        </label>
        <input
          type="range" min={0} max={10} value={shift}
          onChange={(e) => setShift(Number(e.target.value))}
          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      {/* SVG chart */}
      <svg viewBox="0 0 400 200" className="w-full max-w-lg mx-auto mb-4">
        {/* Grid lines */}
        {[0, 5, 10, 15, 20, 25, 30].map((v) => (
          <g key={v}>
            <line x1="40" y1={180 - (v / maxVal) * 160} x2="380" y2={180 - (v / maxVal) * 160} stroke="#e2e8f0" strokeWidth="1" />
            <text x="35" y={184 - (v / maxVal) * 160} textAnchor="end" fontSize="10" fill="#94a3b8">{v}</text>
          </g>
        ))}
        {/* Axis */}
        <line x1="40" y1="180" x2="380" y2="180" stroke="#cbd5e1" strokeWidth="1.5" />
        <line x1="40" y1="20" x2="40" y2="180" stroke="#cbd5e1" strokeWidth="1.5" />

        {/* Paired dots and lines */}
        {pre.map((p, i) => {
          const x1 = 60 + i * 32;
          const x2 = x1;
          const y1 = 180 - (p / maxVal) * 160;
          const y2 = 180 - (post[i] / maxVal) * 160;
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6366f1" strokeWidth="1.5" opacity="0.5" />
              <circle cx={x1} cy={y1} r="5" fill="#3b82f6" />
              <circle cx={x2} cy={y2} r="5" fill="#10b981" />
            </g>
          );
        })}

        {/* Legend */}
        <circle cx="100" cy="12" r="5" fill="#3b82f6" />
        <text x="110" y="16" fontSize="11" fill="#64748b">前测</text>
        <circle cx="160" cy="12" r="5" fill="#10b981" />
        <text x="170" y="16" fontSize="11" fill="#64748b">后测</text>
      </svg>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
          <div className="text-sm text-blue-600 mb-1">平均变化量</div>
          <div className="text-2xl font-bold font-mono text-blue-800">+{meanDiff.toFixed(1)} 分</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <div className="text-sm text-slate-500 mb-1">变化方向</div>
          <div className="text-2xl font-bold font-mono text-slate-800">
            {meanDiff > 0 ? '↑ 提高' : meanDiff < 0 ? '↓ 降低' : '— 无变化'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Section() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="content-prose"
    >
      <h2>配对检验与重复测量</h2>
      <p>
        前一节学的独立样本 t 检验，假设两组数据来自<strong>不同的人</strong>。但语言学实验中，更常见的设计是让<strong>同一批人</strong>在不同条件下完成任务——
        前测 vs 后测、口语 vs 书面语、母语 vs 第二语言。这种设计叫<strong>被试内设计</strong>（within-subjects design），需要专门的统计方法。
      </p>

      {/* ===== 被试内 vs 被试间 ===== */}
      <h2>1. 被试内 vs 被试间设计</h2>

      <div className="my-6 grid md:grid-cols-2 gap-4">
        {[
          {
            title: '被试间设计',
            subtitle: 'Between-subjects',
            color: 'slate',
            borderColor: 'border-slate-300',
            bgColor: 'bg-slate-50',
            tagColor: 'bg-slate-200 text-slate-700',
            icon: '👤👤',
            items: [
              '两组不同的人',
              '如：母语者组 vs 学习者组',
              '用独立样本 t 检验',
              '需要更多被试才能检测到差异',
            ],
          },
          {
            title: '被试内设计',
            subtitle: 'Within-subjects',
            color: 'blue',
            borderColor: 'border-blue-300',
            bgColor: 'bg-blue-50',
            tagColor: 'bg-blue-200 text-blue-700',
            icon: '👤=👤',
            items: [
              '同一批人在两种条件下',
              '如：训练前 vs 训练后',
              '用配对 t 检验',
              '消除个体差异，统计效力更高',
            ],
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
            className={`p-5 rounded-2xl border-2 ${item.borderColor} ${item.bgColor}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{item.icon}</span>
              <span className="font-semibold text-slate-800">{item.title}</span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${item.tagColor}`}>{item.subtitle}</span>
            </div>
            <ul className="text-sm text-slate-600 space-y-1.5 list-disc pl-5">
              {item.items.map((text, j) => (
                <li key={j}>{text}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="my-6 p-5 rounded-2xl border-2 border-blue-200 bg-blue-50">
        <h3 className="text-base font-semibold text-blue-800 mb-2">为什么配对设计更好？</h3>
        <p className="text-blue-700 text-sm">
          假设你要比较两种纠错反馈的效果。如果分成两组不同的人，个体差异（学习动机、语言天赋）会淹没反馈效果。
          但让<strong>同一批人</strong>先后接受两种反馈，你就自动控制了所有稳定的个体差异——每个人是自己的对照。
          这就是配对设计的统计效力更高的原因。
        </p>
      </div>

      <PairedDataVisualizer />

      {/* ===== 配对 t 检验详解 ===== */}
      <h2>2. 配对 t 检验详解</h2>
      <p>
        配对 t 检验的核心思想：不比较两组均值，而是计算<strong>每个人的变化量（差值）</strong>，然后检验这些差值的均值是否显著不等于零。
      </p>

      <div className="my-6 p-6 bg-slate-800 text-white rounded-2xl text-center">
        <div className="text-lg font-semibold mb-2">
          配对 t = <span className="text-blue-300">d̄</span> / <span className="text-amber-300">SE<sub>d</sub></span>
        </div>
        <div className="text-base mt-2 text-slate-300">
          其中 d̄ = 差值的均值，SE<sub>d</sub> = 差值的标准 / √n
        </div>
        <div className="text-sm mt-3 text-slate-400">
          本质上是对"差值是否为零"做单样本 t 检验
        </div>
      </div>

      <StepThrough
        steps={[
          {
            title: '场景：词汇训练前后测',
            content: (
              <>
                <p className="text-sm text-slate-600 mb-2">
                  10 名学生接受为期 4 周的词汇训练。记录训练前后的词汇测试成绩（满分 30）。
                </p>
                <CodeBlock
                  code={`import numpy as np
from scipy import stats

# 10 名学生的前后测成绩
pre  = np.array([15, 18, 12, 20, 16, 14, 19, 17, 13, 21])
post = np.array([19, 22, 16, 24, 20, 17, 23, 21, 18, 25])

# 计算差值
diffs = post - pre
print(f'差值: {diffs}')
print(f'差值均值: {diffs.mean():.1f}')
print(f'差值标准差: {diffs.std(ddof=1):.2f}')`}
                  highlightLines={[9]}
                />
              </>
            ),
          },
          {
            title: '执行配对 t 检验',
            content: (
              <>
                <CodeBlock
                  code={`# 方法一：直接用 ttest_rel（推荐）
t_stat, p_value = stats.ttest_rel(post, pre)
print(f't = {t_stat:.3f}, p = {p_value:.4f}')

# 方法二：手动计算（等价于对差值做单样本 t 检验）
t_manual, p_manual = stats.ttest_1samp(diffs, 0)
print(f't = {t_manual:.3f}, p = {p_manual:.4f}')

# 两种方法结果完全相同！`}
                  highlightLines={[2]}
                />
                <p className="text-sm text-slate-600 mt-2">
                  <code>ttest_rel(a, b)</code> 等价于 <code>ttest_1samp(a - b, 0)</code>——都是检验"差值均值是否为零"。
                </p>
              </>
            ),
          },
          {
            title: '计算效应量（配对 Cohen\'s d）',
            content: (
              <>
                <p className="text-sm text-slate-600 mb-2">配对数据的效应量用差值的均值除以差值的标准差：</p>
                <CodeBlock
                  code={`# 配对 Cohen's d = 差值均值 / 差值标准差
d_paired = diffs.mean() / diffs.std(ddof=1)
print(f"Cohen's d (paired) = {d_paired:.2f}")

# 95% 置信区间
n = len(diffs)
se = diffs.std(ddof=1) / np.sqrt(n)
ci_low = diffs.mean() - 2.262 * se   # t 临界值 (df=9)
ci_high = diffs.mean() + 2.262 * se
print(f'差值 95% CI: [{ci_low:.1f}, {ci_high:.1f}]')`}
                  highlightLines={[2]}
                />
              </>
            ),
          },
        ]}
      />

      <div className="my-6 p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">论文中的报告格式</h3>
        <div className="p-4 bg-white border border-slate-200 rounded-xl text-slate-700 text-sm leading-relaxed font-serif">
          训练后（<i>M</i> = 20.5, <i>SD</i> = 2.88）的词汇测试成绩显著高于训练前（<i>M</i> = 16.5, <i>SD</i> = 2.95），<i>t</i>(9) = 10.77, <i>p</i> &lt; .001, Cohen's <i>d</i> = 3.41, 95% CI [3.2, 4.8]。
        </div>
      </div>

      {/* ===== Wilcoxon 符号秩检验 ===== */}
      <h2>3. Wilcoxon 符号秩检验：非参数替代方案</h2>
      <p>
        和独立样本类似，配对数据也有非参数替代：当差值<strong>不服从正态分布</strong>或<strong>样本量很小</strong>时，
        用 Wilcoxon 符号秩检验（Wilcoxon signed-rank test）代替配对 t 检验。
      </p>

      <div className="grid md:grid-cols-2 gap-4 my-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="p-5 rounded-xl border border-blue-300 bg-blue-50"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-200 text-blue-700">参数</span>
            <span className="font-semibold text-blue-700">配对 t 检验</span>
          </div>
          <ul className="text-sm text-blue-600 space-y-1.5 list-disc pl-4">
            <li>检验差值的<strong>均值</strong>是否为零</li>
            <li>假设差值服从正态分布</li>
            <li>统计效力更高</li>
            <li>适合连续数据、中大样本</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="p-5 rounded-xl border border-emerald-300 bg-emerald-50"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-200 text-emerald-700">非参数</span>
            <span className="font-semibold text-emerald-700">Wilcoxon 符号秩</span>
          </div>
          <ul className="text-sm text-emerald-600 space-y-1.5 list-disc pl-4">
            <li>检验差值的<strong>中位数</strong>是否为零</li>
            <li>不要求差值正态分布</li>
            <li>更稳健（对异常值不敏感）</li>
            <li>适合等级数据、小样本</li>
          </ul>
        </motion.div>
      </div>

      <CodeBlock
        code={`# Wilcoxon 符号秩检验
from scipy import stats

pre  = np.array([15, 18, 12, 20, 16, 14, 19, 17, 13, 21])
post = np.array([19, 22, 16, 24, 20, 17, 23, 21, 18, 25])

# 执行检验
stat, p_value = stats.wilcoxon(post, pre)
print(f'W 统计量: {stat:.1f}')
print(f'p 值: {p_value:.4f}')

# 如果有零差值（前后成绩相同的情况），默认会自动处理
# 也可以用 alternative 参数指定单尾检验
stat, p_value = stats.wilcoxon(post, pre, alternative='greater')
print(f'单尾 p 值: {p_value:.4f}')`}
        highlightLines={[8]}
      />

      <div className="my-6 p-5 rounded-2xl border-2 border-amber-200 bg-amber-50">
        <h3 className="text-base font-semibold text-amber-800 mb-2">选择建议</h3>
        <ul className="text-amber-700 text-sm space-y-1.5">
          <li>先检查差值是否正态：<code>stats.shapiro(post - pre)</code></li>
          <li>如果 p &gt; 0.05 → 差值正态，用配对 t 检验（效力更高）</li>
          <li>如果 p &lt; 0.05 → 差值非正态，用 Wilcoxon 符号秩检验</li>
          <li>样本量 &lt; 15 时，即使正态性检验通过，也可以考虑用 Wilcoxon 更稳健</li>
        </ul>
      </div>

      {/* ===== 重复测量 ANOVA ===== */}
      <h2>4. 重复测量 ANOVA：超过两个时间点</h2>
      <p>
        当你有<strong>三个或更多</strong>条件来自同一组被试时（如训练前、训练中、训练后），配对 t 检验就不够用了——你需要<strong>重复测量 ANOVA</strong>（Repeated Measures ANOVA）。
      </p>

      <div className="my-6 p-5 rounded-2xl border-2 border-blue-200 bg-blue-50">
        <h3 className="text-base font-semibold text-blue-800 mb-2">语言学中的典型场景</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>同一批学生在第 1、4、8、12 周的口语流利度变化</li>
          <li>同一批被试在三种实验条件下的反应时（如：主动句、被动句、疑问句）</li>
          <li>同一批说话人在正式和非正式语境下的语速对比</li>
        </ul>
      </div>

      <CodeBlock
        code={`# 重复测量 ANOVA（使用 pingouin 库，更友好）
# pip install pingouin
import pingouin as pg
import pandas as pd

# 10 名学生在 3 个时间点的测试成绩
data = pd.DataFrame({
    'student': list(range(1, 11)) * 3,
    'time': ['前测'] * 10 + ['中测'] * 10 + ['后测'] * 10,
    'score': [
        15, 18, 12, 20, 16, 14, 19, 17, 13, 21,  # 前测
        18, 21, 15, 23, 19, 16, 22, 20, 16, 24,  # 中测
        22, 25, 19, 27, 23, 20, 26, 24, 20, 28,  # 后测
    ]
})

# 重复测量 ANOVA
result = pg.rm_anova(data, dv='score', within='time', subject='student')
print(result)

# 事后两两比较（配对 t 检验 + 多重比较校正）
posthoc = pg.pairwise_tests(data, dv='score', within='time',
                             subject='student', padjust='bonf')
print(posthoc)`}
        highlightLines={[19, 25]}
      />

      <div className="my-6 p-5 rounded-2xl border-2 border-green-200 bg-green-50">
        <h3 className="text-base font-semibold text-green-800 mb-2">球形度假设</h3>
        <p className="text-green-700 text-sm">
          重复测量 ANOVA 有一个额外前提——<strong>球形性</strong>（sphericity），即各条件间差值的方差相等。
          如果违反（Mauchly 检验 p &lt; 0.05），需要使用校正自由度（Greenhouse-Geisser 或 Huynh-Feldt）。
          <code>pingouin</code> 的 <code>rm_anova</code> 默认会自动报告校正结果。
        </p>
      </div>

      {/* ===== 小结 ===== */}
      <h2>小结：如何选择配对检验方法</h2>

      <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">场景</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">方法</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Python 函数</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              ['2 个条件，差值正态', '配对 t 检验', 'stats.ttest_rel(a, b)'],
              ['2 个条件，差值非正态', 'Wilcoxon 符号秩', 'stats.wilcoxon(a, b)'],
              ['3+ 个条件，满足球形性', '重复测量 ANOVA', 'pg.rm_anova(...)'],
              ['3+ 个条件，违反球形性', '校正 RM-ANOVA', 'pg.rm_anova(..., correction=True)'],
              ['3+ 个条件，非正态', 'Friedman 检验', 'stats.friedmanchisquare(...)'],
            ].map(([scene, method, func], i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-4 py-3 text-slate-700">{scene}</td>
                <td className="px-4 py-3 font-semibold text-blue-700">{method}</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-600">{func}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
        <h3 className="text-lg font-semibold text-amber-800 mb-2">关键提醒</h3>
        <ul className="text-amber-700 space-y-1.5 text-sm">
          <li>配对设计的<strong>第一件事</strong>是画出配对连线图——看变化方向是否一致</li>
          <li>别忘了报告效应量：配对 Cohen's d 或 rank-biserial correlation（Wilcoxon）</li>
          <li>多重比较时（如 3 个时间点两两比较），要校正 p 值（Bonferroni 或 Holm）</li>
          <li>如果同时有被试内和被试间因素（如不同教学法 × 前后测），需要<strong>混合设计 ANOVA</strong>——这已经是更高级的话题了</li>
        </ul>
      </div>
    </motion.div>
  );
}
