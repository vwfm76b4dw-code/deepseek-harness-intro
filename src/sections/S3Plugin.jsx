/* S3 一切皆插件：#plugin —— 架构解释 / 插件三类扩展 / Creator mode / 插件市场
   事实源（契约 §4）：
   - 官网「一切皆插件」段：安装现有插件，或在「创造模式」中通过对话创建插件，扩展工具、技能和界面
   - README.zh.md：构建于「一切皆插件」架构之上，由 Cordis 驱动，设计参见 arXiv:2608.25512
   - 论文 arXiv:2608.25512《A Programming Paradigm for Spatiotemporal Composability》（2026-08-26 提交，北大 × DeepSeek-AI）
   - Releases v0.2.3-alpha.1：插件市场支持添加 Git 仓库作为插件来源，私有仓库中的插件也能浏览和安装
   - README：npx @deepseek-ai/dsh web → 默认 127.0.0.1:3080，--no-open 不打开浏览器
   组件（契约 §5）：TiltedCard ×3（工具/技能/界面）· CallChip（工具调用 chips）· GhostCursor（dim 氛围层） */
import { TiltedCard, CallChip, GhostCursor } from '../rb/index.js';

/* 插件可扩展的三类：官网口径为「工具、技能和界面」 */
const PLUGIN_KINDS = [
  {
    id: 'tool',
    en: 'TOOLS',
    cn: '工具',
    desc: '读写工作区文件、运行命令、调用接口——模型借助工具真正动手，每次调用都有记录、可按需展开。',
    demo: 'read_file · bash · web_search'
  },
  {
    id: 'skill',
    en: 'SKILLS',
    cn: '技能',
    desc: '把一类任务的完成方式封装成可复用单元，需要时调用，不必每次从零叮嘱。',
    demo: '文档整理 · 表格分析 · 资料查证'
  },
  {
    id: 'ui',
    en: 'INTERFACE',
    cn: '界面',
    desc: '插件也可以贡献界面：面板、视图与交互组件，直接长在 Harness 里。',
    demo: '插件市场 · 设置面板 · 任务视图'
  }
];

/* 工具调用形式示意（非真实运行记录） */
const TOOL_CALLS = [
  { icon: 'file', name: 'read_file', argument: '调研报告.docx' },
  { icon: 'terminal', name: 'bash', argument: 'pnpm build' },
  { icon: 'search', name: 'web_search', argument: '时空可组合性 论文' }
];

export default function S3Plugin() {
  return (
    <section id="plugin" className="ld-section">
      {/* 氛围层：幽灵光标压低存在感，不拦截指针 */}
      <div className="ld-ambient dim" aria-hidden="true">
        <GhostCursor theme="light" color="#4D6BFE" size={54} trailLength={38} />
      </div>

      <p className="sec-label" data-reveal>EVERYTHING IS A PLUGIN · 一切皆插件</p>
      <h2 className="ld-h2" data-reveal>安装现有插件，或用对话创建插件</h2>
      <p className="ld-lead" data-reveal>
        DeepSeek Harness 由{' '}
        <a href="https://github.com/cordiverse/cordis" target="_blank" rel="noopener noreferrer">Cordis</a>{' '}
        驱动，其架构设计见于论文{' '}
        <a href="https://arxiv.org/abs/2608.25512" target="_blank" rel="noopener noreferrer">
          《A Programming Paradigm for Spatiotemporal Composability》
        </a>
        （arXiv:2608.25512）。论文把「可组合」拆成两个维度：移除组件时副作用可以完全回滚（时间维度），
        组件间的依赖可以被声明并响应式管理（空间维度）。落到产品上，就是插件可以随时安装、卸载与替换。
      </p>

      {/* 插件三类扩展 */}
      <div className="ld-grid cols3">
        {PLUGIN_KINDS.map((k, i) => (
          <div data-reveal key={k.id} data-delay={i % 3}>
            <TiltedCard
              className="sa-tilt"
              containerWidth="100%"
              containerHeight="248px"
              imageWidth="100%"
              imageHeight="100%"
              rotateAmplitude={12}
              scaleOnHover={1.03}
              showTooltip={false}
              radius={16}
              introDelay={i * 120}
            >
              <div className="sa-plug">
                <p className="sa-plug-en">{k.en}</p>
                <h3>{k.cn}</h3>
                <p className="sa-plug-desc">{k.desc}</p>
                <p className="sa-plug-demo">{k.demo}</p>
              </div>
            </TiltedCard>
          </div>
        ))}
      </div>

      {/* 工具调用示意 */}
      <div className="sa-calls" data-reveal>
        <p className="sa-calls-label">插件落地之后，就是一次次具体的工具调用：</p>
        <div className="sa-calls-row">
          {TOOL_CALLS.map(c => (
            <CallChip
              key={c.name}
              icon={c.icon}
              name={c.name}
              argument={c.argument}
              status="done"
              showTimer
              surfaceColor="#EEF1FF"
              color="#3A54D9"
              progressColor="#4D6BFE"
            />
          ))}
        </div>
        <p className="sa-note">以上为工具调用形式示意，非真实运行记录。</p>
      </div>

      {/* 创造模式 + 插件市场 */}
      <div className="ld-grid cols2">
        <div className="ld-card sa-feature" data-reveal>
          <h3>创造模式（Creator mode）</h3>
          <p>
            安装现有插件，或在「创造模式」中通过对话创建插件：描述你想要构建的内容，
            插件在对话中成型——不会写代码，也能做出一件自己的工具。
          </p>
        </div>
        <div className="ld-card sa-feature" data-reveal data-delay="1">
          <h3>插件市场</h3>
          <p>
            插件市场支持添加 Git 仓库作为插件来源，私有仓库中的插件也能浏览和安装
            （Release v0.2.3-alpha.1）。安装前会显示版本来源：npm 包、注册表，或 Git 仓库与提交。
          </p>
        </div>
      </div>

      {/* 安装方式 */}
      <div className="sa-install" data-reveal>
        <p className="sa-install-label">安装方式</p>
        <div className="sa-install-row">
          <code className="sa-code">npx @deepseek-ai/dsh web</code>
          <span className="sa-install-or">或</span>
          <span className="sa-install-market">在插件市场中搜索安装</span>
        </div>
        <p className="sa-note">
          npx 一行启动 Web UI，默认地址 127.0.0.1:3080，传入 --no-open 可只开服务器、不打开浏览器（README）。
          桌面端与源码安装的完整说明见 <a href="#start">命令启动</a> 一节。
        </p>
      </div>

      <p className="sa-paper" data-reveal>
        架构出处：<a href="https://arxiv.org/abs/2608.25512" target="_blank" rel="noopener noreferrer">
          A Programming Paradigm for Spatiotemporal Composability
        </a> · arXiv:2608.25512 · 2026 年 8 月提交 · 作者来自北京大学与 DeepSeek-AI · Cordis 是论文思想的参考实现。
      </p>
    </section>
  );
}