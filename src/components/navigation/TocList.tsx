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
    transition: { staggerChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

function getVisitedSections(): Set<string> {
  try {
    const raw = localStorage.getItem('navigator-visited-sections');
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch { /* localStorage unavailable */ }
  return new Set();
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
    'flex items-center gap-2 -ml-px border-l-2 border-transparent pl-4 py-1.5 text-sm text-slate-500 hover:text-blue-600 hover:border-blue-400 transition-colors';

  return (
    <div>
      {/* 研究路径 / 工具箱 切换 */}
      <div className="flex justify-center mb-4">
        <div className="relative flex w-64 bg-slate-100 rounded-lg p-0.5">
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-md bg-white shadow-sm
              ${isResearch ? 'left-0.5' : 'left-[calc(50%+1px)]'}`}
          />
          <button
            onClick={() => setNavMode(TAB_RESEARCH)}
            className={`relative flex-1 py-1.5 text-xs font-medium rounded-md transition-colors z-10
              ${isResearch ? 'text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {t('researchPath')}
          </button>
          <button
            onClick={() => setNavMode(TAB_TOOLKIT)}
            className={`relative flex-1 py-1.5 text-xs font-medium rounded-md transition-colors z-10
              ${!isResearch ? 'text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {t('toolkitPath')}
          </button>
        </div>
      </div>

      {/* 研究导航 / 任务索引入口 */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-10">
        <Link
          to="/navigator"
          onClick={onNavigate}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {t('navigatorLink')}
        </Link>
        <Link
          to="/lookup"
          onClick={onNavigate}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
          </svg>
          {t('taskLookupLink')}
        </Link>
      </div>

      {/* 目录列表 */}
      <motion.nav
        key={navMode}
        variants={container}
        initial="hidden"
        animate="show"
        aria-label={t('toc')}
      >
        {units.map((unit, i) => (
          <motion.section key={unit.id} variants={item} className="mb-7">
            <Link
              to={`/unit/${unit.id}`}
              onClick={onNavigate}
              className="group flex items-baseline gap-3"
            >
              <span className="w-7 shrink-0 text-right font-mono text-sm text-slate-300 group-hover:text-blue-400 transition-colors">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0">
                <span className="block text-base font-semibold font-serif text-slate-800 group-hover:text-blue-600 transition-colors">
                  {unit.title}
                </span>
                {unit.question && (
                  <span className="block text-xs text-slate-400 mt-0.5">
                    {unit.question}
                  </span>
                )}
              </span>
            </Link>
            <ul className="mt-2 ml-10 border-l border-slate-200">
              {unit.sections.map((section) => (
                <li key={section.id}>
                  <Link
                    to={`/unit/${unit.id}/${section.id}`}
                    onClick={onNavigate}
                    className={sectionLinkClass}
                  >
                    <span className="min-w-0 flex-1">{section.title}</span>
                    {visited.has(section.id) && (
                      <svg
                        className="w-3.5 h-3.5 shrink-0 text-emerald-400"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                        aria-label={t('continueReading')}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.section>
        ))}

        {/* 附录 */}
        <motion.section variants={item} className="pt-6 border-t border-slate-200">
          <div className="flex items-baseline gap-3">
            <span className="w-7 shrink-0" aria-hidden />
            <span className="block text-base font-semibold font-serif text-slate-800">
              {t('appendix')}
            </span>
          </div>
          <ul className="mt-2 ml-10 border-l border-slate-200">
            {appendixSections.map((section) => (
              <li key={section.id}>
                <Link
                  to={`/appendix/${section.id}`}
                  onClick={onNavigate}
                  className={sectionLinkClass}
                >
                  <span className="min-w-0 flex-1">{section.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.section>
      </motion.nav>
    </div>
  );
}
