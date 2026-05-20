import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSidebarContext } from '../../context/SidebarContext';
import { useLocalizedUnits, useLocalizedAppendix } from '../../data/units';
import LanguageSwitcher from '../shared/LanguageSwitcher';
import UnitNavItem from './UnitNavItem';
import SectionNavItem from './SectionNavItem';

export default function Sidebar() {
  const { t } = useTranslation('common');
  const { sidebarOpen, closeSidebar, expandUnit } = useSidebarContext();
  const units = useLocalizedUnits();
  const appendixSections = useLocalizedAppendix();

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

      {/* Unit navigation */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll py-3">
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
