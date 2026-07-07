import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSidebarContext } from '../../context/SidebarContext';
import Sidebar from './Sidebar';
import SidebarToggle from './SidebarToggle';
import LanguageSwitcher from '../shared/LanguageSwitcher';
import ThemeToggle from '../shared/ThemeToggle';
import ReadingProgress from '../navigation/ReadingProgress';

export default function Layout() {
  const { t } = useTranslation('common');
  const { sidebarOpen, closeSidebar, desktopCollapsed, setDesktopCollapsed } = useSidebarContext();
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement | null>(null);
  const [scrollingDown, setScrollingDown] = useState(false);

  const isReadingPage =
    /^\/unit\/[^/]+\/[^/]+/.test(pathname) || /^\/appendix\//.test(pathname);

  useEffect(() => {
    setDesktopCollapsed(isReadingPage);
  }, [pathname, isReadingPage, setDesktopCollapsed]);

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

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <Sidebar />

      {/* Desktop floating expand button */}
      <button
        onClick={() => setDesktopCollapsed(false)}
        className={`hidden lg:flex fixed top-4 left-4 z-40 items-center justify-center w-9 h-9 rounded-lg
          bg-white border border-slate-200 shadow-sm text-slate-500
          hover:bg-slate-50 hover:text-slate-700 transition-all duration-300
          ${desktopCollapsed && !scrollingDown ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}
        aria-label="展开目录"
        title="展开目录"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header with toggle — slides away when scrolling down */}
        <div
          className={`flex items-center h-14 px-4 border-b border-slate-200 bg-white lg:hidden shrink-0
            transition-[margin,transform] duration-300 ease-in-out
            ${scrollingDown ? '-mt-14 -translate-y-full' : 'mt-0 translate-y-0'}`}
        >
          <SidebarToggle />
          <span className="ml-3 text-sm font-semibold text-slate-700 flex-1">
            {t('appName')}
          </span>
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
