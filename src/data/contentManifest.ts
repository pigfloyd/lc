import type { SectionManifestEntry, UnitMeta, SectionMeta } from '../types/content';

// ── Research modules ──────────────────────────────────────────────
export const RESEARCH_MODULES: { id: string; titleKey: string; descKey: string; order: number }[] = [
  { id: 'foundation', titleKey: 'research.foundation.title', descKey: 'research.foundation.description', order: 0 },
  { id: 'module-1',   titleKey: 'research.module-1.title',   descKey: 'research.module-1.description',   order: 1 },
  { id: 'module-3',   titleKey: 'research.module-3.title',   descKey: 'research.module-3.description',   order: 2 },
  { id: 'module-2',   titleKey: 'research.module-2.title',   descKey: 'research.module-2.description',   order: 3 },
  { id: 'module-7',   titleKey: 'research.module-7.title',   descKey: 'research.module-7.description',   order: 4 },
  { id: 'module-4',   titleKey: 'research.module-4.title',   descKey: 'research.module-4.description',   order: 5 },
  { id: 'module-5',   titleKey: 'research.module-5.title',   descKey: 'research.module-5.description',   order: 6 },
  { id: 'module-6',   titleKey: 'research.module-6.title',   descKey: 'research.module-6.description',   order: 7 },
];

// ── Toolkit categories (mirrors existing unit structure) ──────────
export const TOOLKIT_CATEGORIES: { id: string; titleKey: string; descKey: string; order: number }[] = [
  { id: 'python',        titleKey: 'toolkit.python.title',        descKey: 'toolkit.python.description',        order: 0 },
  { id: 'text',          titleKey: 'toolkit.text.title',          descKey: 'toolkit.text.description',          order: 1 },
  { id: 'corpus',        titleKey: 'toolkit.corpus.title',        descKey: 'toolkit.corpus.description',        order: 2 },
  { id: 'data',          titleKey: 'toolkit.data.title',          descKey: 'toolkit.data.description',          order: 3 },
  { id: 'descriptive',   titleKey: 'toolkit.descriptive.title',   descKey: 'toolkit.descriptive.description',   order: 4 },
  { id: 'visualization', titleKey: 'toolkit.visualization.title', descKey: 'toolkit.visualization.description', order: 5 },
  { id: 'inference',     titleKey: 'toolkit.inference.title',     descKey: 'toolkit.inference.description',     order: 6 },
  { id: 'tests',         titleKey: 'toolkit.tests.title',         descKey: 'toolkit.tests.description',         order: 7 },
  { id: 'regression',    titleKey: 'toolkit.regression.title',    descKey: 'toolkit.regression.description',    order: 8 },
  { id: 'mixed',         titleKey: 'toolkit.mixed.title',         descKey: 'toolkit.mixed.description',         order: 9 },
  { id: 'design',        titleKey: 'toolkit.design.title',        descKey: 'toolkit.design.description',        order: 10 },
];

// ── Content section entries ───────────────────────────────────────
// Each entry maps one source file into both research and toolkit paths.
// researchModule = null means "toolkit only" (not in research path).

