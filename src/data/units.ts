import { useTranslation } from 'react-i18next';
import type { UnitMeta, SectionMeta } from '../types/content';

export const UNITS: UnitMeta[] = [
  {
    id: 'unit-0',
    title: '学前准备',
    order: 0,
    description: '安装 Python 环境，了解本教材的使用方法。',
    sections: [
      { id: '01-intro', title: '为什么要学编程', order: 1 },
      { id: '02-setup', title: 'Python 环境搭建', order: 2 },
      { id: '03-overview', title: '教材使用指南', order: 3 },
    ],
  },
  {
    id: 'unit-1',
    title: 'Python 最简生存包',
    order: 1,
    description: '从零开始，掌握写分析脚本必须的 Python 基础。',
    sections: [
      { id: '01-variables-and-types', title: '变量与数据类型', order: 1 },
      { id: '02-lists-and-dicts', title: '列表与字典', order: 2 },
      { id: '03-loops', title: '循环', order: 3 },
      { id: '04-conditionals', title: '条件判断', order: 4 },
      { id: '05-functions', title: '函数', order: 5 },
      { id: '06-file-io', title: '文件读写', order: 6 },
    ],
  },
  {
    id: 'unit-2',
    title: '文本处理核心',
    order: 2,
    description: '用 Python 处理自然语言文本的基本功。',
    sections: [
      { id: '01-string-methods', title: '字符串方法', order: 1 },
      { id: '02-regex', title: '正则表达式', order: 2 },
      { id: '03-encoding', title: '编码与中文处理', order: 3 },
    ],
  },
  {
    id: 'unit-3',
    title: '语料分析入门',
    order: 3,
    description: '用 NLTK / spaCy 做分词、词频、搭配分析。',
    sections: [
      { id: '01-tokenization', title: '分词与词性标注', order: 1 },
      { id: '02-frequency', title: '词频统计', order: 2 },
      { id: '03-collocation', title: '搭配分析', order: 3 },
      { id: '04-tfidf', title: '关键词提取', order: 4 },
      { id: '05-kwic', title: '索引行（KWIC）', order: 5 },
    ],
  },
  {
    id: 'unit-4',
    title: '数据整理',
    order: 4,
    description: '用 pandas 把分析结果整理成干净、可分析的数据表。',
    sections: [
      { id: '01-dataframe-basics', title: 'DataFrame 基本操作', order: 1 },
      { id: '02-groupby', title: '分组汇总', order: 2 },
      { id: '03-cleaning', title: '数据清洗', order: 3 },
      { id: '04-reshape', title: '数据变形', order: 4 },
    ],
  },
  {
    id: 'unit-5',
    title: '描述统计',
    order: 5,
    description: '学会用统计量描述你的数据，知道均值、标准差、分布的真正含义。',
    sections: [
      { id: '01-central-tendency', title: '集中趋势', order: 1 },
      { id: '02-dispersion', title: '离散程度', order: 2 },
      { id: '03-distribution', title: '分布形态', order: 3 },
      { id: '04-normalization', title: '频率标准化', order: 4 },
      { id: '05-dispersion-metrics', title: '离散度指标', order: 5 },
    ],
  },
  {
    id: 'unit-6',
    title: '数据可视化',
    order: 6,
    description: '画出来的图比表格更有说服力。',
    sections: [
      { id: '01-basic-charts', title: '基础图表', order: 1 },
      { id: '02-distribution-charts', title: '分布图', order: 2 },
      { id: '03-relationship-charts', title: '关系图与效应量', order: 3 },
    ],
  },
  {
    id: 'unit-7',
    title: '推断统计基础',
    order: 7,
    description: '理解 p 值、置信区间、效应量——判断差异是真的还是碰巧。',
    sections: [
      { id: '01-sampling', title: '抽样分布与标准误', order: 1 },
      { id: '02-confidence-interval', title: '置信区间', order: 2 },
      { id: '03-p-value', title: 'p 值与显著性', order: 3 },
      { id: '04-effect-size', title: '效应量', order: 4 },
      { id: '05-power', title: '统计检验力', order: 5 },
    ],
  },
  {
    id: 'unit-8',
    title: '常用检验方法',
    order: 8,
    description: '对每种研究问题找到正确的统计检验。',
    sections: [
      { id: '01-t-test', title: 't 检验与 Mann-Whitney U', order: 1 },
      { id: '02-chi-square', title: '卡方检验', order: 2 },
      { id: '03-anova', title: '方差分析（ANOVA）', order: 3 },
      { id: '04-correlation', title: '相关分析', order: 4 },
      { id: '05-multiple-correction', title: '多重比较校正', order: 5 },
    ],
  },
  {
    id: 'unit-9',
    title: '回归模型',
    order: 9,
    description: '同时考虑多个因素对语言现象的影响。',
    sections: [
      { id: '01-linear-regression', title: '线性回归', order: 1 },
      { id: '02-logistic-regression', title: '逻辑回归', order: 2 },
      { id: '03-interaction', title: '交互效应', order: 3 },
      { id: '04-model-diagnostics', title: '模型诊断', order: 4 },
      { id: '05-reporting', title: '结果报告规范', order: 5 },
    ],
  },
  {
    id: 'unit-10',
    title: '混合效应模型',
    order: 10,
    description: '语言学量化研究的标配方法——处理说话人、词项等随机效应。',
    sections: [
      { id: '01-why-mixed', title: '为什么需要混合模型', order: 1 },
      { id: '02-fixed-vs-random', title: '固定效应 vs 随机效应', order: 2 },
      { id: '03-random-slopes', title: '随机截距与随机斜率', order: 3 },
      { id: '04-model-selection', title: '模型选择', order: 4 },
      { id: '05-python-implementation', title: 'Python 实现', order: 5 },
    ],
  },
  {
    id: 'unit-11',
    title: '研究设计与伦理',
    order: 11,
    description: '动手前的思维框架——好的研究设计比好的统计方法更重要。',
    sections: [
      { id: '01-operationalization', title: '研究问题操作化', order: 1 },
      { id: '02-sampling-strategy', title: '抽样策略', order: 2 },
      { id: '03-confounding', title: '混淆变量与控制', order: 3 },
      { id: '04-reproducibility', title: '可重复性', order: 4 },
    ],
  },
];

