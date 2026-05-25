import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS, getRecommendedModules } from '../data/quizData';
import type { RecommendedModule } from '../data/quizData';

const CACHE_KEY = 'navigator-quiz-answers';

function loadCachedAnswers(): Map<string, string> | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return new Map(parsed);
  } catch {
    return null;
  }
}

function saveCachedAnswers(answers: Map<string, string>) {
  localStorage.setItem(CACHE_KEY, JSON.stringify([...answers]));
}

function clearCachedAnswers() {
  localStorage.removeItem(CACHE_KEY);
}

const slideIn = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

const COLORS: Record<string, string> = {
  foundation: 'border-emerald-300 bg-emerald-50',
  'module-1': 'border-purple-300 bg-purple-50',
  'module-2': 'border-orange-300 bg-orange-50',
  'module-3': 'border-sky-300 bg-sky-50',
  'module-4': 'border-rose-300 bg-rose-50',
  'module-5': 'border-amber-300 bg-amber-50',
  'module-6': 'border-teal-300 bg-teal-50',
  'module-7': 'border-indigo-300 bg-indigo-50',
};

const DOT_COLORS: Record<string, string> = {
  foundation: 'bg-emerald-500',
  'module-1': 'bg-purple-500',
  'module-2': 'bg-orange-500',
  'module-3': 'bg-sky-500',
  'module-4': 'bg-rose-500',
  'module-5': 'bg-amber-500',
  'module-6': 'bg-teal-500',
  'module-7': 'bg-indigo-500',
};

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-400">
          {current} / {total}
        </span>
        <span className="text-xs text-slate-400">{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

function QuizView({
  onComplete,
}: {
  onComplete: (answers: Map<string, string>) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string>>(new Map());
  const [direction, setDirection] = useState(1);

  const total = QUESTIONS.length;
  const question = QUESTIONS[currentIndex];
  const selectedId = answers.get(question.id);

  const selectOption = useCallback(
    (optionId: string) => {
      const next = new Map(answers);
      next.set(question.id, optionId);
      setAnswers(next);

      if (currentIndex < total - 1) {
        setDirection(1);
        setTimeout(() => setCurrentIndex(currentIndex + 1), 200);
      } else {
        setTimeout(() => onComplete(next), 300);
      }
    },
    [answers, currentIndex, total, onComplete, question.id],
  );

  const skip = useCallback(() => {
    if (currentIndex < total - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(answers);
    }
  }, [currentIndex, total, onComplete, answers]);

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  return (
    <div className="max-w-2xl mx-auto">
      <ProgressBar current={currentIndex + 1} total={total} />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={question.id}
          custom={direction}
          variants={slideIn}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.25 }}
        >
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            {question.question}
          </h2>

          <div className="space-y-3 mb-6">
            {question.options.map((opt) => {
              const isSelected = selectedId === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => selectOption(opt.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-400 bg-blue-50 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <span className="text-sm text-slate-700 leading-relaxed">
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={goBack}
              disabled={currentIndex === 0}
              className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← 上一题
            </button>
            <button
              onClick={skip}
              className="px-4 py-2 text-sm text-slate-400 hover:text-slate-600 transition-colors"
            >
              跳过此题 →
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ResultModuleCard({ mod }: { mod: RecommendedModule }) {
  const { t } = useTranslation('units');
  const { t: tc } = useTranslation('common');
  const colors = COLORS[mod.moduleId] ?? 'border-slate-200 bg-slate-50';
  const dotColor = DOT_COLORS[mod.moduleId] ?? 'bg-slate-400';

  return (
    <div className={`rounded-xl border-2 ${colors} p-5`}>
      <h3 className="text-base font-semibold text-slate-800 mb-1">
        {t(mod.moduleTitleKey)}
      </h3>
      {mod.reasons.length > 0 && (
        <p className="text-xs text-slate-500 mb-4">
          因为：{mod.reasons.join('；')}
        </p>
      )}

      <div className="space-y-2">
        {mod.sections.map((sec) => (
          <Link
            key={sec.sectionId}
            to={`/unit/${mod.moduleId}/${sec.sectionId}`}
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/70 hover:bg-white hover:shadow-sm transition-all group"
          >
            <span className={`w-2 h-2 rounded-full ${dotColor} shrink-0`} />
            <span className="text-sm text-slate-700 flex-1">
              {t(sec.titleKey)}
            </span>
            <span className="text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              {tc('navigatorGoToSection')} →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ResultsView({
  answers,
  onRetake,
}: {
  answers: Map<string, string>;
  onRetake: () => void;
}) {
  const modules = getRecommendedModules(answers);
  const totalSections = modules.reduce((sum, m) => sum + m.sections.length, 0);

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <span className="text-2xl">📋</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            你的学习路径
          </h2>
          <p className="text-sm text-slate-500">
            根据你的回答，我们整理了 {modules.length} 个模块共{' '}
            {totalSections} 个知识点，按推荐顺序排列。
          </p>
        </div>

        {modules.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 mb-4">
              根据你的回答，建议从最基础的内容开始。试试重新答题，选择更具体的研究场景。
            </p>
            <button
              onClick={onRetake}
              className="px-5 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
            >
              重新答题
            </button>
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {modules.map((mod) => (
              <ResultModuleCard key={mod.moduleId} mod={mod} />
            ))}
          </div>
        )}

        {modules.length > 0 && (
          <div className="text-center">
            <button
              onClick={onRetake}
              className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              重新答题
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function NavigatorPage() {
  const { t } = useTranslation('common');
  const cached = loadCachedAnswers();
  const [phase, setPhase] = useState<'quiz' | 'results'>(
    cached ? 'results' : 'quiz',
  );
  const [answers, setAnswers] = useState<Map<string, string>>(
    cached ?? new Map(),
  );

  const handleComplete = useCallback((a: Map<string, string>) => {
    saveCachedAnswers(a);
    setAnswers(a);
    setPhase('results');
  }, []);

  const handleRetake = useCallback(() => {
    clearCachedAnswers();
    setAnswers(new Map());
    setPhase('quiz');
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          {t('navigatorTitle')}
        </h1>
        {phase === 'quiz' && (
          <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
            {t('navigatorDescription')}
          </p>
        )}
      </div>

      {phase === 'quiz' ? (
        <QuizView onComplete={handleComplete} />
      ) : (
        <ResultsView answers={answers} onRetake={handleRetake} />
      )}
    </div>
  );
}
