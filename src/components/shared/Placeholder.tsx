import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface PlaceholderProps {
  title: string;
  unitTitle?: string;
}

export default function Placeholder({ title, unitTitle }: PlaceholderProps) {
  const { t } = useTranslation('common');

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="text-6xl mb-6">📝</div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">{title}</h1>
      {unitTitle && (
        <p className="text-slate-500 mb-4">
          {t('belongsToUnit')}{unitTitle}
        </p>
      )}
      <p className="text-slate-400 text-sm bg-slate-100 px-5 py-2 rounded-full">
        {t('comingSoon')}
      </p>
    </motion.div>
  );
}
