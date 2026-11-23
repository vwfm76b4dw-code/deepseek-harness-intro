/* S8 任务进行时：#live —— 后台执行 / 进度可视化（任务树 · 运行信号 · 审批链路）
   事实源：官网能力段「处理耗时任务 —— 运行脚本、批量处理文件，后台执行、随时查看进度」；
   README（默认 127.0.0.1:3080）；Release notes（时间线插件：实验性）。
   组件：Radar · SloshGauge · PulseHeart · LatticeLoader · Counter · CursorGrid(.ld-ambient.dim)
   纪律：同屏氛围组件 ≤2（CursorGrid 背景 + Radar 主视觉）；GlowCursor 与 CursorGrid 职能重叠，省略。 */
import { Radar, SloshGauge, PulseHeart, LatticeLoader, Counter, CursorGrid } from '../rb/index.js';

export default function S8Live() {
  return (
    <section id="live" className="ld-section">
      <div className="ld-ambient dim" aria-hidden="true">
        <CursorGrid color="#8FA6FF" gridColor="#3A54D9" cellSize={52} gridOpacity={0.1} lightMode />
      </div>

      <p className="sec-label" data-reveal>WHILE IT RUNS · 任务进行时</p>
      <h2 className="ld-h2" data-reveal>后台执行，随时查看进度</h2>
      <p className="ld-lead" data-reveal>
        耗时任务不必守着屏幕：运行脚本、批量处理文件在后台继续执行，任务树、运行信号与审批链路随时可以查看——进度握在手里，人可以先离开。
      </p>

      <div className="sc-live-grid">
        {/* ① 任务树：任务范围 / 阻塞事项 / 进展报告 */}
        <div className="ld-card" data-reveal>
          <h3>任务树 <span className="sc-en">Task Tree</span></h3>
          <p>范围、阻塞与进展，一屏可读。</p>
          <ul className="sc-tree">
            <li className="sc-tree-node is-done">
              <span className="sc-tree-dot" aria-hidden="true" />
              <span className="sc-tree-text">整理资料目录</span>
              <span className="sc-tree-state">已完成</span>
            </li>
            <li className="sc-tree-node is-run">
              <span className="sc-tree-dot" aria-hidden="true" />
              <span className="sc-tree-text">批量重命名与归档</span>
              <span className="sc-tree-state">进行中</span>
            </li>
            <li className="sc-tree-node is-block">
              <span className="sc-tree-dot" aria-hidden="true" />
              <span className="sc-tree-text">两份草稿内容冲突，等待确认</span>
              <span className="sc-tree-state">阻塞事项</span>
            </li>
          </ul>
          <div className="sc-tree-report">
            <span className="sc-loader-box" aria-hidden="true">
              <LatticeLoader status="working" pattern="sweep" grid={4} shape="round" label="后台执行中" showTimer={false} />
            </span>
            <div className="sc-tree-report-body">
              <strong>进展报告</strong>
              <p>
                任务完成到哪一步、卡在哪个事项，报告随时可读；时间线插件可把任务过程按时间轴回放——该能力在 Release notes 中标注为
                <em>实验性功能</em>，可能随版本调整。
              </p>
              <span className="sc-exp-badge">实验性 · Experimental</span>
            </div>
          </div>
        </div>

        {/* ② 运行信号：计时环 / 脉冲表达「在跑」 */}
        <div className="ld-card" data-reveal data-delay="1">
          <h3>运行信号 <span className="sc-en">Signal</span></h3>
          <p>任务是否在跑，一眼可辨。</p>
          <div className="sc-signal-row">
            <div className="sc-signal-item">
              <SloshGauge defaultValue={62} width={200} height={128} unit="%" />
              <span className="sc-signal-cap">进度液体计 · 任务推进水位</span>
            </div>
            <div className="sc-signal-item">
              <PulseHeart defaultLiked showCount={false} label="运行中" size={40} />
              <span className="sc-signal-cap">脉冲心跳 · 在跑（点击可切换示意）</span>
            </div>
          </div>
          <div className="sc-kv">
            <span className="sc-kv-num">
              <Counter value={3080} direction="up" fontSize={22} fontWeight={700} minDigits={4} />
            </span>
            <span className="sc-kv-label">
              默认本地端口。Web UI 跑在 <code>127.0.0.1:3080</code>，任务没结束，服务就在——随时回来看进度。
            </span>
          </div>
          <p className="ld-note sc-live-note">以上为可视化示意，不对应任何真实统计。</p>
        </div>

        {/* ③ 审批链路：危险操作需人工批准 */}
        <div className="ld-card" data-reveal data-delay="2">
          <h3>审批链路 <span className="sc-en">Approval</span></h3>
          <p>危险操作，先问过人。</p>
          <ol className="sc-flow">
            <li className="sc-flow-step">
              <span className="sc-flow-num" aria-hidden="true">1</span>
              <div><strong>发起申请</strong><p>Agent 请求执行一项危险操作，说明理由与影响。</p></div>
            </li>
            <li className="sc-flow-step">
              <span className="sc-flow-num" aria-hidden="true">2</span>
              <div><strong>人工批准</strong><p>由你确认后才放行；未批准的操作不会执行。</p></div>
            </li>
            <li className="sc-flow-step">
              <span className="sc-flow-num" aria-hidden="true">3</span>
              <div><strong>执行并记录</strong><p>批准后继续执行，审批过程随任务轨迹留存。</p></div>
            </li>
          </ol>
          <p className="ld-note sc-live-note">桌面端与命令行共用同一套配置、会话与审批。</p>
        </div>
      </div>

      {/* 运行雷达：视觉示意，非统计 */}
      <div className="sc-radar-panel" data-reveal>
        <div className="sc-radar-stage">
          <Radar color="#4D6BFE" mode="sweep" speed={1.2} trail={0.4} targets={7} lightMode />
        </div>
        <div className="sc-radar-cap">
          <strong>运行雷达 · 扫描示意</strong>
          <p>
            任务在后台推进时，界面用雷达扫描、计时环与脉冲信号表达「仍在运行」；具体完成了多少、卡在哪里，以任务树与进展报告为准。此处为视觉示意，不代表任何统计数值。
          </p>
        </div>
      </div>
    </section>
  );
}