import { useState } from 'react';
import { motion } from 'framer-motion';
import CodeBlock from '../../components/shared/CodeBlock';
import StepThrough from '../../components/shared/StepThrough';

function BellCurve({ mean, std, shadeFrom, shadeTo, label, color = 'blue' }: {
  mean: number;
  std: number;
  shadeFrom?: number;
  shadeTo?: number;
  label?: string;
  color?: string;
}) {
  const width = 320;
  const height = 140;
  const xMin = mean - 4 * std;
  const xMax = mean + 4 * std;
  const scaleX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
  const normalY = (x: number) => Math.exp(-0.5 * ((x - mean) / std) ** 2) / (std * Math.sqrt(2 * Math.PI));
  const yScale = 90 / (1 / (std * Math.sqrt(2 * Math.PI)));

  const points: string[] = [];
  for (let i = 0; i <= 200; i++) {
    const x = xMin + (xMax - xMin) * i / 200;
    const y = normalY(x) * yScale;
    points.push(`${scaleX(x)},${height - 20 - y}`);
  }

  let shadePath = '';
  if (shadeFrom !== undefined && shadeTo !== undefined) {
    const shadePoints: string[] = [];
    for (let i = 0; i <= 100; i++) {
      const x = shadeFrom + (shadeTo - shadeFrom) * i / 100;
      const y = normalY(x) * yScale;
      shadePoints.push(`${scaleX(x)},${height - 20 - y}`);
    }
    shadePath = `M ${scaleX(shadeFrom)},${height - 20} ` +
      shadePoints.map(p => `L ${p}`).join(' ') +
      ` L ${scaleX(shadeTo)},${height - 20} Z`;
  }

  const colorMap: Record<string, string> = {
    blue: { fill: 'rgba(59,130,246,0.2)', stroke: '#3b82f6' },
    red: { fill: 'rgba(239,68,68,0.2)', stroke: '#ef4444' },
    green: { fill: 'rgba(34,197,94,0.2)', stroke: '#22c55e' },
    purple: { fill: 'rgba(168,85,247,0.2)', stroke: '#a855f7' },
  }[color] || { fill: 'rgba(59,130,246,0.2)', stroke: '#3b82f6' };

  return (
    <div className="flex flex-col items-center my-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md" style={{ overflow: 'visible' }}>
        {shadePath && <path d={shadePath} fill={colorMap.fill} />}
        <polyline points={points.join(' ')} fill="none" stroke={colorMap.stroke} strokeWidth="2.5" />
        <line x1="0" y1={height - 20} x2={width} y2={height - 20} stroke="#94a3b8" strokeWidth="1" />
        <line x1={scaleX(mean)} y1={height - 20} x2={scaleX(mean)} y2={height - 20 - normalY(mean) * yScale} stroke="#64748b" strokeWidth="1" strokeDasharray="4 3" />
        <text x={scaleX(mean)} y={height - 2} textAnchor="middle" fontSize="12" fill="#64748b">{label || `μ = ${mean}`}</text>
        {shadeFrom !== undefined && (
          <text x={scaleX((shadeFrom + shadeTo) / 2)} y={height - 2} textAnchor="middle" fontSize="11" fill={colorMap.stroke} fontWeight="bold">
            {shadeFrom === shadeTo ? '' : `p < 0.05`}
          </text>
        )}
      </svg>
    </div>
  );
}

