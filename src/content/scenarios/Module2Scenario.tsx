import { motion } from 'framer-motion';

const scenarios = [
  {
    label: '场景 A · 两组母语背景的比较',
    text: '你收集了 30 名汉语母语者和 30 名英语母语者的汉语口语语料。你想知道两组在"把"字句的使用频率上是否有差异。这是语言学中最经典的"组间比较"问题。',
  },
  {
    label: '场景 B · 实验条件的比较',
    text: '你做了一个阅读实验：控制组读原文，实验组读改写版。每组的阅读时间数据都有了。两组之间有差异，但这个差异是"真的"还是随机波动？',
  },
  {
    label: '场景 C · 分类变量的分布比较',
    text: '你统计了男性和女性在自然会话中使用"嗯" vs "啊"作为填充词的比例。你想知道性别和填充词选择是否有关联。',
  },
  {
    label: '场景 D · 多个变体的比较',
    text: '你从三个方言区各收集了 40 段对话，比较了特定语音变量的使用率。三组之间有差异吗？哪两组之间差异最大？',
  },
];

const skills = [
  '两组之间的差异是"统计显著的"还是"碰巧的"？',
  '差异到底有多大？（不只是"显著不显著"）',
  '三组或更多组的比较怎么做？',
  '分类变量之间的关系怎么检验？',
  '做了很多个比较之后，怎么控制错误率？',
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
        <span className="text-xs font-medium text-orange-500 tracking-wide">模块 2</span>
      </div>
      <h1>A 组和 B 组有区别吗？</h1>
      <p className="text-lg text-slate-500 leading-relaxed mb-8">
        语言学量化研究最高频的问题类型——母语者 vs 学习者、控制组 vs 实验组、男性 vs 女性。
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
        你至少要知道怎么描述你的数据，才能比较它们。
      </p>
    </motion.div>
  );
}
