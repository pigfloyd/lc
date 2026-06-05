import { useState } from 'react';
import { motion } from 'framer-motion';
import CodeBlock from '../../components/shared/CodeBlock';
import StepThrough from '../../components/shared/StepThrough';

// ── Outlier Detector ─────────────────────────────────────────────
function OutlierDetector() {
  const [method, setMethod] = useState<'zscore' | 'iqr'>('zscore');
  const [threshold, setThreshold] = useState(2);

  // Simulated data: reaction times
  const data = [420, 450, 480, 460, 440, 470, 490, 455, 465, 445, 850, 430, 475, 460, 1200];
  const sorted = [...data].sort((a, b) => a - b);
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  const std = Math.sqrt(data.reduce((a, b) => a + (b - mean) ** 2, 0) / data.length);
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const q3 = sorted[Math.floor(sorted.length * 0.75)];
  const iqr = q3 - q1;

  const outliers = data.map((v) => {
    if (method === 'zscore') {
      return Math.abs((v - mean) / std) > threshold;
    }
    return v < q1 - threshold * iqr || v > q3 + threshold * iqr;
  });

  const outlierCount = outliers.filter(Boolean).length;

  return (
    <div className="my-6 p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">异常值检测演示</h3>
      <p className="text-sm text-slate-600 mb-4">
        下面是一组反应时数据（毫秒）。调整检测方法和阈值，看哪些数据点被标记为异常值。
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMethod('zscore')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            method === 'zscore' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Z-score
        </button>
        <button
          onClick={() => setMethod('iqr')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            method === 'iqr' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          IQR
        </button>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium text-blue-700">
          阈值: <span className="font-mono font-bold">{threshold}</span>
        </label>
        <input
          type="range" min={1} max={4} step={0.5} value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      {/* Data visualization */}
      <div className="flex flex-wrap gap-2 mb-4">
        {data.map((v, i) => (
          <div
            key={i}
            className={`px-3 py-1.5 rounded-lg text-sm font-mono ${
              outliers[i]
                ? 'bg-red-100 text-red-700 border-2 border-red-300 font-bold'
                : 'bg-blue-50 text-blue-700 border border-blue-200'
            }`}
          >
            {v}
            {outliers[i] && <span className="ml-1 text-xs">⚠</span>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <div className="text-xs text-slate-500">均值</div>
          <div className="font-mono font-bold text-slate-800">{mean.toFixed(0)} ms</div>
        </div>
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-center">
          <div className="text-xs text-red-600">检测到异常值</div>
          <div className="font-mono font-bold text-red-800">{outlierCount} 个</div>
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
      <h2>异常值检测与处理</h2>
      <p>
        异常值（outlier）是和大多数数据点差异很大的极端值。语言数据中异常值很常见：
        某个被试反应特别慢、某个文本特别长、某个词的频率特别高（高频词干扰）。
        异常值可能来自真实变异，也可能是录入错误，但不管原因如何，它们都会严重影响统计结果。
      </p>

      <OutlierDetector />

      {/* ===== Z-score 方法 ===== */}
      <h2>1. Z-score 方法</h2>
      <p>
        Z-score 衡量一个数据点距离均值有多少个标准差。通常认为 <strong>|Z| &gt; 3</strong> 的数据点是异常值。
      </p>

      <div className="my-6 p-6 bg-slate-800 text-white rounded-2xl text-center">
        <div className="text-lg font-semibold mb-2">
          Z = (x - x̄) / s
        </div>
        <div className="text-sm mt-2 text-slate-300">
          Z = 0 表示在均值处，|Z| &gt; 3 表示在 3 个标准差之外（概率 &lt; 0.3%）
        </div>
      </div>

      <CodeBlock
        code={`import numpy as np
import pandas as pd

# 一组反应时数据（毫秒）
rt = np.array([420, 450, 480, 460, 440, 470, 490, 455, 465, 445,
               850, 430, 475, 460, 1200])

# 计算 Z-score
z_scores = (rt - rt.mean()) / rt.std()
print('Z-scores:', np.round(z_scores, 2))

# 标记异常值（|Z| > 2 为保守阈值，|Z| > 3 为常用阈值）
outliers_z2 = np.abs(z_scores) > 2
outliers_z3 = np.abs(z_scores) > 3

print(f'\\n|Z| > 2 的异常值: {rt[outliers_z2]}')
print(f'|Z| > 3 的异常值: {rt[outliers_z3]}')`}
        highlightLines={[9, 12, 13]}
      />

      {/* ===== IQR 方法 ===== */}
      <h2>2. IQR 方法（更稳健）</h2>
      <p>
        IQR（四分位距）方法不受极端值影响，比 Z-score 更稳健。它用中位数和四分位数代替均值和标准差。
      </p>

      <CodeBlock
        code={`# IQR 方法
q1 = np.percentile(rt, 25)   # 第一四分位数
q3 = np.percentile(rt, 75)   # 第三四分位数
iqr = q3 - q1                # 四分位距

# 异常值定义：低于 Q1-1.5*IQR 或高于 Q3+1.5*IQR
lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

outliers_iqr = (rt < lower_bound) | (rt > upper_bound)

print(f'Q1 = {q1}, Q3 = {q3}, IQR = {iqr}')
print(f'正常范围: [{lower_bound:.0f}, {upper_bound:.0f}]')
print(f'异常值: {rt[outliers_iqr]}')`}
        highlightLines={[6, 7, 9]}
      />

      <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">方法</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">优点</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">缺点</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">适用场景</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              ['Z-score', '简单直观', '受极端值影响（均值和标准差会被拉偏）', '数据近似正态时'],
              ['IQR', '不受极端值影响', '对正态数据效力稍低', '数据偏态或有极端值时'],
              ['箱线图', '可视化直观', '只能看到大概', '探索性分析的第一步'],
            ].map(([m, pro, con, use], i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-4 py-3 font-semibold text-blue-700">{m}</td>
                <td className="px-4 py-3 text-green-700 text-xs">{pro}</td>
                <td className="px-4 py-3 text-red-700 text-xs">{con}</td>
                <td className="px-4 py-3 text-slate-500">{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== 箱线图 ===== */}
      <h2>3. 用箱线图可视化异常值</h2>
      <p>
        箱线图是检测异常值最直观的工具——它把中位数、四分位数和异常值一目了然地展示出来。
      </p>

      <CodeBlock
        code={`import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(10, 4))

# 箱线图
axes[0].boxplot(rt, vert=False)
axes[0].set_title('反应时箱线图')
axes[0].set_xlabel('毫秒')

# 标记异常值
clean = rt[~outliers_iqr]
axes[1].boxplot(clean, vert=False)
axes[1].set_title('去除异常值后')

plt.tight_layout()
plt.savefig('outlier_detection.png', dpi=150)
plt.show()`}
        highlightLines={[5]}
      />

      {/* ===== 处理策略 ===== */}
      <h2>4. 发现异常值后怎么办？</h2>

      <StepThrough
        steps={[
          {
            title: '第一步：检查原因',
            content: (
              <div>
                <p>异常值不一定要删除。先调查原因：</p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-sm text-slate-700">
                  <li>是<strong>录入错误</strong>？→ 修正或删除</li>
                  <li>是<strong>实验设备故障</strong>？→ 删除</li>
                  <li>是<strong>真实的极端表现</strong>？→ 保留，但考虑使用稳健统计量</li>
                  <li>是<strong>高频词干扰</strong>？（如"的""是"频率远超其他词）→ 对数转换或单独处理</li>
                </ul>
              </div>
            ),
          },
          {
            title: '第二步：选择处理方法',
            content: (
              <div>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                    <span className="font-semibold text-blue-800">删除</span>
                    <p className="text-sm text-blue-700 mt-1">确认是错误数据时直接删除。报告删除了多少、为什么。</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-50 border border-green-200">
                    <span className="font-semibold text-green-800">Winsorize（缩尾处理）</span>
                    <p className="text-sm text-green-700 mt-1">把极端值替换为边界值（如把 &gt; Q3+1.5*IQR 的值替换为 Q3+1.5*IQR）。</p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
                    <span className="font-semibold text-purple-800">数据转换</span>
                    <p className="text-sm text-purple-700 mt-1">取对数可以压缩大值。词频数据常用 log 转换。</p>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                    <span className="font-semibold text-amber-800">使用稳健方法</span>
                    <p className="text-sm text-amber-700 mt-1">不删数据，但用中位数代替均值、用非参数检验代替参数检验。</p>
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: '第三步：敏感性分析',
            content: (
              <div>
                <p className="text-sm text-slate-600 mb-2">最严谨的做法：分别用"含异常值"和"不含异常值"的数据做分析，看结论是否一致。</p>
                <CodeBlock
                  code={`# 敏感性分析：含/不含异常值的结果对比
from scipy import stats

# 含异常值
t1, p1 = stats.ttest_ind(group_a, group_b)
print(f'含异常值: t = {t1:.3f}, p = {p1:.4f}')

# 不含异常值
a_clean = group_a[np.abs(z_a) < 3]
b_clean = group_b[np.abs(z_b) < 3]
t2, p2 = stats.ttest_ind(a_clean, b_clean)
print(f'不含异常值: t = {t2:.3f}, p = {p2:.4f}')

# 如果两次结论一致 → 结果稳健
# 如果结论不同 → 需要在论文中讨论异常值的影响`}
                  showLineNumbers={false}
                />
              </div>
            ),
          },
        ]}
      />

      {/* ===== 语言学中的常见异常值场景 ===== */}
      <h2>5. 语言学中的常见异常值场景</h2>

      <div className="my-6 space-y-3">
        {[
          {
            title: '词频数据中的 Zipf 偏差',
            desc: '少数极高频词（"的""了""是"）远远超过其他词。用 log 转换或排除功能词。',
            color: 'blue',
          },
          {
            title: '反应时数据中的极端值',
            desc: '被试走神导致的超长反应时（> 2000ms）。通常设定上限截断（如 2.5 SD 或 1500ms）。',
            color: 'green',
          },
          {
            title: '文本长度差异',
            desc: '语料中文本长度差异巨大。用标准化指标（如每千词频率）代替原始计数。',
            color: 'amber',
          },
          {
            title: '评分者偏差',
            desc: '某个评分者系统性地给出高分或低分。检查评分者间一致性（Cohen\'s kappa）。',
            color: 'purple',
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className={`p-4 rounded-xl border-l-4 ${
              item.color === 'blue' ? 'border-blue-400 bg-blue-50' :
              item.color === 'green' ? 'border-green-400 bg-green-50' :
              item.color === 'amber' ? 'border-amber-400 bg-amber-50' :
              'border-purple-400 bg-purple-50'
            }`}
          >
            <div className="font-semibold text-slate-800">{item.title}</div>
            <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
        <h3 className="text-lg font-semibold text-amber-800 mb-2">黄金法则</h3>
        <ul className="text-amber-700 space-y-1.5 text-sm">
          <li><strong>不要盲目删除</strong>——先调查原因，保留真实变异</li>
          <li><strong>不要偷偷处理</strong>——在论文中报告异常值的数量、检测方法和处理方式</li>
          <li><strong>做敏感性分析</strong>——证明你的结论不依赖于是否删除异常值</li>
          <li><strong>选择稳健方法</strong>——中位数比均值稳健，非参数检验比参数检验稳健</li>
        </ul>
      </div>
    </motion.div>
  );
}
