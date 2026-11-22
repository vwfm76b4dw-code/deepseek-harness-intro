import { useState, useEffect, useRef, useLayoutEffect, useMemo, useCallback, useId, forwardRef, useImperativeHandle } from 'react';
import './Counter.css';

const CO_ROOT = 'counter';
const CO_SR = 'counter__sr';
const CO_ROW = 'counter__row';
const CO_AFFIX = 'counter__affix';
const CO_DIGIT = 'counter__digit';
const CO_SIZER = 'counter__sizer';
const CO_WINDOW = 'counter__window';
const CO_STRIP = 'counter__strip';
const CO_NUMERAL = 'counter__numeral';
const CO_SYMBOL = 'counter__symbol';
const CO_SYMBOL_TEXT = 'counter__symbol-text';
const CO_BLUR = 'counter__blur';
const CO_MEASURE = 'counter__measure';

const CO_TAU = Math.PI * 2;
const CO_NUMERIC = new Set(['integer', 'group', 'decimal', 'fraction']);
const CO_DIRECTIONS = ['auto', 'up', 'down', 'shortest'];
const CO_MASK =
  'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.0355) calc(var(--counter-fade, 0em) * 0.1667), rgba(0, 0, 0, 0.2099) calc(var(--counter-fade, 0em) * 0.3333), rgba(0, 0, 0, 0.5) calc(var(--counter-fade, 0em) * 0.5), rgba(0, 0, 0, 0.7901) calc(var(--counter-fade, 0em) * 0.6667), rgba(0, 0, 0, 0.9645) calc(var(--counter-fade, 0em) * 0.8333), #000 var(--counter-fade, 0em), #000 calc(100% - var(--counter-fade, 0em)), rgba(0, 0, 0, 0.9645) calc(100% - var(--counter-fade, 0em) * 0.8333), rgba(0, 0, 0, 0.7901) calc(100% - var(--counter-fade, 0em) * 0.6667), rgba(0, 0, 0, 0.5) calc(100% - var(--counter-fade, 0em) * 0.5), rgba(0, 0, 0, 0.2099) calc(100% - var(--counter-fade, 0em) * 0.3333), rgba(0, 0, 0, 0.0355) calc(100% - var(--counter-fade, 0em) * 0.1667), rgba(0, 0, 0, 0) 100%)';

const coUseIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const coClamp = (value, min, max) => Math.min(max, Math.max(min, value));

const coMod = (value, base) => ((value % base) + base) % base;

const coWrap = offset => coMod(offset + 5, 10) - 5;

const coPrefersReduced = () =>
  typeof window !== 'undefined' && (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);

const coStepBetween = (from, to, direction) => {
  const up = coMod(to - from, 10);
  if (direction === 'up') return up;
  if (direction === 'down') return up === 0 ? 0 : up - 10;
  return up > 5 ? up - 10 : up;
};

const coCreateFormatter = (locale, options) => {
  try {
    return new Intl.NumberFormat(locale, options);
  } catch {
    return new Intl.NumberFormat('en-US');
  }
};

const coDigitsFor = formatter => {
  const { locale, numberingSystem } = formatter.resolvedOptions();
  const plain = coCreateFormatter(locale, { numberingSystem, useGrouping: false });
  return Array.from({ length: 10 }, (_, digit) => plain.format(digit));
};

const coSlotsFor = (formatter, digits, value) => {
  const parts = formatter.formatToParts(value);
  let first = -1;
  let last = -1;
  let place = 0;
  parts.forEach((part, index) => {
    if (!CO_NUMERIC.has(part.type)) return;
    if (first < 0) first = index;
    last = index;
    if (part.type === 'integer') place += [...part.value].length;
  });
  let fraction = 0;
  const counts = {};
  const slots = [];
  parts.forEach((part, index) => {
    if (part.type === 'integer' || part.type === 'fraction') {
      [...part.value].forEach(char => {
        const digit = Math.max(0, digits.indexOf(char));
        if (part.type === 'integer') {
          place -= 1;
          slots.push({ key: `i${place}`, kind: 'digit', digit, text: '', rank: -2 * place });
        } else {
          slots.push({ key: `f${fraction}`, kind: 'digit', digit, text: '', rank: 1 + fraction });
          fraction += 1;
        }
      });
    } else if (part.type === 'group') {
      slots.push({ key: `g${place}`, kind: 'symbol', digit: 0, text: part.value, rank: 1 - 2 * place });
    } else if (part.type === 'decimal') {
      slots.push({ key: 'd', kind: 'symbol', digit: 0, text: part.value, rank: 0.5 });
    } else {
      const before = first < 0 || index < first;
      const name = `${before ? 'p' : 's'}-${part.type}`;
      counts[name] = (counts[name] || 0) + 1;
      slots.push({
        key: `${name}-${counts[name]}`,
        kind: 'symbol',
        digit: 0,
        text: part.value,
        rank: before ? -10000 - (first - index) : 10000 + (index - last)
      });
    }
  });
  return slots;
};

