import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-6xl mb-6">🔍</div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">
        {t('notFoundTitle')}
      </h1>
      <p className="text-slate-500 mb-6">
        {t('notFoundDescription')}
      </p>
      <Link
        to="/"
        className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        {t('backHome')}
      </Link>
    </div>
  );
}
