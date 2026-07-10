import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAnyUnit } from '../data/units';
import { useSidebarContext } from '../context/SidebarContext';
import Breadcrumb from '../components/navigation/Breadcrumb';
import SectionCard from '../components/shared/SectionCard';
import NotFoundPage from './NotFoundPage';

export default function UnitPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const { t } = useTranslation('common');
  const { navMode, expandUnit } = useSidebarContext();

  const unit = useAnyUnit(unitId ?? '', navMode);

  useEffect(() => {
    if (unitId) expandUnit(unitId);
  }, [unitId, expandUnit]);

  if (!unit) return <NotFoundPage />;

  return (
    <div>
      <Breadcrumb unitId={unit.id} />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium tracking-wide">
            {unit.order === 0 ? t('prepLabel') : t('unitLabel', { order: unit.order })}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">{unit.title}</h1>
        <p className="text-lg text-slate-500 leading-relaxed mb-8">{unit.description}</p>

        <div className="paper-card divide-y divide-slate-100/70 overflow-hidden">
          {unit.sections.map((section) => (
            <SectionCard key={section.id} unitId={unit.id} section={section} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
