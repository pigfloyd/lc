import { useLocation } from 'react-router-dom';
import { useSidebarContext } from '../../context/SidebarContext';
import type { UnitMeta } from '../../types/content';
import SectionNavItem from './SectionNavItem';

interface UnitNavItemProps {
  unit: UnitMeta;
  onNavigate: () => void;
}

export default function UnitNavItem({ unit, onNavigate }: UnitNavItemProps) {
  const { expandedUnits, toggleUnit } = useSidebarContext();
  const location = useLocation();
  const isExpanded = expandedUnits.has(unit.id);
  const isActive = location.pathname.startsWith(`/unit/${unit.id}`);

  return (
    <div>
      <button
        onClick={() => toggleUnit(unit.id)}
        className={`w-full flex items-start gap-2 px-5 py-2 text-left transition-colors
          ${isActive ? 'text-blue-700' : 'text-slate-700 hover:text-slate-900'}`}
      >
        <svg
          className={`w-3 h-3 shrink-0 mt-1 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="min-w-0">
          <span className="block text-sm font-medium truncate">
            {unit.title}
          </span>
          {unit.question && (
            <span className={`block text-xs truncate ${isActive ? 'text-blue-400' : 'text-slate-400'}`}>
              {unit.question}
            </span>
          )}
        </span>
      </button>

      {isExpanded && (
        <div className="ml-2">
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
