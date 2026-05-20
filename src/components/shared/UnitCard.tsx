import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { UnitMeta } from '../../types/content';

interface UnitCardProps {
  unit: UnitMeta;
}

export default function UnitCard({ unit }: UnitCardProps) {
  const { t } = useTranslation('common');
  const orderLabel = unit.order === 0
    ? t('prepLabel')
    : t('unitLabel', { order: unit.order });

  return (
    <Link
      to={`/unit/${unit.id}`}
      className="block p-5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
    >
      <div className="text-xs font-medium text-blue-500 mb-1.5 tracking-wide">
        {orderLabel}
      </div>
      <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-700 transition-colors mb-1.5">
        {unit.title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-3">
        {unit.description}
      </p>
      <div className="text-xs text-slate-400">
        {t('sectionsCount', { count: unit.sections.length })}
      </div>
    </Link>
  );
}
