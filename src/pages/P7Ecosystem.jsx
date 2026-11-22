/* P7 插件生态：Join the DSH plugin ecosystem（官方） */
import { useState, useEffect } from 'react';
import { CardSwap, Counter, Card, SplitText } from '../rb/index.js';

const REPORTS = [
  { text: <>核心插件与 API 持续演进中——公测期间的每一次反馈，都可能变成下一个版本的默认行为。</>, meta: 'Core Plugins · 持续演进' },
  { text: <>Creator mode 让插件 creation 变成一段对话——社区里已经有人把自己团队的流程做成了插件。</>, meta: 'Creator Mode · 社区共创' },
  { text: <>open source · reusable · composable：三层承诺写在官方介绍里——一起探索智能的边界。</>, meta: 'Explore the limits of intelligence' }
];

export default function PageEcosystem() {
  const [uptime, setUptime] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setUptime(v => v + 1), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="page-wrap pos-rel" style={{ position: 'relative' }}>
      <div className="page-bg dim-bg" aria-hidden="true">
        <SplitText text="ECOSYSTEM" effect="rise" splitType="chars" trigger="load" duration={1.2} tag="div" className="eco-bg-word" />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p className="sec-label">JOIN THE DSH PLUGIN ECOSYSTEM · 插件生态</p>
        <p className="scene-statement" style={{ marginTop: 18 }}>
          一起探索<span className="dim">智能的边界</span>。
        </p>
        <div className="eco" data-reveal>
          <div className="eco-text">
            <h3>公测进行中 · 邀请共建</h3>
            <p>
              DeepSeek Harness 处于 public preview 阶段，核心插件与 API 持续演进。
              官方邀请全球用户与开发者，通过开源、可复用、可组合的基础设施共同参与。
            </p>
            <ul className="eco-point">
              <li>open source：每一行代码都公开可审计</li>
              <li>reusable：插件写一次，任何 Harness 都能装</li>
              <li>composable：插件之间自由组合成新能力</li>
            </ul>
          </div>
          <div data-reveal>
            <div className="chat-card">
              <div className="chat-head">
                <span className="avatar">🐋</span>
                DSH Plugin Ecosystem
                <span className="chat-up">
                  预览期 <Counter value={uptime} direction="up" fontSize={11} fontWeight={600} minDigits={3} fade={0.05} duration={0.4} /> 秒
                </span>
              </div>
              <div className="chat-swap">
                <CardSwap width={310} height={168} cardDistance={42} verticalDistance={50} skewAmount={5} autoplay delay={2800} speed={1} cardRadius={12} theme="light" pauseOnHover>
                  {REPORTS.map((r, i) => (
                    <Card key={i}><div className="swap-bubble">{r.text}<div className="meta">{r.meta}</div></div></Card>
                  ))}
                </CardSwap>
              </div>
            </div>
            <p className="eco-caption">生态动态轮播 · 内容摘自官方介绍 · 悬停暂停</p>
          </div>
        </div>
      </div>
    </div>
  );
}
