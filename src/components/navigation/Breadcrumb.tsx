import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAnyUnit } from '../../data/units';
import { useSidebarContext } from '../../context/SidebarContext';

interface BreadcrumbProps {
  unitId: string;
  sectionId?: string;
  appendix?: boolean;
}

export default function Breadcrumb({ unitId, sectionId, appendix }: BreadcrumbProps) {
  const { t } = useTranslation('common');
  const { navMode } = useSidebarContext();
  const unit = useAnyUnit(unitId, navMode);

  if (appendix) {
    return (
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link to="/" className="hover:text-slate-600 transition-colors">
          {t('breadcrumbHome')}
        </Link>
        <span>/</span>
        <span className="text-slate-600">{t('appendix')}</span>
      </nav>
    );
  }

  if (!unit) return null;

  const section = sectionId
    ? unit.sections.find((s) => s.id === sectionId)
    : null;

  return (
    <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap">
      <Link to="/" className="hover:text-slate-600 transition-colors">
        {t('breadcrumbHome')}
      </Link>
      <span>/</span>
      {section ? (
        <span className="text-slate-600">{unit.title}</span>
      ) : (
        <span className="text-slate-600">{unit.title}</span>
      )}
      {section && (
        <>
          <span>/</span>
          <span className="text-slate-600">{section.title}</span>
        </>
      )}
    </nav>
  );
}
