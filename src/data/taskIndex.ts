// ── 按任务反查工具的索引数据 ─────────────────────────────────────────
// 学生查工具箱的真实动线是"我要做 X，用什么"，而不是"Python 类工具有哪些"。
// 这里把常见研究任务映射到 manifest 小节 id（全局唯一），由 TaskLookupPage 渲染。
// 文案沿用 quizData 的惯例：中文内联，不走 i18n；小节标题仍通过 titleKey 本地化。

export interface TaskEntry {
  id: string;
  /** 以学生口吻描述的研究任务 */
  label: string;
  /** 指向的小节 id（第一个是主推） */
  sectionIds: string[];
  /** 相关附录 id */
  appendixIds?: string[];
}

export interface TaskGroup {
  id: string;
  icon: string;
  title: string;
  tasks: TaskEntry[];
}

export const TASK_GROUPS: TaskGroup[] = [
  {
    id: 'get-data',
    icon: '📥',
    title: '获取数据',
    tasks: [
      {
        id: 'get-file',
        label: '打开 CSV / Excel / TextGrid / CHAT 等格式的数据文件',
        sectionIds: ['01-file-formats'],
      },
      {
        id: 'get-api',
        label: '从 API 或网页抓取语料',
        sectionIds: ['02-api-access', '03-web-scraping'],
      },
      {
        id: 'get-merge',
        label: '把几个来源的数据合并成一张表',
        sectionIds: ['04-data-integration'],
      },
      {
        id: 'get-io',
        label: '用 Python 读写文本文件',
        sectionIds: ['06-file-io'],
      },
      {
        id: 'get-datasets',
        label: '找公开的语言学数据集',
        sectionIds: [],
        appendixIds: ['08-linguistics-datasets'],
      },
    ],
  },
  {
    id: 'clean-data',
    icon: '🧹',
    title: '整理数据',
    tasks: [
      {
        id: 'clean-df',
        label: '掌握 DataFrame 的筛选、排序、新增列',
        sectionIds: ['01-dataframe-basics'],
      },
      {
        id: 'clean-groupby',
        label: '按组汇总：算每组的均值、计数',
        sectionIds: ['02-groupby'],
      },
      {
        id: 'clean-messy',
        label: '数据很乱，需要清洗',
        sectionIds: ['03-cleaning'],
      },
      {
        id: 'clean-missing',
        label: '处理缺失值',
        sectionIds: ['05-missing-data'],
      },
      {
        id: 'clean-outlier',
        label: '检测和处理异常值',
        sectionIds: ['06-outliers'],
      },
      {
        id: 'clean-reshape',
        label: '宽表 ↔ 长表转换（统计建模前的格式准备）',
        sectionIds: ['04-reshape'],
      },
    ],
  },
  {
    id: 'describe',
    icon: '📊',
    title: '描述与画图',
    tasks: [
      {
        id: 'desc-center',
        label: '报告数据的典型水平（均值、中位数）',
        sectionIds: ['01-central-tendency'],
      },
      {
        id: 'desc-spread',
        label: '报告数据有多分散（标准差、四分位距）',
        sectionIds: ['02-dispersion'],
      },
      {
        id: 'desc-shape',
        label: '判断数据是不是正态分布',
        sectionIds: ['03-distribution'],
      },
      {
        id: 'desc-norm',
        label: '不同大小的语料库之间公平比较频率（每百万词）',
        sectionIds: ['04-normalization'],
      },
      {
        id: 'desc-ttr',
        label: '衡量词汇丰富度（TTR / MTLD）',
        sectionIds: ['05-lexical-diversity'],
      },
      {
        id: 'desc-plot',
        label: '画图展示我的数据',
        sectionIds: ['01-basic-charts', '02-distribution-charts', '03-relationship-charts'],
      },
    ],
  },
  {
    id: 'corpus-text',
    icon: '📚',
    title: '语料与文本',
    tasks: [
      {
        id: 'corp-string',
        label: '清理、拆分、替换字符串',
        sectionIds: ['01-string-methods'],
      },
      {
        id: 'corp-regex',
        label: '用正则表达式抽取语言模式',
        sectionIds: ['02-regex'],
      },
      {
        id: 'corp-encoding',
        label: '解决中文乱码 / 编码问题',
        sectionIds: ['03-encoding'],
      },
      {
        id: 'corp-tokenize',
        label: '分词、词性标注',
        sectionIds: ['01-tokenization'],
      },
      {
        id: 'corp-freq',
        label: '统计词频',
        sectionIds: ['02-frequency'],
      },
      {
        id: 'corp-colloc',
        label: '找一个词的典型搭配',
        sectionIds: ['03-collocation'],
      },
      {
        id: 'corp-collostr',
        label: '衡量构式和词之间的吸引强度',
        sectionIds: ['04-collostruction'],
      },
      {
        id: 'corp-keyword',
        label: '提取文本关键词',
        sectionIds: ['05-tfidf'],
      },
      {
        id: 'corp-kwic',
        label: '查看词在真实语境中的用法（索引行）',
        sectionIds: ['06-kwic'],
      },
    ],
  },
  {
    id: 'text-mining',
    icon: '🤖',
    title: '文本挖掘',
    tasks: [
      {
        id: 'tm-classify',
        label: '让机器自动给文本分类',
        sectionIds: ['07-text-classification'],
      },
      {
        id: 'tm-sentiment',
        label: '分析文本的情感与态度',
        sectionIds: ['08-sentiment-analysis'],
      },
      {
        id: 'tm-similar',
        label: '计算词语或句子的语义相似度',
        sectionIds: ['09-word-embeddings'],
      },
      {
        id: 'tm-cluster',
        label: '把相似的文本自动分堆',
        sectionIds: ['10-clustering'],
      },
      {
        id: 'tm-dimred',
        label: '把高维结果画成能看懂的二维图',
        sectionIds: ['11-dimensionality-reduction'],
      },
    ],
  },
  {
    id: 'compare',
    icon: '⚖️',
    title: '比较差异',
    tasks: [
      {
        id: 'cmp-two',
        label: '比较两组的均值（如 L1 vs L2 的语速）',
        sectionIds: ['01-t-test', '04-effect-size'],
      },
      {
        id: 'cmp-paired',
        label: '比较同一批被试的前测和后测',
        sectionIds: ['06-paired-test'],
      },
      {
        id: 'cmp-multi',
        label: '比较三组或更多组',
        sectionIds: ['03-anova', '05-multiple-correction'],
      },
      {
        id: 'cmp-cat',
        label: '看两个分类变量有没有关联（如性别 × 语体选择）',
        sectionIds: ['02-chi-square'],
      },
      {
        id: 'cmp-which',
        label: '拿不准该用哪种统计检验',
        sectionIds: [],
        appendixIds: ['03-statistics-flowchart'],
      },
    ],
  },
  {
    id: 'predict',
    icon: '📈',
    title: '关系与预测',
    tasks: [
      {
        id: 'pred-corr',
        label: '看两个连续变量是否相关',
        sectionIds: ['04-correlation'],
      },
      {
        id: 'pred-linear',
        label: '用多个因素预测一个连续结果',
        sectionIds: ['01-linear-regression', '06-categorical-encoding'],
      },
      {
        id: 'pred-logit',
        label: '结果是二选一（用 / 不用某个语言形式）',
        sectionIds: ['02-logistic-regression'],
      },
      {
        id: 'pred-inter',
        label: '一个因素的效应取决于另一个因素（交互）',
        sectionIds: ['03-interaction'],
      },
      {
        id: 'pred-mixed',
        label: '每个被试 / 词项贡献了多条数据（重复测量）',
        sectionIds: ['01-why-mixed', '06-glmm'],
      },
      {
        id: 'pred-diag',
        label: '检查回归模型可不可靠',
        sectionIds: ['04-model-diagnostics'],
      },
    ],
  },
  {
    id: 'design-measure',
    icon: '🎯',
    title: '设计与测量',
    tasks: [
      {
        id: 'des-oper',
        label: '把研究问题变成可测量的变量',
        sectionIds: ['01-operationalization'],
      },
      {
        id: 'des-sample',
        label: '决定抽样方案、算需要多少被试',
        sectionIds: ['02-sampling-strategy', '05-power'],
      },
      {
        id: 'des-confound',
        label: '识别和控制混淆变量',
        sectionIds: ['03-confounding'],
      },
      {
        id: 'des-within',
        label: '选被试内还是被试间设计、平衡实验顺序',
        sectionIds: ['06-within-between', '07-counterbalancing'],
      },
      {
        id: 'des-quest',
        label: '设计问卷和 Likert 量表',
        sectionIds: ['08-questionnaire-design', '09-likert-scales'],
      },
      {
        id: 'des-kappa',
        label: '检查标注者 / 评分者之间是否一致（κ / α）',
        sectionIds: ['01-inter-rater-kappa', '02-krippendorff-alpha'],
      },
      {
        id: 'des-cronbach',
        label: '检查量表的内部一致性（Cronbach α）',
        sectionIds: ['03-cronbach-alpha'],
      },
      {
        id: 'des-valid',
        label: '确认测的确实是想测的东西（效度）',
        sectionIds: ['04-validity'],
      },
      {
        id: 'des-level',
        label: '分清名义 / 定序 / 定距 / 定比变量',
        sectionIds: ['05-measurement-levels'],
      },
    ],
  },
  {
    id: 'report',
    icon: '📝',
    title: '报告与收尾',
    tasks: [
      {
        id: 'rep-pvalue',
        label: '搞懂 p 值和置信区间怎么解读',
        sectionIds: ['03-p-value', '02-confidence-interval'],
      },
      {
        id: 'rep-effect',
        label: '报告效应量',
        sectionIds: ['04-effect-size', '03-relationship-charts'],
      },
      {
        id: 'rep-write',
        label: '按规范写统计结果（APA 风格）',
        sectionIds: ['05-reporting'],
      },
      {
        id: 'rep-repro',
        label: '让研究可复现（代码、数据、报告）',
        sectionIds: ['04-reproducibility'],
      },
      {
        id: 'rep-ethics',
        label: '通过伦理审查',
        sectionIds: ['05-ethics-review'],
      },
    ],
  },
];
