/* P6 案例陈列：全部 38 枚动效插件的现场演示（Tab 分类 + demo 网格） */
import { useState, useEffect } from 'react';
import {
  PillNav, TextType, SplitFlapText, GradientText, ParticleText, FuzzyText, CurvedLoop,
  TechText, EchoText, SplitText, ClickSpark, CursorGrid, GlareHover, PixelTrail,
  GhostCursor, GlowCursor, TiltedCard, PixelCard, HoloCard, GlassSurface, CardSwap, Card,
  Dock, Counter, CallChip, LatticeLoader, HoldButton, FuseButton, GlideSelect,
  PulseHeart, SloshGauge, FaultyTerminal, Radar, LetterGlitch
} from '../rb/index.js';

const DSH_CARD_ART =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='420' height='320'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%234D6BFE'/%3E%3Cstop offset='1' stop-color='%231D1D1F'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='420' height='320' fill='url(%23g)'/%3E%3Ccircle cx='330' cy='70' r='40' fill='%23ffffff' opacity='0.14'/%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='72' font-weight='700' fill='%23ffffff' text-anchor='middle'%3Edsh%3C/text%3E%3C/svg%3E";

function DemoCard({ name, desc, children, stage = '', style }) {
  return (
    <div className="demo-card" style={style}>
      <div className={`demo-stage${stage ? ` ${stage}` : ''}`}>{children}</div>
      <div className="demo-meta">
        <span className="demo-name">{name}</span>
        <span className="demo-desc">{desc}</span>
      </div>
    </div>
  );
}

