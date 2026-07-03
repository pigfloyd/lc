import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ── 决策树数据 ──────────────────────────────────────────────
// next 以 'r:' 开头表示到达结果，否则是下一个问题的 id

interface FlowOption {
  label: string;
  hint?: string;
  next: string;
}

interface FlowNode {
  id: string;
  question: string;
  hint?: string;
  options: FlowOption[];
}

interface SectionLink {
  to: string;
  label: string;
}

interface FlowResult {
  id: string;
  emoji: string;
  name: string;
  when: string;
  example: string;
  links: SectionLink[];
  notes?: { text: string; link?: SectionLink }[];
}

const NODES: FlowNode[] = [
  {
    id: 'start',
    question: '你想回答哪类问题？',
    hint: '从你的研究问题出发，而不是从方法名出发。',
    options: [
      {
        label: '比较差异',
        hint: 'A 组和 B 组不一样吗？条件 1 和条件 2 哪个更快？',
        next: 'diff-dv',
      },
      {
        label: '分析关系',
        hint: 'X 和 Y 有关系吗？会一起变化吗？',
        next: 'rel-type',
      },
      {
        label: '建模解释 / 预测',
        hint: '哪些因素共同决定了这个结果？',
        next: 'model-dv',
      },
    ],
  },
  {
    id: 'diff-dv',
    question: '你比较的东西（因变量）是什么类型？',
    options: [
      {
        label: '连续数值',
        hint: '反应时、评分、句长、正确率……',
        next: 'diff-groups',
      },
      {
        label: '频数 / 比例',
        hint: '出现次数、人数——"数出来"的数据',
        next: 'r:chi-square',
      },
    ],
  },
  {
    id: 'diff-groups',
    question: '要比较几组（几个条件）？',
    options: [
      { label: '两组', hint: '如：母语者 vs 学习者', next: 'diff-paired' },
      { label: '三组及以上', hint: '如：初级 / 中级 / 高级', next: 'diff-rm' },
    ],
  },
  {
    id: 'diff-paired',
    question: '两组数据是独立的，还是同一批被试 / 文本测了两次？',
    options: [
      {
        label: '独立的两组',
        hint: '不同的人、不同的文本',
        next: 'diff-normal',
      },
      {
        label: '同一批测两次',
        hint: '前测 vs 后测、同一人的两种条件',
        next: 'r:paired-t',
      },
    ],
  },
  {
    id: 'diff-normal',
    question: '数据分布大致对称吗？（或每组样本量 ≥ 30）',
    hint: '不确定的话，先画个直方图看看。',
    options: [
      { label: '是，或样本量够大', next: 'r:t-test' },
      { label: '明显偏态，而且样本很小', next: 'r:mann-whitney' },
    ],
  },
  {
    id: 'diff-rm',
    question: '是不同的人分在不同组，还是同一批人经历所有条件？',
    options: [
      {
        label: '不同的人（被试间）',
        hint: '每人只属于一个组',
        next: 'r:anova',
      },
      {
        label: '同一批人（被试内 / 重复测量）',
        hint: '每人经历全部条件',
        next: 'r:rm-anova',
      },
    ],
  },
  {
    id: 'rel-type',
    question: '你关心的两个变量分别是什么类型？',
    options: [
      {
        label: '都是连续数值',
        hint: '如：词频 ↔ 反应时',
        next: 'r:correlation',
      },
      {
        label: '都是分类变量',
        hint: '如：性别 ↔ 语体选择',
        next: 'r:chi-square',
      },
      {
        label: '词和词 / 词和构式的共现',
        hint: '如："掀起"更爱跟哪些宾语？',
        next: 'r:collocation',
      },
    ],
  },
  {
    id: 'model-dv',
    question: '你要解释 / 预测的结果变量是什么类型？',
    options: [
      {
        label: '连续数值',
        hint: '反应时、评分、频次……',
        next: 'model-nest-cont',
      },
      {
        label: '二元选择',
        hint: '正确 / 错误、选 A / 选 B、有 / 无某形式',
        next: 'model-nest-bin',
      },
    ],
  },
  {
    id: 'model-nest-cont',
    question: '数据有嵌套结构吗？（同一被试 / 词项贡献多条数据）',
    options: [
      { label: '没有，每行数据来自不同个体', next: 'r:linear-reg' },
      { label: '有嵌套', hint: '如：40 名被试 × 60 个词', next: 'r:lmm' },
    ],
  },
  {
    id: 'model-nest-bin',
    question: '数据有嵌套结构吗？（同一被试 / 词项贡献多条数据）',
    options: [
      { label: '没有，每行数据来自不同个体', next: 'r:logistic-reg' },
      { label: '有嵌套', hint: '如：每个被试做了很多道题', next: 'r:glmm' },
    ],
  },
];

