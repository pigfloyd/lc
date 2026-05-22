import { Suspense, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getSectionComponent, getComponentByManifestId } from '../data/registry';
import { getSectionMeta, getUnitById, useCurrentUnit } from '../data/units';
import { getSectionById } from '../data/contentManifest';
import { useSidebarContext } from '../context/SidebarContext';
import Breadcrumb from '../components/navigation/Breadcrumb';
import SectionFooter from '../components/navigation/SectionFooter';
import NotFoundPage from './NotFoundPage';

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

function isLegacyUnitId(id: string): boolean {
  return /^unit-\d+$/.test(id);
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

  // ── Early returns after all hooks ────────────────────────────────
  if (!unitId || !sectionId) return <NotFoundPage />;

  // Try legacy lookup first, then manifest-based lookup
  let Component = getSectionComponent(unitId, sectionId);
  let section = getSectionMeta(unitId, sectionId);
  let unit = getUnitById(unitId);

  // If legacy lookup failed, try manifest-based lookup
  const isLegacy = isLegacyUnitId(unitId);
  if (!Component && !isLegacy) {
    Component = getComponentByManifestId(sectionId);
    if (!Component) {
      Component = getSectionComponent(unitId, sectionId);
    }
    const manifestEntry = getSectionById(sectionId);
    if (manifestEntry) {
      section = { id: manifestEntry.id, title: '', order: 0 };
    }
  }

  // Fill in unit/section from current nav mode if still missing
  if (currentUnit) {
    unit = currentUnit;
    if (!section) {
      section = currentUnit.sections.find((s) => s.id === sectionId);
    }
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
