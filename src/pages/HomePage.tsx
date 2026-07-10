import { useTranslation } from 'react-i18next';
import TocList from '../components/navigation/TocList';

export default function HomePage() {
  const { t } = useTranslation('common');

  return (
    <div className="max-w-3xl mx-auto">
      {/* Hero */}
      <header className="hero-wash text-center mb-12 pt-4 lg:pt-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 rounded-full bg-white/70 border border-slate-200/70 text-xs font-medium text-slate-500 shadow-paper backdrop-blur">
          <span className="text-orange-500">◆</span>
          {t('appSubtitle')}
        </span>
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15] mb-4">
          {t('homeTitle')}
        </h1>
        <p className="text-base text-slate-500 leading-relaxed max-w-lg mx-auto">
          {t('homeDescription')}
        </p>
      </header>

      <TocList />
    </div>
  );
}