const CONTENT_SECTIONS: SectionManifestEntry[] = [
  // ── unit-1: Python 基础 (6 节) ──────────────────────────────────
  // Research: 01+02 merged → foundation; 06 → foundation (merged w/ unit-4/01)
  // 03,04,05 → toolkit only
  {
    id: '01-variables-and-types',
    componentPath: '../content/unit-1/01-variables-and-types',
    titleKey: 'unit-1.sections.01-variables-and-types',
    researchModule: 'foundation', researchOrder: 1,
    toolkitCategory: 'python', toolkitOrder: 0,
  },
  {
    id: '02-lists-and-dicts',
    componentPath: '../content/unit-1/02-lists-and-dicts',
    titleKey: 'unit-1.sections.02-lists-and-dicts',
    researchModule: 'foundation', researchOrder: 1, // merged into "Python 基本词汇"
    toolkitCategory: 'python', toolkitOrder: 1,
  },
  {
    id: '03-loops',
    componentPath: '../content/unit-1/03-loops',
    titleKey: 'unit-1.sections.03-loops',
    researchModule: null, researchOrder: -1,
    toolkitCategory: 'python', toolkitOrder: 2,
  },
  {
    id: '04-conditionals',
    componentPath: '../content/unit-1/04-conditionals',
    titleKey: 'unit-1.sections.04-conditionals',
    researchModule: null, researchOrder: -1,
    toolkitCategory: 'python', toolkitOrder: 3,
  },
  {
    id: '05-functions',
    componentPath: '../content/unit-1/05-functions',
    titleKey: 'unit-1.sections.05-functions',
    researchModule: null, researchOrder: -1,
    toolkitCategory: 'python', toolkitOrder: 4,
  },
  {
    id: '06-file-io',
    componentPath: '../content/unit-1/06-file-io',
    titleKey: 'unit-1.sections.06-file-io',
    researchModule: 'foundation', researchOrder: 2, // merged into "打开研究数据"
    toolkitCategory: 'python', toolkitOrder: 5,
  },

  // ── unit-2: 文本处理 (3 节) ─────────────────────────────────────
  // Research: 01 → module-3 (merged w/ unit-3/01); 02,03 → toolkit only
  {
    id: '01-string-methods',
    componentPath: '../content/unit-2/01-string-methods',
    titleKey: 'unit-2.sections.01-string-methods',
    researchModule: 'module-3', researchOrder: 1, // "文本处理基本功" (merged)
    toolkitCategory: 'text', toolkitOrder: 0,
  },
  {
    id: '02-regex',
    componentPath: '../content/unit-2/02-regex',
    titleKey: 'unit-2.sections.02-regex',
    researchModule: null, researchOrder: -1,
    toolkitCategory: 'text', toolkitOrder: 1,
  },
  {
    id: '03-encoding',
    componentPath: '../content/unit-2/03-encoding',
    titleKey: 'unit-2.sections.03-encoding',
    researchModule: null, researchOrder: -1,
    toolkitCategory: 'text', toolkitOrder: 2,
  },

  // ── unit-3: 语料分析 (5 节) ─────────────────────────────────────
  // Research: all in module-3 (01 merged, 02 toolkit-only, 03,04,05 as-is)
  {
    id: '01-tokenization',
    componentPath: '../content/unit-3/01-tokenization',
    titleKey: 'unit-3.sections.01-tokenization',
    researchModule: 'module-3', researchOrder: 1, // merged into "文本处理基本功"
    toolkitCategory: 'corpus', toolkitOrder: 0,
  },
  {
    id: '02-frequency',
    componentPath: '../content/unit-3/02-frequency',
    titleKey: 'unit-3.sections.02-frequency',
    researchModule: null, researchOrder: -1,
    toolkitCategory: 'corpus', toolkitOrder: 1,
  },
  {
    id: '03-collocation',
    componentPath: '../content/unit-3/03-collocation',
    titleKey: 'unit-3.sections.03-collocation',
    researchModule: 'module-3', researchOrder: 2,
    toolkitCategory: 'corpus', toolkitOrder: 2,
  },
  {
    id: '04-tfidf',
    componentPath: '../content/unit-3/04-tfidf',
    titleKey: 'unit-3.sections.04-tfidf',
    researchModule: 'module-3', researchOrder: 4,
    toolkitCategory: 'corpus', toolkitOrder: 3,
  },
  {
    id: '05-kwic',
    componentPath: '../content/unit-3/05-kwic',
    titleKey: 'unit-3.sections.05-kwic',
    researchModule: 'module-3', researchOrder: 3,
    toolkitCategory: 'corpus', toolkitOrder: 4,
  },

  // ── unit-4: 数据整理 (4 节) ─────────────────────────────────────
  // Research: 01+06 → foundation; 02 → foundation; 03,04 → toolkit only
  {
    id: '01-dataframe-basics',
    componentPath: '../content/unit-4/01-dataframe-basics',
    titleKey: 'unit-4.sections.01-dataframe-basics',
    researchModule: 'foundation', researchOrder: 2, // primary for "打开研究数据"
    toolkitCategory: 'data', toolkitOrder: 0,
  },
  {
    id: '02-groupby',
    componentPath: '../content/unit-4/02-groupby',
    titleKey: 'unit-4.sections.02-groupby',
    researchModule: 'foundation', researchOrder: 3,
    toolkitCategory: 'data', toolkitOrder: 1,
  },
  {
    id: '03-cleaning',
    componentPath: '../content/unit-4/03-cleaning',
    titleKey: 'unit-4.sections.03-cleaning',
    researchModule: null, researchOrder: -1,
    toolkitCategory: 'data', toolkitOrder: 2,
  },
  {
    id: '04-reshape',
    componentPath: '../content/unit-4/04-reshape',
    titleKey: 'unit-4.sections.04-reshape',
    researchModule: null, researchOrder: -1,
    toolkitCategory: 'data', toolkitOrder: 3,
  },

  // ── unit-5: 描述统计 (5 节) ─────────────────────────────────────
  // Research: all in module-1 (02+05 merged)
  {
    id: '01-central-tendency',
    componentPath: '../content/unit-5/01-central-tendency',
    titleKey: 'unit-5.sections.01-central-tendency',
    researchModule: 'module-1', researchOrder: 1,
    toolkitCategory: 'descriptive', toolkitOrder: 0,
  },
  {
    id: '02-dispersion',
    componentPath: '../content/unit-5/02-dispersion',
    titleKey: 'unit-5.sections.02-dispersion',
    researchModule: 'module-1', researchOrder: 2, // primary for "数据有多散"
    toolkitCategory: 'descriptive', toolkitOrder: 1,
  },
  {
    id: '03-distribution',
    componentPath: '../content/unit-5/03-distribution',
    titleKey: 'unit-5.sections.03-distribution',
    researchModule: 'module-1', researchOrder: 3,
    toolkitCategory: 'descriptive', toolkitOrder: 2,
  },
  {
    id: '04-normalization',
    componentPath: '../content/unit-5/04-normalization',
    titleKey: 'unit-5.sections.04-normalization',
    researchModule: 'module-1', researchOrder: 5,
    toolkitCategory: 'descriptive', toolkitOrder: 3,
  },
  {
    id: '05-dispersion-metrics',
    componentPath: '../content/unit-5/05-dispersion-metrics',
    titleKey: 'unit-5.sections.05-dispersion-metrics',
    researchModule: 'module-1', researchOrder: 2, // merged into "数据有多散"
    toolkitCategory: 'descriptive', toolkitOrder: 4,
  },

  // ── unit-6: 可视化 (3 节) ───────────────────────────────────────
  // Research: 01+02 → module-1; 03 → module-4
  {
    id: '01-basic-charts',
    componentPath: '../content/unit-6/01-basic-charts',
    titleKey: 'unit-6.sections.01-basic-charts',
    researchModule: 'module-1', researchOrder: 4, // primary for "用图看数据"
    toolkitCategory: 'visualization', toolkitOrder: 0,
  },
  {
    id: '02-distribution-charts',
    componentPath: '../content/unit-6/02-distribution-charts',
    titleKey: 'unit-6.sections.02-distribution-charts',
    researchModule: 'module-1', researchOrder: 4, // merged into "用图看数据"
    toolkitCategory: 'visualization', toolkitOrder: 1,
  },
  {
    id: '03-relationship-charts',
    componentPath: '../content/unit-6/03-relationship-charts',
    titleKey: 'unit-6.sections.03-relationship-charts',
    researchModule: 'module-4', researchOrder: 1,
    toolkitCategory: 'visualization', toolkitOrder: 2,
  },

  // ── unit-7: 推断统计 (5 节) ─────────────────────────────────────
  // Research: 01+03 → module-2; 02+04 → module-2; 05 → module-7
  {
    id: '01-sampling',
    componentPath: '../content/unit-7/01-sampling',
    titleKey: 'unit-7.sections.01-sampling',
    researchModule: 'module-2', researchOrder: 1, // primary for "抽样分布→p值"
    toolkitCategory: 'inference', toolkitOrder: 0,
  },
  {
    id: '02-confidence-interval',
    componentPath: '../content/unit-7/02-confidence-interval',
    titleKey: 'unit-7.sections.02-confidence-interval',
    researchModule: 'module-2', researchOrder: 2, // primary for "CI + effect size"
    toolkitCategory: 'inference', toolkitOrder: 1,
  },
  {
    id: '03-p-value',
    componentPath: '../content/unit-7/03-p-value',
    titleKey: 'unit-7.sections.03-p-value',
    researchModule: 'module-2', researchOrder: 1, // merged into "抽样分布→p值"
    toolkitCategory: 'inference', toolkitOrder: 2,
  },
  {
    id: '04-effect-size',
    componentPath: '../content/unit-7/04-effect-size',
    titleKey: 'unit-7.sections.04-effect-size',
    researchModule: 'module-2', researchOrder: 2, // merged into "CI + effect size"
    toolkitCategory: 'inference', toolkitOrder: 3,
  },
  {
    id: '05-power',
    componentPath: '../content/unit-7/05-power',
    titleKey: 'unit-7.sections.05-power',
    researchModule: 'module-7', researchOrder: 2, // merged w/ unit-11/02
    toolkitCategory: 'inference', toolkitOrder: 4,
  },

  // ── unit-8: 检验方法 (5 节) ─────────────────────────────────────
  // Research: 01 → module-2; 03 → module-2; 05 → module-2; 02 → module-2; 04 → module-3
  {
    id: '01-t-test',
    componentPath: '../content/unit-8/01-t-test',
    titleKey: 'unit-8.sections.01-t-test',
    researchModule: 'module-2', researchOrder: 3,
    toolkitCategory: 'tests', toolkitOrder: 0,
  },
  {
    id: '02-chi-square',
    componentPath: '../content/unit-8/02-chi-square',
    titleKey: 'unit-8.sections.02-chi-square',
    researchModule: 'module-2', researchOrder: 5,
    toolkitCategory: 'tests', toolkitOrder: 1,
  },
  {
    id: '03-anova',
    componentPath: '../content/unit-8/03-anova',
    titleKey: 'unit-8.sections.03-anova',
    researchModule: 'module-2', researchOrder: 4,
    toolkitCategory: 'tests', toolkitOrder: 2,
  },
  {
    id: '04-correlation',
    componentPath: '../content/unit-8/04-correlation',
    titleKey: 'unit-8.sections.04-correlation',
    researchModule: 'module-3', researchOrder: 5,
    toolkitCategory: 'tests', toolkitOrder: 3,
  },
  {
    id: '05-multiple-correction',
    componentPath: '../content/unit-8/05-multiple-correction',
    titleKey: 'unit-8.sections.05-multiple-correction',
    researchModule: 'module-2', researchOrder: 6,
    toolkitCategory: 'tests', toolkitOrder: 4,
  },

  // ── unit-9: 回归模型 (5 节) ─────────────────────────────────────
  // Research: 01 → module-4; 02 → module-5; 03 → module-5; 04 → module-4; 05 → module-5
  {
    id: '01-linear-regression',
    componentPath: '../content/unit-9/01-linear-regression',
    titleKey: 'unit-9.sections.01-linear-regression',
    researchModule: 'module-4', researchOrder: 2,
    toolkitCategory: 'regression', toolkitOrder: 0,
  },
  {
    id: '02-logistic-regression',
    componentPath: '../content/unit-9/02-logistic-regression',
    titleKey: 'unit-9.sections.02-logistic-regression',
    researchModule: 'module-5', researchOrder: 1,
    toolkitCategory: 'regression', toolkitOrder: 1,
  },
  {
    id: '03-interaction',
    componentPath: '../content/unit-9/03-interaction',
    titleKey: 'unit-9.sections.03-interaction',
    researchModule: 'module-5', researchOrder: 2,
    toolkitCategory: 'regression', toolkitOrder: 2,
  },
  {
    id: '04-model-diagnostics',
    componentPath: '../content/unit-9/04-model-diagnostics',
    titleKey: 'unit-9.sections.04-model-diagnostics',
    researchModule: 'module-4', researchOrder: 3,
    toolkitCategory: 'regression', toolkitOrder: 3,
  },
  {
    id: '05-reporting',
    componentPath: '../content/unit-9/05-reporting',
    titleKey: 'unit-9.sections.05-reporting',
    researchModule: 'module-5', researchOrder: 3,
    toolkitCategory: 'regression', toolkitOrder: 4,
  },

  // ── unit-10: 混合效应模型 (5 节) ─────────────────────────────────
  // Research: all in module-6 (01+02 merged, 03 split, 04+05 merged)
  {
    id: '01-why-mixed',
    componentPath: '../content/unit-10/01-why-mixed',
    titleKey: 'unit-10.sections.01-why-mixed',
    researchModule: 'module-6', researchOrder: 1, // primary for "为什么传统回归不够"
    toolkitCategory: 'mixed', toolkitOrder: 0,
  },
  {
    id: '02-fixed-vs-random',
    componentPath: '../content/unit-10/02-fixed-vs-random',
    titleKey: 'unit-10.sections.02-fixed-vs-random',
    researchModule: 'module-6', researchOrder: 1, // merged into "为什么传统回归不够"
    toolkitCategory: 'mixed', toolkitOrder: 1,
  },
  {
    id: '03-random-slopes',
    componentPath: '../content/unit-10/03-random-slopes',
    titleKey: 'unit-10.sections.03-random-slopes',
    researchModule: 'module-6', researchOrder: 2,
    toolkitCategory: 'mixed', toolkitOrder: 2,
  },
  {
    id: '04-model-selection',
    componentPath: '../content/unit-10/04-model-selection',
    titleKey: 'unit-10.sections.04-model-selection',
    researchModule: 'module-6', researchOrder: 4, // primary for "模型选择与Python实现"
    toolkitCategory: 'mixed', toolkitOrder: 3,
  },
  {
    id: '05-python-implementation',
    componentPath: '../content/unit-10/05-python-implementation',
    titleKey: 'unit-10.sections.05-python-implementation',
    researchModule: 'module-6', researchOrder: 4, // merged into "模型选择与Python实现"
    toolkitCategory: 'mixed', toolkitOrder: 4,
  },

  // ── unit-11: 研究设计 (4 节) ────────────────────────────────────
  // Research: all in module-7 (02 merged w/ unit-7/05)
  {
    id: '01-operationalization',
    componentPath: '../content/unit-11/01-operationalization',
    titleKey: 'unit-11.sections.01-operationalization',
    researchModule: 'module-7', researchOrder: 1,
    toolkitCategory: 'design', toolkitOrder: 0,
  },
  {
    id: '02-sampling-strategy',
    componentPath: '../content/unit-11/02-sampling-strategy',
    titleKey: 'unit-11.sections.02-sampling-strategy',
    researchModule: 'module-7', researchOrder: 2, // merged w/ unit-7/05
    toolkitCategory: 'design', toolkitOrder: 1,
  },
  {
    id: '03-confounding',
    componentPath: '../content/unit-11/03-confounding',
    titleKey: 'unit-11.sections.03-confounding',
    researchModule: 'module-7', researchOrder: 3,
    toolkitCategory: 'design', toolkitOrder: 2,
  },
  {
    id: '04-reproducibility',
    componentPath: '../content/unit-11/04-reproducibility',
    titleKey: 'unit-11.sections.04-reproducibility',
    researchModule: 'module-7', researchOrder: 4,
    toolkitCategory: 'design', toolkitOrder: 3,
  },
];

