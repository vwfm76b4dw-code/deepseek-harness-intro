/* 转场引擎：状态机 + chrome/pager（分镜渲染见 transitions.jsx） */
import { useCallback, useEffect, useRef, useState } from 'react';
import { GlideSelect } from './rb/index.js';
import { FX_LABELS, FX_BY_LABEL, TRANSITIONS, pickAuto, buildShots } from './transitions.jsx';

export { MontageCanvas } from './transitions.jsx';

export const REDUCED_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const pageFromHash = total => {
  const m = /^#p(\d+)$/.exec(window.location.hash || '');
  if (!m) return 0;
  return Math.max(0, Math.min(total - 1, Number(m[1]) - 1));
};

export function Chrome({ page, total, fxMode, onFxMode }) {
  const order = ['auto', ...Object.keys(TRANSITIONS)];
  const label = fxMode === 'auto' ? '自动轮播' : (TRANSITIONS[fxMode]?.label || fxMode);
  const next = () => {
    const i = order.indexOf(fxMode);
    onFxMode(order[(i + 1) % order.length]);
  };
  return (
    <div className="chrome">
      <span className="nav-logo"><span className="dot">🐋</span> DeepSeek Harness</span>
      <span className="spacer" />
      <span className="fx-label">转场</span>
      <button type="button" className="fx-cycle" onClick={next} title="点击切换转场模式">
        {label} <span className="fx-next">›</span>
      </button>
      <span className="pg-count">{String(page + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </div>
  );
}

/* 转场状态机：时间戳锁 + 分镜推进 + 揭出阶段 */
export function usePageTransitions({ total, scripts }) {
  const [cur, setCur] = useState(() => pageFromHash(total));
  const [montage, setMontage] = useState(null);
  const [fxMode, setFxMode] = useState('auto');
  const curRef = useRef(cur);
  const busyUntilRef = useRef(0);
  const prevModeRef = useRef(null);
  const seqRef = useRef(0);
  const fxModeRef = useRef('auto');
  fxModeRef.current = fxMode;
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(t => window.clearTimeout(t));
    timers.current = [];
  };

  const go = useCallback(target => {
    const now = performance.now();
    const busy = now < busyUntilRef.current;
    if (busy) return;
    const n = Math.max(0, Math.min(total - 1, target));
    if (n === curRef.current) return;
    curRef.current = n;
    window.location.hash = 'p' + (n + 1);
    setCur(n);
    if (REDUCED_MOTION) {
      busyUntilRef.current = now + 200;
      return;
    }
    const mode = fxModeRef.current === 'auto' ? pickAuto(prevModeRef.current) : fxModeRef.current;
    prevModeRef.current = mode;
    const tr = TRANSITIONS[mode];
    const script = scripts[n] || ['HARNESS'];
    const dur = tr.dur;
    const closingDur = tr.closingDur;
    busyUntilRef.current = now + dur + closingDur + 120;
    if (tr.kind === 'canvas') {
      setMontage({ mode, word: script[1] || script[0], shots: null, idx: 0, closing: false, dir: 1 });
    } else {
      const dir = n >= (curRef.current - 1) ? 1 : -1;
      setMontage({ mode, word: script[1] || script[0], shots: buildShots(mode, script, dir), idx: 0, closing: false, dir });
    }
    timers.current.push(window.setTimeout(() => setMontage(m => (m ? { ...m, closing: true } : m)), dur));
    timers.current.push(window.setTimeout(() => {
      setMontage(null);
    }, dur + closingDur));
  }, [total, scripts]);

  /* 键盘 + hash */
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); go(curRef.current + 1); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(curRef.current - 1); }
      else if (e.key === 'Home') { e.preventDefault(); go(0); }
      else if (e.key === 'End') { e.preventDefault(); go(total - 1); }
    };
    window.addEventListener('keydown', onKey);
    const onHash = () => go(pageFromHash(total));
    window.addEventListener('hashchange', onHash);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('hashchange', onHash);
    };
  }, [go, total]);

  useEffect(() => () => clearTimers(), []);

  return { cur, go, montage, fxMode, setFxMode };
}
