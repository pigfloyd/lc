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
      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors group"
    >
      <span className="text-sm font-medium text-slate-400 w-8 text-right tabular-nums">
        {section.order}.
      </span>
      <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors">
        {section.title}
      </span>
    </Link>
  );
}
