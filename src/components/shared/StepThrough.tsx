import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
  title?: string;
  content: ReactNode;
}

interface StepThroughProps {
  steps: Step[];
  className?: string;
}

export default function StepThrough({ steps, className = '' }: StepThroughProps) {
  const [current, setCurrent] = useState(0);

  const goNext = () => setCurrent(i => Math.min(i + 1, steps.length - 1));
  const goPrev = () => setCurrent(i => Math.max(i - 1, 0));
  const isFirst = current === 0;
  const isLast = current === steps.length - 1;

  return (
    <div className={`my-6 rounded-2xl border-2 border-slate-200 bg-white overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 px-5 py-3 bg-slate-50 border-b border-slate-200">
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === current ? 'bg-blue-500 scale-125' : i < current ? 'bg-blue-300' : 'bg-slate-300'
              }`}
              aria-label={`Step ${i + 1}`}
            />
          ))}
        </div>
        {steps[current].title && (
          <span className="text-sm font-medium text-slate-600 ml-2">
            {steps[current].title}
          </span>
        )}
        <div className="ml-auto flex gap-2">
          <button
            onClick={goPrev}
            disabled={isFirst}
            className="px-3 py-1 text-sm rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            ← 上一步
          </button>
          <button
            onClick={goNext}
            disabled={isLast}
            className="px-3 py-1 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            下一步 →
          </button>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="p-6"
        >
          {steps[current].content}
        </motion.div>
      </AnimatePresence>
      <div className="px-5 py-2 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-400">
        {current + 1} / {steps.length}
      </div>
    </div>
  );
}