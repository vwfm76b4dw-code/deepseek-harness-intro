/* S10 常见问题：#faq —— accordion（预览版与破坏性变更 / 安全说明 / 桌面端与网页 / MIT 许可证 / 参与贡献 / 模型接入）
   事实源：README（developer preview、compatibility-breaking changes、MIT、THIRD_PARTY_NOTICES.md、
   CONTRIBUTING.md、Discussions、dsh-plugin topic）；官网（桌面应用 / 网页双形态）。
   组件：FuzzyText（话题标签，保留既有 chip） */
import { FuzzyText } from '../rb/index.js';

const FAQ = [
  {
    q: 'DSH 现在处于什么阶段？',
    a: (
      <>
        <p>
          开发者预览（developer preview）阶段，迭代很快。官方明确提醒：<strong>未来会有兼容性破坏性变更</strong>——接口、配置与插件形态都可能调整。不建议直接用于关键生产环境；升级前留意版本说明。
        </p>
      </>
    )
  },
  {
    q: '使用安全吗？',
    a: (
      <>
        <p>
          运行前请先阅读仓库中的安全说明 <code>SAFETY.zh.md</code>，以其中列出的边界与注意事项为准。危险操作需人工批准后才执行，未批准的操作不会执行；审批过程随任务轨迹留存。
        </p>
      </>
    )
  },
  {
    q: '桌面端和网页什么关系？',
    a: (
      <>
        <p>
          同一底座的三种形态。网页 / 命令行用 <code>npx @deepseek-ai/dsh web</code> 启动，默认跑在 <code>127.0.0.1:3080</code>；桌面端是仓库内的 Electron profile（<code>@deepseek-ai/dsh-desktop</code>，随 Releases 分发）。web / tui / desktop 是同一个 launcher 的 profile，共享同一份配置（<code>$DSH_HOME/cordis.patch.yml</code>）与审批链路——换姿势，不换进度。
        </p>
      </>
    )
  },
  {
    q: '许可证是什么？',
    a: (
      <>
        <p>
          MIT。你可以自由使用、修改与再分发；第三方依赖及其许可证在仓库的 <code>THIRD_PARTY_NOTICES.md</code> 中披露。
        </p>
      </>
    )
  },
  {
    q: '怎么参与贡献？',
    a: (
      <>
        <p>
          通过 GitHub Discussions 提交反馈与缺陷报告；为你的插件仓库添加 <code>dsh-plugin</code> 话题增加曝光；贡献方式见 <code>CONTRIBUTING.md</code>，入门路径见开发者文档站。
        </p>
      </>
    )
  },
  {
    q: '能用什么模型？',
    a: (
      <>
        <p>
          DSH 支持配置模型服务商与模型接入。可用模型的清单与配置方式随版本演进，这里不做罗列——以官方文档和当前版本为准，避免过期信息误导你。
        </p>
      </>
    )
  }
];

export default function S10Faq() {
  return (
    <section id="faq" className="ld-section">
      <p className="sec-label" data-reveal>FAQ · 常见问题</p>
      <h2 className="ld-h2" data-reveal>开始之前，你可能想问</h2>
      <p className="ld-lead" data-reveal>
        关于阶段、安全、许可证与参与方式的直接回答；更详细的说明，以仓库与官方文档为准。
      </p>

      <div className="ld-faq">
        {FAQ.map((item, i) => (
          <details key={item.q} data-reveal>
            <summary>{item.q}</summary>
            <div className="sc-faq-answer">{item.a}</div>
          </details>
        ))}
      </div>

      <div className="ld-chips" data-reveal style={{ justifyContent: 'flex-start', marginTop: 24 }}>
        <span className="ld-chip"><FuzzyText fontSize={13} fontWeight={600} baseIntensity={0.16} hoverIntensity={0.42} color="#1D1D1F">dsh-plugin</FuzzyText></span>
        <span className="ld-chip">GitHub Discussions</span>
        <span className="ld-chip">MIT</span>
      </div>
    </section>
  );
}