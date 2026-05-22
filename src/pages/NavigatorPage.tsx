import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { getNavigatorModules, type NavigatorModule } from '../data/navigatorData';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const COLOR_MAP: Record<string, { text: string; bg: string; border: string; hoverBorder: string; ring: string }> = {
  emerald:  { text: 'text-emerald-500',  bg: 'bg-emerald-50',  border: 'border-emerald-200',  hoverBorder: 'hover:border-emerald-300',  ring: 'ring-emerald-400' },
  purple:   { text: 'text-purple-500',   bg: 'bg-purple-50',   border: 'border-purple-200',   hoverBorder: 'hover:border-purple-300',   ring: 'ring-purple-400' },
  orange:   { text: 'text-orange-500',   bg: 'bg-orange-50',   border: 'border-orange-200',   hoverBorder: 'hover:border-orange-300',   ring: 'ring-orange-400' },
  sky:      { text: 'text-sky-500',      bg: 'bg-sky-50',      border: 'border-sky-200',      hoverBorder: 'hover:border-sky-300',      ring: 'ring-sky-400' },
  rose:     { text: 'text-rose-500',     bg: 'bg-rose-50',     border: 'border-rose-200',     hoverBorder: 'hover:border-rose-300',     ring: 'ring-rose-400' },
  amber:    { text: 'text-amber-500',    bg: 'bg-amber-50',    border: 'border-amber-200',    hoverBorder: 'hover:border-amber-300',    ring: 'ring-amber-400' },
  teal:     { text: 'text-teal-500',     bg: 'bg-teal-50',     border: 'border-teal-200',     hoverBorder: 'hover:border-teal-300',     ring: 'ring-teal-400' },
  indigo:   { text: 'text-indigo-500',   bg: 'bg-indigo-50',   border: 'border-indigo-200',   hoverBorder: 'hover:border-indigo-300',   ring: 'ring-indigo-400' },
};

function NavigatorCard({ module: mod }: { module: NavigatorModule }) {
  const { t } = useTranslation('units');
  const { t: tc } = useTranslation('common');
  const [expanded, setExpanded] = useState(false);
  const colors = COLOR_MAP[mod.badgeColor] ?? COLOR_MAP.emerald;

  const diagnosticQuestion = t(`scenario.${mod.moduleId}`, '');

  return (
    <motion.div
      variants={item}
      className={`rounded-xl bg-white border border-slate-200 ${colors.hoverBorder} hover:shadow-md transition-all`}
    >
      <div className="p-5">
        <span className={`text-xs font-medium ${colors.text} tracking-wide`}>
          {mod.badgeLabel}
        </span>
        <h2 className="text-lg font-semibold text-slate-800 mt-1.5 mb-1">
          {mod.title}
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed mb-2">
          {mod.subtitle}
        </p>
        {diagnosticQuestion && (
          <p className="text-sm font-medium text-blue-600 mb-3">
            {diagnosticQuestion}
          </p>
        )}

        <div className="space-y-2 mb-3">
          {mod.scenarios.map((s) => (
            <div key={s.label} className="border border-slate-200 rounded-lg p-3 bg-slate-50">
              <div className="text-xs font-semibold text-blue-600 mb-1">{s.label}</div>
              <p className="text-xs text-slate-600 leading-relaxed mb-2">{s.text}</p>
              <Link
                to={`/unit/${mod.moduleId}/${s.sectionId}`}
                className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
              >
                {tc('navigatorGoToSection')}
              </Link>
            </div>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {expanded ? '收起' : tc('navigatorViewDetails')}
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className={`px-5 pb-5 border-t border-slate-100 pt-4`}>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">
                {tc('navigatorSkills')}
              </h3>
              <ul className="space-y-1 mb-4">
                {mod.skills.map((s, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                    <span className={`${colors.text} mt-0.5 shrink-0`}>•</span>
                    {s}
                  </li>
                ))}
              </ul>

              <h3 className="text-sm font-semibold text-slate-700 mb-2">
                {tc('navigatorPrerequisites')}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">{mod.prerequisites}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function NavigatorPage() {
  const { t } = useTranslation('common');
  const modules = getNavigatorModules();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          {t('navigatorTitle')}
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
          {t('navigatorDescription')}
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 grid-cols-1"
      >
        {modules.map((mod) => (
          <NavigatorCard key={mod.moduleId} module={mod} />
        ))}
      </motion.div>
    </div>
  );
}
