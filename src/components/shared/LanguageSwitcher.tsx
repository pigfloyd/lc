import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const isZh = currentLang.startsWith('zh');

  return (
    <button
      onClick={() => i18n.changeLanguage(isZh ? 'ja' : 'zh')}
      className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors py-1.5"
      aria-label="Switch language"
    >
      <span className={isZh ? 'text-blue-600 font-semibold' : ''}>中</span>
      <span className="text-slate-300">/</span>
      <span className={!isZh ? 'text-blue-600 font-semibold' : ''}>日</span>
    </button>
  );
}
