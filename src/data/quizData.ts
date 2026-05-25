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

export const QUESTIONS: QuizQuestion[] = [
  // ── 1. 研究阶段 ───────────────────────────────────────────
  {
    id: 'research-stage',
    question: '你现在的研究处于哪个阶段？',
    options: [
      {
        id: 'stage-data-ready',
        label: '数据已经拿到了，但不知道从哪下手分析',
        sectionIds: ['01-variables-and-types', '02-lists-and-dicts', '06-file-io', '01-dataframe-basics', '02-groupby'],
        reason: '你需要数据处理的基础工具',
      },
      {
        id: 'stage-have-data',
        label: '有数据，想知道具体用什么统计方法',
        sectionIds: [],
        reason: '',
      },
      {
        id: 'stage-designing',
        label: '还在设计研究方案，没开始收数据',
        sectionIds: ['01-operationalization', '02-sampling-strategy', '05-power', '03-confounding', '04-reproducibility'],
        reason: '你在研究设计阶段',
      },
    ],
  },

  // ── 2. Python 基础 ─────────────────────────────────────────
  {
    id: 'python-level',
    question: '你的 Python 编程基础怎么样？',
    options: [
      {
        id: 'python-zero',
        label: '完全零基础，没写过代码',
        sectionIds: ['01-variables-and-types', '02-lists-and-dicts', '06-file-io', '01-dataframe-basics', '02-groupby'],
        reason: '你需要从 Python 基础开始',
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

  // ── 3. 数据形式 ────────────────────────────────────────────
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
        label: '主要是文本数据（语料、问卷开放题等）',
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

  // ── 4. 描述统计 ────────────────────────────────────────────
  {
    id: 'describe-need',
    question: '你需要计算均值、中位数、标准差等描述统计量吗？',
    options: [
      {
        id: 'describe-yes',
        label: '需要，我想了解数据的基本面貌',
        sectionIds: ['01-central-tendency', '02-dispersion', '05-dispersion-metrics'],
        reason: '你需要描述统计',
      },
      {
        id: 'describe-no',
        label: '不需要 / 已经会了',
        sectionIds: [],
        reason: '',
      },
    ],
  },

  // ── 5. 数据分布 ────────────────────────────────────────────
  {
    id: 'distribution-need',
    question: '你需要了解数据的分布形态吗（正态分布、偏态、标准化）？',
    options: [
      {
        id: 'dist-yes',
        label: '需要，我想知道数据符不符合正态分布、要不要做标准化',
        sectionIds: ['03-distribution', '04-normalization'],
        reason: '你需要了解数据分布',
      },
      {
        id: 'dist-no',
        label: '不需要',
        sectionIds: [],
        reason: '',
      },
    ],
  },

  // ── 6. 可视化 ──────────────────────────────────────────────
  {
    id: 'visualize-need',
    question: '你需要画图来展示数据吗？',
    options: [
      {
        id: 'viz-basic',
        label: '需要画柱状图、折线图等基础图表',
        sectionIds: ['01-basic-charts'],
        reason: '你需要基础图表',
      },
      {
        id: 'viz-distribution',
        label: '需要画直方图、箱线图等分布图',
        sectionIds: ['02-distribution-charts'],
        reason: '你需要分布图表',
      },
      {
        id: 'viz-all',
        label: '基础图表和分布图都需要',
        sectionIds: ['01-basic-charts', '02-distribution-charts'],
        reason: '你需要多种图表',
      },
      {
        id: 'viz-no',
        label: '暂时不需要画图',
        sectionIds: [],
        reason: '',
      },
    ],
  },

  // ── 7. 推断统计基础 ────────────────────────────────────────
  {
    id: 'inference-need',
    question: '你需要理解 p 值、置信区间、效应量这些推断统计概念吗？',
    options: [
      {
        id: 'inference-yes',
        label: '需要，我想从样本推断总体',
        sectionIds: ['01-sampling', '02-confidence-interval', '03-p-value', '04-effect-size'],
        reason: '你需要推断统计基础',
      },
      {
        id: 'inference-no',
        label: '不需要，我只做描述性分析',
        sectionIds: [],
        reason: '',
      },
    ],
  },

  // ── 8. 具体检验方法 ────────────────────────────────────────
  {
    id: 'test-type',
    question: '你需要做哪类具体的统计检验？',
    options: [
      {
        id: 'test-ttest',
        label: 't 检验（比较两组差异，如母语者 vs 学习者）',
        sectionIds: ['01-t-test'],
        reason: '你需要 t 检验',
      },
      {
        id: 'test-anova',
        label: '方差分析 ANOVA（比较多组差异）',
        sectionIds: ['03-anova'],
        reason: '你需要 ANOVA',
      },
      {
        id: 'test-chisq',
        label: '卡方检验（分析分类数据的关联）',
        sectionIds: ['02-chi-square'],
        reason: '你需要卡方检验',
      },
      {
        id: 'test-multiple',
        label: '以上多种都需要',
        sectionIds: ['01-t-test', '03-anova', '02-chi-square', '05-multiple-correction'],
        reason: '你需要多种检验方法',
      },
      {
        id: 'test-none',
        label: '都不需要',
        sectionIds: [],
        reason: '',
      },
    ],
  },

  // ── 9. 文本分析 ────────────────────────────────────────────
  {
    id: 'text-analysis',
    question: '你需要做哪些文本分析？',
    options: [
      {
        id: 'text-collocation',
        label: '搭配分析（词语共现、互信息）',
        sectionIds: ['03-collocation'],
        reason: '你需要搭配分析',
      },
      {
        id: 'text-tfidf',
        label: 'TF-IDF / 关键词提取',
        sectionIds: ['04-tfidf'],
        reason: '你需要关键词分析',
      },
      {
        id: 'text-kwic',
        label: 'KWIC 检索（关键词上下文定位）',
        sectionIds: ['05-kwic'],
        reason: '你需要 KWIC 检索',
      },
      {
        id: 'text-correlation',
        label: '词语之间的相关性分析',
        sectionIds: ['04-correlation'],
        reason: '你需要相关性分析',
      },
      {
        id: 'text-multiple',
        label: '以上多种都需要',
        sectionIds: ['03-collocation', '04-tfidf', '05-kwic', '04-correlation'],
        reason: '你需要多种文本分析',
      },
      {
        id: 'text-none',
        label: '不涉及文本分析',
        sectionIds: [],
        reason: '',
      },
    ],
  },

  // ── 10. 回归建模：因变量类型 ───────────────────────────────
  {
    id: 'outcome-type',
    question: '你的结果变量（因变量）是什么类型？',
    options: [
      {
        id: 'outcome-continuous',
        label: '连续变量（反应时、评分、频次等）→ 适合线性回归',
        sectionIds: ['03-relationship-charts', '01-linear-regression', '04-model-diagnostics'],
        reason: '你需要线性回归',
      },
      {
        id: 'outcome-binary',
        label: '分类/二元选择（正确/错误、选A/选B）→ 适合逻辑回归',
        sectionIds: ['02-logistic-regression', '05-reporting'],
        reason: '你需要逻辑回归',
      },
      {
        id: 'outcome-none',
        label: '不涉及回归建模',
        sectionIds: [],
        reason: '',
      },
    ],
  },

  // ── 11. 交互效应 ───────────────────────────────────────────
  {
    id: 'interaction-need',
    question: '你需要分析交互效应吗？（如自变量 A 的效果是否取决于自变量 B）？',
    options: [
      {
        id: 'interaction-yes',
        label: '需要，我想知道不同因素之间是否有交互作用',
        sectionIds: ['03-interaction'],
        reason: '你需要交互效应分析',
      },
      {
        id: 'interaction-no',
        label: '不需要',
        sectionIds: [],
        reason: '',
      },
    ],
  },

  // ── 12. 嵌套数据 / 混合效应 ────────────────────────────────
  {
    id: 'nesting',
    question: '你的数据是否存在嵌套结构？（同一被试有多条数据、同一词项多次出现）',
    options: [
      {
        id: 'nesting-yes',
        label: '是，每个被试 / 词项都有多条记录',
        sectionIds: ['01-why-mixed', '02-fixed-vs-random', '03-random-slopes', '04-model-selection', '05-python-implementation'],
        reason: '你需要混合效应模型',
      },
      {
        id: 'nesting-no',
        label: '否 / 不太确定',
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

  for (const [, optionId] of answers) {
    for (const q of QUESTIONS) {
      const opt = q.options.find((o) => o.id === optionId);
      if (opt) {
        for (const sid of opt.sectionIds) {
          if (!sectionReasons.has(sid)) {
            sectionReasons.set(sid, opt.reason);
          }
        }
        break;
      }
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