const coMakeItem = (slot, position, shown) => ({
  kind: slot.kind,
  rank: slot.rank,
  pos: position,
  vel: 0,
  target: position,
  shown,
  shownVel: 0,
  shownTarget: shown,
  wait: 0,
  exiting: false,
  natural: 0,
  el: null,
  numerals: null,
  strip: null,
  blur: null,
  filter: '',
  blurred: false
});

function Counter({
  value = 0,
  locale = 'en-US',
  format,
  decimals,
  minDigits = 1,
  prefix,
  suffix,
  direction = 'auto',
  duration = 0.7,
  bounce = 0.2,
  stagger = 0.04,
  motionBlur = true,
  intro = true,
  fade = 0.3,
  fontSize = 100,
  fontWeight = 'inherit',
  textColor = 'inherit',
  gap = 0,
  padding = 0,
  tabular = true,
  digitStyle,
  className = '',
  style
}) {
  const rootRef = useRef(null);
  const rowRef = useRef(null);
  const measureRef = useRef(null);
  const blurId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const amount = typeof value === 'number' ? (Object.is(value, -0) ? 0 : value) : Number(value);
  const formatKey = JSON.stringify(format ?? {});

  const formatter = useMemo(() => {
    const options = { ...JSON.parse(formatKey) };
    if (decimals !== undefined) {
      const fixed = coClamp(Math.round(decimals), 0, 20);
      options.minimumFractionDigits = fixed;
      options.maximumFractionDigits = fixed;
    }
    if (minDigits > 1) options.minimumIntegerDigits = coClamp(Math.round(minDigits), 1, 21);
    return coCreateFormatter(locale, options);
  }, [locale, formatKey, decimals, minDigits]);

  const digits = useMemo(() => coDigitsFor(formatter), [formatter]);
  const slots = useMemo(() => coSlotsFor(formatter, digits, amount), [formatter, digits, amount]);
  const label = useMemo(() => formatter.format(amount), [formatter, amount]);
  const [list, setList] = useState(() =>
    slots.map(slot => ({ ...slot, start: slot.kind === 'digit' ? slot.digit : 0 }))
  );

  const engine = useRef({ items: new Map(), raf: 0, last: 0, ready: false, value: amount, widths: [], em: 16 });
  const settings = {
    direction: CO_DIRECTIONS.includes(direction) ? direction : 'auto',
    duration: Math.max(0.05, duration),
    bounce: coClamp(bounce, 0, 0.9),
    stagger: Math.max(0, stagger),
    motionBlur,
    tabular
  };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  const paint = item => {
    const el = item.el;
    if (!el) return;
    const e = engine.current;
    const s = settingsRef.current;
    const shown = coClamp(item.shown, 0, 1);
    const resting = item.pos === item.target && item.vel === 0;
    if (item.kind === 'digit') {
      item.numerals?.forEach((numeral, n) => {
        numeral.style.transform = `translateY(${(coWrap(n - item.pos) * 100).toFixed(3)}%)`;
      });
      if (shown >= 1 && (s.tabular || resting)) {
        el.style.width = '';
      } else {
        const at = coMod(item.pos, 10);
        const low = Math.floor(at);
        const from = e.widths[low % 10] ?? 0;
        const to = e.widths[(low + 1) % 10] ?? from;
        el.style.width = `${((from + (to - from) * (at - low)) * shown).toFixed(2)}px`;
      }
      if (item.blur && item.strip) {
        const radius = s.motionBlur ? coClamp((Math.abs(item.vel) - 3) * 0.006, 0, 0.09) * e.em : 0;
        if (radius > 0.25) {
          item.blur.setAttribute('stdDeviation', `0 ${radius.toFixed(2)}`);
          if (!item.blurred) {
            item.strip.style.filter = `url(#${item.filter})`;
            item.blurred = true;
          }
        } else if (item.blurred) {
          item.strip.style.filter = '';
          item.blurred = false;
        }
      }
    } else {
      el.style.width = shown >= 1 ? '' : `${(item.natural * shown).toFixed(2)}px`;
    }
    el.style.setProperty('--counter-shown', shown >= 1 ? '' : shown.toFixed(3));
  };

  const frame = now => {
    const e = engine.current;
    e.raf = 0;
    const s = settingsRef.current;
    const elapsed = coClamp((now - e.last) / 1000, 0, 1 / 20);
    e.last = now;
    const reduced = coPrefersReduced();
    const omega = CO_TAU / s.duration;
    const zeta = 1 - s.bounce;
    const presence = CO_TAU / (s.duration * 0.85);
    const done = [];
    let busy = false;
    e.items.forEach((item, key) => {
      if (reduced) {
        item.wait = 0;
        item.pos = item.target;
        item.vel = 0;
        item.shown = item.shownTarget;
        item.shownVel = 0;
      } else {
        let left = elapsed;
        if (item.wait > 0) {
          const used = Math.min(item.wait, left);
          item.wait -= used;
          left -= used;
        }
        if (left > 0) {
          const steps = Math.ceil(left * 240);
          const dt = left / steps;
          for (let i = 0; i < steps; i++) {
            item.vel += (-omega * omega * (item.pos - item.target) - 2 * zeta * omega * item.vel) * dt;
            item.pos += item.vel * dt;
            item.shownVel +=
              (-presence * presence * (item.shown - item.shownTarget) - 2 * presence * item.shownVel) * dt;
            item.shown += item.shownVel * dt;
          }
        }
      }
      const settled =
        item.wait <= 0 &&
        Math.abs(item.pos - item.target) < 0.002 &&
        Math.abs(item.vel) < 0.02 &&
        Math.abs(item.shown - item.shownTarget) < 0.002 &&
        Math.abs(item.shownVel) < 0.02;
      if (settled) {
        item.target = coMod(Math.round(item.target), 10);
        item.pos = item.target;
        item.vel = 0;
        item.shown = item.shownTarget;
        item.shownVel = 0;
        if (item.exiting) done.push(key);
      } else {
        busy = true;
      }
      paint(item);
    });
    if (done.length) {
      done.forEach(key => e.items.delete(key));
      setList(previous => previous.filter(slot => !done.includes(slot.key)));
    }
    if (busy) e.raf = requestAnimationFrame(frame);
  };

  const kick = () => {
    const e = engine.current;
    if (e.raf || typeof window === 'undefined') return;
    e.last = performance.now();
    e.raf = requestAnimationFrame(frame);
  };

  const kickRef = useRef(kick);
  kickRef.current = kick;

  coUseIsoLayoutEffect(() => {
    const e = engine.current;
    const s = settingsRef.current;
    if (!e.ready) {
      slots.forEach(slot => e.items.set(slot.key, coMakeItem(slot, slot.kind === 'digit' ? slot.digit : 0, 1)));
      e.ready = true;
      e.value = amount;
      return;
    }
    const previous = e.value;
    e.value = amount;
    const trend =
      s.direction !== 'auto'
        ? s.direction
        : Math.abs(amount) > Math.abs(previous)
          ? 'up'
          : Math.abs(amount) < Math.abs(previous)
            ? 'down'
            : 'shortest';
    const next = new Set(slots.map(slot => slot.key));
    const moving = [];
    slots.forEach(slot => {
      let item = e.items.get(slot.key);
      if (!item) {
        item = coMakeItem(slot, 0, 0);
        e.items.set(slot.key, item);
      }
      item.exiting = false;
      item.shownTarget = 1;
      item.rank = slot.rank;
      if (slot.kind !== 'digit') return;
      const step = coStepBetween(coMod(Math.round(item.target), 10), slot.digit, trend);
      if (step !== 0 || item.shown < 1) {
        item.target += step;
        moving.push(item);
      }
    });
    e.items.forEach((item, key) => {
      if (next.has(key) || item.exiting) return;
      item.exiting = true;
      item.shownTarget = 0;
      if (item.kind !== 'digit') return;
      item.target += coStepBetween(coMod(Math.round(item.target), 10), 0, trend);
      moving.push(item);
    });
    moving
      .sort((a, b) => b.rank - a.rank)
      .forEach((item, order) => {
        item.wait = order * s.stagger;
      });
    e.items.forEach((item, key) => {
      if (item.kind !== 'symbol' || key[0] !== 'g') return;
      const owner = e.items.get(`i${key.slice(1)}`);
      if (owner && (owner.shown < 1 || owner.shownTarget < 1)) item.wait = owner.wait;
    });
    setList(previous => {
      const known = new Map(previous.map(slot => [slot.key, slot]));
      const merged = slots.map(slot => ({ ...slot, start: known.get(slot.key)?.start ?? 0 }));
      previous.forEach(slot => {
        if (!next.has(slot.key)) merged.push(slot);
      });
      merged.sort((a, b) => a.rank - b.rank);
      const same =
        merged.length === previous.length &&
        merged.every(
          (slot, index) =>
            slot.key === previous[index].key &&
            slot.digit === previous[index].digit &&
            slot.text === previous[index].text
        );
      return same ? previous : merged;
    });
    kick();
  }, [slots]);

  coUseIsoLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const e = engine.current;
    row.querySelectorAll('[data-slot]').forEach(el => {
      const item = e.items.get(el.dataset.slot ?? '');
      if (!item) return;
      item.el = el;
      if (item.kind === 'digit') {
        item.numerals = [...el.querySelectorAll('[data-numeral]')];
        item.strip = el.querySelector('[data-strip]');
        item.blur = el.querySelector('feGaussianBlur');
        item.filter = el.querySelector('filter')?.id ?? '';
        if (!item.blur && item.strip) item.strip.style.filter = '';
        item.blurred = Boolean(item.blur && item.strip?.style.filter);
      } else if (item.shown < 1 || item.shownTarget < 1) {
        item.natural = el.firstElementChild?.getBoundingClientRect().width ?? 0;
      }
      paint(item);
    });
  }, [list, motionBlur]);

  coUseIsoLayoutEffect(() => {
    const row = measureRef.current;
    const root = rootRef.current;
    if (!row || !root) return undefined;
    let alive = true;
    const measure = () => {
      if (!alive) return;
      const e = engine.current;
      e.widths = [...row.children].map(child => child.getBoundingClientRect().width);
      e.em = parseFloat(getComputedStyle(root).fontSize) || 16;
    };
    measure();
    document.fonts?.ready?.then(measure).catch(() => {});
    if (typeof ResizeObserver === 'undefined') {
      return () => {
        alive = false;
      };
    }
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => {
      alive = false;
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!intro || !root || coPrefersReduced()) return undefined;
    const spin = () => {
      const e = engine.current;
      const s = settingsRef.current;
      const turn = s.direction === 'down' ? -10 : 10;
      [...e.items.values()]
        .filter(item => item.kind === 'digit' && !item.exiting)
        .sort((a, b) => a.rank - b.rank)
        .forEach((item, order) => {
          item.target += turn;
          item.wait = order * s.stagger;
        });
      kickRef.current();
    };
    if (typeof IntersectionObserver === 'undefined') {
      spin();
      return undefined;
    }
    const observer = new IntersectionObserver(
      entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer.disconnect();
        spin();
      },
      { threshold: 0.5 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [intro]);

  useEffect(() => {
    const e = engine.current;
    return () => cancelAnimationFrame(e.raf);
  }, []);

  const affix = node =>
    node === undefined || node === null || node === false ? null : <span className={CO_AFFIX}>{node}</span>;

  return (
    <span
      ref={rootRef}
      className={[CO_ROOT, className].filter(Boolean).join(' ')}
      style={{
        fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
        fontWeight,
        color: textColor,
        fontVariantNumeric: tabular ? 'tabular-nums' : undefined,
        '--counter-fade': `${Math.max(0, fade)}em`,
        '--counter-gap': `${Math.max(0, gap)}px`,
        '--counter-padding': `${Math.max(0, padding)}px`,
        ...style
      }}
    >
      <span className={CO_SR}>
        {prefix}
        {label}
        {suffix}
      </span>
      <span ref={rowRef} className={CO_ROW} aria-hidden="true">
        {affix(prefix)}
        {list.map(slot =>
          slot.kind === 'digit' ? (
            <span key={slot.key} data-slot={slot.key} className={CO_DIGIT} style={digitStyle}>
              <span className={CO_SIZER}>{digits[slot.digit]}</span>
              <span className={CO_WINDOW} style={{ maskImage: CO_MASK, WebkitMaskImage: CO_MASK }}>
                <span className={CO_STRIP} data-strip="">
                  {digits.map((char, n) => (
                    <span
                      key={n}
                      className={CO_NUMERAL}
                      data-numeral=""
                      style={{ transform: `translateY(${coWrap(n - slot.start) * 100}%)` }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </span>
              {motionBlur && (
                <svg className={CO_BLUR} aria-hidden="true">
                  <filter
                    id={`${blurId}-${slot.key}`}
                    x="-10%"
                    y="-50%"
                    width="120%"
                    height="200%"
                    colorInterpolationFilters="sRGB"
                  >
                    <feGaussianBlur stdDeviation="0 0" />
                  </filter>
                </svg>
              )}
            </span>
          ) : (
            <span key={slot.key} data-slot={slot.key} className={CO_SYMBOL}>
              <span className={CO_SYMBOL_TEXT}>{slot.text}</span>
            </span>
          )
        )}
        {affix(suffix)}
      </span>
      <span ref={measureRef} className={CO_MEASURE} aria-hidden="true">
        {digits.map((char, n) => (
          <span key={n}>{char}</span>
        ))}
      </span>
    </span>
  );
}

export default Counter;
