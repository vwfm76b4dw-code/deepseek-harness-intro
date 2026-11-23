/* S1 Hero：#top —— 游戏标题页：官方徽章浮腾 + 标题 + PRESS START + LEVEL SELECT
   图标：官方 desktop tile（public/brand/dsh-tile-1024.png，仓库 apps/desktop/resources）
   组件（契约 §5）：DotGrid · ShinyText · TextType · StarBorder · Magnet · ClickSpark
   游戏手感：徽章指针 3D 倾斜（data-tilt）+ 缓浮动；START 键 ▶ 闪烁；chips 菜单滑入；
   纪律：transform/opacity only；reduced-motion 全静止（useCardJuice 与 CSS 双重兜底） */
import { DotGrid, ShinyText, TextType, StarBorder, Magnet, ClickSpark } from '../rb/index.js';

const CHIPS = [
  ['what', '认识 DSH'], ['plugin', '一切皆插件'], ['tasks', '任务能力'], ['workflow', '工作方式'],
  ['devtools', '开发者工具'], ['start', '命令启动'], ['live', '任务进行时'], ['eco', '插件生态'],
];

export default function S1Hero() {
  return (
    <section id="top" className="ld-hero">
      <div className="ld-hero-bg" aria-hidden="true">
        <DotGrid
          dotSize={4} gap={22} baseColor="#CBD2E1" activeColor="#4D6BFE"
          proximity={150} strength={0.9} bounce={0.55} tension={0.35}
          swell={0.7} stretch={0.45} glow={0.4} fade={1} opacity={0.9}
        />
      </div>
      <div className="ld-hero-inner">
        {/* 官方徽章：像一枚游戏图标——浮腾 + 指针倾斜 */}
        <div className="ld-emblem" data-reveal data-tilt>
          <span className="ld-emblem-halo" aria-hidden="true" />
          <img
            src="brand/dsh-tile-1024.png"
            alt="DeepSeek Harness"
            width={128}
            height={128}
            className="ld-emblem-img"
          />
        </div>

        <span className="sec-label ld-hero-badge" data-reveal>
          开发者预览 · 全球公测 · 开源
        </span>
        <h1 data-reveal>
          DeepSeek <ShinyText text="Harness" color="#1D1D1F" shineColor="#4D6BFE" speed={3.2} delay={1.2} shineWidth={46} />
        </h1>
        <div className="ld-hero-slogan" data-reveal>
          <TextType
            as="div" text={['现在，开箱即用', 'Everything is a Plugin', '共探智能上限']}
            typingSpeed={75} deletingSpeed={35} pauseDuration={2200} cursorStyle="bar"
          />
        </div>
        <p className="ld-hero-lead" data-reveal data-delay="1">
          无论处理日常工作、编写代码，还是构建自己的 Harness，都可以从这里开始。
          DeepSeek Harness 面向全球开放测试并同步开源，以可自由组合的插件，拓展 Agent 能力。
        </p>
        <div className="ld-actions" data-reveal data-delay="2">
          <ClickSpark sparkColor="#4D6BFE" sparkSize={12} sparkCount={10} duration={600}>
            <Magnet padding={70} magnetStrength={2.4}>
              <a className="ld-btn ld-btn-start" href="#what">
                <span className="ld-start-caret" aria-hidden="true">▶</span> PRESS START
              </a>
            </Magnet>
          </ClickSpark>
          <StarBorder
            as="a"
            href="https://github.com/deepseek-ai/deepseek-harness"
            target="_blank"
            rel="noreferrer"
            theme="light"
            backgroundColor="#FFFFFF"
            textColor="#1D1D1F"
            color="#4D6BFE"
            trailColor="#AABDFF"
            borderColor="rgba(77,107,254,0.35)"
            radius={14}
            duration={3.6}
            glow={0.5}
          >
            GitHub 仓库
          </StarBorder>
        </div>

        {/* LEVEL SELECT：章节即关卡 */}
        <div className="ld-hero-levels" data-reveal data-delay="2">
          <span className="ld-levels-label">LEVEL SELECT</span>
          <div className="ld-chips">
            {CHIPS.map(([id, label]) => (
              <a key={id} className="ld-chip ld-chip-level" href={`#${id}`}>{label}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="ld-scroll-hint" aria-hidden="true">
        <span className="ld-start-caret">▼</span>
        <span>向下滚动 · 开始</span>
      </div>
    </section>
  );
}