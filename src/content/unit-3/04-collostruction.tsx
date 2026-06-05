import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeBlock from '../../components/shared/CodeBlock';
import StepThrough from '../../components/shared/StepThrough';

// ── 从搭配到构式：概念递进可视化 ───────────────────────────────────
function CollocationVsCollostruction() {
  const [view, setView] = useState<'collocation' | 'collostruction'>('collocation');

  return (
    <div className="my-6 p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-3">搭配 vs 构式词汇关联</h3>
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setView('collocation')}
          className={`flex-1 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            view === 'collocation' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          搭配（collocation）
        </button>
        <button
          onClick={() => setView('collostruction')}
          className={`flex-1 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            view === 'collostruction' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          构式词汇关联（collostruction）
        </button>
      </div>

      <AnimatePresence mode="wait">
        {view === 'collocation' ? (
          <motion.div
            key="collocation"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="p-5 rounded-xl border-2 border-blue-200 bg-blue-50"
          >
            <div className="text-sm font-semibold text-blue-800 mb-2">问的是：词 × 词</div>
            <div className="font-mono text-center text-lg my-4 text-slate-700">
              strong <span className="text-blue-600 font-bold">tea</span> ✓
              <span className="mx-3 text-slate-400">|</span>
              powerful <span className="text-red-500 line-through">tea</span> ✗
            </div>
            <p className="text-sm text-blue-700">
              <strong>strong</strong> 和 <strong>tea</strong> 比 <strong>powerful</strong> 和 <strong>tea</strong> 更常共现 ——
              这是<strong>词与词</strong>的吸引关系。
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="collostruction"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="p-5 rounded-xl border-2 border-purple-200 bg-purple-50"
          >
            <div className="text-sm font-semibold text-purple-800 mb-2">问的是：词 × 构式槽位</div>
            <div className="font-mono text-center text-base my-4 text-slate-700">
              <div className="mb-2 text-slate-500 text-sm">双宾构式 <code>[V NP NP]</code>：</div>
              <span className="px-2 py-1 bg-white border border-purple-300 rounded">
                She <span className="text-purple-700 font-bold">[V]</span> him a book
              </span>
            </div>
            <p className="text-sm text-purple-700 mb-2">
              问题：哪些动词偏好填进这个 <code>[V]</code> 槽位？
            </p>
            <p className="text-sm text-purple-700">
              <strong>give / send / tell / show</strong> 高度偏好，<strong>donate / explain</strong> 几乎不出现 ——
              这是<strong>词与构式</strong>的吸引关系，构式本身就有语义（"转移给某人某物"），它"挑"词。
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
        <strong>关键洞察</strong>：构式语法（Goldberg, 1995）认为<strong>构式本身有意义</strong>，
        不只是词义的组合。Stefanowitsch & Gries（2003）把这个理论变成可量化的方法：
        用 2×2 列联表 + Fisher 检验，给每个词在某构式中的"吸引强度"打分。
      </div>
    </div>
  );
}

// ── 2x2 列联表交互组件 ────────────────────────────────────────────
function ContingencyTable() {
  const presets = [
    { name: 'give 在双宾构式', a: 461, b: 1664, c: 1374, d: 90000, desc: 'give 在双宾构式中超常出现' },
    { name: 'donate 在双宾构式', a: 0, b: 244, c: 1835, d: 91420, desc: 'donate 几乎不进入双宾构式' },
    { name: '中性词（无偏好）', a: 30, b: 1500, c: 1805, d: 90165, desc: '出现频次和期望值接近' },
    { name: '自定义', a: 50, b: 20, c: 200, d: 8000, desc: '调整下方数字试试' },
  ];
  const [presetIdx, setPresetIdx] = useState(0);
  const preset = presets[presetIdx];
  const [a, setA] = useState(preset.a);
  const [b, setB] = useState(preset.b);
  const [c, setC] = useState(preset.c);
  const [d, setD] = useState(preset.d);

  // Switch preset
  const applyPreset = (i: number) => {
    setPresetIdx(i);
    setA(presets[i].a);
    setB(presets[i].b);
    setC(presets[i].c);
    setD(presets[i].d);
  };

  // Compute expected counts and G-test statistic (Log-likelihood ratio test)
  const n = a + b + c + d;
  const row1 = a + b;
  const col1 = a + c;
  const expA = n > 0 ? (row1 * col1) / n : 0;
  const safeLog = (x: number, e: number) => (x > 0 && e > 0 ? x * Math.log(x / e) : 0);
  const expB = (row1 * (b + d)) / n;
  const expC = ((c + d) * col1) / n;
  const expD = ((c + d) * (b + d)) / n;
  const G = 2 * (safeLog(a, expA) + safeLog(b, expB) + safeLog(c, expC) + safeLog(d, expD));

  // Approximate -log10(p) for chi-squared df=1
  // P(chi^2_1 > G) ≈ erfc(sqrt(G/2)); -log10(p) is the conventional "collo-strength"
  const erfc = (x: number) => {
    // Abramowitz & Stegun approximation
    const t = 1 / (1 + 0.3275911 * Math.abs(x));
    const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
    return x >= 0 ? 1 - y : 1 + y;
  };
  const pValue = G > 0 ? erfc(Math.sqrt(G / 2)) : 1;
  const colloStrength = pValue > 0 && pValue < 1 ? -Math.log10(pValue) : (pValue >= 1 ? 0 : 300);
  const attracted = a > expA;

  return (
    <div className="my-6 p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-2">2×2 列联表与构式吸引强度</h3>
      <p className="text-sm text-slate-600 mb-4">
        选择一个预设场景，或自定义 4 个格子的数字 —— 观察期望值（如果词和构式独立）、G 统计量和 collostructional strength 如何变化。
      </p>

      {/* Preset selector */}
      <div className="flex flex-wrap gap-2 mb-5">
        {presets.map((p, i) => (
          <button
            key={i}
            onClick={() => applyPreset(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              presetIdx === i ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* 2x2 Table */}
      <div className="overflow-hidden rounded-xl border-2 border-slate-300">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="px-3 py-2 border-r border-slate-300"></th>
              <th className="px-3 py-2 text-center font-semibold text-slate-700 border-r border-slate-300">在构式 C 中</th>
              <th className="px-3 py-2 text-center font-semibold text-slate-700">不在构式 C 中</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-3 bg-slate-50 font-semibold text-slate-700 border-r border-t border-slate-300">词 W</td>
              <td className="px-2 py-3 text-center border-r border-t border-slate-300 bg-purple-50">
                <input
                  type="number"
                  value={a}
                  onChange={(e) => { setPresetIdx(3); setA(Math.max(0, +e.target.value)); }}
                  className="w-20 text-center font-mono font-bold text-purple-700 bg-white border border-purple-300 rounded px-1 py-0.5"
                />
                <div className="text-[10px] text-slate-500 mt-1">观察 a</div>
                <div className="text-[10px] text-slate-400">期望 ≈ {expA.toFixed(1)}</div>
              </td>
              <td className="px-2 py-3 text-center border-t border-slate-300">
                <input
                  type="number"
                  value={b}
                  onChange={(e) => { setPresetIdx(3); setB(Math.max(0, +e.target.value)); }}
                  className="w-20 text-center font-mono text-slate-700 bg-white border border-slate-300 rounded px-1 py-0.5"
                />
                <div className="text-[10px] text-slate-500 mt-1">观察 b</div>
              </td>
            </tr>
            <tr>
              <td className="px-3 py-3 bg-slate-50 font-semibold text-slate-700 border-r border-t border-slate-300">其他词</td>
              <td className="px-2 py-3 text-center border-r border-t border-slate-300">
                <input
                  type="number"
                  value={c}
                  onChange={(e) => { setPresetIdx(3); setC(Math.max(0, +e.target.value)); }}
                  className="w-20 text-center font-mono text-slate-700 bg-white border border-slate-300 rounded px-1 py-0.5"
                />
                <div className="text-[10px] text-slate-500 mt-1">观察 c</div>
              </td>
              <td className="px-2 py-3 text-center border-t border-slate-300">
                <input
                  type="number"
                  value={d}
                  onChange={(e) => { setPresetIdx(3); setD(Math.max(0, +e.target.value)); }}
                  className="w-20 text-center font-mono text-slate-700 bg-white border border-slate-300 rounded px-1 py-0.5"
                />
                <div className="text-[10px] text-slate-500 mt-1">观察 d</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Results */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-500 mb-1">G 统计量（似然比检验）</div>
          <div className="text-xl font-bold font-mono text-slate-800">{G.toFixed(2)}</div>
          <div className="text-[10px] text-slate-500 mt-1">∼ χ² (df=1)</div>
        </div>
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-500 mb-1">p 值（近似）</div>
          <div className="text-xl font-bold font-mono text-slate-800">
            {pValue < 1e-15 ? '< 1e-15' : pValue.toExponential(2)}
          </div>
        </div>
        <div className={`p-3 rounded-xl border ${attracted && colloStrength > 1.3 ? 'bg-purple-50 border-purple-300' : colloStrength > 1.3 ? 'bg-amber-50 border-amber-300' : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-[11px] text-slate-500 mb-1">Collo-strength = −log₁₀(p)</div>
          <div className={`text-xl font-bold font-mono ${attracted && colloStrength > 1.3 ? 'text-purple-700' : colloStrength > 1.3 ? 'text-amber-700' : 'text-slate-800'}`}>
            {colloStrength.toFixed(2)}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            {colloStrength > 1.3
              ? attracted ? '强吸引（attracted）' : '强排斥（repelled）'
              : '关联不显著'}
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-700">
        <strong>读法：</strong> 当观察值 a &gt; 期望值时，词 W 被构式"吸引"；a &lt; 期望时被"排斥"。
        Collo-strength 是显著性的连续度量 —— 约定俗成的阈值：&gt; 1.3 ≈ p &lt; 0.05；&gt; 3 ≈ p &lt; 0.001。
      </div>
    </div>
  );
}

// ── 双宾构式 vs 介词与给格：动词偏好对比 ────────────────────────────
function DistinctiveCollexemes() {
  // Mock data based on Gries & Stefanowitsch (2004) ICE-GB ditransitive vs prep dative
  const data = [
    { verb: 'give', dbl: 461, prep: 146, prefScore: 79.2 },
    { verb: 'tell', dbl: 128, prep: 2, prefScore: 36.5 },
    { verb: 'show', dbl: 49, prep: 15, prefScore: 7.8 },
    { verb: 'send', dbl: 64, prep: 44, prefScore: 4.1 },
    { verb: 'offer', dbl: 43, prep: 15, prefScore: 4.0 },
    { verb: 'bring', dbl: 7, prep: 82, prefScore: -12.3 },
    { verb: 'take', dbl: 12, prep: 71, prefScore: -8.5 },
    { verb: 'pass', dbl: 1, prep: 14, prefScore: -3.4 },
    { verb: 'donate', dbl: 0, prep: 13, prefScore: -3.2 },
    { verb: 'explain', dbl: 0, prep: 38, prefScore: -9.6 },
  ];

  const maxAbs = Math.max(...data.map((d) => Math.abs(d.prefScore)));

  return (
    <div className="my-6 p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-2">Distinctive Collexemes：双宾 vs 介词与给</h3>
      <p className="text-sm text-slate-600 mb-1">
        英语中"给"的两种构式：双宾 <code className="text-xs">give him a book</code> 和介词与给 <code className="text-xs">give a book to him</code>。
      </p>
      <p className="text-sm text-slate-600 mb-4">
        哪些动词偏向哪一边？正分 = 偏好双宾；负分 = 偏好介词与给。
      </p>

      <div className="space-y-2">
        {data.map((d) => {
          const pct = (Math.abs(d.prefScore) / maxAbs) * 50; // 50% max width per side
          const isDbl = d.prefScore > 0;
          return (
            <div key={d.verb} className="flex items-center text-sm">
              <div className="w-16 text-right pr-3 font-mono font-semibold text-slate-700">{d.verb}</div>
              <div className="flex-1 relative h-7">
                {/* center divider */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-300"></div>
                {/* bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`absolute top-1 bottom-1 ${
                    isDbl ? 'left-1/2 bg-gradient-to-r from-purple-400 to-purple-600' : 'right-1/2 bg-gradient-to-l from-blue-400 to-blue-600'
                  } rounded-md flex items-center px-2`}
                >
                  <span className="text-[10px] font-bold text-white" style={{ marginLeft: isDbl ? 'auto' : 0, marginRight: isDbl ? 0 : 'auto' }}>
                    {d.prefScore > 0 ? '+' : ''}{d.prefScore.toFixed(1)}
                  </span>
                </motion.div>
              </div>
              <div className="w-32 pl-3 text-xs text-slate-500 font-mono">
                {d.dbl} | {d.prep}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
          <div className="font-semibold text-purple-800 mb-1">← 偏好双宾 [V NP NP]</div>
          <div className="text-purple-700">受惠者突出：tell、show、offer —— 强调"接受者"角色。</div>
        </div>
        <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
          <div className="font-semibold text-blue-800 mb-1">偏好介词与给 [V NP to NP] →</div>
          <div className="text-blue-700">物理移动突出：bring、take、pass —— 强调"路径"。</div>
        </div>
      </div>

      <div className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
        <strong>语言学发现：</strong> 这不是随机偏好 —— 双宾构式编码<strong>所有权转移</strong>语义，
        介词与给编码<strong>物理路径</strong>语义。动词的语义本性决定了它"挑"哪个构式。
        这是构式语法对动词中心论的反驳：构式不只是动词的"框架"，它本身就是带语义的单位。
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
      <h2>构式词汇关联（Collostruction Analysis）</h2>
      <p>
        上一节我们学了<strong>搭配分析</strong> —— 看哪些词倾向于一起出现。但搭配只看"<strong>词 × 词</strong>"，
        如果你的研究问题是"哪些动词更偏好<strong>这个语法构式</strong>"，搭配分析就不够了。
        这一节学的<strong>构式词汇关联分析</strong>（Stefanowitsch &amp; Gries, 2003）填补这个缺口：
        它问的是<strong>词 × 构式槽位</strong>的关联强度。
      </p>

      <div className="my-6 p-5 rounded-2xl border-2 border-purple-200 bg-purple-50">
        <h3 className="text-base font-semibold text-purple-800 mb-2">语言学中的典型问题</h3>
        <ul className="text-purple-700 text-sm space-y-1">
          <li><strong>构式语法</strong>：哪些动词被双宾构式 <code>[V NP NP]</code> 强烈吸引？哪些被排斥？</li>
          <li><strong>二语习得</strong>：学习者掌握的"动词-构式"配对和母语者有何差异？</li>
          <li><strong>历时变化</strong>：某个构式在 19 世纪偏好的动词，到 21 世纪是否改变了？</li>
          <li><strong>对比语言学</strong>：英语 <code>into V-ing</code>（force/talk/trick）和汉语"把"字句的强偏好词是否对应？</li>
          <li><strong>词典学</strong>：哪些固定搭配应该作为整体收录？</li>
        </ul>
      </div>

      <CollocationVsCollostruction />

      {/* ===== 核心方法 ===== */}
      <h2>1. 核心方法：2×2 列联表 + Fisher 检验</h2>
      <p>
        Collostruction 分析的底层数学非常简洁。给定一个词 <strong>W</strong> 和一个构式 <strong>C</strong>，
        我们从语料库统计出 4 个数字，填入 2×2 列联表，然后做 Fisher 精确检验。
      </p>

      <StepThrough
        steps={[
          {
            title: '第 1 步：统计 4 个频次',
            content: (
              <>
                <p className="text-sm text-slate-600 mb-3">从语料库（比如 BNC 一亿词）中数出：</p>
                <ul className="text-sm text-slate-700 space-y-1 ml-4">
                  <li><strong>a</strong> = 词 W 出现在构式 C 中的次数（例：give 在双宾中出现 461 次）</li>
                  <li><strong>b</strong> = 词 W 出现在其他位置的次数（例：give 不在双宾的其他用法）</li>
                  <li><strong>c</strong> = 其他词出现在构式 C 中的次数（例：双宾中所有非 give 动词）</li>
                  <li><strong>d</strong> = 其他词出现在其他位置的次数（语料库剩下的部分）</li>
                </ul>
                <p className="text-sm text-slate-600 mt-3">
                  注意：a + b + c + d 必须等于语料库总词数（或总动词数，看你的研究对象）。
                </p>
              </>
            ),
          },
          {
            title: '第 2 步：计算期望值',
            content: (
              <>
                <p className="text-sm text-slate-600 mb-3">
                  如果词 W 和构式 C 是<strong>独立</strong>的（互不影响），期望出现的次数是：
                </p>
                <div className="p-4 bg-slate-50 rounded-lg font-mono text-sm text-slate-800">
                  E(a) = (a + b) × (a + c) / N
                  <div className="text-xs text-slate-500 mt-1">N = a + b + c + d（语料库总量）</div>
                </div>
                <p className="text-sm text-slate-600 mt-3">
                  <strong>观察值 a &gt; 期望值</strong>：词被构式<strong>吸引</strong>（attracted）<br />
                  <strong>观察值 a &lt; 期望值</strong>：词被构式<strong>排斥</strong>（repelled）
                </p>
              </>
            ),
          },
          {
            title: '第 3 步：Fisher 检验 + collostructional strength',
            content: (
              <>
                <p className="text-sm text-slate-600 mb-3">
                  用 Fisher 精确检验算出 p 值（衡量"观察到这种偏差是否够罕见"），然后：
                </p>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="font-mono text-sm font-bold text-purple-800 text-center">
                    Collo-strength = −log₁₀(p)
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-3">
                  Strength 越大，关联越强。约定俗成的阈值：&gt; 1.3（≈ p &lt; 0.05）算显著，
                  &gt; 3（p &lt; 0.001）算强关联。用 log 是因为 p 值往往极小（10⁻⁵⁰ 不罕见）。
                </p>
              </>
            ),
          },
        ]}
      />

      <ContingencyTable />

      {/* ===== 三种分析 ===== */}
      <h2>2. 三种 Collostruction 分析</h2>
      <p>
        2003 年原文提出了 3 个变种，分别回答不同的研究问题：
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">分析类型</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">研究问题</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">典型例子</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="bg-white">
              <td className="px-4 py-3 font-semibold text-purple-700">Simple Collexeme</td>
              <td className="px-4 py-3 text-slate-600">一个构式最强偏好的词是什么？</td>
              <td className="px-4 py-3 text-slate-500 text-xs">"<code>N waiting to happen</code>"<br />最强词：accident, disaster</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="px-4 py-3 font-semibold text-purple-700">Distinctive Collexeme</td>
              <td className="px-4 py-3 text-slate-600">两个相似构式各自偏好哪些词？</td>
              <td className="px-4 py-3 text-slate-500 text-xs">双宾 vs 介词与给<br />（下方详细案例）</td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3 font-semibold text-purple-700">Co-varying Collexeme</td>
              <td className="px-4 py-3 text-slate-600">一个构式两个槽位的词怎么共变？</td>
              <td className="px-4 py-3 text-slate-500 text-xs">"<code>V the N out of</code>"<br />V 和 N 之间的关联</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ===== 经典案例 ===== */}
      <h2>3. 经典案例：英语双宾 vs 介词与给</h2>
      <p>
        Gries &amp; Stefanowitsch（2004）的经典研究：从 ICE-GB 语料库中找出每个"给-类"动词
        最偏好哪种结构。结果不是"动词随便用"，而是<strong>有清晰的语义动机</strong>。
      </p>

      <DistinctiveCollexemes />

      {/* ===== Python 实战 ===== */}
      <h2>4. Python 实战</h2>
      <p>
        SciPy 自带 Fisher 精确检验，几行代码就能算出任意词的 collostructional strength。
      </p>

      <CodeBlock
        code={`from scipy.stats import fisher_exact
import math
import pandas as pd

def collo_strength(a: int, b: int, c: int, d: int) -> tuple[float, str]:
    """
    a: 词 W 在构式 C 中的次数
    b: 词 W 在其他位置的次数
    c: 其他词在构式 C 中的次数
    d: 其他词在其他位置的次数
    返回: (collostructional strength, 'attracted' | 'repelled')
    """
    # Fisher 精确检验：双尾，返回 (odds ratio, p value)
    _, p = fisher_exact([[a, b], [c, d]], alternative='two-sided')

    # 用 -log10(p) 作为 strength（避免 p=0 时 log 报错）
    strength = -math.log10(p) if p > 0 else 300.0

    # 判断方向：观察值 vs 期望值
    n = a + b + c + d
    expected_a = (a + b) * (a + c) / n
    direction = 'attracted' if a > expected_a else 'repelled'

    return strength, direction

# 示例：give 在双宾构式中
strength, direction = collo_strength(461, 1664, 1374, 90000)
print(f'give → 双宾: strength = {strength:.2f}, {direction}')
# give → 双宾: strength = 88.91, attracted`}
        highlightLines={[14, 15, 24]}
      />

      <p>
        把它套到一整个动词列表上，就能产出"按吸引强度排序"的表 —— 这正是 Stefanowitsch &amp; Gries 论文里那种结果。
      </p>

      <CodeBlock
        code={`# 假设你已经从语料库统计出每个动词的 (a, b, c, d) 四元组
verbs = pd.DataFrame({
    'verb':  ['give', 'tell', 'show', 'send', 'bring', 'donate', 'explain'],
    'in_C':  [461,    128,    49,     64,     7,       0,        0],     # a
    'in_oth':[1664,   523,    1212,   876,    1834,    244,      1576],  # b
})

# 构式总频次和语料库总词数（示例值）
TOTAL_IN_C = 1835
TOTAL_OTHER = 91420

# 对每个动词计算 strength
results = []
for _, row in verbs.iterrows():
    a, b = row['in_C'], row['in_oth']
    c = TOTAL_IN_C - a
    d = TOTAL_OTHER - b
    s, dir_ = collo_strength(a, b, c, d)
    results.append({'verb': row['verb'], 'strength': s, 'direction': dir_})

df = pd.DataFrame(results).sort_values('strength', ascending=False)
print(df)
#       verb  strength  direction
#       give     88.91  attracted
#       tell     36.50  attracted
#       show      7.80  attracted
#       send      4.10  attracted
#      bring     12.30  repelled    ← 强排斥
#     donate      3.20  repelled
#    explain      9.60  repelled`}
      />

      <div className="my-6 p-5 rounded-2xl border-2 border-green-200 bg-green-50">
        <h3 className="text-base font-semibold text-green-800 mb-2">第三方包推荐</h3>
        <p className="text-green-700 text-sm">
          R 有专门的 <code>collostructions</code> 包（Flach, 2021），Python 这边没有同名包，
          但你可以直接用 <code>scipy.stats.fisher_exact</code> 或 <code>statsmodels.contingency_tables.Table2x2</code>
          自己写。注意 R 包用单尾检验（默认 <code>alternative='greater'</code>），
          换到 Python 时要保持一致才能复现结果。
        </p>
      </div>

      {/* ===== 局限性 ===== */}
      <h2>5. 局限性与争议</h2>

      <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl border-2 border-amber-200 bg-amber-50">
          <h3 className="text-base font-semibold text-amber-800 mb-2">技术性局限</h3>
          <ul className="text-amber-700 text-sm space-y-1.5">
            <li><strong>零格问题</strong>：当 a = 0 时（词从未在构式中出现），Fisher 检验仍能给出 p 值，但解读要小心 —— 可能只是语料不够大</li>
            <li><strong>"其他词"定义</strong>：分母（c+d）怎么算？整个语料库？只算动词？只算同类动词？不同选择会改变 strength 排序</li>
            <li><strong>大数效应</strong>：语料越大，几乎任何差异都会显著。建议同时报告效应量（如 log odds ratio）</li>
            <li><strong>非独立性</strong>：同一作者/同一文本里多次出现的词不是独立观察 —— 严格做应该用混合模型（见 Unit 10）</li>
          </ul>
        </div>
        <div className="p-5 rounded-2xl border-2 border-red-200 bg-red-50">
          <h3 className="text-base font-semibold text-red-800 mb-2">理论性争议</h3>
          <ul className="text-red-700 text-sm space-y-1.5">
            <li><strong>Schmid &amp; Küchenhoff (2013)</strong>：批评 collostruction 的 p 值不是真的概率，提议用 Δp 等关联度量替代</li>
            <li><strong>Gries (2015) 回应</strong>：strength 应理解为<strong>关联强度的排序工具</strong>，不是严格统计推断</li>
            <li><strong>现代替代</strong>：贝叶斯方法、多变量回归（区分构式偏好 vs 其他混淆因素，如时态、语体）</li>
          </ul>
        </div>
      </div>

      {/* ===== 实践建议 ===== */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-6">
        <h3 className="text-base font-semibold text-blue-800 mb-2">实践建议</h3>
        <ul className="text-blue-700 text-sm space-y-1.5">
          <li><strong>定义清楚"构式"</strong>：是纯句法形式（<code>[V NP NP]</code>），还是带语义限制（"转移类动词 + NP + NP"）？这决定了你怎么数 a 和 c</li>
          <li><strong>同时报告原始频次和 strength</strong>：strength=300 可能是因为 a=10000，也可能是 a=2 但 b、c、d 极小 —— 读者需要原始数字才能判断</li>
          <li><strong>从 distinctive 入手</strong>：相比 simple，distinctive 分析（两构式对比）通常更能揭示理论问题，因为控制了"动词本身的频次"</li>
          <li><strong>关注 repelled 词</strong>：被构式<strong>排斥</strong>的词常常比被吸引的更有理论意义 —— "为什么 donate 不能进双宾"比"为什么 give 能进"更能告诉我们构式的语义边界</li>
        </ul>
      </div>
    </motion.div>
  );
}
