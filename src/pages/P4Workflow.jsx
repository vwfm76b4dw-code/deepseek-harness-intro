/* P4 特性三：Adapt to your workflow（官方） */
import { useState, useEffect } from 'react';
import { LatticeLoader, Counter, HoldButton } from '../rb/index.js';

const SCHEDULES = [
  { t: '随时开始', d: '想到就派：一句话把任务丢给 Agent，不需要等它「空闲」' },
  { t: '定时运行', d: '每日站会摘要、每周依赖巡检——按计划自动执行' },
  { t: '进度追踪', d: '任务进行到哪一步、卡在哪里，面板上随时可查' },
  { t: '调用审计', d: '每次工具调用的细节都能展开检查，出问题有迹可循' }
];

export default function PageWorkflow() {
  const [live, setLive] = useState(37);
  useEffect(() => {
    const timer = setInterval(() => setLive(v => (v >= 92 ? 36 : v + 2)), 1400);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="page-wrap pos-rel" style={{ position: 'relative' }}>
      <div className="page-bg dim-bg" aria-hidden="true">
        <LatticeLoader status="working" pattern="sweep" grid={4} shape="round" />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p className="sec-label">EXPANDING CAPABILITIES · 特性三</p>
        <p className="scene-statement" style={{ marginTop: 18 }}>
          适配你的<span className="dim">工作流</span>——而不是你去适配它。
        </p>
        <div className="wf-grid" data-reveal>
          {SCHEDULES.map(s => (
            <div className="wf-card" key={s.t}>
              <b>{s.t}</b>
              <span>{s.d}</span>
            </div>
          ))}
        </div>
        <div className="wf-demo" data-reveal>
          <div className="wf-demo-row">
            <span className="wf-chip">09:30 · 站会摘要已生成</span>
            <span className="wf-chip">14:00 · 依赖巡检完成（2 项可升级）</span>
            <span className="wf-chip blue">当前负载 <Counter value={live} direction="up" fontSize={13} fontWeight={600} minDigits={2} />%</span>
          </div>
          <div className="wf-demo-row">
            <HoldButton fillColor="#4D6BFE" holdTime={1500} size="sm" doneLabel="已批准">长按批准临时任务</HoldButton>
            <span className="wf-note">危险或超出授权的任务，需要你长按确认</span>
          </div>
        </div>
      </div>
    </div>
  );
}