export const APPENDIX_SECTIONS: SectionMeta[] = [
  { id: '01-python-cheatsheet', title: 'Python 速查表', order: 1 },
  { id: '02-pandas-cheatsheet', title: 'pandas 速查表', order: 2 },
  { id: '03-statistics-flowchart', title: '统计检验选择流程图', order: 3 },
  { id: '04-common-errors', title: '常见报错与解决方法', order: 4 },
  { id: '05-r-vs-python', title: 'R vs Python 对照表', order: 5 },
  { id: '06-resources', title: '推荐资源', order: 6 },
];

export function getUnitById(id: string): UnitMeta | undefined {
  return UNITS.find((u) => u.id === id);
}

export function getSectionMeta(unitId: string, sectionId: string) {
  const unit = getUnitById(unitId);
  return unit?.sections.find((s) => s.id === sectionId);
}

export function getAdjacentSection(
  unitId: string,
  sectionId: string,
): { unitId: string; sectionId: string } | null {
  const unit = getUnitById(unitId);
  if (!unit) return null;

  const secIndex = unit.sections.findIndex((s) => s.id === sectionId);
  if (secIndex === -1) return null;

  // Next section in same unit
  if (secIndex < unit.sections.length - 1) {
    return {
      unitId,
      sectionId: unit.sections[secIndex + 1].id,
    };
  }

  // Last section → first section of next unit
  const unitIndex = UNITS.findIndex((u) => u.id === unitId);
  if (unitIndex < UNITS.length - 1) {
    const nextUnit = UNITS[unitIndex + 1];
    return {
      unitId: nextUnit.id,
      sectionId: nextUnit.sections[0].id,
    };
  }

  return null;
}

export function getPrevSection(
  unitId: string,
  sectionId: string,
): { unitId: string; sectionId: string } | null {
  const unit = getUnitById(unitId);
  if (!unit) return null;

  const secIndex = unit.sections.findIndex((s) => s.id === sectionId);
  if (secIndex === -1) return null;

  // Previous section in same unit
  if (secIndex > 0) {
    return {
      unitId,
      sectionId: unit.sections[secIndex - 1].id,
    };
  }

  // First section → last section of previous unit
  const unitIndex = UNITS.findIndex((u) => u.id === unitId);
  if (unitIndex > 0) {
    const prevUnit = UNITS[unitIndex - 1];
    const lastSection = prevUnit.sections[prevUnit.sections.length - 1];
    return {
      unitId: prevUnit.id,
      sectionId: lastSection.id,
    };
  }

  return null;
}

export function useLocalizedUnits(): UnitMeta[] {
  const { t } = useTranslation('units');
  return UNITS.map((unit) => ({
    ...unit,
    title: t(`${unit.id}.title`, unit.title),
    description: t(`${unit.id}.description`, unit.description),
    sections: unit.sections.map((s) => ({
      ...s,
      title: t(`${unit.id}.sections.${s.id}`, s.title),
    })),
  }));
}

export function useLocalizedAppendix(): SectionMeta[] {
  const { t } = useTranslation('units');
  return APPENDIX_SECTIONS.map((s) => ({
    ...s,
    title: t(`appendix.${s.id}`, s.title),
  }));
}
