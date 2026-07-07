import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSidebarContext } from '../../context/SidebarContext';
import LanguageSwitcher from '../shared/LanguageSwitcher';
import ThemeToggle from '../shared/ThemeToggle';
import ReadingProgress from '../navigation/ReadingProgress';
import TocOverlay from '../navigation/TocOverlay';

function TocIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export default function Layout() {
  const { t } = useTranslation('common');
  const { openToc, closeToc } = useSidebarContext();
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement | null>(null);
  const [scrollingDown, setScrollingDown] = useState(false);

  const isHome = pathname === '/';
  const isReadingPage =
    /^\/unit\/[^/]+\/[^/]+/.test(pathname) || /^\/appendix\//.test(pathname);

  // 路由变化时关闭目录浮层（覆盖浏览器前进/后退等场景）
  useEffect(() => {
    closeToc();
  }, [pathname, closeToc]);

  useEffect(() => {
    setScrollingDown(false);
    const el = mainRef.current;
    if (!el) return;
    let last = el.scrollTop;
    const onScroll = () => {
      const y = el.scrollTop;
      if (y < 80) {
        setScrollingDown(false);
      } else if (Math.abs(y - last) > 8) {
        setScrollingDown(y > last);
      }
      last = y;
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Reading progress bar */}
      {isReadingPage && <ReadingProgress target={mainRef} />}

      {/* TOC overlay (closable) */}
      <TocOverlay />

      {/* Desktop floating controls: theme / language / TOC */}
      <div
        className={`hidden lg:flex fixed top-4 right-4 z-40 items-center gap-1 h-9 px-1.5 rounded-lg
          bg-white border border-slate-200 shadow-sm transition-all duration-300
          ${scrollingDown ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}
      >
        <ThemeToggle />
        <LanguageSwitcher />
        {!isHome && (
          <button
            onClick={openToc}
            className="flex p-1.5 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label={t('openToc')}
            title={t('openToc')}
          >
            <TocIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header — slides away when scrolling down */}
        <div
          className={`flex items-center h-14 px-4 lg:hidden shrink-0
            transition-[margin,transform] duration-300 ease-in-out
            ${scrollingDown ? '-mt-14 -translate-y-full' : 'mt-0 translate-y-0'}
            ${isHome ? 'justify-end' : 'border-b border-slate-200 bg-white'}`}
        >
          {!isHome && (
            <span className="text-sm font-semibold text-slate-700 flex-1 truncate">
              {t('appName')}
            </span>
          )}
          <ThemeToggle />
          <LanguageSwitcher />
          {!isHome && (
            <button
              onClick={openToc}
              className="p-2 -mr-2 ml-1 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              aria-label={t('openToc')}
            >
              <TocIcon className="w-5 h-5" />
            </button>
          )}
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        {/* Scrollable content */}
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-8 lg:px-12 lg:py-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
