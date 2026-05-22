import { motion } from 'framer-motion';

const scenarios = [
  {
    label: '场景 A · 与格交替',
    text: '"我送了一本书给他" vs "我送他一本书"——母语者什么时候选双宾结构，什么时候选与格结构？你收集了几百条自然语料，想找出影响选择的因素。',
  },
  {
    label: '场景 B · 语态选择',
    text: '在学术写作中，什么时候用主动语态，什么时候用被动语态？你标注了 500 篇论文的方法部分，想建模语态选择的概率。',
  },
  {
    label: '场景 C · 补足语标记',
    text: '英语中 "I think (that) he is right" 的 that 可以省略。什么因素影响 that 的显隐？主语人称？从句长度？你想用数据验证这些假设。',
  },
  {
    label: '场景 D · 毕业论文的回归结果',
    text: '你跑完逻辑回归，得到一堆系数和 p 值。但论文的方法部分怎么写？回归表怎么呈现？审稿人会挑什么毛病？',
  },
];

const skills = [
  '怎么建模"选 A 还是选 B"这类二元选择问题？（逻辑回归——从直线到 S 形曲线）',
  '怎么把语言特征（词类、人称、长度……）变成预测变量？（分类变量编码——语言学中最容易踩的坑）',
  '因素之间会互相"打架"吗？（交互效应——连续变量和分类变量都可以有交互）',
  '你的分类模型有多准？（ROC 曲线、混淆矩阵）',
  '结果怎么报告才规范？（回归表、效应量、模型拟合指标）',
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
        <span className="text-xs font-medium text-amber-500 tracking-wide">模块 5</span>
      </div>
      <h1>为什么选 A 不选 B？</h1>
      <p className="text-lg text-slate-500 leading-relaxed mb-8">
        语言学中大量问题是二元选择——与格交替、主动/被动、补足语省略。结果变量是"选 A 还是选 B"。
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
        需要完成<strong>模块 4</strong>（线性回归）。
        逻辑回归是线性回归的直接延伸——把"连续预测值"换成"概率"，你就理解了。
      </p>
    </motion.div>
  );
}
