/* S11 下载桌面端：#cta —— 收尾 CTA + EchoText 主标 + SplitFlapText 机场板 + AnchorDock 锚点导航
   组件：EchoText · SplitFlapText · Dock · Magnet
   修复旧版 bug：onClick 必须判空 document.getElementById 返回值（契约 §5）。
   Dock items 由 src/sections/index.js 的 SECTIONS 生成；含 IntersectionObserver 当前分节高亮。 */
import { useEffect, useState } from 'react';
import { EchoText, SplitFlapText, Dock, Magnet, HoloCard } from '../rb/index.js';
import { Icons } from '../icons.jsx';
import { SECTIONS } from './index.js';

/* dsh 全息卡 artwork：data-URI SVG（旧 deck P6Gallery 同源，自包含无外链） */
const DSH_CARD_ART =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='420' height='320'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%234D6BFE'/%3E%3Cstop offset='1' stop-color='%231D1D1F'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='420' height='320' fill='url(%23g)'/%3E%3Ccircle cx='330' cy='70' r='40' fill='%23ffffff' opacity='0.14'/%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='72' font-weight='700' fill='%23ffffff' text-anchor='middle'%3Edsh%3C/text%3E%3C/svg%3E";

/* 锚点 → 图标（Icons 来自 ../icons.jsx，均为无 props 线性 SVG；缺省回退 chip） */
const DOCK_ICON = {
  top: 'robot',
  what: 'frame',
  plugin: 'plugin',
  tasks: 'stack',
  workflow: 'nodes',
  devtools: 'chip',
  start: 'branch',
  live: 'pulse',
  eco: 'plugin',
  faq: 'chip',
  cta: 'robot'
};

const RELEASES = 'https://github.com/deepseek-ai/deepseek-harness/releases';
const REPO = 'https://github.com/deepseek-ai/deepseek-harness';
const IDS = SECTIONS.map(s => s.id);

/* 判空滚动：旧版 bug 修复点——getElementById 可能返回 null */
const goSec = id => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

function useActiveId(ids) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (typeof IntersectionObserver !== 'function') return;
    const io = new IntersectionObserver(
      entries => {
        const hit = entries.find(e => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

export default function S11Cta() {
  const activeId = useActiveId(IDS);

  const dockItems = [
    ...SECTIONS.map(s => {
      const Icon = Icons[DOCK_ICON[s.id]] ?? Icons.chip;
      return {
        icon: <Icon />,
        label: s.label,
        active: s.id === activeId,
        onClick: () => goSec(s.id)
      };
    }),
    { separator: true },
    {
      icon: <Icons.branch />,
      label: 'Releases',
      onClick: () => window.open(RELEASES, '_blank', 'noopener')
    }
  ];

  return (
    <section id="cta" className="ld-section" style={{ textAlign: 'center', paddingBottom: 128 }}>
      <p className="sec-label" data-reveal style={{ justifyContent: 'center' }}>GET STARTED · 现在就开始</p>
      <h2 className="ld-h2 sc-cta-echo" data-reveal>
        <EchoText
          text="Download Desktop"
          trail="pointer"
          echoes={6}
          lag={0.22}
          offset={22}
          direction="right"
          fade={0.7}
          tint="#4D6BFE"
          mode="both"
          fontSize="clamp(2rem, 4.6vw, 3.6rem)"
          fontWeight={800}
        />
      </h2>
      <p className="ld-lead" data-reveal style={{ margin: '0 auto' }}>
        DeepSeek Harness 面向全球开放测试并同步开源。桌面版下载即用，开源仓库随时深入；也可以从一条命令开始——现在，开箱即用。
      </p>
      <div className="ld-actions" data-reveal data-delay="1" style={{ justifyContent: 'center' }}>
        <Magnet padding={70} magnetStrength={2.4}>
          <a className="ld-btn" href={RELEASES} target="_blank" rel="noreferrer">⬇ Download Desktop</a>
        </Magnet>
        <a className="ld-btn ghost" href={REPO} target="_blank" rel="noreferrer">GitHub 仓库</a>
        <a
          className="ld-btn ghost"
          href="#top"
          onClick={e => {
            e.preventDefault();
            goSec('top');
          }}
        >↺ 回到顶部</a>
      </div>

      {/* 完播纪念：机场板 + dsh 全息卡（WebGL 箔光，无需外部图片） */}
      <div className="sc-cta-row" data-reveal>
        <div className="sc-cta-holo">
          <HoloCard
            image={DSH_CARD_ART}
            alt="dsh 全息"
            preset="cosmos"
            width={190}
            radius={12}
            foilColor="#7A96FF"
            intensity={0.8}
          />
          <p className="ld-note">dsh · 共探智能上限</p>
        </div>
        <div className="loop-board sc-cta-board">
        <span className="flap-label">完播纪念</span>
        <SplitFlapText
          words={['Ready to use', 'Right now', '共探智能上限']}
          tileColor="#1D1D1F"
          textColor="#F5F5F7"
          fontSize={22}
          padTo={12}
          tileStyle="board"
          cycleDelay={2400}
        />
        </div>
      </div>

      <p className="ld-note" data-reveal style={{ marginTop: 24 }}>
        版本与下载说明以 GitHub Releases 页面为准
      </p>

      {/* AnchorDock：SECTIONS 生成锚点按钮，fixed 右下（.ld-dock 已在 landing.css 定义） */}
      <div className="ld-dock sc-dock" aria-label="页面导航 Dock">
        <Dock
          items={dockItems}
          position="bottom"
          theme="light"
          baseItemSize={44}
          magnification={62}
          distance={100}
          bounce
        />
      </div>
    </section>
  );
}