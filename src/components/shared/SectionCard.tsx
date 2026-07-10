import { Link } from 'react-router-dom';
import type { SectionMeta } from '../../types/content';

interface SectionCardProps {
  unitId: string;
  section: SectionMeta;
}

export default function SectionCard({ unitId, section }: SectionCardProps) {
  return (
    <Link
      to={`/unit/${unitId}/${section.id}`}
      className="flex items-center gap-3.5 px-4 py-3.5 hover:bg-blue-50/60 transition-colors group"
    >
      <span className="grid place-items-center w-7 h-7 shrink-0 rounded-lg bg-slate-100 text-slate-400 text-xs font-semibold tabular-nums group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
        {section.order}
      </span>
      <span className="flex-1 text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors">
        {section.title}
      </span>
      <svg
        className="w-4 h-4 shrink-0 text-slate-300 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-blue-400 transition-all"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
