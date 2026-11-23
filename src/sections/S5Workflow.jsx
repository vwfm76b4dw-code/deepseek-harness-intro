/* S5 适应你的工作方式：#workflow —— 随时发起 / 定时运行 / 进度掌握
   组件：PillNav（三签切换）· GlideSelect（场景选择）· HoldButton（长按执行）·
        FuseButton（批准/撤销）· loop-step（定时运行四步时间线，复用 global.css）
   事实源：官网「适应你的工作方式」节 + Web UI 指南 + apps/cli README */
import { useState, useEffect } from 'react';
import { PillNav, GlideSelect, HoldButton, FuseButton, GlowCursor } from '../rb/index.js';

const WF_TABS = [
  { label: '随时发起', href: '#wf-anytime' },
  { label: '定时运行', href: '#wf-schedule' },
  { label: '进度掌握', href: '#wf-progress' }
];

/* 场景取自官网「辅助日常工作」四事：整理资料 / 分析表格 / 撰写文档 / 制作汇报 */
const SCENES = [
  { value: '整理资料', desc: '把散落在工作区各处的资料归拢到一起：读取、分类、汇总，产出结构清晰的文档。' },
  { value: '分析表格', desc: '读取表格并按你的问题统计分析，结论与计算过程一并给出，可对话继续追问。' },
  { value: '撰写文档', desc: '从素材到成文：先列大纲、再逐节展开，任何一段都可以用对话修改。' },
  { value: '制作汇报', desc: '把一段工作整理成汇报：要点、数据、结论集中呈现，措辞与结构对话即可调整。' }
];

const STEPS = [
  { n: 'STEP 01', t: '设定计划', d: '为重复工作设定触发计划，任务内容一次写清。' },
  { n: 'STEP 02', t: '按计划触发', d: '到点自动发起会话，不必守时手动启动。' },
  { n: 'STEP 03', t: '执行并记录', d: '执行过程留下轨迹，每次工具调用有据可查。' },
  { n: 'STEP 04', t: '结果可查', d: '后台执行，进度与产出随时查看。' }
];

