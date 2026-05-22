import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useLocalizedUnits, useLocalizedAppendix } from '../data/units';
import UnitCard from '../components/shared/UnitCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const { t } = useTranslation('common');
  const units = useLocalizedUnits();
  const appendixSections = useLocalizedAppendix();

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          {t('homeTitle')}
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
          {t('homeDescription')}
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {units.map((unit) => (
          <motion.div key={unit.id} variants={item}>
            <UnitCard unit={unit} />
          </motion.div>
        ))}

        {/* Navigator entry card */}
        <motion.div variants={item}>
          <Link
            to="/navigator"
            className="block p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 hover:border-blue-400 hover:shadow-md transition-all h-full"
          >
            <div className="text-xs font-medium text-blue-500 mb-1.5 tracking-wide">
              {t('researchPath')}
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-1.5">
              {t('navigatorHomeEntry')}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-3">
              {t('navigatorHomeDescription')}
            </p>
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
              {t('navigatorHomeCta')}
            </span>
          </Link>
        </motion.div>

        {/* Appendix card */}
        <motion.div variants={item}>
          <div className="p-5 rounded-xl bg-white border border-slate-200 h-full">
            <div className="text-xs font-medium text-emerald-500 mb-1.5 tracking-wide">
              {t('appendixLabel')}
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-1.5">
              {t('appendixTitle')}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-3">
              {t('appendixDescription')}
            </p>
            <div className="space-y-0.5">
              {appendixSections.map((s) => (
                <Link
                  key={s.id}
                  to={`/appendix/${s.id}`}
                  className="block text-sm text-slate-500 hover:text-emerald-600 transition-colors py-0.5"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
