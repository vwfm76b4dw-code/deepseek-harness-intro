/* S2 认识 DSH：#what —— 官方自我介绍 + 心智模型 + 5 类事项
   事实源（契约 §4）：
   - 官网 https://www.deepseek.com/zh/harness/ 「认识 DeepSeek Harness」：自我介绍段原文、5 类事项、结尾句
   - README.zh.md：开源 agent harness · Cordis 驱动 · 一切皆插件
   - docs/user/guide：Agent 可读写工作区文件、运行命令、维护计划；设置 → 模型可配置模型
   组件（契约 §5）：CurvedLoop（关键词 marquee）· GradientText（标题强调字）
                   GlassSurface（自我介绍毛玻璃卡）· SpotlightCard（等式卡，theme light）
                   GlareHover（来源链接扫光） */
import { CurvedLoop, GradientText, GlassSurface, SpotlightCard, GlareHover } from '../rb/index.js';

/* 官网「我可以帮你」5 条，逐条转写为「做什么 / 成果」 */
const HELPS = [
  {
    id: 'daily',
    title: '辅助日常工作',
    what: '整理资料、分析表格、撰写文档、制作汇报——日常办公的四类杂事，交给 Agent。',
    out: '拿到结构清晰的资料、表格分析、文档与汇报。'
  },
  {
    id: 'code',
    title: '写代码、改仓库',
    what: '理解项目、修复问题、开发功能、运行测试。',
    out: '得到可审查的代码变更和测试结果。'
  },
  {
    id: 'facts',
    title: '查资料、核对信息',
    what: '搜索资料、交叉查证，不止给答案，也给依据。',
    out: '拿到有来源、可核对的结论。'
  },
  {
    id: 'bg',
    title: '处理耗时任务',
    what: '运行脚本、批量处理文件，后台执行，不用一直守着。',
    out: '任务在后台推进，进度随时查看。'
  },
  {
    id: 'plugin',
    title: '安装插件、扩展能力',
    what: '使用现有插件，或编写自己的插件，定制适合你的工作方式。',
    out: '得到一套随装随用、贴近你习惯的能力组合。'
  }
];

export default function S2What() {
  return (
    <section id="what" className="ld-section">
      <p className="sec-label" data-reveal>MEET DSH · 认识 DeepSeek Harness</p>
      <h2 className="ld-h2" data-reveal>
        开源的 harness 架构，
        <GradientText
          colors={['#4D6BFE', '#7A96FF', '#B497CF']}
          animationSpeed={6}
          variant="flow"
          yoyo
          style={{ fontSize: 'inherit' }}
        >
          一切皆插件
        </GradientText>
      </h2>
      <p className="ld-lead" data-reveal>
        DeepSeek Harness（dsh）是 DeepSeek 开源的一款 agent harness：基于 Cordis 的「一切皆插件」架构构建，
        既可以是桌面应用，也可以通过代码启动为网页。这一节先讲清楚三件事——它是谁、Agent 是什么、它能帮你做什么。
      </p>

      {/* 关键词环形 marquee：全节唯一持续运动的元素 */}
      <div className="sa-loop" data-reveal>
        <CurvedLoop
          marqueeText="开源 ✦ 一切皆插件 ✦ 桌面应用 ✦ 网页启动 ✦ 随装随用 ✦ "
          shape="arc"
          speed={2}
          curveAmount={140}
          fontSize={28}
          fontWeight={700}
          edgeFade={0.5}
          color="#4D6BFE"
        />
      </div>

      {/* 官方自我介绍（毛玻璃卡） */}
      <div data-reveal>
        <GlassSurface
          className="sa-intro"
          width="100%"
          height="auto"
          borderRadius={20}
          refraction={false}
          backgroundOpacity={0.08}
          saturation={1.15}
        >
          <div className="sa-intro-inner">
            <p className="sa-quote">
              “我是 DeepSeek Harness，DeepSeek 开源的 harness 架构，基于 Cordis 的「一切皆插件」架构构建。
              我既可以是桌面应用，也可以通过代码启动为网页。”
            </p>
            <p className="sa-quote-src">—— 引自官网「认识 DeepSeek Harness」的自我介绍（开发者预览版）</p>
          </div>
        </GlassSurface>
      </div>

      {/* 心智模型：Agent = Model + Harness */}
      <p className="eq-line sa-eq-line" data-reveal>
        Model <span className="op">+</span> Harness <span className="op">=</span> Agent
      </p>
      <div className="ld-grid cols2">
        <SpotlightCard
          className="sa-eq-card"
          theme="light"
          spotlightColor="#4D6BFE"
          intensity={0.14}
          softness={0.75}
          data-reveal
        >
          <h3>裸模型（Model）</h3>
          <p className="sa-eq-tag">只剩知识与推理</p>
          <ul className="sa-eq-list">
            <li>输入输出停留在文本层面：不能读文件、不能跑命令，也记不住上一次聊到哪。</li>
            <li>能力边界由模型本身决定——换一个模型，等于换一个脑子。</li>
          </ul>
        </SpotlightCard>
        <SpotlightCard
          className="sa-eq-card"
          theme="light"
          spotlightColor="#4D6BFE"
          intensity={0.14}
          softness={0.75}
          data-reveal
          data-delay="1"
        >
          <h3>模型 + Harness</h3>
          <p className="sa-eq-tag">让模型真正动手的运行时</p>
          <ul className="sa-eq-list">
            <li>读写工作区文件、运行命令，在会话中保持上下文，按计划把任务推进到底。</li>
            <li>模型可在设置中配置、更换；能力靠插件随装随用，而不是写死在代码里。</li>
          </ul>
        </SpotlightCard>
      </div>
      <p className="sa-eq-note" data-reveal>
        Agent 的上限由两边共同决定：模型负责思考，Harness 负责动手——这也是 Harness 与模型必须解耦的原因。
      </p>

      {/* 5 类事项 */}
      <div className="ld-grid cols2">
        {HELPS.map((h, i) => (
          <div
            className={`ld-card sa-help${h.id === 'plugin' ? ' sa-col-full' : ''}`}
            key={h.id}
            data-reveal
            data-delay={i % 3}
          >
            <h3>{h.title}</h3>
            <p className="sa-help-what">{h.what}</p>
            <p className="sa-help-out">
              <span className="sa-help-out-tag">成果</span>
              <span>{h.out}</span>
            </p>
          </div>
        ))}
      </div>

      <p className="sa-close" data-reveal>更多事情，都可以交给我。</p>
      <p className="sa-src" data-reveal>
        <GlareHover
          width="auto"
          borderRadius="999px"
          glareColor="#4D6BFE"
          glareOpacity={0.4}
          background="var(--surface)"
          borderColor="var(--hairline)"
        >
          <a href="https://www.deepseek.com/zh/harness/" target="_blank" rel="noopener noreferrer">
            以上自我介绍与 5 类事项摘自 DeepSeek 官网 →
          </a>
        </GlareHover>
      </p>
    </section>
  );
}