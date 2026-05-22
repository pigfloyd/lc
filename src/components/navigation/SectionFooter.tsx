import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPrevSection, getAdjacentSection, getPrevSectionForMode, getAdjacentSectionForMode, useLocalizedUnits, useCurrentUnits } from '../../data/units';
import { useSidebarContext } from '../../context/SidebarContext';

interface SectionFooterProps {
  unitId: string;
  sectionId: string;
}

export default function SectionFooter({ unitId, sectionId }: SectionFooterProps) {
  const { t } = useTranslation('common');
  const { navMode } = useSidebarContext();
  const legacyUnits = useLocalizedUnits();
  const currentUnits = useCurrentUnits(navMode);

  // Use mode-aware navigation if not a legacy path
  const isLegacy = /^unit-\d+$/.test(unitId);
  const prev = isLegacy ? getPrevSection(unitId, sectionId) : getPrevSectionForMode(unitId, sectionId, navMode);
  const next = isLegacy ? getAdjacentSection(unitId, sectionId) : getAdjacentSectionForMode(unitId, sectionId, navMode);

  // Look up titles in the correct unit list
  const units = isLegacy ? legacyUnits : currentUnits;

  const prevTitle = prev
    ? units.find((u) => u.id === prev.unitId)?.sections.find((s) => s.id === prev.sectionId)?.title
    : null;
  const prevUnitTitle = prev
    ? units.find((u) => u.id === prev.unitId)?.title
    : null;

  const nextTitle = next
    ? units.find((u) => u.id === next.unitId)?.sections.find((s) => s.id === next.sectionId)?.title
    : null;
  const nextUnitTitle = next
    ? units.find((u) => u.id === next.unitId)?.title
    : null;

  return (
    <footer className="mt-16 pt-8 border-t border-slate-200">
      <div className="flex justify-between gap-4">
        {prev && prevTitle ? (
          <Link
            to={`/unit/${prev.unitId}/${prev.sectionId}`}
            className="group flex-1 p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all"
          >
            <div className="text-xs text-slate-400 mb-1">{t('prevSection')}</div>
            <div className="text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors">
              {prevTitle}
            </div>
            {prevUnitTitle && (
              <div className="text-xs text-slate-400 mt-0.5">{prevUnitTitle}</div>
            )}
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {next && nextTitle ? (
          <Link
            to={`/unit/${next.unitId}/${next.sectionId}`}
            className="group flex-1 p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-right"
          >
            <div className="text-xs text-slate-400 mb-1">{t('nextSection')}</div>
            <div className="text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors">
              {nextTitle}
            </div>
            {nextUnitTitle && (
              <div className="text-xs text-slate-400 mt-0.5">{nextUnitTitle}</div>
            )}
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </footer>
  );
}
