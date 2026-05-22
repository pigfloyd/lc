import { motion } from 'framer-motion';

const scenarios = [
  {
    label: '场景 A · 每个被试做了多次反应',
    text: '你的实验有 40 个被试，每人看了 60 个句子。每个被试的反应时数据不是独立的——张三整体偏快，李四整体偏慢。传统回归把这 2400 个数据点当独立的，这有问题吗？',
  },
  {
    label: '场景 B · 每个词出现了多次',
    text: '你分析的是词频对反应时的影响，但每个词在数据中出现了多次。"苹果"这个词的反应时跟"香蕉"的反应时可能系统性地不同。你需要在模型中考虑"词"这个随机因素。',
  },
  {
    label: '场景 C · 效应因人而异',
    text: '你发现词频效应（高频词反应更快）在整体上是显著的。但这个效应在所有被试身上一样强吗？有没有可能，有些被试对词频敏感，有些被试不管词频高低都读得快？',
  },
  {
    label: '场景 D · 毕业论文导师的灵魂拷问',
    text: '导师问你："你用了混合模型？为什么？随机效应结构是什么？模型是怎么选的？"你需要能清晰地说出你的建模决策。',
  },
];

const skills = [
  '为什么传统回归在处理嵌套数据时不够？（伪重复、生态谬误）',
  '怎么让每个人/每个词有自己的基线？（随机截距）',
  '怎么允许效应在不同人/词上不同？（随机斜率）',
  '怎么用 Python（statsmodels）实现混合模型？怎么比较不同模型？',
];

export default function Section() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="content-prose"
    >
      <div className="mb-2">
        <span className="text-xs font-medium text-teal-500 tracking-wide">模块 6</span>
      </div>
      <h1>个体差异怎么处理？</h1>
      <p className="text-lg text-slate-500 leading-relaxed mb-8">
        真实语言数据有嵌套结构——被试嵌套在实验组里、词项嵌套在词类里。忽略这种结构会产生错误结论。
      </p>

      <h2>你要解决什么问题？</h2>
      <p>看看下面这些研究场景，有没有跟你相似的：</p>

      <div className="space-y-4 my-6">
        {scenarios.map((s) => (
          <div key={s.label} className="border border-slate-200 rounded-lg p-5 bg-white">
            <div className="text-sm font-semibold text-blue-600 mb-2">{s.label}</div>
            <p className="text-sm text-slate-600 leading-relaxed m-0">{s.text}</p>
          </div>
        ))}
      </div>

      <h2>你将能够回答</h2>
      <ul className="space-y-2">
        {skills.map((s, i) => (
          <li key={i} className="text-slate-700">{s}</li>
        ))}
      </ul>

      <h2>前置要求</h2>
      <p>
        需要完成<strong>模块 4</strong>（线性回归）和<strong>模块 5</strong>（逻辑回归与交互效应）。
        混合效应模型是回归模型的扩展——理解了普通回归，才能理解为什么要"混合"。
      </p>
    </motion.div>
  );
}
