/* P5 特性四：Developer tools（官方） */
import { FaultyTerminal, Radar } from '../rb/index.js';

const TRACES = [
  { t: '执行轨迹', d: '每一次工具调用都有完整轨迹：入参、返回、耗时、重试链路' },
  { t: '运行时信息', d: '内存、任务队列、插件状态——运行时细节随时可查' },
  { t: '故障排查', d: '工具调用失败时，展开即可定位是参数问题还是环境问题' }
];

export default function PageDevTools() {
  return (
    <div className="page-wrap pos-rel" style={{ position: 'relative' }}>
      <div className="page-bg" aria-hidden="true">
        <FaultyTerminal tint="#7A96FF" glyphs="characters" timeScale={0.3} glow={0.4} persistence={0.4} mouseStrength={0.12} />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p className="sec-label">EXPANDING CAPABILITIES · 特性四</p>
        <p className="scene-statement" style={{ marginTop: 18, color: '#F0F2FA' }}>
          开发者工具——<br />出问题时，<span className="dim2">你看得见内部</span>。
        </p>
        <div className="dt-grid" data-reveal>
          {TRACES.map(t => (
            <div className="dt-card" key={t.t}>
              <b>{t.t}</b>
              <span>{t.d}</span>
            </div>
          ))}
        </div>
        <div className="dt-visual" data-reveal>
          <div className="dt-viz-card">
            <div className="dt-viz-head">runtime · 任务监控</div>
            <div style={{ height: 210, position: 'relative' }}>
              <Radar color="#4D6BFE" mode="sweep" speed={1.2} trail={0.4} targets={7} lightMode={false} />
            </div>
          </div>
          <p className="eco-caption">执行轨迹与运行时监控 · 示意</p>
        </div>
      </div>
    </div>
  );
}
