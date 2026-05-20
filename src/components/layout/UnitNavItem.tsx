import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSidebarContext } from '../../context/SidebarContext';
import type { UnitMeta } from '../../types/content';
import SectionNavItem from './SectionNavItem';

interface UnitNavItemProps {
  unit: UnitMeta;
  onNavigate: () => void;
}

export default function UnitNavItem({ unit, onNavigate }: UnitNavItemProps) {
  const { t } = useTranslation('common');
  const { expandedUnits, toggleUnit } = useSidebarContext();
  const location = useLocation();
  const isExpanded = expandedUnits.has(unit.id);
  const isActive = location.pathname.startsWith(`/unit/${unit.id}`);

  return (
    <div>
      <button
        onClick={() => toggleUnit(unit.id)}
        className={`w-full flex items-center gap-2 px-5 py-2 text-left transition-colors
          ${isActive ? 'text-blue-700' : 'text-slate-700 hover:text-slate-900'}`}
      >
        <svg
          className={`w-3 h-3 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-sm font-medium truncate">
          {unit.order === 0
            ? t('prepLabel')
            : t('unitLabel', { order: unit.order })}
        </span>
      </button>

      {isExpanded && (
        <div className="ml-2">
          <SectionNavItem
            to={`/unit/${unit.id}`}
            label={unit.title}
            bold
            onClick={onNavigate}
          />
          {unit.sections.map((section) => (
            <SectionNavItem
              key={section.id}
              to={`/unit/${unit.id}/${section.id}`}
              label={section.title}
              indent
              onClick={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