export const MANIFEST: SectionManifestEntry[] = [...CONTENT_SECTIONS];

// ── Builders ──────────────────────────────────────────────────────

export function getManifest(): SectionManifestEntry[] {
  return MANIFEST;
}

export function getSectionById(id: string): SectionManifestEntry | undefined {
  return MANIFEST.find((e) => e.id === id);
}

function makeSectionMeta(entry: SectionManifestEntry, order: number): SectionMeta {
  return { id: entry.id, title: '', order };
}

export function buildResearchUnits(manifest: SectionManifestEntry[]): UnitMeta[] {
  const moduleMap = new Map<string, { config: (typeof RESEARCH_MODULES)[0]; sections: SectionManifestEntry[] }>();

  for (const m of RESEARCH_MODULES) {
    moduleMap.set(m.id, { config: m, sections: [] });
  }

  for (const entry of manifest) {
    if (entry.isScenario) continue;
    if (entry.researchModule && !entry.hideInToolkit) {
      const mod = moduleMap.get(entry.researchModule);
      if (mod) mod.sections.push(entry);
    }
  }

  const units: UnitMeta[] = [];
  for (const [, { config, sections }] of moduleMap) {
    // Deduplicate by id (for merged sections that share the same file)
    const seen = new Set<string>();
    const unique = sections.filter((s) => {
      if (seen.has(s.id)) return false;
      seen.add(s.id);
      return true;
    });

    unique.sort((a, b) => a.researchOrder - b.researchOrder);
    units.push({
      id: config.id,
      title: '', // filled by i18n
      order: config.order,
      description: '', // filled by i18n
      sections: unique.map((e, i) => makeSectionMeta(e, i)),
    });
  }
  units.sort((a, b) => a.order - b.order);
  return units;
}

