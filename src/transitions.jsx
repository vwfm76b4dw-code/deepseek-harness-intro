/* 转场库 v9：9 种模式 · 注册表 + 分镜编排 + 播放器 */
import { useEffect, useRef } from 'react';

export const TRANSITIONS = {
  shadow: { label: '影绘长转场', dur: 4600, closingDur: 320, kind: 'canvas' },
  cards: { label: '字卡蒙太奇', dur: 2500, closingDur: 350, kind: 'cards' },
  match: { label: '穿越擦除', dur: 2200, closingDur: 400, kind: 'match' },
  glitchFrames: { label: '闪帧故障', dur: 1400, closingDur: 250, kind: 'glitchFrames' },
  blinds: { label: '百叶窗', dur: 2600, closingDur: 750, kind: 'blinds' },
  pixelWave: { label: '像素波', dur: 2400, closingDur: 600, kind: 'pixelWave' },
  circle: { label: '圆形揭示', dur: 2000, closingDur: 500, kind: 'circle' },
  flip: { label: '3D 翻页', dur: 1700, closingDur: 380, kind: 'flip' },
  push: { label: '推挤', dur: 1400, closingDur: 420, kind: 'push' },
  clock: { label: '时钟擦除', dur: 2100, closingDur: 560, kind: 'clock' }
};

export const FX_LABELS = ['自动轮播', ...Object.values(TRANSITIONS).map(t => t.label)];
export const FX_BY_LABEL = (() => {
  const m = { '自动轮播': 'auto' };
  Object.entries(TRANSITIONS).forEach(([k, t]) => { m[t.label] = k; });
  return m;
})();

export function pickAuto(prevKey) {
  const keys = Object.keys(TRANSITIONS);
  if (!prevKey) return keys[Math.floor(Math.random() * keys.length)];
  const others = keys.filter(k => k !== prevKey);
  return others[Math.floor(Math.random() * others.length)];
}

/* 分镜脚本 → 帧序列。script: [w1, w2, w3]，w2 为主词 */
export function buildShots(mode, script) {
  const [w1, w2, w3] = script;
  const anims = ['pop', 'slide', 'rotate', 'zoom'];
  switch (mode) {
    case 'cards':
      return [w1, w2, w3].map((w, i) => ({
        w, bg: ['#0B0B0E', '#4D6BFE', '#FFD60A'][i % 3], dur: 750,
        anim: ['pop', 'slide', 'rotate'][i % 3], textColor: i % 3 === 2 ? '#111' : '#fff'
      }));
    case 'match':
      return [w2, w3].map((w, i) => ({ w, bg: i % 2 ? '#0B0B0E' : '#4D6BFE', dur: 1050, anim: 'cut', textColor: '#fff' }));
    case 'glitchFrames':
      return [...script, script[0]].map(w => ({ w, bg: '#0B0B0E', cls: 'shot-glitch', dur: 300, anim: 'cut', textColor: '#fff' }));
    case 'blinds':
      return [w2, w3].map((w, i) => ({ w, bg: i % 2 ? '#4D6BFE' : '#0B0B0E', dur: 950, anim: 'pop', textColor: '#fff' }));
    case 'pixelWave':
      return [w1, w2, w3].map((w, i) => ({ w, bg: ['#0B0B0E', '#17171B', '#0B0B0E'][i], dur: 730, anim: 'pop', textColor: '#fff' }));
    case 'circle':
    case 'clock':
    case 'flip':
      return [w2].map(w => ({ w, bg: mode === 'flip' ? '#17171B' : '#0B0B0E', dur: TRANSITIONS[mode].dur - 320, anim: 'pop', textColor: '#fff' }));
    case 'push':
      return [w2].map(w => ({ w, bg: '#0B0B0E', dur: TRANSITIONS.push.dur - 300, anim: 'slide', textColor: '#fff' }));
    default:
      return [{ w: w2, bg: '#0B0B0E', dur: 1000, anim: 'pop', textColor: '#fff' }];
  }
}

