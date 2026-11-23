/* S4 任务能力：#tasks —— 5 类任务（做什么/怎么做/成果预览）+ 任务循环 + 深色预览卡
   事实源（契约 §4）：
   - 官网「完成各类任务」段：整理文档、分析表格、编写代码，直接预览任务成果，并通过对话持续完善
   - 官网 5 类事项：写代码改仓库（理解项目/修复问题/开发功能/运行测试）· 查资料核对信息 · 耗时任务后台执行
   - docs/user/guide：Agent 可读写工作区文件、运行命令、维护计划；需审批的操作先询问
   组件（契约 §5）：SpotlightCard ×5（任务卡）· PixelCard ×1（深色预览卡）· loop-step 任务循环 */
import { SpotlightCard, PixelCard, GlareHover, ParticleText } from '../rb/index.js';

/* 5 类任务：每项 = 做什么 / 怎么做 / 成果如何预览 */
const TASKS = [
  {
    id: 'docs',
    title: '整理文档',
    what: '把散落在工作区的文件归拢、提炼，写成结构清晰的文档。',
    how: '在会话里说明目标，Agent 读取文件、整理要点、生成文档。',
    preview: '文档直接在任务里预览，措辞与结构可以继续对话修改。'
  },
  {
    id: 'sheets',
    title: '分析表格',
    what: '从表格数据里找规律、出结论，而不是只会读数字。',
    how: '读取表格、计算与比对，把结果汇总成结论。',
    preview: '表格与汇总直接预览，指标口径可以追问、可以改。'
  },
  {
    id: 'code',
    title: '编写代码',
    what: '理解项目、修复问题、开发功能、运行测试。',
    how: '读仓库、改代码、跑命令验证，改动始终可审查。',
    preview: '变更与运行结果直接查看，再对话迭代到满意。'
  },
  {
    id: 'facts',
    title: '查资料',
    what: '搜索资料、交叉核对，给结论也给来源。',
    how: '先检索、再多源比对，结论逐条标注出处。',
    preview: '带来源的结论直接预览，可逐条打开核对。'
  },
  {
    id: 'batch',
    title: '批量处理文件',
    what: '对大量文件执行重复操作：整理、转换、归档，一次说完，后台跑完。',
    how: '写成脚本后台执行，不占用你的注意力。',
    preview: '进度随时查看，处理结果逐项可查。'
  }
];

/* 任务循环：发起 → 执行 → 预览 → 对话精炼 */
const STEPS = [
  { n: '01', title: '发起', desc: '在对话里描述目标，选择模型与工作区。' },
  { n: '02', title: '执行', desc: 'Agent 规划步骤，调用插件推进任务。' },
  { n: '03', title: '预览', desc: '文档、表格、网页等成果直接预览。' },
  { n: '04', title: '对话精炼', desc: '用对话持续完善，直到满意。' }
];

export default function S4Tasks() {
  return (
    <section id="tasks" className="ld-section">
      <p className="sec-label" data-reveal>GET THINGS DONE · 完成各类任务</p>
      <h2 className="ld-h2" data-reveal>整理文档、分析表格、编写代码，直接预览成果</h2>
      <p className="ld-lead" data-reveal>
        五类常见任务的工作方式：每张卡片说清楚「做什么、怎么做、成果如何预览」。
        共同点是——成果直接预览，并通过对话持续完善。
      </p>

      {/* 章节粒子字 TASKS：旧 deck 同款用法，随指针散聚，本节唯一 canvas 持续元素 */}
      <div className="ld-pt-stage" data-reveal aria-hidden="true">
        <ParticleText
          text="TASKS"
          color="#C7CEEA"
          highlightColor="#4D6BFE"
          intro="gather"
          pointerRepel={30}
          density={3}
          particleSize={2}
          fontSize="clamp(3rem, 7vw, 4.5rem)"
        />
      </div>

      {/* 5 张任务卡 */}
      <div className="ld-grid cols2">
        {TASKS.map((t, i) => (
          <SpotlightCard
            key={t.id}
            className={`sa-task${t.id === 'batch' ? ' sa-col-full' : ''}`}
            theme="light"
            spotlightColor="#4D6BFE"
            intensity={0.13}
            softness={0.75}
            data-reveal
            data-delay={i % 3}
          >
            <h3>{t.title}</h3>
            <div className="sa-task-rows">
              <p>
                <span className="sa-tag">做什么</span>
                <span>{t.what}</span>
              </p>
              <p>
                <span className="sa-tag">怎么做</span>
                <span>{t.how}</span>
              </p>
              <p>
                <span className="sa-tag sa-tag-preview">成果预览</span>
                <span>{t.preview}</span>
              </p>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* 任务循环 */}
      <p className="sa-loop-label" data-reveal>一个任务的循环</p>
      <div className="sa-loop-row" data-reveal>
        {STEPS.map((s, i) => (
          <div className={`loop-step${i === 2 ? ' live' : ''}`} key={s.n}>
            <span className="n">{s.n}</span>
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>

      {/* 深色预览卡：全节唯一暗色块 */}
      <div data-reveal>
        <PixelCard
          className="sa-pixel"
          variant="blue"
          gap={10}
          speed={40}
          pixelSize={6}
          theme="dark"
          radius={20}
          introDelay={200}
          style={{ width: '100%', height: '232px' }}
        >
          <div className="sa-pixel-inner">
            <h3>直接预览，对话完善</h3>
            <p>
              整理文档、分析表格、编写代码——成果都能直接预览，并通过对话持续完善；
              耗时任务转入后台执行，进度随时查看。
            </p>
            <p className="sa-pixel-note">官网「完成各类任务」</p>
          </div>
        </PixelCard>
      </div>

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
            本节任务清单摘自 DeepSeek 官网 →
          </a>
        </GlareHover>
      </p>
    </section>
  );
}