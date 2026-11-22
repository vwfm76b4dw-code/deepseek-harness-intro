/* P8 CTA：Download Desktop（官方收尾） */
import { StarBorder, Magnet, SplitFlapText, EchoText, Dock, GlareHover } from '../rb/index.js';
import { Icons } from '../icons.jsx';

function DockNav({ go }) {
  const goSec = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <div className="dockzone" aria-label="页面导航 Dock">
      <Dock
        items={[
          { icon: <Icons.plugin size={20} />, label: '插件', onClick: () => goSec('p2') },
          { icon: <Icons.stack size={20} />, label: '任务', onClick: () => goSec('p3') },
          { icon: <Icons.nodes size={20} />, label: '工作流', onClick: () => goSec('p4') },
          { icon: <Icons.chip size={20} />, label: '开发工具', onClick: () => goSec('p5') },
          { icon: <Icons.branch size={20} />, label: '一条命令', onClick: () => goSec('p6') },
          { icon: <Icons.pulse size={20} />, label: '生态', onClick: () => goSec('p7') },
          { separator: true },
          { icon: <Icons.branch size={20} />, label: 'GitHub', onClick: () => window.open('https://github.com/deepseek-ai/deepseek-harness', '_blank') }
        ]}
        position="bottom"
        theme="light"
        baseItemSize={44}
        magnification={62}
        distance={100}
        bounce
        showIndicators={false}
      />
    </div>
  );
}

export default function PageCta({ go }) {
  return (
    <div className="page-wrap p-center">
      <p className="sec-label">GET STARTED · 现在就开始</p>
      <p className="scene-statement" style={{ marginTop: 18 }}>
        <EchoText text="Download Desktop" trail="pointer" echoes={6} lag={0.22} offset={22} direction="right" fade={0.7} tint="#4D6BFE" mode="both" fontSize="clamp(2rem, 4.6vw, 3.6rem)" fontWeight={800} />
      </p>
      <p className="scene-note" style={{ margin: '26px auto 0', maxWidth: 640 }}>
        DeepSeek Harness 公测全球开放——桌面版下载即用，
        开源仓库随时深入。<strong style={{ color: 'var(--ink)' }}>Explore the limits of intelligence.</strong>
      </p>
      <div className="p-actions" data-reveal>
        <Magnet padding={70} magnetStrength={2.4}>
          <StarBorder
            as="a"
            href="https://github.com/deepseek-ai/deepseek-harness"
            target="_blank"
            rel="noreferrer"
            theme="light"
            backgroundColor="#4D6BFE"
            textColor="#FFFFFF"
            color="#FFFFFF"
            trailColor="#AABDFF"
            borderColor="rgba(255,255,255,0.35)"
            radius={14}
            duration={3.6}
            glow={0.55}
          >
            ⬇ Download Desktop
          </StarBorder>
        </Magnet>
        <GlareHover width="auto" borderRadius="14px" glareColor="#4D6BFE" glareOpacity={0.4}>
          <a className="btn-ghost" href="https://github.com/deepseek-ai/deepseek-harness" target="_blank" rel="noreferrer">GitHub 源码</a>
        </GlareHover>
        <button type="button" className="btn-ghost" onClick={() => go(0)} style={{ cursor: 'pointer', fontFamily: 'inherit' }}>↺ 重看一遍</button>
      </div>
      <div className="loop-board" data-reveal>
        <span className="flap-label">完播纪念</span>
        <SplitFlapText words={['Ready to use', 'Right now']} tileColor="#1D1D1F" textColor="#F5F5F7" fontSize={22} padTo={12} tileStyle="board" cycleDelay={2400} />
      </div>
      <DockNav go={go} />
    </div>
  );
}
