import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useSidebarContext } from '../../context/SidebarContext';
import { useLocalizedAppendix, useResearchUnits, useToolkitUnits } from '../../data/units';
import LanguageSwitcher from '../shared/LanguageSwitcher';
import UnitNavItem from './UnitNavItem';
import SectionNavItem from './SectionNavItem';

const TAB_RESEARCH = 'research' as const;
const TAB_TOOLKIT = 'toolkit' as const;

export default function Sidebar() {
  const { t } = useTranslation('common');
  const { sidebarOpen, closeSidebar, expandUnit, navMode, setNavMode } = useSidebarContext();
  const researchUnits = useResearchUnits();
  const toolkitUnits = useToolkitUnits();
  const appendixSections = useLocalizedAppendix();

  const units = navMode === 'research' ? researchUnits : toolkitUnits;
  const isResearch = navMode === TAB_RESEARCH;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      {/* Logo area */}
      <div className="shrink-0 px-5 py-4 border-b border-slate-100">
        <NavLink to="/" onClick={closeSidebar} className="block">
          <h1 className="text-base font-bold text-slate-800 leading-tight">
            {t('appName')}
          </h1>
          <p className="text-xs text-slate-400 mt-1">{t('appSubtitle')}</p>
        </NavLink>
        <LanguageSwitcher />
      </div>

      {/* Nav mode toggle */}
      <div className="shrink-0 px-3 py-2 border-b border-slate-100">
        <div className="relative flex bg-slate-100 rounded-lg p-0.5">
          {/* Sliding indicator */}
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

      {/* Unit navigation */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll py-3">
        {/* Navigator link — always visible, prominently styled */}
        <div className="px-3 mb-3 space-y-1.5">
          <NavLink
            to="/navigator"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium rounded-lg transition-all
              ${isActive
                ? 'bg-blue-500 text-white shadow-sm'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`
            }
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {t('navigatorLink')}
          </NavLink>
          <NavLink
            to="/lookup"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium rounded-lg transition-all
              ${isActive
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`
            }
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
            </svg>
            {t('taskLookupLink')}
          </NavLink>
        </div>

        {units.map((unit) => (
          <UnitNavItem
            key={unit.id}
            unit={unit}
            onNavigate={() => {
              expandUnit(unit.id);
              closeSidebar();
            }}
          />
        ))}

        {/* Appendix divider */}
        <div className="mx-5 my-4 border-t border-slate-100" />

        <div className="px-5 pb-2">
          <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
            {t('appendix')}
          </span>
        </div>

        {appendixSections.map((section) => (
          <SectionNavItem
            key={section.id}
            to={`/appendix/${section.id}`}
            label={section.title}
            indent
            onClick={closeSidebar}
          />
        ))}
      </nav>
    </aside>
  );
}
