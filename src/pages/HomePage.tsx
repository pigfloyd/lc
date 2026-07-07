import { useTranslation } from 'react-i18next';
import TocList from '../components/navigation/TocList';

export default function HomePage() {
  const { t } = useTranslation('common');

  return (
    <div className="max-w-xl mx-auto">
      {/* 标题 */}
      <header className="text-center mb-8 pt-2 lg:pt-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          {t('homeTitle')}
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
          {t('homeDescription')}
        </p>
      </header>

      <TocList />
    </div>
  );
}
