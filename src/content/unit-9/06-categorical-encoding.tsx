import { useState } from 'react';
import { motion } from 'framer-motion';
import CodeBlock from '../../components/shared/CodeBlock';
import StepThrough from '../../components/shared/StepThrough';

// ── Encoding Visualizer ──────────────────────────────────────────
function EncodingVisualizer() {
  const [encoding, setEncoding] = useState<'dummy' | 'effect' | 'ordinal'>('dummy');

  const encodings = {
    dummy: {
      label: 'Dummy Coding（虚拟编码）',
      desc: '以第一个类别为参照组。每个系数表示该类别与参照组的差异。',
      cols: ['初级(参照)', '中级', '高级'],
      rows: [
        { cat: '初级', vals: ['1', '0', '0'] },
        { cat: '中级', vals: ['1', '1', '0'] },
        { cat: '高级', vals: ['1', '0', '1'] },
      ],
      interpretation: '中级系数 = 中级与初级的差异\n高级系数 = 高级与初级的差异',
      color: 'blue',
    },
    effect: {
      label: 'Effect Coding（效应编码）',
      desc: '以所有类别的均值为参照。系数表示每个类别与总均值的偏差。',
      cols: ['截距', '中级', '高级'],
      rows: [
        { cat: '初级', vals: ['1', '-1', '-1'] },
        { cat: '中级', vals: ['1', '1', '0'] },
        { cat: '高级', vals: ['1', '0', '1'] },
      ],
      interpretation: '截距 = 总均值\n中级系数 = 中级与总均值的偏差\n初级的系数 = -(中级系数 + 高级系数)',
      color: 'green',
    },
    ordinal: {
      label: 'Ordinal Coding（顺序编码）',
      desc: '假设类别之间等距。只有一个数值变量，值为 0, 1, 2。',
      cols: ['level'],
      rows: [
        { cat: '初级', vals: ['0'] },
        { cat: '中级', vals: ['1'] },
        { cat: '高级', vals: ['2'] },
      ],
      interpretation: '假设从初级到高级的"距离"相等。\n如果这个假设不成立，不应该用顺序编码。',
      color: 'purple',
    },
  };

  const enc = encodings[encoding];

  return (
    <div className="my-6 p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">编码方式交互对比</h3>
      <p className="text-sm text-slate-600 mb-4">
        同一个变量"语言水平"（初级/中级/高级），三种编码方式生成的特征矩阵不同。
      </p>
      <div className="flex gap-2 mb-4">
        {(['dummy', 'effect', 'ordinal'] as const).map((e) => (
          <button
            key={e}
            onClick={() => setEncoding(e)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              encoding === e ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {e === 'dummy' ? 'Dummy' : e === 'effect' ? 'Effect' : 'Ordinal'}
          </button>
        ))}
      </div>

      <p className={`text-sm mb-3 font-medium text-${enc.color}-700`}>{enc.label}</p>
      <p className="text-sm text-slate-600 mb-4">{enc.desc}</p>

      <div className="overflow-hidden rounded-xl border border-slate-200 mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-3 py-2 text-left font-semibold text-slate-600">类别</th>
              {enc.cols.map((col) => (
                <th key={col} className="px-3 py-2 text-center font-semibold text-slate-600">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {enc.rows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-3 py-2 font-semibold text-slate-800">{row.cat}</td>
                {row.vals.map((v, j) => (
                  <td key={j} className={`px-3 py-2 text-center font-mono ${
                    v === '0' ? 'text-slate-400' :
                    v === '1' || v === '-1' ? `text-${enc.color}-700 font-bold` :
                    'text-slate-700'
                  }`}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`p-3 rounded-xl bg-${enc.color}-50 border border-${enc.color}-200`}>
        <pre className={`text-xs text-${enc.color}-800 whitespace-pre-wrap`}>{enc.interpretation}</pre>
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
      <h2>分类变量编码</h2>
      <p>
        语言学研究中的自变量大部分是<strong>分类变量</strong>：语言水平（初/中/高）、语体（口语/书面语）、母语背景（中文/英文/日文）……
        但回归模型只能处理数字。把分类变量"翻译"成数字的过程叫<strong>编码</strong>（encoding / coding）。
        编码方式不同，模型的系数含义就不同。
      </p>

      <EncodingVisualizer />

      {/* ===== Dummy Coding ===== */}
      <h2>1. Dummy Coding（虚拟编码）</h2>
      <p>
        最常用的编码方式。k 个类别生成 k-1 个 0/1 变量，<strong>第一个类别作为参照组</strong>。
        模型系数表示每个类别与参照组的差异。
      </p>

      <CodeBlock
        code={`import pandas as pd
import statsmodels.formula.api as smf

# 模拟数据：不同语言水平的学习者的阅读成绩
df = pd.DataFrame({
    'proficiency': ['初级'] * 10 + ['中级'] * 10 + ['高级'] * 10,
    'score': [65, 70, 68, 72, 66, 71, 69, 67, 73, 64,
              78, 82, 80, 76, 81, 79, 83, 77, 84, 75,
              88, 92, 90, 86, 91, 89, 93, 87, 94, 85],
})

# 方法一：pd.get_dummies（手动控制参照组）
dummies = pd.get_dummies(df['proficiency'], prefix='prof', drop_first=True)
print(dummies.head())
#    prof_中级  prof_高级
# 0     False      False   ← 初级（参照组，两个都是 0）
# 1     False      False
# 10     True      False   ← 中级
# 20    False       True   ← 高级`}
        highlightLines={[13, 14]}
      />

      <div className="my-6 p-5 rounded-2xl border-2 border-blue-200 bg-blue-50">
        <h3 className="text-base font-semibold text-blue-800 mb-2">参照组的选择很重要</h3>
        <p className="text-blue-700 text-sm">
          Dummy coding 中，所有系数都是相对于参照组的差异。选择哪一组作为参照会影响结果的解读。
          通常选择<strong>理论上有意义的基线</strong>（如"初级水平"或"母语者"）作为参照组。
          <code>drop_first=True</code> 自动把第一列去掉作为参照。
        </p>
      </div>

      {/* ===== statsmodels C() ===== */}
      <h2>2. 在回归中使用 C() 函数</h2>
      <p>
        <code>statsmodels</code> 提供了 <code>C()</code> 函数，自动把分类变量进行编码，不用手动创建虚拟变量。
      </p>

      <StepThrough
        steps={[
          {
            title: '基本用法',
            content: (
              <>
                <CodeBlock
                  code={`import statsmodels.formula.api as smf

# C() 自动对分类变量做 dummy coding
# 参照组默认是字母序第一个
model = smf.ols('score ~ C(proficiency)', data=df).fit()
print(model.summary())`}
                  highlightLines={[4]}
                />
                <p className="text-sm text-slate-600 mt-2">
                  输出的 Intercept 是参照组（"初级"）的均值，C(proficiency)[T.中级] 是中级相对于初级的差异。
                </p>
              </>
            ),
          },
          {
            title: '指定参照组',
            content: (
              <>
                <CodeBlock
                  code={`# 指定"高级"为参照组
model = smf.ols(
    'score ~ C(proficiency, Treatment(reference="高级"))',
    data=df
).fit()

# 现在系数表示：初级 vs 高级、中级 vs 高级的差异
print(model.params)`}
                  highlightLines={[3]}
                />
              </>
            ),
          },
          {
            title: '效应编码',
            content: (
              <>
                <CodeBlock
                  code={`# 效应编码：系数表示与总均值的偏差
model = smf.ols(
    'score ~ C(proficiency, Sum)',
    data=df
).fit()

# Intercept = 总均值
# 每个系数 = 该类别与总均值的偏差
print(model.params)`}
                  highlightLines={[3]}
                />
                <p className="text-sm text-slate-600 mt-2">
                  <code>Sum</code> 表示效应编码（deviation coding）。最后一个类别的系数 = 前面所有系数之和的相反数。
                </p>
              </>
            ),
          },
        ]}
      />

      {/* ===== 编码方式选择 ===== */}
      <h2>3. 如何选择编码方式？</h2>

      <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">编码方式</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">何时使用</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">系数含义</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              ['Dummy (Treatment)', '有明确参照组时（如对照组 vs 实验组）', '与参照组的差异'],
              ['Effect (Sum)', '没有明确参照组，关注每个类别与总均值的偏差', '与总均值的偏差'],
              ['Helmert', '比较每个类别与后续类别的均值', '与后续类别均值的差异'],
              ['Ordinal', '类别有序且等距（如 A1/A2/B1/B2）', '每升一级的效应'],
            ].map(([method, when, meaning], i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-4 py-3 font-semibold text-blue-700">{method}</td>
                <td className="px-4 py-3 text-slate-600">{when}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== 多个分类变量 ===== */}
      <h2>4. 多个分类变量的交互</h2>
      <p>
        当模型中有多个分类变量时，编码方式影响交互效应的解读。
      </p>

      <CodeBlock
        code={`# 两个分类变量：语言水平 × 语体
df2 = pd.DataFrame({
    'proficiency': ['初级', '中级', '高级'] * 6,
    'register': ['口语', '书面语'] * 9,
    'score': [65, 70, 68, 72, 66, 71, 69, 67, 73, 64,
              78, 82, 80, 76, 81, 79, 83, 77],
})

# 主效应 + 交互效应
model = smf.ols(
    'score ~ C(proficiency) + C(register) + C(proficiency):C(register)',
    data=df2
).fit()

# 交互效应：不同语言水平在口语 vs 书面语上的差异是否不同
print(model.summary())`}
        highlightLines={[11, 12]}
      />

      {/* ===== 常见陷阱 ===== */}
      <h2>5. 常见陷阱</h2>

      <div className="my-6 space-y-3">
        {[
          {
            title: '把分类变量当数值输入',
            desc: '如果把"初级=1, 中级=2, 高级=3"直接当数值变量，模型假设每升一级的效应相等。这通常不成立。',
            fix: '用 C(proficiency) 而不是直接用 proficiency',
            color: 'red',
          },
          {
            title: '忘记检查参照组',
            desc: 'pandas 默认按字母序选参照组（如"高级"排在"初级"前面），可能不是你想要的。',
            fix: '用 Treatment(reference="初级") 明确指定',
            color: 'amber',
          },
          {
            title: '类别太多导致过拟合',
            desc: '如果有 50 种方言，每个方言一个虚拟变量，模型会非常复杂。',
            fix: '合并低频类别、用效应编码、或用混合效应模型',
            color: 'blue',
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className={`p-4 rounded-xl border-l-4 ${
              item.color === 'red' ? 'border-red-400 bg-red-50' :
              item.color === 'amber' ? 'border-amber-400 bg-amber-50' :
              'border-blue-400 bg-blue-50'
            }`}
          >
            <div className="font-semibold text-slate-800">{item.title}</div>
            <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
            <p className={`text-sm mt-1 font-medium ${
              item.color === 'red' ? 'text-red-700' :
              item.color === 'amber' ? 'text-amber-700' :
              'text-blue-700'
            }`}>修正：{item.fix}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-6">
        <h3 className="text-base font-semibold text-blue-800 mb-2">实践建议</h3>
        <p className="text-blue-700 text-sm">
          在语言学研究中，<strong>Dummy coding</strong> 是最常用的选择——它直接告诉你"某一组比参照组高/低多少"，容易向读者解释。
          如果没有明确的参照组，用 <strong>Effect coding</strong> 看每个类别与平均水准的偏差。
          永远不要把分类变量当数值直接输入回归模型。
        </p>
      </div>
    </motion.div>
  );
}