/* 影绘长转场：Canvas 逐帧（黑白节奏） */
export function MontageCanvas({ word }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.scale(dpr, dpr);

    const off = document.createElement('canvas');
    off.width = W;
    off.height = H;
    const octx = off.getContext('2d');
    octx.fillStyle = '#fff';
    octx.font = `900 ${Math.max(90, Math.round(W / 5.5))}px "PingFang SC", "Microsoft YaHei", sans-serif`;
    octx.textAlign = 'center';
    octx.textBaseline = 'middle';
    octx.fillText(word, W / 2, H / 2);
    const img = octx.getImageData(0, 0, W, H).data;
    const wordPts = [];
    const gap = Math.max(7, Math.round(W / 150));
    for (let y = 0; y < H; y += gap) {
      for (let x = 0; x < W; x += gap) {
        if (img[(y * W + x) * 4 + 3] > 110) wordPts.push({ x, y, j: Math.random() * Math.PI * 2 });
      }
    }
    const gridPts = [];
    const g2 = 34;
    for (let y = g2 / 2; y < H; y += g2) {
      for (let x = g2 / 2; x < W; x += g2) gridPts.push({ x, y });
    }
    const blk = 26;
    const maxR = Math.hypot(W / 2, H / 2);
    const clamp01 = k => Math.min(1, Math.max(0, k));

    const t0 = performance.now();
    const DUR = 4600;
    let raf = 0;
    const frame = now => {
      const t = clamp01((now - t0) / DUR);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0B0B0E';
      ctx.fillRect(0, 0, W, H);

      if (t < 0.34) {
        const on = clamp01(t / 0.13);
        const off = t < 0.13 ? 0 : clamp01((t - 0.13) / 0.21);
        ctx.fillStyle = '#FFFFFF';
        for (const p of gridPts) {
          const d = Math.hypot(p.x - W / 2, p.y - H / 2) / maxR;
          const wv = Math.exp(-Math.pow((d - on * 1.35) * 4.2, 2));
          const a = (on - off) * (0.12 + 0.75 * wv);
          if (a < 0.02) continue;
          ctx.globalAlpha = a;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.1 + wv * 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      if (t >= 0.15 && t < 0.56) {
        const a2 = clamp01((t - 0.15) / 0.22);
        const flick = t > 0.3 && Math.sin(t * 46) > 0.88 ? 0.3 : 1;
        const breathe = t > 0.3 ? 1 + Math.sin((t - 0.3) * 24) * 0.12 : 1;
        ctx.fillStyle = '#FFFFFF';
        for (const p of wordPts) {
          const local = a2 * (0.6 + 0.4 * Math.sin(p.j + t * 9));
          ctx.globalAlpha = clamp01(a2 * flick * Math.min(1, local + 0.25));
          ctx.beginPath();
          ctx.arc(p.x, p.y, gap * 0.34 * breathe, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      if (t >= 0.55 && t < 0.84) {
        const p = (t - 0.55) / 0.29;
        const front = p * 1.7 - 0.35;
        const layerA = Math.min(1, p / 0.14) * Math.min(1, (1 - p) / 0.12);
        for (let by = 0; by < H; by += blk) {
          for (let bx = 0; bx < W; bx += blk) {
            const d = (bx + by) / (W + H);
            const u = d - front;
            if (Math.abs(u) > 0.34) continue;
            const flip = Math.sin(u * 9.5) > 0;
            const a = Math.exp(-u * u * 9) * layerA;
            ctx.globalAlpha = a;
            ctx.fillStyle = flip ? '#FFFFFF' : '#0B0B0E';
            ctx.fillRect(bx, by, blk, blk);
            if (Math.abs(u) < 0.05) {
              ctx.globalAlpha = a;
              ctx.fillStyle = '#4D6BFE';
              ctx.fillRect(bx, by, blk, blk);
            }
          }
        }
        ctx.globalAlpha = 1;
      }

      if (t >= 0.86 && t < 1) {
        const k = clamp01((t - 0.86) / 0.105);
        const back = Math.max(0, 1 + 2.4 * Math.pow(k - 1, 3) + 1.9 * Math.pow(k - 1, 2));
        ctx.save();
        ctx.translate(W / 2, H / 2);
        const scale = 1 + back * 2.1;
        ctx.scale(scale, scale);
        ctx.globalAlpha = clamp01(1 - k * 0.75);
        ctx.fillStyle = '#FFFFFF';
        for (const p of wordPts) {
          ctx.beginPath();
          ctx.arc(p.x - W / 2, p.y - H / 2, gap * 0.36, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
        ctx.globalAlpha = 1;
      }

      if (t >= 0.965) {
        const w = t >= 0.995 ? 1 : clamp01((t - 0.965) / 0.03);
        ctx.fillStyle = `rgba(255,255,255,${w})`;
        ctx.fillRect(0, 0, W, H);
      }

      if (t < 1) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [word]);
  return <canvas ref={ref} style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 81, animation: 'fadeQuick 0.18s ease-out both' }} />;
}

/* 分镜帧渲染（各模式共用）；noAnim=true 时静态显示（揭出阶段） */
export function ShotFrame({ shot, noAnim }) {
  if (!shot) return null;
  const color = shot.textColor || (shot.bg === '#FFD60A' ? '#111' : '#fff');
  return (
    <div
      className={`m-shot${noAnim ? '' : ` shot-anim-${shot.anim || 'pop'}`} ${shot.cls || ''}`}
      style={{ background: shot.bg }}
    >
      <div className="word" style={{ color }}>
        {shot.w}
        <span className="sub">DEEPSEEK HARNESS</span>
      </div>
    </div>
  );
}

/* 百叶窗条带层：phase 驱动 cover/reveal */
export function BlindsLayer({ phase, dir }) {
  const bands = Array.from({ length: 8 }, (_, i) => i);
  const delay = i => `${(dir > 0 ? i : 7 - i) * 70}ms`;
  return (
    <div className={`blinds-layer phase-${phase}`} aria-hidden="true">
      {bands.map(i => (
        <div className="blind-band" key={i} style={{ animationDelay: phase === 'cover' ? delay(i) : delay(i), transitionDelay: phase === 'reveal' ? delay(i) : '0ms' }} />
      ))}
    </div>
  );
}

/* 像素波网格层 */
export function PixelWaveLayer({ phase }) {
  const cells = Array.from({ length: 96 }, (_, i) => i);
  return (
    <div className={`pw-layer phase-${phase}`} aria-hidden="true">
      {cells.map(i => (
        <div
          className="pw-cell"
          key={i}
          style={{
            animationDelay: `${(i * 13) % 900}ms`,
            background: ['#0B0B0E', '#4D6BFE', '#17171B', '#7A96FF'][i % 4]
          }}
        />
      ))}
    </div>
  );
}

/* 时钟擦除层（conic 扫描） */
export function ClockLayer({ phase }) {
  return <div className={`clock-layer phase-${phase}`} aria-hidden="true" />;
}
