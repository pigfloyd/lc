import { useEffect, useRef, type ReactNode } from 'react';

export default function FadeInContent({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-block-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );

    const getTargets = () => {
      // If the section component renders a single root element, animate its children instead
      const root =
        wrapper.children.length === 1 && wrapper.firstElementChild
          ? wrapper.firstElementChild
          : wrapper;
      return Array.from(root.children);
    };

    const observed = new Set<Element>();
    const attach = () => {
      for (const el of getTargets()) {
        if (observed.has(el)) continue;
        observed.add(el);
        el.classList.add('fade-block');
        io.observe(el);
      }
    };

    attach();
    const mo = new MutationObserver(attach);
    mo.observe(wrapper, { childList: true, subtree: false });
    if (wrapper.firstElementChild) {
      mo.observe(wrapper.firstElementChild, { childList: true });
    }

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
