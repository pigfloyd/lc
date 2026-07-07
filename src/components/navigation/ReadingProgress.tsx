import { useEffect, useState, type RefObject } from 'react';

export default function ReadingProgress({ target }: { target: RefObject<HTMLElement | null> }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = target.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(el.scrollTop / max, 1) : 0);
    };
    update();

    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, [target]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
