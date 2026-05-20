import { Suspense, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getAppendixComponent } from '../data/registry';
import { useLocalizedAppendix } from '../data/units';
import Breadcrumb from '../components/navigation/Breadcrumb';
import NotFoundPage from './NotFoundPage';

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4 pt-4">
      <div className="h-8 bg-slate-200 rounded w-2/3" />
      <div className="h-4 bg-slate-100 rounded w-full" />
      <div className="h-4 bg-slate-100 rounded w-5/6" />
    </div>
  );
}

export default function AppendixPage() {
  const { appendixId } = useParams<{ appendixId: string }>();
  const location = useLocation();
  const appendixSections = useLocalizedAppendix();

  if (!appendixId) return <NotFoundPage />;

  const Component = getAppendixComponent(appendixId);
  const section = appendixSections.find((s) => s.id === appendixId);

  if (!Component || !section) return <NotFoundPage />;

  // Scroll to top on navigation
  useEffect(() => {
    const main = document.querySelector('main');
    if (main) main.scrollTop = 0;
  }, [location.pathname]);

  return (
    <div>
      <Breadcrumb unitId="" appendix />

      <h1 className="text-2xl font-bold text-slate-900 mb-6">{section.title}</h1>

      <Suspense fallback={<LoadingSkeleton />}>
        <Component />
      </Suspense>
    </div>
  );
}
