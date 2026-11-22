/* P4 六大决定（信息量做满的 bento） */
import { useState, useEffect } from 'react';
import { SpotlightCard, CallChip, LatticeLoader, HoldButton, Counter } from '../rb/index.js';
import { Icons } from '../icons.jsx';

function MultiTaskDemo() {
  const [status, setStatus] = useState('running');
  useEffect(() => {
    const timer = setInterval(() => setStatus(s => (s === 'running' ? 'done' : s === 'done' ? 'error' : 'running')), 2400);
    return () => clearInterval(timer);
  }, []);
  return <CallChip icon="terminal" status={status} expectedMs={2200} showTimer />;
}

function AlwaysOnDemo() {
  const [uptime, setUptime] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setUptime(v => v + 1), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <span className="memory-count">
      已连续在线 <Counter value={uptime} direction="up" fontSize={20} fontWeight={700} minDigits={3} fade={0.08} duration={0.4} /> 秒
    </span>
  );
}

const CARDS = [
  {
    icon: 'plugin', title: '一切皆插件',
    body: '模型、工具、存储、审批、沙箱、界面——六类组件全部可插拔。不满意的部件，换掉就行：Agent 的身体，由你决定。'
  },
  {
    icon: 'nodes', title: 'Cordis 驱动',
    body: '基于 Cordis 插件内核：依赖自动装配，生命周期统一管理，插件之间互不打架。加一个插件，不需要读别人的代码。'
  },
  {
    icon: 'stack', title: 'OS 式多任务',
    body: '像操作系统调度进程一样调度多个 Agent 任务，并行推进，互不阻塞。', demo: 'multitask'
  },
  {
    icon: 'pulse', title: '永远在线',
    body: '不是一问一答的工具，而是常驻运行的服务：定时巡检、事件响应、主动汇报。', demo: 'alwayson'
  },
  {
    icon: 'shield', title: '安全分层',
    body: '沙箱隔离 + 权限审批双闸门。危险操作先停下来，过人这一关再执行。', demo: 'safety'
  },
  {
    icon: 'branch', title: 'MIT 开源',
    body: '自托管、可审计、可魔改。你的 Agent，跑在你自己的机器上，数据不出你的门。'
  }
];

export default function PagePrinciples() {
  return (
    <div className="page-wrap">
      <p className="sec-label">SELLING POINT 03 · 为"长期运行"做的六个决定</p>
      <div className="bento" data-reveal>
        {CARDS.map(c => {
          const Icon = Icons[c.icon];
          return (
            <SpotlightCard key={c.title} className="bento-card" theme="light" spotlightColor="#4D6BFE" intensity={0.13} softness={0.75}>
              <span className="bento-icon"><Icon /></span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              {c.demo === 'multitask' && <div className="bento-demo"><MultiTaskDemo /></div>}
              {c.demo === 'alwayson' && <div className="bento-demo"><AlwaysOnDemo /></div>}
              {c.demo === 'safety' && (
                <div className="bento-demo">
                  <HoldButton fillColor="#4D6BFE" holdTime={1500} size="sm" doneLabel="已放行">长按放行</HoldButton>
                </div>
              )}
            </SpotlightCard>
          );
        })}
      </div>
      <p className="scene-note" data-reveal style={{ maxWidth: 720, marginTop: 30 }}>
        第 3、4、5 张卡不是示意图——那三个小组件现在就在跑。这是 Harness 的工作方式：
        <strong style={{ color: 'var(--ink)' }}>能力长在插件上，插件长在插槽里，随时热插拔。</strong>
        LatticeLoader 与 CallChip 也一样，都是可替换的部件。
      </p>
    </div>
  );
}
