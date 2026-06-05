import { Suspense, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { resolveSectionComponent } from '../data/registry';
import { getSectionMeta, getUnitById, useCurrentUnit } from '../data/units';
import { getSectionById } from '../data/contentManifest';
import { useSidebarContext } from '../context/SidebarContext';
import Breadcrumb from '../components/navigation/Breadcrumb';
import SectionFooter from '../components/navigation/SectionFooter';
import NotFoundPage from './NotFoundPage';

const VISITED_KEY = 'navigator-visited-sections';

function markVisited(sectionId: string) {
  try {
    const raw = localStorage.getItem(VISITED_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(sectionId)) {
      list.push(sectionId);
      localStorage.setItem(VISITED_KEY, JSON.stringify(list));
    }
  } catch { /* localStorage unavailable */ }
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4 pt-4">
      <div className="h-8 bg-slate-200 rounded w-2/3" />
      <div className="h-4 bg-slate-100 rounded w-full" />
      <div className="h-4 bg-slate-100 rounded w-5/6" />
      <div className="h-4 bg-slate-100 rounded w-4/6" />
    </div>
  );
}

export default function SectionPage() {
  const { unitId, sectionId } = useParams<{ unitId: string; sectionId: string }>();
  const location = useLocation();
  const { expandUnit, navMode } = useSidebarContext();

  // ── All hooks must be called before any early return ──────────────
  const currentUnit = useCurrentUnit(unitId ?? '', navMode);

  // Auto-expand parent unit in sidebar
  useEffect(() => {
    if (unitId) expandUnit(unitId);
  }, [unitId, expandUnit]);

  // Scroll to top on navigation
  useEffect(() => {
    const main = document.querySelector('main');
    if (main) main.scrollTop = 0;
  }, [location.pathname]);

  // Record visited section for progress tracking
  useEffect(() => {
    if (sectionId) markVisited(sectionId);
  }, [sectionId]);

  // ── Early returns after all hooks ────────────────────────────────
  if (!unitId || !sectionId) return <NotFoundPage />;

  let Component = resolveSectionComponent(unitId, sectionId);
  let section = getSectionMeta(unitId, sectionId);

  // Manifest fallback: section may only exist in the manifest (not in legacy UNITS)
  if (!section) {
    const entry = getSectionById(sectionId);
    if (entry) section = { id: entry.id, title: '', order: 0 };
  }

  // Nav-mode-aware fallback for unit/section metadata
  let unit = currentUnit ?? getUnitById(unitId);
  if (currentUnit && !section) {
    section = currentUnit.sections.find((s) => s.id === sectionId);
  }

  if (!Component || !section || !unit) return <NotFoundPage />;

  return (
    <div>
      <Breadcrumb unitId={unitId} sectionId={sectionId} />

      <Suspense fallback={<LoadingSkeleton />}>
        <Component />
      </Suspense>

      <SectionFooter unitId={unitId} sectionId={sectionId} />
    </div>
  );
}
