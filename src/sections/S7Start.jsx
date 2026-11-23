/* S7 命令启动：#start —— npx 启动 / 源码构建 / 前置条件 / GUI 与 TUI 同一底座
   组件：GlideSelect（启动方式切换）· ld-term 代码块（样式复用 landing.css）
   事实源：README.zh.md（命令/端口/--no-open/SSH/pnpm 四步）+ npm registry engines
        + apps/cli README（profile / $DSH_HOME / 审批）+ 仓库 package.json（pnpm 锁定） */
import { useState } from 'react';
import { GlideSelect } from '../rb/index.js';

const MODES = {
  npx: {
    label: 'npx 启动',
    bar: 'dsh · npx',
    lines: [
      { cls: 'c', text: '$ npx @deepseek-ai/dsh web' },
      { cls: 'ok', text: '✓ Web UI → http://127.0.0.1:3080' },
      { cls: 'p', text: '  本机启动时，自动用默认浏览器打开页面' },
      { cls: 'c', text: '$ npx @deepseek-ai/dsh web --no-open' },
      { cls: 'ok', text: '✓ 仅启动服务，不打开浏览器' },
      { cls: 'p', text: '  通过 SSH 启动时，只打印宿主机 URL —— 本地转发地址由 SSH 客户端或编辑器持有' }
    ],
    note: 'dsh 进程会把启动时所在的目录作为默认文件系统位置；新的 Web UI 在添加工作区前，不会选中任何工作区。'
  },
  src: {
    label: '源码构建',
    bar: 'dsh · source',
    lines: [
      { cls: 'c', text: '$ git clone https://github.com/deepseek-ai/deepseek-harness.git' },
      { cls: 'c', text: '$ cd deepseek-harness' },
      { cls: 'c', text: '$ pnpm install' },
      { cls: 'c', text: '$ pnpm run build' },
      { cls: 'p', text: '# pnpm run build 准备仓库产物' },
      { cls: 'c', text: '$ pnpm dsh web' },
      { cls: 'p', text: '# pnpm dsh web 直接使用这些已构建产物，不会重新构建' }
    ],
    note: '生产运行需要已构建的包与前端产物：pnpm run build 先准备，pnpm dsh web 复用，不重复构建。'
  }
};

const MODE_OPTIONS = [
  { value: 'npx', label: 'npx 启动' },
  { value: 'src', label: '源码构建' }
];

export default function S7Start() {
  const [mode, setMode] = useState('npx');
  const m = MODES[mode];

  return (
    <section id="start" className="ld-section">
      <p className="sec-label" data-reveal>GET STARTED · 命令启动</p>
      <h2 className="ld-h2" data-reveal>安装 Node.js 后，一条命令启动</h2>
      <p className="ld-lead" data-reveal>
        <code>npx @deepseek-ai/dsh web</code> 默认在 <code>http://127.0.0.1:3080</code> 启动 Web UI，
        本机启动时用默认浏览器打开；<code>--no-open</code> 仅启动服务、不打开浏览器；
        SSH 启动只打印宿主机 URL。想深入内核，也可以从源码构建。
      </p>

      <div className="sb-start-grid">
        <div className="sb-start-main">
          <div className="sb-term-switch">
            <GlideSelect
              options={MODE_OPTIONS}
              value={mode}
              onChange={setMode}
              ariaLabel="选择启动方式"
              size="sm"
            />
            <span className="ld-note">切换启动方式</span>
          </div>

          <div className="ld-term">
            <div className="ld-term-bar"><i /><i /><i /><span>{m.bar}</span></div>
            <div className="ld-term-body">
              {m.lines.map((l, i) => (
                <div key={i} className={l.cls || undefined}>{l.text}</div>
              ))}
            </div>
          </div>
          <p className="ld-note">{m.note}</p>
        </div>

        <div className="sb-start-side">
          <div className="ld-card" data-reveal>
            <h3>前置条件</h3>
            <div className="sb-kv">
              <div className="sb-kv-row">
                <span className="sb-kv-key">Node.js</span>
                <span className="sb-kv-val">≥ 24.9.0（<code>@deepseek-ai/dsh</code> 当前发布版的 engines 要求）</span>
              </div>
              <div className="sb-kv-row">
                <span className="sb-kv-key">包管理器</span>
                <span className="sb-kv-val">npx 随 Node 附带；源码构建另需 pnpm（仓库锁定 <code>pnpm@11.28.5</code>）</span>
              </div>
              <div className="sb-kv-row">
                <span className="sb-kv-key">版本管理</span>
                <span className="sb-kv-val">源码构建另需 git</span>
              </div>
            </div>
            <details className="ld-expand">
              <summary>版本号从哪来？</summary>
              <div className="ld-expand-body"><code>engines</code> 声明写在仓库根 <code>package.json</code> 与 <code>@deepseek-ai/dsh</code> 的 npm 发布记录中（自 0.2.2-alpha.3 起为 <code>>=24.9.0</code>）；<code>npx</code> 默认取最新发布版。</div>
            </details>
          </div>

          <div className="ld-card" data-reveal data-delay="1">
            <h3>GUI 与 TUI，同一份底座</h3>
            <p>
              Web UI、桌面端（Electron）与 TUI 都是同一 launcher（<code>dsh</code>）的 profile，
              共享 <code>$DSH_HOME</code> 下的配置与会话；超出当前权限策略的操作需要审批时，
              在 Web UI 与终端中都会先询问你。
            </p>
            <details className="ld-expand">
              <summary>profile 是什么意思？</summary>
              <div className="ld-expand-body">同一个 <code>dsh</code> 可执行入口，差异只在启动时加载的界面层；配置树（<code>$DSH_HOME/cordis.patch.yml</code>）是同一个文件，会话与审批链路随之共享。</div>
            </details>
          </div>

          <div className="ld-card" data-reveal data-delay="2">
            <h3>开发者预览</h3>
            <p>
              DeepSeek Harness 处于开发者预览阶段，正在快速迭代，未来将出现破坏兼容性的变更；
              运行前请阅读安全说明。项目以 MIT 许可证开源。
            </p>
            <details className="ld-expand">
              <summary>升级前注意什么？</summary>
              <div className="ld-expand-body">破坏性变更可能涉及接口、配置与插件形态——升级前先读版本说明与 <code>SAFETY.zh.md</code>；第三方依赖及其许可在 <code>THIRD_PARTY_NOTICES.md</code> 披露。</div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}