function Panels({ tab }) {
  if (tab === 'text') {
    return (
      <div className="demo-grid">
        <DemoCard name="Text Type" desc="打字机 · gsap">
          <div className="term-box">
            <TextType as="div" text={['dsh agent 已就绪。', '接收任务 → 规划 → 行动 → 观察。', '循环执行，直到完成。']} typingSpeed={55} deletingSpeed={26} pauseDuration={1600} cursorStyle="bar" />
          </div>
        </DemoCard>
        <DemoCard name="Split Flap Text" desc="机场翻牌">
          <div className="flap-stage">
            <SplitFlapText words={['AGENT READY', 'TASK RUNNING']} tileColor="#1D1D1F" textColor="#F5F5F7" fontSize={20} padTo={12} tileStyle="board" cycleDelay={2600} />
          </div>
        </DemoCard>
        <DemoCard name="Gradient Text" desc="流动渐变">
          <GradientText colors={['#4D6BFE', '#7A96FF', '#B497CF']} animationSpeed={6} variant="flow" yoyo pauseOnHover style={{ fontSize: 38, fontWeight: 700 }}>一切皆插件</GradientText>
        </DemoCard>
        <DemoCard name="Particle Text" desc="粒子聚字 · canvas">
          <div className="fill">
            <ParticleText text="dsh" color="#1D1D1F" highlightColor="#4D6BFE" intro="gather" pointerRepel={36} clickBurst particleSize={2.2} fontSize="clamp(2.6rem, 6vw, 4rem)" />
          </div>
        </DemoCard>
        <DemoCard name="Fuzzy Text" desc="悬停抖动">
          <FuzzyText fontSize={44} fontWeight={800} baseIntensity={0.16} hoverIntensity={0.42} color="#1D1D1F">悬停试试</FuzzyText>
        </DemoCard>
        <DemoCard name="Curved Loop" desc="弧形循环">
          <div className="fill">
            <CurvedLoop marqueeText="Agent ✦ Model ✦ Harness ✦ " shape="arc" speed={2} curveAmount={140} fontSize={32} fontWeight={700} interactive color="#4D6BFE" />
          </div>
        </DemoCard>
        <DemoCard name="Tech Text" desc="矢量路径字 · canvas">
          <div className="fill">
            <TechText text="HARNESS" fontSize={52} accentColor="#4D6BFE" reveal="letter" draggable sweep />
          </div>
        </DemoCard>
        <DemoCard name="Echo Text" desc="残影回声">
          <EchoText text="永远在线" trail="pointer" echoes={8} lag={0.24} offset={24} direction="right" fade={0.7} blur={3} tint="#4D6BFE" mode="both" fontSize="1.9rem" fontWeight={800} />
        </DemoCard>
        <DemoCard name="Split Text" desc="逐字入场 · gsap">
          <SplitText text="把模型装进骨架" effect="rise" splitType="chars" delay={40} duration={1} trigger="view" tag="div" className="st-demo" />
        </DemoCard>
      </div>
    );
  }
  if (tab === 'cursor') {
    return (
      <div className="demo-grid">
        <DemoCard name="Click Spark" desc="点击火花">
          <ClickSpark sparkColor="#4D6BFE" sparkSize={12} sparkCount={10} duration={600}>
            <div className="spark-stage">在这里随便点<span className="spark-hint">✦</span></div>
          </ClickSpark>
        </DemoCard>
        <DemoCard name="Cursor Grid" desc="网格点亮 · WebGL">
          <div className="fill">
            <CursorGrid color="#8FA6FF" gridColor="#3A54D9" cellSize={42} gridOpacity={0.24} lightMode={false} />
          </div>
        </DemoCard>
        <DemoCard name="Glare Hover" desc="扫光掠过">
          <GlareHover width="auto" borderRadius="14px" glareColor="#4D6BFE" glareOpacity={0.4}>
            <div className="glare-demo">把鼠标扫过来</div>
          </GlareHover>
        </DemoCard>
        <DemoCard name="Pixel Trail" desc="液态像素 · WebGL">
          <div className="fill">
            <PixelTrail gridSize={28} color="#4D6BFE" gooeyFilter={{ strength: 2 }} shine={0.5} glow={0.35} />
          </div>
        </DemoCard>
        <DemoCard name="Ghost Cursor" desc="烟魂拖尾 · WebGL">
          <div className="fill">
            <GhostCursor theme="light" color="#4D6BFE" size={54} trailLength={38} />
          </div>
        </DemoCard>
        <DemoCard name="Glow Cursor" desc="流体光晕 · WebGL">
          <div className="fill">
            <GlowCursor theme="light" color="#4D6BFE" intensity={1.1} quality="medium" />
          </div>
        </DemoCard>
      </div>
    );
  }
  if (tab === 'cards') {
    return (
      <div className="demo-grid">
        <DemoCard name="Tilted Card" desc="3D 倾斜卡">
          <div className="fill" style={{ padding: 18 }}>
            <TiltedCard imageSrc={DSH_CARD_ART} altText="dsh" containerWidth="100%" containerHeight="100%" imageWidth="100%" imageHeight="100%" rotateAmplitude={12} scaleOnHover={1.04} showTooltip={false} radius={13} />
          </div>
        </DemoCard>
        <DemoCard name="Pixel Card" desc="像素显影">
          <div className="fill">
            <PixelCard variant="blue" gap={10} speed={40} pixelSize={6} theme="light" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="bay-pixel-inner">悬停显影</span>
            </PixelCard>
          </div>
        </DemoCard>
        <DemoCard name="Holo Card" desc="全息卡牌">
          <HoloCard image={DSH_CARD_ART} alt="dsh 全息" preset="cosmos" width={190} radius={12} foilColor="#7A96FF" intensity={0.8} />
        </DemoCard>
        <DemoCard name="Glass Surface" desc="液态玻璃">
          <div className="fill">
            <div className="glass-backdrop" aria-hidden="true" />
            <div className="bay-glass-holder">
              <GlassSurface width={190} height={92} borderRadius={16}>
                <span className="glass-label">透过它看世界</span>
              </GlassSurface>
            </div>
          </div>
        </DemoCard>
        <DemoCard name="Card Swap" desc="任务卡轮换">
          <CardSwap width={300} height={200} cardDistance={46} verticalDistance={54} skewAmount={5} autoplay delay={2200} speed={1} cardRadius={12} theme="light" pauseOnHover>
            <Card><div className="bay-swap-card">接收任务</div></Card>
            <Card><div className="bay-swap-card alt">规划步骤</div></Card>
            <Card><div className="bay-swap-card">调用工具</div></Card>
            <Card><div className="bay-swap-card alt">循环执行</div></Card>
          </CardSwap>
        </DemoCard>
        <DemoCard name="Dock" desc="程序坞">
          <div className="fill dock-stage">
            <Dock
              items={[
                { icon: <DockIcon kind="chip" />, label: 'Model' },
                { icon: <DockIcon kind="frame" />, label: 'Harness' },
                { icon: <DockIcon kind="robot" />, label: 'Agent', active: true, badge: 2 },
                { icon: <DockIcon kind="plugin" />, label: 'Plugins' },
                { icon: <DockIcon kind="pulse" />, label: 'Monitor' }
              ]}
              position="bottom"
              theme="light"
              baseItemSize={44}
              magnification={62}
              distance={110}
              bounce
              showIndicators={false}
            />
          </div>
        </DemoCard>
        <DemoCard name="Counter" desc="滚轮计数 · 在线秒数">
          <UptimeDemo />
        </DemoCard>
        <DemoCard name="Pill Nav" desc="分类导航">
          <div style={{ padding: 10 }}>
            <PillNav
              items={[{ label: '模型', href: '#m' }, { label: '工具', href: '#t' }, { label: '沙箱', href: '#s' }]}
              theme="light" size="sm" layout="joined" hoverEffect="fill" indicator="pill"
              highlightColor="#4D6BFE" surface="solid" ariaLabel="示意"
              onItemClick={(item, idx, e) => e.preventDefault()}
            />
          </div>
        </DemoCard>
      </div>
    );
  }
  if (tab === 'micro') {
    return (
      <div className="demo-grid">
        <DemoCard name="Call Chip" desc="工具调用计时">
          <StatusCycleDemo />
        </DemoCard>
        <DemoCard name="Lattice Loader" desc="状态格加载">
          <div className="micro-stage"><LatticeLoader status="working" pattern="orbit" grid={3} label="Thinking" showTimer /></div>
        </DemoCard>
        <DemoCard name="Hold Button" desc="长按审批">
          <div className="micro-stage"><HoldButton fillColor="#4D6BFE" holdTime={1600} size="md" doneLabel="已放行">长按审批</HoldButton></div>
        </DemoCard>
        <DemoCard name="Fuse Button" desc="引信撤销">
          <div className="micro-stage"><FuseButton key="fb-g" label="发布" undoLabel="撤销" doneLabel="已发布" fuseColor="#FF9500" undoWindow={3500} /></div>
        </DemoCard>
        <DemoCard name="Glide Select" desc="滑动选模型">
          <div className="micro-stage"><GlideSelect options={['deepseek-chat', 'deepseek-reasoner', 'deepseek-v4']} ariaLabel="示意" size="sm" /></div>
        </DemoCard>
        <DemoCard name="Pulse Heart" desc="脉冲点赞">
          <div className="micro-stage"><PulseHeart count={128} size={42} /></div>
        </DemoCard>
        <DemoCard name="Slosh Gauge" desc="液体水位计">
          <div className="micro-stage"><SloshGauge defaultValue={62} interactive width={200} height={128} unit="%" /></div>
        </DemoCard>
      </div>
    );
  }
  return (
    <div className="demo-grid">
      <DemoCard name="Faulty Terminal" desc="故障终端 · WebGL" stage="dark">
        <div className="fill"><FaultyTerminal tint="#7A96FF" glyphs="characters" timeScale={0.35} glow={0.55} persistence={0.45} clickEffect="glitch" /></div>
      </DemoCard>
      <DemoCard name="Radar" desc="雷达扫描 · WebGL" stage="dark">
        <div className="fill"><Radar color="#4D6BFE" mode="sweep" speed={1.2} trail={0.4} targets={8} lightMode={false} /></div>
      </DemoCard>
      <DemoCard name="Letter Glitch" desc="字母故障场 · WebGL">
        <div className="fill"><LetterGlitch baseColor="#1D1D1F" glitchColors={['#4D6BFE', '#7A96FF', '#B497CF']} fontSize={13} baseOpacity={0.22} glitchAmount={0.5} speed={1} clickEffect="tear" /></div>
      </DemoCard>
    </div>
  );
}

