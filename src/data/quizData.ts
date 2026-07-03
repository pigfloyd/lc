import { MANIFEST, RESEARCH_MODULES } from './contentManifest';
import type { SectionManifestEntry } from '../types/content';

export interface QuizOption {
  id: string;
  label: string;
  sectionIds: string[];
  reason: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface RecommendedSection {
  sectionId: string;
  titleKey: string;
  moduleId: string;
}

export interface RecommendedModule {
  moduleId: string;
  moduleTitleKey: string;
  reasons: string[];
  sections: RecommendedSection[];
}

// 设计原则：问"研究情境"（几组？测几次？因变量什么类型？），
// 不问"你需要什么方法"——能答出方法名的学生不需要导航。
export const QUESTIONS: QuizQuestion[] = [
  // ── 1. 研究阶段 ───────────────────────────────────────────
  {
    id: 'research-stage',
    question: '你现在的研究处于哪个阶段？',
    options: [
      {
        id: 'stage-designing',
        label: '还在设计研究方案，没开始收数据',
        sectionIds: [
          '01-operationalization',
          '03-confounding',
          '06-within-between',
          '02-sampling-strategy',
          '05-power',
          '04-reproducibility',
        ],
        reason: '设计阶段就要想清楚操作化、混淆控制和样本量',
      },
      {
        id: 'stage-analyzing',
        label: '数据已经在手（或快到手了），准备开始分析',
        sectionIds: [],
        reason: '',
      },
      {
        id: 'stage-writing',
        label: '分析做完了，正在写论文 / 报告',
        sectionIds: ['05-reporting', '04-reproducibility'],
        reason: '写作阶段的关键是规范报告和可重复性',
      },
    ],
  },

  // ── 2. 研究目标 ───────────────────────────────────────────
  {
    id: 'research-goal',
    question: '你的主要研究目标更接近哪一种？',
    options: [
      {
        id: 'goal-descriptive',
        label: '描述现象 / 探索数据里有什么规律',
        sectionIds: [
          '01-central-tendency',
          '02-dispersion',
          '03-distribution',
          '01-basic-charts',
          '02-distribution-charts',
        ],
        reason: '你更需要描述统计与可视化',
      },
      {
        id: 'goal-hypothesis',
        label: '检验假设 / 判断差异或关系是否可靠',
        sectionIds: [
          '01-sampling',
          '03-p-value',
          '02-confidence-interval',
          '04-effect-size',
        ],
        reason: '你需要先理解推断统计的逻辑',
      },
      {
        id: 'goal-modeling',
        label: '建立模型 / 解释或预测一个结果变量',
        sectionIds: [
          '03-relationship-charts',
          '01-linear-regression',
          '06-categorical-encoding',
          '04-model-diagnostics',
        ],
        reason: '你更需要回归建模路线',
      },
      {
        id: 'goal-discovery',
        label: '让机器帮我发现文本中的类别、主题或相似性',
        sectionIds: [
          '09-word-embeddings',
          '07-text-classification',
          '10-clustering',
          '11-dimensionality-reduction',
        ],
        reason: '你需要模式发现的工具箱',
      },
      {
        id: 'goal-unsure',
        label: '不确定，我只是想看看该学什么',
        sectionIds: [],
        reason: '',
      },
    ],
  },

  // ── 3. Python 基础 ─────────────────────────────────────────
  {
    id: 'python-level',
    question: '你的 Python 编程基础怎么样？',
    options: [
      {
        id: 'python-zero',
        label: '完全零基础，没写过代码',
        sectionIds: [
          '02-setup',
          '01-variables-and-types',
          '02-lists-and-dicts',
          '06-file-io',
          '01-dataframe-basics',
          '02-groupby',
        ],
        reason: '先把环境装好，从 Python 基础开始',
      },
      {
        id: 'python-basic',
        label: '了解基本语法，但 pandas 不熟',
        sectionIds: ['06-file-io', '01-dataframe-basics', '02-groupby'],
        reason: '你需要补数据整理技能',
      },
      {
        id: 'python-proficient',
        label: '能熟练用 pandas 做数据整理和分析',
        sectionIds: [],
        reason: '',
      },
    ],
  },

  // ── 4. 数据来源 ────────────────────────────────────────────
  {
    id: 'data-source',
    question: '你的数据需要自己收集吗？打算怎么收？',
    options: [
      {
        id: 'source-online',
        label: '要从网页、在线语料库或 API 获取',
        sectionIds: [
          '01-file-formats',
          '02-api-access',
          '03-web-scraping',
          '04-data-integration',
        ],
        reason: '你需要数据获取技能',
      },
      {
        id: 'source-experiment',
        label: '要通过实验或问卷收集（有真人被试）',
        sectionIds: [
          '06-within-between',
          '07-counterbalancing',
          '08-questionnaire-design',
          '09-likert-scales',
        ],
        reason: '你需要实验与问卷设计方法',
      },
      {
        id: 'source-ready',
        label: '不需要收集，数据已经在手',
        sectionIds: [],
        reason: '',
      },
    ],
  },

  // ── 5. 数据形式 ────────────────────────────────────────────
  {
    id: 'data-format',
    question: '你的数据主要是哪种形式？',
    options: [
      {
        id: 'data-tabular',
        label: '主要是表格数据（Excel / CSV）',
        sectionIds: [],
        reason: '',
      },
      {
        id: 'data-text',
        label: '主要是文本数据（语料、访谈转写、开放题回答）',
        sectionIds: ['01-string-methods', '01-tokenization'],
        reason: '你需要文本处理基础',
      },
      {
        id: 'data-both',
        label: '表格和文本数据都有',
        sectionIds: ['01-string-methods', '01-tokenization'],
        reason: '你需要文本处理基础',
      },
    ],
  },

  // ── 6. 标注与评分（→ 信度模块）─────────────────────────────
  {
    id: 'annotation',
    question: '你的研究涉及人工标注或主观评分吗？',
    options: [
      {
        id: 'annotate-raters',
        label: '涉及，多个人标注 / 评分同一批材料（如标注语料、作文评分、可接受性判断）',
        sectionIds: ['01-inter-rater-kappa', '02-krippendorff-alpha', '04-validity'],
        reason: '多人标注必须报告评分者间信度',
      },
      {
        id: 'annotate-scale',
        label: '涉及，用多题项量表测态度或能力（如语言态度问卷）',
        sectionIds: ['03-cronbach-alpha', '04-validity', '09-likert-scales'],
        reason: '量表需要检验内部一致性',
      },
      {
        id: 'annotate-no',
        label: '不涉及',
        sectionIds: [],
        reason: '',
      },
    ],
  },

  // ── 7. 比较结构（代替"你需要哪种检验"）─────────────────────
  {
    id: 'comparison',
    question: '你需要比较组或条件之间的差异吗？想一想你的研究设计：',
    options: [
      {
        id: 'compare-two',
        label: '比较两组（如母语者 vs 学习者）',
        sectionIds: ['01-t-test'],
        reason: '两组比较从 t 检验（或其非参数替代）入手',
      },
      {
        id: 'compare-multi',
        label: '比较三组及以上（如初 / 中 / 高级水平）',
        sectionIds: ['03-anova', '05-multiple-correction'],
        reason: '多组比较用 ANOVA，别忘了多重比较校正',
      },
      {
        id: 'compare-paired',
        label: '同一批被试 / 文本测了多次（如前测 vs 后测）',
        sectionIds: ['06-paired-test'],
        reason: '重复测量要用配对检验',
      },
      {
        id: 'compare-counts',
        label: '比较的是频数或比例（如某构式在两种语体中出现的次数）',
        sectionIds: ['02-chi-square'],
        reason: '频数数据用卡方检验',
      },
      {
        id: 'compare-mixed',
        label: '以上多种情况都有',
        sectionIds: [
          '01-t-test',
          '06-paired-test',
          '03-anova',
          '02-chi-square',
          '05-multiple-correction',
        ],
        reason: '你需要多种比较方法',
      },
      {
        id: 'compare-no',
        label: '不涉及组间比较',
        sectionIds: [],
        reason: '',
      },
    ],
  },

  // ── 8. 变量相关 ────────────────────────────────────────────
  {
    id: 'correlation',
    question: '你需要分析两个数值变量是否相关吗？（如词频高低 ↔ 反应时长短）',
    options: [
      {
        id: 'corr-yes',
        label: '需要，我想知道两个变量是否一起变化',
        sectionIds: ['04-correlation', '03-relationship-charts'],
        reason: '你需要相关分析',
      },
      {
        id: 'corr-no',
        label: '不需要',
        sectionIds: [],
        reason: '',
      },
    ],
  },

  // ── 9. 回归建模：因变量类型 ───────────────────────────────
  {
    id: 'outcome-type',
    question: '如果要建模，你的结果变量（因变量）是什么类型？',
    options: [
      {
        id: 'outcome-continuous',
        label: '连续数值（反应时、评分、频次等）',
        sectionIds: ['01-linear-regression', '06-categorical-encoding', '04-model-diagnostics'],
        reason: '连续因变量适合线性回归',
      },
      {
        id: 'outcome-binary',
        label: '二元选择（正确 / 错误、选 A / 选 B、有 / 无某形式）',
        sectionIds: ['02-logistic-regression', '06-categorical-encoding'],
        reason: '二元因变量适合逻辑回归',
      },
      {
        id: 'outcome-none',
        label: '不涉及回归建模',
        sectionIds: [],
        reason: '',
      },
    ],
  },

  // ── 10. 交互效应 ───────────────────────────────────────────
  {
    id: 'interaction',
    question: '你需要分析交互效应吗？（因素 A 的作用是否取决于因素 B）',
    options: [
      {
        id: 'interaction-yes',
        label: '需要，我想知道不同因素之间是否有交互作用',
        sectionIds: ['03-interaction'],
        reason: '你需要交互效应分析',
      },
      {
        id: 'interaction-no',
        label: '不需要 / 不确定',
        sectionIds: [],
        reason: '',
      },
    ],
  },

  // ── 11. 嵌套数据 / 混合效应 ────────────────────────────────
  {
    id: 'nesting',
    question: '你的数据有嵌套结构吗？（同一被试贡献多条数据、同一词项反复出现）',
    options: [
      {
        id: 'nesting-yes',
        label: '有，每个被试 / 词项都有多条记录',
        sectionIds: [
          '01-why-mixed',
          '02-fixed-vs-random',
          '03-random-slopes',
          '04-model-selection',
          '05-python-implementation',
        ],
        reason: '嵌套数据需要混合效应模型',
      },
      {
        id: 'nesting-no',
        label: '没有 / 不太确定',
        sectionIds: [],
        reason: '',
      },
    ],
  },

  // ── 12. 文本分析要回答的问题 ───────────────────────────────
  {
    id: 'text-question',
    question: '关于文本或语料，你想回答哪类问题？',
    options: [
      {
        id: 'text-usage',
        label: '某个词 / 结构在语料里是怎么用的（查上下文）',
        sectionIds: ['01-tokenization', '06-kwic'],
        reason: '你需要 KWIC 检索',
      },
      {
        id: 'text-lexical',
        label: '词频、关键词或词汇丰富度（如语体对比、二语写作发展）',
        sectionIds: ['02-frequency', '05-tfidf', '04-normalization', '05-lexical-diversity'],
        reason: '你需要词汇计量方法',
      },
      {
        id: 'text-cooccur',
        label: '哪些词 / 构式经常一起出现（搭配、构式偏好）',
        sectionIds: ['03-collocation', '04-collostruction'],
        reason: '你需要搭配与构式关联分析',
      },
      {
        id: 'text-sentiment',
        label: '文本表达的情感或态度倾向',
        sectionIds: ['08-sentiment-analysis'],
        reason: '你需要情感分析',
      },
      {
        id: 'text-multi',
        label: '以上多种都需要',
        sectionIds: [
          '01-tokenization',
          '06-kwic',
          '02-frequency',
          '05-tfidf',
          '04-normalization',
          '05-lexical-diversity',
          '03-collocation',
          '04-collostruction',
          '08-sentiment-analysis',
        ],
        reason: '你需要多种文本分析方法',
      },
      {
        id: 'text-no',
        label: '不涉及文本分析',
        sectionIds: [],
        reason: '',
      },
    ],
  },
];

/** Aggregate user answers into module-grouped recommended sections. */
export function getRecommendedModules(
  answers: Map<string, string>,
): RecommendedModule[] {
  const sectionReasons = new Map<string, string>();
  const addSection = (sid: string, reason: string) => {
    if (!sectionReasons.has(sid)) sectionReasons.set(sid, reason);
  };

  for (const [, optionId] of answers) {
    for (const q of QUESTIONS) {
      const opt = q.options.find((o) => o.id === optionId);
      if (opt) {
        for (const sid of opt.sectionIds) addSection(sid, opt.reason);
        break;
      }
    }
  }

  // ── 跨题后处理：问卷答不出来的组合逻辑在这里补 ──────────────

  const moduleOf = (sid: string) =>
    MANIFEST.find((e) => e.id === sid && !e.isScenario)?.researchModule ?? null;
  const hasModule = (mods: string[]) =>
    [...sectionReasons.keys()].some((sid) => {
      const m = moduleOf(sid);
      return m !== null && mods.includes(m);
    });

  // 二元结果 + 嵌套数据 → 广义线性混合模型
  if (
    answers.get('nesting') === 'nesting-yes' &&
    answers.get('outcome-type') === 'outcome-binary'
  ) {
    addSection('06-glmm', '二元结果 + 嵌套数据，正是广义线性混合模型的用武之地');
  }

  // 要做检验 / 建模，但没有任何描述统计 → 补"先看数据长什么样"
  if (
    hasModule(['comparison', 'trends', 'decision', 'hierarchy']) &&
    !hasModule(['exploration'])
  ) {
    for (const sid of ['01-central-tendency', '02-dispersion', '03-distribution', '01-basic-charts']) {
      addSection(sid, '做检验或建模之前，先了解数据的基本面貌');
    }
  }

  // 要做统计检验 → 先分清变量的测量层级
  if (hasModule(['comparison'])) {
    addSection('05-measurement-levels', '选检验方法的前提是分清变量的测量层级');
  }

  // 空结果兜底 → 推荐基础包
  if (sectionReasons.size === 0) {
    const FOUNDATION_SECTIONS = [
      '01-variables-and-types', '02-lists-and-dicts', '06-file-io',
      '01-dataframe-basics', '02-groupby',
    ];
    for (const sid of FOUNDATION_SECTIONS) {
      addSection(sid, '建议从基础开始');
    }
  }

  // Group by research module
  const moduleMap = new Map<string, {
    reasons: Set<string>;
    sections: Map<string, SectionManifestEntry>;
  }>();

  for (const [sectionId, reason] of sectionReasons) {
    const entry = MANIFEST.find((e) => e.id === sectionId && !e.isScenario);
    if (!entry?.researchModule) continue;

    const modId = entry.researchModule;
    if (!moduleMap.has(modId)) {
      moduleMap.set(modId, { reasons: new Set(), sections: new Map() });
    }
    const mod = moduleMap.get(modId)!;
    mod.reasons.add(reason);
    if (!mod.sections.has(sectionId)) {
      mod.sections.set(sectionId, entry);
    }
  }

  const researchOrder = new Map(RESEARCH_MODULES.map((m) => [m.id, m.order]));

  const result: RecommendedModule[] = [];
  for (const [modId, { reasons, sections }] of moduleMap) {
    const sorted = [...sections.values()]
      .sort((a, b) => a.researchOrder - b.researchOrder);

    const config = RESEARCH_MODULES.find((m) => m.id === modId);

    result.push({
      moduleId: modId,
      moduleTitleKey: config?.titleKey ?? '',
      reasons: [...reasons],
      sections: sorted.map((e) => ({
        sectionId: e.id,
        titleKey: e.titleKey,
        moduleId: modId,
      })),
    });
  }

  result.sort((a, b) => {
    const ao = researchOrder.get(a.moduleId) ?? 99;
    const bo = researchOrder.get(b.moduleId) ?? 99;
    return ao - bo;
  });

  return result;
}
