/* P3 特性二：Complete a range of tasks（官方） */
import { useState, useEffect } from 'react';
import { Counter, CallChip, ParticleText } from '../rb/index.js';

const TASKS = [
  { t: '整理文档', d: '把散落的资料归类、去重、生成索引——按你的规则来。', chip: 'file.sort' },
  { t: '分析表格', d: '读取 spreadsheet，跑一遍分析，把结论写回原文旁边。', chip: 'sheet.analyze' },
  { t: '编写代码', d: '在仓库里直接改：改完自己跑测试，红了解释原因再改。', chip: 'code.commit' }
];

function TaskCardDemo() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % TASKS.length), 2600);
    return () => clearInterval(timer);
  }, []);
  const t = TASKS[idx];
  return <CallChip icon="file" status="running" expectedMs={2200} showTimer />;
}

export default function PageTasks() {
  return (
    <div className="page-wrap pos-rel" style={{ position: 'relative' }}>
      <div className="page-bg" aria-hidden="true">
        <ParticleText text="TASKS" color="#DDE3F5" highlightColor="#4D6BFE" intro="gather" pointerRepel={30} density={3} particleSize={2} fontSize="clamp(3rem, 8vw, 5rem)" />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p className="sec-label">EXPANDING CAPABILITIES · 特性二</p>
        <p className="scene-statement" style={{ marginTop: 18 }}>
          完成一系列任务——<br />结果直接<span className="dim">预览</span>，对话<span className="dim">精炼</span>。
        </p>
        <div className="task-grid" data-reveal>
          {TASKS.map(t => (
            <div className="task-card" key={t.t}>
              <b>{t.t}</b>
              <span>{t.d}</span>
              <span className="task-chip"><TaskCardDemo /></span>
            </div>
          ))}
        </div>
        <p className="scene-note" data-reveal style={{ maxWidth: 700 }}>
          整理文档、分析表格、编写代码——<strong style={{ color: 'var(--ink)' }}>结果直接预览</strong>，
          不满意就在对话里继续<strong style={{ color: 'var(--ink)' }}>精炼</strong>。
          任务不是一次性问答，是一轮一轮迭代到你对为止。
        </p>
      </div>
    </div>
  );
}
