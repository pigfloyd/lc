import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { TASK_GROUPS } from '../data/taskIndex';
import { getSectionById } from '../data/contentManifest';
import { useLocalizedAppendix } from '../data/units';

interface ResolvedSection {
  id: string;
  unitId: string;
  title: string;
  category: string;
}

interface ResolvedAppendix {
  id: string;
  title: string;
}

interface ResolvedTask {
  id: string;
  label: string;
  sections: ResolvedSection[];
  appendixes: ResolvedAppendix[];
}

interface ResolvedGroup {
  id: string;
  icon: string;
  title: string;
  tasks: ResolvedTask[];
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function TaskLookupPage() {
  const { t } = useTranslation('common');
  const { t: tu } = useTranslation('units');
  const appendixSections = useLocalizedAppendix();
  const [query, setQuery] = useState('');

  const groups: ResolvedGroup[] = useMemo(() => {
    const appendixTitles = new Map(appendixSections.map((a) => [a.id, a.title]));
    return TASK_GROUPS.map((group) => ({
      id: group.id,
      icon: group.icon,
      title: group.title,
      tasks: group.tasks.map((task) => ({
        id: task.id,
        label: task.label,
        sections: task.sectionIds
          .map((id): ResolvedSection | null => {
            const entry = getSectionById(id);
            if (!entry) return null;
            return {
              id,
              unitId: entry.toolkitCategory,
              title: tu(entry.titleKey),
              category: tu(`toolkit.${entry.toolkitCategory}.title`),
            };
          })
          .filter((s): s is ResolvedSection => s !== null),
        appendixes: (task.appendixIds ?? []).map((id) => ({
          id,
          title: appendixTitles.get(id) ?? id,
        })),
      })),
    }));
  }, [tu, appendixSections]);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? groups
        .map((g) => ({
          ...g,
          tasks: g.tasks.filter(
            (task) =>
              task.label.toLowerCase().includes(q) ||
              task.sections.some(
                (s) => s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q),
              ) ||
              task.appendixes.some((a) => a.title.toLowerCase().includes(q)),
          ),
        }))
        .filter((g) => g.tasks.length > 0)
    : groups;

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">{t('taskLookupTitle')}</h1>
        <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
          {t('taskLookupDescription')}
        </p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('taskLookupSearchPlaceholder')}
            className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 bg-white
              placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      {/* Navigator hint */}
      <Link
        to="/navigator"
        className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 mb-8 transition-colors"
      >
        {t('taskLookupNavigatorHint')}
      </Link>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-3xl mb-3">🔍</div>
          <p className="text-slate-500">{t('taskLookupNoResults')}</p>
        </div>
      ) : (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
          {filtered.map((group) => (
            <motion.section key={group.id} variants={item}>
              <h2 className="flex items-center gap-2 text-base font-semibold text-slate-800 mb-3">
                <span>{group.icon}</span>
                <span>{group.title}</span>
                <span className="text-xs font-normal text-slate-400">
                  {t('taskLookupTasksCount', { count: group.tasks.length })}
                </span>
              </h2>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl bg-white overflow-hidden">
                {group.tasks.map((task) => (
                  <div key={task.id} className="px-4 py-3.5">
                    <div className="text-sm font-medium text-slate-700 mb-2">{task.label}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {task.sections.map((s) => (
                        <Link
                          key={s.id}
                          to={`/unit/${s.unitId}/${s.id}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg
                            bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 transition-colors"
                        >
                          <span>{s.title}</span>
                          <span className="text-blue-400">· {s.category}</span>
                        </Link>
                      ))}
                      {task.appendixes.map((a) => (
                        <Link
                          key={a.id}
                          to={`/appendix/${a.id}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg
                            bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 transition-colors"
                        >
                          <span>{a.title}</span>
                          <span className="text-emerald-400">· {t('taskLookupAppendixTag')}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </motion.div>
      )}
    </div>
  );
}
