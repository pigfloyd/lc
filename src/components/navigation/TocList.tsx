import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useCurrentUnits, useLocalizedAppendix } from '../../data/units';
import { useSidebarContext } from '../../context/SidebarContext';

const TAB_RESEARCH = 'research' as const;
const TAB_TOOLKIT = 'toolkit' as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

function getVisitedSections(): Set<string> {
  try {
    const raw = localStorage.getItem('navigator-visited-sections');
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch { /* localStorage unavailable */ }
  return new Set();
}

function CheckIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 shrink-0 text-emerald-500"
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

/** 居中目录列表：路径切换 + 导航入口 + 单元/小节 + 附录。首页与目录浮层共用。 */
export default function TocList({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useTranslation('common');
  const { navMode, setNavMode } = useSidebarContext();
  const units = useCurrentUnits(navMode);
  const appendixSections = useLocalizedAppendix();
  const [visited] = useState(getVisitedSections);

  const isResearch = navMode === TAB_RESEARCH;

  const sectionLinkClass =
    'group/sec flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-slate-500 hover:text-blue-700 hover:bg-blue-50/70 transition-colors';

  return (
    <div>
      {/* 研究路径 / 工具箱 切换 */}
      <div className="flex justify-center mb-6">
        <div className="relative flex w-72 bg-slate-100 rounded-xl p-1">
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-white shadow-paper
              ${isResearch ? 'left-1' : 'left-[calc(50%+3px)]'}`}
          />
          <button
            onClick={() => setNavMode(TAB_RESEARCH)}
            className={`relative flex-1 py-2 text-sm font-medium rounded-lg transition-colors z-10
              ${isResearch ? 'text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {t('researchPath')}
          </button>
          <button
            onClick={() => setNavMode(TAB_TOOLKIT)}
            className={`relative flex-1 py-2 text-sm font-medium rounded-lg transition-colors z-10
              ${!isResearch ? 'text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {t('toolkitPath')}
          </button>
        </div>
      </div>

      {/* 研究导航 / 任务索引入口 —— 两张卡片 */}
      <div className="grid grid-cols-2 gap-3 mb-10">
        <Link
          to="/navigator"
          onClick={onNavigate}
          className="paper-card paper-lift group flex items-center gap-2.5 p-3"
        >
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-sm shrink-0">
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <span className="min-w-0 flex-1 text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
            {t('navigatorLink')}
          </span>
          <svg className="hidden sm:block w-4 h-4 text-slate-300 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        <Link
          to="/lookup"
          onClick={onNavigate}
          className="paper-card paper-lift group flex items-center gap-2.5 p-3"
        >
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm shrink-0">
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
            </svg>
          </span>
          <span className="min-w-0 flex-1 text-sm font-semibold text-slate-800 group-hover:text-orange-700 transition-colors">
            {t('taskLookupLink')}
          </span>
          <svg className="hidden sm:block w-4 h-4 text-slate-300 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* 目录列表 —— 纸感单元卡片 */}
      <motion.nav
        key={navMode}
        variants={container}
        initial="hidden"
        animate="show"
        aria-label={t('toc')}
        className="space-y-4"
      >
        {units.map((unit, i) => (
          <motion.section
            key={unit.id}
            variants={item}
            className="paper-card paper-lift p-5 sm:p-6"
          >
            <Link
              to={`/unit/${unit.id}`}
              onClick={onNavigate}
              className="group flex items-start gap-4"
            >
              <span className="grid place-items-center w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 text-white font-serif font-bold text-lg shadow-sm">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-semibold font-serif text-slate-800 group-hover:text-blue-700 transition-colors">
                  {unit.title}
                </span>
                {unit.question && (
                  <span className="block text-sm text-slate-400 mt-0.5">
                    {unit.question}
                  </span>
                )}
              </span>
              <span className="shrink-0 mt-1 text-xs font-medium text-slate-400">
                {t('sectionsCount', { count: unit.sections.length })}
              </span>
            </Link>
            <ul className="mt-4 grid sm:grid-cols-2 gap-x-4 gap-y-0.5 sm:pl-[3.75rem]">
              {unit.sections.map((section) => (
                <li key={section.id}>
                  <Link
                    to={`/unit/${unit.id}/${section.id}`}
                    onClick={onNavigate}
                    className={sectionLinkClass}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/sec:bg-blue-400 transition-colors shrink-0" />
                    <span className="min-w-0 flex-1 truncate">{section.title}</span>
                    {visited.has(section.id) && <CheckIcon />}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.section>
        ))}

        {/* 附录 */}
        <motion.section variants={item} className="paper-card p-5 sm:p-6">
          <div className="flex items-center gap-4">
            <span className="grid place-items-center w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-slate-300 to-slate-400 text-white font-serif font-bold text-lg shadow-sm">
              附
            </span>
            <span className="block text-lg font-semibold font-serif text-slate-800">
              {t('appendix')}
            </span>
          </div>
          <ul className="mt-4 grid sm:grid-cols-2 gap-x-4 gap-y-0.5 sm:pl-[3.75rem]">
            {appendixSections.map((section) => (
              <li key={section.id}>
                <Link
                  to={`/appendix/${section.id}`}
                  onClick={onNavigate}
                  className={sectionLinkClass}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/sec:bg-blue-400 transition-colors shrink-0" />
                  <span className="min-w-0 flex-1 truncate">{section.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.section>
      </motion.nav>
    </div>
  );
}