/* 案例墙内部小组件 */
import { Icons } from '../icons.jsx';
const DockIcon = ({ kind }) => {
  const I = { chip: Icons.chip, frame: Icons.frame, robot: Icons.robot, plugin: Icons.plugin, pulse: Icons.pulse }[kind] || Icons.plugin;
  return <I />;
};
function StatusCycleDemo() {
  const [status, setStatus] = useState('running');
  useEffect(() => {
    const timer = setInterval(() => setStatus(s => (s === 'running' ? 'done' : s === 'done' ? 'error' : 'running')), 2400);
    return () => clearInterval(timer);
  }, []);
  return <CallChip icon="terminal" status={status} expectedMs={2100} showTimer />;
}
function UptimeDemo() {
  const [uptime, setUptime] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setUptime(v => v + 1), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="counter-stage">
      <Counter value={uptime} direction="up" fontSize={44} fontWeight={700} duration={0.5} bounce={0.15} fade={0.1} minDigits={3} />
      <span className="counter-unit">秒 · 永远在线</span>
    </div>
  );
}

const TABS = [
  { label: '全部', href: '#g-all' },
  { label: '文字动画', href: '#g-text' },
  { label: '光标互动', href: '#g-cursor' },
  { label: '卡片组件', href: '#g-cards' },
  { label: '微交互', href: '#g-micro' },
  { label: '背景场', href: '#g-bg' }
];

export default function PageGallery() {
  const [tab, setTab] = useState('#g-text');
  return (
    <div className="page-wrap">
      <p className="sec-label">GALLERY · 案例陈列</p>
      <p className="scene-note" data-reveal style={{ maxWidth: 720, marginBottom: 10 }}>
        全部 33 枚动效插件拉出来现场演示：能点的点、能拖的拖、能悬停的悬停。
        背景与光标类在指针进入时才会动起来——它们本来就是"回应你"的插件。
      </p>
      <div className="bay-filter" data-reveal>
        <PillNav
          items={TABS}
          activeHref={tab}
          theme="light"
          size="sm"
          layout="joined"
          hoverEffect="fill"
          indicator="pill"
          highlightColor="#4D6BFE"
          surface="solid"
          ariaLabel="案例分类"
          onItemClick={(item, index, event) => {
            event.preventDefault();
            setTab(item.href);
          }}
        />
      </div>
      <Panels tab={tab} />
    </div>
  );
}
