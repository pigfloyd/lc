import { MANIFEST, RESEARCH_MODULES } from './contentManifest';

export interface NavigatorScenario {
  label: string;
  text: string;
  sectionId: string;
}

export interface NavigatorModule {
  moduleId: string;
  order: number;
  badgeColor: string;
  badgeLabel: string;
  title: string;
  subtitle: string;
  scenarios: NavigatorScenario[];
  skills: string[];
  prerequisites: string;
  firstContentSectionId: string;
}

const MODULE_DATA: Omit<NavigatorModule, 'firstContentSectionId' | 'order'>[] = [
  {
    moduleId: 'foundation',
    badgeColor: 'emerald',
    badgeLabel: '基础包',
    title: '拿到数据，我需要会什么？',
    subtitle: '在开始任何分析之前，你需要一套最基本的工具——从零开始，只教必需的那部分。',
    scenarios: [
      { label: '场景 A · 刚拿到实验数据', text: '你刚收完 40 名被试的反应时数据，Excel 表格里密密麻麻的数字让你不知道从哪开始。你想先看看数据的"大致模样"——典型值是多少？被试之间差异大吗？', sectionId: '01-variables-and-types' },
      { label: '场景 B · 下载了一批语料', text: '你从语料库下载了几百条例句，每条都有标注信息。你需要筛选、分组、汇总，把原始文本变成可以分析的数据表。', sectionId: '06-file-io' },
      { label: '场景 C · 导师让你汇报数据概要', text: '下周组会你要向导师报告实验数据的描述统计。你需要知道怎么用几行代码算出均值、标准差，并画出一张清晰的图。', sectionId: '02-groupby' },
      { label: '场景 D · 完全没碰过编程', text: '你听说 Python 能做语言学研究，但打开教程看到满屏代码就头疼。你需要一个真正零基础的起点——只教你用得上的，不教你用不着的。', sectionId: '01-variables-and-types' },
    ],
    skills: [
      'Python 里最基本的"词汇"——变量、列表、字典、索引，够你读懂代码即可',
      '用 pandas 打开 CSV / Excel 文件，看到数据的前几行和整体概况',
      '按条件筛选数据、按组计算均值/频次——语言数据处理最高频的操作',
      '当你遇到循环、条件、正则这些概念时，知道去哪查',
    ],
    prerequisites: '无。这是整个课程的起点，你只需要一台能上网的电脑。',
  },
  {
    moduleId: 'module-1',
    badgeColor: 'purple',
    badgeLabel: '模块 1',
    title: '我的数据长什么样？',
    subtitle: '在检验任何假设之前，先了解数据的基本面貌——这是所有分析的起点。',
    scenarios: [
      { label: '场景 A · 实验数据描述', text: '你收集了 80 个被试对 60 个句子的可接受度评分。在检验任何假设之前，你想知道：评分的"典型值"是多少？被试之间的打分差异大吗？数据整体长什么样？', sectionId: '01-central-tendency' },
      { label: '场景 B · 语料库描写', text: '你从 BCC 语料库下载了某一类动词的所有例句，统计了每个动词的出现频次。频次分布是什么样的？少数几个高频词占了绝大多数用例吗？', sectionId: '02-dispersion' },
      { label: '场景 C · 检查数据质量', text: '你做了一个阅读实验，记录了每个被试在每个试次的阅读时间。但数据里有极端值吗？有些被试是不是根本没认真做？在正式分析之前，你需要先"看一看"数据。', sectionId: '03-distribution' },
      { label: '场景 D · 向导师汇报', text: '组会上导师问："你收集的数据基本情况怎么样？"你需要用几张图和几个关键数字，在 3 分钟内说清楚数据的基本面貌。', sectionId: '01-basic-charts' },
    ],
    skills: [
      '数据的"中心"在哪里？——均值、中位数、众数的含义和适用场景',
      '数据有多"散"？——标准差、四分位距，被试之间的差异到底大不大',
      '数据的形状会说话——偏态、峰态，为什么反应时数据总是右偏',
      '用图看数据——直方图、箱线图、密度图，一句话说不清就画出来',
      '比较不同来源的数据——文本长度不同怎么比较？频率标准化的逻辑',
    ],
    prerequisites: '需要完成基础包（Python 基本词汇 + 数据读写 + 筛选分组）。如果你已经会用 pandas 打开文件并做基本的数据筛选，就可以开始。',
  },
  {
    moduleId: 'module-3',
    badgeColor: 'sky',
    badgeLabel: '模块 3',
    title: '词和词之间有什么关系？',
    subtitle: '不是比组，而是探究语言单位之间的关联模式——搭配、语义韵、关键词提取。',
    scenarios: [
      { label: '场景 A · 搭配分析', text: '你想知道"进行"这个词后面通常跟什么名词？"进行"和"加以"在搭配上有什么区别？这不是比组，而是探究词和词之间的"吸引力"。', sectionId: '03-collocation' },
      { label: '场景 B · 近义词辨析', text: '"高兴"和"快乐"意思相近，但它们在相同语境中出现吗？你想通过词语的"邻居"（上下文）来看它们的用法差异。', sectionId: '05-kwic' },
      { label: '场景 C · 关键词提取', text: '你有一批语言学论文的摘要，想快速了解每篇文章在讲什么。哪些词能代表一篇文章的核心内容？TF-IDF 帮你找出来。', sectionId: '04-tfidf' },
      { label: '场景 D · 语义韵分析', text: '"造成"和"带来"都是致使动词，但"造成"后面通常跟负面结果，"带来"可以是正面的。你想用定量方法证明这种直觉。', sectionId: '03-collocation' },
    ],
    skills: [
      '怎么把原始文本变成可分析的单位？（分词、清洗）',
      '哪两个词经常一起出现？搭配强度怎么算？（MI 值）',
      '不看摘要，直接看词的"邻居"——索引行（KWIC）怎么看？',
      '怎么找出一篇文章的关键词？（TF-IDF）',
      '两个语言变量之间的统计关联怎么量化？（Pearson / Spearman 相关）',
    ],
    prerequisites: '需要完成基础包和模块 1（描述与探索）。文本处理的基本技能（字符串方法、分词）会在本模块中一并讲解。',
  },
  {
    moduleId: 'module-2',
    badgeColor: 'orange',
    badgeLabel: '模块 2',
    title: 'A 组和 B 组有区别吗？',
    subtitle: '语言学量化研究最高频的问题类型——母语者 vs 学习者、控制组 vs 实验组、男性 vs 女性。',
    scenarios: [
      { label: '场景 A · 两组母语背景的比较', text: '你收集了 30 名汉语母语者和 30 名英语母语者的汉语口语语料。你想知道两组在"把"字句的使用频率上是否有差异。这是语言学中最经典的"组间比较"问题。', sectionId: '01-t-test' },
      { label: '场景 B · 实验条件的比较', text: '你做了一个阅读实验：控制组读原文，实验组读改写版。每组的阅读时间数据都有了。两组之间有差异，但这个差异是"真的"还是随机波动？', sectionId: '01-sampling' },
      { label: '场景 C · 分类变量的分布比较', text: '你统计了男性和女性在自然会话中使用"嗯" vs "啊"作为填充词的比例。你想知道性别和填充词选择是否有关联。', sectionId: '02-chi-square' },
      { label: '场景 D · 多个变体的比较', text: '你从三个方言区各收集了 40 段对话，比较了特定语音变量的使用率。三组之间有差异吗？哪两组之间差异最大？', sectionId: '03-anova' },
    ],
    skills: [
      '两组之间的差异是"统计显著的"还是"碰巧的"？',
      '差异到底有多大？（不只是"显著不显著"）',
      '三组或更多组的比较怎么做？',
      '分类变量之间的关系怎么检验？',
      '做了很多个比较之后，怎么控制错误率？',
    ],
    prerequisites: '需要完成基础包和模块 1（描述与探索）。你至少要知道怎么描述你的数据，才能比较它们。',
  },
  {
    moduleId: 'module-7',
    badgeColor: 'indigo',
    badgeLabel: '模块 7',
    title: '怎么设计我的分析？',
    subtitle: '在进入回归和混合模型之前，先停下来想清楚——怎么把模糊的研究兴趣变成可操作的分析计划。',
    scenarios: [
      { label: '场景 A · 开题前的迷茫', text: '你有一个模糊的研究兴趣——"我想研究汉语二语学习者的语用能力"。但"语用能力"是什么？怎么测量？你需要把一个模糊的概念变成可操作的变量。', sectionId: '01-operationalization' },
      { label: '场景 B · 样本量焦虑', text: '导师说："你做这个实验至少需要 60 个被试。"为什么是 60？30 个够不够？你需要了解检验力分析——在收数据之前就知道需要多少被试。', sectionId: '02-sampling-strategy' },
      { label: '场景 C · "会不会是别的原因？"', text: '你发现高年级学生的"把"字句使用率比低年级高。但高年级学生的词汇量也更大——你发现的差异到底是因为年级，还是因为词汇量？', sectionId: '03-confounding' },
      { label: '场景 D · 想让别人重复你的研究', text: '你读到一篇论文，方法部分写着"使用了自定义 Python 脚本进行分析"。但代码在哪？数据在哪？你想确保自己的研究经得起"可重复性"的检验。', sectionId: '04-reproducibility' },
    ],
    skills: [
      '怎么把"我想研究 X"变成"我测量什么"？（操作化——从模糊概念到可量化指标）',
      '需要多少被试才够？（抽样策略和检验力分析）',
      '发现的差异有没有其他解释？（混淆变量——控制还是承认？）',
      '怎么让研究经得起复现？（数据、代码、分析流程的透明化）',
    ],
    prerequisites: '建议至少完成模块 1 和模块 2（描述统计和组间比较）。这个模块是整合性的——你不需要精通所有方法再来读，而是边做边回头查。',
  },
  {
    moduleId: 'module-4',
    badgeColor: 'rose',
    badgeLabel: '模块 4',
    title: '特征 X 在怎么变？',
    subtitle: '连续变量之间的关系——历时变化、量效关系、一个连续变量如何预测另一个。',
    scenarios: [
      { label: '场景 A · 历时变化', text: '你从《人民日报》1949-2019 年的语料中统计了"把"字句的使用频率。70 年间它在增加还是减少？趋势是线性的还是有起伏？', sectionId: '01-linear-regression' },
      { label: '场景 B · 量效关系', text: '你感兴趣的是：词频越高，读者的反应时越短吗？而且这种关系是线性的吗？还是高频词到了一定程度后，反应时就不再减少了？', sectionId: '01-linear-regression' },
      { label: '场景 C · 多因素预测', text: '你想同时考虑词频、词长、具体性这三个因素对反应时的影响。哪个因素影响最大？它们之间是各自独立起作用，还是有交互？', sectionId: '01-linear-regression' },
      { label: '场景 D · 模型验证', text: '你建立了一个回归模型来预测语言现象。R² 看起来不错，但你的模型真的靠谱吗？残差有没有奇怪的模式？有没有异常点？', sectionId: '04-model-diagnostics' },
    ],
    skills: [
      '怎么画出一个趋势？（散点图、趋势线——先看图，再建模）',
      '怎么用一条线总结两个连续变量之间的关系？（线性回归）',
      '不止一个因素时怎么同时考虑？（多元回归）',
      '你的模型靠谱吗？怎么诊断？（残差分析、异常点检测）',
    ],
    prerequisites: '需要完成模块 1（描述统计）和模块 2（组间比较，理解 p 值和显著性）。线性回归是 t 检验和 ANOVA 的自然延伸——如果你理解了组间比较的逻辑，回归就是它的连续变量版本。',
  },
  {
    moduleId: 'module-5',
    badgeColor: 'amber',
    badgeLabel: '模块 5',
    title: '为什么选 A 不选 B？',
    subtitle: '语言学中大量问题是二元选择——与格交替、主动/被动、补足语省略。结果变量是"选 A 还是选 B"。',
    scenarios: [
      { label: '场景 A · 与格交替', text: '"我送了一本书给他" vs "我送他一本书"——母语者什么时候选双宾结构，什么时候选与格结构？你收集了几百条自然语料，想找出影响选择的因素。', sectionId: '02-logistic-regression' },
      { label: '场景 B · 语态选择', text: '在学术写作中，什么时候用主动语态，什么时候用被动语态？你标注了 500 篇论文的方法部分，想建模语态选择的概率。', sectionId: '02-logistic-regression' },
      { label: '场景 C · 补足语标记', text: '英语中 "I think (that) he is right" 的 that 可以省略。什么因素影响 that 的显隐？主语人称？从句长度？你想用数据验证这些假设。', sectionId: '02-logistic-regression' },
      { label: '场景 D · 毕业论文的回归结果', text: '你跑完逻辑回归，得到一堆系数和 p 值。但论文的方法部分怎么写？回归表怎么呈现？审稿人会挑什么毛病？', sectionId: '05-reporting' },
    ],
    skills: [
      '怎么建模"选 A 还是选 B"这类二元选择问题？（逻辑回归——从直线到 S 形曲线）',
      '怎么把语言特征（词类、人称、长度……）变成预测变量？（分类变量编码——语言学中最容易踩的坑）',
      '因素之间会互相"打架"吗？（交互效应——连续变量和分类变量都可以有交互）',
      '你的分类模型有多准？（ROC 曲线、混淆矩阵）',
      '结果怎么报告才规范？（回归表、效应量、模型拟合指标）',
    ],
    prerequisites: '需要完成模块 4（线性回归）。逻辑回归是线性回归的直接延伸——把"连续预测值"换成"概率"，你就理解了。',
  },
  {
    moduleId: 'module-6',
    badgeColor: 'teal',
    badgeLabel: '模块 6',
    title: '个体差异怎么处理？',
    subtitle: '真实语言数据有嵌套结构——被试嵌套在实验组里、词项嵌套在词类里。忽略这种结构会产生错误结论。',
    scenarios: [
      { label: '场景 A · 每个被试做了多次反应', text: '你的实验有 40 个被试，每人看了 60 个句子。每个被试的反应时数据不是独立的——张三整体偏快，李四整体偏慢。传统回归把这 2400 个数据点当独立的，这有问题吗？', sectionId: '01-why-mixed' },
      { label: '场景 B · 每个词出现了多次', text: '你分析的是词频对反应时的影响，但每个词在数据中出现了多次。"苹果"这个词的反应时跟"香蕉"的反应时可能系统性地不同。你需要在模型中考虑"词"这个随机因素。', sectionId: '01-why-mixed' },
      { label: '场景 C · 效应因人而异', text: '你发现词频效应（高频词反应更快）在整体上是显著的。但这个效应在所有被试身上一样强吗？有没有可能，有些被试对词频敏感，有些被试不管词频高低都读得快？', sectionId: '03-random-slopes' },
      { label: '场景 D · 毕业论文导师的灵魂拷问', text: '导师问你："你用了混合模型？为什么？随机效应结构是什么？模型是怎么选的？"你需要能清晰地说出你的建模决策。', sectionId: '04-model-selection' },
    ],
    skills: [
      '为什么传统回归在处理嵌套数据时不够？（伪重复、生态谬误）',
      '怎么让每个人/每个词有自己的基线？（随机截距）',
      '怎么允许效应在不同人/词上不同？（随机斜率）',
      '怎么用 Python（statsmodels）实现混合模型？怎么比较不同模型？',
    ],
    prerequisites: '需要完成模块 4（线性回归）和模块 5（逻辑回归与交互效应）。混合效应模型是回归模型的扩展——理解了普通回归，才能理解为什么要"混合"。',
  },
];

function getFirstContentSectionId(moduleId: string): string {
  const sections = MANIFEST
    .filter((e) => e.researchModule === moduleId && !e.isScenario)
    .sort((a, b) => a.researchOrder - b.researchOrder);
  return sections[0]?.id ?? '';
}

export function getNavigatorModules(): NavigatorModule[] {
  const moduleOrder = new Map(RESEARCH_MODULES.map((m) => [m.id, m.order]));
  return MODULE_DATA.map((m) => ({
    ...m,
    order: moduleOrder.get(m.moduleId) ?? 0,
    firstContentSectionId: getFirstContentSectionId(m.moduleId),
  })).sort((a, b) => a.order - b.order);
}
