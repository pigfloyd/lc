import { useTranslation } from 'react-i18next';
import type { UnitMeta, SectionMeta, NavMode } from '../types/content';
import zhUnitsJson from '../i18n/locales/zh/units.json';
import {
  MANIFEST,
  buildResearchUnits,
  buildToolkitUnits,
  getAdjacentInPath,
  getPrevInPath,
} from './contentManifest';

// Cached unit arrays built from manifest (no i18n titles yet)
const _researchUnits = buildResearchUnits(MANIFEST);
const _toolkitUnits = buildToolkitUnits(MANIFEST);

// ── Legacy UNITS（从 manifest 派生，向后兼容旧 /unit/unit-X/... URL）──
// 结构（单元划分、小节顺序）来自 manifest 的 componentPath 目录；
// 中文标题来自 zh/units.json（i18n 兜底语言，键覆盖已由构建保证完整）。
// 不要在这里手工添加单元/小节 —— 改 contentManifest.ts 即可。

const zhUnits = zhUnitsJson as Record<
  string,
  { title?: string; description?: string; sections?: Record<string, string> } | Record<string, string>
>;

function zhUnitMeta(unitId: string): { title?: string; description?: string; sections?: Record<string, string> } {
  const meta = zhUnits[unitId];
  return meta && typeof meta === 'object' ? (meta as { title?: string; description?: string; sections?: Record<string, string> }) : {};
}

function unitDirOf(componentPath: string): string {
  // '../content/unit-1/05-functions' → 'unit-1'
  return componentPath.split('/')[2] ?? '';
}

function buildLegacyUnits(): UnitMeta[] {
  const dirOrder: string[] = [];
  const sectionsByDir = new Map<string, SectionMeta[]>();

  for (const entry of MANIFEST) {
    const dir = unitDirOf(entry.componentPath);
    if (!dir) continue;
    let sections = sectionsByDir.get(dir);
    if (!sections) {
      sections = [];
      sectionsByDir.set(dir, sections);
      dirOrder.push(dir);
    }
    sections.push({
      id: entry.id,
      title: zhUnitMeta(dir).sections?.[entry.id] ?? '',
      order: sections.length + 1,
    });
  }

  return dirOrder.map((dir, i) => ({
    id: dir,
    title: zhUnitMeta(dir).title ?? dir,
    order: i,
    description: zhUnitMeta(dir).description ?? '',
    sections: sectionsByDir.get(dir)!,
  }));
}

export const UNITS: UnitMeta[] = buildLegacyUnits();

const APPENDIX_IDS = [
  '01-python-cheatsheet',
  '02-pandas-cheatsheet',
  '03-statistics-flowchart',
  '04-common-errors',
  '05-r-vs-python',
  '06-resources',
  '07-sklearn-cheatsheet',
  '08-linguistics-datasets',
];

export const APPENDIX_SECTIONS: SectionMeta[] = APPENDIX_IDS.map((id, i) => ({
  id,
  title: (zhUnits.appendix as Record<string, string> | undefined)?.[id] ?? id,
  order: i + 1,
}));

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

// ── Dual-path hooks ────────────────────────────────────────────────

export function useResearchUnits(): UnitMeta[] {
  const { t } = useTranslation('units');
  return _researchUnits.map((unit) => ({
    ...unit,
    title: t(`research.${unit.id}.title`, unit.title),
    description: t(`research.${unit.id}.description`, unit.description),
    question: t(`research.${unit.id}.question`, '') || undefined,
    sections: unit.sections.map((s) => {
      const entry = MANIFEST.find((e) => e.id === s.id);
      return {
        ...s,
        title: entry ? t(entry.titleKey, s.title) : s.title,
      };
    }),
  }));
}

export function useToolkitUnits(): UnitMeta[] {
  const { t } = useTranslation('units');
  return _toolkitUnits.map((unit) => ({
    ...unit,
    title: t(`toolkit.${unit.id}.title`, unit.title),
    description: t(`toolkit.${unit.id}.description`, unit.description),
    sections: unit.sections.map((s) => {
      const entry = MANIFEST.find((e) => e.id === s.id);
      return {
        ...s,
        title: entry ? t(entry.titleKey, s.title) : s.title,
      };
    }),
  }));
}

export function useCurrentUnits(navMode: NavMode): UnitMeta[] {
  const researchUnits = useResearchUnits();
  const toolkitUnits = useToolkitUnits();
  return navMode === 'research' ? researchUnits : toolkitUnits;
}

export function useCurrentUnit(unitId: string, navMode: NavMode): UnitMeta | undefined {
  const units = useCurrentUnits(navMode);
  return units.find((u) => u.id === unitId);
}

export function useAnyUnit(unitId: string, navMode: NavMode): UnitMeta | undefined {
  const legacyUnits = useLocalizedUnits();
  const researchUnits = useResearchUnits();
  const toolkitUnits = useToolkitUnits();
  const primaryUnits = navMode === 'research' ? researchUnits : toolkitUnits;
  const secondaryUnits = navMode === 'research' ? toolkitUnits : researchUnits;

  return (
    primaryUnits.find((u) => u.id === unitId) ??
    secondaryUnits.find((u) => u.id === unitId) ??
    legacyUnits.find((u) => u.id === unitId)
  );
}

function getUnitsForMode(navMode: NavMode): UnitMeta[] {
  return navMode === 'research' ? _researchUnits : _toolkitUnits;
}

function getAlternateUnitsForMode(navMode: NavMode): UnitMeta[] {
  return navMode === 'research' ? _toolkitUnits : _researchUnits;
}

/**
 * Next section, unified across manifest and legacy unit arrays.
 * Tries the current nav-mode's units first, then falls back to legacy UNITS.
 */
export function getAdjacentSectionForMode(
  unitId: string,
  sectionId: string,
  navMode: NavMode,
): { unitId: string; sectionId: string } | null {
  const units = getUnitsForMode(navMode);
  if (units.some((u) => u.id === unitId)) {
    return getAdjacentInPath(units, unitId, sectionId);
  }

  const alternateUnits = getAlternateUnitsForMode(navMode);
  if (alternateUnits.some((u) => u.id === unitId)) {
    return getAdjacentInPath(alternateUnits, unitId, sectionId);
  }

  return getAdjacentSection(unitId, sectionId);
}

/**
 * Previous section, unified across manifest and legacy unit arrays.
 * Tries the current nav-mode's units first, then falls back to legacy UNITS.
 */
export function getPrevSectionForMode(
  unitId: string,
  sectionId: string,
  navMode: NavMode,
): { unitId: string; sectionId: string } | null {
  const units = getUnitsForMode(navMode);
  if (units.some((u) => u.id === unitId)) {
    return getPrevInPath(units, unitId, sectionId);
  }

  const alternateUnits = getAlternateUnitsForMode(navMode);
  if (alternateUnits.some((u) => u.id === unitId)) {
    return getPrevInPath(alternateUnits, unitId, sectionId);
  }

  return getPrevSection(unitId, sectionId);
}
