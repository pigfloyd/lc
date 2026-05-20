import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSidebarContext } from '../../context/SidebarContext';
import Sidebar from './Sidebar';
import SidebarToggle from './SidebarToggle';
import LanguageSwitcher from '../shared/LanguageSwitcher';

export default function Layout() {
  const { t } = useTranslation('common');
  const { sidebarOpen, closeSidebar } = useSidebarContext();

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header with toggle */}
        <div className="flex items-center h-14 px-4 border-b border-slate-200 bg-white lg:hidden shrink-0">
          <SidebarToggle />
          <span className="ml-3 text-sm font-semibold text-slate-700 flex-1">
            {t('appName')}
          </span>
          <LanguageSwitcher />
        </div>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-8 lg:px-12 lg:py-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
