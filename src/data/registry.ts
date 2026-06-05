import { lazy, type ComponentType } from 'react';

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
    '07-numpy-basics': lazy(() => import('../content/unit-1/07-numpy-basics')),
  },
  'data-collection': {
    '01-file-formats': lazy(() => import('../content/data-collection/01-file-formats')),
    '02-api-access': lazy(() => import('../content/data-collection/02-api-access')),
    '03-web-scraping': lazy(() => import('../content/data-collection/03-web-scraping')),
    '04-data-integration': lazy(() => import('../content/data-collection/04-data-integration')),
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
    '04-collostruction': lazy(() => import('../content/unit-3/04-collostruction')),
    '05-tfidf': lazy(() => import('../content/unit-3/05-tfidf')),
    '06-kwic': lazy(() => import('../content/unit-3/06-kwic')),
    '07-text-classification': lazy(() => import('../content/unit-3/07-text-classification')),
    '08-sentiment-analysis': lazy(() => import('../content/unit-3/08-sentiment-analysis')),
    '09-word-embeddings': lazy(() => import('../content/unit-3/09-word-embeddings')),
    '10-clustering': lazy(() => import('../content/unit-3/10-clustering')),
    '11-dimensionality-reduction': lazy(() => import('../content/unit-3/11-dimensionality-reduction')),
  },
  'unit-4': {
    '01-dataframe-basics': lazy(() => import('../content/unit-4/01-dataframe-basics')),
    '02-groupby': lazy(() => import('../content/unit-4/02-groupby')),
    '03-cleaning': lazy(() => import('../content/unit-4/03-cleaning')),
    '04-reshape': lazy(() => import('../content/unit-4/04-reshape')),
    '05-missing-data': lazy(() => import('../content/unit-4/05-missing-data')),
    '06-outliers': lazy(() => import('../content/unit-4/06-outliers')),
  },
  'unit-5': {
    '01-central-tendency': lazy(() => import('../content/unit-5/01-central-tendency')),
    '02-dispersion': lazy(() => import('../content/unit-5/02-dispersion')),
    '03-distribution': lazy(() => import('../content/unit-5/03-distribution')),
    '04-normalization': lazy(() => import('../content/unit-5/04-normalization')),
    '05-lexical-diversity': lazy(() => import('../content/unit-5/05-lexical-diversity')),
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
    '06-paired-test': lazy(() => import('../content/unit-8/06-paired-test')),
  },
  'unit-9': {
    '01-linear-regression': lazy(() => import('../content/unit-9/01-linear-regression')),
    '02-logistic-regression': lazy(() => import('../content/unit-9/02-logistic-regression')),
    '03-interaction': lazy(() => import('../content/unit-9/03-interaction')),
    '04-model-diagnostics': lazy(() => import('../content/unit-9/04-model-diagnostics')),
    '05-reporting': lazy(() => import('../content/unit-9/05-reporting')),
    '06-categorical-encoding': lazy(() => import('../content/unit-9/06-categorical-encoding')),
  },
  'unit-10': {
    '01-why-mixed': lazy(() => import('../content/unit-10/01-why-mixed')),
    '02-fixed-vs-random': lazy(() => import('../content/unit-10/02-fixed-vs-random')),
    '03-random-slopes': lazy(() => import('../content/unit-10/03-random-slopes')),
    '04-model-selection': lazy(() => import('../content/unit-10/04-model-selection')),
    '05-python-implementation': lazy(() => import('../content/unit-10/05-python-implementation')),
    '06-glmm': lazy(() => import('../content/unit-10/06-glmm')),
  },
  'unit-11': {
    '01-operationalization': lazy(() => import('../content/unit-11/01-operationalization')),
    '02-sampling-strategy': lazy(() => import('../content/unit-11/02-sampling-strategy')),
    '03-confounding': lazy(() => import('../content/unit-11/03-confounding')),
    '04-reproducibility': lazy(() => import('../content/unit-11/04-reproducibility')),
    '05-ethics-review': lazy(() => import('../content/unit-11/05-ethics-review')),
    '06-within-between': lazy(() => import('../content/unit-11/06-within-between')),
    '07-counterbalancing': lazy(() => import('../content/unit-11/07-counterbalancing')),
    '08-questionnaire-design': lazy(() => import('../content/unit-11/08-questionnaire-design')),
    '09-likert-scales': lazy(() => import('../content/unit-11/09-likert-scales')),
  },
  'unit-12': {
    '01-inter-rater-kappa': lazy(() => import('../content/unit-12/01-inter-rater-kappa')),
    '02-krippendorff-alpha': lazy(() => import('../content/unit-12/02-krippendorff-alpha')),
    '03-cronbach-alpha': lazy(() => import('../content/unit-12/03-cronbach-alpha')),
    '04-validity': lazy(() => import('../content/unit-12/04-validity')),
    '05-measurement-levels': lazy(() => import('../content/unit-12/05-measurement-levels')),
  },
};

// ── Flat manifest-based component lookup ───────────────────────────
// Maps stable section IDs (from manifest) to components.
function buildManifestComponentMap(): Record<string, ComponentType> {
  const map: Record<string, ComponentType> = {};
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
  '07-sklearn-cheatsheet': lazy(() => import('../content/appendix/07-sklearn-cheatsheet')),
  '08-linguistics-datasets': lazy(() => import('../content/appendix/08-linguistics-datasets')),
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

/**
 * Unified component resolver — tries two-level legacy lookup first, then flat
 * manifest lookup. Returns null only if the section truly has no component.
 */
export function resolveSectionComponent(
  unitId: string,
  sectionId: string,
): ComponentType | null {
  return sectionMap[unitId]?.[sectionId] ?? manifestComponentMap[sectionId] ?? null;
}
