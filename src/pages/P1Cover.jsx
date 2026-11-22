/* P1 封面 —— 官方结构：Ready to use. Right now. */
import { DotGrid, ShinyText, StarBorder, Magnet, ClickSpark, GlareHover } from '../rb/index.js';

const CHAPTERS = [
  ['01', '一切皆插件'], ['02', '任务范围'], ['03', '工作流'],
  ['04', '开发者工具'], ['05', '一条命令'], ['06', '插件生态'], ['07', '下载']
];

export default function PageCover({ go }) {
  return (
    <div className="page-wrap pos-rel p-center" style={{ position: 'relative' }}>
      <div className="hero-bg" aria-hidden="true">
        <DotGrid
          dotSize={4} gap={22} baseColor="#CBD2E1" activeColor="#4D6BFE"
          proximity={150} strength={0.9} bounce={0.55} tension={0.35}
          swell={0.7} stretch={0.45} glow={0.4} fade={1} opacity={0.9}
        />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <span className="hero-badge"><span className="pulse" />Public Preview · 全球公测 · 开源</span>
        <h1>
          DeepSeek <ShinyText text="Harness" color="#1D1D1F" shineColor="#4D6BFE" speed={3.2} delay={1.2} shineWidth={46} />
        </h1>
        <p className="hero-cap">Ready to use. Right now.</p>
        <p className="hero-sub">
          日常任务、编程、或你自己的 harness——<strong>都从这里开始</strong>。
          DeepSeek Harness 正在全球公测并开源，用可组合的插件，扩展 Agent 能力的边界。
        </p>
        <div className="p-actions">
          <ClickSpark sparkColor="#4D6BFE" sparkSize={12} sparkCount={10} duration={600}>
            <Magnet padding={70} magnetStrength={2.4}>
              <StarBorder
                as="button"
                onClick={() => go(1)}
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
                ▶ 开始介绍
              </StarBorder>
            </Magnet>
          </ClickSpark>
          <GlareHover width="auto" borderRadius="14px" glareColor="#4D6BFE" glareOpacity={0.4}>
            <a className="btn-ghost" href="https://github.com/deepseek-ai/deepseek-harness" target="_blank" rel="noreferrer">GitHub 仓库</a>
          </GlareHover>
        </div>
        <p className="kbd-hint"><kbd>←</kbd><kbd>→</kbd> 方向键翻页 · 转场模式右上角可换</p>
        <div className="chapters">
          {CHAPTERS.map(([n, label]) => (
            <button key={n} type="button" className="chapter-chip" onClick={() => go(Number(n))}>
              <span className="cnum">{n}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
