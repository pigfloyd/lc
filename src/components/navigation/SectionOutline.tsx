import { useEffect, useState } from 'react';

interface OutlineHeading {
  id: string;
  text: string;
  level: number;
}

export default function SectionOutline({ containerId }: { containerId: string }) {
  const [headings, setHeadings] = useState<OutlineHeading[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    let timer: number | undefined;
    const scan = () => {
      const els = Array.from(container.querySelectorAll<HTMLElement>('h2, h3'));
      const found = els.map((el, i) => {
        if (!el.id) el.id = `outline-h-${i}`;
        return { id: el.id, text: el.textContent ?? '', level: el.tagName === 'H2' ? 2 : 3 };
      });
      setHeadings((prev) =>
        prev.length === found.length && prev.every((h, i) => h.id === found[i].id && h.text === found[i].text)
          ? prev
          : found,
      );
    };
    const debouncedScan = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(scan, 300);
    };

    scan();
    const mo = new MutationObserver(debouncedScan);
    mo.observe(container, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      window.clearTimeout(timer);
    };
  }, [containerId]);

  useEffect(() => {
    if (headings.length === 0) return;
    const main = document.querySelector('main');
    if (!main) return;

    const updateActive = () => {
      const threshold = 140;
      let current = 0;
      for (let i = 0; i < headings.length; i++) {
        const el = document.getElementById(headings[i].id);
        if (el && el.getBoundingClientRect().top <= threshold) current = i;
      }
      setActiveIndex(current);
    };

    updateActive();
    main.addEventListener('scroll', updateActive, { passive: true });
    return () => main.removeEventListener('scroll', updateActive);
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav
      className="group hidden xl:flex flex-col gap-1 fixed right-5 top-1/2 -translate-y-1/2 z-30 max-h-[70vh] overflow-y-auto"
      aria-label="本节目录"
    >
      {headings.map((h, i) => (
        <button
          key={h.id}
          onClick={() => document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className={`flex items-center justify-end gap-2 py-1 ${h.level === 3 ? 'pr-1' : ''}`}
          title={h.text}
        >
          <span
            className={`max-w-[14rem] truncate text-xs text-right opacity-0 translate-x-2 pointer-events-none
              transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto
              ${i === activeIndex ? 'text-blue-600 font-medium' : 'text-slate-400'}`}
          >
            {h.text}
          </span>
          <span
            className={`shrink-0 rounded-full transition-all duration-200
              ${i === activeIndex
                ? 'w-2 h-2 bg-blue-500'
                : h.level === 2
                  ? 'w-1.5 h-1.5 bg-slate-300 group-hover:bg-slate-400'
                  : 'w-1 h-1 bg-slate-200 group-hover:bg-slate-300'}`}
          />
        </button>
      ))}
    </nav>
  );
}
