import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebarContext } from '../../context/SidebarContext';
import TocList from './TocList';

/** 全屏目录：点 ✕ 或 Esc 关闭，点任意链接跳转并关闭。 */
export default function TocOverlay() {
  const { t } = useTranslation('common');
  const { tocOpen, closeToc } = useSidebarContext();

  // Esc 关闭
  useEffect(() => {
    if (!tocOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeToc();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [tocOpen, closeToc]);

  return (
    <AnimatePresence>
      {tocOpen && (
        <motion.div
          key="toc-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-slate-50"
          role="dialog"
          aria-modal="true"
          aria-label={t('toc')}
        >
          {/* 可滚动的目录内容 */}
          <div className="absolute inset-0 overflow-y-auto overscroll-contain">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="max-w-xl mx-auto px-6 py-12 lg:py-16"
            >
              <h2 className="text-2xl font-bold text-slate-800 text-center mb-10">
                {t('toc')}
              </h2>
              <TocList onNavigate={closeToc} />
            </motion.div>
          </div>

          {/* 关闭按钮（不随内容滚动） */}
          <button
            onClick={closeToc}
            className="absolute top-4 right-4 flex items-center justify-center w-9 h-9 rounded-lg
              bg-white border border-slate-200 shadow-sm text-slate-500
              hover:bg-slate-100 hover:text-slate-700 transition-colors"
            aria-label={t('closeToc')}
            title={t('closeToc')}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