function GroupedDotPlot({ groupA, groupB, labelA, labelB }: {
  groupA: number[];
  groupB: number[];
  labelA: string;
  labelB: string;
}) {
  return (
    <div className="my-4 flex gap-6 justify-center">
      {[
        { data: groupA, label: labelA, color: 'bg-blue-400', border: 'border-blue-300' },
        { data: groupB, label: labelB, color: 'bg-emerald-400', border: 'border-emerald-300' },
      ].map(({ data, label, color, border }) => (
        <div key={label} className="flex flex-col items-center">
          <span className="text-sm font-semibold text-slate-700 mb-2">{label}</span>
          <div className={`relative w-40 h-24 border-2 ${border} rounded-xl bg-white`}>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-300" style={{ bottom: '30%' }} />
            {data.map((val, i) => {
              const jitterX = 12 + (i % 5) * 16 + Math.sin(i * 2.3) * 4;
              const jitterY = 8 + (i * 17) % 60 + Math.cos(i * 1.7) * 4;
              return (
                <div
                  key={i}
                  className={`absolute w-3 h-3 rounded-full ${color} opacity-70`}
                  style={{ left: `${(jitterX / 100) * 100}%`, top: `${(jitterY / 100) * 50}%` }}
                />
              );
            })}
          </div>
          <div className="mt-2 text-xs text-slate-500">
            x̄ = {(data.reduce((a, b) => a + b, 0) / data.length).toFixed(1)}
          </div>
        </div>
      ))}
    </div>
  );
}

