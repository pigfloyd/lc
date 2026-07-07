import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { t } = useTranslation('common');
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const label = isDark ? t('themeToLight') : t('themeToDark');

  return (
    <button
      onClick={toggleTheme}
      className="flex p-1.5 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
      aria-label={label}
      title={label}
    >
      {isDark ? (
        // 太阳：当前深色，点击切浅色
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1.5m6.364 1.136l-1.06 1.06M21 12h-1.5m-1.136 6.364l-1.06-1.06M12 19.5V21m-5.303-3.697l-1.06 1.06M4.5 12H3m3.697-5.303l-1.06-1.06M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z"
          />
        </svg>
      ) : (
        // 月亮：当前浅色，点击切深色
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75 9.75 9.75 0 018.25 6c0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25 9.75 9.75 0 0012.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      )}
    </button>
  );
}