export function buildToolkitUnits(manifest: SectionManifestEntry[]): UnitMeta[] {
  const categoryMap = new Map<string, { config: (typeof TOOLKIT_CATEGORIES)[0]; sections: SectionManifestEntry[] }>();

  for (const c of TOOLKIT_CATEGORIES) {
    categoryMap.set(c.id, { config: c, sections: [] });
  }

  for (const entry of manifest) {
    if (entry.hideInToolkit) continue;
    const cat = categoryMap.get(entry.toolkitCategory);
    if (cat) cat.sections.push(entry);
  }

  const units: UnitMeta[] = [];
  for (const [, { config, sections }] of categoryMap) {
    const seen = new Set<string>();
    const unique = sections.filter((s) => {
      if (seen.has(s.id)) return false;
      seen.add(s.id);
      return true;
    });

    unique.sort((a, b) => a.toolkitOrder - b.toolkitOrder);
    if (unique.length === 0) continue;
    units.push({
      id: config.id,
      title: '',
      order: config.order,
      description: '',
      sections: unique.map((e, i) => makeSectionMeta(e, i)),
    });
  }
  units.sort((a, b) => a.order - b.order);
  return units;
}

// ── Path-aware navigation helpers ─────────────────────────────────

export function getAdjacentInPath(
  units: UnitMeta[],
  currentUnitId: string,
  currentSectionId: string,
): { unitId: string; sectionId: string } | null {
  const unitIndex = units.findIndex((u) => u.id === currentUnitId);
  if (unitIndex === -1) return null;

  const unit = units[unitIndex];
  const sectionIndex = unit.sections.findIndex((s) => s.id === currentSectionId);
  if (sectionIndex === -1) return null;

  // Next section in same unit
  if (sectionIndex < unit.sections.length - 1) {
    return { unitId: unit.id, sectionId: unit.sections[sectionIndex + 1].id };
  }
  // First section of next unit
  if (unitIndex < units.length - 1) {
    const nextUnit = units[unitIndex + 1];
    if (nextUnit.sections.length > 0) {
      return { unitId: nextUnit.id, sectionId: nextUnit.sections[0].id };
    }
  }
  return null;
}

export function getPrevInPath(
  units: UnitMeta[],
  currentUnitId: string,
  currentSectionId: string,
): { unitId: string; sectionId: string } | null {
  const unitIndex = units.findIndex((u) => u.id === currentUnitId);
  if (unitIndex === -1) return null;

  const unit = units[unitIndex];
  const sectionIndex = unit.sections.findIndex((s) => s.id === currentSectionId);
  if (sectionIndex === -1) return null;

  // Previous section in same unit
  if (sectionIndex > 0) {
    return { unitId: unit.id, sectionId: unit.sections[sectionIndex - 1].id };
  }
  // Last section of previous unit
  if (unitIndex > 0) {
    const prevUnit = units[unitIndex - 1];
    if (prevUnit.sections.length > 0) {
      return {
        unitId: prevUnit.id,
        sectionId: prevUnit.sections[prevUnit.sections.length - 1].id,
      };
    }
  }
  return null;
}