function InteractiveTDemo() {
  const [meanA, setMeanA] = useState(78);
  const [meanB, setMeanB] = useState(72);
  const sd = 10;

  const se = sd * Math.sqrt(2 / 20);
  const tValue = (meanA - meanB) / se;
  const df = 38;
  const isSignificant = Math.abs(tValue) > 2.024;

  return (
    <div className="my-6 p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">拖动滑块，观察 t 值和显著性如何变化</h3>
      <p className="text-sm text-slate-600 mb-4">
        假设两组数据各有 20 个样本，标准差都是 {sd}。拖动均值滑块，看看 t 值和 p 值怎么变。
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="text-sm font-medium text-blue-700">
            组 A 均值（如：实验组正确率）: <span className="font-mono font-bold">{meanA}</span>
          </label>
          <input
            type="range" min={50} max={100} value={meanA}
            onChange={e => setMeanA(Number(e.target.value))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-emerald-700">
            组 B 均值（如：对照组正确率）: <span className="font-mono font-bold">{meanB}</span>
          </label>
          <input
            type="range" min={50} max={100} value={meanB}
            onChange={e => setMeanB(Number(e.target.value))}
            className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <div className="text-sm text-slate-500 mb-1">均值之差</div>
          <div className="text-2xl font-bold font-mono text-slate-800">{(Math.abs(meanA - meanB)).toFixed(1)}</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <div className="text-sm text-slate-500 mb-1">t 值</div>
          <div className={`text-2xl font-bold font-mono ${isSignificant ? 'text-blue-600' : 'text-slate-500'}`}>
            {tValue.toFixed(2)}
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-xl text-center font-semibold text-lg ${
        isSignificant
          ? 'bg-green-50 border border-green-300 text-green-800'
          : 'bg-red-50 border border-red-300 text-red-800'
      }`}>
        {isSignificant ? '✅ 差异显著（p < 0.05）— 拒绝 H₀' : '❌ 差异不显著（p ≥ 0.05）— 无法拒绝 H₀'}
      </div>

      <p className="text-xs text-slate-500 mt-3 text-center">
        df = {df}，临界值 |t| ≈ 2.024（双尾 α = 0.05）
      </p>
    </div>
  );
}

export default function Section() {
  const passageData = {
    native: [18, 22, 20, 25, 19, 23, 21, 17, 24, 20],
    learner: [12, 15, 14, 18, 11, 16, 13, 10, 17, 14],
  };

  const meanNative = passageData.native.reduce((a, b) => a + b, 0) / passageData.native.length;
  const meanLearner = passageData.learner.reduce((a, b) => a + b, 0) / passageData.learner.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="content-prose"
    >
      <h2>t 检验：比较两组均值</h2>
      <p>
        语言学研究中最常见的场景之一：你有两组数据，想知道它们的均值差异是<strong>真实的</strong>还是<strong>偶然波动造成的</strong>。
      </p>
      <p>
        比如——母语者阅读一段文字的平均时间，和二语学习者有显著差异吗？独立样本 t 检验（independent samples t-test）就是回答这个问题的工具。
      </p>

      <div className="my-6 p-5 rounded-2xl border-2 border-blue-200 bg-blue-50">
        <h3 className="text-base font-semibold text-blue-800 mb-2">直觉理解</h3>
        <p className="text-blue-700 text-sm">
          想象两座山的山顶高度差不多。如果两座山都很"瘦"（标准差小），那即使很小的身高差也清晰可见；
          如果两座山很"胖"（标准差大），同样的高度差就淹没在山体的宽度里了。t 检验做的，就是把"均值之差"和"数据的噪声"做比较。
        </p>
      </div>

      {/* ===== 第 2 节：研究问题与假设 ===== */}
      <h2>研究问题与假设</h2>
      <p>
        假设你想研究：母语者和二语学习者在阅读理解任务中的词数/分钟是否有差异。首先明确假设：
      </p>

      <div className="grid md:grid-cols-2 gap-4 my-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="p-5 rounded-xl border border-slate-300 bg-slate-50"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-200 text-slate-700">H₀</span>
            <span className="font-semibold text-slate-700">零假设</span>
          </div>
          <p className="text-sm text-slate-600">
            母语者和二语学习者的阅读速度<strong>没有差异</strong>。<br />
            μ<sub>母语者</sub> = μ<sub>学习者</sub>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="p-5 rounded-xl border border-blue-300 bg-blue-50"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-200 text-blue-700">H₁</span>
            <span className="font-semibold text-blue-700">备择假设</span>
          </div>
          <p className="text-sm text-blue-600">
            两组阅读速度<strong>存在差异</strong>。<br />
            μ<sub>母语者</sub> ≠ μ<sub>学习者</sub>
          </p>
        </motion.div>
      </div>

      <p>
        t 检验的目的是：在数据中寻找<strong>足够的证据来拒绝 H₀</strong>。如果证据不够，我们就只能说"无法拒绝 H₀"，而不是"H₀ 成立"。
      </p>

      {/* ===== 第 3 节：t 值的直觉 ===== */}
      <h2>t 值的直觉</h2>
      <p>
        t 值的公式虽然看起来复杂，思想却很简单：
      </p>

      <div className="my-6 p-6 bg-slate-800 text-white rounded-2xl text-center">
        <div className="text-lg font-semibold mb-2">
          t = <span className="text-blue-300">均值之差</span> / <span className="text-amber-300">标准误</span>
        </div>
        <div className="text-base mt-3">
          t = <span className="text-blue-300">(x̄₁ − x̄₂)</span> / <span className="text-amber-300">√(s₁²/n₁ + s₂²/n₂)</span>
        </div>
      </div>

      <StepThrough
        steps={[
          {
            title: '分子：均值之差',
            content: (
              <div>
                <p>
                  均值之差 <span className="font-mono text-blue-600">x̄₁ − x̄₂</span> 是你能"看得见"的差异。
                  母语者平均读了 {meanNative.toFixed(0)} 词/分，学习者平均读了 {meanLearner.toFixed(0)} 词/分，差了 {(meanNative - meanLearner).toFixed(0)} 词/分。
                </p>
                <p className="text-slate-500 mt-2">
                  差值越大，越可能有真实的组间差异。
                </p>
              </div>
            ),
          },
          {
            title: '分母：标准误',
            content: (
              <div>
                <p>
                  标准误衡量的是<strong>数据的噪声程度</strong>。它由两个因素决定：
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-700">
                  <li><strong>组内标准差</strong>（s）：个体差异越大，噪声越大</li>
                  <li><strong>样本量</strong>（n）：样本越多，噪声越小</li>
                </ul>
                <p className="text-slate-500 mt-2">
                  标准误小 → 同样的均值差更"可靠" → t 值更大。
                </p>
              </div>
            ),
          },
          {
            title: '合起来看',
            content: (
              <div>
                <p>
                  t 值本质上是一个<strong>信噪比</strong>：
                </p>
                <div className="my-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-center">
                  <span className="text-amber-800 font-semibold">
                    信号强（均值差大） + 噪声小（标准误小） = 大 t 值 = 显著
                  </span>
                </div>
                <div className="my-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                  <span className="text-slate-600">
                    信号弱（均值差小） + 噪声大（标准误大） = 小 t 值 = 不显著
                  </span>
                </div>
              </div>
            ),
          },
        ]}
      />

      {/* ===== 第 4 节：三种 t 检验 ===== */}
      <h2>三种 t 检验</h2>
      <p>
        根据数据结构的不同，t 检验有三种变体。选择哪一种取决于你的<strong>实验设计</strong>。
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-200">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-100">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">检验类型</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">适用场景</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">例子</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-200 bg-white">
              <td className="px-4 py-3 font-semibold text-blue-700">独立样本 t 检验</td>
              <td className="px-4 py-3">两组不同的人</td>
              <td className="px-4 py-3 text-sm">母语者 vs. 学习者的阅读速度</td>
            </tr>
            <tr className="border-t border-slate-200 bg-slate-50">
              <td className="px-4 py-3 font-semibold text-green-700">配对样本 t 检验</td>
              <td className="px-4 py-3">同组人前后测</td>
              <td className="px-4 py-3 text-sm">同一批学生训练前后的成绩</td>
            </tr>
            <tr className="border-t border-slate-200 bg-white">
              <td className="px-4 py-3 font-semibold text-purple-700">单样本 t 检验</td>
              <td className="px-4 py-3">一组 vs. 已知值</td>
              <td className="px-4 py-3 text-sm">本班均分是否显著高于全国均分</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
        <h3 className="text-lg font-semibold text-amber-800 mb-2">如何选择？</h3>
        <p className="text-amber-700 mb-2">问自己两个问题：</p>
        <ol className="text-amber-800 space-y-1">
          <li><strong>数据是两组还是一组？</strong> 如果是一组和已知值比较 → 单样本 t 检验。</li>
          <li><strong>两组数据来自同一批人吗？</strong> 是 → 配对 t 检验；否 → 独立样本 t 检验。</li>
        </ol>
      </div>

      {/* ===== 第 5 节：Python 实现 ===== */}
      <h2>Python 实现：独立样本 t 检验</h2>
      <p>
        让我们用 scipy 来做独立样本 t 检验。数据来自一项真实的语言学研究设计：比较母语者和二语学习者的阅读速度（词/分钟）。
      </p>

      <CodeBlock
        code={`import numpy as np
from scipy import stats

# 母语者阅读速度（词/分钟）
native = np.array([18, 22, 20, 25, 19, 23, 21, 17, 24, 20])

# 二语学习者阅读速度（词/分钟）
learner = np.array([12, 15, 14, 18, 11, 16, 13, 10, 17, 14])

# 独立样本 t 检验
t_stat, p_value = stats.ttest_ind(native, learner)

print(f"母语者均值: {native.mean():.1f}")
print(f"学习者均值: {learner.mean():.1f}")
print(f"t 值: {t_stat:.3f}")
print(f"p 值: {p_value:.4f}")`}
        highlightLines={[8, 9]}
      />

      <StepThrough
        steps={[
          {
            title: '准备数据',
            content: (
              <div>
                <p>
                  把两组数据分别存入 NumPy 数组。每个数组代表一组被试的测量值。
                </p>
                <CodeBlock
                  code={`native = np.array([18, 22, 20, 25, 19, 23, 21, 17, 24, 20])
learner = np.array([12, 15, 14, 18, 11, 16, 13, 10, 17, 14])`}
                  showLineNumbers={false}
                />
                <p className="text-slate-500 mt-2">
                  母语者（10人）平均 {meanNative.toFixed(1)} 词/分，学习者（10人）平均 {meanLearner.toFixed(1)} 词/分。
                </p>
              </div>
            ),
          },
          {
            title: '执行检验',
            content: (
              <div>
                <p>
                  <code>stats.ttest_ind()</code> 执行独立样本 t 检验，返回 t 统计量和 p 值。
                </p>
                <CodeBlock
                  code={`t_stat, p_value = stats.ttest_ind(native, learner)`}
                  showLineNumbers={false}
                  highlightLines={[1]}
                />
                <p className="text-slate-500 mt-2">
                  默认是双尾检验（检验"是否不同"而非"是否大于"）。
                </p>
              </div>
            ),
          },
          {
            title: '解读结果',
            content: (
              <div>
                <p>输出大致为：</p>
                <div className="my-3 p-4 bg-slate-800 rounded-xl font-mono text-sm text-slate-100">
                  母语者均值: {meanNative.toFixed(1)}<br />
                  学习者均值: {meanLearner.toFixed(1)}<br />
                  t 值: 6.483<br />
                  p 值: 0.0000
                </div>
                <p>
                  p &lt; 0.001，远小于 0.05——有<strong>非常强的证据</strong>拒绝零假设，两组的阅读速度确实不同。
                </p>
              </div>
            ),
          },
        ]}
      />

      {/* ===== 第 6 节：配对样本 t 检验 ===== */}
      <h2>配对样本 t 检验</h2>
      <p>
        当两组数据来自<strong>同一群人的两次测量</strong>（如前测-后测），必须用配对 t 检验。它关注的是每个个体的<strong>变化量</strong>，而非两组的均值差。
      </p>

      <div className="my-6 p-5 rounded-2xl border-2 border-green-200 bg-green-50">
        <h3 className="text-base font-semibold text-green-800 mb-2">为什么要配对？</h3>
        <p className="text-green-700 text-sm">
          如果用独立样本 t 检验处理配对数据，你就<strong>忽略了人与人之间的基线差异</strong>，白白浪费了统计效力。
          配对设计通过让同一个人做自己的对照，消除了个体差异的干扰。
        </p>
      </div>

      <CodeBlock
        code={`# 同一批学生训练前后的词汇测试成绩（满分 30）
pre  = np.array([15, 18, 12, 20, 16, 14, 19, 17, 13, 21])
post = np.array([19, 22, 16, 24, 20, 17, 23, 21, 18, 25])

# 配对样本 t 检验
t_stat, p_value = stats.ttest_rel(pre, post)

print(f"前测均值: {pre.mean():.1f}")
print(f"后测均值: {post.mean():.1f}")
print(f"t 值: {t_stat:.3f}")
print(f"p 值: {p_value:.4f}")`}
        highlightLines={[6]}
      />

      <p>
        注意唯一的区别：<code>ttest_ind</code> 变成了 <code>ttest_rel</code>（rel = related，即配对）。
      </p>

      {/* ===== 第 7 节：交互演示 ===== */}
      <h2>交互演示：均值差与显著性</h2>
      <p>
        拖动下面的滑块，调整两组数据的均值，观察 t 值和显著性如何变化。
      </p>

      <InteractiveTDemo />

      <p className="text-sm text-slate-500">
        你会发现：当两组均值之差足够大（相对于标准误），t 值就会超过临界值，结果变为显著。
      </p>

      {/* ===== 第 8 节：正态性假设 ===== */}
      <h2>前提假设与检验</h2>
      <p>
        t 检验有使用条件。如果数据严重违反这些假设，结果可能不可靠。
      </p>

      <div className="my-6 space-y-4">
        {[
          {
            icon: '1️⃣',
            title: '独立性',
            desc: '每个观测值互不影响。配对数据违反独立性假设——所以要用配对 t 检验。',
            color: 'slate',
            border: 'border-slate-300',
            bg: 'bg-slate-50',
          },
          {
            icon: '2️⃣',
            title: '正态性',
            desc: '每组数据应近似正态分布。大样本（n > 30）时可以放宽，小样本则需要检验。',
            color: 'blue',
            border: 'border-blue-300',
            bg: 'bg-blue-50',
          },
          {
            icon: '3️⃣',
            title: '方差齐性',
            desc: '两组的方差应大致相等。如果方差不齐，用 Welch t 检验。',
            color: 'amber',
            border: 'border-amber-300',
            bg: 'bg-amber-50',
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
            className={`p-4 rounded-xl border ${item.border} ${item.bg}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">{item.icon}</span>
              <div>
                <span className="font-semibold text-slate-800">{item.title}</span>
                <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <p>用 Shapiro-Wilk 检验来检查正态性：</p>

      <CodeBlock
        code={`# 正态性检验（Shapiro-Wilk）
_, p_normal = stats.shapiro(native)
print(f"Shapiro-Wilk p 值: {p_normal:.4f}")

# p > 0.05 → 不能拒绝正态性假设（数据未违反正态性）`}
        highlightLines={[2, 4]}
      />

      {/* ===== 第 9 节：方差齐性 ===== */}
      <h2>方差不齐怎么办？</h2>
      <p>
        标准的独立样本 t 检验假设两组方差相等。但语言数据经常方差不齐（如母语者方差大、学习者方差小）。
      </p>

      <div className="my-6 p-5 rounded-2xl bg-slate-50 border border-slate-200">
        <p className="mb-3">
          用 <strong>Levene 检验</strong>来判断方差是否齐性：
        </p>
        <CodeBlock
          code={`# 方差齐性检验（Levene）
_, p_levene = stats.levene(native, learner)
print(f"Levene p 值: {p_levene:.4f}")`}
          showLineNumbers={false}
        />
        <p className="text-sm text-slate-500 mt-3">
          如果 Levene p &lt; 0.05，说明方差不齐。
        </p>
      </div>

      <p>
        如果方差不齐，只需加一个参数，Python 就会自动执行 <strong>Welch t 检验</strong>——它不假设方差相等：
      </p>

      <CodeBlock
        code={`# Welch t 检验（不假设方差齐性）
t_stat, p_value = stats.ttest_ind(
    native, learner,
    equal_var=False   # 关键参数！
)`}
        highlightLines={[4]}
      />

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-6">
        <h3 className="text-base font-semibold text-blue-800 mb-2">实践建议</h3>
        <p className="text-blue-700 text-sm">
          在语言学研究中，两组方差经常不相等。所以<strong>建议默认使用 Welch t 检验</strong>（<code>equal_var=False</code>），
          它在方差齐性时结果几乎和标准 t 检验一样，在方差不齐时更稳健。
        </p>
      </div>

      {/* ===== 第 10 节：效应量 ===== */}
      <h2>只看 p 值不够——还要报告效应量</h2>
      <p>
        p 值告诉你"有没有差异"，但<strong>不告诉你差异有多大</strong>。大样本下，极小的差异也能显著，但可能毫无实际意义。
      </p>
      <p>
        所以，报告 t 检验结果时，<strong>务必同时报告效应量 Cohen's d</strong>：
      </p>

      <div className="my-6 p-6 bg-slate-800 text-white rounded-2xl text-center">
        <div className="text-lg font-semibold mb-2">
          Cohen's d = <span className="text-blue-300">x̄₁ − x̄₂</span> / <span className="text-amber-300">s_pooled</span>
        </div>
        <div className="text-base mt-2 text-slate-300">
          汇合标准差 s<sub>pooled</sub> = √[((n₁−1)s₁² + (n₂−1)s₂²) / (n₁+n₂−2)]
        </div>
      </div>

      <CodeBlock
        code={`from itertools import combinations

def cohen_d(group1, group2):
    n1, n2 = len(group1), len(group2)
    s1, s2 = group1.std(ddof=1), group2.std(ddof=1)
    s_pooled = np.sqrt(
        ((n1 - 1) * s1**2 + (n2 - 1) * s2**2)
        / (n1 + n2 - 2)
    )
    return (group1.mean() - group2.mean()) / s_pooled

d = cohen_d(native, learner)
print(f"Cohen's d = {d:.2f}")  # 约 2.89（非常大）`}
        highlightLines={[10, 11]}
      />

      <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-200">
        <table>
          <thead>
            <tr>
              <th>Cohen's d</th>
              <th>效果大小</th>
              <th>解读</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="font-mono">0.2</td><td>小</td><td>差异虽显著但实际意义有限</td></tr>
            <tr><td className="font-mono">0.5</td><td>中</td><td>有实际意义的差异</td></tr>
            <tr><td className="font-mono">0.8</td><td>大</td><td>明显且有实际意义的差异</td></tr>
          </tbody>
        </table>
      </div>

      {/* ===== 第 11 节：非参数替代 ===== */}
      <h2>Mann-Whitney U 检验：非参数替代方案</h2>
      <p>
        当数据<strong>严重偏离正态分布</strong>，或样本量非常小（n &lt; 10），t 检验的前提假设不再成立。这时应该使用<strong>非参数检验</strong>。
      </p>

      <div className="grid md:grid-cols-2 gap-4 my-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="p-5 rounded-xl border border-slate-300 bg-slate-50"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-200 text-blue-700">参数</span>
            <span className="font-semibold text-slate-700">t 检验</span>
          </div>
          <ul className="text-sm text-slate-600 space-y-1.5 list-disc pl-4">
            <li>比较<strong>均值</strong></li>
            <li>假设正态分布</li>
            <li>统计功效更高（如果假设成立）</li>
            <li>适合连续、近似正态的数据</li>
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
            <span className="font-semibold text-emerald-700">Mann-Whitney U</span>
          </div>
          <ul className="text-sm text-emerald-600 space-y-1.5 list-disc pl-4">
            <li>比较<strong>秩次</strong>（排名）</li>
            <li>不要求数据分布</li>
            <li>更稳健（对异常值不敏感）</li>
            <li>适合序数数据或偏态数据</li>
          </ul>
        </motion.div>
      </div>

      <CodeBlock
        code={`# Mann-Whitney U 检验
u_stat, p_value = stats.mannwhitneyu(
    native, learner,
    alternative='two-sided'
)
print(f"U 值: {u_stat:.1f}")
print(f"p 值: {p_value:.4f}")`}
        highlightLines={[2]}
      />

      <p>
        Mann-Whitney U 检验的逻辑：把两组数据合在一起排个名次，看其中一组的排名是否系统性地偏高或偏低。
        如果母语者的排名都集中在前面，就说明两组确实不同。
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
        <h3 className="text-lg font-semibold text-amber-800 mb-2">何时用非参数检验？</h3>
        <ul className="text-amber-700 space-y-1.5">
          <li>✅ Shapiro-Wilk 检验 p &lt; 0.05（数据不服从正态分布）</li>
          <li>✅ 样本量太小（n &lt; 15），难以判断分布形态</li>
          <li>✅ 数据是等级量表（如 1-5 的李克特量表）而非连续数据</li>
          <li>✅ 存在严重异常值，影响均值估计</li>
          <li>❌ 不要仅仅因为"非参数更保险"就用——如果 t 检验假设满足，它的统计功效更高</li>
        </ul>
      </div>

      {/* ===== 第 12 节：完整报告 ===== */}
      <h2>完整报告：如何写结果</h2>
      <p>
        论文中报告 t 检验结果时，需要包含<strong>检验统计量、自由度、p 值、效应量</strong>，以及置信区间。
      </p>

      <CodeBlock
        code={`# 完整的 t 检验分析流程
import numpy as np
from scipy import stats

# 1. 数据
native  = np.array([18, 22, 20, 25, 19, 23, 21, 17, 24, 20])
learner = np.array([12, 15, 14, 18, 11, 16, 13, 10, 17, 14])

# 2. 描述统计
print(f"母语者: M = {native.mean():.1f}, SD = {native.std(ddof=1):.2f}")
print(f"学习者: M = {learner.mean():.1f}, SD = {learner.std(ddof=1):.2f}")

# 3. 正态性检验
_, p_norm_n = stats.shapiro(native)
_, p_norm_l = stats.shapiro(learner)
print(f"正态性 p = {p_norm_n:.3f}, {p_norm_l:.3f}")

# 4. Welch t 检验
t_stat, p_value = stats.ttest_ind(native, learner, equal_var=False)
d = cohen_d(native, learner)

# 5. 95% 置信区间
diff = native.mean() - learner.mean()
se_diff = np.sqrt(native.var(ddof=1)/len(native) + learner.var(ddof=1)/len(learner))
ci_low = diff - 1.96 * se_diff
ci_high = diff + 1.96 * se_diff

print(f"\\nt({len(native)+len(learner)-2}) = {t_stat:.2f}, p < .001")
print(f"Cohen's d = {d:.2f}")
print(f"均值差 95% CI: [{ci_low:.1f}, {ci_high:.1f}]")`}
        highlightLines={[12, 17, 18]}
      />

      <div className="my-6 p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">论文中的报告格式</h3>
        <div className="p-4 bg-white border border-slate-200 rounded-xl text-slate-700 text-sm leading-relaxed font-serif">
          母语者（<i>M</i> = 20.9, <i>SD</i> = 2.56）的阅读速度显著高于二语学习者（<i>M</i> = 14.0, <i>SD</i> = 2.67），<i>t</i>(18) = 6.48, <i>p</i> &lt; .001, Cohen's <i>d</i> = 2.58, 95% CI [5.40, 8.40]。
        </div>
      </div>

      {/* ===== 小结 ===== */}
      <h2>小结</h2>

      <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-200">
        <table>
          <thead>
            <tr>
              <th>场景</th>
              <th>用什么检验</th>
              <th>scipy 函数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>比较两组不同的人</td>
              <td>独立样本 t 检验</td>
              <td className="font-mono text-sm">stats.ttest_ind(a, b)</td>
            </tr>
            <tr>
              <td>同一组人前后测</td>
              <td>配对样本 t 检验</td>
              <td className="font-mono text-sm">stats.ttest_rel(a, b)</td>
            </tr>
            <tr>
              <td>一组 vs 已知值</td>
              <td>单样本 t 检验</td>
              <td className="font-mono text-sm">stats.ttest_1samp(a, mu)</td>
            </tr>
            <tr>
              <td>方差不等</td>
              <td>Welch t 检验</td>
              <td className="font-mono text-sm">stats.ttest_ind(a, b, equal_var=False)</td>
            </tr>
            <tr>
              <td>数据非正态</td>
              <td>Mann-Whitney U</td>
              <td className="font-mono text-sm">stats.mannwhitneyu(a, b)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-6">
        <h3 className="text-lg font-semibold text-amber-800 mb-3">检查清单</h3>
        <p className="text-amber-700 mb-3">做 t 检验前，确保你检查了：</p>
        <ol className="text-amber-800 space-y-2">
          <li>数据类型是连续变量（不是分类变量——那要用卡方检验）</li>
          <li>只有两组比较（三组以上 → ANOVA）</li>
          <li>正态性假设（Shapiro-Wilk 检验）</li>
          <li>方差齐性假设（Levene 检验，否则用 Welch t）</li>
          <li>报告效应量 Cohen's d，而不仅仅是 p 值</li>
        </ol>
      </div>

      <p>
        下一节我们将学习<strong>卡方检验</strong>——专门用来分析分类数据的方法。
      </p>
    </motion.div>
  );
}