const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function S5Workflow() {
  const [tab, setTab] = useState(WF_TABS[0].href);
  const [scene, setScene] = useState(SCENES[0].value);
  const [liveStep, setLiveStep] = useState(1);

  /* 定时运行时间线：当前阶段每 2.4s 前进一步；reduced-motion 下静止 */
  useEffect(() => {
    if (REDUCED) return;
    const timer = setInterval(() => setLiveStep(s => (s + 1) % STEPS.length), 2400);
    return () => clearInterval(timer);
  }, []);

  const sceneDesc = (SCENES.find(s => s.value === scene) || SCENES[0]).desc;

  return (
    <section id="workflow" className="ld-section">
      {/* 光标辉光氛围：本 section 唯一持续运动元素（dim 压低；reduced-motion 全局隐藏） */}
      <div className="ld-ambient dim ld-glow-fill" aria-hidden="true">
        <GlowCursor theme="light" color="#4D6BFE" intensity={0.9} quality="medium" />
      </div>
      <p className="sec-label" data-reveal>YOUR WAY OF WORK · 适应你的工作方式</p>
      <h2 className="ld-h2" data-reveal>随时发起任务，让重复工作按计划执行</h2>
      <p className="ld-lead" data-reveal>
        随时发起任务，让重复工作按计划执行；掌握关键进展，按需展开工具调用详情。DeepSeek Harness
        适配你的工作方式——而不是你去适配它。
      </p>

      <div className="sb-tabs" data-reveal>
        <PillNav
          items={WF_TABS}
          activeHref={tab}
          theme="light"
          size="sm"
          layout="joined"
          hoverEffect="fill"
          indicator="pill"
          highlightColor="#4D6DFE"
          surface="solid"
          ariaLabel="工作方式切换"
          onItemClick={(item, index, event) => {
            event.preventDefault();
            setTab(item.href);
          }}
        />
      </div>

      {tab === WF_TABS[0].href && (
        <div className="sb-panel" key="anytime">
          <div className="sb-panel-grid">
            <div>
              <h3 className="sb-panel-title">对话即任务</h3>
              <ul className="sb-points">
                <li>
                  一句话把任务丢给 Agent：<b>描述你想要构建的内容</b>，用 <b>/调用指令</b> 发起命令，
                  用 <b>@文件</b> 或对话补充上下文。
                </li>
                <li>任务不分「等它有空」：会话里直接派发，Agent 在会话内接收、规划、调用工具并推进到完成。</li>
                <li>Agent 可以读取和编辑工作区文件、运行命令、委派工作并维护计划；超出当前权限策略的操作需要审批时，界面会先询问你。</li>
              </ul>
            </div>
            <div className="ld-card">
              <div className="sb-demo-stage">
                <GlideSelect
                  options={SCENES.map(s => ({ value: s.value, label: s.value }))}
                  value={scene}
                  onChange={setScene}
                  ariaLabel="选择日常工作场景"
                  size="sm"
                />
                <p className="sb-scene-desc">{sceneDesc}</p>
                <HoldButton fillColor="#4D6DFE" holdTime={1500} size="sm" doneLabel="已开始执行">
                  长按发起任务
                </HoldButton>
                <p className="sb-demo-hint">演示：切换场景查看这类任务怎么做，长按按钮发起一次执行。</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === WF_TABS[1].href && (
        <div className="sb-panel" key="schedule">
          <div className="sb-panel-grid">
            <div>
              <h3 className="sb-panel-title">重复工作按计划执行（schedule）</h3>
              <ul className="sb-points">
                <li>例如每日站会摘要、每周依赖巡检——设定计划后自动执行，不需要守时手动触发。</li>
                <li>耗时任务在后台执行：运行脚本、批量处理文件，后台执行、随时查看进度。</li>
                <li>计划任务的执行同样留下轨迹，每次工具调用都可回看、可排查。</li>
              </ul>
            </div>
            <div>
              <ol className="sb-loopflow">
                {STEPS.map((s, i) => (
                  <li className={`loop-step${i === liveStep ? ' live' : ''}`} key={s.n}>
                    <span className="n">{s.n}</span>
                    <h4>{s.t}</h4>
                    <p>{s.d}</p>
                  </li>
                ))}
              </ol>
              <p className="sb-demo-hint" style={{ marginTop: 16 }}>
                演示：一个计划任务从触发到完成，经历的四个阶段。
              </p>
            </div>
          </div>
        </div>
      )}

      {tab === WF_TABS[2].href && (
        <div className="sb-panel" key="progress">
          <div className="sb-panel-grid">
            <div>
              <h3 className="sb-panel-title">关键进展一目了然</h3>
              <ul className="sb-points">
                <li>任务进行到哪一步、卡在哪里，随时可查；工具调用详情按需展开，不必逐条翻记录。</li>
                <li>长会话由 compaction 压缩历史、会话持久化保存，上下文不随轮次丢失。</li>
                <li>超出当前权限策略的操作需要审批，Web UI 会先询问你。</li>
              </ul>
            </div>
            <div className="ld-card">
              <div className="sb-demo-stage">
                <FuseButton label="批准" undoLabel="撤销" doneLabel="已批准" fuseColor="#FF9500" undoWindow={3500} />
                <p className="sb-demo-hint">演示：批准一个待审批操作，引信燃尽前可以撤销。</p>
                <details className="sb-details">
                  <summary>工具调用详情 · 按需展开</summary>
                  <div className="sb-details-body">
                    <div className="ld-term">
                      <div className="ld-term-bar"><i /><i /><i /><span>tool-call · 演示</span></div>
                      <div className="ld-term-body">
                        <div><span className="c">[tool:fs-write]</span> 写入 summary.md</div>
                        <div><span className="ok">[ok]</span> 63ms · 参数已记录 · 返回可回放</div>
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}