const RESULTS: FlowResult[] = [
  {
    id: 't-test',
    emoji: '⚖️',
    name: '独立样本 t 检验',
    when: '比较两组独立样本的均值差异。',
    example: '母语者和学习者的平均句长有区别吗？',
    links: [{ to: '/unit/comparison/01-t-test', label: 't 检验与 Mann-Whitney U' }],
    notes: [
      {
        text: '报告时别忘了效应量（Cohen’s d）',
        link: { to: '/unit/inference-basics/04-effect-size', label: '效应量' },
      },
    ],
  },
  {
    id: 'mann-whitney',
    emoji: '🪜',
    name: 'Mann-Whitney U 检验',
    when: '两组独立样本，数据偏态且样本小时，代替 t 检验的非参数方法。',
    example: '两个小班（各 12 人）的可接受性评分中位数有区别吗？',
    links: [{ to: '/unit/comparison/01-t-test', label: 't 检验与 Mann-Whitney U' }],
  },
  {
    id: 'paired-t',
    emoji: '🔁',
    name: '配对 t 检验 / Wilcoxon 符号秩检验',
    when: '同一批被试或文本测了两次，比较前后差异。',
    example: '教学干预前后，同一批学生的词汇量提高了吗？',
    links: [{ to: '/unit/comparison/06-paired-test', label: '配对检验与重复测量' }],
    notes: [{ text: '差值明显偏态时用 Wilcoxon 符号秩检验（同一章讲解）' }],
  },
  {
    id: 'anova',
    emoji: '📊',
    name: '单因素方差分析（ANOVA）',
    when: '比较三组及以上独立组的均值差异。',
    example: '初、中、高级学习者的口语流利度有区别吗？',
    links: [{ to: '/unit/comparison/03-anova', label: '方差分析（ANOVA）' }],
    notes: [
      {
        text: 'ANOVA 显著只说明"有组不一样"——事后两两比较要做多重比较校正',
        link: { to: '/unit/comparison/05-multiple-correction', label: '多重比较校正' },
      },
    ],
  },
  {
    id: 'rm-anova',
    emoji: '🔄',
    name: '重复测量方差分析',
    when: '同一批被试经历三个及以上条件，比较条件间差异。',
    example: '同一批被试读三种句式，反应时有区别吗？',
    links: [{ to: '/unit/comparison/06-paired-test', label: '配对检验与重复测量' }],
    notes: [
      {
        text: '重复测量数据往往用混合效应模型更稳、更灵活',
        link: { to: '/unit/hierarchy/01-why-mixed', label: '为什么需要混合模型' },
      },
    ],
  },
  {
    id: 'chi-square',
    emoji: '🎲',
    name: '卡方检验',
    when: '比较频数 / 比例的差异，或检验两个分类变量是否相关。',
    example: '被动句在新闻语体和口语语体中的出现次数有区别吗？',
    links: [{ to: '/unit/comparison/02-chi-square', label: '卡方检验' }],
    notes: [
      {
        text: '语料库词频比较建议同时报告效应量（如 Cramér’s V）',
        link: { to: '/unit/inference-basics/04-effect-size', label: '效应量' },
      },
    ],
  },
  {
    id: 'correlation',
    emoji: '🔗',
    name: '相关分析（Pearson / Spearman）',
    when: '两个连续变量是否一起变化、朝什么方向变化。',
    example: '词频越高，词汇判断的反应时越短吗？',
    links: [{ to: '/unit/association/04-correlation', label: '相关分析' }],
    notes: [{ text: '相关 ≠ 因果；数据偏态或有序数据用 Spearman（同一章讲解）' }],
  },
  {
    id: 'collocation',
    emoji: '🧲',
    name: '搭配 / 构式词汇关联分析',
    when: '词与词、词与构式的共现是否超出偶然水平。',
    example: '"掀起"更偏爱"波澜"还是"浪潮"？哪些动词偏爱进入"把"字句？',
    links: [
      { to: '/unit/association/03-collocation', label: '搭配分析' },
      { to: '/unit/association/04-collostruction', label: '构式词汇关联' },
    ],
  },
  {
    id: 'linear-reg',
    emoji: '📈',
    name: '线性回归',
    when: '用多个因素共同解释 / 预测一个连续结果。',
    example: '词频、词长、语境可预测性共同影响阅读时间吗？',
    links: [{ to: '/unit/trends/01-linear-regression', label: '线性回归' }],
    notes: [
      {
        text: '语言学自变量几乎都是分类变量，编码方式影响系数解读',
        link: { to: '/unit/trends/06-categorical-encoding', label: '分类变量编码' },
      },
      {
        text: '拟合完要做模型诊断',
        link: { to: '/unit/trends/04-model-diagnostics', label: '模型诊断' },
      },
    ],
  },
  {
    id: 'logistic-reg',
    emoji: '🔀',
    name: '逻辑回归',
    when: '用多个因素解释 / 预测一个二元选择。',
    example: '语境的哪些因素决定说话人用"了"还是不用"了"？',
    links: [{ to: '/unit/decision/02-logistic-regression', label: '逻辑回归' }],
  },
  {
    id: 'lmm',
    emoji: '🏔️',
    name: '线性混合效应模型',
    when: '连续结果 + 嵌套数据——用随机效应处理被试和词项差异。',
    example: '40 名被试 × 60 个词的反应时数据，怎么同时控制个体差异和词项差异？',
    links: [
      { to: '/unit/hierarchy/01-why-mixed', label: '为什么需要混合模型' },
      { to: '/unit/hierarchy/05-python-implementation', label: 'Python 实现' },
    ],
  },
  {
    id: 'glmm',
    emoji: '⛰️',
    name: '广义线性混合模型（GLMM）',
    when: '二元结果 + 嵌套数据——语言学量化研究最典型的组合。',
    example: '每个被试做了 48 道语法判断题（对 / 错），怎么建模正确率？',
    links: [{ to: '/unit/hierarchy/06-glmm', label: '广义线性混合模型' }],
  },
];

