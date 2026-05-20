import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface SidebarContextType {
  expandedUnits: Set<string>;
  sidebarOpen: boolean;
  toggleUnit: (unitId: string) => void;
  expandUnit: (unitId: string) => void;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  return (
    <SidebarContext.Provider
      value={{ expandedUnits, sidebarOpen, toggleUnit, expandUnit, toggleSidebar, closeSidebar }}
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
