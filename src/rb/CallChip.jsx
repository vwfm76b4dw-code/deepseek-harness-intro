import * as React from 'react';
import { useState, useEffect, useRef, useLayoutEffect, useMemo, useCallback, useId, forwardRef, useImperativeHandle } from 'react';
import './CallChip.css';

// 源码依赖 @hugeicons/react + @hugeicons/core-free-icons；此处用同风格线性 SVG 近似替代（[tag, attrs] 数组 + 渲染 shim）
const CC_ICONS = {
  terminal: [['path', { d: 'm4 17 6-6-6-6', key: 'a' }], ['path', { d: 'M12 19h8', key: 'b' }]],
  file: [
    ['path', { d: 'M15 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', key: 'a' }],
    ['path', { d: 'M14 3v6h6', key: 'b' }]
  ],
  search: [['path', { d: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', key: 'a' }], ['path', { d: 'm21 21-4.3-4.3', key: 'b' }]],
  edit: [['path', { d: 'M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z', key: 'a' }]]
};
const CC_TICK_ICON = [['path', { d: 'M20 6 9 17l-5-5', key: 'a' }]];
const CC_REFRESH_ICON = [
  ['path', { d: 'M3 12a9 9 0 0 1 15-6.7L21 8', key: 'a' }],
  ['path', { d: 'M21 3v5h-5', key: 'b' }],
  ['path', { d: 'M21 12a9 9 0 0 1-15 6.7L3 16', key: 'c' }],
  ['path', { d: 'M3 21v-5h5', key: 'd' }]
];
const CcHugeIcon = ({ icon, size, strokeWidth }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {icon.map(([tag, attrs]) => React.createElement(tag, attrs))}
  </svg>
);

const CC_HOLD_AT = 0.9;
const CC_SHAKE = [0, -1, 1, -0.66, 0.66, -0.33, 0];
const CC_WORDS = { running: 'running', done: 'done', error: 'failed', idle: 'queued' };

const ccFmt = ms => (ms < 10000 ? `${Math.round(ms)} ms` : `${(ms / 1000).toFixed(1)} s`);
const ccReduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
const ccGlyphOf = s => (s === 'done' ? 'check' : s === 'error' ? 'retry' : 'tool');

function CallChip({
  icon = 'terminal',
  name = 'bash',
  argument = 'npm test',
  status = 'running',
  expectedMs = 2500,
  size = 34,
  radius = 10,
  color = 'currentColor',
  surfaceColor = '#27272a',
  progressColor = 'currentColor',
  progressOpacity = 0.08,
  doneColor = '#22c55e',
  errorColor = '#ef4444',
  washOpacity = 0.14,
  shake = 6,
  showTimer = true,
  onRetry,
  className = '',
  style
}) {
  const rootRef = useRef(null);
  const fillRef = useRef(null);
  const timerRef = useRef(null);
  const mountedRef = useRef(false);
  const fraction = useRef(0);
  const clock = useRef({ ms: 0 });
  const shakeAnim = useRef(null);
  const statusRef = useRef(status);
  statusRef.current = status;
  const [mounted, setMounted] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [announce, setAnnounce] = useState('');
  const roll = useRef({ cur: ccGlyphOf(status), prev: null });
  if (ccGlyphOf(status) !== roll.current.cur) roll.current = { cur: ccGlyphOf(status), prev: roll.current.cur };

  const setFraction = (f, instant) => {
    const fill = fillRef.current;
    if (!fill) return;
    fraction.current = f;
    if (instant) fill.style.transition = 'none';
    fill.style.transform = `scaleX(${f})`;
    if (instant) {
      void fill.getBoundingClientRect();
      fill.style.transition = '';
    }
  };
  const apply = (s, animate) => {
    if (s === 'running') {
      shakeAnim.current?.cancel();
      setFraction(0, true);
      if (animate) setFraction(CC_HOLD_AT, false);
    } else if (s === 'done') {
      setFraction(1, !animate);
    } else if (s === 'error') {
      const fill = fillRef.current;
      const live = fill ? new DOMMatrix(getComputedStyle(fill).transform).a : fraction.current;
      setFraction(Math.min(1, Math.max(0, live)), true);
      if (animate && shake > 0 && !ccReduceMotion() && rootRef.current) {
        shakeAnim.current = rootRef.current.animate(
          CC_SHAKE.map(k => ({ transform: `translateX(${k * shake}px)`, easing: 'cubic-bezier(0.77, 0, 0.175, 1)' })),
          { duration: 450, composite: 'add' }
        );
      }
    } else setFraction(0, true);
  };

  useEffect(() => {
    mountedRef.current = true;
    setMounted(true);
    apply(statusRef.current, statusRef.current === 'running');
    return () => {
      mountedRef.current = false;
      shakeAnim.current?.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useLayoutEffect(() => {
    if (mountedRef.current) apply(status, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    const write = ms => {
      clock.current.ms = ms;
      if (timerRef.current) timerRef.current.textContent = ccFmt(ms);
    };
    if (status !== 'running') {
      if ((status === 'idle' || !clock.current.ms) && timerRef.current) timerRef.current.textContent = '—';
      return undefined;
    }
    const startedAt = performance.now();
    write(0);
    if (ccReduceMotion()) {
      const id = setInterval(() => write(performance.now() - startedAt), 100);
      return () => {
        clearInterval(id);
        write(performance.now() - startedAt);
      };
    }
    let raf = 0;
    const tick = () => {
      write(performance.now() - startedAt);
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      write(performance.now() - startedAt);
    };
  }, [status]);
  useEffect(() => {
    const ms = showTimer && clock.current.ms ? Math.round(clock.current.ms) : 0;
    const when = status === 'done' && ms ? ` in ${ms} ms` : status === 'error' && ms ? ` after ${ms} ms` : '';
    setAnnounce(`${name} ${argument}, ${CC_WORDS[status] ?? status}${when}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const font = Math.max(11, Math.round(size * 0.38));
  const glyphState = g => (g === roll.current.cur ? 'in' : g === roll.current.prev ? 'out' : undefined);
  const toolIcon = typeof icon === 'string' ? (CC_ICONS[icon] ?? CC_ICONS.terminal) : null;
  const iconSize = font + 2;

  return (
    <span
      ref={rootRef}
      role="status"
      aria-busy={status === 'running' || undefined}
      data-status={status}
      data-mounted={mounted ? '' : undefined}
      data-pressed={pressed ? '' : undefined}
      className={`call-chip${className ? ` ${className}` : ''}`}
      style={{
        '--cc-size': `${size}px`,
        '--cc-font': `${font}px`,
        '--cc-pad': `${Math.round(size * 0.35)}px`,
        '--cc-gap': `${Math.round(font * 0.55)}px`,
        '--cc-radius': `${radius}px`,
        '--cc-color': color,
        '--cc-surface': surfaceColor,
        '--cc-progress': progressColor,
        '--cc-progress-pct': `${progressOpacity * 100}%`,
        '--cc-done': doneColor,
        '--cc-error': errorColor,
        '--cc-wash-pct': `${washOpacity * 100}%`,
        '--cc-expected': `${expectedMs}ms`,
        ...style
      }}
    >
      <span ref={fillRef} className="call-chip__fill" aria-hidden="true" />
      <span className="call-chip__slot" aria-hidden="true">
        <span className="call-chip__glyph" data-state={glyphState('tool')}>
          {toolIcon ? <CcHugeIcon icon={toolIcon} size={iconSize} strokeWidth={1.8} /> : icon}
        </span>
        <span className="call-chip__glyph" data-state={glyphState('check')}>
          <CcHugeIcon icon={CC_TICK_ICON} size={iconSize} strokeWidth={2.2} />
        </span>
        <span className="call-chip__glyph" data-state={glyphState('retry')}>
          <CcHugeIcon icon={CC_REFRESH_ICON} size={iconSize} strokeWidth={2} />
        </span>
      </span>
      <span className="call-chip__name" aria-hidden="true">
        {name}
      </span>
      <span className="call-chip__arg" aria-hidden="true">
        {argument}
      </span>
      {showTimer ? (
        <span ref={timerRef} className="call-chip__timer" aria-hidden="true">
          0 ms
        </span>
      ) : null}
      {status === 'error' && onRetry ? (
        <button
          type="button"
          className="call-chip__retry"
          aria-label={`Retry ${name} ${argument}`}
          onClick={() => onRetry()}
          onPointerDown={() => setPressed(true)}
          onPointerUp={() => setPressed(false)}
          onPointerCancel={() => setPressed(false)}
        />
      ) : null}
      <span className="call-chip__sr">{announce}</span>
    </span>
  );
}

export default CallChip;
