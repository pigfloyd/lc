import { motion } from 'framer-motion';

const scenarios = [
  {
    label: '场景 A · 历时变化',
    text: '你从《人民日报》1949-2019 年的语料中统计了"把"字句的使用频率。70 年间它在增加还是减少？趋势是线性的还是有起伏？',
  },
  {
    label: '场景 B · 量效关系',
    text: '你感兴趣的是：词频越高，读者的反应时越短吗？而且这种关系是线性的吗？还是高频词到了一定程度后，反应时就不再减少了？',
  },
  {
    label: '场景 C · 多因素预测',
    text: '你想同时考虑词频、词长、具体性这三个因素对反应时的影响。哪个因素影响最大？它们之间是各自独立起作用，还是有交互？',
  },
  {
    label: '场景 D · 模型验证',
    text: '你建立了一个回归模型来预测语言现象。R² 看起来不错，但你的模型真的靠谱吗？残差有没有奇怪的模式？有没有异常点？',
  },
];

const skills = [
  '怎么画出一个趋势？（散点图、趋势线——先看图，再建模）',
  '怎么用一条线总结两个连续变量之间的关系？（线性回归）',
  '不止一个因素时怎么同时考虑？（多元回归）',
  '你的模型靠谱吗？怎么诊断？（残差分析、异常点检测）',
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
        <span className="text-xs font-medium text-rose-500 tracking-wide">模块 4</span>
      </div>
      <h1>特征 X 在怎么变？</h1>
      <p className="text-lg text-slate-500 leading-relaxed mb-8">
        连续变量之间的关系——历时变化、量效关系、一个连续变量如何预测另一个。
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
        需要完成<strong>模块 1</strong>（描述统计）和<strong>模块 2</strong>（组间比较，理解 p 值和显著性）。
        线性回归是 t 检验和 ANOVA 的自然延伸——如果你理解了组间比较的逻辑，回归就是它的连续变量版本。
      </p>
    </motion.div>
  );
}
