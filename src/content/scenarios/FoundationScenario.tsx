import { motion } from 'framer-motion';

const scenarios = [
  {
    label: '场景 A · 刚拿到实验数据',
    text: '你刚收完 40 名被试的反应时数据，Excel 表格里密密麻麻的数字让你不知道从哪开始。你想先看看数据的"大致模样"——典型值是多少？被试之间差异大吗？',
  },
  {
    label: '场景 B · 下载了一批语料',
    text: '你从语料库下载了几百条例句，每条都有标注信息。你需要筛选、分组、汇总，把原始文本变成可以分析的数据表。',
  },
  {
    label: '场景 C · 导师让你汇报数据概要',
    text: '下周组会你要向导师报告实验数据的描述统计。你需要知道怎么用几行代码算出均值、标准差，并画出一张清晰的图。',
  },
  {
    label: '场景 D · 完全没碰过编程',
    text: '你听说 Python 能做语言学研究，但打开教程看到满屏代码就头疼。你需要一个真正零基础的起点——只教你用得上的，不教你用不着的。',
  },
];

const skills = [
  'Python 里最基本的"词汇"——变量、列表、字典、索引，够你读懂代码即可',
  '用 pandas 打开 CSV / Excel 文件，看到数据的前几行和整体概况',
  '按条件筛选数据、按组计算均值/频次——语言数据处理最高频的操作',
  '当你遇到循环、条件、正则这些概念时，知道去哪查',
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
        <span className="text-xs font-medium text-emerald-500 tracking-wide">基础包</span>
      </div>
      <h1>拿到数据，我需要会什么？</h1>
      <p className="text-lg text-slate-500 leading-relaxed mb-8">
        在开始任何分析之前，你需要一套最基本的工具——从零开始，只教必需的那部分。
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

      <h2>你将学会什么</h2>
      <ul className="space-y-2">
        {skills.map((s, i) => (
          <li key={i} className="text-slate-700">{s}</li>
        ))}
      </ul>

      <h2>前置要求</h2>
      <p>无。这是整个课程的起点，你只需要一台能上网的电脑。</p>

      <div className="mt-10 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800 m-0">
          <strong>提示：</strong>基础包只教你"读得懂代码"的程度。循环、条件、函数、正则等细节放在
          <strong>工具箱路径</strong>中，遇到需要时点击侧边栏顶部的"工具箱"即可查阅。
        </p>
      </div>
    </motion.div>
  );
}
