/* S6 开发者工具：#devtools —— 执行轨迹 / 详细运行信息 / 问题排查
   组件：LetterGlitch（.ld-ambient.dim 氛围）· TechText（技术标签）·
        ld-term（模拟执行轨迹，样式复用 landing.css）· FaultyTerminal（运行信号氛围）· Counter（轨迹计数）
   事实源：官网「开发者工具」节原话 + npm 发布依赖（token-meter / session-persistence-jsonl /
        experimental-inspector-profile）；轨迹数值均为演示占位 */
import { useState, useEffect } from 'react';
import { FaultyTerminal, LetterGlitch, TechText, Counter } from '../rb/index.js';

/* 演示轨迹：bash 风格占位，不对应任何真实运行 */
const TRACE = [
  { cls: 'p', text: '# 任务：整理本周实验记录 —— 执行轨迹（演示）' },
  { cls: 'p', text: '→ 规划：扫描目录 → 归类 → 写入汇总' },
  { cls: 'c', text: '[tool:fs-search] [ok] 42ms' },
  { cls: 'c', text: '[tool:fs-read]    [ok] 18ms' },
  { cls: 'p', text: '→ 观察返回，继续下一步' },
  { cls: 'c', text: '[tool:fs-write]   [ok] 63ms' },
  { cls: 'p', text: '[token-meter] 用量已计入当前会话' },
  { cls: 'ok', text: '✓ 任务完成 · 轨迹已持久化，可回放' }
];
/* 计数对象：上方轨迹的实际行数与工具调用行数（非产品指标） */
const TOOL_CALLS = TRACE.filter(l => l.text.includes('[tool:')).length;

export default function S6DevTools() {
  const [lines, setLines] = useState(0);
  const [calls, setCalls] = useState(0);

  /* 入视野后计数滚到真实值（与 UptimeDemo 同型用法） */
  useEffect(() => {
    const t = setTimeout(() => {
      setLines(TRACE.length);
      setCalls(TOOL_CALLS);
    }, 350);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="devtools" className="ld-section">
      <div className="ld-ambient dim" aria-hidden="true">
        <LetterGlitch
          baseColor="#1D1D1F"
          glitchColors={['#4D6DFE', '#7A96FF', '#B497CF']}
          fontSize={13}
          baseOpacity={0.22}
          glitchAmount={0.5}
          speed={1}
          clickEffect="tear"
        />
      </div>

      <p className="sec-label" data-reveal>DEV TOOLS · 开发者工具</p>
      <h2 className="ld-h2" data-reveal>看得见内部：执行轨迹与详细运行信息</h2>
      <p className="ld-lead" data-reveal>
        支持开发者查看执行轨迹与详细运行信息，排查工具调用和任务执行中的各类问题——出问题时，你看得见内部。
      </p>

      <div className="sb-dt-grid">
        <div className="sb-dt-side">
          <div className="ld-card" data-reveal>
            <h3>执行轨迹</h3>
            <p>每一次工具调用的入参、返回与耗时都记录在案；会话持久化保存，轨迹可回放、可检索。</p>
            <details className="ld-expand">
              <summary>一条轨迹长什么样？</summary>
              <div className="ld-expand-body">每条记录带工具名、入参、返回与耗时——格式就如右侧演示；历史会话的轨迹完整保留，可回放、可检索。</div>
            </details>
          </div>
          <div className="ld-card" data-reveal data-delay="1">
            <h3>详细运行信息</h3>
            <p>token 计量、运行状态与插件详情随时可查；inspector 档案（实验性）提供更细粒度的运行时检查。</p>
            <details className="ld-expand">
              <summary>token 用量怎么查？</summary>
              <div className="ld-expand-body">用量由 <code>dsh-token-meter</code> 一类计量插件负责，按会话累计、随时可查；inspector 档案在 Release notes 中标注为实验性功能，可能随版本调整。</div>
            </details>
          </div>
          <div className="ld-card" data-reveal data-delay="2">
            <h3>问题排查</h3>
            <p>工具调用失败时逐条展开调用记录，定位问题出在参数还是环境；排查在任务执行过程中进行，不中断任务。</p>
            <details className="ld-expand">
              <summary>调用失败了会怎样？</summary>
              <div className="ld-expand-body">失败的调用连同错误返回一起记录在轨迹里；修正参数或环境后可重试，任务主体继续推进，不从头再来。</div>
            </details>
          </div>
        </div>

        <div className="sb-dt-trace">
          <div className="sb-dt-head">
            <div className="sb-dt-techtext">
              <TechText
                text="TRACE"
                fontSize={30}
                accentColor="#4D6DFE"
                reveal="letter"
                draggable={false}
                labels={false}
                speed={0.6}
              />
            </div>
            <p className="ld-note">执行轨迹 · 演示</p>
          </div>

          <div className="ld-term">
            <div className="ld-term-bar"><i /><i /><i /><span>dsh · trace · 演示</span></div>
            <div className="ld-term-body">
              {TRACE.map((l, i) => (
                <div key={i} className={l.cls || undefined}>{l.text}</div>
              ))}
            </div>
          </div>

          <div className="sb-counters">
            <div className="sb-counter">
              <Counter value={lines} direction="up" fontSize={32} fontWeight={700} duration={0.6} minDigits={1} />
              <span className="sb-counter-label">行轨迹</span>
            </div>
            <div className="sb-counter">
              <Counter value={calls} direction="up" fontSize={32} fontWeight={700} duration={0.6} minDigits={1} />
              <span className="sb-counter-label">次工具调用</span>
            </div>
          </div>
          <p className="ld-note">计数来自上方演示轨迹的实际行数与工具调用行数，非产品指标。</p>

          <div className="sb-ft" aria-hidden="true">
            <FaultyTerminal tint="#7A96FF" glyphs="characters" timeScale={0.25} glow={0.4} persistence={0.4} mouseStrength={0.12} />
          </div>
          <p className="ld-note">运行信号氛围 · 示意</p>
        </div>
      </div>
    </section>
  );
}