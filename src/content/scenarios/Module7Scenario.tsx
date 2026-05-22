import { motion } from 'framer-motion';

const scenarios = [
  {
    label: '场景 A · 开题前的迷茫',
    text: '你有一个模糊的研究兴趣——"我想研究汉语二语学习者的语用能力"。但"语用能力"是什么？怎么测量？你需要把一个模糊的概念变成可操作的变量。',
  },
  {
    label: '场景 B · 样本量焦虑',
    text: '导师说："你做这个实验至少需要 60 个被试。"为什么是 60？30 个够不够？你需要了解检验力分析——在收数据之前就知道需要多少被试。',
  },
  {
    label: '场景 C · "会不会是别的原因？"',
    text: '你发现高年级学生的"把"字句使用率比低年级高。但高年级学生的词汇量也更大——你发现的差异到底是因为年级，还是因为词汇量？',
  },
  {
    label: '场景 D · 想让别人重复你的研究',
    text: '你读到一篇论文，方法部分写着"使用了自定义 Python 脚本进行分析"。但代码在哪？数据在哪？你想确保自己的研究经得起"可重复性"的检验。',
  },
];

const skills = [
  '怎么把"我想研究 X"变成"我测量什么"？（操作化——从模糊概念到可量化指标）',
  '需要多少被试才够？（抽样策略和检验力分析）',
  '发现的差异有没有其他解释？（混淆变量——控制还是承认？）',
  '怎么让研究经得起复现？（数据、代码、分析流程的透明化）',
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
        <span className="text-xs font-medium text-indigo-500 tracking-wide">模块 7</span>
      </div>
      <h1>怎么设计我的分析？</h1>
      <p className="text-lg text-slate-500 leading-relaxed mb-8">
        在进入回归和混合模型之前，先停下来想清楚——怎么把模糊的研究兴趣变成可操作的分析计划。
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
        建议至少完成<strong>模块 1 和模块 2</strong>（描述统计和组间比较）。
        这个模块是整合性的——你不需要精通所有方法再来读，而是边做边回头查。
      </p>
    </motion.div>
  );
}
