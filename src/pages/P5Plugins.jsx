/* P5 一切皆插件：六类插槽行式交互 + 插件库墙 */
import { useState, useEffect } from 'react';
import { GlideSelect, CallChip, Counter, HoldButton, LatticeLoader, PixelCard } from '../rb/index.js';

const MODEL_VOICES = {
  'deepseek-chat': '直接给答案，不绕弯。',
  'deepseek-reasoner': '先列三步推理，再落笔。',
  'deepseek-v4': '更强的大脑，同一副骨架。'
};

function ToolCallDemo() {
  const [status, setStatus] = useState('running');
  useEffect(() => {
    const timer = setInterval(() => setStatus(s => (s === 'running' ? 'done' : s === 'done' ? 'error' : 'running')), 2400);
    return () => clearInterval(timer);
  }, []);
  return <CallChip icon="terminal" status={status} expectedMs={2100} showTimer />;
}

function MemoryDemo() {
  const [mem, setMem] = useState(96);
  useEffect(() => {
    const timer = setInterval(() => setMem(v => v + 1), 1600);
    return () => clearInterval(timer);
  }, []);
  return (
    <span className="memory-count">
      已记住 <Counter value={mem} direction="up" fontSize={24} fontWeight={700} duration={0.4} fade={0.08} minDigits={3} /> 条事实
    </span>
  );
}

function PagePlugins() {
  const [model, setModel] = useState('deepseek-chat');
  const rows = [
    {
      cat: '模型', title: '换个脑子', desc: '同一副骨架，DeepSeek 全系任意换。换模型不改一行业务代码。',
      widget: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
          <GlideSelect options={Object.keys(MODEL_VOICES)} value={model} onChange={setModel} ariaLabel="选择模型插件" size="sm" />
          <span className="model-voice" style={{ fontSize: 12.5 }}>{MODEL_VOICES[model]}</span>
        </div>
      )
    },
    {
      cat: '工具', title: '伸出手', desc: 'Shell、文件系统、浏览器——模型从"说"到"做"，靠的就是这一类插件。',
      widget: <ToolCallDemo />
    },
    {
      cat: '存储', title: '长记性', desc: '会话、记忆、任务状态全部持久化。重启不丢，隔天接着干。',
      widget: <MemoryDemo />
    },
    {
      cat: '审批', title: '先问你', desc: '危险操作先停下来，过人这一关再执行。按住试试——松手就取消。',
      widget: <HoldButton fillColor="#4D6BFE" holdTime={1500} size="md" doneLabel="已放行">长按放行</HoldButton>
    },
    {
      cat: '沙箱', title: '关笼子', desc: '命令在隔离环境里跑，宿主机无虞。隔离不撤，笼门不开。',
      widget: <LatticeLoader status="working" pattern="spin" grid={3} label="sandboxed" showTimer />
    },
    {
      cat: '界面', title: '被看见', desc: 'Web 管理面板、IM 群消息——Agent 干到哪一步，你随时看得见、管得了。',
      widget: (
        <div style={{ position: 'relative', width: 210, height: 104, overflow: 'hidden', borderRadius: 14, background: 'var(--bg)' }}>
          <PixelCard variant="blue" gap={10} speed={40} pixelSize={6} theme="light" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontWeight: 600, color: '#1D1D1F', fontSize: 13, padding: '5px 11px', background: 'rgba(255,255,255,0.8)', borderRadius: 8 }}>Web 面板</span>
          </PixelCard>
        </div>
      )
    }
  ];
  return (
    <div className="page-wrap">
      <p className="sec-label">SELLING POINT 04 · 一切皆插件</p>
      <p className="scene-note" data-reveal style={{ maxWidth: 720, marginBottom: 10 }}>
        骨架上的每个位置都是统一契约：拔旧插新，运行时不重启。下面每一行都能现场交互——它们不是插图，就是插件本来的工作方式。
      </p>
      <div className="plugin-rows" data-reveal>
        {rows.map(r => (
          <div className="plugin-row" key={r.title}>
            <div>
              <div className="p-name"><span className="cat">{r.cat}</span>{r.title}</div>
              <p className="p-desc">{r.desc}</p>
            </div>
            <div className="p-widget">{r.widget}</div>
          </div>
        ))}
      </div>
      <p className="scene-note" data-reveal style={{ maxWidth: 720, marginTop: 30 }}>
        六类插槽覆盖了 Agent 生活的全部：想清楚、能动手、有记性、守规矩、关得住、看得见。
        <strong style={{ color: 'var(--ink)' }}>组合起来，才是完整的智能体。</strong>
      </p>
    </div>
  );
}

export default PagePlugins;
