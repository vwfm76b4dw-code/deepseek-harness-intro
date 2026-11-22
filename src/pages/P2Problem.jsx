/* P2 问题：纯模型的困境 */
import { TextType } from '../rb/index.js';

const PAINS = [
  { t: '一切输入输出都是文本', d: '模型的世界里没有文件系统、没有终端、没有网络——它看过整个互联网，却打不开你桌面的一个文件夹。' },
  { t: '每个会话都是初见', d: '没有持久化的会话与记忆，关掉窗口就失忆。隔天的任务，它不记得昨天聊到哪一步。' },
  { t: '要么不敢做，要么没人拦', d: '没有权限分级与沙箱，敢做的操作没有隔离，危险的操作没有确认——企业环境里谁敢上？' }
];

export default function PageProblem() {
  return (
    <div className="page-wrap">
      <p className="sec-label">SELLING POINT 01 · 问题</p>
      <p className="scene-statement" style={{ marginTop: 18 }}>
        它读过整个互联网，
        <br />却打不开你桌面的一个文件夹。
        <br />
        <span className="dim">会写十种语言的代码，却没有一双能执行的手。</span>
      </p>
      <div className="pain-grid" data-reveal>
        {PAINS.map(p => (
          <div className="pain" key={p.t}>
            <b>{p.t}</b>
            <span>{p.d}</span>
          </div>
        ))}
      </div>
      <div className="sell-grid" style={{ textAlign: 'left' }} data-reveal>
        <div className="term-mini">
          <div className="thead"><span className="tdot" style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(255,255,255,0.14)' }} />你的仓库<span className="tag">没有 Harness</span></div>
          <div className="tbody">
            <TextType
              as="div"
              text={[
                '帮我把 pydantic 升到 2.10。',
                '可以的！步骤如下：1) 打开终端 2) 改版本号 3) 运行 pip install…',
                '需要我一步步指导你手动操作吗？'
              ]}
              typingSpeed={45}
              deletingSpeed={22}
              pauseDuration={2000}
              cursorStyle="bar"
            />
          </div>
        </div>
        <div className="term-mini">
          <div className="thead"><span className="tdot" style={{ width: 9, height: 9, borderRadius: '50%', background: '#34C759' }} />你的仓库<span className="tag">装上 Harness</span></div>
          <div className="tbody">
            <div><span className="u">$</span> dsh run upgrade-deps</div>
            <div className="ok">✓ pydantic 2.9 → 2.10 升级完成</div>
            <div className="ok">✓ 测试全绿 · PR 已备好</div>
            <div className="dim2">用时 4m12s · 全程无人值守</div>
          </div>
        </div>
      </div>
      <p className="scene-note" data-reveal style={{ maxWidth: 720 }}>
        这不是某个模型的缺陷，是所有"纯模型"的共同处境。<strong style={{ color: 'var(--ink)' }}>
        把会说话变成会干活，中间差的不是智力，是骨架。</strong>
      </p>
    </div>
  );
}