// ── 交互式向导 ──────────────────────────────────────────────

const slideVariants = {
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -32 },
};

function FlowWizard() {
  const [trail, setTrail] = useState<{ nodeId: string; chosen: string }[]>([]);
  const [current, setCurrent] = useState('start');

  const isResult = current.startsWith('r:');
  const node = isResult ? null : NODES.find((n) => n.id === current);
  const result = isResult ? RESULTS.find((r) => r.id === current.slice(2)) : null;

  const choose = (opt: FlowOption) => {
    if (!node) return;
    setTrail((prev) => [...prev, { nodeId: node.id, chosen: opt.label }]);
    setCurrent(opt.next);
  };

  const rewindTo = (index: number) => {
    setCurrent(trail[index].nodeId);
    setTrail((prev) => prev.slice(0, index));
  };

  const reset = () => {
    setTrail([]);
    setCurrent('start');
  };

  return (
    <div className="my-6 p-5 sm:p-6 bg-white rounded-2xl border-2 border-slate-200 shadow-sm">
      {/* 已走过的路径 */}
      {trail.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {trail.map((step, i) => (
            <button
              key={`${step.nodeId}-${i}`}
              onClick={() => rewindTo(i)}
              title="点击回到这一步"
              className="group flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full
                bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              <span>{step.chosen}</span>
              <span className="text-blue-300 group-hover:text-blue-500">✎</span>
            </button>
          ))}
          <button
            onClick={reset}
            className="px-2.5 py-1 text-xs rounded-full text-slate-400 border border-slate-200 hover:text-slate-600 hover:bg-slate-50 transition-colors"
          >
            ↺ 重新开始
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {node && (
          <motion.div
            key={node.id}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <div className="mb-1 text-xs font-medium text-slate-400">
              第 {trail.length + 1} 步
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-1">
              {node.question}
            </h3>
            {node.hint && (
              <p className="text-sm text-slate-500 mb-4">{node.hint}</p>
            )}
            <div className={`grid gap-3 mt-4 ${node.options.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
              {node.options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => choose(opt)}
                  className="text-left p-4 rounded-xl border-2 border-slate-200 bg-white
                    hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-sm transition-all"
                >
                  <div className="text-sm font-semibold text-slate-800">{opt.label}</div>
                  {opt.hint && (
                    <div className="text-xs text-slate-500 mt-1 leading-relaxed">{opt.hint}</div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {result && (
          <motion.div
            key={result.id}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{result.emoji}</span>
                <div>
                  <div className="text-xs font-medium text-blue-500 mb-0.5">推荐方法</div>
                  <h3 className="text-xl font-bold text-slate-800">{result.name}</h3>
                </div>
              </div>
              <p className="text-sm text-slate-700 mb-2">{result.when}</p>
              <p className="text-sm text-slate-500 mb-4">
                <span className="font-medium text-slate-600">例子：</span>
                {result.example}
              </p>

              <div className="flex flex-wrap gap-2 mb-1">
                {result.links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium
                      text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
                  >
                    去学：{l.label} →
                  </Link>
                ))}
              </div>

              {result.notes && result.notes.length > 0 && (
                <div className="mt-4 pt-3 border-t border-blue-200/70 space-y-1.5">
                  {result.notes.map((n, i) => (
                    <p key={i} className="text-xs text-slate-600">
                      📌 {n.text}
                      {n.link && (
                        <>
                          {' → '}
                          <Link to={n.link.to} className="text-blue-600 underline underline-offset-2 hover:text-blue-800">
                            {n.link.label}
                          </Link>
                        </>
                      )}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={reset}
                className="px-5 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              >
                ↺ 换一个研究问题再走一遍
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── 页面 ────────────────────────────────────────────────────

export default function Section() {
  return (
    <div className="max-w-3xl">
      <p className="text-slate-600 leading-relaxed mb-2">
        选统计检验不用背表格。回答几个关于<strong>你的数据</strong>的问题——几组？什么类型？测了几次？——流程图会一步步带你走到合适的方法，并链接到对应章节。
      </p>
      <p className="text-sm text-slate-400 mb-4">
        随时点击上方走过的步骤可以改答案，点"重新开始"从头再来。
      </p>

      <FlowWizard />

      <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-600">
        <p className="mb-2">
          🧭 这张流程图只回答<strong>"用哪个检验"</strong>。想要一份按你的研究情境定制的完整学习路径（包括数据处理、研究设计、信度检验），试试
          <Link to="/navigator" className="mx-1 text-blue-600 font-medium underline underline-offset-2 hover:text-blue-800">
            研究问题导航
          </Link>
          。
        </p>
        <p className="text-xs text-slate-400">
          注意：流程图给出的是"最常见的起点"。真实研究中还要检查各方法的前提假设（正态性、方差齐性、独立性等），各章节都有讲解。
        </p>
      </div>
    </div>
  );
}
