import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
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
      {/* Immersive "continue reading" hero card */}
      {next && nextInfo && (
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="mb-6"
        >
          <Link
            to={`/unit/${next.unitId}/${next.sectionId}`}
            className="group block rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-blue-500 to-indigo-600
              text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30
              hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="text-xs font-medium text-blue-100/90 tracking-wide">
              {t('continueReading')} · {nextInfo.unitTitle}
            </div>
            <div className="mt-2 flex items-center justify-between gap-4">
              <div className="text-lg sm:text-xl font-bold leading-snug">
                {nextInfo.sectionTitle}
              </div>
              <svg
                className="w-6 h-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </Link>
        </motion.div>
      )}

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
