import { Suspense, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getSectionComponent } from '../data/registry';
import { getSectionMeta, getUnitById } from '../data/units';
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

export default function SectionPage() {
  const { unitId, sectionId } = useParams<{ unitId: string; sectionId: string }>();
  const location = useLocation();
  const { expandUnit } = useSidebarContext();

  if (!unitId || !sectionId) return <NotFoundPage />;

  const Component = getSectionComponent(unitId, sectionId);
  const section = getSectionMeta(unitId, sectionId);
  const unit = getUnitById(unitId);

  if (!Component || !section || !unit) return <NotFoundPage />;

  // Auto-expand parent unit in sidebar
  useEffect(() => {
    expandUnit(unitId);
  }, [unitId, expandUnit]);

  // Scroll to top on navigation
  useEffect(() => {
    const main = document.querySelector('main');
    if (main) main.scrollTop = 0;
  }, [location.pathname]);

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
