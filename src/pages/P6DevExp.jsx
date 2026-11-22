/* P6 开发者体验：一条命令启动（官方） */
import { TextType, Counter, HoldButton, SplitText } from '../rb/index.js';

export default function PageDevExp() {
  return (
    <div className="page-wrap pos-rel" style={{ position: 'relative' }}>
      <div className="page-bg" aria-hidden="true">
        <TextType
          as="div"
          text={['npm install', 'npx @deepseek-ai/dsh web', 'Harness ready → http://localhost:7777']}
          typingSpeed={38}
          deletingSpeed={18}
          pauseDuration={2200}
          cursorStyle="bar"
        />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p className="sec-label">DEVELOPER EXPERIENCE · 开发者体验</p>
        <p className="scene-statement" style={{ marginTop: 18 }}>
          一条命令，<br />Web UI <span className="dim">立即启动</span>。
        </p>
        <div className="cmd-cards" data-reveal>
          <div className="cmd-card">
            <div className="cmd-head">Start with one command · 先装 Node.js</div>
            <div className="cmd-body">
              <span className="u">$</span> npx @deepseek-ai/dsh web
              <div className="ok">✓ Web UI → http://localhost:7777</div>
            </div>
          </div>
          <div className="cmd-card">
            <div className="cmd-head">Install from source · 源码安装</div>
            <div className="cmd-body">
              <span className="u">$</span> git clone https://github.com/deepseek-ai/deepseek-harness
              <div className="dim2">跟随仓库内的 setup 说明完成配置</div>
            </div>
          </div>
        </div>
        <div className="dev-meta" data-reveal>
          <div className="dev-meta-row">
            <span className="mini-chip">装完即用 · Web UI</span>
            <span className="mini-chip">源码完全开放</span>
            <span className="mini-chip">插件 API 持续演进</span>
          </div>
          <p className="scene-note" style={{ maxWidth: 700 }}>
            Node.js 装好后，一条 npx 命令就能把 Web UI 跑起来；
            想深入内核，直接克隆完整源码——<strong style={{ color: 'var(--ink)' }}>open source, 每一行都看得见</strong>。
          </p>
        </div>
      </div>
    </div>
  );
}
