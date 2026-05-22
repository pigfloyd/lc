import { motion } from 'framer-motion';

const scenarios = [
  {
    label: '场景 A · 搭配分析',
    text: '你想知道"进行"这个词后面通常跟什么名词？"进行"和"加以"在搭配上有什么区别？这不是比组，而是探究词和词之间的"吸引力"。',
  },
  {
    label: '场景 B · 近义词辨析',
    text: '"高兴"和"快乐"意思相近，但它们在相同语境中出现吗？你想通过词语的"邻居"（上下文）来看它们的用法差异。',
  },
  {
    label: '场景 C · 关键词提取',
    text: '你有一批语言学论文的摘要，想快速了解每篇文章在讲什么。哪些词能代表一篇文章的核心内容？TF-IDF 帮你找出来。',
  },
  {
    label: '场景 D · 语义韵分析',
    text: '"造成"和"带来"都是致使动词，但"造成"后面通常跟负面结果，"带来"可以是正面的。你想用定量方法证明这种直觉。',
  },
];

const skills = [
  '怎么把原始文本变成可分析的单位？（分词、清洗）',
  '哪两个词经常一起出现？搭配强度怎么算？（MI 值）',
  '不看摘要，直接看词的"邻居"——索引行（KWIC）怎么看？',
  '怎么找出一篇文章的关键词？（TF-IDF）',
  '两个语言变量之间的统计关联怎么量化？（Pearson / Spearman 相关）',
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
        <span className="text-xs font-medium text-sky-500 tracking-wide">模块 3</span>
      </div>
      <h1>词和词之间有什么关系？</h1>
      <p className="text-lg text-slate-500 leading-relaxed mb-8">
        不是比组，而是探究语言单位之间的关联模式——搭配、语义韵、关键词提取。
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
        需要完成<strong>基础包</strong>和<strong>模块 1</strong>（描述与探索）。
        文本处理的基本技能（字符串方法、分词）会在本模块中一并讲解。
      </p>
    </motion.div>
  );
}
