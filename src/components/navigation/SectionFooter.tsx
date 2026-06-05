import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPrevSectionForMode, getAdjacentSectionForMode, useLocalizedUnits, useCurrentUnits } from '../../data/units';
import { useSidebarContext } from '../../context/SidebarContext';

interface SectionFooterProps {
  unitId: string;
  sectionId: string;
}

function findTitle(
  units: { id: string; title: string; sections: { id: string; title: string }[] }[],
  target: { unitId: string; sectionId: string } | null,
): { sectionTitle: string; unitTitle: string } | null {
  if (!target) return null;
  for (const u of units) {
    if (u.id !== target.unitId) continue;
    const s = u.sections.find((sec) => sec.id === target.sectionId);
    if (s) return { sectionTitle: s.title, unitTitle: u.title };
  }
  return null;
}

export default function SectionFooter({ unitId, sectionId }: SectionFooterProps) {
  const { t } = useTranslation('common');
  const { navMode } = useSidebarContext();
  const legacyUnits = useLocalizedUnits();
  const currentUnits = useCurrentUnits(navMode);

  const prev = getPrevSectionForMode(unitId, sectionId, navMode);
  const next = getAdjacentSectionForMode(unitId, sectionId, navMode);

  // Look up titles — the target may be in either current-mode or legacy units
  const allUnits = [...currentUnits, ...legacyUnits];
  const prevInfo = findTitle(allUnits, prev);
  const nextInfo = findTitle(allUnits, next);

  return (
    <footer className="mt-16 pt-8 border-t border-slate-200">
      <div className="flex justify-between gap-4">
        {prev && prevInfo ? (
          <Link
            to={`/unit/${prev.unitId}/${prev.sectionId}`}
            className="group flex-1 p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all"
          >
            <div className="text-xs text-slate-400 mb-1">{t('prevSection')}</div>
            <div className="text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors">
              {prevInfo.sectionTitle}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">{prevInfo.unitTitle}</div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {next && nextInfo ? (
          <Link
            to={`/unit/${next.unitId}/${next.sectionId}`}
            className="group flex-1 p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-right"
          >
            <div className="text-xs text-slate-400 mb-1">{t('nextSection')}</div>
            <div className="text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors">
              {nextInfo.sectionTitle}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">{nextInfo.unitTitle}</div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </footer>
  );
}
