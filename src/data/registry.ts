import { lazy, type ComponentType } from 'react';

// ── Scenario page components ───────────────────────────────────────
export const scenarioMap: Record<string, ComponentType> = {
  'foundation-scenario': lazy(() => import('../content/scenarios/FoundationScenario')),
  'module-1-scenario': lazy(() => import('../content/scenarios/Module1Scenario')),
  'module-2-scenario': lazy(() => import('../content/scenarios/Module2Scenario')),
  'module-3-scenario': lazy(() => import('../content/scenarios/Module3Scenario')),
  'module-4-scenario': lazy(() => import('../content/scenarios/Module4Scenario')),
  'module-5-scenario': lazy(() => import('../content/scenarios/Module5Scenario')),
  'module-6-scenario': lazy(() => import('../content/scenarios/Module6Scenario')),
  'module-7-scenario': lazy(() => import('../content/scenarios/Module7Scenario')),
};

const sectionMap: Record<string, Record<string, ComponentType>> = {
  'unit-0': {
    '01-intro': lazy(() => import('../content/unit-0/01-intro')),
    '02-setup': lazy(() => import('../content/unit-0/02-setup')),
    '03-overview': lazy(() => import('../content/unit-0/03-overview')),
  },
  'unit-1': {
    '01-variables-and-types': lazy(() => import('../content/unit-1/01-variables-and-types')),
    '02-lists-and-dicts': lazy(() => import('../content/unit-1/02-lists-and-dicts')),
    '03-loops': lazy(() => import('../content/unit-1/03-loops')),
    '04-conditionals': lazy(() => import('../content/unit-1/04-conditionals')),
    '05-functions': lazy(() => import('../content/unit-1/05-functions')),
    '06-file-io': lazy(() => import('../content/unit-1/06-file-io')),
  },
  'unit-2': {
    '01-string-methods': lazy(() => import('../content/unit-2/01-string-methods')),
    '02-regex': lazy(() => import('../content/unit-2/02-regex')),
    '03-encoding': lazy(() => import('../content/unit-2/03-encoding')),
  },
  'unit-3': {
    '01-tokenization': lazy(() => import('../content/unit-3/01-tokenization')),
    '02-frequency': lazy(() => import('../content/unit-3/02-frequency')),
    '03-collocation': lazy(() => import('../content/unit-3/03-collocation')),
    '04-tfidf': lazy(() => import('../content/unit-3/04-tfidf')),
    '05-kwic': lazy(() => import('../content/unit-3/05-kwic')),
  },
  'unit-4': {
    '01-dataframe-basics': lazy(() => import('../content/unit-4/01-dataframe-basics')),
    '02-groupby': lazy(() => import('../content/unit-4/02-groupby')),
    '03-cleaning': lazy(() => import('../content/unit-4/03-cleaning')),
    '04-reshape': lazy(() => import('../content/unit-4/04-reshape')),
  },
  'unit-5': {
    '01-central-tendency': lazy(() => import('../content/unit-5/01-central-tendency')),
    '02-dispersion': lazy(() => import('../content/unit-5/02-dispersion')),
    '03-distribution': lazy(() => import('../content/unit-5/03-distribution')),
    '04-normalization': lazy(() => import('../content/unit-5/04-normalization')),
    '05-dispersion-metrics': lazy(() => import('../content/unit-5/05-dispersion-metrics')),
  },
  'unit-6': {
    '01-basic-charts': lazy(() => import('../content/unit-6/01-basic-charts')),
    '02-distribution-charts': lazy(() => import('../content/unit-6/02-distribution-charts')),
    '03-relationship-charts': lazy(() => import('../content/unit-6/03-relationship-charts')),
  },
  'unit-7': {
    '01-sampling': lazy(() => import('../content/unit-7/01-sampling')),
    '02-confidence-interval': lazy(() => import('../content/unit-7/02-confidence-interval')),
    '03-p-value': lazy(() => import('../content/unit-7/03-p-value')),
    '04-effect-size': lazy(() => import('../content/unit-7/04-effect-size')),
    '05-power': lazy(() => import('../content/unit-7/05-power')),
  },
  'unit-8': {
    '01-t-test': lazy(() => import('../content/unit-8/01-t-test')),
    '02-chi-square': lazy(() => import('../content/unit-8/02-chi-square')),
    '03-anova': lazy(() => import('../content/unit-8/03-anova')),
    '04-correlation': lazy(() => import('../content/unit-8/04-correlation')),
    '05-multiple-correction': lazy(() => import('../content/unit-8/05-multiple-correction')),
  },
  'unit-9': {
    '01-linear-regression': lazy(() => import('../content/unit-9/01-linear-regression')),
    '02-logistic-regression': lazy(() => import('../content/unit-9/02-logistic-regression')),
    '03-interaction': lazy(() => import('../content/unit-9/03-interaction')),
    '04-model-diagnostics': lazy(() => import('../content/unit-9/04-model-diagnostics')),
    '05-reporting': lazy(() => import('../content/unit-9/05-reporting')),
  },
  'unit-10': {
    '01-why-mixed': lazy(() => import('../content/unit-10/01-why-mixed')),
    '02-fixed-vs-random': lazy(() => import('../content/unit-10/02-fixed-vs-random')),
    '03-random-slopes': lazy(() => import('../content/unit-10/03-random-slopes')),
    '04-model-selection': lazy(() => import('../content/unit-10/04-model-selection')),
    '05-python-implementation': lazy(() => import('../content/unit-10/05-python-implementation')),
  },
  'unit-11': {
    '01-operationalization': lazy(() => import('../content/unit-11/01-operationalization')),
    '02-sampling-strategy': lazy(() => import('../content/unit-11/02-sampling-strategy')),
    '03-confounding': lazy(() => import('../content/unit-11/03-confounding')),
    '04-reproducibility': lazy(() => import('../content/unit-11/04-reproducibility')),
  },
};

// ── Flat manifest-based component lookup ───────────────────────────
// Maps stable section IDs (from manifest) to components.
function buildManifestComponentMap(): Record<string, ComponentType> {
  const map: Record<string, ComponentType> = { ...scenarioMap };
  for (const unitSections of Object.values(sectionMap)) {
    for (const [sectionId, component] of Object.entries(unitSections)) {
      map[sectionId] = component;
    }
  }
  return map;
}

export const manifestComponentMap: Record<string, ComponentType> = buildManifestComponentMap();

export const appendixMap: Record<string, ComponentType> = {
  '01-python-cheatsheet': lazy(() => import('../content/appendix/01-python-cheatsheet')),
  '02-pandas-cheatsheet': lazy(() => import('../content/appendix/02-pandas-cheatsheet')),
  '03-statistics-flowchart': lazy(() => import('../content/appendix/03-statistics-flowchart')),
  '04-common-errors': lazy(() => import('../content/appendix/04-common-errors')),
  '05-r-vs-python': lazy(() => import('../content/appendix/05-r-vs-python')),
  '06-resources': lazy(() => import('../content/appendix/06-resources')),
};

export function getSectionComponent(
  unitId: string,
  sectionId: string,
): ComponentType | null {
  return sectionMap[unitId]?.[sectionId] ?? null;
}

export function getAppendixComponent(appendixId: string): ComponentType | null {
  return appendixMap[appendixId] ?? null;
}

/** Look up a component by its stable manifest section ID. */
export function getComponentByManifestId(sectionId: string): ComponentType | null {
  return manifestComponentMap[sectionId] ?? null;
}
