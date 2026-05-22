import { motion } from 'framer-motion';

const scenarios = [
  {
    label: '场景 A · 实验数据描述',
    text: '你收集了 80 个被试对 60 个句子的可接受度评分。在检验任何假设之前，你想知道：评分的"典型值"是多少？被试之间的打分差异大吗？数据整体长什么样？',
  },
  {
    label: '场景 B · 语料库描写',
    text: '你从 BCC 语料库下载了某一类动词的所有例句，统计了每个动词的出现频次。频次分布是什么样的？少数几个高频词占了绝大多数用例吗？',
  },
  {
    label: '场景 C · 检查数据质量',
    text: '你做了一个阅读实验，记录了每个被试在每个试次的阅读时间。但数据里有极端值吗？有些被试是不是根本没认真做？在正式分析之前，你需要先"看一看"数据。',
  },
  {
    label: '场景 D · 向导师汇报',
    text: '组会上导师问："你收集的数据基本情况怎么样？"你需要用几张图和几个关键数字，在 3 分钟内说清楚数据的基本面貌。',
  },
];

const skills = [
  '数据的"中心"在哪里？——均值、中位数、众数的含义和适用场景',
  '数据有多"散"？——标准差、四分位距，被试之间的差异到底大不大',
  '数据的形状会说话——偏态、峰态，为什么反应时数据总是右偏',
  '用图看数据——直方图、箱线图、密度图，一句话说不清就画出来',
  '比较不同来源的数据——文本长度不同怎么比较？频率标准化的逻辑',
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
        <span className="text-xs font-medium text-purple-500 tracking-wide">模块 1</span>
      </div>
      <h1>我的数据长什么样？</h1>
      <p className="text-lg text-slate-500 leading-relaxed mb-8">
        在检验任何假设之前，先了解数据的基本面貌——这是所有分析的起点。
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
        需要完成<strong>基础包</strong>（Python 基本词汇 + 数据读写 + 筛选分组）。
        如果你已经会用 pandas 打开文件并做基本的数据筛选，就可以开始。
      </p>
    </motion.div>
  );
}
