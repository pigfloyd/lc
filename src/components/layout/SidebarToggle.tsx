import { useSidebarContext } from '../../context/SidebarContext';

export default function SidebarToggle() {
  const { toggleSidebar } = useSidebarContext();

  return (
    <button
      onClick={toggleSidebar}
      className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 transition-colors"
      aria-label="打开目录"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
}
