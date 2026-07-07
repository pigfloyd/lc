import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { NavMode } from '../types/content';

function getStoredNavMode(): NavMode {
  try {
    const stored = localStorage.getItem('navMode');
    if (stored === 'research' || stored === 'toolkit') return stored;
  } catch { /* localStorage unavailable */ }
  return 'research';
}

interface SidebarContextType {
  expandedUnits: Set<string>;
  sidebarOpen: boolean;
  desktopCollapsed: boolean;
  navMode: NavMode;
  /** 目录浮层是否打开 */
  tocOpen: boolean;
  toggleUnit: (unitId: string) => void;
  expandUnit: (unitId: string) => void;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  setDesktopCollapsed: (collapsed: boolean) => void;
  toggleDesktopCollapsed: () => void;
  setNavMode: (mode: NavMode) => void;
  openToc: () => void;
  closeToc: () => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [navMode, setNavModeState] = useState<NavMode>(getStoredNavMode);
  const [tocOpen, setTocOpen] = useState(false);

  const openToc = useCallback(() => setTocOpen(true), []);
  const closeToc = useCallback(() => setTocOpen(false), []);

  const toggleUnit = useCallback((unitId: string) => {
    setExpandedUnits((prev) => {
      const next = new Set(prev);
      if (next.has(unitId)) {
        next.delete(unitId);
      } else {
        next.add(unitId);
      }
      return next;
    });
  }, []);

  const expandUnit = useCallback((unitId: string) => {
    setExpandedUnits((prev) => {
      if (prev.has(unitId)) return prev;
      const next = new Set(prev);
      next.add(unitId);
      return next;
    });
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const toggleDesktopCollapsed = useCallback(() => {
    setDesktopCollapsed((prev) => !prev);
  }, []);

  const setNavMode = useCallback((mode: NavMode) => {
    setNavModeState(mode);
    try { localStorage.setItem('navMode', mode); } catch { /* ignore */ }
    setExpandedUnits(new Set());
  }, []);

  return (
    <SidebarContext.Provider
      value={{ expandedUnits, sidebarOpen, desktopCollapsed, navMode, tocOpen, toggleUnit, expandUnit, toggleSidebar, closeSidebar, setDesktopCollapsed, toggleDesktopCollapsed, setNavMode, openToc, closeToc }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarContext() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebarContext must be used within SidebarProvider');
  return ctx;
}
