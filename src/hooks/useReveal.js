/* 滚动入场 + 当前分节高亮（prefers-reduced-motion 直接显示）
   含 MutationObserver 兜底：分节内容动态挂载（tab 切换/条件渲染）后
   新出现的 [data-reveal] 节点同样会被观察并补计入场。 */
import { useEffect, useState } from 'react';

const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useReveal() {
  useEffect(() => {
    if (REDUCED || !('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    );
    const seen = new WeakSet();
    const scan = root => {
      root.querySelectorAll('[data-reveal]').forEach(el => {
        if (seen.has(el) || el.classList.contains('is-in')) return;
        seen.add(el);
        io.observe(el);
      });
    };
    scan(document);
    const mo = new MutationObserver(muts => {
      muts.forEach(m => m.addedNodes.forEach(n => {
        if (n.nodeType !== 1) return;
        if (n.matches?.('[data-reveal]') && !seen.has(n)) { seen.add(n); io.observe(n); }
        scan(n);
      }));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
}

/* 当前可视分节 id（scroll 位置 + rAF 节流，比 IO ratio 稳定） */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (REDUCED) return;
    let raf = 0;
    const calc = () => {
      raf = 0;
      const line = 140; // 顶栏高度下的判定线
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) { cur = id; break; }
        if (r.top <= line) cur = id;
      }
      setActive(cur);
    };
    const onScroll = () => { if (!raf) raf = window.requestAnimationFrame(calc); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    calc();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [ids.join('|')]);
  return active;
}