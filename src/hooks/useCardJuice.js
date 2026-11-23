/* 卡片手感 juice：指针聚光（CSS 变量驱动 overlay 位移）+ data-tilt 3D 倾斜
   仅 transform/opacity；reduced-motion 下不绑定任何监听；
   MutationObserver 兜底动态挂载的卡片。 */
import { useEffect } from 'react';

const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useCardJuice() {
  useEffect(() => {
    if (REDUCED) return;
    /* 指针聚光：把归一化坐标写进 --mx/--my，overlay 用 transform 跟随 */
    const onMove = e => {
      const card = e.currentTarget;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    /* 3D 倾斜：data-tilt 元素跟随指针 ±6deg */
    const onTilt = e => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--tilt-x', `${(-py * 12).toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${(px * 12).toFixed(2)}deg`);
    };
    const onLeave = e => {
      const el = e.currentTarget;
      el.style.setProperty('--tilt-x', '0deg');
      el.style.setProperty('--tilt-y', '0deg');
    };

    const bound = new WeakSet();
    const bind = root => {
      root.querySelectorAll?.('.ld-card, .ld-card *').forEach(() => {});
      root.querySelectorAll?.('.ld-card').forEach(el => {
        if (bound.has(el)) return;
        bound.add(el);
        el.classList.add('has-juice');
        el.addEventListener('pointermove', onMove);
      });
      root.querySelectorAll?.('[data-tilt]').forEach(el => {
        if (bound.has(el)) return;
        bound.add(el);
        el.addEventListener('pointermove', onTilt);
        el.addEventListener('pointerleave', onLeave);
      });
    };
    bind(document);
    const mo = new MutationObserver(muts =>
      muts.forEach(m => m.addedNodes.forEach(n => n.nodeType === 1 && bind(n)))
    );
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);
}