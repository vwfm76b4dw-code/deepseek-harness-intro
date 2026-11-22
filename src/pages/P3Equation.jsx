/* P3 等式：Agent = Model + Harness（可拆芯片 + 执行循环） */
import { useState, useEffect } from 'react';
import { SpotlightCard, GradientText, SplitFlapText } from '../rb/index.js';
import { Icons } from '../icons.jsx';

const PLUGS = [
  { id: 'tools', name: '工具' },
  { id: 'storage', name: '存储' },
  { id: 'approval', name: '审批' },
  { id: 'sandbox', name: '沙箱' }
];

const STEPS = [
  { title: '接收任务', desc: '来自终端、IM 群或定时器' },
  { title: '规划', desc: '模型拆解目标为可执行步骤' },
  { title: '行动', desc: '调工具：读文件、跑命令、调接口' },
  { title: '观察', desc: '结果回灌上下文，异常进入恢复' },
  { title: '循环', desc: '未达目标则修正计划，继续推进' },
  { title: '汇报', desc: '交付结果与全过程记录' }
];

export default function PageEquation() {
  const [off, setOff] = useState([]);
  const toggle = id => setOff(o => (o.includes(id) ? o.filter(x => x !== id) : [...o, id]));
  const allOff = off.length === PLUGS.length;
  const inPlace = PLUGS.length - off.length;

  return (
    <div className="page-wrap">
      <p className="sec-label">SELLING POINT 02 · 骨架</p>
      <p className="scene-statement" style={{ marginTop: 18 }}>
        Harness 不是一个功能，
        <br />是让模型<GradientText colors={['#4D6BFE', '#7A96FF', '#B497CF']} animationSpeed={6} variant="flow" yoyo style={{ fontSize: 'inherit' }}>真正动手</GradientText>
        <br />的那层运行时。
      </p>
      <div className="equation" data-reveal>
        <SpotlightCard className="eq-card" theme="light" spotlightColor="#4D6BFE" intensity={0.14} softness={0.75}>
          <span className="eq-icon"><Icons.chip /></span>
          <h3>Model</h3>
          <p className="eq-tag">思考的大脑</p>
          <ul>
            <li>知识、推理、代码与语言能力</li>
            <li>输入输出都停留在文本层面</li>
            <li>换一个模型，等于换一个脑子</li>
          </ul>
        </SpotlightCard>
        <span className="eq-sign" aria-hidden="true">+</span>
        <SpotlightCard className="eq-card" theme="light" spotlightColor="#4D6BFE" intensity={0.14} softness={0.75}>
          <span className="eq-icon"><Icons.frame /></span>
          <h3>Harness</h3>
          <p className="eq-tag">行动的骨架 · 插件在位 {inPlace}/{PLUGS.length}</p>
          <div className="plug-chips">
            {PLUGS.map(p => (
              <button
                key={p.id}
                type="button"
                className={`plug-chip${off.includes(p.id) ? ' off' : ''}`}
                onClick={() => toggle(p.id)}
                aria-pressed={!off.includes(p.id)}
              >
                <span className="led" />
                {p.name}
              </button>
            ))}
          </div>
          <p className="eq-harness-note">点一枚芯片试试：拔掉的每一件，右边的 Agent 都会少一样能力。</p>
        </SpotlightCard>
        <span className="eq-sign" aria-hidden="true">=</span>
        <SpotlightCard className={`eq-card is-agent${allOff ? ' is-bare' : ''}`} theme="light" spotlightColor={allOff ? '#8E8E93' : '#4D6BFE'} intensity={0.16} softness={0.75}>
          <span className="eq-icon"><Icons.robot /></span>
          <h3>Agent</h3>
          <p className="eq-tag">{allOff ? '此刻只是一份提示词' : '真正干活的智能体'}</p>
          <ul>
            <li className={off.includes('tools') ? 'dead' : ''}>读文件、跑命令、调接口</li>
            {off.includes('tools') && <li className="regain">退化：只剩生成文本，回到上一页</li>}
            <li className={off.includes('storage') ? 'dead' : ''}>7×24 常驻，会话与记忆持久</li>
            {off.includes('storage') && <li className="regain">重启即失忆，任务无法续跑</li>}
          </ul>
          {(off.includes('approval') || off.includes('sandbox')) && (
            <div className="agent-warn">
              {off.includes('approval') && <div className="warn">审批插件已拔出：危险操作将不经确认直接执行</div>}
              {off.includes('sandbox') && <div className="warn">沙箱插件已拔出：命令运行在无隔离的宿主环境</div>}
            </div>
          )}
        </SpotlightCard>
      </div>
      <p className="sec-label" data-reveal style={{ marginTop: 64 }}>THE LOOP · 一条循环，跑到天亮</p>
      <div className="pipeline" data-reveal>
        {STEPS.map(s => (
          <div className="step" key={s.title}>
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
      <div className="loop-board" data-reveal>
        <span className="flap-label">当前阶段</span>
        <SplitFlapText
          words={['PLANNING', 'ACTING', 'OBSERVING', 'REPORTING']}
          tileColor="#1D1D1F"
          textColor="#F5F5F7"
          fontSize={22}
          padTo={10}
          tileStyle="board"
          cycleDelay={1800}
        />
      </div>
      <blockquote className="pipeline-quote" data-reveal>
        "单任务的上限取决于模型能力，多任务的上限取决于人的注意力。"
        <small>—— 所以 Harness 把后者也接管了：永远在线，替人值守</small>
      </blockquote>
    </div>
  );
}
